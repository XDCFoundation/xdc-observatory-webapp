import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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

            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={history}>
<<<<<<< HEAD
                <Switch>
                    {/* <Route exact path={'/'} component={Login} />
                        <Route exact path={'/sign-up'} component={SignUp} /> */}
                    {<Route exact path={'/'} component={BlockChainClass} />}
                    <Redirect exact from='*' to="/" />
                </Switch>
=======
            <Switch>
            <Route exact path={'/'} component={BlockChainClass} />
        <Redirect exact from='*' to="/" />
            </Switch>
>>>>>>> 9996396dbc0dc1723a4fe8c5fbc0b0063c2dd31f
            </Router>
                </MuiThemeProvider>
    );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
};
export default connect(mapStateToProps)(Routes);