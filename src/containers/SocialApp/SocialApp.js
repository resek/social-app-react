import React, {Component, Fragment} from 'react';
import axios from "../../axios.instance";
import {Route, Link} from "react-router-dom";
import "./SocialApp.css"

import MostLiked from "../../components/MostLiked/MostLiked";
import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";

class SocialApp extends Component {

    state = {
        mostLikedData: null,
        username: "",
        email: "",
        password1: "",
        password2: "",
        token: null,
    }

    componentDidMount() {
        axios.get("/most-liked")
            .then(response => {
                console.log(response.data);
                this.setState({mostLikedData: response.data}); 
            })
            .catch(error => {
                console.log(error);
            });        
    }

    likeUser = (userId) => {
        axios.patch(`/user/${userId}/like`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
                this.setState({message: error.response.data.message})
            });
    }

    unlikeUser = (userId) => {
        axios.patch(`/user/${userId}/unlike`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
                this.setState({message: error.response.data.message})
            });
    }

    handleUsername = (e) => {
        this.setState({username: e.target.value})
    }

    handleEmail= (e) => {
        console.log(e.target.value);
        this.setState({email: e.target.value})
    }

    handlePassword1= (e) => {
        console.log(e.target.value);
        this.setState({password1: e.target.value})
    }

    handlePassword2= (e) => {
        this.setState({password2: e.target.value})
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
                alert(response.data.message);
                this.setState({
                    token: response.data.token,
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
            email: this.state.email,
            password: this.state.password1
        })
        .then(response => {
            alert(response.data.message);
            this.setState({
                token: response.data.token,
                email: "",
                password1: "" });
        })
        .catch(error => {
            alert(error.response.data.message);
        })
    }

    render() {

        let mostLikedComp = null;

        if (this.state.mostLikedData) {
            mostLikedComp = 
                <Route path="/" exact render={() => 
                    <MostLiked 
                        likeUser={this.likeUser}
                        unlikeUser={this.unlikeUser}
                        data={this.state.mostLikedData} />} />
        }

        return (
            <Fragment>
                
                <div className="navbar">
                    <Link className="link" to="/">Home</ Link>
                    <Link className="link" to="/signup">Signup</ Link>
                    <Link className="link" to="/login">Login</ Link>
                </div>
                
                <Route path="/signup" render={() => 
                    <Signup
                        username={this.state.username}
                        email={this.state.email}
                        password1={this.state.password1}
                        password2={this.state.password2}
                        handleUsername={this.handleUsername} 
                        handleEmail={this.handleEmail} 
                        handlePassword1={this.handlePassword1}
                        handlePassword2={this.handlePassword2}
                        handleSignup={this.handleSignup} /> } />
                
                <Route path="/login" render={() => 
                    <Login
                        email={this.state.email}
                        password1={this.state.password1}
                        handleEmail={this.handleEmail}
                        handlePassword1={this.handlePassword1}
                        handleLogin={this.handleLogin} />} />               
                
                {mostLikedComp}
            </Fragment>
        )
    }
}

export default SocialApp;