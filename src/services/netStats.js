import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getNetStatsData};

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key" : process.env.REACT_APP_X_API_KEY
  };
}

async function getNetStatsData() {
  let url = process.env.REACT_APP_GET_NET_STATS_DATA;
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
async function getSomeDaysAccount() {
  let url = process.env.REACT_APP_GET_SOME_DAYS_ACCOUNTS;
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
async function getLatestAccount(path, data) {
  let url = process.env.REACT_APP_GET_LATEST_ACCOUNTS + path;
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
