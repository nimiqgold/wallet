import XAppScreen from '/elements/x-screen/x-app-screen.js';
import ScreenHome from '../screen-home/screen-home.js';
import ScreenSend from '../screen-send/screen-send.js';
import ScreenReceive from '../screen-receive/screen-receive.js';
import ScreenReceived from '../screen-received/screen-received.js';
import ScreenTransaction from '../screen-transaction/screen-transaction.js';
import ScreenConfirm from '../screen-confirm/screen-confirm.js';
import ScreenLocked from '../screen-locked/screen-locked.js';
import ScreenWelcome from '../screen-welcome/screen-welcome.js';
import ScreenError from '/elements/screen-error/screen-error.js';
import ScreenComplete from '../screen-complete/screen-complete.js';
import ScreenFees from '../screen-fees/screen-fees.js';
import ScreenIdenticons from '/elements/screen-identicons/screen-identicons.js';
import ScreenBackupFile from '/elements/screen-backup-file/screen-backup-file.js';
import ScreenBackupFileImport from '/elements/screen-backup-file-import/screen-backup-file-import.js';
import XNimiqApi from '/elements/x-nimiq-api/x-nimiq-api.js';
import XInactivitySensor from '/elements/x-inactivity-sensor/x-inactivity-sensor.js';
import XToast from '/elements/x-toast/x-toast.js';

export default class Wallet extends XAppScreen {
    html() {
        return `
            <x-blur-container>
                <screen-home></screen-home>
                <screen-send></screen-send>
                <screen-receive></screen-receive>
                <screen-transaction></screen-transaction>
                <screen-confirm></screen-confirm>
                <screen-fees></screen-fees>
                <screen-complete></screen-complete>
                <!-- Onboarding -->
                <screen-welcome></screen-welcome>
                <screen-identicons></screen-identicons>
                <!-- Backup -->
                <screen-backup-file></screen-backup-file>
                <screen-backup-file-import></screen-backup-file-import>
                <!-- Notifications -->
                <screen-loading></screen-loading>
                <screen-error></screen-error>
                <nav>
                    <x-nav-box>
                        <a href="#receive" tabindex="1">Receive</a>
                        <a href="#home">Home</a>
                        <a href="#send">Send</a>
                    </x-nav-box>
                </nav>
            </x-blur-container>
            <screen-received></screen-received>
            <screen-locked></screen-locked>
            <x-inactivity-sensor></x-inactivity-sensor>
            <x-nimiq-api connect="true"></x-nimiq-api>
            <noscript><link href="/elements/noscript/noscript.css" rel="stylesheet"></noscript>
        `
    }

    children() {
        return [
            ScreenHome,
            ScreenReceive,
            ScreenSend,
            ScreenTransaction,
            ScreenFees,
            ScreenConfirm,
            ScreenReceived,
            ScreenLocked,
            ScreenIdenticons,
            ScreenBackupFile,
            ScreenBackupFileImport,
            ScreenWelcome,
            ScreenComplete,
            ScreenError,
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
            'x-backup-file-complete': '_onBackupFileComplete',
            'x-api-ready': '_onApiReady',
            'x-different-tab-error': '_onDifferentTabError'
        }
    }

    onCreate() {
        this._txData = {}
    }

    _onAccountChanged(address) {
        this.$screenHome.address = address;
        this.$screenReceive.address = address;
    }

    _onBalanceChanged(balance) {
        this.$screenHome.balance = balance;
    }

    _onApiReady(api) {
        this._api = api;
        this.$screenLocked.onApiReady(api);
        this.$screenIdenticons.onApiReady(api);
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
        this.$screenReceived.value = tx.value;
        this.$screenReceived.balance = tx.value + this._api.balance;
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
        this.$screenTransaction.recipient = address;
        location = '#transaction';
    }

    _onTxValueSelected(value) {
        this._txData.value = value;
        location = '#confirm';
    }

    _onTxFeesSelected(fees) {
        this.$screenConfirm.fees = fees;
        this._txData.fees = fees;
        location = '#confirm';
    }

    _onKeyPair(keyPair) {
        this._keyPair = keyPair;
        location = '#backup-file';
    }

    _onEncryptBackup(password) {
        this.$screenBackupFile.backup(this._keyPair.address, this._keyPair.privateKey);
    }

    _onBackupFileComplete() {
        this._api.importKey(this._keyPair.privateKey)
            .then(e => location = '#home');
    }

    _onDecryptBackup(backup) {
        const password = backup.password
        const encrytedKey = backup.encrytedKey;
        console.log(`x-decrypt-backup`, backup);
    }

    _onDifferentTabError() {
        this.$screenError.show('Nimiq is already running in a different tab');
        document.location = '#error';
    }

    _entryScreens(nextStateDiff, nextState, prevState, isNavigateBack) {
        super._entryScreens(nextStateDiff, nextState, prevState, isNavigateBack);
        const route = nextState.id;
        if(route === 'home' || route === 'receive' || route === 'send') 
            this._showNavi(route);
        else
            this._hideNavi();
    }

    _showNavi(route) {
        this.$('nav').setAttribute('route', route);
    }

    _hideNavi() {
        this.$('nav').removeAttribute('route');
    }
}
Wallet.launch();


// Todo: add screen-error
// Todo: add screen-history