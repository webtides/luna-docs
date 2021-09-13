import { Component } from '@webtides/luna-js';
import "./flyout-backdrop.css";

@Component({
    target: Component.TARGET_CLIENT,
})
export default class FlyoutBackdrop extends HTMLElement {
    connectedCallback() {
        this.dispatchEvent(new CustomEvent('close-navigation', {
            bubbles: true
        }));
    }
}
