import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";

const GraphContainer = styled.div`
  margin: 20px 0 0 0;
`;
function TokenBalanceGraphComponent(props) {
  console.log(props.state.graphData, "props.state.graphData");
  const options = {
    title: {
      text: "",
    },
    chart: {
      type: "column",
    },
    legend: {
      layout: "horizontal",
      align: "center",
      enabled: true,
    },
    tooltip: {
      split: false,
    },
    series: [
      {
        showInLegend: true,
        data: props.state.sentAmountSeries,
        name: "Sent (out)",
      },
      {
        showInLegend: true,
        data: props.state.receiveAmountSeries,
        name: "Receive (in)",
      },
    ],
    credits: { enabled: false },
    yAxis: [
      {
        opposite: false,
        title: { text: "Transfer Amounts" },
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

  return (
    <GraphContainer>
      <Graph options={options} />
    </GraphContainer>
  );
}

export default TokenBalanceGraphComponent;
