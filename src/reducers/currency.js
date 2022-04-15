import {eventConstants, cookiesConstants} from "../constants"
import {sessionManager} from "../managers/sessionManager";

let currency = sessionManager.getDataFromLocalStorage(cookiesConstants.OBSERVER_CURRENCY) || "";
let initialState = {
    activeCurrency: currency ? currency.replace(/['"]+/g, '') : "USD"
};
const changeTheCurrency = (state = initialState , action) =>{
    switch (action.type) {
        case eventConstants.ACTIVE_CURRENCY:
            sessionManager.setDataInLocalStorage(cookiesConstants.OBSERVER_CURRENCY, action.data)
            return {
                ...state,
                activeCurrency: action.data
            };
        default:
          return state;
    }
    
}

export default changeTheCurrency;