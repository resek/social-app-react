import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";

import MostLiked from "./containers/MostLiked/MostLiked";
import Auth from "./containers/Auth/Auth";
import Profile from "./containers/Profile/Profile";
import setAuthToken from "./utils/setAuthToken";

setAuthToken(localStorage.jwtToken);

class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/" component={MostLiked} />
                </Switch> 
            </div>
        );
    }
}

export default App;
