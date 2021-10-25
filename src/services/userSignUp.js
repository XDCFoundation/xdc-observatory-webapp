import { httpService } from "../managers/httpService";
import { httpConstants } from "../images/constants";

export default { postSignUp}

async function postSignUp(data) {
    

    
    let url = "http://xinfin-explorer-elb-944849870.us-east-1.elb.amazonaws.com:3003/sign-up";
    console.log("url ",url)
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
