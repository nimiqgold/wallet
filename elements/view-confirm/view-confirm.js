class ViewConfirm extends XElement {
    onCreate() {
        this.$('[button]').addEventListener('click', e => this.fire('x-confirm'));
    }
}

// Todo: confirm should not be triggert accidentially