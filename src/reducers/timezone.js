import moment from "moment-timezone";

let initialState = moment.tz.guess()
const timezone = (state = initialState , action) =>{
    // let CurrencyValue = window.localStorage.getItem('timezone');
    // if(!CurrencyValue){
    //     window.localStorage.setItem('timezone', state)
    // }
    switch (action.type) {
        case "TIME_ZONE":
            state = action.payload
            // window.localStorage.setItem('timezone', state)
            return state;
        default:
            return state;
    }

}

export default timezone;