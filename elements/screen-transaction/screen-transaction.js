import XScreen from '/elements/x-screen/x-screen.js';
import XAmountInput from '/elements/x-amount-input/x-amount-input.js';
import XIdenticon from '/elements/x-identicon/x-identicon.js';

export default class ScreenTransaction extends XScreen {
    html(){
        return `
        <x-header>
            <a href="#send" icon-back></a>
        </x-header>
        <x-container class="center">
            <x-receiver>
                <x-identicon></x-identicon>
                <x-address></x-address>
            </x-receiver>
            <x-amount-input></x-amount-input>
            <a button disabled>Next</a>
        </x-container>`
    }
    
    children() { return [XAmountInput, XIdenticon] }

    onCreate() {
        this.$button = this.$('[button]');
        this.$address = this.$('x-address');
        this.$amountInput.addEventListener('x-amount-input', e => this._submit());
        this.$amountInput.addEventListener('x-amount-input-valid', e => this._validityChanged(e.detail));
        this.$button.addEventListener('click', e => this._submit());
    }

    _validityChanged(valid) {
        if (valid) {
            this.$button.removeAttribute('disabled');
        } else {
            this.$button.setAttribute('disabled', true);
        }
    }

    _submit() {
        this.fire('x-value', this.value);
    }

    set value(value) {
        this.$amountInput.value = value;
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

// Todo: don't allow value > balance