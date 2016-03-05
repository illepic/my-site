'use strict';
const gulp = require('gulp');
const watch = require('gulp-watch');
const msBuild = require('./metalsmith').build;
const del = require('del');
const browserSync = require('browser-sync').create('server');
const reload = browserSync.reload;

gulp.task('clean', (done) => {
  del(['./dist']).then(() => {
    done();  
  });
});

gulp.task('serve', ['ms'], () => {
  browserSync.init({
    browser: 'Google Chrome Canary',
    // files: [
    //   './dist/*'
    // ],
    server: {
      baseDir: './dist'
    },
    // port: config.browserSync.port,
    open: false
    // reloadDelay: config.browserSync.reloadDelay,
    // reloadDebounce: config.browserSync.reloadDebounce,
  });
  gulp.watch('./dist/*').on('change', reload);
});

gulp.task('ms', (done) => {
  msBuild(done);
});

gulp.task('watch:ms', () => {
  watch([
    './content/**',
    './src/**'
  ], () => {
    msBuild();
  });
  // gulp.watch([
  //   './content/**',
  //   './src/**'
  // ], ['ms']);
});

gulp.task('compile', [
  'ms'
]);

gulp.task('default', [
  'watch:ms',
  'serve'
]);
