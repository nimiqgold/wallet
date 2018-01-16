class ViewConfirm extends XView {
    html(){
    	return `
    	<x-header>
            <a href="#transaction" icon-back></a>
        </x-header>
        <x-text>
            <x-fees></x-fees>
            <x-time-estimate></x-time-estimate>
            <a href="#fees">Adjust</a>
        </x-text>
        <a href="#loading" button>Confirm</a>`
    }

    onCreate() {
        this.$('[button]').addEventListener('click', e => this.fire('x-confirm'));
    }
}

// Todo: confirm should not be triggert accidentially