
class ViewConfirm extends XElement {
    onCreate() {
        this.$('[button]').addEventListener('click', e => {
            location = '#loading';
            app.sendTx();
            setTimeout(() => location = '#success', 1000);
            setTimeout(() => location = '#home', 3000);
        })
    }
}