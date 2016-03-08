'use strict';
require('babel-core/register')

var gulp = require('gulp')
  , jasmine = require('gulp-jasmine')
  , gutil = require('gulp-util')
  , uglify = require('gulp-uglifyjs')
  , ugligy2 = require('gulp-uglify')
  , Server = require('karma').Server
  , source     = require('vinyl-source-stream')
  , transform = require('vinyl-transform')
  , browserify = require('browserify')
  , buffer = require('vinyl-buffer')
  , watchify = require('watchify')
  , sourcemaps = require('gulp-sourcemaps')
  , assign = require('lodash.assign')
  , ngannotate = require('gulp-ng-annotate')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish');


/****************************************************************************
 * 'js' task:
 * watchify 
 * bundles/concatenates all js files starting with head file: index.js
 * minifies/uglifies
 * annotates ng dependencies
 * spits out final file to /public/dest/stripe_express_angular.js
 * **************************************************************************/

// add custom browserify options here
var customOpts = {
  entries: ['./public/js/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);

var b = watchify(browserify(opts)); 

// add transformations here
//b.transform(ngannotate);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('stripe_express_angular.js'))
    //.pipe(uglify())
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(ngannotate())
    .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./public/dest'));
}

gulp.task('test_ci', function (done) {
  new Server({
    configFile: __dirname + '/karma.local.conf.js'
  }, done).start();
});

gulp.task('test_once', function (done) {
  new Server({
    configFile: __dirname + '/karma.local.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('lint', function () {
  gulp.src(['./server/*.js','./public/js/*.js','./public/js/test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish, { verbose: true }));
});

gulp.task('node-server', function () {
  nodemon({ script: './server/index.js'
          , ext: 'html js'
          , ignore: ['ignored.js']
          , tasks: [''] })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('ci', ['lint', 'js', 'node-server','test_ci']);
gulp.task('test', ['lint', 'js', 'node-server',  'test_once']);
gulp.task('default', ['ci']);