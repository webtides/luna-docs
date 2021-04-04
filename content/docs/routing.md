---
---

# Routing

For routing luna-js follows the classic approach of server side routing. There
is no concept of client side routing inside luna-js, which means that each navigation
results in a page reload.

## Define a route

Routes are defined by using the filesystem. Each file you create inside one of your `pages` directories
registers one route inside luna-js. The name of the file will be the name of your route *(without the .js extension)*.

`index.js` → `/`   
`home.js` → `/home`  
`articles/why-luna.js` → `/articles/why-luna` 

Creating nested routes is as easy as creating folder.

## Dynamic routes

Sometimes routes need to be dynamic. This can be achieved by using square brackets. 
The parts inside the brackets are named parameters which are available inside your
web application.

You can use these parameters inside your filename or as a folder name. And you 
can even use multiple parameters for a single route.

`users/[username].js` → `/users/:username`  
`users/[username]/friends/[friendname].js` → `/users/:username/friends/:friendname`

### Access parameters from a dynamic route

You can access the parameters inside the `loadDynamicProperties` hook of any
server rendered `LunaElement`. The `LunaElement` can either be a page or a component.

```js
// users/[username].js
import { LunaElement } from "@webtides/luna-js";

export default class UserDetailsPage extends LunaElement {
    async loadDynamicProperties({ request }) {
        const { username } = request.params;
    }
}
```
*The request parameter which gets passed to the `loadDynamicProperties` hook is 
the default `express` request object.*

## Fallback routes

Sometimes you need to define a "cache-all" route for your application. A custom 404 page would be a good example. To
define a fallback route, you can add the `fallback` property to the ´pages´ and the `api` section of your `luna.config.js`. 

You can have a different fallback route for your api and your pages.

```js
// luna.config.js
api: {
    fallback: '/my-fallback-api'
},
pages: {
    fallback: '/my-fallback-page'
}
```

```js
// pages/my-fallback-page.js
import { html } from "@webtides/luna-js";

export default () => {
    return html`Page not found`;
}
```

## Route caching

To enable route caching, you can add an array of cacheable routes
inside the `routes` section of your `luna.config.js`. 

The cacheable routes will be matched with regular expressions.

```js
// luna.config.js
module.exports = {
    routes: {
        cacheable: [
            /blog/,
            'articles/first-article'
        ]   
    }
};
```
