const axios = require("axios");
const vscode = require("vscode");

// Get configuration dynamically
function getConfig() {
    const config = vscode.workspace.getConfiguration("weather");
    let apiUrl = config.get("apiUrl") || "https://devapi.qweather.com";

    // Ensure API URL has protocol
    if (
        apiUrl &&
        !apiUrl.startsWith("http://") &&
        !apiUrl.startsWith("https://")
    ) {
        apiUrl = "https://" + apiUrl;
    }

    return {
        key: config.get("key"),
        apiUrl: apiUrl,
        language: config.get("language") || "en",
    };
}

module.exports = {
    /**
     * Get geographic location
     * @param {string} location
     */
    getLocation(location) {
        const config = getConfig();
        return axios({
            url: "https://geoapi.heweather.net/v2/city/lookup",
            method: "get",
            params: {
                location,
                key: config.key,
            },
        });
    },
    /**
     * Get current weather
     */
    nowWeather(location) {
        const config = getConfig();
        return axios({
            url: `${config.apiUrl}/v7/weather/now`,
            method: "get",
            params: {
                location,
                key: config.key,
                lang: config.language,
            },
        });
    },
    /**
     * Get weather forecast
     */
    forecast(location) {
        const config = getConfig();
        return axios({
            url: `${config.apiUrl}/v7/weather/3d`,
            method: "get",
            params: {
                location,
                key: config.key,
                lang: config.language,
            },
        });
    },
    /**
     * Get life index
     */
    getIndices(location) {
        const config = getConfig();
        return axios({
            url: `${config.apiUrl}/v7/indices/1d`,
            method: "get",
            params: {
                location,
                key: config.key,
                type: "8",
                lang: config.language,
            },
        });
    },
};
