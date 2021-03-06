import XScreen from '/elements/x-screen/x-screen.js';

export default class ScreenWelcome extends XScreen {
    html() {
        return `
		    <nimiq-logo large>Nimiq Wallet</nimiq-logo>
		    <h1>Welcome to Nimiq</h1>
		    <h2>Nimiq is a peer to peer digital currency. This wallet app will connect you to the network and help you store and transfer Nimiqs.</h2>
			<a button href="#identicons">Create Account</a>
			<a secondary href="#backup-file-import">Import existing Account</a>
		`
    }
}