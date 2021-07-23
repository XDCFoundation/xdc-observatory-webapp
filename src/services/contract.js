import { httpService } from "../managers/httpService";
import { httpConstants } from "../images/constants";

export default { getContractLists , getTotalContractList , getContractSearch}
async function getContractLists(data) { 
    let url = process.env.REACT_APP_GET_CONTRACT_LIST+'?skip='+Math.ceil((data.pageNum))+'&limit='+data.perpage;
    
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => { 
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0){
                    return Promise.reject();
                }
                return Promise.resolve(response.responseData);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}

async function getTotalContractList(){
    let url = process.env.REACT_APP_GET_TOTAL_CONTRACT_LIST;    
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => { 
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0){
                    return Promise.reject();
                }
                return Promise.resolve(response.responseData);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}
async function getContractSearch(data){

    let url = process.env.REACT_APP_GET_CONTRACT_SEARCH+'?skip='+Math.ceil(data.pageNum)+'&limit='+data.perpage+'&keywords='+data.keywords;  
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => { 
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0){
                    return Promise.reject();
                }
                return Promise.resolve(response.responseData);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}