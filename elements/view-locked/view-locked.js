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

    onApiReady(api) {
        this._api = api;
        if (this._unlocking) {
            this._submit();
        }
    }

    _handleKey(key) {
        if (this._unlocking) return;
        this._pin += key;
        this._setMaskedPin();
        if (this._pin.length === 6) this._submit();
    }

    _submit() {
        this._unlocking = true;
        this.$pin.className = 'unlocking';
        if (!this._api) return;
        this._api.decryptWallet(this._pin)
            .then(success => this._unlock())
            .catch(error => this._wrongAttempt());
    }

    _wrongAttempt() {
        this.$pin.className = 'shake';
        setTimeout(() => this._reset(), 500);
    }

    _unlock() {
        this.fire('x-unlock');
        this._reset();
    }

    _delete() {
        if (this._unlocking) return;
        this._pin = this._pin.substr(0, this._pin.length - 1);
        this._setMaskedPin();
    }

    _reset() {
        this._pin = '';
        this._setMaskedPin();
        this.$pin.className = '';
        this._unlocking = false;
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

// Todo: allow keyboard input on desktop