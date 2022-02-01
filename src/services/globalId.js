import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getGlobalIdTokens, getGlobalIdUserInfo };
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}

async function getGlobalIdTokens(code) {
  let url =  process.env.REACT_APP_USER_SERVICE_URL_GLOBAL_ID_AUTHENTICATION + "get-globalid-tokens?code=" + code;
  return httpService(
    "GET",
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

async function getGlobalIdUserInfo(data) {
  let url =  process.env.REACT_APP_USER_SERVICE_URL_GLOBAL_ID_AUTHENTICATION+ "get-globalid-user-info";
  return httpService(
    "POST",
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
