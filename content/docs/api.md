---
title: Api routes
---

# Api routes

Api routes can be created the same way as page routes. To register an api route, just create
a file inside your `Api Directory`.

All api routes will be prefixed with `api`. If you create a `users.js` inside the root of your `Api directory`
the final url will be `/api/users`.

## Get request

Example of a basic route which will react on a get request.
```js
export default async ({ request, response }) => {
    return response.json({ result: "success" });
}
```
## Post request
Example of a basic route which will react on a post request.
```js
const post = async ({ request, response }) => {
    return response.json({ result: "success" });
};

export { post };
```

## Mixed requests

```js
const post = async ({ request, response }) => {
    return response.json({ result: "get success" });
};

const get = async ({ request, response }) => {
    return response.json({ result: "post success" });
};

export { post, get };
```

## Setting a different api domain

To set a different api domain, you can change the `context` and `domain` properties inside the `api` section of your [luna.config.js](/configuration#assets).

```js
{
    api: {
        domain: "<url-to-your-api-host>"
        context: "<optional-context-path>"
    }
}
```
