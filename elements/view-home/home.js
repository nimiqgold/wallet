class ViewHome extends XElement {
    children() { return [Amount, Identicon] }

    set address(address) { this.$identicon.address = address }

    set balance(balance) { this.$amount.value = balance }
}