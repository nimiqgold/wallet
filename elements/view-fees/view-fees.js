class ViewFees extends XElement {

    children() { return [XAmount] }

    onCreate() {
        this._initSlider();
        this.$('[button]').addEventListener('click', e => this._confirm());
    }

    _initSlider() {
        const slider = this.$('input');
        slider.addEventListener('input', () => this.value = slider.value);
        slider.min = 0;
        slider.max = 0.01;
        slider.step = 0.001;
        this.$slider = slider;
        this.value = (slider.max + slider.min) / 2;
    }

    set value(value) {
        this._value = value;
        this.$amount.value = value;
        this.$slider.value = value;
    }

    get value() {
        return Number(this._value);
    }

    _confirm() {
        this.fire('x-fees', this.value);
    }
}