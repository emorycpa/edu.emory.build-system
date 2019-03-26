var CleanCSS = require('clean-css');
defaultsDeep = require('lodash.defaultsdeep');
var through = require('through2');
var PluginError = require('plugin-error');

var defaults = {
    format: {
        wrapAt: 1000
    }
}

module.exports = function(options){
    
    var options = defaultsDeep(options || {}, defaults);

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        var minimized ;
        var _this = this;
        try {
            minimized = new CleanCSS(options).minify(file.contents.toString()).styles;
            file.contents = Buffer.from(minimized);
        } catch (err) {
            _this.emit('error', new PluginError('gulp-mincss', err, {fileName: file.path}));
        }
        cb(null, file);
    });
};