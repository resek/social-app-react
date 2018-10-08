import React from "react";
import "./MostLiked.css";

const MostLiked = (props) => {

    return (
        <div>
            {props.data.map(user => (
                <div className="mostLiked" key={user._id}>
                    <p>Username: <b>{user.username}</b></p>
                    <p>Likes: <b>{user.likes.likesCount}</b></p>
                    <button onClick={() => props.likeUser((user._id))}>Like</button>
                    <button onClick={() => props.unlikeUser((user._id))}>Unlike</button>
                </div>
            ))}
        </div>
    )                    
}

export default MostLiked;