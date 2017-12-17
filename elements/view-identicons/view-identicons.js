class ViewIdenticons extends XElement {

    onShow() {
        this._createIdenticons();
    }

    onHide() {
        this._clearIdenticons();
    }

    _clearIdenticons() {
        this.$el.innerHTML = '';
    }

    async _createIdenticons() {
        for (var i = 0; i < 6; i++) {
            const keys = await Nimiq.KeyPair.generate();
            const address = await keys.publicKey.toAddress();
            const identicon = Identicon.createElement();
            this.add(identicon);
            identicon.address = address.toUserFriendlyAddress();
            identicon.keys = keys;
        }
    }
}