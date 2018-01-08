class ViewSend extends XElement {
    children() { return [XQrScanner] }

    onCreate() {
        this.$qrScanner.setGrayscaleWeights(145, 91, 20);
        this.$qrScanner.hasFileInputButton = false;
        this.addEventListener('x-decoded', e => this._validateAddress(e.detail));
        this.$input = this.$('input[type="text"]');
        this.$input.addEventListener('input', e => this._validateAddress(e.target.value));
        this.$('x-header a').addEventListener('click', e => this.$input.focus());
        this.$fileSelector = this.$('input[type="file"]');
        this.$fileSelector.addEventListener('change', () => this._onFileSelected());
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

    _onFileSelected() {
        const file = this.$fileSelector.files[0];
        this.$fileSelector.value = ''; // reset the file selector
        if (!file) {
            return;
        }
        this.$qrScanner.scanImage(file);
    }
}

// Todo: don't allow value > balance
// Todo: add debouncer to input handler
// Todo: maybe show an error message if in uploaded file no address was found