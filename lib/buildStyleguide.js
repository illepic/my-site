require('babel-register')({
  extensions: ['.jsx'],
});
const renderReact = require('./renderReact');
const config = require('../config');
const plconfig = require('../patternlab-config');
const glob = require('glob');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');
let globalData = {};

function buildVariants(componentPath) {
  const props = {
    site: globalData,
  };
  props.site.bodyClasses.push('styleguide');
  const examples = glob.sync(path.join(config.paths.src, componentPath, '../examples/*.{yml,yaml}'));
  if (examples.length > 0) {
    examples.forEach(example => {
      const name = path.basename(example, path.extname(example));
      const data = Object.assign({}, props, yaml.safeLoad(fs.readFileSync(example, 'utf8')));
      buildComponent(componentPath, data, name);
    });
  } else {
    buildComponent(componentPath, props);
  }
}

function buildComponent(componentPath, props, name = 'index') {
  props.renderedPage = renderReact.compileComponent(path.join(process.cwd(), config.paths.src, componentPath), props);
  const buildPath = path.join(plconfig.paths.source.patterns, path.dirname(componentPath));
  fs.mkdirpSync(buildPath);
  fs.writeFileSync(path.join(buildPath, `${name}.mustache`), props.renderedPage);
  // console.log(`Built ${path.join(buildPath, `${name}.mustache`)}`);
}

function buildAll(done) {
  globalData = fs.readJsonSync(path.join(config.paths.assets, 'data/global.json'));
  fs.emptyDirSync(plconfig.paths.source.patterns);
  glob.sync('{atoms,molecules,organisms}/*/*.jsx', {
    cwd: config.paths.src,
  }).forEach(file => {
    buildVariants(file);
  });
  if (typeof done === 'function') done();
}

module.exports = {
  buildAll,
};
