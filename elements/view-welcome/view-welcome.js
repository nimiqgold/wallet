class ViewWelcome extends XElement{
	html(){
		return `
			<x-container>
			    <nimiq-logo large>Nimiq Wallet</nimiq-logo>
			    <h1>Welcome to Nimiq</h1>
			    <h2>Nimiq is a peer to peer digital currency. This wallet app will connect you to the network and help you store and transfer Nimiqs.</h2>
			</x-container>
			<a secondary href="#import">Import existing Account</a>
			<a button href="#identicons">Create Account</a>
		`
	}
}