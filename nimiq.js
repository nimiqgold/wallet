class NanoWallet extends NanoApi {

    onInitialized() {
        app.address = this.address;
        app.setApi(this);
    }

    onBalanceChanged(balance) {
        app.balance = balance;
    }

    onTransactionReceived(sender, value, fee) {
        console.log(sender, this.address, value, fee);
        app.onTransactionReceived(sender, value, fee);
    }

}
const nimiq = new NanoWallet();