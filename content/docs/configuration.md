---
title: "Configuration file"
---
# Configuration file

The central configuration file is called `luna.config.js` and needs to be
present at the root (next to the package.json) of every luna-js project.

## First start

If you start luna-js for the first time via the cli, it will ask you
if it should generate the `luna.config.js` and a default folder structure.

## Example config file

```js
const path = require("path");

module.exports = {
    // The port on which the application is running. Defaults to 3005
    port: 3005,
    
    // The directory in which luna-js should build your application.
    build: {
        output: '.build',
        // Add support for ie11 and other browsers not supporting 
        // all native functionality
        legacy: false,
        // Simple livereload functionality for development builds
        livereload: true
    },
    
    pages: {
        // An array of directories in which your pages / routes are.
        input: [ path.join(__dirname, "views/pages") ]
    },
    
    hooks: {
        // An array of directories in which you define your hooks
        input: [ path.join(__dirname, "hooks") ]
    },
    
    api: {
        // An array of directories in which you define your api.
        input: [ path.join(__dirname, "api") ],
        
        // The context path of your api. Defaults to /api.
        context: '/api'
    },
    
    components: {
        bundles: [{
            // The directory in which you define your elements
            input: path.join(__dirname, "views/components"),
            // The output directory, relative to your public directory
            output: "assets",
            
            styles: {
                // Where luna will put your bundled styles. Relative
                // to your public directory.
                output: "assets/css/base.css",
                // A functions which returns an array of postcss plugins (e.g tailwind)
                // used by you style build. 
                plugins: () => []
            },
            
            // Should the element be rendered on the client or server or both
            defaultTarget: 'server' // 'client', 'both'
        }]
    },
    
    routes: {
        // A list of regexes to determine which routes can be cached.
        cacheable: []
    },
    
    assets: {
        // The context path that luna-js prepends to the generated scripts.
        context: '',
        // The domain from which your assets will be served.
        domain: '',
        
        styles: {
            // An array of style bundles that should be build
            bundles: [{
                // The file(s) that should be used as an input file.
                input: [ path.join(__dirname, "assets/css/main.css") ], 
                // The destination in which luna-js should output your
                // styles. Relative to the public directory
                output: "assets/css/main.css",
                // An function returning an array of additional postcss plugins
                plugins: () => []
            } ]
        },

        // A configuration object for static resources (images, fonts, ...)
        static: {
            // An array of copy tasks
            sources: [ {
                input: "assets/images/**/*", output: "assets/images^"
            } ]
        }
    },

    export: {
        // The directory in which the static export should be saved.
        output: ".export",
        
        // For a somewhat dynamic export, you can define an array of entry
        // points to generate your export. If you don't have any dynamic pages
        // you can just omit this line and luna will export all your static pages.
        entries: async () => ([ '/' ]),
        
        api: {
            output: {
                // The directory in which the api export should be saved
                directory: ".api",
                // The filename of the generated api-export
                filename: "api-export.js"    
            },
            
            // A different context path for the exported api. Defaults to /api
            context: '/api',
            // The domain from which your exported api will be served.
            domain: '',
            // An array of dependencies that should be excluded from the
            // api export
            excluded: []
        },        
        
        assets: {
            // A different context path for your assets.
            context: '',
            // The domain from which your assets will be served after export.
            domain: ''
        }
    }
}
```
