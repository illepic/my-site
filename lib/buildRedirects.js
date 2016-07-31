'use strict';
const config = require('../config');
const path = require('path');
const join = require('path').join;
const fs = require('fs-extra');
const globalData = fs.readJsonSync(join(config.paths.assets, 'data/global.json'));

function buildPage(props) {
  const html = `<!doctype html>
<html lang="en-us">
<head>
<meta http-equiv="refresh" content="0; url=${props.dest}">
<link rel="canonical" href="${props.dest}" />
<body>
<p>Redirecting to <a href="${props.dest}">${props.dest}</a>.</p>
</body>
</html>
`;
  const dest = join(config.paths.dist, props.redirect, 'index.html');
  fs.mkdirsSync(path.parse(dest).dir);
  fs.writeFileSync(dest, html);
}

function buildPages(pages, cb) {
  pages.filter(x => x.redirect_from).forEach(page => {
    if (typeof page.redirect_from === 'string') {
      // turn string into an array of that string
      page.redirect_from = page.redirect_from.split();
    }
    page.redirect_from.forEach(item => buildPage({
      redirect: item,
      dest: page.path,
    }));
  });
  cb();
}

function buildAll(cb) {
  buildPages(globalData.pages, cb);
}

module.exports = {
  buildPages,
  buildAll,
};
