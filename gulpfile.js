var gulp = require('gulp');

gulp.task('lint', function() {
    var eslint = require('gulp-eslint');
    return gulp.src(['lib/**/*.js', 'test/**/*.js', 'bin/**/*.js', 'gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('pre-test', function() {
    var istanbul = require('gulp-istanbul');
    return gulp.src('lib/tumblr.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
    var mocha = require('gulp-mocha');
    var istanbul = require('gulp-istanbul');
    return gulp.src('test/**/*.test.js', {read: false})
        .pipe(mocha())
        .pipe(istanbul.writeReports());
});

gulp.task('default', ['lint', 'test']);
