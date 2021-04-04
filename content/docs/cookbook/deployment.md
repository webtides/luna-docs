---
title: "Deployment"
---

# Deployment

## Standard

At its core luna-js is just a node application which uses express. As such
it can be deployed on every server which has support for node.

[Here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04) is
a nice documentation which explains how to setup a node application for production. The principles
also apply to luna-js.

All your application logic will be bundled inside the the `build` directory so in most cases
you don't have to deploy your `pages`, `api`, `hooks` or `components` directly.

### Starting luna-js without the cli

It is probably a good idea to deploy your application without the luna-cli, as it ships with
a lot of development dependencies which are not needed for running luna-js. (But you don't have to).

To start luna-js without the cli, you can simply run:

`node node_modules/@webtides/luna-js/start`


## Serverless

luna-js can easily be deployed using the [serverless framework](https://www.serverless.com/).

1. **Install the serverless framework**

See the [official documentation](https://www.serverless.com/framework/docs/).


2. **Create a minimal serverless entry point.**

To deploy your luna-js application on lambda, you have to wrap luna with
`serverless-http`. This can be installed with `npm install --save-dev serverless-http`.

```js
// serverless.js

const serverless = require("serverless-http");
const { prepareServer } = require("@webtides/luna-js/lib/framework");

const {callHook} = require("@webtides/luna-js/lib/framework/hooks");
const {HOOKS} = require("@webtides/luna-js/lib/framework/hooks/definitions");

module.exports.handler = async (event, context) => {
    const app = await prepareServer();

    await callHook(HOOKS.SERVER_STARTED, {
        app
    });

    return serverless(app, {
        binary: [ 'image/*', 'application/*' ],
    })(event, context);
};


```

**Important**: In most parts of your application, you have to use es imports. Here we have to
use commonjs.

3. **Add a `serverless.yml`**

Here is a minmal example serverless.yml:
```yml
service: example-application

provider:
  name: aws
  runtime: nodejs12.x
  stage: "dev"
  region: eu-central-1
  memorySize: 512

functions:
  app:
    handler: serverless.handler
    events:
      - http: ANY /
      - http: 'ANY {proxy+}'
    package:
      exclude:
        - "*/*"
      include:
        - ".build/**"
        - "node_modules/**"
```

4. **Setup AWS**

To use the deployed application, you have to configure your api gateway to use
a custom domain. You can find a documentation [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html).

### Gotchas

The application that is deployed this way also servers static assets over lambda. While
this is certainly possible, it could be a better idea to host your static assets in another place if
your application uses a lot of static assets.
