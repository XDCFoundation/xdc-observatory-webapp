import {eventConstants, cookiesConstants} from "../constants"
import {sessionManager} from "../managers/sessionManager";

let theme = sessionManager.getDataFromLocalStorage(cookiesConstants.OBSERVER_THEME) || "";

let initialState = {
    currentTheme: theme.replace(/['"]+/g, '')
};

export default function Theme(state = initialState, action) {
    switch (action.type) {
     case eventConstants.TOGGLE_THEME:
      sessionManager.setDataInLocalStorage(cookiesConstants.OBSERVER_THEME, action.data)
      return {
        ...state,
        currentTheme: action.data
      };
    default:
        return state;
    }
}