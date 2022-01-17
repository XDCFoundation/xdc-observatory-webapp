import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";
import BaseComponent from "../../../baseComponent";
import TokenListComponent from "../../../tokenList/tokenList";
import utility from "../../../../utility";
import accounts from "../../../../services/accounts";
import { useParams } from "react-router-dom";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";
import Highcharts from "highcharts/highstock";

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row;
  margin: 20px;
`;

export default function WrappedComponent(props) {
  const { addr } = useParams();
  return (
    <TokenTransferCountGraph
      address={addr}
      contractAddress={props.contractAddress}
    />
  );
}

class TokenTransferCountGraph extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        loading: false,
      },
    };
  }

  componentDidMount = () => {
    this.getTokenTransfer();
  };

  async getTokenTransfer() {
    this.setState({ loading: true });
    const userAddress = this.props.address;
    const tokenAddress = this.props.contractAddress;
    let request = {
      walletAddress: userAddress,
      tokenAddress: tokenAddress,
      from: moment().subtract(2, "month").valueOf(),
      to: moment().valueOf(),
    };
    let [error, response] = await utility.parseResponse(
      accounts.getTokenTransferCount(request)
    );
    this.setState({ loading: false });
    if (error || !response) {
      this.generateGraphData([]);
      return;
    }
    this.generateGraphData(response);
  }

  generateGraphData(data) {
    data = data.sort((itemA, itemB) => {
      return itemA.date - itemB.date;
    });
    const totalTransferData = [];
    const inBoundData = [];
    const outBoundData = [];
    const uniqueAddressSent = [];
    const uniqueAddressReceived = [];
    for (let index = 0; index < data.length; index++) {
      const x = data[index].date;
      totalTransferData.push({ x, y: data[index].totalTransfers });
      inBoundData.push({ x, y: data[index].inBoundTransfer });
      outBoundData.push({ x, y: data[index].outBoundTransfer });
      uniqueAddressSent.push({
        x,
        y: data[index].uniqueAddressesSent,
      });
      uniqueAddressReceived.push({
        x,
        y: data[index].uniqueAddressesReceived,
      });
    }
    let options = {
      title: {
        text: "",
      },
      chart: {
        type: "line",
      },
      legend: {
        layout: "horizontal",
        align: "center",
        enabled: true,
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        backgroundColor: "#FFFFFF",
        useHTML: true,
        labelFormatter: function () {
          let legend = "<div style='display:flex; align-items: center;'>";
          if (this.name == "Outbound Transfers Counts") {
            legend +=
              "<img style='margin:5px' src='/images/graph-triangle.svg' />";
          }
          if (this.name == "Inbound Transfers Counts") {
            legend +=
              "<img style='margin:5px' src='/images/graph-triangle-red.svg' />";
          }
          if (this.name == "Total Transfers") {
            legend +=
              "<img style='margin:5px' src='/images/graph-circle-blue.svg' />";
          }
          if (this.name == "Unique Address Sent") {
            legend +=
              "<img style='margin:5px' src='/images/graph-triangle.svg' />";
          }
          if (this.name == "Unique Address Received") {
            legend +=
              "<img style='margin:5px' src='/images/graph-triangle-red.svg' />";
          }

          return (legend +=
            "<div style='margin:5px 5px 5px 0'>" +
            this.name +
            "</div>" +
            "</div>");
        },
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      rangeSelector: {
        enabled: true,
        buttons: [
          {
            type: "all",
            text: "All",
          },
          {
            type: "year",
            count: 1,
            text: "1y",
          },
          {
            type: "month",
            count: 6,
            text: "6m",
          },
          {
            type: "month",
            count: 3,
            text: "3m",
          },
          {
            type: "month",
            count: 1,
            text: "1m",
          },
        ],
        buttonSpacing: 10,

        buttonTheme: {
          style: {
            fill: "none",
          },
          stroke: "none",
          fontWeight: "bold",
          width: null,
          height: 25,
          "stroke-width": 0,
          r: 5,
          states: {
            hover: {
              fill: "#4878ff",
              style: {
                color: "white",
              },
            },
            select: {
              fill: "#4878ff",
              style: {
                color: "white",
              },
            },
          },
        },
        inputBoxBorderColor: "#e3e7eb",
        inputBoxWidth: 85,
        inputBoxHeight: 25,
        inputDateFormat: "%d-%m-%Y",
        inputStyle: {
          color: "#2a2a2a",
        },
        labelStyle: {
          color: "#252525",
          fontWeight: "bold",
          fontSize: 10,
        },
      },
      tooltip: {
        split: false,
        shared: true,
      },
      series: [
        {
          data: totalTransferData,
          type: "column",
          color: "rgb(124, 181, 236)",
          name: "Total Transfers",
        },
        {
          data: outBoundData,
          type: "line",
          color: "rgb(67, 67, 72)",
          name: "Outbound Transfers Counts",
        },
        {
          data: inBoundData,
          type: "line",
          color: "rgb(144, 237, 125)",
          name: "Inbound Transfers Counts",
        },
        {
          data: uniqueAddressSent,
          type: "line",
          color: "rgb(247, 163, 92)",
          name: "Unique Address Sent",
        },
        {
          data: uniqueAddressReceived,
          type: "line",
          color: "rgb(128, 133, 233)",
          name: "Unique Address Received",
        },
      ],
      credits: { enabled: false },
      yAxis: [
        {
          opposite: false,
          title: { text: "Transfer Counts" },
        },
      ],
      xAxis: [
        {
          showInLegend: false,
          opposite: false,
          title: { text: "" },
          labels: {
            formatter: function () {
              return Highcharts.dateFormat("%d-%m-%Y", this.value);
            },
          },
        },
      ],
    };
    this.setState({ options });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <ProgressBarContainer>
            <CircularProgress size={40} />
          </ProgressBarContainer>
        ) : (
          <Graph options={this.state.options} />
        )}
      </div>
    );
  }
}
