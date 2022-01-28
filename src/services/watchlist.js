import {httpService} from "../managers/httpService";
import {cookiesConstants, httpConstants} from "../constants";

const isLocalStorage = true;

export default {postWatchlist, deleteWatchlist};

function getHeaders() {
    return {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        "X-API-key": process.env.REACT_APP_X_API_KEY,
    };
}

async function postWatchlist(reqObj) {
    const url = process.env.REACT_APP_POST_WATCHLIST + "";
    return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), reqObj, url)
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

async function deleteWatchlist(reqObj, req) {
    if (!isLocalStorage || !req || !req.userId || !req.address) {
        return []
    }
    let addressTags = localStorage.getItem(
        req.userId + cookiesConstants.USER_ADDRESS_WATCHLIST
    );
    if (addressTags) {
        addressTags = JSON.parse(addressTags);
        if (addressTags[req.address]) {
            delete addressTags[req.address];
            localStorage.setItem(
                req.userId + cookiesConstants.USER_ADDRESS_WATCHLIST,
                JSON.stringify(addressTags)
            );
        }
    }

    const url =
        process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "delete-watchlist";
    return httpService(httpConstants.METHOD_TYPE.PUT, getHeaders(), reqObj, url)
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
