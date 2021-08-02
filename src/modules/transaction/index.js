import React from "react";
import BaseComponent from "../baseComponent";
import TransactionComponent from "./transactionComponent"
import Utils from '../../utility'
import { TransactionService } from '../../services'
import TokenSearchComponent from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";


export default class LatestTransactionList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            // DataSet: Array(250).fill(this.create_data("0x43730ce5eb14d295d2a08f31a1402c65930aff870a5734b39077dc2407c046e2", `99.99 XDC`, "43 secs ago", "30771616", "0xb7f5d2172d17dcaa6269eabfdb58fb82d2f3f3c0", "0xb7f5d2172d17dcaa6269eabfdb58fb82d2f3f3c0", "0.00000000005 XDC")),
            from: 0,
            amount: 50,
            tableName: "Transactions",
            transactionList: [],
            totalTransaction: 0,
            isLoader: false
        }
    }

    componentDidMount() {
        // this.getListOfBlocks()
        this.getListOfTransactions()
        this.getTotalTransaction()
        this.setGetListOfTransactionsInterval()
    }

    async setGetListOfTransactionsInterval() {
        setInterval(() => {
            this.getListOfTransactions()
        }, 90000)
    }


    async getListOfTransactions(from, amount) {

        from = from || from === 0 ? from : this.state.from;
        amount = amount ? amount : this.state.amount;
        let urlPath = `?skip=${from}&limit=${amount}`
        let [error, listOfTransactions] = await Utils.parseResponse(TransactionService.getLatestTransaction(urlPath, {}))
        if (error || !listOfTransactions)
            return this.setState({ isLoader: false })
        this.setState({ transactionList: listOfTransactions, isLoader: false })


    }

    async getTotalTransaction() {
        let [error, total] = await Utils.parseResponse(TransactionService.getTotalTransaction())
        console.log(total, "datatata")
        if (error || !total)
            return
        this.setState({ totalTransaction: total })

    }

    _handleChange = (event) => {
        this.setState({ amount: event.target.value })
        this.getListOfTransactions(this.state.from, event.target.value)
    }

    // _handleChange = (value, name) => {
    //     this.setState({ [name]: value })

    // }

    _FirstPage = (event) => {
        this.setState({ from: 0 })
        this.getListOfTransactions(0, this.state.amount)
    }
    _LastPage = (event) => {
        let from = this.state.totalTransaction - this.state.amount
        this.setState({ from })
        this.getListOfTransactions(from, this.state.amount)
    }
    _NextPage = async (event) => {
        if (this.state.amount + this.state.from < this.state.totalTransaction) {
            let from = this.state.amount + this.state.from
            this.setState({ from })
            this.getListOfTransactions(from, this.state.amount)
        }
    }
    _PrevPage = (event) => {
        if (this.state.from - this.state.amount >= 0) {
            let from = this.state.from - this.state.amount
            this.setState({ from })
            this.getListOfTransactions(from, this.state.amount)
        }
    }

    create_data(hash, amount, age, block, from, to, txnfee) {
        return { hash, amount, age, block, from, to, txnfee }
    }

    shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }


    create_url(item, type) {
        // Thisn is to create URL for table items. changing it can affect whole table.
        if (!item || !item.length) {
            return "..."
        }
        return `#${item}-#{type}`
    }

    render() {
        return (
            <div>
                <TokenSearchComponent />
                <TransactionComponent
                    create_data={this.create_data}
                    state={this.state}
                    shorten={this.shorten}
                    create_url={this.create_url}
                    _PrevPage={this._PrevPage}
                    _NextPage={this._NextPage}
                    _LastPage={this._LastPage}
                    _FirstPage={this._FirstPage}
                    _handleChange={this._handleChange}
                />
                <FooterComponent />
            </div>)

    }
}