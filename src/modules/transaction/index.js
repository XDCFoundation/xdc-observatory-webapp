import BaseComponent from "../baseComponent";
import React from "react";
import FooterComponent from "../common/index";
import TokenSearchComponent from "../explorer/tokensearchBar";
import TransactionComponent from "./mainComponent";
import { connect } from "react-redux";
import { dispatchAction } from "../../utility"

class TransactionListMainComponent extends BaseComponent {
  render() {
    return (
      <>
        <TokenSearchComponent theme={this.props.theme.currentTheme}/>
        <TransactionComponent theme={this.props.theme.currentTheme}/>
        <FooterComponent />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { theme: state.theme };
};
export default connect(mapStateToProps, { dispatchAction })(TransactionListMainComponent);