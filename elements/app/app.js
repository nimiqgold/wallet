class NanoClientUi extends XApp {

    children() { return [ViewHome, ViewSend, ViewReceive, ViewTransaction, ViewFees, ViewConfirm, ViewExport] }

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
}

addEventListener('load', () => {
    window.app = new NanoClientUi();
    dummyUsage(app);
});

function dummyUsage(app) {
    app.address = 'NQ95 I32O SA47 1KHL R1FV MP0O SVNI 73BS IJQ' + ((Math.random() + '')[5]);
    app.balance = 3.14;
    app.recipient = 'NQ95 I32O SA47 1KHL R1FV MP0O SVNI 73BS IJQT';
    app.privateKey = 'NQ95 I32O SA47 1KHL R1FV MP0O SVNI 73BS IJQT';
}