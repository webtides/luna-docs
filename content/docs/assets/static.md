---
title: Static assets
---

# Static assets

Static assets, like fonts or images, need be be included in your output directory
so that they can be served by luna-js.

Inside your [luna.config.js](/configuration#assets), you can define an array
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

## Using static assets

If you ever plan to host your static assets on another domain as luna-js, you should use the `asset` helper
of the global luna object.

```js
import { html } from "@webtides/luna-js";

export default () => {
    return html`
        <img src="${luna.asset("/assets/img/example-image.png")}" alt="An example image" />
    `;
}
```

The luna object is available globally inside the server context of your luna-js application. No need to import anything.


## Setting a different asset domain

To set a different asset domain, you can change the `context` and `domain` properties inside the `assets` section of your [luna.config.js](/configuration#assets).

```js
{
    assets: {
        domain: "<url-to-a-static-file-hoster>"
        context: "<optional-context-path>"
    }
}
```
Your complete `public` folder should be uploaded to the different host or be available under the specified context.
