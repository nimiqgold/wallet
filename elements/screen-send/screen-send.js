import XScreen from '/elements/x-screen/x-screen.js';
import NanoApi from '/library/nano-api/nano-api.js';
import ScreenRecipient from '/elements/screen-recipient/screen-recipient.js';

export default class ScreenSend extends XScreen {
    html() {
        return `<screen-recipient></screen-recipient>`
    }

    children() { return [ScreenRecipient] }

    onCreate() {
        this.addEventListener('x-address-page-select', e => this._onPageSelect(e.detail));
    }

    onShow(state, path) {
        this._parseLocationPath(path);
        this.$screenRecipient.active = true;
        this._onPageSelect(this._selected);
    }

    onHide() {
        this.$screenRecipient.active = false;
        this._showNavi();
    }

    _parseLocationPath(path) {
        if (!path) return;
        const address = path[1];
        if (!address || !NanoApi.validateAddress(address)) return;
        this.fire('x-recipient', address);
    }
}
// Todo: onShow parse url for address