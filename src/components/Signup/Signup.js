import React from "react";

const Signup = (props) => {

    return (
        <form>
            <input type="text" placeholder="username" value={props.username} onChange={props.handleUsername}></input>
            <input type="email" placeholder="email" value={props.email} onChange={props.handleEmail}></input>
            <input type="password" placeholder="password" value={props.password1} onChange={props.handlePassword1}></input>
            <input type="password" placeholder="repeat password" value={props.password2} onChange={props.handlePassword2}></input>
            <button onClick={props.handleSignup}>Signup</button>
        </form>            
    )                    
}

export default Signup;