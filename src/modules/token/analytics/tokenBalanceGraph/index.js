import React from "react";
import BaseComponent from "../../../baseComponent";
import TokenBalanceComponent from "./tokenBalanceGraphComponent";

export default class TokenBalanceGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            graphData: [
                {
                    "date": 1640370600000,
                    "toAmount": 0,
                    "fromAmount": 206246500000000,
                    "totalDocument": 6743,
                    "totalAmount": 206246500000000,
                    "currentBalance": 28518018100000060
                },
                {
                    "date": 1640457000000,
                    "toAmount": 0,
                    "fromAmount": 206246500000000,
                    "totalDocument": 6743,
                    "totalAmount": 206246500000000,
                    "currentBalance": 28311771600000060
                },
                {
                    "date": 1640543400000,
                    "toAmount": 0,
                    "fromAmount": 198654200000000,
                    "totalDocument": 6506,
                    "totalAmount": 198654200000000,
                    "currentBalance": 28113117400000060
                },
                {
                    "date": 1640629800000,
                    "toAmount": 0,
                    "fromAmount": 179364000000000,
                    "totalDocument": 5769,
                    "totalAmount": 179364000000000,
                    "currentBalance": 27933753400000060
                },
                {
                    "date": 1640716200000,
                    "toAmount": 0,
                    "fromAmount": 123668700000000,
                    "totalDocument": 3914,
                    "totalAmount": 123668700000000,
                    "currentBalance": 27810084700000060
                },
                {
                    "date": 1640802600000,
                    "toAmount": 0,
                    "fromAmount": 19615900000000,
                    "totalDocument": 695,
                    "totalAmount": 19615900000000,
                    "currentBalance": 27790468800000060
                },
                {
                    "date": 1640889000000,
                    "toAmount": 0,
                    "fromAmount": 8787000000000,
                    "totalDocument": 286,
                    "totalAmount": 8787000000000,
                    "currentBalance": 27781681800000060
                }
            ]
        };
    }

    render() {
        return (
            <TokenBalanceComponent
                state={this.state}
            />
        );
    }
}