import { html, unsafeHTML } from "@webtides/moon-js";

import factory from "../layouts/base";

const layout = page => {
    return factory(page, {
        title: 'Search'
    });
};

export { layout };


export default () => {
    return html`
        <div class="prose">
            <h1>Search results:</h1>
            
            <search-element></search-element>
        </div>
    `;
};
