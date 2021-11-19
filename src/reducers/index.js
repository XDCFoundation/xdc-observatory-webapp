import { combineReducers } from "redux";
import user from "./user";
import activeCurrency from "./currency"

export default combineReducers({
    user,
    activeCurrency
});