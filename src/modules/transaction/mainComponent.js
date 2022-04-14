import React from "react";
import BaseComponent from "../baseComponent";
import TransactionComponent from "./transactionComponent";
import Utils from "../../utility";
import { TransactionService } from "../../services";
import TokenSearchComponent from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import { MethodFromByte, toolTipMessages } from "../../constants";
import socketClient from "socket.io-client";
import { withRouter } from "react-router";
let socket = socketClient(process.env.REACT_APP_WEB_SOCKECT_URL, {
  transports: ["websocket"],
});

export default class LatestTransactionList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      from: 0,
      amount: 10,
      sortKey: -1,
      lastFrom: 0,
      tableName: "Latest Transactions",
      transactionList: [],
      totalTransaction: 0,
      isLoader: false,
      hashAnimation: {},
      isLoading: true,
      isData: false,
      lastPage: false,
      pageParam: this.props?.match?.params?.pageNo,
      tableColumns: {
        // "Transaction Hash": {isActive: true, toolTipText: toolTipMessages.hashid},
        Amount: { isActive: true, toolTipText: toolTipMessages.AMOUNT },
        Age: { isActive: true, toolTipText: toolTipMessages.age },
        Date: { isActive: true, toolTipText: toolTipMessages.date },
        // "Date and Time": {isActive: true},
        Block: { isActive: true, toolTipText: toolTipMessages.blocknumber },
        // "From Address": {isActive: true, toolTipText: toolTipMessages.from},
        // "To Address": {isActive: true, toolTipText: toolTipMessages.to},
      },
    };
  }

  componentWillUnmount() {
    this.props.socket.off("block-socket");
  }

  async componentDidMount() {
    await this.getListOfTransactions();
    await this.getTotalTransaction();
    await this.socketData(socket);
    // if(this.state.lastPage === false){
    //   await this.setGetListOfTransactionsInterval();
    // }
  }

  // async setGetListOfTransactionsInterval() {
  //   setInterval(() => {
  //     this.getListOfTransactions();
  //   }, 90000);
  // }

  async getListOfTransactions(from, amount, sortKey) {
    // debugger;
    from = from || from === 0 ? from : this.state.from;
    amount = amount ? amount : this.state.amount;
    sortKey = sortKey ? sortKey : this.state.sortKey;
    let urlPath = `?skip=${from}&limit=${amount}&sortKey=${sortKey}`;
    let [error, listOfTransactions] = await Utils.parseResponse(
      TransactionService.getLatestTransaction(urlPath, {})
    );
    if (error || !listOfTransactions)
      return this.setState({ isLoader: false, isData: false });
    listOfTransactions = listOfTransactions.map((item) => {
      return {
        ...item,
        method: Utils.getMethodType(item),
      };
    });
    this.setState({
      transactionList: listOfTransactions,
      isLoading: false,
      isData: listOfTransactions.length > 0,
    });
  }

  // async increment() {
  //   setLoading(true);
  //   let updatedCount = Number(count) + 1;
  //   setcount(updatedCount);
  //   window.history.pushState("", "", `//${updatedCount}`);
  //   getLatestaccount(updatedCount);
  // }

  // async decrement() {
  //   setLoading(true);
  //   let updatedCount = Number(count) - 1;
  //   setcount(updatedCount);
  //   window.history.pushState("", "", `/block-details/${updatedCount}`);
  //   getLatestaccount(updatedCount);
  // }

  async getTotalTransaction() {
    let [error, total] = await Utils.parseResponse(
      TransactionService.getTotalTransaction()
    );

    if (error || !total) return;
    this.setState({ totalTransaction: total });
  }

  socketData(socket) {
    socket.on("transaction-socket", (transactionData, error) => {
      // this.setState({ transactionSocketConnected: true })
      transactionData["method"] = Utils.getMethodType(transactionData);
      let transactions = this.state.transactionList;

      let transactionDataExist = transactions.findIndex((item) => {
        return item.hash === transactionData.hash;
      });

      if (
        transactionDataExist === -1 &&
        this.state.from === 0 &&
        this.state.lastPage === false
      ) {
        if (transactions.length >= 10) transactions.pop();
        transactions.unshift(transactionData);
        let hashAnimationClass = {
          [transactionData.hash]: "first-block-details",
        };
        this.setState({ hashAnimation: hashAnimationClass });
        setTimeout(() => {
          this.setState({ hashAnimation: {} });
        }, 800);
        this.setState({
          transactionList: transactions,
          isData: transactions.length > 0,
        });

        if (error) {
        }
      }
    });
  }

  _handleChange = (event) => {
    this.setState({ amount: event.target.value });
    if (this.state.lastPage === true) {
      this.getListOfTransactions(this.state.lastFrom, event.target.value, 1);
    } else {
      this.getListOfTransactions(this.state.from, event.target.value, -1);
    }
  };

  // _handleChange = (value, name) => {
  //     this.setState({ [name]: value })

  // }

  _FirstPage = (event) => {
    this.setState({ from: 0 });
    this.setState({ lastPage: false });
    this.getListOfTransactions(0, this.state.amount, -1);
  };
  _LastPage = (event) => {
    let from = this.state.totalTransaction - this.state.amount;
    this.setState({ from });
    this.setState({ sortKey: 1 });
    this.setState({ lastFrom: 0 });
    let lastFrom = 0;
    this.getListOfTransactions(lastFrom, this.state.amount, 1);
    this.setState({ lastPage: true });
  };
  _NextPage = async (event) => {
    let from = +this.state.amount + +this.state.from;
    this.setState({ from });
    if (this.state.lastPage === true) {
      if (this.state.lastFrom - this.state.amount >= 0) {
        let from = this.state.lastFrom - this.state.amount;
        this.setState({ lastFrom: from });
        this.getListOfTransactions(from, this.state.amount, 1);
      }
    } else {
      if (+this.state.amount + +this.state.from < this.state.totalTransaction) {
        let from = +this.state.amount + +this.state.from;
        this.setState({ from });
        this.setState({ sortKey: -1 });
        this.getListOfTransactions(from, this.state.amount, -1);
      }
    }
  };
  _PrevPage = (event) => {
    let from = this.state.from - this.state.amount;
    this.setState({ from });
    if (this.state.lastPage === true) {
      let from = +this.state.amount + +this.state.lastFrom;
      this.setState({ lastFrom: from });
      this.getListOfTransactions(from, this.state.amount, 1);
    } else {
      if (this.state.from - this.state.amount >= 0) {
        let from = this.state.from - this.state.amount;
        this.setState({ from });
        this.getListOfTransactions(from, this.state.amount, -1);
      }
    }
  };

  create_data(hash, amount, age, block, from, to, txnfee) {
    return { hash, amount, age, block, from, to, txnfee };
  }

  shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b?.length - 3,
      b?.length
    )}`;
  }

  create_url(item, type) {
    // Thisn is to create URL for table items. changing it can affect whole table.
    if (!item || !item.length) {
      return "...";
    }
    return `#${item}-#{type}`;
  }

  toggleTableColumns = (columnName) => {
    const columns = this.state.tableColumns;
    columns[columnName].isActive = !columns[columnName].isActive;
    this.setState({ tableColumns: columns });
  };

  render() {
    return (
      <div className={this.props.theme === "dark" ? "dark-theme-bg" : ""}>
        <TransactionComponent
          create_data={this.create_data}
          toggleTableColumns={this.toggleTableColumns}
          state={this.state}
          shorten={this.shorten}
          create_url={this.create_url}
          _PrevPage={this._PrevPage}
          _NextPage={this._NextPage}
          _LastPage={this._LastPage}
          _FirstPage={this._FirstPage}
          _handleChange={this._handleChange}
          theme={this.props.theme}
        />
      </div>
    );
  }
}
