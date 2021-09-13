---
title: "General information about hooks"
---

# Hooks

To extend functionality and to react on certain events, `luna-js` introduces a hook system. You have
multiple of hooks available. To register a hook, create a file inside one of the directories you defined
inside the `hooks` section of your `luna.config.js`.

The hook can either be synchronous or asynchronous.

### Example of the `SERVER_STARTED` hook:
```js
import {HOOKS} from "@webtides/luna-js/src/framework/hooks/definitions";

const name = HOOKS.SERVER_STARTED;
export { name };

export default () => {
    console.log("Express server has started");
};
```

### Example of the `REQUEST_RECEIVED` hook:
```js
import {HOOKS} from "@webtides/luna-js/src/framework/hooks/definitions";

const name = HOOKS.REQUEST_RECEIVED;
export { name };

export default async ({ request, response }) => {
    console.log("Request received.");
};
```

In some cases, a hook can receive additional parameters from `luna-js`. 

## List of available hooks

You can find the list of available hooks with the parameters which are passed to them [here](/hooks/list)
