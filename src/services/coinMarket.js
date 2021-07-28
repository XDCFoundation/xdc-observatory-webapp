import { httpService } from "../managers/httpService";
import { httpConstants } from "../images/constants";

export default { getCoinMarketData }
async function getCoinMarketData(path, data) {
    let url = process.env.REACT_APP_GET_COIN_MARKET_CAP + path;
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}