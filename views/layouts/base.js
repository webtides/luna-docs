import { html } from "@webtides/luna-js";

const layout = (page, context = { }) => {
    const now = Date.now();

    context.head = [
        html`<meta charset="UTF-8" />`,
        html`<link href="${luna.asset(`/assets/css/main.css?${now}`)}" type="text/css" rel="stylesheet" />`,
        html`<link href="${luna.asset(`/assets/css/base.css?${now}`)}" type="text/css" rel="stylesheet" />`,
        html`<meta name="viewport" content="width=device-width, initial-scale=1">`
    ];

    return html`
        <!doctype html>
        <html lang="">
            <head>
                <title>luna-js - ${context.title ?? ""}</title>
                ${context.head ?? ""}
            </head>
            <body>
                <header>
                    
                </header>
                <main class="flex min-h-screen">
                    <flyout-menu class="block main-navigation p-2 px-10 bg-gradient-to-b from-gray-700 to-gray-900 text-white">
                        <a href="/" class="w-48 block logo-container py-6 pr-3 text-3xl font-bold">luna-js</a>

                        <div>
                            <navigation-element></navigation-element>
                        </div>
                        
                    </flyout-menu>
                    
                    <div class="p-6 pb-24 page-content pl-12 lg:pl-6">
                        ${page ?? ""}
                    </div>
                </main>
                <flyout-backdrop ref="backdrop"></flyout-backdrop>
            </body>
        </html>
    `;
};

export default layout;
