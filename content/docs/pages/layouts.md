---
---
# Layouts

A layout can be shared between a set of pages and includes the 
skeleton for each page. The layout would be the perfect place to load
your styles or external scripts.

## Define layouts

Layouts will be loaded from the path that you have defined in the `layouts` block inside your `luna.config.js`. 
Each file corresponds to one layout.

```js
// luna.config.js
layouts: {
    input: [path.join(__dirname, "views/layouts")]
}
```

## Default layout

To define a default layout, just name your layout file `default.js`. This layout will be applied to all pages
where it hasn't been overridden.

```js
// default.js
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
*Example of a layout file*

## Use a layout

To use a different layout from the default one, you have to define the name of the layout file.

```js
export function layout() {
    return 'blog'
};

export default () => {
    return `
        <h1>A page with a layout</h1>
    `;
}
```
*In this example we would load the `blog.js` file inside your layouts directory*

### Using page components

```js
export default class {
    layout() {
        return 'members';
    }
    
    get template() {
        return `<h1>Members area</h1>`;
    }
}
```
*In this example we are loading the `members.js` layout file.*

## Pass additional data to the layout

Sometimes there a little parts of your layout that can be different for each page. The
page title would be a good example.

### Export context function

One way to achieve this is to create a `context` function and export it.

```js
export async function context() {
    return {
        title: "My page title",
    };
};

export default () => {
    return `
        <h1>A page with a layout</h1>
    `;
}
```

### Using the page component context

Inside a page component, the `this` context of the component will be passed along as context to the layout.

```js
// The page component.
export default class {
    title = "My page title";
    
    layout() {
        return 'members';
    }
    
    async loadDynamicProperties() {
        const user = await userService.current();
        
        return {
            currentUserName: user.name,
        };
    }
    
    get template() {
        return `
            My page component.
        `
    }
}
```

```js
// The members.js layout file
export default (page, context = {}) => {
    return `
        <!doctype html>
        <html lang="">
            <head>
                <!-- context.title will be "My page title". -->
                <!-- context.currentUserName will be the same as returned from 'loadDynamicProperties' -->
                <title>luna-js - ${context.title ?? ""} - ${context.currentUserName ?? ''}</title>
        ...
    `;
};
```
