import React from "react";
import BaseComponent from "../baseComponent";
import TokenListComponent from "./tokenList";
import { TransactionService } from "../../services";
import TokenSearchComponent from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import { toolTipMessages } from "../../constants";
import { connect } from "react-redux";
import { dispatchAction } from "../../utility"
import { sessionManager } from "../../managers/sessionManager";

class LatestTransactionList extends BaseComponent {
  constructor(props) {
    let ercValue = sessionManager.getDataFromCookies("xrc20")
    ercValue = ercValue == "true"
    super(props);
    { !ercValue ?
    this.state = {
      tableColumns: {
        // Hash: { isActive: true, toolTipText: "Unique transaction identifier, also known as the Transaction ID." },
        // "Contract": {isActive: true, toolTipText: toolTipMessages.hashid},
        // "Name": {isActive: true, toolTipText: toolTipMessages.value},
        Symbol: { isActive: true, toolTipText: "Short name of the token" },
        // "Date and Time": {isActive: true},
        // Type: { isActive: true, toolTipText: "Token type may include XRC20, XRC721 or XRC1155." },
        // "Total Supply": {isActive: true, toolTipText: toolTipMessages.from},
        "Total Holders": {
          isActive: true,
          toolTipText: "The total number of unique addresses that hold the token",
        },
      },
      sortKey:""
    } :
    this.state = {
      tableColumns: {
        Symbol: { isActive: true, toolTipText: "Short name of the token" },
      },
      sortKey:""
    } 
  }
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
        theme={this.props.theme.currentTheme}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { theme: state.theme };
};
export default connect(mapStateToProps, { dispatchAction })(LatestTransactionList);