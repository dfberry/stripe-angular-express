var gulp = require('gulp');
var browserify = require('gulp-browserify');
require('babel-core/register')
const jasmine = require('gulp-jasmine');
var Server = require('karma').Server;

gulp.task('browserify', function() {
  return gulp.
    src('./public/js/index.js').
    pipe(browserify()).
    pipe(gulp.dest('./public/bin'));
});

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
