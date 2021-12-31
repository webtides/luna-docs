import text, { data } from "../../content/home.md";

export default class {

    static async loadStaticProperties() {
        return {
            data,
        };
    }

    get template() {
        return `
            <div class="prose py-4">
                ${text}
            </div>
        `;
    }
}
