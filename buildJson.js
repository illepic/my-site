'use strict';
const config = require('./config'),
  fs = require('fs-extra'),
  util = require('./src/0-base/util'),
  path = require('path'),
  join = path.join,
  fm = require('gray-matter'),
  each = require('async').each,
  marked = require('marked'),
  cheerio = require('cheerio'),
  glob = require('glob');

const globalData = {
  description: "Evan's Site",
  title: "Evan Lovely's Site",
  bodyClasses: ["theme--light"],
  pages: [],
};

const fileList = glob.sync('**/*.{md,html}', {
  cwd: config.paths.content
});

const sections = [
  'notes',
  'articles',
  'utilities',
  'portfolio',
  'blog',
];

let sectionData = {
  all: {
    data: []
  },
  notes: {
    data: []
  },
  articles: {
    data: []
  },
  utilities: {
    data: []
  },
  portfolio: {
    data: []
  },
  blog: {
    data: []
  },
};

function allDone() {
  // sections.forEach(section => console.log(section, sectionData[section].data.length));
  fs.mkdirsSync(join(config.paths.assets, 'data/'));
  fs.writeFileSync(join(config.paths.assets, 'data/', 'global.json'), JSON.stringify(globalData, null, '  '));
  each(Object.keys(sectionData), (section, done) => {
    if (section === 'blog') {
      sectionData[section].data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (section !== 'all') {
      sectionData[section].data.sort((a, b) => a.weight < b.weight);
    }
    fs.writeFile(
      join(config.paths.assets, 'data/', `section--${section}.json`),
      JSON.stringify(sectionData[section], null, '  '
    ), err => {
      if (err) throw err;
      done();
    });
  }, console.log('all done'));
}

each(fileList, (file, done) => {
  // read each file in content
  fs.readFile(join(config.paths.content, file), (err, data) => {
    // get path info and build new path in `dist` that ends in `.json`
    const pathData = path.parse(file);
    // first folder name - i.e. `notes`, `utilities`, etc
    const sectionName = pathData.dir.split('/')[0];
    const jsonFilePath = join(config.paths.dist, path.format({
      dir: pathData.dir,
      name: pathData.name,
      ext: '.json' // renaming `{.html,.md}` => `.json`
    }));
    const htmlFilePath = path.format({
      dir: pathData.dir,
      name: pathData.name,
      ext: '.html' // renaming `{.html,.md}` => `.html`
    });

    // parse yaml front matter contents into data 
    const parsedData = fm(data.toString());
    let fileData = parsedData.data;
    // adding path as root relative path
    fileData.path = `/${htmlFilePath}`;
    
    let template = '';
    if (fileData.template) {
      template = fileData.template;
    } else {
      switch (sectionName) {
        case 'blog':
          template = 'blog-post';
          break;
        case 'portfolio':
          template = 'portfolio-item';
          break;
        default:
          template = 'default';
          break;
      }
    }
    fileData.template = template.trim();
    
    // add original markdown to data
    // fileData.markdown = pathData.ext === '.md' ? x.content : false;
    
    // if markdown, parse to html
    const html = pathData.ext === '.md' ? marked(parsedData.content) : parsedData.content;

    const $ = cheerio.load(html);

    // add `srcset` to `<img>`s
    $('img').each(function () {
      let $this = $(this);
      let src = $this.attr('src');
      $this.attr('srcset', util.srcSet(src));
    });
    
    // if there's no `excerpt` declared, grab first paragraph
    // @todo when first line is image, `$('p').first().html()` return `<img>`
    fileData.excerpt = fileData.excerpt || $('p').first().html();
    
    // add file to all data before adding content
    sectionData.all.data.push(Object.assign({}, fileData));
    
    if (pathData.dir.split('/').length > 1) {
      // if section (parent folder) is listed, add to it's data collection
      if (sections.some(x => x === sectionName)) {
        let x = Object.assign({}, fileData);
        if (sectionName !== 'blog') {
          x.weight = x.weight || 5;
        }
        sectionData[sectionName].data.push(x);
      }
    } else {
      if (pathData.name === 'index') {
        globalData.pages.push(Object.assign({}, fileData));
      }
    }

    // adding html contents
    fileData.contents = $.html();

    // ensure build directory exists first
    fs.mkdirs(path.dirname(jsonFilePath), err => {
      if (err) throw err;
      // write json file
      fs.writeFile(jsonFilePath, JSON.stringify(fileData, null, '  '), err => {
        if (err) throw err;
        done();
      });
    });
  });
}, allDone);
