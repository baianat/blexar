/**
 * gulp modules
 */
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sequence = require('gulp-sequence');
const gulpIf = require('gulp-if');

const del = require('del');


let env = 'dev'

function isProduction() {
  return env === 'production';
};

/**
 * Watch task
 */
gulp.task('watch', () => {
  gulp.watch('./**/*.styl', ['styles']);
});

/**
 * Styles task
 */
gulp.task('styles', () => {
  gulp.src('./blexar.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: isProduction()
    }))
    .pipe(rename({
      suffix: isProduction() ? '.min' : ''
    }))
    .pipe(autoprefixer('last 5 version'))
    .pipe(gulpIf(!isProduction(), sourcemaps.write('.')))
    .pipe(gulp.dest('./dist/css'))

});

/**
 * fonts task
 */
gulp.task('font', () => {
  gulp.src('./src/font/*')
    .pipe(gulp.dest('./dist/font/'));
});


/**
 * Clean task
 * remove dist folders from all projects
 */
gulp.task('clean', () => {
  return del('dist');
});

gulp.task('chnageEnv', () => { env = 'production' });

gulp.task('production', sequence(
  'clean',
  'styles',
  'chnageEnv',
  'styles'
));

/**
 * Default task
 */
gulp.task('default', ['styles', 'watch']);
