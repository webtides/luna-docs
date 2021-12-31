---
---
# Pages

A page is a part of your web application which can be reached by a route. Each page is a file in one of 
your defined `pages` directories. 

You can learn more about routes in [the routing section](/routing).

Pages can either be static or dynamic, which means that they only render static content or that they can load content 
in your application lifecycle and render the dynamically loaded content.

## Pages

This is the most minimal way to define a page.

```js
export default () => {
    return `
        <h1>This is a static page defined by using an anonymous function</h1>
    `;
}
```

### Component pages

Component pages share the same syntax with your other components and can use the same lifecycle methods. They won`t be
passed to the client though. 

You can read more about components in [the components section](/components).

```js
export default class {
    static async loadStaticProperties() {
        return {
            static: true,
        };
    }
    
    async loadDynamicProperties({ request, response }) {
        return {
            dynamic: true,
        };
    }
    
    get template() {
        return `<h1>This is a component page</h1>`;
    }
}
```

The `loadDynamicProperties` method can be used to load data on each request. `loadStaticProperties` can be used
to load data once at luna startup.


## Rendering engines

Just like standard component, component pages can be rendered with a custom rendering engine. To use a custom rendering
engine you just have to define the factory which contains the engine inside your `pages` section of your `luna.config.js`.

```js
// luna.config.js
{
    pages: {
        input: [],
        factory: require('@webtides/luna-renderer/lib/element-js'),
    },
}
```

**Example of a page that uses the `element-js` rendering engine.**

```js
import { html } from '@webtides/element-js/src/renderer/vanilla';

export default class {
    template() {
        return html`
            I am rendered with the vanilla renderer from element-js.
        `;
    }
}
```
