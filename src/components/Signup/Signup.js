import React from "react";

const Signup = (props) => {

    return (
        <form>
            <input type="text" placeholder="username" onChange={props.handleUsername}></input>
            <input type="email" placeholder="email" onChange={props.handleEmail}></input>
            <input type="password" placeholder="password" onChange={props.handlePassword1}></input>
            <input type="password" placeholder="repeat password" onChange={props.handlePassword2}></input>
            <button onClick={props.handleSignup}>Signup</button>
        </form>            
    )                    
}

export default Signup;