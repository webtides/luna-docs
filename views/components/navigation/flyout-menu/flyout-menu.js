import {Component} from "@webtides/luna-js";

@Component({
    target: Component.TARGET_CLIENT,
})
export default class FlyoutMenu extends HTMLElement {

    visible = false;

    connectedCallback() {
        setTimeout(() => {
            this.classList.add('connected');
        }, 200);
    }

    attachEvents() {
        this.addEventListener('click', (ev) => {
            if (ev.currentTarget === this) {
                this.toggleVisibility();
            }
        });

        window.addEventListener('close-navigation', ev => {
            this.visible = false;
            this.setVisibility();
        })
    }

    toggleVisibility() {
        this.visible = !this.visible;
        this.setVisibility();
    }

    setVisibility() {
        this.classList.toggle("visible", this.visible);
        document.querySelector('flyout-backdrop').classList.toggle("visible", this.visible);
    }
}
