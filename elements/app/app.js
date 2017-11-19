class App extends XElement {

    children() { return [ViewHome, ViewSend, ViewReceive, ViewTransaction, ViewFees, ViewConfirm] }

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
}

addEventListener('load', () => {
    window.app = new App();
    dummyUsage(app);
});

function dummyUsage(app) {
    app.address = ((Math.random() + '')[5]) + '2BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2';
    app.balance = 3.14;
    app.recipient = '2AvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2';
}