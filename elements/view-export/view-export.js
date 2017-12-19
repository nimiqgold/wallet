class ViewExport extends XElement {

    // children() { return [WalletBackup] }

    onApiReady(api) {
        this._api = api;
        if (this._generated) return;
        this._generateIdenticons();
    }

    _paint(address, privateKey) {
        this.$walletImage.paint(address, privateKey)
    }

    onShow() {
        // Todo: delete privateKey references        
    }

    onHide() {
        // Todo: delete privateKey references
    }
}