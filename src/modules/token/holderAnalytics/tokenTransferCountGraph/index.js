import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";

const GraphContainer = styled.div`
  margin: 20px 0 0 0;
`;
function TokenBalanceGraphComponent(props) {
  let receiveAmountSeries = [],
    sentAmountSeries = [];
  props.graphData.map((data) => {
    sentAmountSeries.push({
      x: data.date,
      y: data.toAmount,
    });
    receiveAmountSeries.push({
      x: data.date,
      y: data.fromAmount,
    });
  });

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
        data: sentAmountSeries,
        name: "Sent (out)",
      },
      {
        showInLegend: true,
        data: receiveAmountSeries,
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
