'use strict';
const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const watch = require('gulp-watch');
const msBuild = require('./metalsmith').build;
const del = require('del');
const browserSync = require('browser-sync').create('server');
const reload = browserSync.reload;

gulp.task('clean', (done) => {
  del([config.paths.dist]).then(() => {
    done();  
  });
});

gulp.task('serve', ['ms'], () => {
  browserSync.init({
    browser: 'Google Chrome Canary',
    server: {
      baseDir: config.paths.dist
    },
    open: false
  });
});

gulp.task('ms', (done) => {
  msBuild(done);
});

gulp.task('watch:ms', () => {
  watch([
    path.join(config.paths.content, '**'),
    path.join(config.paths.src, '**')
  ], () => msBuild(reload));
});

gulp.task('compile', [
  'ms'
]);

gulp.task('default', [
  'watch:ms',
  'serve'
]);
