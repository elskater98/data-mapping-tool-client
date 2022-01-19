import config from "../config.json";

class ConfigService {
    constructor() {
    }

    getConfig() {
        return config;
    }
}

export default ConfigService;