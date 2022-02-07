import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default {
  getTotalAccount,
  getSomeDaysAccount,
  getLatestAccount,
  getTokenBalance,
  getTokenTransferCount,
  getHistoryPrice,
  getTokenOverview,
  getTokenInfo,
  getAccountList,
  getAddressAnalytics,
};

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}

async function getTotalAccount() {
  let url = process.env.REACT_APP_GET_TOTAL_ACCOUNTS;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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

async function getTokenInfo(symbol) {
  let url =
    process.env.REACT_APP_ACCOUNT_SERVICE_BASEURL +
    httpConstants.API_END_POINT.GET_TOKEN_INFO +
    `/${symbol}`;
  //   let url =
  //     "http://xdc-explorer-prod-srv-1145457985.us-east-2.elb.amazonaws.com:3008" +
  //     httpConstants.API_END_POINT.GET_TOKEN_INFO +
  //     `/${symbol}`;

  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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

async function getAccountList(requestData) {
  let url = process.env.REACT_APP_GET_ACCOUNT_LIST;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    getHeaders(),
    requestData,
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
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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

async function getTokenBalance(data) {
  let url =
    process.env.REACT_APP_ACCOUNT_SERVICE_BASEURL +
    httpConstants.API_END_POINT.GET_TOKEN_BALANCE;
  // let url =
  //     "http://xdc-explorer-prod-srv-1145457985.us-east-2.elb.amazonaws.com:3008/get-token-balance";
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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

async function getAddressAnalytics(data) {
  let url =
    process.env.REACT_APP_ACCOUNT_SERVICE_BASEURL +
    httpConstants.API_END_POINT.GET_ADDRESS_ANALYTICS;
  // let url =
  //   "http://localhost:3007" + httpConstants.API_END_POINT.GET_ADDRESS_ANALYTICS;
  // let url =
  //     "http://xdc-explorer-prod-srv-1145457985.us-east-2.elb.amazonaws.com:3008/get-token-balance";
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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

async function getTokenTransferCount(data) {
  // let url =
  //   process.env.REACT_APP_GET_LATEST_ACCOUNTS +
  //   httpConstants.API_END_POINT.GET_TOKEN_TRANSFER_COUNT;
  let url =
    process.env.REACT_APP_ACCOUNT_SERVICE_BASEURL +
    httpConstants.API_END_POINT.GET_TOKEN_TRANSFER_COUNT;
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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

async function getTokenOverview(data) {
  let url =
    process.env.REACT_APP_ACCOUNT_SERVICE_BASEURL +
    httpConstants.API_END_POINT.GET_TOKEN_OVERVIEW;
  // let url = "http://xdc-explorer-prod-srv-1145457985.us-east-2.elb.amazonaws.com:3008" +
  //     httpConstants.API_END_POINT.GET_TOKEN_OVERVIEW;
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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

async function getHistoryPrice(data) {
  let url =
    process.env.REACT_APP_ACCOUNT_SERVICE_BASEURL +
    httpConstants.API_END_POINT.GET_HISTORY_PRICE;
  // let url = "http://xdc-explorer-prod-srv-1145457985.us-east-2.elb.amazonaws.com:3008" + httpConstants.API_END_POINT.GET_HISTORY_PRICE;
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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
