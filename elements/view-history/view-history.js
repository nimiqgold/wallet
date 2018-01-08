class ViewHistory extends XView {
    children() { return [Transaction] }

    html(){
    	return `
        <template id="x-transaction">
            <x-identicon></x-identicon>
            <x-address></x-address>
            <x-value></x-value>
        </template>`
    }
}