import {BaseElement} from "@webtides/moon-js";

import "./flyout-backdrop.css";

export default class FlyoutBackdrop extends BaseElement {

    events() {
        return {
            this: {
                click: ev => {
                    this.dispatch('close-navigation', {}, true);
                }
            }
        }
    }
}
