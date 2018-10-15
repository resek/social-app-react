import React, {Component, Fragment} from 'react';
import {observer, inject} from "mobx-react";
import axios from "../../axios.instance";
import {Link} from "react-router-dom";
import "./MostLiked.css";

class MostLiked extends Component {

    state = {
        logout: false
    }

    componentDidMount() {
        this.props.Store.getUsers();
    }    

    likeUser = (userId) => {
        axios.patch(`/user/${userId}/like`)
            .then(() => {
                this.props.Store.getUsers();
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    }

    unlikeUser = (userId) => {
        axios.patch(`/user/${userId}/unlike`)
            .then(() => {
                this.props.Store.getUsers();
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    }

    handleLogout = () => {
        localStorage.removeItem("jwtToken");
        this.props.Store.logedinUserData = null;
        delete axios.defaults.headers.common["Authorization"];
        this.setState({logout: true});
    }
    
    render() {

        const {mostLikedData} = this.props.Store;
        const {logedinUserData} = this.props.Store;
        let mostLiked = null;

        if (mostLikedData) {            
            mostLiked = (
                <Fragment>       
                    {mostLikedData.map(user => (
                        <div className="MostLiked" key={user._id}>
                            <p>Username: <b>{user.username}</b></p>
                            <p>Likes: <b>{user.likes.likesCount}</b></p>
                            <button onClick={() => this.likeUser((user._id))}>Like</button>
                            <button onClick={() => this.unlikeUser((user._id))}>Unlike</button>
                        </div>
                    ))}
                </Fragment>
            )            
        }

        return (
            <Fragment>
                <div className="Navbar">                                        
                    {logedinUserData ? (
                        <Fragment>
                            <span>{logedinUserData.username}</span>
                            <Link className="Link" to="/profile"><button>Profile</button></ Link>
                            <button onClick={this.handleLogout}>Logout</button>
                        </Fragment> )
                    : <Link className="Link" to="/auth"><button>Signup/in</button></ Link>}
                </div>
                {mostLiked}             
            </Fragment>
        )
    }
}

export default inject("Store")(observer(MostLiked));