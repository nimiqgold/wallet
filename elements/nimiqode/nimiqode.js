class Nimiqode extends XElement {
    set address(address) {
        QrCode.render({
            text: address,
            radius: 0.5,
            ecLevel: 'H',
            fill: '#536DFE',
            background:'transparent',
            size: 256
        }, this.$el);
    }
}