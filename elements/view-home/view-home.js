class ViewHome extends XView {
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