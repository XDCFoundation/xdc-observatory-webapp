import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from "react-redux";
import { history } from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import TokenDataComponent from "./modules/token/tokenDataDashboard";
import LatestTransactionList from './modules/transaction';
import LatestBlocksList from './modules/blocks';
import BlockChainClass from './modules/explorer';
import TokenDetails from './modules/explorer/tokendetails';
import BlockChainDataComponent from './modules/explorer/blockchainData';
import TransactionDetails from './modules/explorer/transactiondetails';
import BlockDetailsData from './modules/explorer/blockDetails'


class Routes extends BaseComponent {

    componentDidMount() {

    }

    render() {
        return (

            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} component={BlockChainClass} />
                        <Route exact path={'/token-data'} component={TokenDataComponent} />
                        <Route exact path={'/view-all-transaction'} component={LatestTransactionList} />
                        <Route exact path={'/view-all-blocks'} component={LatestBlocksList} />
                        <Route exact path={'/tokens'} component={TokenDetails} />
                        <Route exact path={'/transaction-details'} component={TransactionDetails} />
                        <Route exact path={'/block-details'} component={BlockDetailsData} />
                        <Redirect exact from='*' to="/" />
                    </Switch>

                </Router>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
};
export default connect(mapStateToProps)(Routes);