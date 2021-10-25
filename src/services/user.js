import { httpService } from "../managers/httpService";
import { httpConstants } from "../images/constants";

export default { getUserPrivateNote, postUserPrivateNote ,getUserWatchlist,addPrivateTagToAddress};
async function getUserPrivateNote(data) {
  let url = `http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3002/transaction-private-note/${data}`;
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
    "http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3002/add-transaction-label";
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
  let url = `http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3002/getAddress/${data}`;
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
    "http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3002/add-address-tag/";
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
