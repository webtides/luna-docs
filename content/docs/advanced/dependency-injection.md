---
title: "Dependency injection"
---

# Dependency Injection


`luna` provides a simple dependency injection pattern to define your services
and inject them into your components at runtime.



## Define a service

To define a service, you have to decorate it with the `LunaService` decorator and provide a name.

```js
// auth-service.js

import { LunaService } from '@webtides/luna-js';

@LunaService({
    name: 'auth-service'
})
export default class AuthService {
    async loadUserById(id) {
        return MagicDB.queryById(id);
    }
}
```

## Use a service

To use a service, you can inject it using the `Inject` decorator which luna provides.

```js
// example-component.js
import { Inject } from '@webtides/luna-js';
import AuthService from '../services/auth-service.js';

export default class ExampleComponent {
    @Inject(AuthService) authService;
    
    async loadDynamicProperties({ request }) {
        return {
            user: await this.authService.loadUserById(request.userId),
        };
    }
}
```

**Gotchas**:
The dependency injection currently only works on the server context. All injected services will be stripped out
on the client. This has the advantage that sensitive information and logic will stay on the server.

In the way this example is build the `AuthService` class will never be included inside the client bundle if you are building
for production. If you are not building for production, the source-maps will still contain the original code for a better
debugging experience.

## The current request

Sometimes you need the current `request` inside a service or component. For that luna provides a `CurrentRequest` decorator.
This `request` will be the default express request object.

```
// auth-service.js
import { LunaService, CurrentRequest } from '@webtides/luna-js';

@LunaService({
    name: 'auth-service'
})
export default class AuthService {
    @CurrentRequest request;
    
    async loadUserById(id) {
        return MagicDB.queryById(id);
    }
    
    async loadCurrentUser() {
        return this.loadUserById(this.request.userId);
    }
}
```

**Gotchas**: The `CurrentRequest` decorator can only be used inside components or services that are injected into components.
