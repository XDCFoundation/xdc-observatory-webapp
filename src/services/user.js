import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default {
  getUserPrivateNote,
  postUserPrivateNote,
  getUserWatchlist,
  addPrivateTagToAddress,
  getPrivateTagToAddress,
  addWatchlist,
  putWatchlist,
  putTaggedAddress,
  editUserPrivateNote,
  getWatchlistList,
  getTxnLabelList,
  getTagAddresstList,
  Search,
};

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    skip: true,
    "Access-Control-Allow-Origin": "*",
    // 'Authorization': `Bearer ${utility.getAccessToken()}`
  };
}

async function getUserPrivateNote(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "transaction-private-note/" +
    data;
  return httpService(
    "GET",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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

async function postUserPrivateNote(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "add-transaction-label";
  return httpService(
    "POST",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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

async function getUserWatchlist(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "getAddress/" + data;
  return httpService(
    "GET",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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

async function addPrivateTagToAddress(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "add-address-tag";
  return httpService(
    "POST",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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

async function getPrivateTagToAddress(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "get-address-tag/" +
    data;
  return httpService(
    "GET",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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

async function addWatchlist(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "addWatchList";
  console.log("url", data);
  return httpService(
    "POST",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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

async function putWatchlist(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "/edit-watchlist";
  return httpService(
    "PUT",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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

async function putTaggedAddress(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "/edit-address-tag";
  return httpService(
    "PUT",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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

async function editUserPrivateNote(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "/edit-transaction-Private-note";
  return httpService(
    "PUT",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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
async function Search(data) {
  let url = process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "search";
  console.log("url ", data);
  return httpService(
    "POST",
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    data,
    url
  )
    .then((response) => {
      console.log("data 1", response);
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

async function getWatchlistList(requestData) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "get-content-watchlist";

  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getTxnLabelList(requestData) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "/get-content-txn-label";

  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getTagAddresstList(requestData) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "/get-content-tag-address";

  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
