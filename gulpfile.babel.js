// generated on 2015-11-01 using generator-gulp-webapp 1.0.3
const config = require('./config.js');
import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import through from 'through2';
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
var ms = require('./metalsmith.js');
var exec = require('child_process').execSync;
// run bash commands with: `sh('bash script/to/run.sh')`
function sh(cmd) {
  console.log(exec(cmd, {encoding: 'utf8'}));
}

gulp.task('styles', () => {
  return gulp.src(path.join(config.dir.src, '**/*.scss'))
    .pipe($.plumber())
    .pipe($.cssGlobbing({ extensions: '.scss'}))
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: [path.join(config.dir.src, 'base')]
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.dir.assets));
    //.pipe(reload({stream: true}));
});

gulp.task('watch:styles', () => {
  return gulp.watch(path.join(config.dir.src, '**/*.scss'), event => {
    console.log('File ' + path.relative(config.dir.src, event.path) + ' was ' + event.type);
    gulp.start('styles');
  })
});

gulp.task('ms', (cb) => {
  ms(cb);
});

gulp.task('watch:ms', () => {
  return gulp.watch([
      path.join(config.dir.src, '**/*.jsx'), 
      path.join(config.dir.content, '**/*.md') 
    ],
    event => {
    console.log('File ' + path.relative(config.dir.src, event.path) + ' was ' + event.type);
  // must use build process that dumps memory at end or `require()`s get cached
  sh('npm run metalsmith');
  reload();  
  })
});

gulp.task('watch:content', () => {
  return gulp.watch([
      path.join(config.dir.content, '**/*.md') 
    ],
    ['ms']);
});

gulp.task('images', () => {
  return gulp.src(path.join(config.dir.src, '**/*.{png,jpeg,jpg,gif}'))
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest(config.dir.assets));
});


gulp.task('clean', () => {
  //del(['public/*', '!public/assets']);
  del(['public']);
});

gulp.task('serve', () => {
  browserSync({
    notify: false,
    port: 9000,
    directory: true,
    server: {
      baseDir: [config.dir.public]
    }
  });
  //gulp.watch(path.join(config.dir.public, '**')).on('change', reload);
});



gulp.task('build', ['styles', 'ms'], () => {
  return gulp.src('public/**/*').pipe($.size({title: 'build'}));
});

gulp.task('default', [
  'serve',
  'build',
  'watch:styles',
  'watch:content',
  'watch:ms'
]);