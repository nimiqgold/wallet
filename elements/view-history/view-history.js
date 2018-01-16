class ViewHistory extends XView {
    html(){
    	return `
        <template id="x-transaction">
            <x-identicon></x-identicon>
            <x-address></x-address>
            <x-value></x-value>
        </template>`
    }
    
    children() { return [Transaction] }
}