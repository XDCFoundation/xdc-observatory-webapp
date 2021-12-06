import { httpConstants, cookiesConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";

export const httpService = (method, headers, data, url, contentHeader = true, token) => {

    let header = new Headers();
    // const query = window.location.search;
    // const urlParams = new URLSearchParams(query);
    token = token ? token : sessionManager.getDataFromCookies(cookiesConstants.AUTH0_ID_TOKEN);
    if (contentHeader) {
        header.append("Content-Type", httpConstants.CONTENT_TYPE.APPLICATION_JSON);
    }
    header.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: method,
        headers: header
    };

    if (method !== httpConstants.METHOD_TYPE.GET)
        requestOptions.body = JSON.stringify(data);

    return fetch(url, requestOptions)
        .then(function handleResponse(response) {

            //in case API is down-
            if (!response || !response.ok)
                return Promise.reject("Unable to fetch data");

            return response.text().then(responseText => {

                if (!responseText)
                    return Promise.reject(responseText);

                let data;
                try {
                    data = typeof responseText === 'object' ? responseText : JSON.parse(responseText);
                    if (data && !data.success)
                        return Promise.reject((data && data.responseCode) === 404 ? data : (data && { message: data.message, responseCode: data.responseCode }) || response.statusText);

                } catch (err) {
                    return Promise.reject(err)
                }
                return data;
            });
        }).catch(function (err) {
            return Promise.reject(err);
        })

};