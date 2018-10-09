import React, {Component, Fragment} from 'react';
import axios from "../../axios.instance";
import "./MostLiked.css";

class SocialApp extends Component {

    state = {
        mostLikedData: null,
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
                {mostLiked}             
            </Fragment>
        )
    }
}

export default SocialApp;