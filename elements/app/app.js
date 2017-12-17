class NanoClientUi extends XApp {

    children() {
        return [
            ViewHome,
            ViewSend,
            ViewReceive,
            ViewTransaction,
            ViewFees,
            ViewConfirm,
            ViewExport,
            ViewReceived,
            ViewLocked,
            ViewIdenticons,
            InactivitySensor
        ]
    }

    onCreate() {
        super.onCreate();
        this.$viewLocked.addEventListener('x-unlock', e => this._unlock());
        this.$inactivitySensor.addEventListener('x-inactive', e => this._lock());
        this.$viewSend.addEventListener('x-address', e => this._recipientSelected(e.detail));
    }

    set address(address) {
        this.$viewHome.address = address;
        this.$viewReceive.address = address;
    }

    set balance(balance) {
        this.$viewHome.balance = balance;
    }

    get transactionData() {
        const data = {};
        data.recipient = this.$viewTransaction.recipient;
        data.value = this.$viewTransaction.value;
        data.fee = this.$viewFees.value;
        return data;
    }

    onApiReady(api) {
        this._api = api;
        this.$viewLocked.onApiReady(api);
    }

    sendTx() {
        const tx = this.transactionData;
        this._api.sendTransaction(tx.recipient, tx.value, 10);
    }

    onTransactionReceived(sender, value, fee) {
        this.$viewReceived.value = value;
        this.$viewReceived.balance = value + this._api.balance;
        location = '#received';
    }

    _stateChanged(state, path) {
        if (this._isLocked) return;
        this.$inactivitySensor.reset();
        super._stateChanged(state, path);
    }

    _lock() {
        location = '#locked';
        this._isLocked = true;
        this._api.encryptWallet();
    }

    _unlock() {
        this._isLocked = false;
        location = '#home';
        this.$inactivitySensor.reset();
        //Todo: decrypt key
    }

    _recipientSelected(address) {
        navigator.vibrate([100, 100, 100]);
        this.$viewTransaction.recipient = address;
        location = '#transaction';
    }
}
window.addEventListener('load', () => window.app = new NanoClientUi());