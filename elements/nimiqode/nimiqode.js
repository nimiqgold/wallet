class Nimiqode extends XElement {
    set address(address) {
        QrCode.render({
            text: address,
            radius: 0.5,
            ecLevel: 'H',
            fill: '#536DFE',
            background: 'transparent',
            size: Math.min(200, (window.innerWidth - 64) / Math.sqrt(2))
        }, this.$el);
    }
}