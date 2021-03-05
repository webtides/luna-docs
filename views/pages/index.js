import { html, unsafeHTML } from "@webtides/moon-js";

import text, { data } from "../../content/home.md";

import factory from "../layouts/base";

const layout = page => {
    return factory(page, data);
};

export { layout };


export default () => {
    return html`
        <div class="prose py-4">
            ${unsafeHTML(text)}
        </div>
    `;
};
