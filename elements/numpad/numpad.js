
class Numpad extends XElement {
    onCreate() {
        this.$el.addEventListener('click', (e) => {
            const key = e.target.textContent;
            this._handleKey(key);
        });
    }

    _handleKey(key) {
        switch (key) {
            case '<':
                this._remove();
                return;
            case '.':
                this._dot();
                return;
        }
        this._add(Number(key));
    }

    _add(digit) {
        this.value = this.value * 10 + digit;
    }

    _remove() {
        this.value = Math.floor(this.value / 10);
    }

    _dot() {

    }

    get value() {
        return this._value || 0;
    }

    set value(value) {
        this._value = value;
        this.fire('x-change', value);
    }
}