import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { searchData };
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "X-API-key": process.env.REACT_APP_X_API_KEY,
  };
}
async function searchData(data) {
  let url = process.env.REACT_APP_POST_SEARCH_DATA;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    getHeaders(),
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
