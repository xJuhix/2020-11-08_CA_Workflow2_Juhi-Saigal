
const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require ('gulp-imagemin');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


//sass converted to css
function css() {
    return src('sass/**/*.scss')
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream())
 }

 exports.css = css;

 //copying html files from app to dist folder
gulp.task('html', function() {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream())
})


/* img minified */
function minifyImg() {
  return gulp  .src("./app/images/*")
  .pipe(imagemin())
  .pipe(gulp.dest("./dist/images"));
}

gulp.task("minifyImg", minifyImg);
gulp.task("watch", () => {
  gulp.watch("./app/images/*", minifyImg);
});

gulp.task("default",gulp.series("minifyImg","watch"));


//browsersync
function syncWatch(){
    browserSync.init({
      server: {
        baseDir: ['./app', './dist']
      }
    });
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./app/**/*.html').on('change', browserSync.reload)
   }
   
   exports.watch = syncWatch;