import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getContractVerify }
async function getContractVerify(reqObj) {
    let url = process.env.REACT_APP_CONTRACT_VERIFY;
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, reqObj, url)
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

