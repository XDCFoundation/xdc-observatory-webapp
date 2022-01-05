import React from "react";
import { date } from "yup";
import BaseComponent from "../../../baseComponent";
import TokenTransferCountsComponent from "./tokenTransferCountGraph";

export default class TokenTransferCounts extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      graphData: this.props.graphData,
      sentAmountSeries: [],
      receiveAmountSeries: [],
    };
  }

  async componentDidMount() {
    let graphData = await this.props.graphData;

    let receiveAmountSeries = [],
      sentAmountSeries = [];
    graphData.map((data) => {
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
