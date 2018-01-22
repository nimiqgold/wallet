import XView from '/library/x-element/x-view.js';

export default class ViewHistory extends XView {
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