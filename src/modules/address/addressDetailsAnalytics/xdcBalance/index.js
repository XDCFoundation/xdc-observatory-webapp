import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";
import BaseComponent from "../../../baseComponent";
import { useParams } from "react-router-dom";
import accounts from "../../../../services/accounts";
import utility from "../../../../utility";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row;
  margin: 20px;
`;
const NoDataFoundContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  gap: 10px;
  @media (min-width: 767px) {
    margin: 100px !important;
  }
`;

export default function WrappedComponent() {
  const { addr } = useParams();
  return <XDCBalanceGraph address={addr} />;
}

class XDCBalanceGraph extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      graphData:[]
    };
  }

  componentDidMount = () => {
    this.getAddressAnalyticsData();
  };

  getAddressAnalyticsData = async () => {
    this.setState({ loading: true });
    const address = this.props.address;
    const request = {
      address: address,
      from: moment().subtract(2, "month").valueOf(),
      to: moment().valueOf(),
      currency: "USD", // only in case of balance
      type: "XDC_BALANCE",
    };
    let [error, response] = await utility.parseResponse(
      accounts.getAddressAnalytics(request)
    );
    if (error || !response) {
      this.setState({ loading: false });
      this.generateGraphData([]);
      return;
    }
    this.setState({ loading: false, graphData:response });
    this.generateGraphData(response);
  };

  generateGraphData = (data) => {
    // const data = [
    //     {
    //         "date": 1641969404000,
    //         "toAmount": 0,
    //         "fromAmount": 0,
    //         "totalDocument": 3857,
    //         "totalAmount": 0,
    //         "currentBalance": 5000000001865,
    //         "priceInUSD": 0.10371446281249
    //     },
    //     {
    //         "date": 1642035987000,
    //         "toAmount": 0,
    //         "fromAmount": 0,
    //         "totalDocument": 6857,
    //         "totalAmount": 0,
    //         "currentBalance": 8000000001865,
    //         "priceInUSD": 1.10371446281249
    //     }
    // ];
    const xdcBalance = [];
    const historicUSDPrice = [];
    const transactionCount = [];
    for (let index = 0; index < data.length; index++) {
      const x = data[index].date;
      xdcBalance.push({ x, y: data[index].currentBalance / 10 ** 18 });
      historicUSDPrice.push({ x, y: data[index].priceInUSD });
      transactionCount.push({ x, y: data[index].totalDocument });
    }

    let options = {
      title: {
        text: "",
      },
      chart: {
        type: "line",
        zoomType: {
          enabled: false,
        },
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
          if (this.name == "XDC Account Balance") {
            legend +=
              "<img  style='margin:5px' src='/images/graph-circle-blue.svg' />";
          }
          if (this.name == "Historic USD Value") {
            legend +=
              "<img  style='margin:5px' src='/images/graph-kite.svg' />";
          }
          if (this.name == "Txn Count") {
            legend +=
              "<img  style='margin:5px' src='/images/graph-square.svg' />";
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
        labelStyle: {
          display: "none",
        },
        enabled: true,
        selected: 1,
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
        },
      },
      tooltip: {
        split: false,
        shared: true,
      },
      series: [
        {
          data: xdcBalance,
          color: "rgb(124, 181, 236)",
          name: "XDC Account Balance",
        },
        {
          data: historicUSDPrice,
          color: "rgb(67, 67, 72)",
          name: "Historic USD Value",
        },
        {
          data: transactionCount,
          color: "rgb(247, 163, 92)",
          name: "Txn Count",
        },
      ],
      credits: { enabled: false },
      yAxis: [
        {
          opposite: false,
          title: { text: "" },
        },
      ],
      xAxis: [
        {
          showInLegend: false,
          opposite: false,
          title: { text: "" },
        },
      ],
    };
    this.setState({ options });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <ProgressBarContainer>
            <CircularProgress size={40} />
          </ProgressBarContainer>
        ) : (
            <span>
              {this.state.graphData.length == 0 ?
                  <NoDataFoundContainer>
                    <img
                        src={require("../../../../../src/assets/images/XDC-Alert.svg")}
                    ></img>

                    <div>No Data found.</div>
                  </NoDataFoundContainer>
                  :
                  <Graph options={this.state.options}/>
              }
            </span>
        )}
      </div>
    );
  }
}
