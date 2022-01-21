import axios from "axios";
import AuthService from "./AuthService";
import ConfigService from "./ConfigService";

class FileService {
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
}

export default FileService;