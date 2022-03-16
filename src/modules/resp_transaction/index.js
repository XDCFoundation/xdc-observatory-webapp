import React from "react";

import BaseComponent from "../baseComponent";
import Transaction from "./resTransaction";

export default class TransactionDetails extends BaseComponent {
  render() {
    return (
      <div>
        <Transaction />
      </div>
    );
  }
}
