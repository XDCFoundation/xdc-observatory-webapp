import React from "react";
import BaseComponent from "../baseComponent";
import LoginComponent from "../explorer/loginDialog";
import Utils from "../../utility";
import AuthService from "../../services/auth0";
import {cookiesConstants, eventConstants, genericConstants,} from "../../constants";
import {sessionManager} from "../../managers/sessionManager"

// import UserService from "../../services/"

class Login extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      isPasswordVisible: false,
    };
  }

  componentDidMount() {}

  onChangeEvent = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  togglePassword = (event) => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };

  validateLoginForm = () => {
    this.setState({
      emailError: Utils.validateEmail(this.state.email)
        ? ""
        : "Invalid email address",
      passwordError: Utils.isPasswordValid(this.state.password)
        ? ""
        : "Password should contain 1 special character",
    });
    return (
      Utils.validateEmail(this.state.email) &&
      Utils.isPasswordValid(this.state.password)
    );
  };

  onLoginClicked = async (event) => {
    event.preventDefault();
    if (this.validateLoginForm()) Utils.basicAlert("ok");
  // };
  // this.props.dispatchAction(eventConstants.SHOW_LOADER);
  this.authObject = new AuthService();
  // let res = await this.authObject.signin(
  //   this.state.email,
  //   this.state.password
  // );
  let [error, res] = await Utils.parseResponse(
    this.authObject.signin(this.state.email, this.state.password)
  );
  if (error) {
    Utils.apiFailureToast(genericConstants.INCORRECT_EMAIL_PASSWORD);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({ disableButton: false })
    return;
  }
  // let [getUserError, getUserResponse] = await Utils.parseResponse(
  //   UserService.getUserDetails(res?.userDetails?.sub)
  // );
  
  // if (getUserError) {
  //   Utils.apiFailureToast(genericConstants.CANT_GET_USER_DETAILS);
  //   this.setState({ disableButton: false })
  //   return;
  // }
  // if (getUserResponse) {
  //   if (!getUserResponse.roles || !getUserResponse.roles.length) {
  //     Utils.apiFailureToast(genericConstants.DO_NOT_HAVE_PERMISSION);
  //     this.setState({ disableButton: false })
  //     return;
  //   }
   
  // }
  if (res.accessToken) {
    Utils.apiSuccessToast(genericConstants.LOGIN_SUCCESSFULL);
  }
  this.props.dispatchAction(eventConstants.HIDE_LOADER);
  sessionManager.setDataInCookies(
    res.userMetaData,
    cookiesConstants.USER_META_DATA
  );
  sessionManager.setDataInCookies(
    res.userDetails,
    cookiesConstants.USER_DETAILS
  );

  this.props.dispatchAction(eventConstants.SIGN_IN_SUCCESS, res);
  // history.push(pathConstants.DASHBOARD_MENU.DASHBOARD);
};

  render() {
    return (
      <LoginComponent
        state={this.state}
        onChangeEvent={this.onChangeEvent}
        togglePassword={this.togglePassword}
        onLoginClicked={this.onLoginClicked}
      />
    );
  }
}

export default Login;
