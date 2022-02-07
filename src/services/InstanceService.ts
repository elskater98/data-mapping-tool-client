import AuthService from "./AuthService";
import ConfigService from "./ConfigService";
import axios from "axios";

class InstanceService {
    private authService = new AuthService();
    private configService = new ConfigService();

    constructor() {
    }

    getInstances() {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/instances/', {headers: headers});
    }

    getInstance(ref: any) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/instances/' + ref, {
            headers: headers
        });

    }

    createInstances(payload: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/instances/', payload, {headers: headers});

    }

    editInstances(ref: string, payload: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.patch(this.configService.getConfig().api_url + '/instances/' + ref, payload, {headers: headers});

    }

    removeIntance(ref: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.delete(this.configService.getConfig().api_url + '/instances/' + ref, {headers: headers});
    }

}

export default InstanceService;