import {eventConstants} from "../constants"
let initialState = {
    isLoggedIn: false,
    loginFailure: null,
    deviceId: null,
    sessionToken: null,
    loading: false,
    isForgotPasswordSuccess: false
};
export default function user(state = initialState, action) {
    switch (action.type) {
     case eventConstants.SHOW_LOADER:
      return {
        ...state,
        loading: true,
        loaderMargin:  action.data ? action.data.loaderMargin : state.loaderMargin
      };
    case eventConstants.HIDE_LOADER:
      return {
        ...state,
        loading: false,
        
      };
        default:
            return state;
    }
}