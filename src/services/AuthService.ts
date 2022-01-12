import * as config from '../../config.json';
import axios from "axios";

class AuthService {

    constructor() {
    }

    getCredentials(username: string, password: string) {
        const headers = {
            'Content-Type': 'application/json'
        };

        return axios.post("http://localhost:8080/token", {username: username, password: password}, {headers})
    }

}

export default AuthService;