const gulp = require('gulp');
const webpack = require('webpack-stream');
const html = require('html-loader');
const imageOptimization = require('gulp-image-optimization');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
var runSequence = require('run-sequence');

// Game Tasks
gulp.task('scripts:game', () => {
  return gulp.src([(__dirname + '/game_files/js/lib/pixi.js'), (__dirname + '/game_files/js/lib/howler.core.js'), (__dirname + '/game_files/js/lib/tween.js'), (__dirname + '/game_files/js/lib/randomcolor.js'), (__dirname + '/game_files/js/SpaceShooter.js'), (__dirname + '/game_files/js/SpaceShooter.Player.js'), (__dirname + '/game_files/js/SpaceShooter.Assets.js'), (__dirname + '/game_files/js/SpaceShooter.Enemies.js'), (__dirname + '/game_files/js/SpaceShooter.Levels.js'), (__dirname + '/game_files/js/SpaceShooter.Tools.js'), (__dirname + '/game_files/js/game.js')])
    .pipe(plugins.concat('game.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(__dirname + '/../server/build/game/js/'));
});
gulp.task('images:game', () => {
  return gulp.src(__dirname + '/game_files/assets/images/**')
    .pipe(imageOptimization({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(__dirname + '/../server/build/game/assets'));
});
gulp.task('sounds:game', () => {
  return gulp.src(__dirname + '/game_files/assets/music/**')
    .pipe(gulp.dest(__dirname + '/../server/build/game/assets'));
});
gulp.task('html:game', () => {
  return gulp.src(__dirname + '/game_files/game.html')
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(plugins.rename('/app/views/game_main.html'))
    .pipe(gulp.dest(__dirname));
});
gulp.task('css:game', () => {
  var processors = [
    require('cssnext'),
    require('postcss-font-family'),
    require('postcss-font-magician'),
    require('autoprefixer'),
    require('css-mqpacker'),
    require('csswring')
  ];
  return gulp.src(__dirname + '/game_files/css/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.postcss(processors))
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(__dirname + '/../server/build/game/css/'));
});

// Client Tasks
gulp.task('favicon:dev', () => {
  return gulp.src(__dirname + '/app/favicon.ico')
    .pipe(gulp.dest(__dirname + '/../server/build'));
});
gulp.task('html:dev', () => {
  return gulp.src('app/**/*.html')
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(__dirname + '/../server/build'));
});
gulp.task('css:dev', () => {
  var processors = [
    require('cssnext'),
    require('postcss-font-family'),
    require('postcss-font-magician'),
    require('autoprefixer'),
    require('css-mqpacker'),
    require('csswring')
  ];
  return gulp.src('app/css/styles.sass')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.postcss(processors))
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(__dirname + '/../server/build/css'));
});
gulp.task('webpack:dev', () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.min.js'
      }
    }))
    .pipe(plugins.concat('bundle.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('/../server/build/js/'));
});
gulp.task('images:dev', () => {
  return gulp.src(__dirname + '/app/images/**/*')
    .pipe(imageOptimization({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(__dirname + '/../server/build/images'));
});

// Test Tasks
gulp.task('webpack:test', () => {
  return gulp.src(__dirname + '/test/test_entry.js')
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

// Build Tasks
gulp.task('build:game', function(callback) {
  runSequence('scripts:game', 'html:game', 'css:game', 'images:game', 'sounds:game', callback);
});
gulp.task('build:dev', function(callback) {
  runSequence('favicon:dev', 'html:dev', 'webpack:dev', 'css:dev', 'images:dev', callback);
});
gulp.task('build:heroku', function(callback) {
  runSequence('build:game', 'build:dev', callback);
});
gulp.task('build:test', function(callback) {
  runSequence('webpack:test', callback);
});

// Application Task
gulp.task('build:app', function(callback) {
  runSequence('build:heroku', 'build:test', callback);
});
gulp.task('default', ['build:app']);
