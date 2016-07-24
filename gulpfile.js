'use strict';
const gulp = require('gulp-help')(require('gulp'));
const config = require('./config');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const join = path.join;
const through = require('through2');
const del = require('del');
const exec = require('child_process').exec;
const each = require('async').each;
const imageResize = require('gulp-image-resize');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const gulpif = require('gulp-if');
const changed = require('gulp-changed');
const linkChecker = require('broken-link-checker');
const eslint = require('gulp-eslint');
const buildJson = require('./buildJson');

const themeConfig = yaml.safeLoad(fs.readFileSync('./config.theme.yml', 'utf8'));
const tasks = {
  'compile': [],
  'watch': [],
  'validate': [],
  'clean': [],
  'default': []
};

console.log('NODE_ENV: ' + process.env.NODE_ENV);

gulp.task('test:links', (done) => {
  let results = {};
  let l = new linkChecker.SiteChecker({

  }, {
    link: (result, customData) => {
      if (result.broken) {
        // console.log(result.base, result.url);
        console.log(`${result.base.original} ~ ${result.url.original}`);
        results[result.base.original] = result;
      }
    },
    end: () => {
      let totalPages = Object.keys(results).length;
      console.log(`${totalPages} have broken links`);
      fs.writeFile('./reports/broken-links.json', JSON.stringify(results), done);
    }
  });
  l.enqueue(`http://localhost:${themeConfig.browserSync.port}`);
});

require('p2-theme-core')(gulp, themeConfig, tasks);

function sh(cmd, exitOnError, cb) {
  var child = exec(cmd, {encoding: 'utf8'});
  var stdout = '';
  var stderr = '';
  child.stdout.on ('data', function(data) {
    stdout += data;
    process.stdout.write(data);
  });
  child.stderr.on('data', function(data) {
    stderr += data;
    process.stdout.write(data);
  });
  child.on('close', function(code) {
    if (code > 0) {
      console.log('Error with code ' + code + ' after running: ' + cmd);
      if (exitOnError){
        process.exit(code);
      } 
      // else {
      //   notifier.notify({
      //     title: cmd,
      //     message: stdout,
      //     sound: true
      //   });
      // }
    }
    if (typeof cb === 'function') { cb(); }
  });
}

function reload() {
  sh(`./node_modules/.bin/browser-sync reload --port=${themeConfig.browserSync.port}`, false); 
}

gulp.task('clean', (done) => {
  del([config.paths.dist]).then(() => {
    done();  
  });
});

gulp.task('json', (done) => {
  buildJson.buildAll(done);
});

gulp.task('html', ['json'], () => {
  sh('node compile.js', false, reload);
});

gulp.task('watch:content', () => {
  gulp.watch([
    path.join(config.paths.content, '**/*.{md,html}')
  ], ['html']);
});

gulp.task('watch:templates', () => {
  gulp.watch([
    path.join(config.paths.src, '**/*.jsx'),
    path.join(config.paths.src, '0-base/util.js'),
    path.join(config.paths.src, 'layouts/site/site.js')
  ], event => {
    console.log('File `' + path.relative(process.cwd(), event.path) + '` was ' + event.type + ', compiling...');
    sh('node compile.js', false, reload);
  });
});

tasks.compile.push('html');
tasks.default.push('watch:content');
tasks.default.push('watch:templates');

gulp.task('img:content', (allDone) => {
  let imgFiles = gulp.src(path.join(config.paths.content, '**/*.{jpg,jpeg,png}'));
  let imageminSettings = {
    progressive: true,
    use: [pngquant()]
  };
  // just move the originals unchanged
  imgFiles.pipe(gulp.dest(config.paths.dist));
  
  if (process.env.NODE_ENV === 'production') {
    each(config.imgSizes, (size, done) => {
      imgFiles
        .pipe(changed(config.paths.dist))
        .pipe(imageResize({width: size.width}))
        .pipe(imagemin(imageminSettings))
        .pipe(rename({suffix: size.suffix}))
        .pipe(gulp.dest(config.paths.dist))
        .on('end', done);
    }, allDone);
  } else {
    allDone();
  }
  
});

gulp.task('watch:img:content', () => {
  gulp.watch([
    path.join(config.paths.content, '**/*.{jpg,jpeg,png}')
  ], ['img:content']);
});

gulp.task('img:src', (allDone) => {
  let imgFiles = gulp.src(path.join(config.paths.src, '**/*.{jpg,jpeg,png}'));
  let imageminSettings = {
    progressive: true,
    use: [pngquant()]
  };
  // just move the originals unchanged
  imgFiles.pipe(gulp.dest(config.paths.assets));
  
  if (process.env.NODE_ENV === 'production') {
    each(config.imgSizes, (size, done) => {
      imgFiles
        .pipe(changed(config.paths.assets))
        .pipe(imageResize({width: size.width}))
        .pipe(imagemin(imageminSettings))
        .pipe(rename({suffix: size.suffix}))
        .pipe(gulp.dest(config.paths.assets))
        .on('end', done);
    }, allDone);
  } else {
    allDone();
  }
});

gulp.task('watch:img:src', () => {
  gulp.watch([
    path.join(config.paths.src, '**/*.{jpg,jpeg,png}')
  ], ['img:src']);
});

gulp.task('img', ['img:content', 'img:src']);

tasks.compile.push('img:content');
tasks.compile.push('img:src');
tasks.watch.push('watch:img:src');

function eslintStream(stream) {
  return stream
    .pipe(eslint())
    .pipe(eslint.format());
}

gulp.task('validate:js', () => {
  return eslintStream(gulp.src([
    path.join(config.paths.src, '**/*.{js,jsx}'),
    './*.{js,jsx}'
  ]))
  .pipe(eslint.failAfterError());
});

gulp.task('watch:validate:js', () => {
  gulp.watch([
    path.join(config.paths.src, '**/*.{js,jsx}')
  ], event => {
    console.log('File `' + path.relative(process.cwd(), event.path) + '` was ' + event.type + ', running linting...');
    return eslintStream(gulp.src([
      event.path
    ]));
  });
});

tasks.watch.push('watch:validate:js');
tasks.validate.push('validate:js');

gulp.task('rss', ['json'], (done) => {
  require('./lib/buildRss')(done);
});
tasks.compile.push('rss');

gulp.task('compile', tasks.compile);
gulp.task('clean', tasks.clean);
gulp.task('validate', tasks.validate);
gulp.task('watch', tasks.watch);
tasks.default.push('watch');
gulp.task('default', tasks.default);
