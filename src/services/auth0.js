import auth0 from "auth0-js";
import { sessionManager } from "../managers/sessionManager"

export default class Auth0Service {
  constructor(){
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      scope: 'openid profile email',
      responseType: 'code token id_token',
      grantType: 'password',
      redirectUri: window.location.origin
    });
  }

  signin(email, password) {
    let _this = this;
    return new Promise((resolve, reject) => {
      this.auth0.client.login(
        { realm: process.env.REACT_APP_AUTH0_REALM , username: email, password},
        async (err, authResult) =>{
          if(err) {
            return reject(err);
          }
          sessionManager.setDataInCookies(authResult.accessToken)
          sessionManager.setDataInCookies(authResult.idToken)
          let userDetail = await _this.getUserInfo(authResult.idToken)
          resolve(userDetail)
        }
      )
    })
  }

}