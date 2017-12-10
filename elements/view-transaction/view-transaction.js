class ViewTransaction extends XElement {
    children() { return [Numpad, AmountInput, Identicon] }

    onCreate() {
        this.$numpad.$el.addEventListener('x-change', (e) => {
            this.$amountInput.value = e.detail;
        });
        this.$amountInput.$el.addEventListener('x-change', (e) => {
            if (e.detail) {
                this.$('[button]').removeAttribute('disabled');
            } else {
                this.$('[button]').setAttribute('disabled', 1);
            }
        })
        this.$amountInput.$el.addEventListener('x-enter', (e) => {
            location = '#confirm';
        })
    }

    set value(value) {
        // this.$amountInput.value = value;
        this.$numpad.value = value;
    }

    get value() {
        return this.$amountInput.value;
    }

    set recipient(address) {
        this._recipient = address;
        this.$identicon.address = address;
        this.$('x-address').textContent = address;
    }

    get recipient() {
        return this._recipient;
    }

    onShow() {
        this.value = 0;
        this.$amountInput.focus();
    }
}