class Wallet extends XApp {

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
            ViewPinCreate,
            XInactivitySensor
        ]
    }

    listeners() {
        return {
            'x-unlock': '_onUnlock',
            'x-inactive': '_onInactive',
            'x-recipient': '_onTxRecipientSelected',
            'x-value': '_onTxValueSelected',
            'x-fees': '_onTxFeesSelected',
            'x-confirm': '_sendTx',
            'x-keypair': '_onKeysSelected',
            'x-account': '_onAccountChanged',
            'x-balance': '_onBalanceChanged',
            'x-transaction': '_onTransactionReceived',
            'x-api-ready': '_onApiReady'
        }
    }

    onCreate() {
        super.onCreate();
        this._txData = {}
    }

    _onAccountChanged(address) {
        this.$viewHome.address = address;
        this.$viewReceive.address = address;
    }

    _onBalanceChanged(balance) {
        this.$viewHome.balance = balance;
    }

    _onApiReady(api) {
        this._api = api;
        this.$viewLocked.onApiReady(api);
        this.$viewIdenticons.onApiReady(api);
        this.$viewExport.onApiReady(api);
    }

    _sendTx() {
        location = '#loading';
        try {
            const tx = this._txData;
            this._api.sendTransaction(tx.recipient, tx.value, tx.fees);
            setTimeout(() => location = '#success', 1000);
            setTimeout(() => location = '#home', 3000);
        } catch (e) {
            location = '#error';
        }
    }

    _onTransactionReceived(tx) {
        this.$viewReceived.value = tx.value;
        this.$viewReceived.balance = tx.value + this._api.balance;
        location = '#received';
    }

    _onStateChanged(state, path) {
        if (this._isLocked) return;
        this.$inactivitySensor.reset();
        super._onStateChanged(state, path);
    }

    _onInactive() {
        location = '#locked';
        this._isLocked = true;
        this._api.lockWallet();
    }

    _onUnlock() {
        this._isLocked = false;
        location = '#home';
    }

    _onTxRecipientSelected(address) {
        this._txData.recipient = address;
        this.$viewTransaction.recipient = address;
        location = '#transaction';
        navigator.vibrate && navigator.vibrate([100, 100, 100]);
    }

    _onTxValueSelected(value) {
        this._txData.value = value;
        location = '#confirm';
    }

    _onTxFeesSelected(fees) {
        this.$viewConfirm.fees = fees;
        this._txData.fees = fees;
        location = '#confirm';
    }

    _onKeysSelected(keys) {
        this._api.importKey(keys.privateKey)
            .then(e => location = '#home');
    }
}
window.addEventListener('load', () => window.app = new Wallet());