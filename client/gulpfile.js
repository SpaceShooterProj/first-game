const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const html = require('html-loader');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
var runSequence = require('run-sequence');

const jsFiles = ['./*.js', 'app/**/*.js', '!node_modules/**'];
const clientScripts = ['app/js/entry.js'];
const staticFiles = ['app/**/*.html'];
const sassFiles = ['app/**/styles.sass'];
// const testFiles = ['test/test_entry.js'];

gulp.task('scripts:game', () => {
  return gulp.src(['./gameFiles/src/pixi.js', './gameFiles/src/howler.core.js', './gameFiles/src/tween.js', './gameFiles/src/randomcolor.js', './gameFiles/src/SpaceShooter.js', './gameFiles/src/SpaceShooter.Player.js', './gameFiles/src/SpaceShooter.Assets.js', './gameFiles/src/SpaceShooter.Enemies.js', './gameFiles/src/SpaceShooter.Levels.js', './gameFiles/src/SpaceShooter.Tools.js', './gameFiles/src/game.js'])
    .pipe(plugins.concat('game.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(__dirname + '/build/game/js/'));
});
gulp.task('assets:game', () => {
  return gulp.src(__dirname + '/gameFiles/src/assets/**')
    .pipe(gulp.dest(__dirname + '/build/game/assets'));
});
gulp.task('html:game', () => {
  return gulp.src(__dirname + '/gameFiles/src/game.html')
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(plugins.rename('/app/views/game_main.html'))
    .pipe(gulp.dest(__dirname));
});
gulp.task('css:game', () => {
  return gulp.src(__dirname + '/gameFiles/src/*.css')
    .pipe(plugins.cssnano())
    .pipe(gulp.dest(__dirname + '/build/game/css/'));
});
gulp.task('html:dev', () => {
  gulp.src(staticFiles)
    .pipe(gulp.dest(__dirname + '/build'));
});
gulp.task('sass:dev', () => {
  gulp.src(sassFiles)
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(__dirname + '/build'))
});
gulp.task('webpack:dev', () => {
  gulp.src(clientScripts)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});
gulp.task('images:dev', () => {
  gulp.src(__dirname + '/app/images/**/*')
    .pipe(gulp.dest(__dirname + '/build/images'));
});
gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel?presets[]=es2015'
          },
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('test/'));
});
gulp.task('build:game', function(callback) {
  runSequence('scripts:game', 'html:game', 'css:game', 'assets:game', callback);
});
gulp.task('build:dev', function(callback) {
  runSequence('html:dev', 'webpack:dev', 'sass:dev', 'images:dev', callback);
});
gulp.task('build:app', function(callback) {
  runSequence('build:game', 'build:dev', callback);
});
gulp.task('default', ['build:app']);
