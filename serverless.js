const serverless = require("serverless-http");
const { prepareServer } = require("@webtides/moon-js/lib/packages/framework");

const {callHook} = require("@webtides/moon-js/lib/packages/framework/hooks");
const {HOOKS} = require("@webtides/moon-js/lib/packages/framework/hooks/definitions");

module.exports.handler = async (event, context) => {
    const app = await prepareServer();

    await callHook(HOOKS.SERVER_STARTED, {
        app
    });

    return serverless(app, {
        binary: [ 'image/*', 'application/*' ],
    })(event, context);
};
