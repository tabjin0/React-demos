import React from 'react'

class Header extends React.Component {
    render() {
        return (
             <p>{this.props.title} {this.props.jinboydefine} {this.props.notastring}</p>
        )
    }
}

export default Header