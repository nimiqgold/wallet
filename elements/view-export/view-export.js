class ViewExport extends XElement {
    children() { return [Nimiqode] }
    set privateKey(privateKey) {
        this.$nimiqode.address = privateKey;
    }
}