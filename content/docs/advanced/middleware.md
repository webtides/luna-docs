---
title: Middleware
---

# Middleware

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
