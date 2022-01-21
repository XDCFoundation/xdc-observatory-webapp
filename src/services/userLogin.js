import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";

export default class Auth0Service {
  getHeaders() {
    return {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "X-API-key": process.env.REACT_APP_X_API_KEY,
    };
  }
  constructor() {
    this.signin = this.signin.bind(this);
  }

  async signin(reqObj) {
    let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "sign-in";
    return httpService(
      httpConstants.METHOD_TYPE.POST,
      this.getHeaders(),
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



    async getUserCookies(reqObj) {
        let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "get-user-cookies";
        // let url = "http://localhost:3001/" + "get-user-cookies";
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), reqObj, url)
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

    async updateUserCookies(reqObj) {
        // let url = "http://localhost:3001/" + "update-user-cookies";
        let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "update-user-cookies";
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), reqObj, url)
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

  async forgotPassword(email) {
    const reqObj = {
      email,
    };

    let url =
      process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "forgot-password";

    return httpService(
      httpConstants.METHOD_TYPE.POST,
      this.getHeaders(),
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
    let url = `${process.env.REACT_APP_USER_SERVICE_URL}log-out/${userId}`;

    return httpService(
      httpConstants.METHOD_TYPE.GET,
      this.getHeaders(),
      userId,
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
    let url =
      process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "change-password";

    return httpService(
      httpConstants.METHOD_TYPE.POST,
      this.getHeaders(),
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
  async updateUser(reqObj) {
    let url =
      process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "update-user";
    return httpService(
      httpConstants.METHOD_TYPE.POST,
      this.getHeaders(),
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
}
