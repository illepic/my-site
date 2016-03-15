'use strict';
const config = require('./config');
const Metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const excerpts = require('metalsmith-excerpts');
const layouts = require('metalsmith-layouts');
const logger = require('metalsmith-logger');
const collections = require('metalsmith-collections');
const feed = require('metalsmith-feed');
const assets = require('metalsmith-assets');
const each = require('async').each;
const nunjucks = require('nunjucks');
const moment = require('moment');
const metalsmith = Metalsmith(__dirname);
const path = require('path');
const permalinks = require('metalsmith-permalinks');
const pagination = require('metalsmith-pagination');

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
    pattern: 'notes/*/**/*.{md,html}',
    sortBy: 'weight'
  },
  utilities: {
    pattern: 'utilities/*/**/*.{md,html}',
    sortBy: 'weight'
  },
  portfolios: {
    pattern: 'portfolio/*/**/*.{md,html}',
    sortBy: 'weight'
  },
  posts: {
    pattern: 'blog/*/**/*.{md,html}',
    sortBy: 'date',
    reverse: true
  },
  pages: {
    pattern: '*/index.*',
    sortBy: 'position'
  }
};

const tpl = nunjucks
  .configure(config.paths.src, {
    watch: false, 
    autoescape: false,
    noCache: true
  })
  .addFilter('date', (text) => {
    return moment(text).format('YYYY-MM-DD')
  });

metalsmith
  .metadata(metadata)
  .source(config.paths.content)
  .clean(false)
  .use(drafts(true))
  // md => html
  .use(markdown())
  .use(permalinks({
    linksets: [{
      match: {collection: 'posts'},
      pattern: 'blog/:date/:title',
      date: 'yy/mm'
    }]
  }))
  .use(collections(siteCollections))
  // .use(excerpts())
  // .use(assets())
  // .use(feed({
  //   collection: 'all'
  // }))
  .use(pagination({
    'collections.posts': {
      perPage: 15,
      path: 'blog/:num/index.html',
      template: 'blog',
      first: 'blog/index.html'
    }
  }))
  .use((files, metalsmith, done) => {
    each(Object.keys(files), (file, done) => {
      let data = files[file];
      data.path = `/${file.replace('index.html', '')}`;
      let template = data.template || 'default';
      data.template = template.trim();
      done();
    }, done);
  })

  // in-place templating
  //.use((files, metalsmith, done) => {
  //  let globalData = metalsmith.metadata();
  //  each(Object.keys(files), (file, done) => {
  //    let fileExt = path.extname(file);
  //    if(fileExt !== '.html') {
  //      return;
  //    }
  //    let fileData = files[file];
  //    let mergedData = Object.assign({}, globalData, fileData);
  //    let contents = fileData.contents.toString();
  //    let renderedContents = tpl.renderString(contents, mergedData);
  //    fileData.contents = new Buffer(renderedContents, 'utf8');
  //    done();
  //  }, done()); // done with `each()`
  //})

  

  // template templating
  .use((files, metalsmith, done) => {
    let globalData = metalsmith.metadata();
    each(Object.keys(files), (file, done) => {
      let fileExt = path.extname(file);
      if(fileExt !== '.html') {
        return;
      }
      let fileData = files[file];
      let mergedData = Object.assign({}, globalData, fileData);
      let templateExt = 'html';
      let templatePath = path.join(
        process.cwd(), 
        config.paths.src, 
        'templates', 
        fileData.template, // folder name same as template 
        `${fileData.template}.${templateExt}`
      );
      let result = tpl.render(templatePath, mergedData);
      fileData.contents = new Buffer(result, 'utf8');
      done();
    }, done()); // done with `each()`


  })
  .destination(config.paths.dist)
  .build((err, files) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.info(`Metalsmith built ${Object.keys(files).length} files.`);
    if (typeof cb === 'function') { cb(); }
  });


