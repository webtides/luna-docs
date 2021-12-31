import DocumentLoader from "../../app/document-loader";

export default async ({ request, response }) => {
    const data = DocumentLoader.loadDocumentContentsById(request.params[0] ?? '');

    if (!data) {
        return response.status(404);
    }

    return `
        <div class="prose py-4">
            ${data.text}
        </div>
    `;
};
