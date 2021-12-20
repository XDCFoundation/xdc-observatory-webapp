
import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";


export default class Auth0Service {
  constructor() {
    this.signin = this.signin.bind(this);
  }

  async signin(reqObj) {
    let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "sign-in";
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

  getHeaders() {
    return {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      skip: true,
      "Access-Control-Allow-Origin": "*",
    };
  }
  async forgotPassword(email) {

    const reqObj = {

      email

    }

    let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "forgot-password"

    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, reqObj, url)

      .then(

        response => {

          if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
            return Promise.reject();
          return Promise.resolve(response.responseData);
        }
      ).catch(function (err) {
        return Promise.reject(err);
      },
      );
  }

  async signUp(requestData) {
    let url =
      process.env.REACT_APP_USER_SERVICE_URL +
      httpConstants.API_END_POINT.ADD_USER;
    return httpService(
      httpConstants.METHOD_TYPE.POST,
      this.getHeaders(),
      requestData,
      url
    )
      .then((response) => {
        if (
          !response.success ||
          response.responseCode !== 200 ||
          !response.responseData ||
          response.responseData.length === 0
        )
          return Promise.reject(response);
        return Promise.resolve(response.responseData);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
  async logout(userId) {

    let url = process.env.REACT_APP_USER_SERVICE_URL + "log-out" + `/${userId}`


    return httpService(
      httpConstants.METHOD_TYPE.GET,
      { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
      userId,
      url
    )
      .then(
        response => {
          if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)

            return Promise.reject(response);
          return Promise.resolve(response.responseData);
        }

      ).catch((err) => {
        return Promise.reject(err);
      });
  };

  async getUser(userId) {
    let url =
      process.env.REACT_APP_USER_SERVICE_URL +
      `${httpConstants.API_END_POINT.GET_USER}/${userId}`;
    return httpService(
      httpConstants.METHOD_TYPE.GET,
      this.getHeaders(),
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
          return Promise.reject(response);
        return Promise.resolve(response.responseData);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async getUserInfo(token) {
    let url =
      process.env.REACT_APP_USER_SERVICE_URL +
      `${httpConstants.API_END_POINT.GET_USER_INFO}`;
    return httpService(
      httpConstants.METHOD_TYPE.GET,
      this.getHeaders(),
      {},
      url,
      true,
      token
    )
      .then((response) => {
        if (
          !response.success ||
          response.responseCode !== 200 ||
          !response.responseData ||
          response.responseData.length === 0
        )
          return Promise.reject(response);
        return Promise.resolve(response.responseData);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
  async changePassword(reqObj) {


    let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "change-password"

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
      .catch(
        function (err) {
          return Promise.reject(err);
        }

      );
  }
  async updateUser(reqObj) {
    let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "update-user"
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
      .catch(
        function (err) {
          return Promise.reject(err);
        }

      );
  }
}
