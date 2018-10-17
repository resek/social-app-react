import React, {Component, Fragment} from 'react';
import axios from "../../axios.instance";
import {Link, Redirect} from "react-router-dom";
import "./Profile.css";

class Profile extends Component {

    state = {
        logedinUserData: null,
        newPassword: null,
        redirect: false,
    }

    componentDidMount() {
        axios.get("/me")
            .then(response => {
                this.setState({logedinUserData: response.data}); 
            })
            .catch(error => {
                console.log(error);
            });        
    }

    handleInputData = (param) => (e) => {
        this.setState({[param]: e.target.value});
    }

    changePassword = (e) => {
        e.preventDefault();
        axios.patch("/me/update-password", {
            newPassword: this.state.newPassword,
            userId: this.state.logedinUserData.userId,
        })
        .then(response => {
            alert(response.data.message);
            this.setState({redirect: true});
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {

        let logedinUser;
        const data = this.state.logedinUserData;

        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        if (data) {
            logedinUser = (
                <Fragment>
                    <div>{data.username}</div>
                    <div>{data.email}</div>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <div className="Navbar">
                    <Link to="/" className="Link"><button>Home</button></Link>           
                </div>
                {logedinUser}
                <form>
                    <input className="ChangePassword" placeholder="change password" type="password" onChange={this.handleInputData("newPassword")}></input>
                    <button onClick={this.changePassword}>Change password</button>
                </form>                
            </Fragment>
        )
    }    
}

export default Profile;