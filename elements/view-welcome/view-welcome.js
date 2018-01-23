import XView from '/library/x-element/x-view.js';

export default class ViewWelcome extends XView {
    html() {
        return `
			<x-container>
			    <nimiq-logo large>Nimiq Wallet</nimiq-logo>
			    <h1>Welcome to Nimiq</h1>
			    <h2>Nimiq is a peer to peer digital currency. This wallet app will connect you to the network and help you store and transfer Nimiqs.</h2>
			</x-container>
			<a secondary href="#backup-file-import">Import existing Account</a>
			<a button href="#identicons">Create Account</a>
		`
    }
}