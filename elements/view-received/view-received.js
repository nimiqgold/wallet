import XView from '/library/x-element/x-view.js';
import XAmount from '/elements/x-amount/x-amount.js';

export default class ViewReceived extends XView {
    html() {
        return `
        <nimiq-logo large></nimiq-logo>
        <x-amount></x-amount>
        <new-balance></new-balance>
        `
    }
    styles() { return ['fit'] }

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