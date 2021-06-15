import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Redirect, Switch } from "react-router";
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from "react-redux";
// import { Login, SignUp } from "./modules";
import { history } from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import BlockChainClass from './modules/explorer/'

class Routes extends BaseComponent {

    componentDidMount() {

    }

    render() {
        return (

            <Router history={history}>
                <Switch>
                    {/* <Route exact path={'/'} component={Login} />
                        <Route exact path={'/sign-up'} component={SignUp} /> */}
                    {<Route exact path={'/'} component={BlockChainClass} />}
                    <Redirect exact from='*' to="/" />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
};
export default connect(mapStateToProps)(Routes);