import React from "react";
import BaseComponent from "../baseComponent";
import TransferTransaction from "./transferTransactionDetails";

export default class TransferDetailsUi extends BaseComponent {
  render() {
    return (
      <div>
        <TransferTransaction />
      </div>
    );
  }
}
