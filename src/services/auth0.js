import auth0 from "auth0-js";
import { cookiesConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager"
export default class Auth0Service {
  constructor(){
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      scope: process.env.REACT_APP_AUTH0_SCOPE,
      responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
      grantType:  process.env.REACT_APP_AUTH0_GRANT_TYPE
    });
    // this.signin = this.signin.bind(this);
  }
  signin(username, password) {
    let _this = this;
    return new Promise((resolve, reject) => {
      this.auth0.client.login(
        { realm: process.env.REACT_APP_AUTH0_REALM,username:username, password:password},
        async (err, authResult) =>{
          if(err) {
            return reject(err);
          }
          sessionManager.setDataInCookies(authResult.accessToken,cookiesConstants.ACCESS_TOKEN )
          sessionManager.setDataInCookies(authResult.idToken, cookiesConstants.AUTH0_ID_TOKEN)
          _this.auth0.client.userInfo(
            authResult.accessToken,
            async (err, user) => {
              if (err) {
                return reject(err);
              }
              return resolve({
                ...authResult,
                userInfoRes: user,
                userMetaData: user,
              });
            }
          );
        }
      )
    })
  }

  signUp(requestData) {
    return new Promise((resolve, reject) => {
      this.auth0.signup(
        {
          connection: process.env.REACT_APP_AUTH0_REALM,
          email: requestData.email,
          password: requestData.password,
          given_name: requestData.name,
          name: requestData.name,
          nickname: requestData.name,
          username: requestData.name
        },
        async (err, authResult) =>{
          if(err) {
            return reject(err);
          }
          return resolve(authResult)
        }
      )
    })
  }


}