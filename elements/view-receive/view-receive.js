
class ViewReceive extends XElement {
    children() { return [Nimiqode] }

    onCreate() {
        this.$('x-share-button').onclick = e => this._share();
    }

    set address(address) {
        this._address = address;
        this.$('x-address').textContent = address;
        this.$nimiqode.address = address;
    }

    _share() {
        navigator
            .share({ title: this._address, text: '', url: '' })
            .then( _ => console.log('Successful share'))
            .catch(error => console.log('Error sharing', error));
    }
}