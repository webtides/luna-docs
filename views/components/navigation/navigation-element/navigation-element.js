import { data } from "../../../../content/docs.md";
import path from "path";

import "./navigation-element.css";

export default class NavigationElement {
    static async loadStaticProperties() {
        return data;
    }

    async loadDynamicProperties({ request }) {
        return {
            path: request.path
        }
    }

    get template() {
        return `
            ${this.navigation.map(item => {
                return `
                    <nav class="space-y-2 mb-6">
                        <div class="text-md font-bold">${item.title}</div>
                        <ul class="space-y-1">
                            ${item.items.map(innerItem => {
                                const currentUrl = `/${path.posix.join(item.path, innerItem.id)}`;
                                return `
                                    <li>
                                        <a href="${currentUrl}" 
                                            class="${this.path === currentUrl ? 'text-white' : 'text-gray-300'} text-sm block rounded-xl py-1 hover:text-white">
                                            ${innerItem.title}
                                        </a>
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                    </nav>
                `;   
            }).join('')}
        `;
    }
}
