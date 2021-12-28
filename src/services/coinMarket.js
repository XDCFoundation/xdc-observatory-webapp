import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getCoinMarketData, getCoinMarketTotalSupply };
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}
async function getCoinMarketData(path, data) {
  let url = process.env.REACT_APP_GET_COIN_MARKET_CAP + path;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    getHeaders(),
    data,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function getCoinMarketTotalSupply() {
  let url = process.env.REACT_APP_GET_COIN_MARKET_TOTAL_SUPPLY;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    getHeaders(),
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
