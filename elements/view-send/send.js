class ViewSend extends XElement {
    children() { return [QrScanner] }
    onCreate() {
        this.$qrScanner.$el.addEventListener('x-decoded', (e) => {
            const decoded = e.detail;
            app.recipient = decoded;
            location = '#transaction';
        });

        // const video = this.$('video');
        // navigator.mediaDevices.enumerateDevices()
        //     .then(function(devices) {
        //         devices.forEach(function(device) {
        //             console.log(device.kind + ": " + device.label +
        //                 " id = " + device.deviceId);
        //         });
        //     })
        // navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        //     .then(stream => video.srcObject = stream)
        //     .catch(console.error);
    }
}