---
title: Custom renderers
---

# Custom renderers

With custom renderers you can tell luna-js how to render different base classes.

## Using renderers

In your `luna.config.js` you can define the renderers you want to use with a root level
`renderers` config array.

```js
{
    ...,
    renderers: [
        {
            // A custom matching function for which components the renderer should be used
            match: (component) => true,
            renderer: () => require('path-to-renderer-package') // or () => await import('path')
        }
    ],
    ...
}
```

## Included renderers

The following renderers are included inside the `@webtides/luna-renderer` package and can
be imported via `@webtides/luna-renderer/lib/<name>`.

### `@webtides/element-js`

```
renderer: () => require('@webtides/luna-renderer/lib/element-js')
```

Example:

```
import { html, TemplateElement } from '@webtides/element-js';

export default class ExampleElement extends TemplateElement {

    template() {
        return html`I am an element-js element.`;
    }
}
```


### `lit`

```
renderer: () => require('@webtides/luna-renderer/lib/lit')
```

Example:

```
import { html, LitElement } from 'lit';

export default class ExampleElement extends LitElement {

    template() {
        return html`I am an element-js element.`;
    }
}
```


#### Known limitations

For known limitations see [https://github.com/webtides/luna-js/blob/main/packages/renderer/src/lit/README.md](https://github.com/webtides/luna-js/blob/main/packages/renderer/src/lit/README.md).
