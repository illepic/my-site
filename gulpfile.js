'use strict';
const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const watch = require('gulp-watch');
const del = require('del');
const browserSync = require('browser-sync').create('server');
const reload = browserSync.reload;
const exec = require('child_process').exec;

function sh(cmd, cb) {
  exec(cmd, (err, stdout, stderr) => {
    if (err) throw err;
    process.stdout.write(stdout || stderr);
    if (typeof cb === 'function') { cb(); }
  });
}

gulp.task('clean', (done) => {
  del([config.paths.dist]).then(() => {
    done();  
  });
});

gulp.task('serve', ['ms'], () => {
  browserSync.init({
    browser: 'Google Chrome Canary',
    directory: true,
    port: process.env.PORT || 3000,
    server: {
      baseDir: config.paths.dist
    },
    open: false
  });
});

gulp.task('ms', (done) => {
  sh('node metalsmith.js', done);
  // msBuild(done);
});

gulp.task('watch:ms', ['ms'], () => {
  watch([
    path.join(config.paths.content, '**'),
    path.join(config.paths.src, '**')
  ], () => sh('node metalsmith.js', reload));
});

gulp.task('compile', [
  'ms'
]);

gulp.task('default', [
  'watch:ms',
  'serve'
]);
