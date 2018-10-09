import React, { Component } from 'react';
import './App.css';
import {Route, Link, Switch} from "react-router-dom";

import MostLiked from "./containers/MostLiked/MostLiked";
import Auth from "./containers/Auth/Auth";
import setAuthToken from "./utils/setAuthToken";

setAuthToken(localStorage.jwtToken);

class App extends Component {
    render() {      
        return (
            <div className="App">
                <div className="Navbar">
                    <Link className="Link" to="/">Home</ Link>
                    <Link className="Link" to="/auth">Signup / Login</ Link>
                </div>
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/" component={MostLiked} />                    
                </Switch> 
            </div>
        );
    }
}

export default App;
