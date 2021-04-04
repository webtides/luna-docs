---
title: "Export / Static site generation"
---
# Export / Static site generation

luna-js offers a few ways to export your page. Either completely static, dynamic or just your api.

## Static export

Using `luna-js` as a static site generator is possible.
The following command exports you complete application as a static site:
```
luna --export
```

Before you can export your site, you have to set you `output` inside
your `luna.config.js`. Defaults to `.export`.

```
{
    ...,
    export: {
        output: ".export"    
    },
    ...
}
```

### Gotchas

The `loadDynamicProperties` method cannot be called in a static context. If you
export your page as a static site, it will only be called once on the export.


## Api generator

`luna-js` also allows you to export your api routes as a standalone express
application. This will only export your api, without any frontend assets.

To generate an api server, you can use the follwing command:

```
luna --export=api
```

You can configure where your exported api shoulld be saved. Defaults to the
defined export output. To change the location or the name of the generated api
export, set the `output` object inside your export section of your luna.config.js

```
{
    ...,
    export: {
        output: ".export",
        
        api: {
            output: {
                directory: ".api",
                filename: "api-server.js"
            }
        }
    },
    ...
}
```

## Hybrid export

A hybrid export is useful for serverless environments or if you generated
your static site, but don't want to loose all your serverside functionality.
`luna-js` will generate a static site and export an express application
which is configured to serve your exported static site and your api.


To generate a hybrid export run:

```
luna --export=hybrid
```

## Serverless

Exporting your api or hybrid api to a serverless environment is as easy as passing the
additional `--serverless` flag to your export command.

```
luna --export=hybrid --serverless // or
luna --export=api --serverless
```

You may have to install your npm dependencies in your exported directory.

### Gotchas

The `loadDynamicProperties` method cannot be called in a static context. If make a hybrid
 export of your application, it will only be called once on the export.

## Changing the api/asset context

Your can override your configured `api` and `asset` context paths for your exports. To to so, specify these paths
inside your `export` section.

This way you can host your api and your static site on different domains.

```js
{
    export: {
        api: {
            context: '',
            domain: '<domain-of-your-hosted-api>'
        },
        assets: {
            context: '',
            domain: '<link-to-s3-or-similar>'
        }
    }
}
´``
