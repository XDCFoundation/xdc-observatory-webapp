import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { tagAddress, deleteTagAddress };
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}

async function tagAddress(reqObj) {
  const url = process.env.REACT_APP_PUT_TAG_ADDRESS + "";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    getHeaders(),
    reqObj,
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

async function deleteTagAddress(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "delete-address-tag";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
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
