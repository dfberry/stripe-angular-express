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

// add custom browserify options here
var customOpts = {
  entries: ['./public/js/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
//console.log(opts);

var b = watchify(browserify(opts)); 

//console.log(b);

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    //.pipe(uglify())
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./public/dest')) // writes .map file
    .pipe(gulp.dest('./public/dest'));
}



gulp.task('watch', function() {
  gulp.watch([
      './public/js/*.js'
      ,'./public/js/test/*.js'], 
      ['browserify', 'tdd']);
});


gulp.task('jasmine', () =>
	gulp.src('./test/main.test.js')
		// gulp-jasmine works on filepaths so you can't have any plugins before it 
		.pipe(jasmine({'verbose': true}))
);

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.local.conf.js'
  }, done).start();
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.local.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['watch']);
