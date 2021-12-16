---
---
# Pages

A page is a part of your web application which can be reached by a route. Each page is a file in one of 
your defined `pages` directories. 

You can learn more about routes in [the routing section](/routing).

Pages can either be static or dynamic, which means that only render static content or that they can load content 
in your application lifecycle and render the dynamically loaded content.

## Pages

This is the most minimal way to define a page.

```js
import layout from "../layouts/base.js";
export { layout };

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
    static async loadStaticProperties({ request, response }) {
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
