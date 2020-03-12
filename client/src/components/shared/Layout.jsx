import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    nav = React.createRef()

    handleClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            }
        })
    }

    handleClickOutside = (event) => {
        if (this.nav.current && !this.nav.current.contains(event.target)) {
          this.setState({
            open: false,
          });
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside)
    }
    
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside)
    }

    render() {
    return (
        <div className="Layout">
            <div className="Header">
                <nav className="Nav" ref={this.nav}>
                    <NavLink className="Logo" to="/" style={{ textDecoration: 'none' }}>GG</NavLink>
                    <button className="Hamburger-Button" type="button" onClick={this.handleClick}>☰</button>

                    {this.props.currentUser ?
                        <div className="Logged-In">
                            Hello, {this.props.currentUser.username}!
                            <button onClick={this.props.logout}>logout</button> 
                        
                            {this.state.open && (
                            <ul className="Hamburger-Dropdown-In">
                                <Link to="/"><li>Home</li></Link>
                                <Link to="/shop"><li>Shop</li></Link>
                                <Link to="/cart"><li>My Cart</li></Link>
                            </ul>
                             )}
                        </div>
                    :
                        <div className="Logged-Out">
                            {this.state.open && (
                            <ul className="Hamburger-Dropdown-Out">
                                <Link to="/"><li>Home</li></Link>
                                <Link to="/shop"><li>Shop</li></Link>
                                <Link to="/login"><li>Login</li></Link>
                                <Link to="/register"><li>Register</li></Link>
                            </ul>
                             )}
                        </div>
                    }
                </nav>
                
                <div className="Title">
                    <Link className="Title-Text" to="/" style={{ textDecoration: 'none' }}>GLOW GETTER</Link>
                </div>
                <br />
            </div>

            {this.props.children}

            <div className="Footer">
                <hr />
                <p>&copy; 2020 SAMANTHA RUSSELL  |  GITHUB   LINKEDIN</p>
            </div>
        </div>
    )}
}

export default Layout