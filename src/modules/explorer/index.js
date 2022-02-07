import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchainData";
import FooterComponent from "../common";
import LatestBlocksComponent from './latestBlocksAndTransactions';
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";
import RecentSearchList from "./recentSearchList/recentSearchList";
import BuyStoreTradeXDC from "./buyStoreTradeXDC/buyStoreTradeXDC";
import StorageMessage from "./dashboardPopup/storageMessage";
import GlobalIdService from "../../services/globalId";
import { sessionManager } from "../../managers/sessionManager";
import utility, { dispatchAction } from "../../utility";
import { cookiesConstants, eventConstants } from "../../constants";
import { connect } from "react-redux";
import Loader from "../../common/components/loader";
import {history} from "../../managers/history";
class BlockChainClass extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            amount: "",
            isLoading: false
            // showDropDown: true

        }
    }
    componentDidMount = async () => {

        let url = new URL(window.location.href)
        let params = new URLSearchParams(url.search);
        if (params.get('code') && (!sessionManager.getDataFromCookies(cookiesConstants.IS_LOGGEDIN) || sessionManager.getDataFromCookies(cookiesConstants.IS_LOGGEDIN) === false)) {
            this.setState({ isLoading: true })
            let code = params.get('code')
            const [error, response] = await utility.parseResponse(GlobalIdService.getGlobalIdTokens(code));
            if (error){
                this.setState({ isLoading: false })
                utility.apiFailureToast(error?.message ? error.message : "Cannot get tokens")
                history.push("/")
                return;
            }
            sessionManager.setDataInCookies(response.access_token, cookiesConstants.ACCESS_TOKEN);
            sessionManager.setDataInCookies(response.id_token, cookiesConstants.ID_TOKEN,);
            sessionManager.setDataInLocalStorage(cookiesConstants.ID_TOKEN, response.id_token)
            let requestData = {
                accessToken: response.access_token,
                idToken: response.id_token
            }
            let [userInfoError, userInforesponse] = await utility.parseResponse(GlobalIdService.getGlobalIdUserInfo(requestData));
            console.log(userInforesponse,"<<<")
            if (userInfoError){
                this.setState({ isLoading: false })
                utility.apiFailureToast(userInfoError?.message ? userInfoError.message : "Cannot login")
                history.push("/")
                return;
            }
           
            userInforesponse = {...userInforesponse , sub:userInforesponse.userId}   
            sessionManager.setDataInCookies(userInforesponse, cookiesConstants.USER_INFO);
            sessionManager.setDataInCookies(true,cookiesConstants.IS_LOGGEDIN);
            sessionManager.setDataInCookies("GLOBALID", cookiesConstants.AUTHENTICATION_PROVIDER);
            sessionManager.setDataInCookies(
                userInforesponse.profilePic,
                cookiesConstants.USER_PICTURE
            );
            sessionManager.setDataInCookies(
                userInforesponse.userId,
                "userId"
            );
            sessionManager.removeDataFromCookies("activateAccountEmail");
            window.location.href ="loginprofile";
            this.setState({ isLoading: false })
          

        }

    }

    _handleChange = (event) => {
        this.setState({ amount: event.target.value })
        window.localStorage.setItem('currency', event.target.value)

    }

    render() {
        let activeCurrency = window.localStorage.getItem('currency')
        return (
            <>
                {this.state.isLoading ? <Loader /> : ""}
                <div>
                    <NavigationBar />
                    <BlockChainDataComponent
                        currency={activeCurrency} socket={this.props.socket} nodeSocket={this.props.socketNode} />
                    <MarketTable currency={activeCurrency} />
                    <LatestBlocksComponent socket={this.props.socket} />
                    <RecentSearchList />
                    <BuyStoreTradeXDC />
                    <StorageMessage />
                    <FooterComponent _handleChange={this._handleChange}
                        currency={this.state.amount} />
                    {/* showDropDown={this.state.showDropDown} */}
                </div>
            </>
        )

    }
}

const mapStateToProps = (state) => {
    return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(BlockChainClass);