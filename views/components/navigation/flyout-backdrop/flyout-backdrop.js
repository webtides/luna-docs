import {BaseElement} from "@webtides/luna-js";

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
