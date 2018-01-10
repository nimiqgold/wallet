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
            ViewWelcome,
            ViewPermission,
            ViewSuccess,
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

    html() {
        return `
        <x-blur-container>
        <header>
            <nimiq-logo></nimiq-logo>
        </header>
        <x-app-container>
            <main>
                <view-home></view-home>
                <view-receive></view-receive>
                <view-send></view-send>
                <view-permission></view-permission>
                <view-transaction></view-transaction>
                <view-confirm></view-confirm>
                <view-fees></view-fees>
                <view-success></view-success>
                <view-export></view-export>
                <view-history></view-history>
                <!-- Onboarding -->
                <view-welcome></view-welcome>
                <view-identicons></view-identicons>
                <!-- Notifications -->
                <view-loading></view-loading>
                <view-error></view-error>
            </main>
            <nav>
                <x-nav-box>
                    <a href="#receive" tabindex="1">Receive</a>
                    <a href="#home">Home</a>
                    <a href="#send">Send</a>
                </x-nav-box>
            </nav>
        </x-app-container>
        </x-blur-container>
        <view-received></view-received>
        <view-locked></view-locked>
        <view-pin-create></view-pin-create>
        <view-pin-change></view-pin-change>
        <x-inactivity-sensor></x-inactivity-sensor>
        <noscript><link href="/nimiq-elements/noscript/noscript.css" rel="stylesheet"></noscript>
        `
    }
}
window.addEventListener('load', () => window.app = new Wallet());