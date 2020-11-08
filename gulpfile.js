
const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


//copy html files from app to dist folder
gulp.task('html', function() {
    return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

//sass to css
function css() {
    return src('sass/**/*.scss')
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream())
 }

exports.css = css;


// images minified  
function minifyImg() {
  return gulp  .src("./app/images/*")
  .pipe(imagemin({
    progressive: true,
    optimizationLevel: 7,
}))
  .pipe(gulp.dest("./dist/images"));
}

gulp.task("minifyImg", minifyImg);
gulp.task("watch", () => {
  gulp.watch("./app/images/*", minifyImg);
});

gulp.task("default",gulp.series("minifyImg","watch"));


//browsersync
function watch(){
    browserSync.init({
      server: {
        baseDir: ['./app', './dist']
      }
    });
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./app/**/*.html').on('change', browserSync.reload)
  }

exports.watch = watch;