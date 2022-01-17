import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default {
  getContractLists,
  getTotalContractList,
  getContractSearch,
  getContractDetails,
  getContractDetailsUsingAddress,
};

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}

async function getContractDetails(data) {
  let url =
    process.env.REACT_APP_GET_CONTRACT_DETAILS +
    data.addr

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
      ) {
        return Promise.reject();
      }
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getContractLists(data) {
  let url =
    process.env.REACT_APP_GET_CONTRACT_LIST +
    "?skip=" +
    Math.ceil(data.pageNum) +
    "&limit=" +
    data.perpage;

  return httpService(
    httpConstants.METHOD_TYPE.POST,
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
      ) {
        return Promise.reject();
      }
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getTotalContractList() {
  let url = process.env.REACT_APP_GET_TOTAL_CONTRACT_LIST;
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
      ) {
        return Promise.reject();
      }
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function getContractSearch(data) {
  let url =
    process.env.REACT_APP_GET_CONTRACT_SEARCH +
    "?skip=" +
    Math.ceil(data.pageNum) +
    "&limit=" +
    data.perpage +
    "&keywords=" +
    data.keywords;
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
      ) {
        return Promise.reject();
      }
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function getContractDetailsUsingAddress(path, data) {
  let url = process.env.REACT_APP_GET_CONTRACT_DETAIL_USING_ADDRESS + path
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
