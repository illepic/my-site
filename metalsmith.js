var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
//var layouts = require('metalsmith-layouts');
var templates = require('metalsmith-react-templates');
var define = require('metalsmith-define');

var metalsmith = Metalsmith(__dirname)
  .source('./source/_posts')
  //.source('./tests')
  .clean(false)
  .destination('./public')
  //.use(function(files, metalsmith, done) {
  //    var metadata = metalsmith.metadata();
  //    console.log('md:', metadata);
  //})
  //.use(collections({
  //  myposts: {
  //    pattern: '*.md',
  //    sortBy: 'date',
  //    reverse: true
  //  }
  //}))
  .use(markdown())
  //.use(permalinks({
  //  pattern: ':date/:title',
  //  date: 'YYYY'
  //}))
  //.use(define({
  //  rtemplate: 'page.jsx'
  //}))
  //.use(function(files, metalsmith, done) {
    //console.log(files);
    //console.log(metalsmith.metadata());
  //})
  .use(templates({
    isStatic: false,
    directory: './src/base',
    requireIgnoreExt: ['.scss'],
    babel: true
    //baseFile: 'base.html'
  }))
  //.use(layouts({
  //  engine: 'react',
  //  default: 'page.jsx',
  //  partials: './src',
  //  directory: './src/base'
  //}))
  .build(function(err, files) {
    if (err) {
      console.log('Error!');
      console.log(err);
      console.log(files);
      throw err;
    }
  });
