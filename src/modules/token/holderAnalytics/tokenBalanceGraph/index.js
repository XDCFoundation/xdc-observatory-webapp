import React from "react";
import BaseComponent from "../../../baseComponent";
import TokenBalanceComponent from "./tokenBalanceGraphComponent";

export default class TokenBalanceGraph extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
    };
  }

  async componentDidMount() {
    let graphData = await this.props.getAnalyticsData();
    graphData = graphData.map((data) => {
      data.x = data.date;
      data.y = data.currentBalance;
      return data;
    });
    this.setState({ graphData });
  }

  render() {
    return <TokenBalanceComponent state={this.state} />;
  }
}
