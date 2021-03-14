import fs from "fs";
import glob from "glob";

import marked from "marked";

export default async ({ request, response }) => {
    const searchQuery = request.query.query ?? '';

    const files = glob.sync("content/docs/**/*.md");

    const result = (await Promise.all(files.map(async file => {
        const contents = fs.readFileSync(file, "utf-8");

        const index = contents.toLowerCase().indexOf(searchQuery.toLowerCase());

        if (index !== -1) {
            return {
                excerpt: marked(contents.substring(Math.max(0, index - 150), Math.min(contents.length, index + 150))),
                path: file.substring('content/docs/'.length, file.length - 3)
            };
        }

        return false;
    }))).filter(result => !!result);

    return response.json(result);
};
