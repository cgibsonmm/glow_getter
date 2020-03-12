import React from 'react'
import { Link } from 'react-router-dom'

function LoginConfirm(props) {
    return (
        <div className="Login">
            <div className="Login-Form">
                <h1>WELCOME BACK <br /> {props.currentUser.username}!</h1>
                <Link to="/shop">
                    <button className="Shop-Button">get shopping</button>
                </Link>
            </div>
        </div>
    )
}

export default LoginConfirm