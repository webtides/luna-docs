import {BaseElement} from "@webtides/moon-js";

export default class FlyoutMenu extends BaseElement {

    connected() {
        setTimeout(() => {
            this.classList.add('connected');
        }, 200);
    }

    properties() {
        return {
            visible: false
        };
    }

    watch() {
        return {
            visible: () => {
                this.classList.toggle("visible", this.visible);
                document.querySelector('flyout-backdrop').classList.toggle("visible", this.visible);
            }
        }
    }

    events() {
        return {
            this: {
                click: ev => {
                    if (ev.currentTarget === this) {
                        this.visible = !this.visible;
                    }
                }
            },
            window: {
                'close-navigation': ev => {
                    this.visible = false;
                }
            }
        }
    }
}
