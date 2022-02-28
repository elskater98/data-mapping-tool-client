import axios from "axios";
import AuthService from "./AuthService";
import ConfigService from "./ConfigService";

class OntologyService {
    private authService = new AuthService();
    private configService = new ConfigService();


    getProperties(key: string, args?: object) {
        /*
        * all: Get all available properties (object,data,annotation).
        * object: Get object properties.
        * data: Get data properties.
        * annotation: Get annotation properties.
        * */
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/ontology/properties/' + key, {
            headers: headers,
            params: args
        });
    }

    getClasses() {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };
        return axios.get(this.configService.getConfig().api_url + '/ontology/classes', {headers: headers})
    }

    getRelationsBetweenClasses(payload: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/ontology/classes/relations', payload, {headers: headers})
    }

    initInstance(ref: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/ontology/init/instance/' + ref, {}, {headers: headers})
    }

}

export default OntologyService;