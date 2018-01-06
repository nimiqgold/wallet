class ViewHome extends XElement {
    children() { return [XAmount, XIdenticon] }

    set address(address) { this.$identicon.address = address }

    set balance(balance) { this.$amount.value = balance }
}