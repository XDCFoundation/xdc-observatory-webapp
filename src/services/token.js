import { httpService } from "../managers/httpService";
import { httpConstants } from "../images/constants";

export default { CoinMarketExchangeForToken, getTokenLists, getTotalToken, getSomeDaysHolders, getTokenSearch, getHolderDetailsUsingAddressforToken, getTransferTransactionDetailsUsingHash, getTotalTransferTransactionsForToken, getListOfHoldersForToken }

async function CoinMarketExchangeForToken(data) {
    let url = process.env.REACT_APP_GET_TOKEN_MARKETCAP + '/' + data;

    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0) {
                    return Promise.reject();
                }
                return Promise.resolve(response.responseData);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}

async function getTokenLists(data) {
    let url = process.env.REACT_APP_GET_TOKEN_LIST + '?skip=' + Math.ceil(data.pageNum) + '&limit=' + data.perpage;

    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0) {
                    return Promise.reject();
                }
                return Promise.resolve(response.responseData);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}
async function getSomeDaysHolders(path, data) {
    let url = process.env.REACT_APP_GET_SOME_DAYS_HOLDERS + path;
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}

async function getTokenSearch(data) {
    let url = process.env.REACT_APP_GET_TOKEN_SEARCH + '?skip=' + Math.ceil(data.pageNum) + '&limit=' + data.perpage + '&data=' + data.searchkey;

    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0) {
                    return Promise.reject();
                }
                return Promise.resolve(response.responseData);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}

async function getTotalToken() {
    let url = process.env.REACT_APP_GET_TOTAL_TOKEN;
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0) {
                    return Promise.reject();
                }
                return Promise.resolve(response.responseData);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}

async function getTotalTransferTransactionsForToken(data) {
    let url = process.env.REACT_APP_GET_TOTAL_TRANSFER_FOR_TOKEN + data.addr + '?skip=' + Math.ceil((data.pageNum)) + '&limit=' + data.perpage;

    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}

async function getListOfHoldersForToken(data) {
    let url = process.env.REACT_APP_GET_LIST_OF_HOLDERS_FOR_TOKEN + data.addr + '?skip=' + Math.ceil((data.pageNum)) + '&limit=' + data.perpage;;
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}
async function getTransferTransactionDetailsUsingHash(path, data) {
    let url = process.env.REACT_APP_GET_TRANSFER_TRANSACTION_DETAIL_USING_ADDRESS + path;
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}
async function getHolderDetailsUsingAddressforToken(data) {
    let url = process.env.REACT_APP_GET_HOLDER_DETAIL_USING_ADDRESS_FOR_TOKEN + data.addr + '&skip=' + Math.ceil((data.pageNum)) + '&limit=' + data.perpage;;
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}
