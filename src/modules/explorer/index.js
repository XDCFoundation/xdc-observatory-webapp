import BaseComponent from "../baseComponent";
import React from "react";
import BlockChainDataComponent from "./blockchainData";
import FooterComponent from "../common";
import LatestBlocksComponent from "./latestBlocksAndTransactions";
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
import { history } from "../../managers/history";
class BlockChainClass extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      isLoading: false,
      // showDropDown: true
    };
  }
  componentDidMount = async () => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    if (
      params.get("code") &&
      (!sessionManager.getDataFromCookies(cookiesConstants.IS_LOGGEDIN) ||
        sessionManager.getDataFromCookies(cookiesConstants.IS_LOGGEDIN) ===
          false)
    ) {
      this.setState({ isLoading: true });
      let code = params.get("code");
      const [error, response] = await utility.parseResponse(
        GlobalIdService.getGlobalIdTokens(code)
      );
      if (error) {
        this.setState({ isLoading: false });
        utility.apiFailureToast(
          error?.message ? error.message : "Cannot get tokens"
        );
        history.push("/");
        return;
      }
      sessionManager.setDataInCookies(
        response.access_token,
        cookiesConstants.ACCESS_TOKEN
      );
      sessionManager.setDataInCookies(
        response.id_token,
        cookiesConstants.ID_TOKEN
      );
      sessionManager.setDataInLocalStorage(
        cookiesConstants.ID_TOKEN,
        response.id_token
      );
      let requestData = {
        accessToken: response.access_token,
        idToken: response.id_token,
      };
      let [userInfoError, userInforesponse] = await utility.parseResponse(
        GlobalIdService.getGlobalIdUserInfo(requestData)
      );
      if (userInfoError) {
        this.setState({ isLoading: false });
        utility.apiFailureToast(
          userInfoError?.message ? userInfoError.message : "Cannot login"
        );
        history.push("/");
        return;
      }

      userInforesponse = { ...userInforesponse, sub: userInforesponse.userId };
      sessionManager.setDataInCookies(
        userInforesponse,
        cookiesConstants.USER_INFO
      );
      sessionManager.setDataInCookies(true, cookiesConstants.IS_LOGGEDIN);
      sessionManager.setDataInCookies(
        "GLOBALID",
        cookiesConstants.AUTHENTICATION_PROVIDER
      );
      sessionManager.setDataInCookies(
        userInforesponse.profilePic,
        cookiesConstants.USER_PICTURE
      );
      sessionManager.setDataInCookies(userInforesponse.userId, "userId");
      sessionManager.removeDataFromCookies("activateAccountEmail");
      window.location.href = "loginprofile";
      this.setState({ isLoading: false });
    }
  };

  render() {
    let activeCurrency = this.props.currency.activeCurrency;
    return (
      <>
        {this.state.isLoading ? <Loader /> : ""}
        <div className={this.props.theme.currentTheme === "dark" ? "dark-theme-bg" : ""}>
          <NavigationBar theme={this.props.theme.currentTheme}/>
          <BlockChainDataComponent
            currency={activeCurrency}
            socket={this.props.socket}
            nodeSocket={this.props.socketNode}
            theme={this.props.theme.currentTheme}
          />
          {process.env.REACT_APP_ENV !== "apothem" && <MarketTable theme={this.props.theme.currentTheme} currency={activeCurrency} />}
          <LatestBlocksComponent socket={this.props.socket} theme={this.props.theme.currentTheme}/>
          <RecentSearchList theme={this.props.theme.currentTheme}/>
          <BuyStoreTradeXDC theme={this.props.theme.currentTheme}/>
          <StorageMessage theme={this.props.theme.currentTheme}/>
          <FooterComponent
            theme={this.props.theme.currentTheme}
          />
          {/* showDropDown={this.state.showDropDown} */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, theme: state.theme, currency: state.activeCurrency };
};
export default connect(mapStateToProps, { dispatchAction })(BlockChainClass);
