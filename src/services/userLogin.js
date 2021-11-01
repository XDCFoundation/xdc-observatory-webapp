import auth0 from "auth0-js";
import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";
import { history } from "../managers/history";

export default class Auth0Service {
  constructor() {
    this.signin = this.signin.bind(this);
  }

  async signin(reqObj) {
    console.log("autheeee", reqObj);
    //let url = process.env.REACT_APP_USER_SERVICE_URL + "login";
    let url =
      "http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3003/sign-in";
    return httpService(
      httpConstants.METHOD_TYPE.POST,
      { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
      reqObj,
      url
    )
      .then((response) => {
        if (
          !response.message ||
          response.success !== 200 ||
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
    
    console.log("autheeee",reqObj);
    
    let url = "http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3003/forgot-password"
    
    return httpService(httpConstants.METHOD_TYPE.POST, {'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON}, reqObj, url)
    
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
  async  logout(reqObj) {
    let url = "http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3003/log-out"
    console.log(reqObj,url,"autheee")
    return httpService(
      httpConstants.METHOD_TYPE.GET,
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
          console.log("responseeee", response.responseData);
        return Promise.resolve(response.responseData);
      })
      .catch(
        function (err) {
          return Promise.reject(err);
        }
        // console.log("respposne",response);
      );
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
        console.log("getuserresponseeeeee", response.responseData);
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
    // let url = process.env.REACT_APP_AUTH_SERVICE_BASE_URL + "change-password";
    let url =
      "http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3003/change-password";
    console.log("autheeee", reqObj);
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
        console.log("responseeee", response.responseData);
        return Promise.resolve(response.responseData);
      })
      .catch(
        function (err) {
          return Promise.reject(err);
        }
        // console.log("respposne",response);
      );
  }
}
