import XView from '/library/x-element/x-view.js';
import XPinpad from '/elements/x-pinpad/x-pinpad.js';

export default class ViewLocked extends XView {  
    html() {
        return `<x-pinpad></x-pinpad>`
    }

    styles() { return ['fit'] }

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
        this.addEventListener('x-pin', e => {
          this._submit(e.detail);
          e.stopPropagation();
        });
    }

    _submit(pin) {
        if (!this._api) return;
        this._api.unlockWallet(pin)
            .then(success => this._unlock())
            .catch(error => this.$pinpad.onPinIncorrect());
    }

    _unlock() {
        this.fire('x-unlock');
        this.$pinpad.close();
    }
}