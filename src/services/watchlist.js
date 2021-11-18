import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { postWatchlist , deleteWatchlist }
async function postWatchlist(reqObj) {
  const url = process.env.REACT_APP_POST_WATCHLIST + "";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    reqObj,
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

async function deleteWatchlist(reqObj) {
  const url = process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "delete-watchlist";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    reqObj,
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
