import auth0 from 'auth0-js';
import { httpService } from "../utility/httpService";
import { cookiesConstants, httpConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";
import { history } from '../managers/history';

export default class Auth0Service {

    constructor() {
        this.signin = this.signin.bind(this);
    }

    async signin(reqObj) {
       
        console.log("autheeee",reqObj);
     //let url = process.env.REACT_APP_USER_SERVICE_URL + "login";
        let url = "http://localhost:3001/sign-in"
        return httpService(httpConstants.METHOD_TYPE.POST, {'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON}, reqObj, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                    console.log("authresponseee",response.responseData)
                    return Promise.resolve(response.responseData);

                }
            ).catch(function (err) {
                    return Promise.reject(err);
                },
            );
    }

    


    getHeaders() {
        return {
            'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON,
            //  'skip': true,
            // 'Access-Control-Allow-Origin': '*'
        }
    }
    async forgotPassword(requestData) {
        // let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.FORGOT_PASSWORD
        let url = "http://localhost:3001/forgot-password"
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                        console.log("responseeee",response.responseData)
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async  signUp(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.ADD_USER
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch( (err) =>{
                return Promise.reject(err);
            });
    };

    

    async getUser(userId) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + `${httpConstants.API_END_POINT.GET_USER}/${userId}`
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), {}, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                        console.log("getuserresponseeeeee",response.responseData)
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async getUserInfo(token) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + `${httpConstants.API_END_POINT.GET_USER_INFO}`
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), {}, url, true, token)
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

    

}
