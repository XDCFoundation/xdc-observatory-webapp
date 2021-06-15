import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchaindata";
<<<<<<< HEAD
import LatestBlocksComponent from './latestBlocks';
=======
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";

>>>>>>> 9996396dbc0dc1723a4fe8c5fbc0b0063c2dd31f

export default class BlockChainClass extends BaseComponent {
    render() {
        return (
            <div>
<<<<<<< HEAD
                {/* <BlockChainDataComponent /> */}
                <LatestBlocksComponent />
            </div>

=======
            <NavigationBar />
            <BlockChainDataComponent />
            <MarketTable />
            </div>
>>>>>>> 9996396dbc0dc1723a4fe8c5fbc0b0063c2dd31f
        )
    }
}