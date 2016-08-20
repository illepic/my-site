require('babel-register')({
  extensions: ['.jsx'],
});
const renderReact = require('./renderReact');
const siteLayout = require('../src/layouts/site/site.js');
const config = require('../config');
const glob = require('glob');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');
const globalData = fs.readJsonSync(path.join(config.paths.assets, 'data/global.json'));

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
  const buildPath = path.join(config.paths.dist, 'styleguide', path.dirname(componentPath));
  fs.mkdirpSync(buildPath);
  fs.writeFileSync(path.join(buildPath, `${name}.html`), siteLayout(props, false));
  console.log(`Built ${path.join(buildPath, `${name}.html`)}`);
}

glob.sync('{atoms,molecules,organisms}/*/*.jsx', {
  cwd: config.paths.src,
}).forEach(file => {
  buildVariants(file);
});
