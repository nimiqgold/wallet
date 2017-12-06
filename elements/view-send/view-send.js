class ViewSend extends XElement {
    children() { return [QrScanner] }
    onCreate() {
        this.$qrScanner.$el.addEventListener('x-decoded', (e) => {
            const decoded = e.detail;
            app.recipient = decoded;
            location = '#transaction';
        });
        this.$qrScanner.setGrayscaleWeights(145, 91, 20);
    }

    onShow(){
        this.$qrScanner.active = true;
    }

    onHide(){
        this.$qrScanner.active = false;
    }
}