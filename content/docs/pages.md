---
---
# Pages

A page is a part of your web application which can be reached by a route. Each page is a file in one of 
your defined `pages` directories. 

You can learn more about routes in [the routing section](/routing).

Pages can either be static or dynamic, which means that only render static content or that they can load content 
in your application lifecycle and render the dynamically loaded content.

## Static pages

There are two ways to write (static) pages. Either by exporting an anonymous function or by
exporting a `LunaElement`.

### Export an anonymous function

This is the most minimal way to define a page.

```js
import { html } from "@webtides/luna-js";

export default () => {
    return html`
        <h1>This is a static page defined by using an anonymous function</h1>
    `;
}
```

### Export a `LunaElement`

Defining a page by exporting a `LunaElement` is slightly more complicated. But for
more sophisticated pages encapsulating the page logic inside a class can be a
better idea. Also using a `LunaElement` as a page allows the page to load dynamic
properties.
       
```js
import {html, LunaElement} from "@webtides/luna-js";

export default class ExamplePage extends LunaElement {
    template() {
        return html`
            <h1>Hello from a LunaElement page.</h1>
        `;
    }
}
```

## Dynamic pages

Dynamic pages can load additional content on each request or only once, when luna-js
registers the page.

### Load content on each request

```js
import {html, LunaElement} from "@webtides/luna-js";
import auth from "../auth-service.js";

export default class ExamplePage extends LunaElement {
    title = "My amazing page title";

    async loadDynamicProperties({ request, response }) {
        const { name } = await auth.getCurrentUser();
        
        return {
            name
        }
    }

    template() {
        return html`
            <h1>Hello, ${this.name}</h1>
        `;
    }
}
```

*In this example we are loading the current user on each request
 from an authentication service and then we will display the name of the user
on the page. The page will not be cached.*

### Load content on server startup

```js
import {html, LunaElement} from "@webtides/luna-js";
import products from "../product-service.js";

export default class ExamplePage extends LunaElement {
    static async loadStaticProperties() {
        const products  = await products.all();
        
        return {
            products
        }
    }

    templateProduct(product) {
        return html`
            <div class="row">
                <strong class="name">${product.name}</strong>
                <span class="price">${product.price}</strong>
            </div>
        `;
    }

    template() {
        return html`
            ${this.products.map(product => this.templateProduct(product))}
        `;
    }
}
```

*In this example we are loading all products on each server start. The page
will be cached after the initial render.*
