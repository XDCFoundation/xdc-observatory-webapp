import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchaindata";
import LatestBlocksComponent from './latestBlocks';

export default class BlockChainClass extends BaseComponent {
    render() {
        return (
            <div>
                {/* <BlockChainDataComponent /> */}
                <LatestBlocksComponent />
            </div>

        )
    }
}