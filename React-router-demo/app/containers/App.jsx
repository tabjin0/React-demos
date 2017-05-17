import React from 'react'
import Home from './Home'
import List from './List'
import NotFound from './NotFound'

class App extends React.Component {
	render() {
		return (
			<div>
				<p>head</p>
				<div>{this.props.children}</div>
				<Home />
				<List/>
				<p>foot</p>
			</div>
		)
	}
}
export default App