import XView from '/library/x-element/x-view.js';
import XQrScanner from '/elements/x-qr-scanner/x-qr-scanner.js';
import NanoApi from '/library/nano-api/nano-api.js';

export default class ViewSend extends XView {
    html() {
        return `
            <x-header>
                <a icon-paste></a>
                <input type="text" placeholder="Enter Recipient Address" spellcheck="false" autocomplete="off">
                <label icon-upload><input type="file"></label>
            </x-header>
            <x-qr-scanner></x-qr-scanner>`
    }
    
    children() { return [XQrScanner] }

    onCreate() {
        this.$qrScanner.setGrayscaleWeights(145, 91, 20);
        this.$qrScanner.hasFileInputButton = false;
        this.addEventListener('x-decoded', e => this._validateAddress(e.detail));
        this.addEventListener('x-image-decoded', e => this._onFileScanned(event));
        this.addEventListener('x-image-error', e => this._onFileScanned(event));
        this.$input = this.$('input[type="text"]');
        this.$input.addEventListener('input', () => this._onTextInput());
        this.$('x-header [icon-paste]').addEventListener('click', e => this.$input.focus());
        this.$fileSelector = this.$('input[type="file"]');
        this.$fileSelector.addEventListener('change', () => this._onFileSelected());
        this.$fileSelectorIcon = this.$('[icon-upload]');
    }

    onShow() {
        this.$qrScanner.active = true;
        this.$input.value = '';
        this.$input.removeAttribute('invalid');
    }

    onHide() {
        this.$qrScanner.active = false;
    }

    _validateAddress(address) {
        if (!NanoApi.validateAddress(address)) return false;
        this.fire('x-recipient', address);
        return true;
    }

    _onTextInput() {
        if (this._validateAddress(this.$input.value) || this.$input.value === '') {
            this.$input.removeAttribute('invalid');
        } else {
            this.$input.setAttribute('invalid', '');
        }
    }

    _onFileSelected() {
        const file = this.$fileSelector.files[0];
        this.$fileSelector.value = null; // reset the file selector
        if (!file) {
            return;
        }
        this.$qrScanner.scanImage(file);
    }

    _onFileScanned(event) {
        if (event.type === 'x-image-decoded' && this._validateAddress(event.detail)) {
            return;
        }
        // no success
        this.$fileSelectorIcon.classList.add('warning');
        setTimeout(() => this.$fileSelectorIcon.classList.remove('warning'), 4000);
    }
}
// Todo: Refactor address input into x-address input?
// Todo: x-address-input should not be invalid while typing a correct address  
// Todo: Fallback if camera not available (device without camera; permission denied) / view-finder should not be visible
// Todo: Show permissions-screen while asking (not as seperate view but as internal overlay)