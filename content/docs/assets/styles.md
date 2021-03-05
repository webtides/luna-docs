---
title: Styles
---

# Styles

You can have a css build that is not tied to components. For that you just have to
create an entry file (e.g. `main.css`) and tell moon-js to process it.

## Postprocessor

moon-js uses postcss as a postprocessor. You can add your own postcss plugins to
the build pipeline.

## Configuration

The css build can be configured in your [moon.config.js](/configuration#assets) in your
`assets` section.

```js
assets: {
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
    }
}
```
