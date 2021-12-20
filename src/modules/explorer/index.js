import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchainData";
import FooterComponent from "../common";
import LatestBlocksComponent from './latestBlocksAndTransactions';
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";




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

        let activeCurrency = window.localStorage.getItem('currency')
        return (
            <div>
                <NavigationBar />
                <BlockChainDataComponent
                    currency={activeCurrency} socket={this.props.socket} />
                <MarketTable currency={activeCurrency} />
                <LatestBlocksComponent socket={this.props.socket} />
                <FooterComponent _handleChange={this._handleChange}
                    currency={this.state.amount} />
                {/* showDropDown={this.state.showDropDown} */}
            </div>
        )

    }
}