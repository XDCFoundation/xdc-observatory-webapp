import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getTpsCounter, getMaxTpsCounter };
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}
async function getTpsCounter() {
  let url = process.env.REACT_APP_GET_TPS_COUNTER;
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

async function getMaxTpsCounter() {
  let url = process.env.REACT_APP_GET_MAXTPS_COUNTER;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
    .then((response) => {
      return Promise.resolve(response.responseData.maxtps);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
