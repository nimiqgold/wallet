class ViewReceived extends XView {
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

    html(){
        return `
        <nimiq-logo></nimiq-logo>
        <x-amount></x-amount>
        <new-balance></new-balance>
        `
    }
}