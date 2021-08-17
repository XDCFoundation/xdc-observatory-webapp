import React from "react";
import BaseComponent from "../baseComponent";
import BlocksComponent from "./blocksComponent"
import Utils from '../../utility'
import { BlockService } from '../../services'


import TokenSearchComponent from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";

export default class LatestBlocksList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            from: 0,
            amount: 50,
            tableName: "Blocks",
            blocksList: [],
            totalblocks: 0,
            showDropDown: true
        }
    }
    componentWillUnmount() {
        this.props.socketblock.off("block-socket");
    }
    async componentDidMount() {

        await this.getListOfBlocks()
        await this.getTotalNumberOfBlocks()
        await this.socketData(this.props.socketblock);
    }


    socketData(socket) {


        socket.on("block-socket", (blockData, error) => {

            let blocks = this.state.blocksList
                ;

            let blockDataExist = blocks.findIndex((item) => {
                return item.number == blockData.number;
            });

            if (blockDataExist == -1 && this.state.from == 0) {
                if (blocks.length >= 10) blocks.pop();
                blocks.unshift(blockData);

                // blocks.sort((a, b) => {
                //   return b.number - a.number;
                // });

                this.setState({ blocksList: blocks });

                if (error) {
                    console.log("hello error");
                }
            }

        });
    }

    async getListOfBlocks(from, amount) {
        from = from || from === 0 ? from : this.state.from;
        amount = amount ? amount : this.state.amount;
        let urlPath = `?skip=${from}&limit=${amount}`
        let [error, listOfBlocks] = await Utils.parseResponse(BlockService.getLatestBlock(urlPath, {}))
        if (error || !listOfBlocks)
            return
        this.setState({ blocksList: listOfBlocks })


    }

    async getTotalNumberOfBlocks() {
        let [error, totalB] = await Utils.parseResponse(BlockService.getTotalBlocks())
        if (error || !totalB)
            return
        this.setState({ totalblocks: totalB })

    }

    _handleChange = (event) => {
        this.setState({ amount: event.target.value })
        this.getListOfBlocks(this.state.from, event.target.value)
    }


    _FirstPage = (event) => {
        this.setState({ from: 0 })
        this.getListOfBlocks(0, this.state.amount)
    }
    _LastPage = (event) => {
        let from = this.state.totalblocks - this.state.amount
        this.setState({ from })
        this.getListOfBlocks(from, this.state.amount)
    }
    _NextPage = async (event) => {
        if (this.state.amount + this.state.from < this.state.totalblocks) {
            let from = this.state.amount + this.state.from
            this.setState({ from })
            this.getListOfBlocks(from, this.state.amount)
        }
    }
    _PrevPage = (event) => {
        if (this.state.from - this.state.amount >= 0) {
            let from = this.state.from - this.state.amount
            this.setState({ from })
            this.getListOfBlocks(from, this.state.amount)
        }
    }

    create_data(hash, amount, age, block, from, to, txnfee) {
        return { hash, amount, age, block, from, to, txnfee }
    }

    shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }


    create_url(item, type) {
        // Thisn is to create URL for table items. changing it can affect whole table.
        if (!item || !item.length) {
            return "..."
        }
        return `#${item}-#{type}`
    }

    render() {
        return (
            <div>
                <TokenSearchComponent />
                <BlocksComponent
                    create_data={this.create_data}
                    state={this.state}
                    shorten={this.shorten}
                    create_url={this.create_url}
                    _PrevPage={this._PrevPage}
                    _NextPage={this._NextPage}
                    _LastPage={this._LastPage}
                    _FirstPage={this._FirstPage}
                    _handleChange={this._handleChange}
                />
                <FooterComponent showDropDown={this.state.showDropDown} />
            </div>
        )

    }
}