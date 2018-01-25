import XView from '/library/x-element/x-view.js';
import XAddressScanner from '/elements/x-address-scanner/x-address-scanner.js';

export default class ViewSend extends XView {
    html() {
        return `<x-address-scanner></x-address-scanner>`
    }
    
    children() { return [XAddressScanner] }

    onCreate() {
        this.$addressScanner.setGrayscaleWeights(145, 91, 20);
        this.addEventListener('x-address-scanned', e => this.fire('x-recipient', e.detail));
    }

    onShow() {
        this.$addressScanner.active = true;
    }

    onHide() {
        this.$addressScanner.active = false;
    }
}
// Todo: onHide not triggered
