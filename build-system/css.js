
const gulpFunctions = require('./gulpFunctions');
const {register, normalizePath, handleError, watch, fn} = gulpFunctions;
const {src, dest} = gulpFunctions.gulp;
const autoprefixer = require('autoprefixer')
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cssmin = require('./gulpCleanCss');
const gulpif = require('gulp-if');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

//Load Configuration 
var config = {};

const getWatchedArray = function(configObj){
    const watchArray = [];
      if(configObj.css.cssPreprocessor){
        watchArray.push(normalizePath(configObj.css.source.replace('*','**/*')));
      } else {
        watchArray.push(normalizePath(configObj.css.source));
      }
    return watchArray;
};
  

module.exports = function(configurationObject){
    config = configurationObject;
    
    register('build:clean:css', function buildCleanCssFn (done) {
        return src(normalizePath(config.css.build + '*'))
          .pipe(gulpif(config.css.clean, clean()))
          .on('end', done);
      });
      
      register('build:css', ['build:clean:css'], function buildCssFn(done) {
        return src(normalizePath(config.css.source))
          .on("error", handleError)
          .pipe(gulpif(config.css.cssPreprocessor === 'scss', sass()))
          .on("error", handleError)
          .pipe(gulpif(config.css.cssPreprocessor === 'less', less()))
          .on("error", handleError)
          .pipe(postcss([autoprefixer]))
          .pipe(gulpif(config.css.minizine, cssmin()))
          .pipe(rename({
            suffix: config.css.suffix
          }))
          .pipe(gulpif(config.css.concat, concat('site.css')))
          .pipe(dest(normalizePath(config.css.build)))
          .pipe(rename({
            suffix: '.min'
          }))
          .pipe(cssmin())
          .pipe(dest(normalizePath(config.css.build)))
          .on("error", handleError)
          .on('end', done);
      });
      
      register('watch:build:css' , function watchBuildCssFn (done){
        watch(getWatchedArray(config), ['build:css']);
        done();
      });

      register('watch:serve:build:css' , function watchServeBuildCssFn (done){
        if(fn['serve:reload']){
            watch(getWatchedArray(config), ['build:css', 'serve:reload']);
        } else {
            watch(getWatchedArray(config), ['build:css']);
        }
        done();
      });
}