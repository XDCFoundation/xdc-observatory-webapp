import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchaindata";
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";


export default class BlockChainClass extends BaseComponent {
    render() {
        return (
            <div>
            <NavigationBar />
            <BlockChainDataComponent />
            <MarketTable />
            </div>
        )
    }
}