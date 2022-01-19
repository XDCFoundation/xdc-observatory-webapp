import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchainData";
import FooterComponent from "../common";
import LatestBlocksComponent from './latestBlocksAndTransactions';
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";
import RecentSearchList from "./recentSearchList/recentSearchList";
import BuyStoreTradeXDC from "./buyStoreTradeXDC/buyStoreTradeXDC";
// import StorageMessage from "./dashboardPopup/storageMessage";

import { sessionManager } from "../../managers/sessionManager";

export default class BlockChainClass extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            amount: "",
            // showDropDown: true

        }
    }


    _handleChange = (event) => {
        this.setState({ amount: event.target.value })
        window.localStorage.setItem('currency', event.target.value)
    }

    render() {
        const isStorageMessage = sessionManager.getDataFromCookies("isStorageMessage")
        let activeCurrency = window.localStorage.getItem('currency')
        // let isStorageMessage = sessionManager.getDataFromCookies("isStorageMessage")
        return (
            <div>
                <NavigationBar />
                <BlockChainDataComponent
                    currency={activeCurrency} socket={this.props.socket} />
                <MarketTable currency={activeCurrency} />
                <LatestBlocksComponent socket={this.props.socket} />
                <RecentSearchList/>
                <BuyStoreTradeXDC/>
                {/* {isStorageMessage ? "" : <StorageMessage />} */}
                <FooterComponent _handleChange={this._handleChange}
                    currency={this.state.amount} />
                {/* showDropDown={this.state.showDropDown} */}
            </div>
        )

    }
}