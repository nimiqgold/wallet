class Amount extends XElement {

    set value(value) {
        value = Number(value);
        this._currency1 = Amount.format(value, 3);
        this._currency2 = Amount.format(value * 8.2, 2);
    }

    set _currency1(value) {
        this.$('x-currency-1').textContent = value;
    }

    set _currency2(value) {
        this.$('x-currency-2').textContent = value;
    }

    static format(number, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.round(number * decimals) / decimals;
    }
}


class AmountInput extends Amount {
    onCreate() {
        this.$input = this.$('input');
        this.$input.addEventListener('change', (e) => this._valueChanged());
        this.$input.addEventListener('keyup', (e) => this._valueChanged(e));
    }

    _valueChanged(e) {
        if (e && e.keyCode === 13)
            return this.fire('x-enter');
        this.value = this.$input.value;
    }

    set _currency1(value) {
        this.$input.value = value || '';
        this.fire('x-change', value);
    }

    focus() {
        if (window.innerWidth > 420) {
            requestAnimationFrame(_ => this.$input.focus())
        }
    }
}