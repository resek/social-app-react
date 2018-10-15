import {observable, configure, decorate, runInAction, action} from "mobx";
import axios from "../axios.instance";
import jwtDecode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken";

configure({enforceActions: "observed"});

class Store {
    
    mostLikedData = null;
    logedinUserData = null;
  
    getUsers = () => {
        axios.get("/most-liked")
            .then(response => {
                runInAction(() => {
                    this.mostLikedData = response.data;
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteUser = () => {
        this.logedinUserData = null;
    }

    handleToken = (response) => {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        this.logedinUserData = decoded;
    }
}

decorate(Store, {
    mostLikedData: observable,
    logedinUserData: observable,
    deleteUser: action,
});

export default new Store();

