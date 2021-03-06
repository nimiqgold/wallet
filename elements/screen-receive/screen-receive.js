import XScreen from '/elements/x-screen/x-screen.js';
import XQrEncoder from '/elements/x-qr-encoder/x-qr-encoder.js';
import XAddress from '/elements/x-address/x-address.js';

export default class ScreenReceive extends XScreen {
    html() {
        return `
        <x-header>  
            <x-share-button></x-share-button>
        </x-header>
        <x-qr-encoder></x-qr-encoder>
        <x-address></x-address>`
    }

    children() { return [XQrEncoder, XAddress] }

    onCreate() {
        this.$('x-share-button').addEventListener('click', e => this._share());
    }

    set address(address) {
        this._address = address;
        this.$('x-address').textContent = address;
        this.$qrEncoder.address = address;
    }

    _share() {
        const url = location.origin + '/#send' + this._address;
        navigator
            .share({ title: 'My Nimiq Address', text: '', url: url })
            .then(_ => console.log('Successful share'))
            .catch(error => console.log('Error sharing', error));
    }
}