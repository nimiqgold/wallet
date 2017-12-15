class NanoClientUi extends XApp {

    children() { return [ViewHome, ViewSend, ViewReceive, ViewTransaction, ViewFees, ViewConfirm, ViewExport, ViewReceived] }

    set address(address) {
        this.$viewHome.address = address;
        this.$viewReceive.address = address;
    }

    set balance(balance) {
        this.$viewHome.balance = balance;
    }

    set recipient(address) {
        this.$viewTransaction.recipient = address;
    }

    set privateKey(privateKey) {
        this.$viewExport.privateKey = privateKey;
    }

    get transactionData() {
        const data = {};
        data.recipient = this.$viewTransaction.recipient;
        data.value = this.$viewTransaction.value;
        return data;
    }

    setApi(api) {
        this._api = api;
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
}

addEventListener('load', () => {
    window.app = new NanoClientUi();
    // dummyUsage(app);
});

// function dummyUsage(app) {
//     app.address = 'NQ95 I32O SA47 1KHL R1FV MP0O SVNI 73BS IJQ' + ((Math.random() + '')[5]);
//     app.balance = 3.14;
//     app.recipient = 'NQ95 I32O SA47 1KHL R1FV MP0O SVNI 73BS IJQT';
//     app.privateKey = 'NQ95 I32O SA47 1KHL R1FV MP0O SVNI 73BS IJQT';
// }