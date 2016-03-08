'use strict';
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
gulp.task('scripts:dev', () => {
  return gulp.src(['./src/pixi.js', './src/howler.core.js', './src/tween.js', './src/randomcolor.js', './src/SpaceShooter.js', './src/SpaceShooter.Player.js', './src/SpaceShooter.Assets.js', './src/SpaceShooter.Enemies.js', './src/SpaceShooter.Levels.js', './src/SpaceShooter.Tools.js', './src/game.js'])
    .pipe(plugins.concat('game.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('build/'));
});
gulp.task('assets:dev', () => {
  return gulp.src(__dirname + '/src/assets/**')
    .pipe(gulp.dest(__dirname + '/build/assets'));
});
gulp.task('html:dev', () => {
  return gulp.src(__dirname + '/src/*.html')
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(__dirname + '/build'));
});
gulp.task('css:dev', () => {
  return gulp.src(__dirname + '/src/*.css')
    .pipe(plugins.cssnano())
    .pipe(gulp.dest(__dirname + '/build'));
});
gulp.task('build:dev', [
  'scripts:dev',
  'html:dev',
  'css:dev',
  'assets:dev'
]);
gulp.task('default', ['build:dev']);
