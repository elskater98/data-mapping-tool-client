import axios from "axios";
import AuthService from "./AuthService";
import ConfigService from "./ConfigService";

class OntologyService {
    private authService = new AuthService();
    private configService = new ConfigService();


    getProperties(id: string, key: string, args?: object) {
        /*
        * all: Get all available properties (object,data,annotation).
        * object: Get object properties.
        * data: Get data properties.
        * annotation: Get annotation properties.
        * */
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + `/ontology/${id}/properties/` + key, {
            headers: headers,
            params: args
        });
    }

    getClasses(id: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };
        return axios.get(this.configService.getConfig().api_url + `/ontology/${id}/classes`, {headers: headers})
    }

    getRelationsBetweenClasses(id: string, payload: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + `/ontology/${id}/classes/relations`, payload, {headers: headers})
    }

    getOntologyPreview(id: any) {
        return axios.get(this.configService.getConfig().api_url + `/ontology/${id}/view`)
    }

    getOntologies() {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/ontology/', {headers: headers})
    }

    getOntology(id: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/ontology/' + id, {headers: headers})
    }

    removeOntology(id: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.delete(this.configService.getConfig().api_url + '/ontology/' + id, {headers: headers})
    }

    editOntology(id: string, payload: object) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.patch(this.configService.getConfig().api_url + '/ontology/' + id, payload, {headers: headers})
    }

    downloadOntology(id: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/ontology/' + id + '/download', {headers: headers})
    }
}

export default OntologyService;