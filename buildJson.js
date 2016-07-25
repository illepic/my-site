const config = require('./config');
const fs = require('fs-extra');
const util = require('./src/0-base/util');
const path = require('path');
const join = path.join;
const fm = require('gray-matter');
const each = require('async').each;
const marked = require('marked');
const cheerio = require('cheerio');
const glob = require('glob');

const fileList = glob.sync('**/*.{md,html}', {
  cwd: config.paths.content,
});

const globalData = config.site;

function buildAll(cb) {
  globalData.pages = [];
  each(fileList, (file, done) => {
    // read each file in content
    fs.readFile(join(config.paths.content, file), (err, data) => {
      if (err) throw err;
      // get path info and build new path in `dist` that ends in `.json`
      const pathData = path.parse(file);
      const fileDirectory = pathData.name === 'index'
        ? pathData.dir
        : join(pathData.dir, pathData.name);
      const jsonFilePath = join(config.paths.dist, path.format({
        dir: fileDirectory,
        name: 'index',
        ext: '.json', // renaming `{.html,.md}` => `.json`
      }));

      // parse yaml front matter contents into data
      const parsedData = fm(data.toString());
      const fileData = parsedData.data;

      // don't add drafts in production builds
      if (fileData.draft && process.env.NODE_ENV === 'production') {
        done();
        return;
      }

      // first folder name - i.e. `notes`, `utilities`, etc
      fileData.section = pathData.dir.split('/')[0];
      // if one level deep (i.e. `notes/index.json`) assume it's a landing page @todo improve
      if (pathData.dir.split('/').length === 1) {
        fileData.landingPage = true;
      }
      if (fileData.section !== 'blog') {
        fileData.weight = fileData.weight || 5;
      }

      // adding path as root relative path
      fileData.path = `/${fileDirectory}`;

      let template = '';
      if (fileData.template) {
        template = fileData.template;
      } else {
        switch (fileData.section) {
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

      if (process.env.NODE_ENV === 'production') {
        // add `srcset` to `<img>`s
        $('img').each(() => {
          const $this = $(this);
          const src = $this.attr('src');
          $this.attr('srcset', util.srcSet(src));
        });
      }

      // if there's no `excerpt` declared, grab first paragraph
      // @todo when first line is image, `$('p').first().html()` return `<img>`
      fileData.excerpt = fileData.excerpt || $('p').first().html();

      // add file to all data before adding content
      globalData.pages.push(Object.assign({}, fileData));

      // adding html contents
      fileData.contents = $.html();

      // ensure build directory exists first
      fs.mkdirs(path.dirname(jsonFilePath), mkdirsError => {
        if (mkdirsError) throw mkdirsError;
        // write json file
        fs.writeFile(jsonFilePath, JSON.stringify(fileData, null, '  '), writeFileError => {
          if (writeFileError) throw writeFileError;
          done();
        });
      });
    });
  }, () => {
    fs.mkdirsSync(join(config.paths.assets, 'data/'));
    fs.writeFileSync(
      join(config.paths.assets, 'data/', 'global.json'),
      JSON.stringify(globalData, null, '  ')
    );
    console.log(`Created JSON files for ${globalData.pages.length} pages.`);
    cb();
  });
}

module.exports = {
  buildAll,
};
