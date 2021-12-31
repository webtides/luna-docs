---
title: "Components"
---

# Components

Components are the main building block of luna-js. They allow a great level of encapsulation and abstraction while still
being extremly flexible. On the client they provide a `CustomElement` which extend the standard `HTMLElement` which is
available in all modern browsers.

## Concepts

Components are one of the core concepts of luna-js. They are based on the WebComponents standard and can, with the help
of custom renderers, use any base class which extend the standard `HTMLElement`.

They are placed inside one of the `bundles` specified in the `components` section of your `luna.config.js`. A component
bundle contains the element definition and additional information about the build. For example the css settings.

### Define a bundle in your `luna.config.js`

```js
// luna.config.js
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
        }
    }]
},
```

## Defining a component

Components are automatically defined if they are placed inside one of your component directories. They are just basic
classes which extend the HTMLElement.  
Additionally `luna-js` provides a decorator, which can be used to define some metadata on the element

```js
import {Component} from '@webtides/luna-js';

@Component({
    target: Component.TARGET_BOTH,
})
export default class ImageElement extends HTMLElement {

}
```

### The `@Component` decorator

The `@Component`-decorator can be used to modify some standards behaviours. The following options are available:

- `selector`: Specify a different selector for the element
- `target`: Specify where the element should be rendered. Following options are available:
  - `Component.TARGET_SERVER`: Default. The element will only be rendered on the server and no JavaScript will be passed to the client.
  - `Component.TARGET_CLIENT`: The element will only be passed to the client and not rendered on the server.
  - `Component.TARGET_BOTH`: The element will be prerendered on the server and the JavaScript will be passed to the client.

## Render a component

Components can be server-side rendered, client-side rendered or rendered on the server and be hydrated on the client.
Per default, elements are only rendered on the server. To pass the component to the client you need to set the `target`
property in the `@Component`-decorator to `Component.TARGET_CLIENT` or `Component.TARGET_BOTH`.

To define a rendering element, create a class which extends the `HTMLElement` (or another BaseClass). Without any extra configuration this
element will render only on the server.

Example component:

```js
import "./header-element.css";

export default class HeaderElement extends HTMLElement {

    get template() {
        return `
            <div class="flex items-center justify-between">
                <img class="w-32" src="/assets/images/logo.png" alt="Logo" />
                
                <button class="button">Cart</button>
            </div>
        `;
    }
}
```

### Render engine

Luna does not ship with it's own render engine, but allows different engines to be plugged in by using a 
dedicated factory. The following first class factories can be found inside the `@webtides/luna-renderer` npm package:

- `@webtides/element-js`
- `lit`

#### Use a render engine

To use a different render engine you need to specify the factory which includes the engine inside 
a components bundle.

```js
// luna.config.js

components: {
  bundles: [{
    input: path.join(__dirname, "views/components"),
    output: "assets",
    
    // Use the factory for element-js. It includes a server rendering engine which is
    // compatible with the engine used by element-js
    factory: require('@webtides/luna-renderer/lib/element-js'),
  }]
},
```
**Example of a component that uses the `element-js` rendering engine.**

```js
// example-component.js

import { Component } from '@webtides/luna-js';
import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';

@Component({
  target: Component.TARGET_BOTH,
})
export default class ExampleComponent extends TemplateElement {
    template() {
        return html`
            I am rendered with the vanilla renderer from element-js.
        `;
    }
}
```
*The vanilla renderer from element-js supports server rendering and client side hydration*

## Non-rendering components

Components that don't render, can just omit the `template` getter.

```js
export default class ClientElement extends HTMLElement {

    connectedCallback() {
        console.log("ClientElement has connected.");
    }
}
```

## Using components

You can use a component by adding its tag name to your html. The tag name will be your component class name, but
transformed to dash-case.

```js
// The component definition
export default class TestElement extends HTMLElement {
    get template() {
        return html`
            Test element
        `;
    }
}
```

```html
<!-- Using the component -->
<main>
    <test-element></test-element>
</main>
```

## Loading data

Detailed information about loading data in an element can be found [here](/components/properties)

## Don't pass javascript to the client.

Per default, `luna-js` does not pass any javascript to the client.

## Additional class methods

luna-js injects a few methods inside the element that can be used to load data.

```js
export default class HeaderElement extends HTMLElement {
...

    /**
     * This will be loaded each time the custom element is found on the page.
     * Make sure to really only load data which is unique for every element on the page.
     *
     * Here we can make calls to the database or any other service with data we require on each page load.
     *
     * @param {*}
     *
     * @returns {Promise<{}>}   An object which holds the dynamically loaded data.
     *                          Make sure that each key returned by this method is also present
     *                          inside your {@link properties() } method. If a key is not
     *                          present, it won't be passed to the client.
     */
    async loadDynamicProperties({request, response}) {
        return false;
    }


    /**
     * These properties will be loaded once as the server starts up, or if
     * we want to statically export our site.
     *
     * @returns {Promise<{}>}   An object which holds the statically loaded data.
     *                          Make sure that each key returned by this method is also present
     *                          inside your {@link properties() } method. If a key is not
     *                          present, it won't be passed to the client.
     */
    static async loadStaticProperties() {
        return false;
    }
}
```
