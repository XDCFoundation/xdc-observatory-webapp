import React, { lazy, Suspense } from "react";
import { Router, Route, withRouter } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { connect } from "react-redux";
import { history } from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import socketClient from "socket.io-client";
import GlobalIdContinue from "./modules/explorer/globalIdContinue";
// import TokenDataComponent from "./modules/token/tokenDataDashboard";
// import LatestTransactionList from "./modules/transaction/index";
// import LatestBlocksList from "./modules/blocks";
// import BlockChainClass from "./modules/explorer";
// import TokenList from "./modules/tokenList";
// import LatestAccountsList from "./modules/accounts";
// import AddressDetails from "./modules/address/addressDetails";
// import HolderDetails from "./modules/holders/holderDetails";
// import PolicyDetails from "./modules/explorer/privacyPolicy";
// import TermsCondition from "./modules/explorer/termsCondition";
// import ActivateAccount from "./modules/explorer/activateAccount";
// import AddressDetailsData from "./modules/address/AddressDetailsData";
// import ContractComponent from "./modules/dashboard/contractComponent";
// import ContractTab from "./modules/dashboard/contractTab";
// import socketClient from "socket.io-client";
// import AccountProfile from "./modules/explorer/accountProfile";
// import Transaction from "./modules/resp_transaction/resTransaction";
// import TransferDetailsUi from "./modules/Transfertransactiondetails/transferTransactionDetails";
// import BlockDetails from "./modules/explorer/newblockDetail";
import LoaderComponent from "./common/components/loader";
// import VerifiedEmailScreenComponent from "./modules/verifiedEmailScreen";
// import EditProfile from "./modules/explorer/editProfileResponsive";
// import Test from "./modules/explorer/dashboardPopup/Test";
// import TestTwo from "./modules/explorer/dashboardPopup/TestTwo";
// import TestAddress from "./modules/explorer/dashboardPopup/TestAddress";
// import ContractRead from "./modules/contractMethods/read";
const TokenDataComponent = withRouter(lazy(() => import('./modules/token/tokenDataDashboard')));
const LatestTransactionList = withRouter(lazy(() => import('./modules/transaction')));
const LatestBlocksList = withRouter(lazy(() => import('./modules/blocks')));
const BlockChainClass = withRouter(lazy(() => import('./modules/explorer')));
const TokenList = withRouter(lazy(() => import('./modules/tokenList')));
const LatestAccountsList = withRouter(lazy(() => import('./modules/accounts')));
const AddressDetails = withRouter(lazy(() => import('./modules/address/addressDetails')));
const HolderDetails = withRouter(lazy(() => import('./modules/holders/holderDetails')));
const PolicyDetails = withRouter(lazy(() => import('./modules/explorer/privacyPolicy')));
const TermsCondition = withRouter(lazy(() => import('./modules/explorer/termsCondition')));
const ActivateAccount = withRouter(lazy(() => import('./modules/explorer/activateAccount')));
const AddressDetailsData = withRouter(lazy(() => import('./modules/address/AddressDetailsData')));
const ContractComponent = withRouter(lazy(() => import('./modules/dashboard/contractComponent')));
const ContractTab = withRouter(lazy(() => import('./modules/dashboard/contractTab')));
const AccountProfile = withRouter(lazy(() => import('./modules/explorer/accountProfile')));
const Transaction = withRouter(lazy(() => import('./modules/resp_transaction/resTransaction')));
const TransferDetailsUi = withRouter(lazy(() => import('./modules/Transfertransactiondetails/transferTransactionDetails')));
const BlockDetails = withRouter(lazy(() => import('./modules/explorer/newblockDetail')));
// const LoaderComponent =withRouter(lazy(() => import('./common/components/loader')));
const VerifiedEmailScreenComponent = withRouter(lazy(() => import('./modules/verifiedEmailScreen')));
const EditProfile = withRouter(lazy(() => import('./modules/explorer/editProfileResponsive')));
const Test = withRouter(lazy(() => import('./modules/explorer/dashboardPopup/Test')));
const TestTwo = withRouter(lazy(() => import('./modules/explorer/dashboardPopup/TestTwo')));
const TestAddress = withRouter(lazy(() => import('./modules/explorer/dashboardPopup/TestAddress')));
const ContractRead = withRouter(lazy(() => import('./modules/contractMethods/read')));
const SearchNotFound = withRouter(lazy(() => import('./common/components/dataNotFound')))
// const GlobalIdContinue = withRouter(lazy(() => import('./modules/explorer/globalIdContinue')));
let socket = socketClient(process.env.REACT_APP_WEB_SOCKECT_URL, {
  transports: ["websocket"],
});
let nodeSocket = socketClient(process.env.REACT_APP_WEB_SOCKECT_NODE_URL, {
  path: "/stats-data/",
  transports: ["websocket"],
  reconnection: true,
});
class Routes extends BaseComponent {
  componentWillMount() { }

  componentWillReceiveProps(nextProps) { }

  render() {
    let loader =
      this.props && this.props.user && this.props.user.loading ? (
        <LoaderComponent />
      ) : null;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
          {/*{loader}*/}
          <Suspense fallback={<LoaderComponent />}>
            <Switch>
              <Route
                exact
                path={"/view-all-transaction"}
                component={() => <LatestTransactionList  />}
              />
              <Route
                exact
                path={"/view-all-blocks"}
                component={() => <LatestBlocksList  />}
              />
              <Route
                exact
                path={"/"}
                component={() => <BlockChainClass socket={socket} socketNode={nodeSocket}
                />}
              />

              { }
              <Route
                exact
                path={"/view-all-transaction"}
                component={LatestTransactionList}
              />
              <Route
                exact
                path={"/transfer-transaction-details/:address"}
                component={TransferDetailsUi}
              />

              <Route
                exact
                path={"/block-details/:blockNumber"}
                component={BlockDetails}
              />
              <Route
                exact
                path={"/account-details"}
                component={LatestAccountsList}
              />
              <Route
                exact
                path={"/address-details/:addr"}
                component={AddressDetails}
              />
              <Route
                exact
                path={"/holder-details/:addr/:tn"}
                component={HolderDetails}
              />
              <Route
                exact
                path={"/token-data/:address/:tn"}
                component={TokenDataComponent}
              />
              <Route
                exact
                path={["/tokens/:token", "/tokens"]}
                component={TokenList}
              />
              <Route
                exact
                path={"/transaction-details/:hash"}
                component={Transaction}
              />
              <Route exact path={"/contracts"} component={ContractComponent} />
              <Route
                exact
                path={["/verify-contracts/:address", "/verify-contracts"]}
                component={ContractTab}
              />
              <Route exact path={"/loginprofile"} component={AccountProfile} />
              <Route exact path={"/privacy-policy"} component={PolicyDetails} />
              <Route exact path={"/term-conditions"} component={TermsCondition} />
              <Route
                exact
                path={"/activate-account"}
                component={ActivateAccount}
              />
              <Route
                exact
                path={"/data-not-found"}
                component={SearchNotFound}
              />
              <Route
                exact
                path={"/address/:addressNumber"}
                component={AddressDetailsData}
              />
              <Route
                exact
                path={"/verified-email"}
                component={VerifiedEmailScreenComponent}
              />
              <Route exact path={"/edit-profile"} component={EditProfile} />
              <Route
                exact
                path={"/verified-email"}
                component={VerifiedEmailScreenComponent}
              />
              <Route
                exact
                path={"/global-id/:mode"}
                component={GlobalIdContinue}
              />
              <Route exact path={"/test"} component={Test} />
              <Route exact path={"/read"} component={ContractRead} />
              <Route exact path={"/testTrancation"} component={TestTwo} />
              <Route exact path={"/test-address"} component={TestAddress} />
              <Redirect exact from="*" to="/" />
            </Switch>
          </Suspense>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Routes);
