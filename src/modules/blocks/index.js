import BaseComponent from "../baseComponent";
import React from "react";
import FooterComponent from "../common";
import TokenSearchComponent from "../explorer/tokensearchBar";
import LatestBlocksList from "./mainComponent";

export default class BlockListMainComponent extends BaseComponent {
  render() {
    return (
      <>
        <TokenSearchComponent />
        <LatestBlocksList />
        <FooterComponent />
      </>
    );
  }
}
