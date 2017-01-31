const gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    //uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),

    babel = require('gulp-babel');
    //babel-preset-es2015

const browserSync = require('browser-sync');


var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();




gulp.task('build-css', [], function () {
    return gulp.src(['./public/css/reset.css','./public/css/**/*.css','./public/css/**/*.scss','./public/css/**/*.sass'])
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(cachebust.resources())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
          stream: true
        }));
});


gulp.task('build-js', [], function() {
   return gulp.src(['./public/app.js', './public/js/**/*.js'])

      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.reload({
        stream: true
      }));
});
gulp.task('move-html', function(){
  return gulp.src(['./public/views/**/*.html', './public/js/**/*.html'])
  .pipe(gulp.dest('./dist/views'));
});
gulp.task('build', [ 'build-css', 'build-js', 'move-html'], function() {
    return gulp.src('./public/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./dist'));

});

gulp.task('browserSync', function () {
  browserSync.init({
    server:{
      baseDir:'dist'
    }
  });
});

gulp.task('watch',['build', 'browserSync'], function() {
    return gulp.watch(['./public/index.html','./public/app.js','./public/views/*.html','./public/views/orderClSub/*.html', './public/css/*.css', './public/css/**/*.scss', './public/js/**/*.js']);
});
