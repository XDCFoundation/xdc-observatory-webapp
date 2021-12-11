import BaseComponent from "../baseComponent";
import React from "react"
import BlockChainDataComponent from "./blockchainData";
import FooterComponent from "../common";
import LatestBlocksComponent from './latestBlocksAndTransactions';
import NavigationBar from "./navigationBar";
import MarketTable from "./marketDatatable";
import Dialog from "@material-ui/core/Dialog";
import { Row } from "simple-flexbox";



export default class BlockChainClass extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            amount: "",
            // showDropDown: true
            dialogOpen: true,

        }
    }
    handleDialogCheck = (value) => {
        this.setState({ dialogOpen: value });
    }

    _handleChange = (event) => {
        this.setState({ amount: event.target.value })
        window.localStorage.setItem('currency', event.target.value)
    }
    // let dialogOpen = true;

    render() {

        let activeCurrency = window.localStorage.getItem('currency')
        // const [dialogOpen, setDialogOpen] = React.useState(true);
        // let dialogOpen = true;
        // const handleDialogCheck = (value) => {
        //     dialogOpen = value
        // }
        return (
            <div>
                <NavigationBar />
                <BlockChainDataComponent
                    currency={activeCurrency} socket={this.props.socket} />
                <MarketTable currency={activeCurrency} />
                <LatestBlocksComponent socket={this.props.socket} />
                <FooterComponent _handleChange={this._handleChange}
                    currency={this.state.amount} />
                {/* showDropDown={this.state.showDropDown} */}
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogCheck(false)}
                >
                    <div className="main-box">
                        <Row className="main-row">
                            <div className="main-title">New Features</div>
                            <div>
                                <img src={require("../../../src/assets/images/XDC-Cross.svg")} />
                            </div>
                        </Row>
                        <div className="main-sub-title">Create your account and get started</div>
                        <Row className="card-box">
                            <div className="card margin-right-20px">
                                <img src={require("../../../src/assets/images/watchlist2.svg")} className="crad-image" />
                                <div className="card-title">Create watchlist</div>
                                <div className="card-text">
                                    An Email notification can be sent to you when an address on your watch list receives an incoming transaction.
                                </div>
                            </div>
                            <div className="card margin-right-20px">
                                <img src={require("../../../src/assets/images/watchlist2.svg")} className="crad-image" />
                                <div className="card-title">Add transaction label</div>
                                <div className="card-text">
                                    Add a personal note to a transaction hash to track it in future.
                                </div>
                            </div>
                            <div className="card">
                                <img src={require("../../../src/assets/images/watchlist2.svg")} className="crad-image" />
                                <div className="card-title">Add transaction label</div>
                                <div className="card-text">
                                    Add a personal note to a transaction hash to track it in future.
                                </div>
                            </div>
                        </Row>
                        <div></div>
                    </div>
                </Dialog>
            </div>
        )

    }
}