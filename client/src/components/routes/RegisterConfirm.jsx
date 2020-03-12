import React from 'react'
import { Link } from 'react-router-dom'

function RegisterConfirm() {
    return (
        <div className="Register">
            <div className="Register-Form">
                <h1>WELCOME TO GLOW GETTER!</h1>
                <p className="Offer">Use code <b>GLOW20</b> at checkout <br /> to activate your welcome offer</p>
                <Link to="/login">
                    <button className="Login-Button">login</button>
                </Link>
            </div>
        </div>
    )
}

export default RegisterConfirm