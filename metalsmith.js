'use strict';
const config = require('./config');
const Metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const excerpts = require('metalsmith-excerpts');
const layouts = require('metalsmith-layouts');
// const inPlace = require('metalsmith-in-place');
const logger = require('metalsmith-logger');

const collections = require('metalsmith-collections');
const feed = require('metalsmith-feed');
const assets = require('metalsmith-assets');
const each = require('async').each;
//const sass = require('metalsmith-sass');
const nunjucks = require('nunjucks');
const nunjucksDate = require('nunjucks-date');
const metalsmith = Metalsmith(__dirname);
const path = require('path');
const permalinks = require('metalsmith-permalinks');

// template metadata
const metadata = {
  categories: [
    {
      "collection": "notes",
      "title": "Notes"
    },
    {
      "collection": "utilities",
      "title": "Utilities"
    }
  ],
  site: {
    description: "Evan's Site",
    title: "Evan Lovely's Site"
  }
};

const siteCollections = {
  all: {
    pattern: '**/*.md'
  },
  notes: {
    pattern: '**/*.{md,html}',
    sortBy: 'weight'
  },
  pages: {
    pattern: '*.md',
    sortBy: 'position'
  }
};

const tpl = nunjucks
  .configure(config.paths.src, {
    watch: false, 
    autoescape: false,
    noCache: true
  })
  .addFilter('date', nunjucksDate);

nunjucksDate
  .setDefaultFormat('MMMM Do, YYYY');

metalsmith
  .metadata(metadata)
  .source(config.paths.content)
  .clean(false)
  .use(drafts(true))
  // md => html
  .use(markdown())
  // .use(permalinks())
  .use(collections(siteCollections))
  // .use(excerpts())
  // .use(assets())
  // .use(feed({
  //   collection: 'all'
  // }))
  .use((files, metalsmith, done) => {
    each(Object.keys(files), (file, done) => {
      let data = files[file];
      data.path = `/${file}`;
      // let layout = data.layout || 'default';
      let layout = 'default';
      let ext = 'html';
      data.layout = `${layout.trim()}.${ext}`;
      done();
    }, done);
  })

  // in-place templating
  .use((files, metalsmith, done) => {
    let globalData = metalsmith.metadata();
    each(Object.keys(files), (file, done) => {
      let fileExt = path.extname(file);
      if(fileExt !== '.html') {
        return;
      }
      let fileData = files[file];
      let mergedData = Object.assign({}, globalData, fileData);
      let contents = fileData.contents.toString();
      let renderedContents = tpl.renderString(contents, mergedData);
      fileData.contents = new Buffer(renderedContents, 'utf8');
      done();
    }, done()); // done with `each()`
  })

  

  // layout templating
  .use((files, metalsmith, done) => {
    let globalData = metalsmith.metadata();
    each(Object.keys(files), (file, done) => {
      let fileExt = path.extname(file);
      if(fileExt !== '.html') {
        return;
      }
      let fileData = files[file];
      let mergedData = Object.assign({}, globalData, fileData);
      let templatePath = path.join(process.cwd(), config.paths.src, 'templates', fileData.layout);
      let result = tpl.render(templatePath, mergedData);
      fileData.contents = new Buffer(result, 'utf8');
      done();
    }, done()); // done with `each()`


  })
  //.use(layouts({
  //    engine: 'nunjucks',
  //    partials: config.paths.src,
  //    directory: './src/templates'
  //}))
  .destination(config.paths.dist)
  .build((err, files) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.info(`Metalsmith built ${Object.keys(files).length} files.`);
    if (typeof cb === 'function') { cb(); }
  });


