import React from 'react'
import { Link } from 'react-router'
//React-router跳转
class Home extends React.Component {
	render() {
		return (
			<div>
				<p>Home</p>
				<Link to="/list">切到列表页面</Link>
			{/*这边/list就是在routerMap里面配置的*/}
			</div>
			
		)
	}
}
export default Home