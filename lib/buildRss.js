'use strict';
const RSS = require('rss'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  url = require('url'),
  config = require('../config'),
  themeConfig = yaml.safeLoad(fs.readFileSync('./config.theme.yml', 'utf8')),
  join = require('path').join,
  globalData = require(join(process.cwd(), config.paths.assets, 'data/global.json'));

module.exports = function (cb) {
  const host = (process.env.NODE_ENV === 'production')
    ? 'http://evanlovely.com'
    : `http://localhost:${themeConfig.browserSync.port}`;
  const today = new Date();
  const feed = new RSS({
    title: config.site.title,
    description: config.site.description,
    feed_url: url.resolve(host, 'rss.xml'),
    site_url: host,
    image_url: url.resolve(host, 'favicon.ico'),
    managingEditor: 'Evan Lovely',
    webMaster: 'Evan Lovely',
    copyright: `${today.getFullYear()} Evan Lovely`,
    language: 'en',
    pubDate: today,
    ttl: '60',
  });

  globalData.pages
  .filter(page => page.section === 'blog' && !page.landingPage)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .forEach(page => {
    feed.item({
      title: page.title,
      description: page.excerpt, // @todo add page.featuredImage support
      url: url.resolve(host, page.title_url ? page.title_url : page.path),
      author: 'Evan Lovely',
      date: page.date,
    });
  });
  
  fs.writeFile(join(config.paths.dist, 'rss.xml'), feed.xml(), err => {
    if (err) throw err;
    cb();
  });

};
