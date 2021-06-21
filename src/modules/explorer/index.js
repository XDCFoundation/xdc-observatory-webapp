import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockChainData";
import FooterComponent from "../common/footerComponent";
import LatestBlocksComponent from './latestBlocks';
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";
import TokenDataComponent from '../tokenComponent/tokenDataDashboard';
import TokenMarketDataTable from '../tokenComponent/tokenMarketData';


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