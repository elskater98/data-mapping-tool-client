class ConfigService {

    getConfig() {
        return {api_url: process.env.REACT_APP_API_URL, default_ontology_id: process.env.REACT_APP_DEFAULT_ONTOLOGY_ID};
    }
}

export default ConfigService;