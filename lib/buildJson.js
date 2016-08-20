const config = require('./../config');
const fs = require('fs-extra');
const util = require('./../src/0-base/util');
const path = require('path');
const join = path.join;
const fm = require('gray-matter');
const each = require('async').each;
const marked = require('marked');
const cheerio = require('cheerio');
const glob = require('glob');
const moment = require('moment-timezone');
const hljs = require('highlight.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const globalData = config.site;

function getTemplateName(data) {
  let template = '';
  if (data.template) {
    template = data.template;
  } else {
    switch (data.section) {
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
  return template.trim();
}

/**
 * Date to Date Strings
 * @param date {(date|string)} A `date` or a string like `2016-08-19`
 * @returns {{month: string, day: string, year: string}} A dateString object
 */
function datePrep(date) {
  moment.tz.setDefault('UTC');
  const dateStamp = (typeof date === 'string')
    ? moment(date, 'YYYY-MM-DD')
    : moment(date).tz('America/Los_Angeles').format();
  return {
    month: moment(dateStamp).format('MMM'),
    day: moment(dateStamp).format('D'),
    year: moment(dateStamp).format('YYYY'),
  };
}

function buildAll(cb) {
  globalData.pages = [];
  each(glob.sync('**/*.{md,html}', { cwd: config.paths.content, }), (file, done) => {
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

      if (fileData.section !== 'blog') {
        fileData.weight = fileData.weight || 5;
      }

      // adding path as root relative path
      fileData.path = fileDirectory ? `/${fileDirectory}/` : '/';

      if (
        !fileData.landingPage &&
        ['blog', 'notes', 'utilities'].some(x => x === fileData.section)
      ) {
        fileData.comments = true;
      }

      fileData.template = getTemplateName(fileData);

      if (fileData.date) {
        fileData.dateStrings = datePrep(fileData.date);
      }

      // add original markdown to data
      // fileData.markdown = pathData.ext === '.md' ? x.content : false;

      // if markdown, parse to html
      const html = pathData.ext === '.md' ? marked(parsedData.content) : parsedData.content;

      const $ = cheerio.load(html);

      // add `srcset` to `<img>`s
      $('img').each(function () {
        const $this = $(this);
        let src = $this.attr('src');
        let isRemote = util.isPathRemote(src);
        if (!util.isPathRootRelative(src) && !isRemote) {
          src = path.join(fileData.path, src);
          $this.attr('src', src);
        }
        if (config.feat.srcset && !isRemote) {
          $this.attr('srcset', util.srcSet(src));
        }
      });

      $('a').each(function () {
        const $this = $(this);
        let href = $this.attr('href');
        if (!util.isPathRemote(href) && !util.isPathRootRelative(href)) {
          // it's a relative path like `file.zip` or `img/a.jpg`
          $this.attr('href', path.join(fileData.path, href));
        }
        if (util.isPathRemote(href)) {
          $this.attr('target', '_blank');
        }
      });

      // syntax highlighting
      $('pre > code').each(function () {
        const $this = $(this);
        const initialCode = entities.decode($this.html());
        const highlightedCode = hljs.highlight('bash', initialCode);
        $this.html(highlightedCode.value);
        $this.addClass('hljs');
        $this.before('<button class="code-btn">Copy</button>');
      });

      const toc = [];
      // if (fileData.hideToc) {
        $('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function() {
          const $this = $(this);
          toc.push({
            id: $this.attr('id'),
            title: $this.text(),
            tagName: $this.get(0).tagName,
          });
        });
      // }

      // if there's no `excerpt` declared, grab first paragraph
      // @todo when first line is image, `$('p').first().html()` return `<img>`
      fileData.excerpt = fileData.excerpt || $('p').first().html();

      // add file to all data before adding content
      globalData.pages.push(Object.assign({}, fileData));

      // adding html contents
      fileData.contents = $.html();

      // table of contents
      fileData.toc = toc;

      // path to original source file
      fileData.srcPath = file;

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
    const datedPages = [];
    const otherPages = [];
    globalData.pages.forEach(page => {
      if (page.date) {
        datedPages.push(page);
      } else {
        otherPages.push(page);
      }
    });
    datedPages.sort((a, b) => new Date(b.date) - new Date(a.date));
    otherPages.sort((a, b) => a.weight > b.weight);
    globalData.pages = datedPages.concat(otherPages);
    fs.writeFileSync(
      join(config.paths.assets, 'data/', 'global.json'),
      JSON.stringify(globalData, null, '  ')
    );
    console.log(`Created JSON files for ${globalData.pages.length} pages.`);
    if (typeof cb === 'function') cb();
  });
}

module.exports = {
  buildAll,
  datePrep,
};
