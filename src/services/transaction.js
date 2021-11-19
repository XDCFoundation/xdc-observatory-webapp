import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default {
    getTotalTransaction, getLatestTransaction, getSomeDaysTransaction, getTransactionDetailsUsingHash, getUserTransactionPrivateNoteUsingHash, getUserAddressTagUsingAddressHash,
    deleteTransactionPrivateNote
}
async function getTotalTransaction() {
    let url = process.env.REACT_APP_GET_TOTAL_TRANSACTION;
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
async function getLatestTransaction(path, data) {
    let url = process.env.REACT_APP_GET_LATEST_TRANSACTIONS + path;
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

async function getSomeDaysTransaction() {
    let url = process.env.REACT_APP_GET_SOME_DAYS_TRANSACTIONS;
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

async function getTransactionDetailsUsingHash(path, data) {
    let url = process.env.REACT_APP_GET_TRANSACTION_DETAILS + path;
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

async function getUserTransactionPrivateNoteUsingHash(data) {
    let url = process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "get-user-transaction-private-note-using-hash";
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
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

async function getUserAddressTagUsingAddressHash(data) {
    let url = process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "get-user-address-tag-using-address-hash";
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
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

async function deleteTransactionPrivateNote(data) {
    let url = process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "delete-transaction-Private-note";
    return httpService(httpConstants.METHOD_TYPE.PUT, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
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