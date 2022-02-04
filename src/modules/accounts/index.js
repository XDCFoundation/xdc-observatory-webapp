import React from "react";
import BaseComponent from "../baseComponent";
import AccountComponent from "./accountComponent";
import Utils from "../../utility";
import { AccountService } from "../../services";
import { CoinMarketService } from "../../services";
import { toolTipMessages } from "../../constants";

export default class LatestAccountsList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            from: 0,
            amount: 10,
            tableName: "Accounts",
            accountList: [],
            totalAccounts: 0,
            totalSupply: 0,
            noData: 1,
            isLoading: true,
            sortKey: "",
            sortType: 0,
            address: 0,
            tableColumns: {
                "Rank": { isActive: true, toolTipText: "Account’s rank sorted on the basis of Balance." },
                "Type": { isActive: true, toolTipText: "Account type is either Account, Contract or Token." },
                "Balance": { isActive: true, toolTipText: "Balance held by a particular account." },
                "Percentage": { isActive: true, toolTipText: "Percentage of holdings out of the total supply." }
            },
            searchAndFilters: {
                searchQuery: '',
                type: '',
                percentage: ''
            }
        };
    }

    componentDidMount() {
        this.getListOfAccounts()
        // this.getTotalAccounts()
        this.getCoinMarketTotalSupply()
    }

    toggleTableColumns = (columnName) => {
        const columns = this.state.tableColumns;
        columns[columnName].isActive = !columns[columnName].isActive
        this.setState({ tableColumns: columns })
    }

    async getListOfAccounts(sortKey, sortType) {

        const skip = this.state.from || 0;
        const limit = this.state.amount || 10;
        sortKey = sortKey || "balance";
        sortType = sortType || -1;
        const requestData = { skip, limit, sortKey, sortType }
        if (this.state.searchAndFilters.searchQuery) {
            requestData.searchValue = this.state.searchAndFilters.searchQuery
            requestData.searchKeys = ["address"]
        }
        if (this.state.searchAndFilters.type)
            requestData.accountType = this.state.searchAndFilters.type
        if (this.state.searchAndFilters.percentage)
            requestData.percentage = this.state.searchAndFilters.percentage
        let [error, response] = await Utils.parseResponse(AccountService.getAccountList(requestData))
        if (error)
            return
        const { accountList, totalCount } = response
        if (accountList?.length > 0) {
            this.setState({ noData: 1 })
            this.setState({ isLoading: false })
        } else {
            this.setState({ noData: 0 })
            this.setState({ isLoading: false })
        }
        this.setState({ accountList, totalAccounts: totalCount })
        this.setState({ isLoading: false })
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

    _handleChange = async (event) => {
        await this.setState({ amount: event.target.value })
        this.getListOfAccounts()
    }
    _FirstPage = async (event) => {
        await this.setState({ from: 0 })
        this.getListOfAccounts()
    }
    _LastPage = async (event) => {
        let from = (Math.ceil(this.state.totalAccounts / this.state.amount)-1) * this.state.amount
        await this.setState({ from })
        this.getListOfAccounts()
    }
    _NextPage = async (event) => {
        if (+this.state.amount + +this.state.from < this.state.totalAccounts) {
            let from = +this.state.amount + +this.state.from
            await this.setState({ from })
            this.getListOfAccounts()
        }
    }
    _PrevPage = async (event) => {
        if (this.state.from - this.state.amount >= 0) {
            let from = this.state.from - this.state.amount
            await this.setState({ from })
            this.getListOfAccounts()
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

    sortData = async (_sortKey) => {

        let sortOrder = 0;
        if (this.state.sortKey.includes(_sortKey)) {
            sortOrder = -1 * this.state.sortOrder;
            this.setState({ sortOrder })
        } else {
            this.setState({ sortKey: _sortKey, sortOrder: -1 })
        }
        if (_sortKey === 'percentage')
            _sortKey = "balance"
        this.getListOfAccounts([_sortKey], sortOrder);
    }
    getSortTitle = (sortKey) => {
        if (this.state[sortKey] === 1)
            return "Ascending"
        else
            return "Descending"
    }

    updateFiltersAndGetAccounts = async (searchAndFilters) => {
        await this.setState({ searchAndFilters })
        this.setState({ isLoading: true })
        this.getListOfAccounts()
    }

    render() {
        return (
            <AccountComponent
                toggleTableColumns={this.toggleTableColumns}
                create_data={this.create_data}
                state={this.state}
                shorten={this.shorten}
                create_url={this.create_url}
                _PrevPage={this._PrevPage}
                _NextPage={this._NextPage}
                _LastPage={this._LastPage}
                _FirstPage={this._FirstPage}
                _handleChange={this._handleChange}
                sortData={this.sortData}
                getSortTitle={this.getSortTitle}
                updateFiltersAndGetAccounts={this.updateFiltersAndGetAccounts}
            />
        )

    }
}
