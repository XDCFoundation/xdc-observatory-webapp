import BaseComponent from "../baseComponent";
import React from "react";
import FooterComponent from "../common";
import TokenSearchComponent from "../explorer/tokensearchBar";
import LatestBlocksList from "./mainComponent";
import { connect } from "react-redux";
import { dispatchAction } from "../../utility"

class BlockListMainComponent extends BaseComponent {
  render() {
    return (
      <div className={this.props.theme.currentTheme === "dark" ? "dark-theme-bg" : ""}>
        <TokenSearchComponent theme={this.props.theme.currentTheme}/>
        <LatestBlocksList theme={this.props.theme.currentTheme}/>
        <FooterComponent />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { theme: state.theme };
};
export default connect(mapStateToProps, { dispatchAction })(BlockListMainComponent);