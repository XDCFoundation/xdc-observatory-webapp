import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchaindata";

export default class BlockChainClass extends BaseComponent {
    render() {
        return (
            <BlockChainDataComponent />
        )
    }
}