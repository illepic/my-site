'use strict';
const gulp = require('gulp-help')(require('gulp'));
const config = require('./config');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const watch = require('gulp-watch');
const del = require('del');
const browserSync = require('browser-sync').create('server');
const reload = browserSync.reload;
const exec = require('child_process').exec;

const themeConfig = yaml.safeLoad(fs.readFileSync('./config.theme.yml', 'utf8'));
const tasks = {
  'compile': [],
  'watch': [],
  'validate': [],
  'clean': [],
  'default': []
};

require('p2-theme-core')(gulp, themeConfig, tasks);

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

tasks.compile.push('ms');
tasks.default.push('watch:ms');
tasks.default.push('serve');

gulp.task('compile', tasks.compile);
gulp.task('clean', tasks.clean);
gulp.task('validate', tasks.validate);
gulp.task('watch', tasks.watch);
tasks.default.push('watch');
gulp.task('default', tasks.default);
