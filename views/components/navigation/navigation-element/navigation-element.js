import {html, MoonElement} from "@webtides/moon-js";
import { data } from "../../../../content/docs.md";
import path from "path";

import "./navigation-element.css";

export default class NavigationElement extends MoonElement {

    properties() {
        return {
            navigation: []
        };
    }

    static async loadStaticProperties() {
        return data;
    }

    async loadDynamicProperties({ request }) {
        return {
            path: request.path
        }
    }

    template() {
        return html`
            ${this.navigation.map(item => {
                return html`
                    <nav class="space-y-2 mb-6">
                        <div class="text-lg font-bold px-3">${item.title}</div>
                        <ul class="space-y-1">
                            ${item.items.map(innerItem => {
                                const currentUrl = `/${path.posix.join(item.path, innerItem.id)}`;
                                return html`
                                    <li>
                                        <a href="${currentUrl}" 
                                            class="${currentUrl === this.path ? "bg-indigo-400" : ""} block rounded-xl py-2 px-3 hover:bg-indigo-400">
                                            ${innerItem.title}
                                        </a>
                                    </li>
                                `;
                            })}
                        </ul>
                    </nav>
                `;   
            })}
        `;
    }

    static get disableCSR() {
        return true;
    }
}
