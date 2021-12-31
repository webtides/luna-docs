import DocumentLoader from "../../app/document-loader";


export default class {
    async loadDynamicProperties({ request, response }) {
        const data = DocumentLoader.loadDocumentContentsById(request.params[0] ?? '');

        if (!data) {
            return response.status(404);
        }

        return { data, title: data.title };
    }
    get template() {
        return `
            <div class="prose py-4">
                ${this.data.text}
            </div>
        `;
    }
}
