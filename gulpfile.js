const gulp = require('gulp-help')(require('gulp'));
const config = require('./config');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const join = path.join;
const exec = require('child_process').exec;
const each = require('async').each;
const imageResize = require('gulp-image-resize');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const linkChecker = require('broken-link-checker');
const eslint = require('gulp-eslint');
let buildJson = require('./lib/buildJson');
const buildRss = require('./lib/buildRss');
const buildRedirects = require('./lib/buildRedirects');

const themeConfig = yaml.safeLoad(fs.readFileSync('./config.theme.yml', 'utf8'));
if (process.env.NODE_ENV === 'production') {
  themeConfig.css.dest = './dist--prod/assets';
  themeConfig.browserSync.baseDir = './dist--prod';
}

const tasks = {
  compile: [],
  watch: [],
  validate: [],
  clean: [],
  default: [],
};

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

gulp.task('test:links', (done) => {
  const results = {};
  const l = new linkChecker.SiteChecker({
    excludeExternalLinks: true,
  }, {
    link: (result) => {
      if (result.broken) {
        // console.log(result.base, result.url);
        console.log(`${result.base.original} ~ ${result.url.original}`);
        results[result.base.original] = result;
      }
    },
    end: () => {
      const totalPages = Object.keys(results).length;
      console.log(`${totalPages} have broken links`);
      fs.writeFile('./reports/broken-links.json', JSON.stringify(results), done);
    },
  });
  l.enqueue(`http://localhost:${themeConfig.browserSync.port}`);
});

gulp.task('test:images', (done) => {
  const results = {};
  const l = new linkChecker.SiteChecker({

  }, {
    link: (result) => {
      if (result.broken) {
        const x = result.url.original;
        if (x.endsWith('jpg') || x.endsWith('jpeg') || x.endsWith('png')) {
          console.log(`${result.base.original} ~ ${result.url.original}`);
          results[result.base.original] = result;
        }
      }
    },
    end: () => {
      const totalPages = Object.keys(results).length;
      console.log(`${totalPages} have broken links`);
      fs.writeFile('./reports/broken-images.json', JSON.stringify(results), done);
    },
  });
  l.enqueue(`http://localhost:${themeConfig.browserSync.port}`);
});

require('p2-theme-core')(gulp, themeConfig, tasks);

function sh(cmd, exitOnError, cb) {
  const child = exec(cmd, { encoding: 'utf8' });
  child.stdout.on('data', data => process.stdout.write(data));
  child.stderr.on('data', data => process.stdout.write(data));
  child.on('close', code => {
    if (code > 0) {
      console.log(`Error with code ${code} after running: ${cmd}`);
      if (exitOnError) {
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

gulp.task('json', (done) => {
  buildJson.buildAll(() => {
    reload();
    done();
  });
});

gulp.task('watch:buildJson', () => {
  gulp.watch('./lib/buildJson.js', () => {
    const x = require.resolve('./lib/buildJson');
    delete require.cache[x];
    buildJson = require('./lib/buildJson'); // eslint-disable-line global-require
    buildJson.buildAll();
  });
});

tasks.watch.push('watch:buildJson');

gulp.task('html', ['json'], (done) => {
  sh('node lib/compile.js', false, () => {
    // reload();
    done();
  });
});

gulp.task('watch:content', () => {
  gulp.watch([
    join(config.paths.content, '**/*.{md,html}'),
  ], ['html'])
  .on('error', error => {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {
      return;
    }
  });
});

gulp.task('watch:templates', () => {
  gulp.watch([
    join(config.paths.src, '**/*.jsx'),
    join(config.paths.src, '0-base/util.js'),
    join(config.paths.src, 'layouts/site/site.js'),
  ], event => {
    console.log(`'${path.relative(process.cwd(), event.path)}' was ${event.type}, compiling...`);
    sh('node lib/compile.js', false, reload);
  });
});

tasks.compile.push('html');
tasks.default.push('watch:content');
tasks.default.push('watch:templates');

gulp.task('img:content', (allDone) => {
  const imgFiles = gulp.src(join(config.paths.content, '**/*.{jpg,jpeg,png}'));
  const imageminSettings = {
    progressive: true,
    use: [pngquant()],
  };
  // just move the originals unchanged
  imgFiles.pipe(gulp.dest(config.paths.dist));

  if (config.feat.srcset) {
    each(config.imgSizes, (size, done) => {
      imgFiles
        .pipe(changed(config.paths.dist))
        .pipe(imageResize({ width: size.width }))
        .pipe(imagemin(imageminSettings))
        .pipe(rename({ suffix: size.suffix }))
        .pipe(gulp.dest(config.paths.dist))
        .on('end', done);
    }, allDone);
  } else {
    allDone();
  }
});

gulp.task('watch:img:content', () => {
  gulp.watch([
    join(config.paths.content, '**/*.{jpg,jpeg,png}'),
  ], ['img:content']);
});

gulp.task('img:src', (allDone) => {
  const imgFiles = gulp.src(join(config.paths.src, '**/*.{jpg,jpeg,png}'));
  const imageminSettings = {
    progressive: true,
    use: [pngquant()],
  };
  // just move the originals unchanged
  imgFiles.pipe(gulp.dest(config.paths.assets));

  if (config.feat.srcset) {
    each(config.imgSizes, (size, done) => {
      imgFiles
        .pipe(changed(config.paths.assets))
        .pipe(imageResize({ width: size.width }))
        .pipe(imagemin(imageminSettings))
        .pipe(rename({ suffix: size.suffix }))
        .pipe(gulp.dest(config.paths.assets))
        .on('end', done);
    }, allDone);
  } else {
    allDone();
  }
});

gulp.task('watch:img:src', () => {
  gulp.watch([
    join(config.paths.src, '**/*.{jpg,jpeg,png}'),
  ], ['img:src']);
});

gulp.task('img', ['img:content', 'img:src']);

const miscFiles = [
  join(config.paths.content, '**/*.*'),
  `!${join(config.paths.content, '**/*.{jpg,jpeg,png,html,md}')}`,
];

gulp.task('misc', (done) => {
  gulp.src(miscFiles)
  .pipe(gulp.dest(config.paths.dist))
  .on('end', done);
});

gulp.task('watch:misc', () => {
  gulp.watch(miscFiles, ['misc']);
});

tasks.compile.push('misc');
tasks.watch.push('watch:misc');

tasks.compile.push('img:content');
tasks.compile.push('img:src');
tasks.watch.push('watch:img:src');

function eslintStream(stream) {
  return stream
    .pipe(eslint())
    .pipe(eslint.format());
}

gulp.task('validate:js', () => eslintStream(gulp.src([
  join(config.paths.src, '**/*.{js,jsx}'),
  './*.{js,jsx}',
]))
.pipe(eslint.failAfterError()));

gulp.task('watch:validate:js', () => {
  gulp.watch([
    join(config.paths.src, '**/*.{js,jsx}'),
    './*.{js,jsx}',
  ], event => {
    console.log(`'${path.relative(process.cwd(), event.path)}' was ${event.type}, linting...`);
    return eslintStream(gulp.src([
      event.path,
    ]));
  });
});

tasks.watch.push('watch:validate:js');
tasks.validate.push('validate:js');

gulp.task('rss', ['json'], (done) => {
  buildRss(done);
});

gulp.task('redirects', ['json'], (done) => {
  buildRedirects.buildAll(done);
});

if (process.env.NODE_ENV === 'production') {
  tasks.compile.push('rss');
  tasks.compile.push('redirects');
}

gulp.task('compile', tasks.compile);
gulp.task('clean', tasks.clean);
gulp.task('validate', tasks.validate);
gulp.task('watch', tasks.watch);
tasks.default.push('watch');
gulp.task('default', tasks.default);
