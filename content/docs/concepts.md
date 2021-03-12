---
title: Core concepts
---
# Core Concepts


## Components

Components are one of the core concepts of `moon-js`. They are based on [@webtides/element-js](https://github.com/webtides/element-js/blob/main/docs/README.md)
which is based on the WebComponents standard. It's probably a good idea to skip through the
element-js docs before continuing.

Components should be placed in a `componentsDirectory` specified in the `moon.config.js`.

Read more about components inside the dedicated [components section](/components/concepts).

## Pages/Routes

By creating a file in your configured `Pages Directory`, you can register a new route. The name of the fill will be
the name of the route.

If your `Pages Directory` is `app/pages` and you create a new file `home.js`, the route that is being registered
is `/home`.  
If you create a page inside a subdirectory, for example in `admin/dashboard.js`, the route that is being registered
is `/admin/dashboard`.

To register the  `/`-route, the name of your file should be `index.js`.

*Example of a `moon-js` route:*
```js
// index.js
import { html } from "@webtides/moon-js";

export default () => {
    return html`
        <h1>Welcome to moon-js</h1>
    `;
};
```

### Anonymous Pages

An "anonymous" page is the most simple page you can build.

This is an example of an anonymous page. It just exports a default function which returns a layout.
Anonymous pages cannot be dynamic and are cached after the first render.

```js
// index.js
import { html } from "@webtides/moon-js";

export default () => {
    return html`
        <h1>Welcome to moon-js</h1>
    `;
};
```

### Page components

A page components borrows a lot of concepts from regular components. Page components
can be dynamic and they have a context which can be used in layouts.

```js
import {html, MoonElement} from "@webtides/moon-js";
import auth from "../auth-service.js";

export default class ExamplePage extends MoonElement {
    title = "My amazing page title";

    async loadDynamicProperties({ request, response }) {
        const { name } = await auth.getCurrentUser();
        
        return {
            name
        }
    }

    template() {
        return html`
            <h1>HALLO ${this.name}</h1>
        `;
    }
}
```

## APIs

Api routes can be created the same way as page routes. To register an api route, just create
a file inside your `Api Directory`.

All api routes will be prefixed with `api`. If you create a `users.js` inside the root of your `Api directory`
the final url will be `/api/users`.

### Get request

Example of a basic route which will react on a get request.
```js
export default async ({ request, response }) => {
    return response.json({ result: "success" });
}
```
### Post request
Example of a basic route which will react on a post request.
```js
const post = async ({ request, response }) => {
    return response.json({ result: "success" });
};

export { post };
```

### Mixed requests

```js
const post = async ({ request, response }) => {
    return response.json({ result: "get success" });
};

const get = async ({ request, response }) => {
    return response.json({ result: "post success" });
};

export { post, get };
```

### Setting a different api domain

To set a different asset domain, you can change the `context` and `domain` properties inside the `api` section of your [moon.config.js](/configuration#assets).

```js
{
    api: {
        domain: "<url-to-your-api-host>"
        context: "<optional-context-path>"
    }
}
```

## Middleware

You can set middleware for specific page and api routes by exporting a `middleware` function from
your (api) route.

```js
import { auth } from "../auth-service.js";

const middleware = async () => {
    return [
        (request, response, next) => {
            if (auth.isLoggedIn) {
                next();
            } else {
                return response.status(401);
            }
        }
    ]
}

export { middleware };

export default async ({ request, response }) => {
    return "My private route";
}
```

The exported `middleware` object can also be an array.

```js
import { authMiddleware } from "../auth-service.js";

const middleware = [ authMiddleware ];
export { middleware };
```

If you want to add middleware to all routes, the best option would be to hook
into the `MIDDLEWARE_REGISTER` hook.

## Hooks

To extend functionality and to react on certain events, `moon-js` introduces a hook system. You have
multiple of hooks available. To register a hook, create a file in your `Hooks Directory`.

The hook can either be synchronous or asynchronous.

Example of the `SERVER_STARTED` hook:
```js
import {HOOKS} from "@webtides/moon-js/lib/packages/framework/hooks/definitions";

const name = HOOKS.SERVER_STARTED;
export { name };

export default () => {
    console.log("Express server has started");
};
```

Example of the `REQUEST_RECEIVED` hook:
```js
import {HOOKS} from "@webtides/moon-js/lib/packages/framework/hooks/definitions";

const name = HOOKS.REQUEST_RECEIVED;
export { name };

export default async ({ request, response }) => {
    console.log("Request received.");
};
```

A hook can receive additional parameters.

### List of available hooks

You can find the list of available hooks [here](/hooks/list)

## Rendering

Rendering on the client and on the server is done by [lit-html](https://lit-html.polymer-project.org/).

## Export / Static site generation

A description of the export capabilities of moon js can be found [here](/export)

## Express

Internally moon-js uses express for routing. You have access to the express
object in serveral hooks. There you can add custom middleware, or react
on each request being made to moon-js.
