'use strict';

var gulp = require('gulp');
require('babel-core/register')
const jasmine = require('gulp-jasmine');
var gutil = require('gulp-util');
var uglify = require('gulp-uglifyjs');
var ugligy2 = require('gulp-uglify');
var Server = require('karma').Server;
var source     = require('vinyl-source-stream')
var transform = require('vinyl-transform');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var ngannotate = require('gulp-ng-annotate');


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

gulp.task('ci', ['js', 'test_ci']);
gulp.task('test', ['js', 'test_once']);
gulp.task('default', ['ci']);