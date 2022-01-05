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
    let graphData = await this.props.getAnalyticsData();
    graphData = graphData.map((data) => {
      data.x = data.date;
      data.y = Number(data.currentBalance.toFixed(5));
      return data;
    });
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
