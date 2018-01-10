class ViewWelcome extends XElement{
	html(){
		return `
			<x-container>
			    <nimiq-logo></nimiq-logo>
			    <h1></h1>
			</x-container>
			<a secondary href="#import">Import existing Account</a>
			<a button href="#identicons">Create Account</a>
		`
	}
}