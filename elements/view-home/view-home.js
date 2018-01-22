import XView from '/library/x-element/x-view.js';
import XAmount from '/elements/x-amount/x-amount.js';
import XIdenticon from '/elements/x-identicon/x-identicon.js';

export default class ViewHome extends XView {
    html(){
    	return `
    	<x-header>
            <a href="#export" icon-export right></a>
        </x-header>
        <x-identicon></x-identicon>
        <x-amount></x-amount>`
    }

    children() { return [XAmount, XIdenticon] }

    set address(address) { this.$identicon.address = address }

    set balance(balance) { this.$amount.value = balance }
}