const buildConfig = require('./build-config.json');

const {bootstrap, serve, css, js, html, static, gulpFn} = require('emory-website-build-system');

// Setup tasks
serve(buildConfig);
css(buildConfig);
js(buildConfig);
html(buildConfig);
static(buildConfig);

// Setup composite tasks
const buildTasks = ['build:css','build:js', 'build:html'];
const watchTasks = ['watch:serve:build:css','watch:serve:build:js', 'watch:serve:build:html'];

buildConfig.static.forEach(function (staticResource) {
    buildTasks.push('build:' + staticResource.task);
    watchTasks.push('watch:serve:build:' + staticResource.task);
});

gulpFn.register('bootstrap', null, bootstrap);

gulpFn.register('build', buildTasks , function fullBuildFn (done){done()});

gulpFn.register('watch', watchTasks , function fullWatchFn (done){done()});

gulpFn.register('default', ['build', 'serve', 'watch'], function buildWatchServeFn (done){done()});