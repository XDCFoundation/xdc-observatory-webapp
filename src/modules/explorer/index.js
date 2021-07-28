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
            amount: "USD",
        }
    }

    _handleChange = (event) => {
        this.setState({ amount: event.target.value })
        // this.props.coinMarketCapDetails()
    }

    render() {

        return (

            <div>
                <NavigationBar />
                <BlockChainDataComponent
                    currency={this.state.amount} socket={this.props.socket} />
                <MarketTable currency={this.state.amount} />
                <LatestBlocksComponent socket={this.props.socket} />
                <FooterComponent _handleChange={this._handleChange}
                    currency={this.state.amount} />
            </div>
        )

    }
}