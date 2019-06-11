
const {register, normalizePath} = require('./gulpFunctions');

const BROWSER_SYNC_KEY = Symbol.for('edu.emory.build-system.browserSync');

if(!(Object.getOwnPropertySymbols(global).indexOf(BROWSER_SYNC_KEY) > -1)){
  global[BROWSER_SYNC_KEY] = require('browser-sync').create();
} else {
  console.log( "Global Symbol of broswer sync in use.");
}

var config = {};

module.exports = function(configurationObject){
    config = configurationObject;

    register('serve', function browserSyncInit(done) {
        if (config.browserSync.enabled) {
          global[BROWSER_SYNC_KEY].init({
            server: {
              baseDir: normalizePath(config.browserSync.directory),
              directory: true
            }
          });
        }
        done();
    });

    register('serve:reload', function reload(done) {
        global[BROWSER_SYNC_KEY].reload();
        done();
      });

};