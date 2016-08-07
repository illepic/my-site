const React = require('react');
const render = require('react-dom/server').renderToString;
const siteLayout = require('./../src/layouts/site/site.js');
const join = require('path').join;
const config = require('./../config');
const glob = require('glob');
const fs = require('fs-extra');
const globalData = fs.readJsonSync(join(config.paths.assets, 'data/global.json'));
const Site = require('../src/layouts/site/site.jsx');

function compilePage(dataFilePath) {
  const fileData = fs.readJsonSync(dataFilePath); // eslint-disable-line global-require
  fileData.site = globalData;
  // create html for page
  fileData.renderedPage = render(<Site {...fileData} />);
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
  compileSite,
  compilePage,
};
