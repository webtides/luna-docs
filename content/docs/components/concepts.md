---
title: "Components"
---
# Components

Components are the main building block of moon-js. They allow a great
level of encapsulation and abstraction while still being extremly flexible.

## Rendering Components

Components can be server-side rendered, client-side rendered or rendered
on the server and be hydrated on the client.

Components which render should extend the `MoonElement`, which extends the `StyledElement` from
[@webtides/element-js](https://github.com/webtides/element-js). You can use all available methods and concepts
from `element-js`.

### Engine

As a rendering engine, moon-js uses [lit-html](https://lit-html.polymer-project.org/) on
the client side and [lit-html-server](https://github.com/popeindustries/lit-html-server)
on the server side.

Example component:
```js
import {MoonElement, html} from "@webtides/moon-js";

import "./header-element.css";

export default class HeaderElement extends MoonElement {

    template() {
        return html`
            <div class="flex items-center justify-between">
                <img class="w-32" src="/assets/images/logo.png" alt="Logo" />
                
                <button class="button">Warenkorb</button>
            </div>
        `;
    }
}
```

## Non-rendering components

Components that don't render can extends the `BaseElement` directly.

```js
import {BaseElement} from "@webtides/moon-js";

export default class ClientElement extends BaseElement {
    
    connected() {
        console.log("ClientElement has connected.");
    }
}
```


## Additional class methods

moon-js provides a few additional methods in comparison to element-js:

```js
import {MoonElement, html} from "@webtides/moon-js";

export default class HeaderElement extends MoonElement {
    ...

    /**
     * An array of tag names this custom element has as children. Useful for when the element
     * is only rendered on the client, but we still need to inform the framework that it's children
     * should be loaded.
     *
     * @returns {string[]}
     */
    dependencies() { return []; }

    /**
     * This will be loaded each time the custom element is found on the page.
     * Make sure to really only load data which is unique for every element on the page.
     *
     * Here we can make calls to the database or any other service with data we require on each page load.
     *
     * If we are statically exporting the site, these properties won't ever be loaded.
     *
     * @param {*}
     *
     * @returns {Promise<{}>}   An object which holds the dynamically loaded data.
     *                          Make sure that each key returned by this method is also present
     *                          inside your {@link properties() } method. If a key is not
     *                          present, it won't be passed to the client.
     */
    async loadDynamicProperties({ request, response }) {
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

    /**
     * Sets the element to be client side only. It won't be rendered on the server.
     * But it will be included, so all imports should be compatible with a node enironment.
     *
     * @returns {boolean}
     */
    static get disableSSR() { return false; }

    /**
     * The element will only be rendered on the server. The generated javascript won't be passed
     * to the client. Useful for elements which are not interactive.
     *
     * @returns {boolean}
     */
    static get disableCSR() { return false; }

    /**
     * Sets the dynamic properties to be cacheable. Normally the dynamic properties will be reloaded
     * on every request. With this flag they will only be loaded once and then cached.
     *
     * @returns {boolean}
     */
    static get dynamicPropertiesCacheable() { return false; }
}
```

## Properties

Detailed information about component properties can be found [here](/components/properties)

