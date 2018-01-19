class ViewReceived extends XView {
    styles() { return ['fit'] }
    html() {
        return `
        <nimiq-logo large></nimiq-logo>
        <x-amount></x-amount>
        <new-balance></new-balance>
        `
    }

    children() { return [XAmount] }
    onCreate() {
        this.$el.addEventListener('click', e => location = '#home')
    }

    set value(value) {
        this.$amount.value = value;
    }

    set balance(balance) {
        this.$('new-balance').textContent = XAmount.format(balance);
    }
}