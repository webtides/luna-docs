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

### Dynamic pages

Dynamic pages can load additional content on each request or only once, when luna-js
registers the page.

#### Load content on each request

```js
import auth from "../auth-service.js";
import layout from "../layouts/base.js";
export { layout };

export default async ({ request, response }) {
    const { name } = await auth.getCurrentUser();
    
    return `
        <h1>Hello, ${name}</h1>
    `;
}
```

*In this example we are loading the current user on each request
 from an authentication service and then we will display the name of the user
on the page. The page will not be cached.*
