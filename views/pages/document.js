import {html, LunaElement, unsafeHTML} from "@webtides/luna-js";
import DocumentLoader from "../../app/document-loader";

import layout from "../layouts/base";
export { layout };

export default class DocumentPage extends LunaElement {
    async loadDynamicProperties({ request, response }) {
        const data = DocumentLoader.loadDocumentContentsById(request.params[0] ?? '');

        if (!data) {
            response.status(404);
            return {};
        }

        return data;
    }

    template() {
        return html`
            <div class="prose py-4">
                ${unsafeHTML(this.text)}
            </div>
        `;
    }
}
