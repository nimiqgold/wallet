class NanoWallet extends NanoApi {

    onInitialized() {
        this.fire('x-api-ready', this);
    }

    onConsensusEstablished() {
        // this.fire('x-account', this.address);
    }
    
    onAddressChanged(address) {
        this.fire('x-account', address);
    }

    onBalanceChanged(balance) {
        this.fire('x-balance', balance);
    }

    onTransactionReceived(sender, value, fee) {
        this.fire('x-transaction', { sender: sender, value: value, fee: fee });
    }

    fire(type, detail) {
        document.body.dispatchEvent(new CustomEvent(type, { detail: detail }))
    }
}
const nimiq = new NanoWallet();