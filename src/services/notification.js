import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default{
   proposalList , 
   getNotificationList,
   markNotificationCleared
  }

 async function proposalList(reqObj) {
  const url = process.env.REACT_APP_GET_NOTIFICATION + "get notification";
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

 async function getNotificationList(reqObj) {
  const url = process.env.REACT_APP_NOTIFICATION_SERVICE + "notification-list";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    reqObj,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        !response.responseData ||
        response.responseData.length === 0
      )
      {
        
      return Promise.reject();
      }

      
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function markNotificationCleared(reqObj) {
  const url = process.env.REACT_APP_NOTIFICATION_SERVICE + "mark-bulk-notification-clear";

  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    reqObj,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        !response.responseData ||
        response.responseData.length === 0
      )
      {
      
      return Promise.reject();
      }

    
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}