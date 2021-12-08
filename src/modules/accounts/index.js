import React from "react";
import BaseComponent from "../baseComponent";
import AccountComponent from "./accountComponent"
import Utils from '../../utility'
import { AccountService } from '../../services'
import { CoinMarketService } from '../../services'


export default class LatestAccountsList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            from: 0,
            amount: 50,
            tableName: "Accounts",
            accountList: [],
            totalAccounts: 0,
            totalSupply: 0,
            noData: 1,
            isLoading: true

        }
    }

    componentDidMount() {
        this.getListOfAccounts()
        this.getTotalAccounts()
        this.getCoinMarketTotalSupply()
    }


    async getListOfAccounts(from, amount, keywords = '') {
        from = from || from === 0 ? from : this.state.from;
        amount = amount ? amount : this.state.amount;
        let urlPath = ''
        if (keywords) {
            urlPath = `?skip=${from}&limit=${amount}&keywords=${keywords}`
        } else {
            urlPath = `?skip=${from}&limit=${amount}`
        }

        let [error, listOfAccounts] = await Utils.parseResponse(AccountService.getLatestAccount(urlPath, {}))
        if (error || !listOfAccounts)
            return
        if (listOfAccounts.newResponse.length > 0) {
            this.setState({ noData: 1 })
            this.setState({ isLoading: false })
        } else {
            this.setState({ noData: 0 })
            this.setState({ isLoading: false })
        }
        this.setState({ accountList: listOfAccounts.newResponse })
        // this.setState({ totalSupply: listOfAccounts.totalSupply })
        this.setState({ isLoading: false })
        if (keywords) {
            this.setState({ totalAccounts: listOfAccounts.totalRecord })
            this.setState({ isLoading: false })
        } else {
            this.getTotalAccounts()
        }
    }

    async getCoinMarketTotalSupply() {
        let [error, coinMarketTotalSupply] = await Utils.parseResponse(CoinMarketService.getCoinMarketTotalSupply())
        if (error || !coinMarketTotalSupply)
            return
        this.setState({ totalSupply: coinMarketTotalSupply })
    }

    async getTotalAccounts() {
        let [error, totalNumberAccounts] = await Utils.parseResponse(AccountService.getTotalAccount())
        if (error || !totalNumberAccounts)
            return
        this.setState({ totalAccounts: totalNumberAccounts })
    }

    _handleSearch = (event) => {
        let searchkeyword = event.target.value
        if (searchkeyword.length > 2) {
            this.getListOfAccounts(0, this.state.amount, searchkeyword)
        } else {
            this.getListOfAccounts(0, this.state.amount)
        }
    }
    _handleChange = (event) => {
        this.setState({ amount: event.target.value })
        this.getListOfAccounts(this.state.from, event.target.value)
    }
    _FirstPage = (event) => {
        this.setState({ from: 0 })
        this.getListOfAccounts(0, this.state.amount)
    }
    _LastPage = (event) => {
        let from = this.state.totalAccounts - this.state.amount
        this.setState({ from })
        this.getListOfAccounts(from, this.state.amount)
    }
    _NextPage = async (event) => {
        if (+this.state.amount + +this.state.from < this.state.totalAccounts) {
            let from = +this.state.amount + +this.state.from
            this.setState({ from })
            this.getListOfAccounts(from, this.state.amount)
        }
    }
    _PrevPage = (event) => {
        if (this.state.from - this.state.amount >= 0) {
            let from = this.state.from - this.state.amount
            this.setState({ from })
            this.getListOfAccounts(from, this.state.amount)
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
            <AccountComponent
                create_data={this.create_data}
                state={this.state}
                shorten={this.shorten}
                create_url={this.create_url}
                _PrevPage={this._PrevPage}
                _NextPage={this._NextPage}
                _LastPage={this._LastPage}
                _FirstPage={this._FirstPage}
                _handleChange={this._handleChange}
                _handleSearch={this._handleSearch}
            />
        )

    }
}