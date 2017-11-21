class ViewFees extends XElement {

    children() { return [Amount] }

    onCreate() {
        const slider = this.$('input');
        slider.addEventListener('input', () => this.$amount.value = slider.value);
    }
}