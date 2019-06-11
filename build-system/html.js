const gulpFunctions = require('./gulpFunctions');
const {register, normalizePath, handleError, watch, fn} = gulpFunctions;
const {src, dest} = gulpFunctions.gulp;
const clean = require('gulp-clean');
const gulpif = require('gulp-if');
const path = require('path');
const rename = require('gulp-rename');
const mustache = require('gulp-mustache');
const tap = require('gulp-tap');
const nunjucks = require('./gulpNunjucks');

//Load Configuration 
var config = {};

const getWatchedArray = function(configObj){
  const watchArray = [];
    watchArray.push(normalizePath(configObj.html.source));
    if(configObj.html.templateEngine === 'njk' && configObj.html.templates != false){
      watchArray.push(normalizePath(config.html.templates + '/**/*.*'));
    }
    if(configObj.html.templateEngine === 'mustache' && configObj.html.templates != false){
      watchArray.push(normalizePath(configObj.html.templates.replace('.mustache', '.json')));
      watchArray.push(normalizePath(configObj.html.templates + '/**/*.*'));
    }
  return watchArray;
};

module.exports = function(configurationObject){
  
  config = configurationObject;
  
  register('build:clean:html', null, function buildCleanHtmlFn (done) {
      return src(normalizePath(config.html.build + '*'+ config.html.extension))
        .pipe(gulpif(config.html.clean, clean()))
        .on('end', done);
    });
      
  register('build:html', ['build:clean:html'], function buildHtmlFn (done) {
    return src(normalizePath(config.html.source))
    .on("error", handleError)
    .pipe(gulpif(config.html.templateEngine === 'njk', nunjucks({
      "path": [config.html.templates]
    })))
    .on("error", handleError)
    .pipe(gulpif(config.html.templateEngine === 'mustache', tap(
      function(file, t) {
        var dataFileName = path.basename(file.path, path.extname(file.path)) + '.json';
        var dataFilePath =  path.join(path.dirname(file.path), dataFileName);
        return t.through(mustache, [require(dataFilePath)])
      }
    )))
    .on("error", handleError)
    .pipe(rename({suffix: config.html.suffix}))
    .pipe(rename({extname: config.html.extension}))
    .pipe(dest(normalizePath(config.html.build)))
    .on("error", handleError)
    .on('end', done);
  });
      

  register('watch:build:html', function watchBuildHtmlFn (done){
    watch(getWatchedArray(config), ['build:html']);
    done();
  });

  register('watch:serve:build:html' , function watchServeBuildHtmlFn (done){
    
    if(fn['serve:reload']){
      watch(getWatchedArray(config), ['build:html', 'serve:reload']);
    } else {
      watch(getWatchedArray(config), ['build:html']);
    }
    done();
  });
}