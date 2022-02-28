class ConfigService {

    getConfig() {
        return {api_url: process.env.REACT_APP_API_URL};
    }
}

export default ConfigService;