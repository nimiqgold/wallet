class ViewSend extends XElement {
    children() { return [XQrScanner] }

    onCreate() {
        this.$qrScanner.setGrayscaleWeights(145, 91, 20);
        this.addEventListener('x-decoded', e => this._validateAddress(e.detail));
        this.$input = this.$('input');
        this.$input.addEventListener('input', e => this._validateAddress(e.target.value));
        this.$('x-header a').addEventListener('click', e => this.$input.focus());
    }

    onShow() {
        this.$qrScanner.active = true;
        this.$input.value = '';
    }

    onHide() {
        this.$qrScanner.active = false;
    }

    _validateAddress(address) {
        if (!NanoApi.validateAddress(address)) return;
        this.fire('x-recipient', address);
    }
}

// Todo: don't allow value > balance
// Todo: add debouncer to input handler
