class ViewSend extends XElement {
    children() { return [QrScanner] }

    onCreate() {
        this.$qrScanner.setGrayscaleWeights(145, 91, 20);
        this.$qrScanner.$el.addEventListener('x-decoded', e => this._validateAddress(e.detail));
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
        const isValid = NanoApi.validateAddress(address);
        if (!isValid) return;
        this.fire('x-address', address);
    }
}

// Todo: add debouncer to input handler