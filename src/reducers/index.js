import { combineReducers } from "redux";
import user from "./user";
import activeCurrency from "./currency"
import recentSearchList from "./recentSearch";

export default combineReducers({
    user,
    activeCurrency,
    recentSearchList
});