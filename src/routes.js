import React from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { connect } from "react-redux";
import { history } from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import TokenDataComponent from "./modules/token/tokenDataDashboard";
import LatestTransactionList from "./modules/transaction/index";
import LatestBlocksList from "./modules/blocks";
import BlockChainClass from "./modules/explorer";
import TokenDetails from "./modules/explorer/tokendetails";
import TransactionsDetailsData from "./modules/explorer/transactiondetails";
import BlockDetailsData from "./modules/explorer/blockDetails";
import LatestAccountsList from "./modules/accounts";
import AddressDetails from "./modules/address/addressDetails";
import HolderDetails from "./modules/holders/holderDetails";
import AddressDetailsData from "./modules/address/AddressDetailsData";
import ContractComponent from "./modules/dashboard/contractComponent";
import ContractTab from "./modules/dashboard/contractTab";
import socketClient from "socket.io-client";
import AccountProfile from "./modules/explorer/accountProfile";
import Transaction from "./modules/resp_transaction/resTransaction";
import TransferDetailsUi from "./modules/Transfertransactiondetails/transferTransactionDetails";
import BlockDetails from './modules/explorer/newblockDetail'
let socket = socketClient("http://ec2-54-160-137-15.compute-1.amazonaws.com:3000/", {
  transports: ["websocket"],
}
);

class Routes extends BaseComponent {
  componentDidMount() { }

  componentDidMount() {

  }

  render() {
    return (

      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/view-all-transaction'} component={() => <LatestTransactionList socketTrans={socket} />} />
            <Route exact path={'/view-all-blocks'} component={() => <LatestBlocksList socketblock={socket} />} />
            <Route exact path={'/'} component={() => <BlockChainClass socket={socket} />} />

            <Route exact path={'/token-data'} component={TokenDataComponent} />
            <Route exact path={'/view-all-transaction'} component={LatestTransactionList} />

            <Route exact path={'/tokens'} component={TokenDetails} />
            {/* <Route exact path={'/block-details/:blockNumber'} component={BlockDetailsData} /> */}
            <Route exact path={'/block-details/:blockNumber'} component={BlockDetails} />
            <Route exact path={'/account-details'} component={LatestAccountsList} />
            <Route exact path={'/address-details/:addr'} component={AddressDetails} />
            <Route exact path={'/holder-details/:addr'} component={HolderDetails} />
            <Route exact path={'/token-data/:address'} component={TokenDataComponent} />
            <Route exact path={'/token-details'} component={TokenDetails} />
            <Route exact path={'/transaction-details/:hash'} component={TransactionsDetailsData} />
            <Route exact path={'/contracts'} component={ContractComponent} />
            <Route exact path={['/verify-contracts/:address', '/verify-contracts']} component={ContractTab} />
            <Route exact path={'/loginprofile'} component={AccountProfile} />
            <Route exact path={'/address/:addressNumber'} component={AddressDetailsData} />
            <Redirect exact from='*' to="/" />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Routes);
