import { combineReducers } from "redux";
import user from "./user";
import activeCurrency from "./currency"
import timezone from "./timezone";
import recentSearchList from "./recentSearch";

export default combineReducers({
    user,
    activeCurrency,
    timezone,
    recentSearchList
});