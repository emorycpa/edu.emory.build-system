# Sample Build Configuration
`{
    "css" : {
        "suffix" : "", // REQUIRED string or empty string to append to file name,
        "source": "", // REQUIRED source path -- GOLB
        "build" : "", // REQUIRED build path
        "cssPreprocessor" : "", // REQUIRED scss, less, false -- assume plain css
        "minizine" : false, // REQUIRED true or false -- true minimizes css
        "concat" : false, // REQUIRED true or false -- concat all css to single file "site.css"
        "clean" : false // REQUIRED true or false -- if true cleans build directory --ALL-- before build
    },
    "js" : {

        "suffix" : "", // REQUIRED string or empty string to append to file name,
        "source": "", // REQUIRED source path -- GOLB
        "build" : "", // REQUIRED build path
        "jsPreprocessor" : false, // REQUIRED ts or false -- assume plain js 
        "minizine" : false, // REQUIRED true or false -- true minimizes js 
        "concat" : false, // REQUIRED true or false -- concat all css to single file "site.js"
        "clean" : false // REQUIRED true or false -- if true cleans build directory --ALL-- before build

    },
    "html" : {
        "suffix" : "", // REQUIRED string or empty string to append to file name,
        "source": "", // REQUIRED source path 
        "templates": "", // REQUIRED if templating -- njk or mustache 
        "build" : "", // REQUIRED build path
        "templateEngine" : "", // REQUIRED njk, mustache, false -- assume plain html
        "clean" : false // REQUIRED true or false -- if true cleans build directory --ALL-- before build
    },
    "static" : [ // ARRAY OF STATIC FILE DIRECTORIES TO WATCH
        {
            "task" : "",
            "source": "", // REQUIRED source path
            "build" : "" // REQUIRED build path
        },
        {
            "task" : "images",
            "source": "", // REQUIRED source path
            "build" : "" // REQUIRED build path
        }
    ],
    "browserSync" : {
        "enabled" : true, // REQUIRED true or false
        "directory" : "" // REQUIRED Directory to serve
    }
}` 