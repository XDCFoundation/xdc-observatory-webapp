import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchaindata";
import FooterComponent from "./footerComponent";
import LatestBlocksComponent from './latestBlocks';
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";
import TokenDataComponent from './tokenDataDashboard';
import TokenMarketDataTable from './tokenMarketData';


export default class BlockChainClass extends BaseComponent {
    render() {
        return (
            <div>
                <NavigationBar />
                <BlockChainDataComponent />
                <MarketTable />
                <LatestBlocksComponent />
                <FooterComponent />
                {/* <TokenDataComponent />
                <TokenMarketDataTable /> */}
            </div>
        )
    }
}