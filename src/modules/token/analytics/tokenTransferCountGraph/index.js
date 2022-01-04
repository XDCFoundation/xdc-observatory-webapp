import React from "react";
import { date } from "yup";
import BaseComponent from "../../../baseComponent";
import TokenTransferCountsComponent from "./tokenTransferCountGraph";

export default class TokenTransferCounts extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [
        {
          date: 1640370600000,
          toAmount: 1000000,
          fromAmount: 206246500000000,
          totalDocument: 6743,
          totalAmount: 206246500000000,
          currentBalance: 10,
        },
        {
          date: 1640457000000,
          toAmount: 0,
          fromAmount: 206246500000000,
          totalDocument: 6743,
          totalAmount: 206246500000000,
          currentBalance: 12,
        },
        {
          date: 1640543400000,
          toAmount: 0,
          fromAmount: 198654200000000,
          totalDocument: 6506,
          totalAmount: 198654200000000,
          currentBalance: 14,
        },
        {
          date: 1640629800000,
          toAmount: 0,
          fromAmount: 179364000000000,
          totalDocument: 5769,
          totalAmount: 179364000000000,
          currentBalance: 16,
        },
        {
          date: 1640716200000,
          toAmount: 0,
          fromAmount: 123668700000000,
          totalDocument: 3914,
          totalAmount: 123668700000000,
          currentBalance: 18,
        },
        {
          date: 1640802600000,
          toAmount: 0,
          fromAmount: 19615900000000,
          totalDocument: 695,
          totalAmount: 19615900000000,
          currentBalance: 20,
        },
        {
          date: 1640889000000,
          toAmount: 0,
          fromAmount: 8787000000000,
          totalDocument: 286,
          totalAmount: 8787000000000,
          currentBalance: 22,
        },
      ],
      sentAmountSeries: [],
      receiveAmountSeries: [],
    };
  }

  componentDidMount() {
    let receiveAmountSeries = [],
      sentAmountSeries = [];
    this.state.graphData.map((data) => {
      sentAmountSeries.push({
        x: data.date,
        y: data.toAmount,
      });
      receiveAmountSeries.push({
        x: data.date,
        y: data.fromAmount,
      });
    });
    this.setState({ sentAmountSeries, receiveAmountSeries });
  }

  render() {
    return <TokenTransferCountsComponent state={this.state} />;
  }
}
