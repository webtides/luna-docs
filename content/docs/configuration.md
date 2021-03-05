---
title: "Configuration file"
---
# Configuration file

The central configuration file is called `moon.config.js` and needs to be
present at the root (next to the package.json) of every moon-js project.

## First start

If you start moon-js for the first time via the cli, it will ask you
if it should generate the `moon.config.js` and a default folder structure.

## Areas

### `port`
The port on which the application is running. Defaults to `3005`

### `buildDirectory`
The directory in which moon-js should build your application.

### `publicDirectory`
The directory in which moon-js copies your scripts required for the client

### `pagesDirectory`
An array of directories in which your pages are.

### `componentsDirectory`
An array of configuration objects for your components. A component bundle can also
have a style-build associated with it.

An example configuration object for components:
```js
{
    // The parent folder of your components directory.
    basePath: path.join(__dirname, "views"),
    // The name of your components directory
    directory: 'components',
    // The destination in which moon-js should output your
    // frontend assets. Should probably be inside your public directory.
    outputDirectory: ".build/public/assets",
    // A configuration object for css associated with this component bundle
    styles: {
        // The destination in which moon-js should output your
        // styles. Should probably be inside your public directory.
        outputDirectory: ".build/public/assets/css",
        // The name of the file
        filename: "base.css",
        // A functions which returns an array of postcss plugins (e.g tailwind)
        // used by you style build. 
        postcssPlugins: () => {
            return [
                require("tailwindcss")
            ]
        }
    }
}
```
### `hooksDirectory`
An array of directories in which your hooks are.

### `apisDirectory`
An array of directories in which your apis are.

### `legacyBuild`
A flag that indicates whether or not you want to build your
frontend assets for browsers that don't support custom elements natively.
Defaults to `false`.

### `fallbackRoute`
The route that should be called if another route could not be found.

### `fallbackApiRoute`
The api route that should be called if another api route could not be
found.

### `assets`
A configuration object for additional frontend assets outside your
component builds.

```js
{
    buildDirectory: ".build/public/assets",

    styles: {
        // An array of style bundles that should be build
        bundles: [{
            // The file(s) that should be used as an input file.
            input: [ path.join(__dirname, "assets/css/main.css") ],
            // The destination in which moon-js should output your
            // styles. Should probably be inside your public directory.
            outputDirectory: ".build/public/assets/css",
            // The name of the generated css file
            filename: "main.css",
            // An function returning an array of additional postcss plugins
            postcssPlugins: () => {
                return [];
            }
        } ]
    },

    // A configuration object for static resources (images, fonts, ...)
    static: {
        // An array of copy tasks
        sources: [ {
            input: "assets/images/**/*", output: ".build/public/assets/images^"
        } ]
    }
}
```

### `export`
Configuration object for your export.

## Example

```js
const path = require("path");

module.exports = {
    port: 3005,
    buildDirectory: ".build",
    publicDirectory: ".build/public",

    pagesDirectory: [ path.join(__dirname, "views/pages") ],

    componentsDirectory: [
        {
            basePath: path.join(__dirname, "views"),
            directory: "components",
            outputDirectory: ".build/public/assets",

            styles: {
                outputDirectory: ".build/public/assets/css",
                filename: "base.css",
                postcssPlugins: () => {
                    return [];
                }
            }
        }
    ],

    hooksDirectory: [ path.join(__dirname, "hooks") ],
    apisDirectory: [ path.join(__dirname, "api") ],

    legacyBuild: false,

    fallbackRoute: "/fallback",
    fallbackApiRoute: "/fallback",

    assets: {
        buildDirectory: ".build/public/assets",

        styles: {
            bundles: [{
                input: [ path.join(__dirname, "assets/css/main.css") ],

                outputDirectory: ".build/public/assets/css",
                filename: "main.css",
                postcssPlugins: () => {
                    return [];
                }
            } ]
        },

        static: {
            sources: [ {
                input: "assets/images/**/*", output: ".build/public/assets/images^"
            } ]
        }
    },

    export: {
        outputDirectory: ".export",
        apiOutputDirectory: ".api"
    },
}
```
