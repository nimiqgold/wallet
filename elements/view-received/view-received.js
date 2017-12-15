class ViewReceived extends XElement {
    children() { return [Amount] }
    onCreate() {
        this.$el.addEventListener('click', e => location = '#home')
    }

    set value(value) {
        this.$amount.value = value;
    }

    set balance(balance) {
        this.$('new-balance').textContent = Amount.format(balance);
    }
}