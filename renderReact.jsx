'use strict';
const React = require('react');
const render = require('react-dom/server').renderToString;
const siteLayout = require('./src/layouts/site/site.js');
const typeset = require('typeset');
const each = require('async').each;
const join = require('path').join;
const config = require('./config');
const glob = require('glob');
const fs = require('fs');
const globalData = require(join(process.cwd(), config.paths.assets, 'data/global.json'));

function staticCompile(file, props = {}) {
  let Tpl = require(file);
  return (process.env.NODE_ENV === 'production') ? typeset(render(<Tpl {...props} />)) : render(<Tpl {...props} />);
}

function compileSite() {
  glob.sync(
    join(config.paths.dist, '**/*.json'),
    {
      ignore: join(config.paths.assets, 'data/global.json')
    }).forEach(file => {
    compilePage(file);
  });
}

function compilePage(dataFilePath) {
  let fileData = require(join(process.cwd(), dataFilePath));
  fileData.site = globalData;
  
  // template path
  let templateExt = 'jsx';
  let templatePath = join(
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

module.exports = {
  staticCompile,
  compileSite,
  compilePage,
};
