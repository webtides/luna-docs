---
title: Component Styles
---

# Component Styles

You can import your css files directly in your component files.

```js
import "./example-element.css";

export default class ExampleElement extends HTMLElement {
    get template() {
        return `
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

This can be useful for shadow rendered components where the style block can be
included inside the shadow root.

```js
import styles from "./shadow-element.css";

export default class ShadowElement extends HTMLElement {
    get template() {
        return `
            <template shadowroot="open">
                <div class="container">
                    I am inside the shadow root.
                </div>
                
                <style>${styles}</style>
            </template>
        `;
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

