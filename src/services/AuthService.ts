import axios from "axios";
import ConfigService from "./ConfigService";
import {Cookies} from "react-cookie";

class AuthService {
    constructor() {
    }

    url = new ConfigService().getConfig().api_url;
    private cookies = new Cookies().getAll();

    getCredentials(username: any, password: any) {
        const headers = {
            'Content-Type': 'application/json'
        };

        return axios.post(this.url + "/auth/token", {username: username, password: password}, {headers})
    }

    getUserInfo() {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.cookies.get('access_token')
        };

        return axios.post(this.url + "/auth/protected", {headers})
    }
}

export default AuthService;