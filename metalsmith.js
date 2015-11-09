var config = require('./config.js');
var path = require('path');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
//var layouts = require('metalsmith-layouts');
var templates = require('metalsmith-react-templates');
var define = require('metalsmith-define');
var fileMetadata = require('metalsmith-filemetadata');
var dateInFile = require('metalsmith-date-in-filename');
var branch = require('metalsmith-branch');


//module.exports = function(cb, reload) {
  Metalsmith(__dirname)
    .source(path.join(config.dir.content, './_posts'))
    //.source('./tests')
    .clean(false)
    .destination(config.dir.public)
    .use(branch('**/*.md')
      .use(markdown())
    )
    .use(branch('**/*.{md,html}')
      .use(dateInFile())
      //.use(permalinks({
      //  pattern: ':date/:title',
      //  date: 'YYYY'
      //}))
      .use(fileMetadata([
        {
          pattern: '**/*.{md,html}',
          preserve: true,
          metadata: {
            section: 'blog',
            rtemplate: 'post.jsx'
          }
        }
      ]))
      .use(templates({
        isStatic: false,
        directory: './src/templates',
        requireIgnoreExt: [],
        babel: true
        //baseFile: 'base.html'
      }))
    )
    .build(function (err, files) {
      if (err) {
        console.log('Error!');
        console.log(err);
        throw err;
      }
      //reload();
      //console.log(Object.keys(files));
      console.log(Object.keys(files).length + ' files built with Metalsmith');
      //cb();
    });
  
//};
