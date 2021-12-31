---
title: Custom factories
---

# Custom factories

As `HTMLElements` are traditionally client side rendered we need a way to tell luna how to render and build them
on the server.

Custom factories tell luna:
 - which renderer should be used to render the component on the server
 - which properties get passed to the client

They are a great way to provide support for custom base classes like `LitElement` or the `TemplateElement` from `@webtides/element-js`.

## Using factories

In your `luna.config.js` you can define the factories for each component bundle and for your pages.

```js
// luna.config.js
{
    components: {
        bundles: [{
            // ...,
            factory: require('@webtides/luna-renderer/lib/element-js')
        }]
    },
    
    pages: {
        // ...
        factory: require('@webtides/luna-renderer/lib/element-js')
    },
}
```

## Included factories

The following factories are included inside the `@webtides/luna-renderer` package and can
be imported via `@webtides/luna-renderer/lib/<name>`.

### `@webtides/element-js`

```
require('@webtides/luna-renderer/lib/element-js')
```

Example:

```
import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';

export default class ExampleElement extends TemplateElement {

    template() {
        return html`I am an element-js element.`;
    }
}
```


### `lit`

```
require('@webtides/luna-renderer/lib/lit')
```

Example:

```
import { html, LitElement } from 'lit';

export default class ExampleElement extends LitElement {

    render() {
        return html`I am a LitElement.`;
    }
}
```


#### Known limitations

For known limitations see [https://github.com/webtides/luna-js/blob/main/packages/renderer/src/lit/README.md](https://github.com/webtides/luna-js/blob/main/packages/renderer/src/lit/README.md).
