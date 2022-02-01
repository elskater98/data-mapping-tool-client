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

    createMappingInstance(data: any) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/mapping/', data, {headers: headers})
    }

    getMappingInstances() {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };
        return axios.get(this.configService.getConfig().api_url + '/mapping/', {headers: headers})
    }

    getMappingInstance(ref: any) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };
        return axios.get(this.configService.getConfig().api_url + '/mapping/' + ref, {headers: headers})
    }

    deleteMappingInstance(ref: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };
        return axios.delete(this.configService.getConfig().api_url + '/mapping/' + ref, {headers: headers})
    }

    editMappingInstance(ref: any, data: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };
        return axios.patch(this.configService.getConfig().api_url + '/mapping/' + ref, data, {headers: headers})
    }

    runProcess(ref: any, data: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/mapping/pre/process/' + ref, data, {headers: headers})
    }
}

export default MappingService;