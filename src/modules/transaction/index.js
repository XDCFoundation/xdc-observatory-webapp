import BaseComponent from "../baseComponent";
import React from "react";
import FooterComponent from "../common/index";
import TokenSearchComponent from "../explorer/tokensearchBar";
import TransactionComponent from "./mainComponent";

export default class TransactionListMainComponent extends BaseComponent {
  render() {
    return (
      <>
        <TokenSearchComponent />
        <TransactionComponent />
        <FooterComponent />
      </>
    );
  }
}
