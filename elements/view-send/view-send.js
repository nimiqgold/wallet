import XView from '/library/x-element/x-view.js';
import NanoApi from '/library/nano-api/nano-api.js';
import XAddressPages from '/elements/x-address-pages/x-address-pages.js';

export default class ViewSend extends XView {
    html() {
        return `<x-address-pages></x-address-pages>`
    }

    children() { return [XAddressPages] }

    onCreate() {
        this.addEventListener('x-address-page-select', e => this._onPageSelect(e.detail));
    }

    onShow(state, path) {
        this._parseLocationPath(path);
        this.$addressPages.active = true;
        this._onPageSelect(this._selected);
    }

    onHide() {
        this.$addressPages.active = false;
        this._showNavi();
    }

    _onPageSelect(page) {
        this._selected = page;
        if (page === 'intro')
            this._hideNavi();
        else
            this._showNavi();
    }

    _showNavi() {
        document.querySelector('nav').removeAttribute('hide');
    }

    _hideNavi() {
        if (!this.visible) return;
        document.querySelector('nav').setAttribute('hide', 1);
    }

    _parseLocationPath(path) {
        if (!path) return;
        const address = path[1];
        if (!address || !NanoApi.validateAddress(address)) return;
        this.fire('x-recipient', address);
    }
}
// Todo: onShow parse url for address