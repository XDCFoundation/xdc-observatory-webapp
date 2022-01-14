import {eventConstants} from "../constants";
import {sessionManager} from "../managers/sessionManager";

let searchList = sessionManager.getDataFromLocalStorage('recentSearch') || [];

let initialState = typeof searchList === 'string' ? JSON.parse(searchList) : searchList
const recentSearchList = (state = initialState, action) => {
    switch (action.type) {
        case eventConstants.ADD_TO_SEARCH_LIST:
            let list = state && state.length > 0 && [action.payload, ...state] || [action.payload]
            state = list.filter((obj, index, array) => index === array.findIndex((element) => JSON.stringify(element) === JSON.stringify(obj)));
            sessionManager.setDataInLocalStorage('recentSearch', state)
            return state;
        case eventConstants.CLEAR_SEARCH_LIST:
            state = []
            sessionManager.setDataInLocalStorage('recentSearch', null)
            return state;
        default:
            return state;
    }

}

export default recentSearchList;