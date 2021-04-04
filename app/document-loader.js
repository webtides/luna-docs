import fs from "fs";
import {data} from "../content/docs.md";
import frontmatter from "@github-docs/frontmatter";
import marked from "marked";

export default class DocumentLoader {

    static loadDocumentContentsById(id) {
        try {
            if (id.startsWith('/')) {
                id = id.substring(1);
            }

            if (id.endsWith('/')) {
                id = id.substring(0, id.length - 1);
            }

            const content = fs.readFileSync(`content/docs/${id}.md`, "utf-8");
            const result = frontmatter(content);

            return {
                text: marked(result.content),
                ...result.data,

                // next: DocumentLoader.loadNextDocument(id),
                // previous: DocumentLoader.loadPreviousDocument(id)
            }
        } catch (error) {
            return false;
        }
    }

    static loadNextDocument(id) {
        const {documents} = data;

        for (let i = 0; i < documents.length; i++) {
            if (documents[i].id === id && i < documents.length - 1) {
                return documents[i + 1];
            }
        }

        return false;
    }

    static loadPreviousDocument(id) {
        const {documents} = data;

        for (let i = 0; i < documents.length; i++) {
            if (documents[i].id === id && i < 0) {
                return documents[i - 1];
            }
        }

        return false;
    }
}
