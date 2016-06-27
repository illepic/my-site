'use strict';
require('babel-register')({
  extensions: ['.jsx']
});
const config = require('./config');
const util = require('./src/0-base/util');
const Metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const excerpts = require('metalsmith-excerpts');
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
const cheerio = require('cheerio');
const renderReact = require('./renderReact.jsx');
const siteLayout = require('./src/layouts/site/site.js');
const debug = false;

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
    title: "Evan Lovely's Site",
    bodyClasses: ["theme--light"]
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
  articles: {
    pattern: 'articles/*/**/*.{md,html}',
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
    reverse: true,
    metadata: {
      template: 'blog-post'
    }
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

const ms = metalsmith
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
  .use((files, metalsmith, done) => {
    each(Object.keys(files), (file, done) => {
      let data = files[file];
      data.path = `/${file.replace('index.html', '')}`;
      
      let template = '';
      if (data.template) {
        template = data.template;
      } else if (data.collection && data.collection.length > 0) {
        data.collection.forEach(item => {
          switch(item) {
            case 'posts':
              template = 'blog-post';
              break;
          }
        });
      }
      
      data.template = template !== '' ? template.trim() : 'default';
      done();
    }, done);
  })
  .use(pagination({
    'collections.posts': {
      perPage: 15,
      path: 'blog/:num/index.html',
      template: 'blog-list',
      first: 'blog/index.html'
    }
  }))

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

 // post html
  .use((files, metalsmith, done) => {
    each(Object.keys(files), (file, done) => {
      if(path.extname(file) !== '.html') {
        return;
      }
      let fileData = files[file];
      if (process.env.NODE_ENV === 'production') {
        let $ = cheerio.load(fileData.contents.toString());
        $('img').each(function() {
          let $this = $(this);
          let src = $this.attr('src');
          $this.attr('srcset', util.srcSet(src));
        });
        fileData.contents = new Buffer($.html(), 'utf8');
      }
      done();
    }, done()); // done with `each()`
  })

  // template templating
  .use((files, metalsmith, done) => {
    let globalData = metalsmith.metadata();
    each(Object.keys(files), (file, done) => {
      if(path.extname(file) !== '.html') {
        return;
      }
      let fileData = files[file];
      let mergedData = Object.assign({}, globalData, fileData);
      let templateExt = 'jsx';
      let templatePath = path.join(
        process.cwd(), 
        config.paths.src, 
        'templates', 
        fileData.template,  
        `${fileData.template}.${templateExt}`
      );
      if (debug) {
        console.log(`templatePath: ${templatePath}`);
      }
      mergedData.renderedPage = renderReact(templatePath, mergedData);
      fileData.contents = new Buffer(siteLayout(mergedData), 'utf8');
      done();
    }, done()); // done with `each()`


  })
  .destination(config.paths.dist);
  


module.exports = {
  buildIt: (cb) => {
    ms.build((err, files) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.info(`Metalsmith built ${Object.keys(files).length} files.`);
    if (typeof cb === 'function') { cb(); }
  });
  }
};