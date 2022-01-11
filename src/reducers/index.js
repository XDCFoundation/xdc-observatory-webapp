import { combineReducers } from "redux";
import user from "./user";
import activeCurrency from "./currency"
import timezone from "./timezone";

export default combineReducers({
    user,
    activeCurrency,
    timezone
});