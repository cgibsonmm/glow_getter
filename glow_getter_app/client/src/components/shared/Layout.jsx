import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import HamburgerMenu from 'react-hamburger-menu'

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    handleClick() {
        this.setState({
          open: !this.state.open
        })
    }

    displayHamburgerMenu = () => {
        return (
          <HamburgerMenu
            isOpen={this.state.open}
            menuClicked={this.handleClick.bind(this)}
            width={18}
            height={15}
            strokeWidth={2}
            rotate={0}
            color='white'
            borderRadius={0}
            animationDuration={0.5}
          />
        )
      }

    render() {
    return (
        <div className="Layout">
            <div className="Header">
                <nav className="Nav">
                    <NavLink className="Logo" to="/" style={{ textDecoration: 'none' }}>GG</NavLink>
                    {this.props.currentUser ? 
                    <div>
                        {this.props.currentUser.username}
                        <button onClick={this.props.logout}>Logout</button> 

                        <br />

                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/shop">Shop</NavLink>
                        <NavLink to="/cart">View My Cart</NavLink>
                    </div> :

                    <div>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/shop">Shop</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </div> }             
                </nav>
            <Link className="Title" to="/" style={{ textDecoration: 'none' }}>GLOW GETTER</Link>
            </div>

            {this.props.children}

            <div className="Footer">
                <p>&copy; SAMANTHA RUSSELL</p>
            </div>
        </div>
    )}
}

export default Layout