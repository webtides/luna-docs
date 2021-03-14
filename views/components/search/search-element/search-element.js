import {apiRequest, html, MoonElement, unsafeHTML} from "@webtides/moon-js";

export default class SearchElement extends MoonElement {

    properties() {
        return {
            searchQuery: '',
            results: []
        };
    }

    connected() {
        if (this.searchQuery) {
            this.search();
        }
    }

    async search() {
        const { data } = await apiRequest(`search?query=${encodeURIComponent(this.searchQuery)}`);
        this.results = data;
    }

    events() {
        return {
            input: {
                change: async ev => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    this.searchQuery = ev.target.value;
                    this.search();
                }
            }
        };
    }

    async loadDynamicProperties({request, response}) {
        return {
            searchQuery: request.query.query ?? ''
        }
    }

    templateResult(result) {
        return html`
            <div class="border-b border-gray-900 py-4">
                <div class="prose prose-lg mb-2">
                    <h2><a href="/${result.path}">${result.path}</a></h2>
                </div>
                <div class="prose prose-sm">
                    ${unsafeHTML(result.excerpt)}
                </div>
            </div>
        `;
    }

    template() {
        return html`
            <div>query is: ${this.searchQuery}</div>
            <div><input type="text" /></div>
            
            <div>
                ${this.results.map(result => {
                    return this.templateResult(result);
                })}
            </div>
        `;
    }
}
