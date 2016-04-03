var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var gulpBrowser = require("gulp-browser");
var uglify = require('gulp-uglify');

gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('sass', function() {
  return gulp.src('./scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

// call exclusively to compile scss without full build
gulp.task('sass:watch', function() {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('js', function() {
  return gulp.src('./js/*.js')
    .pipe(gulpBrowser.browserify())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('img', function() {
  return gulp.src('./img/*')
    .pipe(gulp.dest('./public/img/'));
});

// run 'default' gulp cmd to perform an array of tasks!
gulp.task('default', ['html', 'sass', 'js', 'img']);

gulp.task('watch', function() {
  gulp.watch('./*html', ['html']);
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['js']);
});