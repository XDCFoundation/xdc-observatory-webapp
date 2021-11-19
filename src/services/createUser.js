import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { postSignIn, postSignUp, postForgotPass}

async function postSignIn(data) {

    let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "login";
    return httpService("POST", { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}

async function postSignUp(data) {
    
    let url = process.env.REACT_APP_USER_SERVICE_URL_AUTHENTICATION + "sign-up";
    return httpService("POST", { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}

async function postForgotPass(data) {
    
    let url = "";
    return httpService("POST", { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, data, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}
