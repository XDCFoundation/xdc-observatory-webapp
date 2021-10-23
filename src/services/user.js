import auth0 from "auth0-js";
import { httpService } from "../utility/httpService";
import { cookiesConstants, httpConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";
import { history } from "../managers/history";

export default class Auth0Service {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      scope: "openid profile email",
      responseType: "code token id_token",
      grantType: "password",
      redirectUri: window.location.origin,
    });
  }
  async signup(requestData) {
    let url =
      process.env.REACT_APP_USER_SERVICE_URL +
      httpConstants.API_END_POINT.SIGN_UP;

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
  signin(email, password) {
    let _this = this;

    return new Promise((resolve, reject) => {
      this.auth0.client.login(
        { realm: process.env.REACT_APP_AUTH0_REALM, username: email, password },

        async (err, authResult) => {
          if (err) {
            return reject(err);
          }

          console.log(authResult, "");

          sessionManager.setDataInCookies(
            authResult.accessToken,
            cookiesConstants.AUTH0_ACCESS_TOKEN
          );

          sessionManager.setDataInCookies(
            authResult.idToken,
            cookiesConstants.AUTH0_ID_TOKEN
          );

          let userDetail = await _this.getUserInfo(authResult.idToken);

          resolve(userDetail);
          // _this.auth0.client.userInfo(
          // authResult.accessToken,
          // async (err, user) => {
          // if (err) {
          // return reject(err);
          // }
          // return resolve({
          // ...authResult,
          // userDetails: user,
          // userMetaData: user,
          // });
          // }
          // );
        }
      );
    });
  }
}
