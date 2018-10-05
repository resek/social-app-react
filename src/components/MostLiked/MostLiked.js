import React from "react";
import "./MostLiked.css";

const MostLiked = (props) => {

    return (
        <div>
            {props.data.map(user => (
                <div className="mostLiked" key={user._id}>
                    <p>Username: <b>{user.username}</b></p>
                    <p>Likes: <b>{user.likes.likesCount}</b></p>
                </div>
            ))}
        </div>
    )                    
}

export default MostLiked;