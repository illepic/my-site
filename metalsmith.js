var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');

var metalsmith = Metalsmith(__dirname)
  .source('./tests/render')
  .destination('./public')
  //.use(collections({
  //  myposts: {
  //    pattern: '*.md',
  //    sortBy: 'date',
  //    reverse: true
  //  }
  //}))
  .use(markdown())
  .use(permalinks({
    pattern: ':date/:title',
    date: 'YYYY'
  }))
  .use(layouts({
    engine: 'react',
    default: 'page.jsx',
    partials: './src',
    directory: './src/base'
  }))
  .build(function(err, files) {
    if (err) {
      console.log('Error!');
      console.log(err);
      console.log(files);
      throw err;
    }
  });
