import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default {
  getAddressDetail,
  getAddressDetailWithlimit,
  getFilteredAddressDetailWithLimit,
  getFiltersForAccountTransaction,
  getTransactionSearch,
  getTransactionsCountForAddress,
  getAddressStats,
};
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}
async function getAddressDetail(address) {
  let url = process.env.REACT_APP_GET_ADDRESS_DETAILS + address;
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

async function getTransactionSearch(data) {
  let url =
    process.env.REACT_APP_GET_TRANSACTION_SEARCH +
    data.addrr +
    "/" +
    data.keywords +
    "?skip=" +
    Math.ceil(data.pageNum) +
    "&limit=" +
    data.perpage;
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
async function getAddressDetailWithlimit(data) {
  let url =
    process.env.REACT_APP_GET_TRANSACTIONS_FOR_ADDRESS +
    data.addrr +
    "?skip=" +
    Math.ceil(data.pageNum) +
    "&limit=" +
    data.perpage + "&sortKey=" + data?.sortKey + "&sortType=" + data?.sortType;
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

async function getFilteredAddressDetailWithLimit(requestData) {
    let url = process.env.REACT_APP_GET_FILTERED_TRANSACTIONS_FOR_ADDRESS + requestData.address
    return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), requestData, url)
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
async function getFiltersForAccountTransaction(requestData) {
    let url = process.env.REACT_APP_GET_FILTERS_FOR_ADDRESS_TXN + requestData.address
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
async function getTransactionsCountForAddress(data) {
  let url =
    process.env.REACT_APP_GET_TRANSACTIONS_COUNT_FOR_ADDRESS + data.address
      + (data.searchValue ? "?searchValue=" + data.searchValue : "")
      + (data.txnType ? (data.searchValue ? "&txnType=" : "?txnType=") + data.txnType : "")
      + (data.status ? (data.searchValue || data.txnType ? "&status=" : "?status=") + data.status : "")
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
async function getAddressStats(address) {
  let url = process.env.REACT_APP_GET_ADDRESS_STATS + address;
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