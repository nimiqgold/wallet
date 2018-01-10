class ViewLocked extends XElement {

    children() { return [XPinpad] }

    onApiReady(api) {
        this._api = api;
        if (!this.$pinpad.unlocking) return;
        this._submit(); // Submit again because api wasn't ready yet
    }

    onShow() {
        this.$pinpad.reset();
    }

    onCreate() {
        this.addEventListener('x-pin', e => this._submit(e.detail)); 
    }

    _submit(pin) {
        if (!this._api) return;
        this._api.unlockWallet(pin)
            .then(success => this._unlock())
            .catch(error => this.$pinpad.onIncorrectPin());
    }

    _unlock() {
        this.fire('x-unlock');
        this.$pinpad.reset();
    }

    html(){
        return `<x-pinpad></x-pinpad>`
    }
}

// Todo: increase waiting time exponentially after three failed attempts
// Todo: prevent bubble of x-pin for security?