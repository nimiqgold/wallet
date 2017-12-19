class Nimiqode extends XElement {
    set address(address) {
        this.$el.innerHTML = '';
        QrCode.render({
            text: address,
            radius: 0.8,
            ecLevel: 'H',
            fill: 'rgba(0,0,0,0.7)',
            background: 'transparent',
            size: Math.min(240, (window.innerWidth - 64))
        }, this.$el);
    }
}