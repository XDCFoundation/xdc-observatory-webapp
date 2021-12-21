import React from "react";
import BaseComponent from "../baseComponent";
import TokenListComponent from "./tokenList";
import { TransactionService } from "../../services";
import TokenSearchComponent from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import { toolTipMessages } from "../../constants";

export default class LatestTransactionList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableColumns: {
        Hash: { isActive: true, toolTipText: "Serial Number of token" },
        // "Contract": {isActive: true, toolTipText: toolTipMessages.hashid},
        // "Name": {isActive: true, toolTipText: toolTipMessages.value},
        Symbol: { isActive: true, toolTipText: "Symbol of token" },
        // "Date and Time": {isActive: true},
        Type: { isActive: true, toolTipText: "Type of token" },
        // "Total Supply": {isActive: true, toolTipText: toolTipMessages.from},
        "Total Holders": {
          isActive: true,
          toolTipText: "Total holders of token",
        },
      },
    };
  }

  toggleTableColumns = (columnName) => {
    const columns = this.state.tableColumns;
    columns[columnName].isActive = !columns[columnName].isActive;
    this.setState({ tableColumns: columns });
  };

  render() {
    return (
      <TokenListComponent
        state={this.state}
        toggleTableColumns={this.toggleTableColumns}
      />
    );
  }
}
