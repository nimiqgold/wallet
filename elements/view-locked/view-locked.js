class ViewLocked extends XElement {
    onCreate() {
        this.$el.addEventListener('click', e => {
            if (e.target.localName !== 'button') return;
            const key = e.target.textContent;
            this._handleKey(key);
        });
        this.$('x-delete').addEventListener('click', e => {
            this._delete();
        });
        this.$pin = this.$('x-pin');
        this.$dots = this.$pin.querySelectorAll('x-dot');
    }

    onShow() {
        this._reset();
    }

    _handleKey(key) {
        if (this._pin.length === 6) return;
        this._pin += key;
        this._setMaskedPin();
        if (this._pin.length === 6) this._submit();
    }

    _submit() {
        console.log(this._pin);
        if (this._pin === '123456') {
            location = '#home';
        } else {
            this._wrongAttempt();
        }
    }

    _wrongAttempt() {
        this.$pin.className = 'shake';
        setTimeout(() => this._reset(), 500);
    }

    _delete() {
        this._pin = this._pin.substr(0, this._pin.length - 1);
        this._setMaskedPin();
    }

    _reset() {
        this._pin = '';
        this._setMaskedPin();
        this.$pin.className = '';
    }

    _setMaskedPin() {
        const length = this._pin.length;
        this.$dots.forEach((e, i) => {
            if (i < length) {
                e.setAttribute('on', 1);
            } else {
                e.removeAttribute('on');
            }
        })
    }

}