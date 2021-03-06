import XScreen from '/elements/x-screen/x-screen.js';
import XPinpad from '/secure-elements/x-pinpad/x-pinpad.js';

export default class ScreenLocked extends XScreen {  
    html() {
        return `<x-pinpad></x-pinpad>`
    }

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