import XApp from '/library/x-element/x-app.js';
import ViewHome from '../view-home/view-home.js';
import ViewSend from '../view-send/view-send.js';
import ViewReceive from '../view-receive/view-receive.js';
import ViewReceived from '../view-received/view-received.js';
import ViewTransaction from '../view-transaction/view-transaction.js';
import ViewConfirm from '../view-confirm/view-confirm.js';
import ViewLocked from '../view-locked/view-locked.js';
import ViewWelcome from '../view-welcome/view-welcome.js';
import ViewSuccess from '../view-success/view-success.js';
import ViewFees from '../view-fees/view-fees.js';
import ViewPermission from '/elements/view-permission/view-permission.js';
import ViewIdenticons from '/elements/view-identicons/view-identicons.js';
import ViewBackupFile from '/elements/view-backup-file/view-backup-file.js';
import ViewBackupFileImport from '/elements/view-backup-file-import/view-backup-file-import.js';
import XNimiqApi from '/elements/x-nimiq-api/x-nimiq-api.js';
import XInactivitySensor from '/elements/x-inactivity-sensor/x-inactivity-sensor.js';
import XToast from '/elements/x-toast/x-toast.js';

export default class Wallet extends XApp {
    html() {
        return `
            <x-blur-container>
                <header>
                    <nimiq-logo></nimiq-logo>
                </header>
                <main>
                    <view-home></view-home>
                    <view-receive></view-receive>
                    <view-send></view-send>
                    <view-transaction></view-transaction>
                    <view-confirm></view-confirm>
                    <view-fees></view-fees>
                    <view-success></view-success>
                    <view-history></view-history>
                    <!-- Onboarding -->
                    <view-welcome></view-welcome>
                    <view-identicons></view-identicons>
                    <!-- Backup -->
                    <view-backup-file></view-backup-file>
                    <view-backup-file-import></view-backup-file-import>
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
            </x-blur-container>
            <view-received></view-received>
            <view-locked></view-locked>
            <view-pin-create></view-pin-create>
            <view-pin-change></view-pin-change>
            <x-inactivity-sensor></x-inactivity-sensor>
            <x-nimiq-api connect="true"></x-nimiq-api>
            <noscript><link href="/elements/noscript/noscript.css" rel="stylesheet"></noscript>
        `
    }

    children() {
        return [
            ViewHome,
            ViewSend,
            ViewReceive,
            ViewTransaction,
            ViewFees,
            ViewConfirm,
            ViewReceived,
            ViewLocked,
            ViewIdenticons,
            ViewBackupFile,
            ViewBackupFileImport,
            ViewWelcome,
            ViewSuccess,
            XNimiqApi,
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
            'x-keypair': '_onKeyPair',
            'x-account': '_onAccountChanged',
            'x-balance': '_onBalanceChanged',
            'x-transaction': '_onTransactionReceived',
            'x-encrypt-backup': '_onEncryptBackup',
            'x-decrypt-backup': '_onDecryptBackup',
            'x-file-backup-complete': '_onFileBackupComplete',
            'x-api-ready': '_onApiReady',
            'x-different-tab-error': '_onDifferentTabError'
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

    onStateChange(state, path) {
        if (this._isLocked) location = '#locked';
        else return true;
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

    _onKeyPair(keyPair) {
        this._keyPair = keyPair;
        location = '#backup-file';
    }

    _onEncryptBackup(password) {
        this.$viewBackupFile.backup(this._keyPair.address, this._keyPair.privateKey);
    }

    _onFileBackupComplete() {
        this._api.importKey(this._keyPair.privateKey)
            .then(e => location = '#home');
    }

    _onDecryptBackup(backup) {
        const password = backup.password
        const encrytedKey = backup.encrytedKey;
        console.log(`x-decrypt-backup`, backup);
    }

    _onDifferentTabError() {
        location = '#error';
        XToast.show('Nimiq is already running in a different tab');
    }
}
Wallet.launch();


// Todo: add view-error
// Todo: add view-history