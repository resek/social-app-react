import React, {Component, Fragment} from 'react';
import axios from "../../axios.instance";
import MostLiked from "../../components/MostLiked/MostLiked";

class SocialApp extends Component {

    state = {
        mostLikedData: null,
    }

    componentDidMount() {
        axios.get("http://localhost:4000/most-liked")
            .then(response => {
                this.setState({mostLikedData: response.data}); 
            })
            .catch(error => {
                console.log(error);
            });        
    }

    render() {

        let mostLikedComp = null;

        if (this.state.mostLikedData) {
            mostLikedComp = <MostLiked data={this.state.mostLikedData} /> 
        }

        return (
            <Fragment>
                {mostLikedComp}
            </Fragment>
        )
    }

}

export default SocialApp;