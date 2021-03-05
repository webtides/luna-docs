---
title: "Component properties"
---

# Properties

moon-js introduces a somewhat special property concept to load data at specific
points in the application cycle and for different contexts (client|server).

These special methods are only called on the server and are being
stripped from the code for the client.


## Methods for loading properties

### `loadStaticProperties`

The `loadStaticProperties` method is called when the component is being registered
on the server side. It can be async and here we can load data on the first server
startup which will be available in the component.

Example:
```js
static async loadStaticProperties() {
    const {productService} = await import('./product-service.js');
    const products = await productService.loadProducts();
    return { products };
}
```

In this example, each instance of the component class will receive a public property `products` with all
the products loaded from the product service. We can now use these products inside our
template and render them.


### `loadDynamicProperties`

The `loadDynamicProperties` method behaves exactly the same as the `loadStaticProperties`
method, **except** it will be called every time the component is being rendered and for every  
instance of the component. It will receive an object containing the express `request` and `response` objects.

```js
async loadDynamicProperties({ request, response }) {
    const {cartService} = await import('./cart-service.js');
    const cart = await cartService.loadUserCart(request.user);
    return { cart };
}
```

## Making properties available on the client

Loading dynamic or static properties do not make them automatically available on the client.
To make these properties available on the client, you have to define them as
actual properties, by returning the definitions from the `properties()` method.


Example:
```js
properties() {
    return {
        products []
    };
}

static async loadStaticProperties() {
    const {productService} = await import('./product-service.js');
    const products = await productService.loadProducts();
    return { products };
}
```

**Important**: The properties that are being made available on the client must be serializable.
Because they will be rendered as actual properties on the HtmlElement.
