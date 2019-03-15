const gulpFunctions = require('./build-system/gulpFunctions');
const rename = require('gulp-rename');

const serveTasks = require('./build-system/serve');
const cssTasks = require('./build-system/css');
const jsTasks = require('./build-system/js');
const htmlTasks = require('./build-system/html');
const staticTasks = require('./build-system/static');
const gulpFunctions = require('./build-system/gulpFunctions');



module.exports = {
    "bootstrap" : function(done){
        gulpFunctions.gulp.src('./src')
            .pipe(gulpFunctions.gulp.dest(gulpFunctions.normalizePath('.')));
        gulpFunctions.gulp.src('./build-config.json')
            .pipe(gulpFunctions.gulp.dest(gulpFunctions.normalizePath('.')));
        gulpFunctions.gulp.src('./gulpfile-template.js')
            .pipe(rename('gulpfile.js'))
            .pipe(gulpFunctions.gulp.dest(gulpFunctions.normalizePath('.')));
        done();
    },
    "serve" : serveTasks,
    "css" : cssTasks,
    "js" : jsTasks,
    "html" : htmlTasks,
    "static" : staticTasks,
    "gulpFn" : gulpFunctions
};



