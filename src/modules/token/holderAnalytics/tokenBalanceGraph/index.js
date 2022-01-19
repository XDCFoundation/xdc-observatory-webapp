import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";
import { CircularProgress } from "@material-ui/core";
import Highcharts from "highcharts/highstock";

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

function TokenBalanceGraphComponent(props) {
  const graphData = props.graphData.map((data) => {
    data.x = data.date;
    data.y = Math.abs(Number(data.currentBalance.toFixed(2)));
    return data;
  });

  const options = {
    title: {
      text: "",
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
        if (this.name == "Token Balance") {
          legend +=
            "<img style='margin:5px' src='/images/graph-circle-blue.svg' />";
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
        fontSize: 10,
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
        showInLegend: true,
        data: graphData,
        name: "Token Balance",
        type: "line",
      },
    ],
    credits: { enabled: false },
    yAxis: [
      {
        opposite: false,
        title: { text: "Token Balance" },
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

  return (
    <div>
      {props.loading ? (
        <props.ProgressBarContainer>
          <CircularProgress size={40} />
        </props.ProgressBarContainer>
      ) : (
          <span>
              {props.graphData.length == 0 ?
                  <NoDataFoundContainer>
                    <img
                        src={require("../../../../../src/assets/images/XDC-Alert.svg")}
                    ></img>

                    <div>No Data found.</div>
                  </NoDataFoundContainer>
                  :
                  <Graph options={options}/>
              }
            </span>
      )}
    </div>
  );
}

export default TokenBalanceGraphComponent;
