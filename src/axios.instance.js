import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-app-node-api.herokuapp.com"
});

export default instance;