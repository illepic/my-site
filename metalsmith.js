'use strict';
const Metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const excerpts = require('metalsmith-excerpts');
const layouts = require('metalsmith-layouts');
// const inPlace = require('metalsmith-in-place');
const collections = require('metalsmith-collections');
const feed = require('metalsmith-feed');
const assets = require('metalsmith-assets');
const each = require('async').each;
//const sass = require('metalsmith-sass');
const nunjucks = require('nunjucks');
const nunjucksDate = require('nunjucks-date');
const metalsmith = Metalsmith(__dirname);

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
    pattern: 'test-content/**/*.md'
  },
  notes: {
    pattern: 'test-content/notes/*.md'
  },
  pages: {
    pattern: 'test-content/*.md',
    sortBy: 'position'
  }
};

nunjucks
  .configure('./src', {
    watch: false, 
    autoescape: false,
    noCache: true
  })
  .addFilter('date', nunjucksDate);

nunjucksDate
  .setDefaultFormat('MMMM Do, YYYY');

metalsmith
  .metadata(metadata)
  .source('./content')
  .clean(false)
  .use(drafts(true))
  // .use(collections(siteCollections))
  .use(markdown())
  // .use(excerpts())
  // .use(assets())
  // .use(feed({
  //   collection: 'all'
  // }))
  .use((files, metalsmith, done) => {
    each(Object.keys(files), (file, done) => {
      let data = files[file];
      // let layout = data.layout || 'default';
      let layout = 'default';
      let ext = 'html';
      data.layout = `${layout.trim()}.${ext}`;
      done();
    }, done);
  })
  .use(layouts({
      engine: 'nunjucks',
      partials: './src',
      directory: './src/templates'
  }))
  .destination('./dist');

const msBuild = (cb) => {
  metalsmith.build((err, files) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.info(`Metalsmith built ${Object.keys(files).length} files.`);
    if (typeof cb === 'function') { cb(); }
  });
};

// msBuild();

module.exports = {
  build: msBuild
};
