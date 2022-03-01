import axios from "axios";
import ConfigService from "./ConfigService";
import {Cookies} from "react-cookie";

class AuthService {
    url = new ConfigService().getConfig().api_url;
    private cookies = new Cookies().getAll();

    getCredentials(username: any, password: any) {
        const headers = {
            'Content-Type': 'application/json'
        };

        return axios.post(this.url + "/auth/token", {username: username, password: password}, {headers})
    }

    hasCredentials() {
        return this.cookies['access_token']
    }

    getProfile() {
        const headers = {
            'Authorization': 'Bearer ' + this.cookies['access_token']
        };

        return axios.get(this.url + "/auth/profile", {headers})
    }
}

export default AuthService;