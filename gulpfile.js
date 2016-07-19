// including plugins
var gulp = require('gulp')
,   minifyHtml = require("gulp-minify-html")
,   minifyCss = require("gulp-minify-css")
,   sass = require("gulp-sass");


// task
gulp.task('minify-html', function () {
    gulp.src('public/_src/**/*.html') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('public/_dist'));
});

// task
gulp.task('compile-sass', function () {
    gulp.src('public/_src/assets/sass/**/*.scss') // path to your file
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('public/_dist/assets/css'));
});

// task
gulp.task('watch', function() {
  gulp.watch('public/_src/**/*.html', ['minify-html']);
  gulp.watch('public/_src/assets/sass/**/*.scss', ['compile-sass']);
});
 
 
function onError(err) {
  console.log(err);
  this.emit('end');
}