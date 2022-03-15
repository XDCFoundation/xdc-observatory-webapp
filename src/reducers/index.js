import { combineReducers } from "redux";
import user from "./user";
import activeCurrency from "./currency"
import timezone from "./timezone";
import recentSearchList from "./recentSearch";
import theme from "./theme"

export default combineReducers({
    user,
    activeCurrency,
    timezone,
    recentSearchList,
    theme
});