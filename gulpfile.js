'use strict';
const gulp = require('gulp-help')(require('gulp'));
const config = require('./config');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const del = require('del');
const exec = require('child_process').exec;
const ms = require('./metalsmith.js');

const themeConfig = yaml.safeLoad(fs.readFileSync('./config.theme.yml', 'utf8'));
const tasks = {
  'compile': [],
  'watch': [],
  'validate': [],
  'clean': [],
  'default': []
};

console.log('NODE_ENV: ' + process.env.NODE_ENV);

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

gulp.task('ms', (done) => {
  sh('node metalsmith-cli.js', false, done);
});

gulp.task('watch:content', () => {
  gulp.watch([
    path.join(config.paths.content, '**/*.{md,html,png,jpg,jpeg}')
  ], event => {
    console.log('File `' + path.relative(process.cwd(), event.path) + '` was ' + event.type + ', running tasks...');
    ms.buildIt(reload);
  });
});

gulp.task('watch:templates', () => {
  gulp.watch([
    path.join(config.paths.src, '**/*.jsx'),
    path.join(config.paths.src, 'layouts/site/site.js')
  ], event => {
    console.log('File `' + path.relative(process.cwd(), event.path) + '` was ' + event.type + ', running tasks...');
    sh('node metalsmith-cli.js', false, reload);
  });
});

tasks.compile.push('ms');
tasks.default.push('watch:content');
tasks.default.push('watch:templates');

gulp.task('compile', tasks.compile);
gulp.task('clean', tasks.clean);
gulp.task('validate', tasks.validate);
gulp.task('watch', tasks.watch);
tasks.default.push('watch');
gulp.task('default', tasks.default);
