import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getLatestBlock, getTotalBlocks, getDetailsOfBlock };
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}
async function getLatestBlock(path, data) {
  let url = process.env.REACT_APP_GET_LATEST_BLOCKS + path;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), data, url)
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
async function getTotalBlocks() {
  let url = process.env.REACT_APP_GET_TOTAL_BLOCKS;
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
async function getDetailsOfBlock(path, data) {
  let url = process.env.REACT_APP_GET_BLOCK_DETAIL + path;
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
