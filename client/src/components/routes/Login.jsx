import React from 'react'

function Login(props) {
    return (
        <div className="Login">
            <div className="Login-Form">
                <h3>LOGIN TO YOUR ACCOUNT</h3>
                <img src="https://i.imgur.com/Sq8CNHF.png" width="50px" height="50px" alt="user"/>
                <form onSubmit={props.handleLogin} >
                    <div className="Username">Username</div>
                        <input 
                            required
                            placeholder="Enter your username"
                            name="username"
                            type="text"
                            value={props.formData.username}
                            onChange={props.handleChange}
                        />
                      
                    <div className="Password">Password</div>
                        <input
                            required
                            placeholder="Enter your password"
                            name="password"
                            type="password"
                            value={props.formData.password}
                            onChange={props.handleChange}
                        /> <br />

                    <button className="Login-Button">login</button>
                </form>
            </div>
        </div>
    )
}

export default Login