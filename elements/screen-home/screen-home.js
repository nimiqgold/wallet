import XScreen from '/elements/x-screen/x-screen.js';
import XAmount from '/elements/x-amount/x-amount.js';
import XIdenticon from '/elements/x-identicon/x-identicon.js';

export default class ScreenHome extends XScreen {
    html() {
        return `
        <x-header>
            <a href="#export" icon-export right></a>
        </x-header>
        <x-identicon></x-identicon>
        <x-amount></x-amount>`
    }

    children() { return [XAmount, XIdenticon] }

    set address(address) {
        this._address = address;
        this._renderIdenticon();
    }

    _renderIdenticon() {
        if (!this.isVisible) return;
        if(this._address === this._lastAddress) return;
        this._lastAddress = this._address;
        this.$identicon.address = this._address;
    }

    _onBeforeEntry() {
        this._renderIdenticon();
    }

    set balance(balance) { this.$amount.value = balance }
}

// Todo: remove that identicon hack