import React from "react";
import BaseComponent from "../baseComponent";
import VerifiedEmailScreenComponent from "./verifiedEmailScreen";
import TokenSearchComponent from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import { sessionManager } from "../../managers/sessionManager";
import { Redirect } from "react-router";

class VerifiedEmailScreen extends BaseComponent {
  render() {
    const isloggedIn = sessionManager.getDataFromCookies("isLoggedIn");
    return (
      <div>
        {isloggedIn ? (
          <Redirect to={"/"} />
        ) : (
          <>
            <TokenSearchComponent />
            <VerifiedEmailScreenComponent state={this.state} />
            <FooterComponent />
          </>
        )}
      </div>
    );
  }
}

export default VerifiedEmailScreen;
