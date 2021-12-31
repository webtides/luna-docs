---
title: "Hide sensitive information"
---

# Hide sensitive information

As `luna` is a framework that is meant to be used on the client and on the server, we need
to make sure that no sensitive information gets leaked.

Per default `luna` automatically removes all injected services and the `loadStaticProperties` and `loadDynamicProperties`
methods from the production client bundle (and in turn all imports that have only been referenced there).

To remove other methods from the client bundle, `luna` provides a `HideFromClient` decorator.

```js
// example-component.js

import {HideFromClient, Component} from "@webtides/luna-js";

@Component({
    target: Component.TARGET_BOTH,
})
export default class ExampleComponent {

    async loadDynamicProperties() {
        return {
            information: await this.loadInformation(),
        };
    }
    
    @HideFromClient
    async loadInformation() {
        // You should really not define your api key here 
        // plain text inside the source code,
        // but this is another story
        const apiKey = 'my-secret-api-key';

        return fetch(`https://secret-api.example`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({apiKey}),
        });
    }
    
    get template() {
        return `
            The information is: ${this.information}.
        `;
    }
}
```

In this example the  `loadInformation` method won't be included inside the client bundle and
your `apiKey` is "secure" on the server.  
You won't be able the `loadInformation` method inside any method that
gets called on the client lifecycle. (e.g. `connectedCallback` or `template`)

**Gotchas**: This only applies to the production build (`npx luna --build NODE_ENV=production`) as the source maps
still contain all the information that is needed to reconstruct the method.
