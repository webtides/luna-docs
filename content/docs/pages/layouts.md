---
---
# Layouts

A layout can be shared between a set of pages and includes the 
skeleton for each page. The layout would be the perfect place to load
your styles or external scripts.

```js
export default (page, context = { }) => {
    return `
        <!doctype html>
        <html lang="">
            <head>
                <title>luna-js - ${context.title ?? ""}</title>
                <link href="${luna.asset(`/assets/css/main.css`)}" type="text/css" rel="stylesheet" />
                ${context.head ?? ""}
            </head>
            <body>
                <main>
                    ${page ?? ""}
                </main>
                ${context.footer ?? ""}
            </body>
        </html>
    `;
};
```

## Use a layout

To use a layout, you simply have to export it as `layout` from your page file.

```js
import layout from "../layouts/base.js";
export { layout };

export default () => {
    return `
        <h1>A page with a layout</h1>
    `;
}
```

## Pass additional data to the layout

Sometimes there a little parts of your layout that can be different for each page. The
page title would be a good example.
You can pass additional data to a layout by using the context parameter.

```js

import layoutFactory from "../layouts/base.js";
const layout = (page) => {
    return layoutFactory(page, {
        title: "My page title"
    });
};
export { layout };

export default () => {
    return `
        <h1>A page with a layout</h1>
    `;
}
```

You have to export a layout from a page. There is no default layout.
