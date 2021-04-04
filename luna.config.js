const path = require("path");
const glob = require("glob");

const postcssPlugins = () => [
    require("tailwindcss")({config: path.join(__dirname, "tailwind.config.js")}),
    require("postcss-nested")(),
];

const production = process.env.NODE_ENV === 'production';

module.exports = {
    build: {
        output: ".build",
        livereload: true
    },

    pages: {
        input: [path.join(__dirname, "views", "pages")],
        fallback: '/document'
    },

    components: {
        bundles: [{
            input: path.join(__dirname, "views/components"),
            output: "assets",

            styles: {
                output: "assets/css/base.css",
                plugins: postcssPlugins
            }
        }]
    },

    hooks: {
        input: [path.join(__dirname, "hooks")],
    },

    api: {
        input: [path.join(__dirname, "api")],
    },

    assets: {
        domain: production ? 'https://d2x1hv6tzgwrbt.cloudfront.net' : '',
        context: '',

        styles: {
            bundles: [{
                input: [path.join(__dirname, "assets/css/main.css")],
                output: "assets/css/main.css",
                plugins: postcssPlugins
            }]
        },

        static: {
            sources: []
        }
    },

    routes: {
        cacheable: production ? [
            /.*/
        ] : []
    },

    export: {
        outputDirectory: ".export",
        apiOutputDirectory: ".api",

        assets: {
            domain: 'https://d2x1hv6tzgwrbt.cloudfront.net',
            context: ''
        },

        entries: async () => {
            const basePath = 'content/docs';

            const files = glob.sync(`${basePath}/**/*`);

            const routes = files
                .map(file => file.substring(basePath.length))
                .map(file => file.split('.md')[0]);

            return [ '/', ...routes ];
        }
    },
}
