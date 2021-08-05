
let initialState = 'USD'
const changeTheCurrency = (state = initialState , action) =>{
    let CurrencyValue = window.localStorage.getItem('currency');
    if(!CurrencyValue){
        window.localStorage.setItem('currency', state) 
    }
    switch (action.type) {
        case "USD":   
        state = action.payload
        window.localStorage.setItem('currency', state)   
        return state;
        case "EUR":
        state = action.payload
        window.localStorage.setItem('currency', state)   
        return state;
        case "INR":
        state = action.payload 
        window.localStorage.setItem('currency', state) 
        return state;      
        default:
          return state;
    }
    
}

export default changeTheCurrency;