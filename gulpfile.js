var gulp = require('gulp');
var npmFiles = require('gulp-npm-files');
var webpack = require('webpack-stream');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('copyNpmDependencies', function() {
  return gulp.src(npmFiles(), {base: './'})
    .pipe(gulp.dest('./dist'));
});

gulp.task('bundle', function() {
  return gulp.src('./src/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function() {
  return gulp.src('./dist', {read:false})
    .pipe(clean());
});

gulp.task('copyDescriptors', function() {
  return gulp.src('./{Procfile,package.json}')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', ['copyDescriptors', 'copyNpmDependencies']);

gulp.task('default', function(cb) {
  runSequence('clean', ['copy', 'bundle'], cb);
});
