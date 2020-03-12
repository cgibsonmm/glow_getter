import React from 'react'

function Register(props) {
    return (
        <div className="Register">
            <div className="Register-Form">
                <h3>SIGN UP FOR AN ACCOUNT</h3>
                <p> Get 20% off + FREE SHIPPING <br /> on your first purchase of $100+</p>
                <form onSubmit={props.handleRegister} >
                    <div className="Username">Username </div>
                        <input 
                            required
                            placeholder="Create username"
                            name="username"
                            type="text"
                            value={props.formData.username}
                            onChange={props.handleChange}
                        />

                    <div className="Email">Email </div>
                        <input 
                            required
                            placeholder="Enter your email address"
                            name="email"
                            type="text"
                            value={props.formData.email}
                            onChange={props.handleChange}
                        />
                
                    <div className="Password">Password </div>
                        <input
                            required
                            placeholder="Create password (minimum 6 characters)"
                            name="password"
                            type="password"
                            value={props.formData.password}
                            onChange={props.handleChange}
                        /> <br />

                    <button className="Register-Button">sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Register