const gulpFunctions = require('./gulpFunctions');
const {register, normalizePath, handleError, watch, fn} = gulpFunctions;
const {src, dest} = gulpFunctions.gulp;
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const  uglify = require('gulp-uglify');

//Load Configuration 
var config = {};

const getWatchedArray = function(configObj){
  const watchArray = [];
    if(configObj.js.jsPreprocessor){
      watchArray.push(normalizePath(configObj.js.source.replace('*','**/*')));
    } else {
      watchArray.push(normalizePath(configObj.js.source));
    }
  return watchArray;
};

module.exports = function(configurationObject){
  
  config = configurationObject;
  
  register('build:clean:js', function buildCleanJsFn (done) {
      return src(normalizePath(config.js.build + '*'))
        .pipe(gulpif(config.js.clean, clean()))
        .on('end', done);
    });
      
  register('build:js', ['build:clean:js'], function buildJsFn (done) {
    return src(normalizePath(config.js.source))
    .on("error", handleError)
    .pipe(gulpif(config.js.jsPreprocessor === 'ts', ts()))
    .on("error", handleError)
    .pipe(gulpif(config.js.minizine, uglify()))
    .pipe(rename({
      suffix: config.js.suffix
    }))
    .pipe(gulpif(config.js.concat, concat('site.js')))
    .pipe(dest(normalizePath(config.js.build)))
    .on("error", handleError)
    .on('end', done);
  });
      

  register('watch:build:js', function watchBuildJsFn(done){
    watch(getWatchedArray(config), ['build:js']);
    done();
  });

  register('watch:serve:build:js', function watchServeBuildJsFn (done){
    if(fn['serve:reload']){
      watch(getWatchedArray(config), ['build:js', 'serve:reload']);
    } else {
      watch(getWatchedArray(config), ['build:js']);
    }
    done();
  });
}