var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');

var metalsmith = Metalsmith(__dirname)
  .source('./source/_posts')
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
    engine: 'handlebars',
    default: 'default.hbs',
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
