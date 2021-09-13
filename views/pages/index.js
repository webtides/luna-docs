import text, { data } from "../../content/home.md";

import factory from "../layouts/base";

const layout = page => {
    return factory(page, data);
};

export { layout };

export default () => {
    return `
        <div class="prose py-4">
            ${text}
        </div>
    `;
};
