class ViewSend extends XElement {
    children() { return [XQrScanner] }

    onCreate() {
        this.$qrScanner.setGrayscaleWeights(145, 91, 20);
        this.$qrScanner.hasFileInputButton = false;
        this.addEventListener('x-decoded', e => this._validateAddress(e.detail));
        this.addEventListener('x-image-decoded', e => this._onFileScanned(event));
        this.addEventListener('x-image-error', e => this._onFileScanned(event));
        this.$input = this.$('input[type="text"]');
        this.$input.addEventListener('input', e => this._validateAddress(e.target.value));
        this.$('x-header [icon-paste]').addEventListener('click', e => this.$input.focus());
        this.$fileSelector = this.$('input[type="file"]');
        this.$fileSelector.addEventListener('change', () => this._onFileSelected());
        this.$fileSelectorIcon = this.$('[icon-upload]');
    }

    onShow() {
        this.$qrScanner.active = true;
        this.$input.value = '';
    }

    onHide() {
        this.$qrScanner.active = false;
    }

    _validateAddress(address) {
        if (!NanoApi.validateAddress(address)) return false;
        this.fire('x-recipient', address);
        return true;
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

    html() {
        return `
            <x-header>
                <a icon-paste></a>
                <input type="text" placeholder="Enter Recipient Address">
                <label icon-upload><input type="file"></label>
            </x-header>
            <x-qr-scanner></x-qr-scanner>`
    }
}

// Todo: don't allow value > balance
// Todo: add debouncer to input handler
// Todo: Debug for iOS
// Todo: Bug on repeated click onto the 'send' tab (camera activated multiple times)