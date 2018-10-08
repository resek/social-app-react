import React from "react";

const Login = (props) => {

    return (
        <form>
            <input type="email" placeholder="email" value={props.email} onChange={props.handleEmail}></input>
            <input type="password" placeholder="password" value={props.password1} onChange={props.handlePassword1}></input>
            <button onClick={props.handleLogin}>Login</button>
        </form>
    )                    
}

export default Login;