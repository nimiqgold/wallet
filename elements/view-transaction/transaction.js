class ViewTransaction extends XElement {
    children() { return [Numpad, AmountInput, Identicon] }

    onCreate() {
        this.$numpad.$el.addEventListener('x-change', (e) => {
            this.$amountInput.value = e.detail;
        });
    }

    set recipient(address) {
        this.$identicon.address = address;
        this.$('x-address').textContent = address;
    }
}