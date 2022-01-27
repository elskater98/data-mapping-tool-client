import axios from "axios";
import AuthService from "./AuthService";
import ConfigService from "./ConfigService";

class OntologyService {
    private authService = new AuthService();
    private configService = new ConfigService();

    constructor() {
    }

    getProperties(key: string) {
        /*
        * all: Get all available properties (object,data,annotation).
        * object: Get object properties.
        * data: Get data properties.
        * annotation: Get annotation properties.
        * */
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.get(this.configService.getConfig().api_url + '/ontology/properties/' + key, {headers: headers});
    }

}

export default OntologyService;