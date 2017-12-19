class ViewTransaction extends XElement {
    children() { return [Numpad, AmountInput, Identicon] }

    onCreate() {
        this.$button = this.$('[button]');
        this.$address = this.$('x-address');
        this.$numpad.addEventListener('x-change', e => this._setAmountInput(e.detail));
        this.$amountInput.addEventListener('x-change', e => this._valueChanged(e.detail))
        this.$amountInput.addEventListener('x-enter', e => this._submit());
        this.$button.addEventListener('click', e => this._submit());
    }

    _valueChanged(value) {
        if (value) {
            this.$button.removeAttribute('disabled');
        } else {
            this.$button.setAttribute('disabled', true);
        }
    }

    _submit() {
        this.fire('x-value', this.value);
    }

    _setAmountInput(value) {
        this.$amountInput.value = value;
    }

    set value(value) {
        this.$numpad.value = value;
    }

    get value() {
        return this.$amountInput.value;
    }

    set recipient(address) {
        this._recipient = address;
        this.$identicon.address = address;
        this.$address.textContent = address;
    }

    get recipient() {
        return this._recipient;
    }

    onShow() {
        this.value = 0;
        this.$amountInput.focus();
    }
}