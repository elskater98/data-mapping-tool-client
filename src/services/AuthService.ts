import axios from "axios";

import config from "../config.json";

class AuthService {
    constructor() {
    }

    url = config.api_url

    getCredentials(username: any, password: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        return axios.post(this.url + "/auth/token", {username: username, password: password}, {headers})
    }

}

export default AuthService;