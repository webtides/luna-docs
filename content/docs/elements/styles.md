---
title: Element Styles
---

# Element Styles

You can import your css files directly in your component files.

```js
import { LunaElement, html } from "@webtides/luna-js";

import "./example-element.css";

export default class ExampleElement extends LunaElement {
    template() {
        return html`
            <div class="container">
                An example
            </div>
        `;
    }
}
```

The imported styles will extracted and bundled. The output file can be configured in your component bundle inside your [luna.config.js](/configuration).

### Using styles inline

If you don't want your imported styles being bundled, but rather returned as a string from your import, you just have to assign the import a variable.

```js
import styles from "./example-element.js";
```

The `styles` variable now contains the css as a string. All postcss processors work like they normally do, so you will get a processed css string.
The styles from this file won't be extracted into the css file.

This can be useful for shadow rendered components where we can use the style handling of [element-js](https://github.com/webtides/element-js/tree/main/docs#styles-1).  
See the following example:

```js
import { LunaElement, html } from "@webtides/luna-js";

import styles from "./shadow-element.css";

export default class ShadowElement extends LunaElement {
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
     * so we have to disable server side rendering for this element.
     */
    static get disableSSR() {
        return true;
    }
}
```

## Configuration

An example configuration inside your *component bundle*:

```js
styles: {
    // The destination in which luna-js should output your
    // styles. Relative to the public directory
    output: "assets/css/base.css",
    // A functions which returns an array of postcss plugins (e.g tailwind)
    // used by you style build. 
    plugins: () => {
        return [
            require("tailwindcss")
        ]
    }
}
```

