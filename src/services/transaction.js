import { httpService } from "../managers/httpService";
import { cookiesConstants, httpConstants } from "../constants";
const isLocalStorage = true;
export default {
  getTotalTransaction,
  getLatestTransaction,
  getSomeDaysTransaction,
  getTransactionDetailsUsingHash,
  getUserTransactionPrivateNoteUsingHash,
  getUserAddressTagUsingAddressHash,
  deleteTransactionPrivateNote,
  getCoinMarketDetailForTransaction,
};
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}
async function getTotalTransaction() {
  let url = process.env.REACT_APP_GET_TOTAL_TRANSACTION;
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
async function getLatestTransaction(path, data) {
  let url = process.env.REACT_APP_GET_LATEST_TRANSACTIONS + path;
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

async function getSomeDaysTransaction() {
  let url = process.env.REACT_APP_GET_SOME_DAYS_TRANSACTIONS;
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

async function getTransactionDetailsUsingHash(path, data) {
  let url = process.env.REACT_APP_GET_TRANSACTION_DETAILS + path;
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

async function getUserTransactionPrivateNoteUsingHash(data) {
  if (isLocalStorage) {
    let addressTags = localStorage.getItem(
      cookiesConstants.USER_TRASACTION_LABELS
    );
    if (addressTags) {
      addressTags = JSON.parse(addressTags);
      return addressTags.filter((item) => {
        if (
          item.userId == data.userId &&
          item.transactionHash == data.transactionHash
        ) {
          return item;
        }
      });
    }
    return [];
  }
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "get-user-transaction-private-note-using-hash";
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

async function getUserAddressTagUsingAddressHash(data) {
  if (isLocalStorage) {
    let addressTags = localStorage.getItem(
      cookiesConstants.USER_TAGGED_ADDRESS
    );
    if (addressTags) {
      addressTags = JSON.parse(addressTags);
      return addressTags.filter((item) => {
        if (item.userId == data.userId && item.address == data.address) {
          return item;
        }
      });
    }
    return [];
  }
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "get-user-address-tag-using-address-hash";
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

async function deleteTransactionPrivateNote(data, row) {
  if (isLocalStorage && row && row.transactionHash && row.userId) {
    let addressTags = localStorage.getItem(
      cookiesConstants.USER_TRASACTION_LABELS
    );

    if (addressTags) {
      addressTags = JSON.parse(addressTags);
      let indexRes = addressTags.findIndex((item) => {
        if (
          item.userId == row.userId &&
          item.transactionHash == row.transactionHash
        ) {
          return item;
        }
      });
      if (indexRes !== -1) {
        addressTags.splice(indexRes, 1);

        localStorage.setItem(
          cookiesConstants.USER_TRASACTION_LABELS,
          JSON.stringify(addressTags)
        );
      }
    }
  }
  let url =
    process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE +
    "delete-transaction-Private-note";
  return httpService(httpConstants.METHOD_TYPE.PUT, getHeaders(), data, url)
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
async function getCoinMarketDetailForTransaction(path, data) {
  let url = process.env.REACT_APP_GET_COIN_MARKET_DETAIL_FOR_TRANSACTION + path;
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
