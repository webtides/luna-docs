---
title: Static assets
---

# Static assets

Static assets, like fonts or images, need be be included in your output directory
so that they can be served by moon-js.

Inside your [moon.config.js)(/configuration#assets), you can define an array
of assets which will be copied inside your output direcotry on build time.

```js
assets: {
    // A configuration object for static resources (images, fonts, ...)
    static: {
        // An array of copy tasks
        sources: [ {
            input: "assets/images/**/*", output: ".build/public/assets/images"
        } ]
    }
}
```
