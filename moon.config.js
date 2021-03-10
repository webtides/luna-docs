const path = require("path");

const postcssPlugins = () => [
    require("tailwindcss")({ config: path.join(__dirname, "tailwind.config.js") }),
    require("postcss-nested")(),
];

const production = process.env.NODE_ENV === 'production';

module.exports = {
    buildDirectory: ".build",
    publicDirectory: ".build/public",

    pagesDirectory: [ path.join(__dirname, "views", "pages") ],

    componentsDirectory: [
        {
            basePath: path.join(__dirname, "views"),
            directory: "components",
            outputDirectory: ".build/public/assets",

            styles: {
                outputDirectory: ".build/public/assets/css",
                filename: "base.css",
                postcssPlugins
            }
        }
    ],

    hooksDirectory: [ path.join(__dirname, "hooks") ],
    apisDirectory: [ path.join(__dirname, "api") ],

    legacyBuild: false,

    fallbackRoute: "/document",
    fallbackApiRoute: "/fallback",

    assets: {
        domain: production ? 'https://d2x1hv6tzgwrbt.cloudfront.net' : '',
        context: '',

        buildDirectory: ".build/public/assets",

        styles: {
            bundles: [{
                input: [ path.join(__dirname, "assets/css/main.css") ],

                outputDirectory: ".build/public/assets/css",
                filename: "main.css",

                postcssPlugins
            } ]
        },

        static: {
            sources: [
            ]
        }
    },

    export: {
        outputDirectory: ".export",
        apiOutputDirectory: ".api",

        assets: {
            domain: 'https://d2x1hv6tzgwrbt.cloudfront.net',
            context: ''
        }
    },
}
