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
  privacyConsent,
};

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}
async function getUserPrivateNote(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "transaction-private-note/" +
    data;
  return httpService("GET", getHeaders(), {}, url)
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
  return httpService("POST", getHeaders(), data, url)
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
  return httpService("GET", getHeaders(), {}, url)
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
  return httpService("POST", getHeaders(), data, url)
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
  return httpService("GET", getHeaders(), {}, url)
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
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "add-watchlist";
  return httpService("POST", getHeaders(), data, url)
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
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "edit-watchlist";
  return httpService("PUT", getHeaders(), data, url)
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
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "edit-address-tag";
  return httpService("PUT", getHeaders(), data, url)
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
    "edit-transaction-Private-note";
  return httpService("PUT", getHeaders(), data, url)
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
  return httpService("POST", getHeaders(), data, url)
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
    "get-content-txn-label";

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
    "get-content-tag-address";

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

async function privacyConsent(data) {
  let url =
    process.env.REACT_APP_PRIVACY_CONSENT;
    
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
