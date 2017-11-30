class Nimiqode extends XElement {
    set address(address) {
        QrCode.render({
            text: address,
            radius: 0.5,
            ecLevel: 'H',
            fill: '#536DFE',
            // fill: '#fff',
            background: 'transparent',
            size: Math.min(240, (window.innerWidth - 64) )
        }, this.$el);
    }
}