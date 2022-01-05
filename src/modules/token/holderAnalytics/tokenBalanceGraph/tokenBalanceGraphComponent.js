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
        data: props.state.graphData,
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
