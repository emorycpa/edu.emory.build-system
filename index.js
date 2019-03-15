const gulpFunctions = require('./build-system/gulpFunctions');
const {src, dest} = gulpFunctions.gulp;
const rename = require('gulp-rename');
const serveTasks = require('./build-system/serve');
const cssTasks = require('./build-system/css');
const jsTasks = require('./build-system/js');
const htmlTasks = require('./build-system/html');
const staticTasks = require('./build-system/static');

module.exports = {
    "bootstrap" : function(done){
        console.log( process.cwd());
        src('./node_modules/edu.emory.build-system/src/*')
            .pipe(dest(process.cwd()+'/src/'));
        src('./node_modules/edu.emory.build-system/build-config.json')
            .pipe(dest(process.cwd()));
        src('./node_modules/edu.emory.build-system/gulpfile-template.js')
            .pipe(rename('gulpfile.js'))
            .pipe(dest(process.cwd()));
        done();
    },
    "serve" : serveTasks,
    "css" : cssTasks,
    "js" : jsTasks,
    "html" : htmlTasks,
    "static" : staticTasks,
    "gulpFn" : gulpFunctions
};



