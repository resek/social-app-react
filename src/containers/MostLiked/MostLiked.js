import React, {Component, Fragment} from 'react';
import axios from "../../axios.instance";
import {Link} from "react-router-dom";
import "./MostLiked.css";

class SocialApp extends Component {

    state = {
        mostLikedData: null,
        logout: false
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

    handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("authUsername");
        localStorage.removeItem("authUserId");
        delete axios.defaults.headers.common["Authorization"];
        this.setState({logout: true});
    }
    
    render() {

        let mostLiked = null;

        if (this.state.mostLikedData) {            
            mostLiked = (
                <Fragment>       
                    {this.state.mostLikedData.map(user => (
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
                    {localStorage.authUsername ? (
                        <Fragment>
                            <Link className="Link" to="/profile">{localStorage.authUsername}</ Link>
                            <button onClick={this.handleLogout}>Logout</button>
                        </Fragment> )
                    : <Link className="Link" to="/auth">Signup/in</ Link>}
                </div>
                {mostLiked}             
            </Fragment>
        )
    }
}

export default SocialApp;