import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getAddressDetail, getAddressDetailWithlimit, getTransactionSearch, getTransactionsCountForAddress }
async function getAddressDetail(address) {
    let url = process.env.REACT_APP_GET_ADDRESS_DETAILS + address + '?skip=0&limit=50';
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

async function getTransactionSearch(data) {
    let url = process.env.REACT_APP_GET_TRANSACTION_SEARCH + data.addrr + '/' + data.keywords + '?skip=' + Math.ceil((data.pageNum)) + '&limit=' + data.perpage;
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
async function getAddressDetailWithlimit(data) {
    let url = process.env.REACT_APP_GET_TRANSACTIONS_FOR_ADDRESS + data.addrr + '?skip=' + Math.ceil((data.pageNum)) + '&limit=' + data.perpage;
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
async function getTransactionsCountForAddress(data) {
    let url = process.env.REACT_APP_GET_TRANSACTIONS_COUNT_FOR_ADDRESS + data.addrr;
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
