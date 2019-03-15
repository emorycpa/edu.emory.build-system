const gulp = require('gulp');
const path = require('path');

const GulpFunctions = function GulpFunctions(){
    this.fn = {};
    this.dependencies = {};
    return this;
};

function logFileChange(event) {
  console.log('File ' + event.path ? event.path : event + ' was changed, running tasks...');
}

function handleError(err) {
  try {
    console.error("FILE:" + err.file);
    console.error("MESSAGE:" + err.messageFormatted);
    console.error("STACK:" + err.stack);
    this.emit('end');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

function noopTask(done){done();};

function reisterGulp4(name, fn, dependencies){
  let localFn;
  let localTaskArray;
  if(typeof dependencies === 'function' && Array.isArray(fn)) {
    localFn = dependencies;
    localTaskArray = fn;
  } else if(typeof fn === 'function' && Array.isArray(dependencies)) {
    localFn = fn;
    localTaskArray = dependencies;
  } else if(!(typeof fn === 'function') && Array.isArray(fn)) {
    localFn = noopTask;
    localTaskArray = fn;
  } else if (typeof fn === 'function' ) {
    localFn = fn;
    localTaskArray = dependencies;
  }

  if (!localFn) {
    localFn = noopTask;
  }

  if(!localTaskArray) {
    localTaskArray = [];
  }

  localTaskArray.push(localFn);

  gulp.task(name, gulp.series.apply(gulp, localTaskArray));

};

function reisterGulp3(name, fn, dependencies){
  let localFn;
  let localTaskArray;
  if(typeof dependencies === 'function' && Array.isArray(fn)) {
    localFn = dependencies;
    localTaskArray = fn;
  } else if(typeof fn === 'function' && Array.isArray(dependencies)) {
    localFn = fn;
    localTaskArray = dependencies;
  } else if(!(typeof fn === 'function') && Array.isArray(fn)) {
    localFn = noopTask;
    localTaskArray = fn;
  } else if (typeof fn === 'function' ) {
    localFn = fn;
    localTaskArray = dependencies;
  }

  if (!localFn) {
    localFn = noopTask;
  }

  if(!localTaskArray) {
    localTaskArray = [];
  }

  gulp.task(name, localTaskArray, localFn);

};
//Ducktype for 4.x
if(gulp.series) {
  GulpFunctions.prototype.register = reisterGulp4;
} else {
  GulpFunctions.prototype.register = reisterGulp3;
}



GulpFunctions.prototype.watch = function(globs, actions){
  if(!(Array.isArray(globs)) || !globs.every(function(value){return typeof value === 'string'})){
    throw 'Globs must in an array of strings';
  }
  
  //Ducktype for 4.x
  if(gulp.series) {
    switch(typeof actions) {
      
      case 'function':
        gulp.watch(globs, actions).on('change', logFileChange);
      break;
      
      case 'string':
        gulp.watch(globs, gulp.series(actions, function(done){done();})).on('change', logFileChange);
      break;
      
      case 'object':
        if((Array.isArray(actions)) && actions.every(function(value){return typeof value === 'string'})){
          actions.push(function(done){done();});
          gulp.watch(globs, gulp.series.apply(gulp,actions)).on('change', logFileChange);
        }
      break;
    
    }
  } else {
    switch(typeof actions) {
      
      case 'function':
        gulp.watch(globs, actions).on('change', logFileChange);
      break;
      
      case 'string':
      gulp.watch(globs, [actions]).on('change', logFileChange);
      break;
      
      case 'object':
      if((Array.isArray(actions)) && actions.every(function(value){return typeof value === 'string'})){
          gulp.watch(globs, actions).on('change', logFileChange);
        }
      break;
    
    }
  }
};

GulpFunctions.prototype.normalizePath = function normalizePath() {
  return path
      .relative(
      process.cwd(),
      path.resolve.apply(this, arguments)
      )
      .replace(/\\/g, "/");
}

GulpFunctions.prototype.handleError = handleError;

GulpFunctions.prototype.gulp = gulp;

module.exports = new GulpFunctions();