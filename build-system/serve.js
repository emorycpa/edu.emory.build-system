
const {register, normalizePath} = require('./gulpFunctions');
const browserSync = require('browser-sync').create();

var config = {};

module.exports = function(configurationObject){
    config = configurationObject;


    register('serve', function browserSyncInit(done) {
        if (config.browserSync.enabled) {
          browserSync.init({
            server: {
              baseDir: normalizePath(config.browserSync.directory),
              directory: true
            }
          });
        }
        done();
    });

    register('serve:reload', function reload(done) {
        browserSync.reload();
        done();
      });

};