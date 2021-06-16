import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchaindata";
import FooterComponent from "./footerComponent";
export default class BlockChainClass extends BaseComponent {
    render() {
        return (
            <div>
            <BlockChainDataComponent />
            <FooterComponent />
            </div>
        )
    }
}