import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default {
  CoinMarketExchangeForToken,
  getTokenLists,
  getTotalToken,
  getSomeDaysHolders,
  getTokenSearch,
  getHolderDetailsUsingAddressforToken,
  getTransferTransactionDetailsUsingHash,
  getTotalTransferTransactionsForToken,
  getListOfTransferTransactionsForToken,
  getListOfHoldersForToken,
};
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}

async function CoinMarketExchangeForToken(data) {
  let url = process.env.REACT_APP_GET_TOKEN_MARKETCAP + "/" + data;

  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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

async function getTokenLists(data) {
  let url = process.env.REACT_APP_ACCOUNT_SERVICE_BASEURL + httpConstants.API_END_POINT.GET_TOKEN_LIST;//"?skip=" + Math.ceil(data.pageNum) + "&limit=" + data.perpage;
  // let url = "http://localhost:3007/getListOfTokens";
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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
async function getSomeDaysHolders(path, data) {
  let url = process.env.REACT_APP_GET_SOME_DAYS_HOLDERS + path;
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

async function getTokenSearch(data) {
  let url =
    process.env.REACT_APP_GET_TOKEN_SEARCH +
    "?skip=" +
    Math.ceil(data.pageNum) +
    "&limit=" +
    data.perpage +
    "&data=" +
    data.searchkey;

  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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

async function getTotalToken() {
  let url = process.env.REACT_APP_GET_TOTAL_TOKEN;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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

async function getListOfTransferTransactionsForToken(data) {
  // let url = "http://localhost:3005/getListOfTransferTransactionsForToken/"+data.addr;
  let url = process.env.REACT_APP_GET_LIST_OF_TRANSFER_FOR_TOKEN + data.addr;
  delete data.addr;
    //+ "?skip=" + Math.ceil(data.pageNum) + "&limit=" + data.perpage + (data.searchValue ? "&searchValue=" + data.searchValue : "") + (data.startDate ? "&startDate=" + data.startDate : "");

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
async function getTotalTransferTransactionsForToken(data) {
    let url = process.env.REACT_APP_GET_TOTAL_TRANSFER_FOR_TOKEN + data.addr + (data.searchValue ? "?searchValue=" + data.searchValue : "")
        + (data.startDate ? (data.searchValue ? "&startDate=" : "?startDate=") + data.startDate : "");

  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function getListOfHoldersForToken(data) {
   let url = process.env.REACT_APP_GET_LIST_OF_HOLDERS_FOR_TOKEN + data.address;
    // let url = "http://localhost:3007/getListOfHoldersForToken/"+data.address;
    delete data.address;
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
async function getTransferTransactionDetailsUsingHash(path, data) {
  let url =
    process.env.REACT_APP_GET_TRANSFER_TRANSACTION_DETAIL_USING_ADDRESS + path;
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
async function getHolderDetailsUsingAddressforToken(data) {
  let url = process.env.REACT_APP_GET_HOLDER_DETAIL_USING_ADDRESS_FOR_TOKEN
  // let url = "http://localhost:3007/getHolderDetailsUsingAddress"
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
