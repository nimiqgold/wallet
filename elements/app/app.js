import XAppScreen from '/elements/x-screen/x-app-screen.js';
import ScreenHome from '../screen-home/screen-home.js';
import ScreenSend from '../screen-send/screen-send.js';
import ScreenReceive from '../screen-receive/screen-receive.js';
import ScreenReceived from '../screen-received/screen-received.js';
import ScreenTransaction from '../screen-transaction/screen-transaction.js';
import ScreenConfirm from '../screen-confirm/screen-confirm.js';
import ScreenLocked from '../screen-locked/screen-locked.js';
import ScreenWelcome from '../screen-welcome/screen-welcome.js';
import ScreenError from '/elements/legacy/screen-error/screen-error.js';
import ScreenComplete from '../screen-complete/screen-complete.js';
import ScreenFees from '../screen-fees/screen-fees.js';
import ScreenIdenticons from '/elements/legacy/screen-identicons/screen-identicons.js';
import ScreenBackupFile from '/elements/legacy/screen-backup-file/screen-backup-file.js';
import ScreenBackupFileImport from '/elements/legacy/screen-backup-file-import/screen-backup-file-import.js';
import XNimiqApi from '/elements/legacy/x-nimiq-api/x-nimiq-api.js';
import NanoApi from '/libraries/nano-api/nano-api.js';
import XInactivitySensor from '/elements/x-inactivity-sensor/x-inactivity-sensor.js';

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
            'nimiq-account': '_onAccountChanged',
            'nimiq-balance': '_onBalanceChanged',
            'nimiq-transaction': '_onTransactionReceived',
            'x-encrypt-backup': '_onEncryptBackup',
            'x-decrypt-backup': '_onDecryptBackup',
            'x-backup-file-complete': '_onBackupFileComplete',
            'nimiq-api-ready': '_onApiReady',
            'nimiq-api-fail': '_onApiFail',
            'nimiq-different-tab-error': '_onDifferentTabError'
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

    async _onApiReady() {
        this._api = NanoApi.getApi();
        await this._api.loadWallet();
        this.$screenLocked.onApiReady(this._api);
        this.$screenIdenticons._generateIdenticons();
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
        this._api.importKey(keyPair.privateKey)
        location = '#backup-file';
    }

    async _onEncryptBackup(password) {
        const encryptedKey = await this._api.exportEncrypted(password);
        this.$screenBackupFile.backup(this._api.address, encryptedKey);
    }

    _onBackupFileComplete() {
        location = '#home';
    }

    async _onDecryptBackup(backup) {
        console.log(backup);
        const password = backup.password
        const encryptedKey = backup.encryptedKey;
        try {
            await this._api.importEncrypted(encryptedKey, password);
            await this.$screenBackupFileImport.onPasswordCorrect();
            this._onAccountChanged(this._api.address);
            location = '#home';
        } catch (e) {
            console.error(e);
            await this.$screenBackupFileImport.onPasswordIncorrect();
        }
    }

    _onApiFail() {
        this.$screenError.show('Nimiq API failed to load');
        document.location = '#error';
    }

    _onDifferentTabError() {
        this.$screenError.show('Nimiq is already running in a different tab');
        document.location = '#error';
    }

    _entryScreens(nextStateDiff, nextState, prevState, isNavigateBack) {
        super._entryScreens(nextStateDiff, nextState, prevState, isNavigateBack);
        const route = nextState.id;
        if (route === 'home' || route === 'receive' || (route === 'send' && nextState.toString() !== 'send/recipient/intro'))
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

// Todo: Fix API events

