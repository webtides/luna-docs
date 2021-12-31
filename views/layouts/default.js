const layout = (page, context = { }) => {
    const now = Date.now();

    context.head = [
        `<meta charset="UTF-8" />`,
        `<link href="${luna.asset(`/assets/css/main.css`)}" type="text/css" rel="stylesheet" />`,
        `<link href="${luna.asset(`/assets/css/base.css`)}" type="text/css" rel="stylesheet" />`,
        `<meta name="viewport" content="width=device-width, initial-scale=1">`
    ].join('');

    return `
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
                
                        <footer class="pt-24">
                             <nav>
                                <ul class="flex space-x-6">
                                    <li><a class="underline" href="https://lunajs.dev/legal">Legal</a></li>
                                    <li><a class="underline" href="https://lunajs.dev/privacy">Privacy</a></li>
                                </ul>
                            </nav>
                        </footer>
                    </div>
                </main>
                <flyout-backdrop ref="backdrop"></flyout-backdrop>
            </body>
        </html>
    `;
};

export default layout;
