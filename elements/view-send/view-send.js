import XView from '/library/x-element/x-view.js';
import NanoApi from '/library/nano-api/nano-api.js';
import XAddressPages from '/elements/x-address-pages/x-address-pages.js';

export default class ViewSend extends XView {
    html() {
        return `<x-address-pages></x-address-pages>`
    }

    children() { return [XAddressPages] }

    onShow(state, path) {
        console.log(state, path);
        this._parseLocationPath(path);
        this.$addressPages.active = true;
    }

    onHide() {
        this.$addressPages.active = false;
    }

    _parseLocationPath(path) {
        if (!path) return;
        const address = path[1];
        if (!address || !NanoApi.validateAddress(address)) return;
        this.fire('x-recipient', address);
    }
}
// Todo: onShow parse url for address