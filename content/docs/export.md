---
title: "Export / Static site generation"
---
# Export / Static site generation

moon-js offers a few ways to export your page. Either completely static, dynamic or just your api.

## Static export

Using `moon-js` as a static site generator is possible.
The following command exports you complete application as a static site:
```
moon --export
```

Before you can export your site, you have to set you `outputDirectory` inside
your `moon.config.js`.

```
{
    ...,
    export: {
        outputDirectory: ".export"    
    },
    ...
}
```

### Gotchas

The `loadDynamicProperties` method cannot be called in a static context. If you export
your application as a static site this method will be ignored.


## Api generator

`moon-js` also allows you to export your api routes as a standalone express
application. This will only export your api, without any frontend assets.

To generate an api server, you can use the follwing command:

```
moon --export=api
```
Before you can export your api, you have to set your `apiOutputDirectory` inside
your `moon.config.js`. If `apiOutputDirectory` is not set, `moon-js` will fall back
to `outputDirectory`.

```
{
    ...,
    export: {
        outputDirectory: ".export",
        apiOutputDirectory: ".api"
    },
    ...
}
```

## Hybrid export

A hybric export is useful for serverless environments or if you generated
your static site, but don't want to loose all your serverside functionality.
`moon-js` will generate a static site and export an express application
which is configured to serve your exported static site and your api.


To generate a hybrid export run:

```
moon --export=hybrid
```

## Serverless

Exporting your api or hybrid api to a serverless environment is as easy as passing the
additional `--serverless` flag to your export command.

```
moon --export=hybrid --serverless // or
moon --export=api --serverless
```

You may have to install your npm dependencies in your exported directory.

### Gotchas

The `loadDynamicProperties` method cannot be called in a static context. If make a hybrid
 export of your application this method will be ignored.

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
