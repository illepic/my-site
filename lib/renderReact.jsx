const React = require('react');
const render = require('react-dom/server').renderToString;
const siteLayout = require('./../src/layouts/site/site.js');
const typeset = require('typeset');
const join = require('path').join;
const config = require('./../config');
const glob = require('glob');
const fs = require('fs-extra');
const globalData = fs.readJsonSync(join(config.paths.assets, 'data/global.json'));

function staticCompile(file, props = {}) {
  const Tpl = require(file); // eslint-disable-line global-require
  return render(<Tpl {...props} />);
}

function compilePage(dataFilePath) {
  const fileData = fs.readJsonSync(dataFilePath); // eslint-disable-line global-require
  fileData.site = globalData;

  // template path
  const templateExt = 'jsx';
  const templatePath = join(
    process.cwd(),
    config.paths.src,
    'templates',
    fileData.template,
    `${fileData.template}.${templateExt}`
  );

  // create html for page
  fileData.renderedPage = staticCompile(templatePath, fileData);
  // create html that wraps the page
  const fullHtml = siteLayout(fileData);
  // write the json file to the dist directory
  fs.writeFileSync(dataFilePath.replace('.json', '.html'), fullHtml);
}

function compileSite() {
  glob.sync(
    join(config.paths.dist, '**/*.json'),
    {
      ignore: join(config.paths.assets, 'data/global.json'),
    }).forEach(file => {
      compilePage(file);
    });
}

module.exports = {
  staticCompile,
  compileSite,
  compilePage,
};
