import axios from "axios";
import AuthService from "./AuthService";
import ConfigService from "./ConfigService";

class MappingService {
    private authService = new AuthService();
    private configService = new ConfigService();

    constructor() {
    }

    getSample(filename: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/mapping/data/sample', {
            params: {filename: filename},
            headers: headers
        })
    }

    getColumns(filename: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/mapping/data/sample/columns', {
            params: {filename: filename},
            headers: headers
        })
    }

    createMapping(data: any) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/mapping/', data, {headers: headers})
    }
}

export default MappingService;