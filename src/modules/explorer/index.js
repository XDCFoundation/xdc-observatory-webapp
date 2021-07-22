import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchainData";
import FooterComponent from "../common/footerComponent";
import LatestBlocksComponent from './latestBlocksAndTransactions';
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";


export default class BlockChainClass extends BaseComponent {
    constructor(props) {
        super(props)
        console.log(props, "PORPROP")
    }
    render() {
        return (

            <div>
                <NavigationBar />
                <BlockChainDataComponent />
                <MarketTable />
                <LatestBlocksComponent socket={this.props.socket} />
                <FooterComponent />
            </div>
        )

    }
}