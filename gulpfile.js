const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
gulp.task('sass', function(){
  const plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ]
  return gulp
  .src('scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('css'))
  .pipe(postcss(plugins))
  .pipe(gulp.dest('./css/min/'))
  .pipe(browserSync.stream())
})
//define the default task
gulp.task('default', function(){
  //initialize browersync on the current folder
  browserSync.init({server: './'})
  //watch for changes to any files in scss folder in its sub folder and with .scss extension, run the sass task when a change is found
  gulp.watch('scss/**/*.scss', gulp.series('sass'))
  // watch for changes on any .html file and reload the browser on change
  gulp.watch('*.html').on('change', browserSync.reload)
})
