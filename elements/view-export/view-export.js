class ViewExport extends XElement {
    children() { return [Nimiqode] }
    set privateKey(privateKey) {
        this.$nimiqode.address = privateKey;
    }

    onShow() {
    	this.privateKey = nimiq.exportKey()
    }

    onHide() {
        this.privateKey = '';
    }
}