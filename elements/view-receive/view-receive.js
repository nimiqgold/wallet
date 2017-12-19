class ViewReceive extends XElement {
    children() { return [Nimiqode] }

    onCreate() {
        this.$('x-share-button').addEventListener('click', e => this._share());
    }

    set address(address) {
        this._address = address;
        this.$('x-address').textContent = address;
        this.$nimiqode.address = address;
    }

    _share() {
        const url = location.origin + '/#contact' + this._address;
        navigator
            .share({ title: 'My Nimiq Address', text: '', url: url })
            .then(_ => console.log('Successful share'))
            .catch(error => console.log('Error sharing', error));
    }
}