---
title: Component Styles
---

# Component Styles

You can import your css files directly in your component files.

```js
import { MoonElement, html } from "@webtides/moon-js";

import "./example-component.css";

export default class ExampleComponent extends MoonElement {
    template() {
        return html`
            <div class="container">
                An example
            </div>
        `;
    }
}
```

The imported styles will extracted and bundled. The output file can be configured in your component bundle inside your [moon.config.js](/configuration#componentsdirectory).

### Using styles inline

If you don't want your imported styles being bundled, but rather returned as a string from your import, you just have to assign the import a variable.

```js
import styles from "./example-component.js";
```

The `styles` variable now contains the css as a string. All postcss processors work like they normally do, so you will get a processed css string.

This can be useful for shadow rendered components where we can use the style handling of [element-js](https://github.com/webtides/element-js/tree/main/docs#styles-1).  
See the following example:

```
import { MoonElement, html } from "@webtides/moon-js";

import styles from "./shadow-component.css";

export default class ShadowComponent extends MoonElement {
    constructor() {
        super({ shadowRender: true, styles: [ styles ] });
    }
    
    template() {
        return html`
            <div class="container">
                I am inside the shadow root.
            </div>
        `;
    }
    
    /**
     * Rendering inside the shadow root is not possible on the server,
     * so we have to disable server side rendering for this component.
     */
    static get disableSSR() {
        return true;
    }
}
```

## Configuration

An example configuration inside your *components bundle*:

```js
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
```

