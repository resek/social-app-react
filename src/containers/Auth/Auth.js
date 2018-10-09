import React, {Component, Fragment} from 'react';
import axios from "../../axios.instance";

import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";
import setAuthToken from "../../utils/setAuthToken";

class Auth extends Component {

    state = {
        username: "",
        email: "",
        password1: "",
        password2: "",
        loginEmail: "",
        loginPassword: "",
    }

    handleUsername = (e) => {
        this.setState({username: e.target.value})
    }

    handleEmail= (e) => {
        this.setState({email: e.target.value})
    }

    handlePassword1= (e) => {
        this.setState({password1: e.target.value})
    }

    handlePassword2= (e) => {
        this.setState({password2: e.target.value})
    }

    handleLoginEmail= (e) => {
        this.setState({loginEmail: e.target.value})
    }

    handleLoginPass = (e) => {
        this.setState({loginPassword: e.target.value})
    }    

    handleSignup = (e) => {
        e.preventDefault();
        if (this.state.password1 !== this.state.password2) {
            this.setState({message: "Passwords do not match"})
        } else {
            axios.post("/signup", {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password1
            })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem("jwtToken", token);
                setAuthToken(token);
                alert(response.data.message);
                this.setState({
                    username: "",
                    email: "",
                    password1: "",
                    password2: "" });
            })
            .catch(error => {
                alert(error.response.data.message);
            });
        }
    }

    handleLogin = (e) =>  {
        e.preventDefault();
        axios.post("/login", {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        })
        .then(response => {
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            alert(response.data.message);
            this.setState({
                loginEmail: "",
                loginPassword: "" });
        })
        .catch(error => {
            alert(error.response.data.message);
        })
    }

    render() {

        return (
            <Fragment>
                <Signup
                    username={this.state.username}
                    email={this.state.email}
                    password1={this.state.password1}
                    password2={this.state.password2}
                    handleUsername={this.handleUsername} 
                    handleEmail={this.handleEmail} 
                    handlePassword1={this.handlePassword1}
                    handlePassword2={this.handlePassword2}
                    handleSignup={this.handleSignup} />
                
                <Login
                    email={this.state.loginEmail}
                    password={this.state.loginPassword}
                    handleEmail={this.handleLoginEmail}
                    handlePassword={this.handleLoginPass}
                    handleLogin={this.handleLogin} />
            </Fragment>
        )
    }   
}


export default Auth;