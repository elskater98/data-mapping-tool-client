import AuthService from "./AuthService";
import ConfigService from "./ConfigService";
import axios from "axios";

class InstanceService {
    private authService = new AuthService();
    private configService = new ConfigService();

    getInstances() {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/instances/', {headers: headers});
    }

    getInstance(id: any) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/instances/' + id, {
            headers: headers
        });

    }

    createInstances(payload: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/instances/', payload, {headers: headers});

    }

    editInstances(id: any, payload: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.patch(this.configService.getConfig().api_url + '/instances/' + id, payload, {headers: headers});

    }

    removeInstance(id: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.delete(this.configService.getConfig().api_url + '/instances/' + id, {headers: headers});
    }

    initInstance(id: any, data: {} = {}) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/instances/' + id + '/initialize/schema', data, {headers: headers})
    }

}

export default InstanceService;