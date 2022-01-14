import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import store from './store.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/styles/custom.css';
import './assets/styles/blocksAndTransactionList.css';
import { sessionManager } from "./managers/sessionManager";

window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;

function App() {
    useEffect(() => {
        OneSignal.push(() => {
            if (sessionManager.getDataFromCookies("userId")) {
                OneSignal.init(
                    {
                        appId: process.env.REACT_APP_ONE_SIGNAL_APP_ID
                    }
                )
                OneSignal.setExternalUserId(sessionManager.getDataFromCookies("userId"));
                const userInfo = sessionManager.getDataFromCookies("userInfo")
                OneSignal.setEmail(userInfo?.email)
            }
        })

        OneSignal.push(() => {
            if (sessionManager.getDataFromCookies("userId")) {
                OneSignal.setExternalUserId(sessionManager.getDataFromCookies("userId"));
                const userInfo = sessionManager.getDataFromCookies("userInfo")
                OneSignal.setEmail(userInfo?.email)
            }
        })



    })
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes component={Routes} />
            </Provider>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

