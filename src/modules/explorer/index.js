import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchainData";
import FooterComponent from "../common/footerComponent";
import LatestBlocksComponent from './latestBlocksAndTransactions';
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";


export default class BlockChainClass extends BaseComponent {
    render() {
        return (

            <div>
                <NavigationBar />
                <BlockChainDataComponent />
                <MarketTable />
                <LatestBlocksComponent />
                <FooterComponent />
            </div>
        )

    }
}