import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { tagAddress , deleteTagAddress}
async function tagAddress(reqObj) {
  const url = process.env.REACT_APP_PUT_TAG_ADDRESS + "";
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

async function deleteTagAddress(data) {
  let url = process.env.REACT_APP_WATCHLIST_TRANSACTION_SERVICE + "delete-address-tag" ;
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
