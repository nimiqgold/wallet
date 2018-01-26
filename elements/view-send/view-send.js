import XView from '/library/x-element/x-view.js';
import XAddressScanner from '/elements/x-address-pages/x-address-pages.js';

export default class ViewSend extends XView {
    html() {
        return `<x-address-pages></x-address-pages>`
    }
    
    children() { return [XAddressScanner] }

    onShow() {
        this.$addressScanner.active = true;
    }

    onHide() {
        this.$addressScanner.active = false;
    }
}
// Todo: Bug: onHide is not triggered because no animation ends
// Todo: onShow parse url for address