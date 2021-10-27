import { httpService } from "../managers/httpService";
import { httpConstants } from "../images/constants";

export default {
  getUserPrivateNote,
  postUserPrivateNote,
  getUserWatchlist,
  addPrivateTagToAddress,
  getPrivateTagToAddress,
  addWatchlist,
  putWatchlist,
  putTaggedAddress,
  editUserPrivateNote
};
async function getUserPrivateNote(data) {
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "transaction-private-note/" +
    data;
  // console.log("url ",url)
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
  //   console.log("url ", url);
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
  // console.log("url ",url)
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
  // console.log("url ", url);
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
  // console.log("url ",url)
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
    console.log("url ", data);
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
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "editWatchList";
    console.log("url ", data);
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
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "edit-address-tag";
    console.log("url ", data);
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
    "edit-transaction-Private-note";
    console.log("url ", data);
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
