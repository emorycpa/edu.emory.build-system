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


function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function(configurationObject){
  
    config = configurationObject;

    config.static.forEach(function (staticResource) {

        const buildCleanFn = function (done) {
            return src(normalizePath(staticResource.build + '*'))
              .pipe(clean())
              .on('end', done);
        };

        Object.defineProperty(buildCleanFn, "name", { value: "buildClean" + jsUcfirst(staticResource.task) + "Fn" });

        register('build:clean:' + staticResource.task, buildCleanFn);
      
        const buildFn = function (done) {
            
            return src(normalizePath(staticResource.source))
              .on("error", handleError)
              .pipe(dest(normalizePath(staticResource.build)))
              .on("error", handleError)
              .on('end', done);
        };

        Object.defineProperty(buildFn, "name", { value: "build" + jsUcfirst(staticResource.task) + "Fn" });
      
        register('build:' + staticResource.task, ['build:clean:' + staticResource.task], buildFn);

        register('watch:build:'+ staticResource.task, null , function(done){
            watch([normalizePath(staticResource.source)], ['build:'+ staticResource.task]);
            done();
        });

        register('watch:serve:build:'+ staticResource.task, null , function(done){
            if(fn['serve:reload']){
              watch([normalizePath(staticResource.source)], ['build:'+ staticResource.task, 'serve:reload']);
            } else {
              watch([normalizePath(staticResource.source)], ['build:'+ staticResource.task]);
            }
            done();
        });

      });
    
      

};
