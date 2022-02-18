import AuthService from "./AuthService";
import ConfigService from "./ConfigService";
import axios from "axios";

class MappingService {

    private authService = new AuthService();
    private configService = new ConfigService();

    constructor() {
    }

    public generateYARRML(payload: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/mapping/', payload, {headers: headers})
    }

}

export default MappingService;