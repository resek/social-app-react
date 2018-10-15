import React, {Component, Fragment} from 'react';
import {observer, inject} from "mobx-react";
import axios from "../../axios.instance";
import {Redirect, Link} from "react-router-dom";

import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";

class Auth extends Component {

    state = {
        redirect: false,
        username: "",
        email: "",
        password1: "",
        password2: "",
    }

    handleInputData = (param) => (e) => {
        this.setState({[param]: e.target.value});
    } 

    handleSignup = (e) => {
        e.preventDefault();
        if (this.state.password1 !== this.state.password2) {
            alert("Passwords do not match");
        } else {
            axios.post("/signup", {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password1
            })
            .then(response => {
                this.props.Store.handleToken(response);
                this.setState({redirect: true});
            })
            .catch(error => {
                alert(error.response.data.message);
            });
        }
    }

    handleLogin = (e) =>  {
        e.preventDefault();
        axios.post("/login", {
            email: this.state.email,
            password: this.state.password1
        })
        .then(response => {
            this.props.Store.handleToken(response);
            this.setState({redirect: true});
        })
        .catch(error => {
            alert(error.response.data.message);
        })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        return (
            <Fragment>
                <div className="Navbar">
                    <Link to="/" className="Link"><button>Home</button></Link>           
                </div>                
                <Signup
                    handleUsername={this.handleInputData("username")}
                    handleEmail={this.handleInputData("email")}
                    handlePassword1={this.handleInputData("password1")}
                    handlePassword2={this.handleInputData("password2")} 
                    handleSignup={this.handleSignup} />                
                <Login
                    handleEmail={this.handleInputData("email")}
                    handlePassword={this.handleInputData("password1")}
                    handleLogin={this.handleLogin} />
            </Fragment>
        )
    }   
}

export default inject("Store")(observer(Auth));