import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import "../../assets/styles/custom.css";
import moment from "moment";
import { TransactionService } from "../../services";
import Utils from "../../utility";
import styled from "styled-components";
import format from "format-number";

const toolTipElement = (props) => {
  let transactionCount = Number(props.point?.data?.y);
  return (
    <div>
      <div className="Tooltip-graph">
        <p className="Tooltip-graph-date">{props.point?.data?.x}</p>
        <p className="Tooltip-graph-tx">
          Transactions: {format({})(transactionCount)}
        </p>
      </div>
      <div class="outer-oval-trans">
        <div class="Oval"></div>
      </div>
      {/* <TriangleArrowDown /> */}
    </div>
  );
};


const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    margin={{ left: 55, bottom: 5,top: 5 }}
    data={data}
    tooltip={toolTipElement}
    // colors={{ scheme: "category10" }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "-100",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    curve="monotoneX"
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={{
      orient: "left",
      tickSize: 0,
      tickPadding: 5,
      tickValues: 5,
      format: value =>
              `${Number(value).toLocaleString('EN-US', {
                  minimumFractionDigits: 0,
              })}`
    }}
    enableGridX={false}
    enableGridY={false}
    enablePoints={false}
    pointSize={10}
    pointColor={{ theme: "background" }}
    enableCrosshair={false}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={1}
    enableArea={true}
    useMesh={true}
    legends={[]}
    theme={{ fontSize: 11, fontFamily: "Inter",textColor:"#9fa9ba" }}
  />
);
const GraphSize = styled.div`
  height: 8.75rem;
  width: auto;
  margin-top: 3.19rem;
  @media (max-width: 767px) {
    height: 80px;
  }
`;
export default function App() {
  const [data, setData] = useState([]);
  const [graphTransactions, setGraphTransactions] = useState([]);

  useEffect(async () => {
    let [error, transactionGraph] = await Utils.parseResponse(
      TransactionService.getSomeDaysTransaction()
    );
    if (error || !transactionGraph) return;
    setGraphTransactions(transactionGraph);
    // alert(JSON.stringify(transactionGraph))
    setInterval(async () => {
      let [error, transactionGraph] = await Utils.parseResponse(
        TransactionService.getSomeDaysTransaction()
      );
      if (error) return;
      setGraphTransactions(transactionGraph);
      // alert(JSON.stringify(transactionGraph))
    }, 90000);

    var arr = [
      {
        id: "Transaction",
        color: "hsl(248, 70%, 50%)",
        data: [],
      },
    ];

    var resultData = [];
    transactionGraph.map((items) => {
      resultData.push({
        x: items.day,
        y: items.transactionCount,
      });
    });

    let graphdata = resultData;
    graphdata.reverse();
    arr[0].data = resultData;
    setData(arr);
  }, []);
  let length = graphTransactions ? graphTransactions?.length : "";
  // console.log(graphTransactions,"<<<")
  // let totalcoinMarketData = graphTransactions;
  // let totalcoinMarket = totalcoinMarketData.sort((a, b) => {
  //   return b.transactionCount - a.transactionCount;
  // });
  // console.log(totalcoinMarket,">??>>");
  const firstDate =
    graphTransactions && graphTransactions?.length === 0
      ? ""
      : moment(graphTransactions[length - 1]?.day)?.format("D MMM");
  const lastDate =
    graphTransactions && graphTransactions?.length === 0
      ? ""
      : moment(graphTransactions[0]?.day).format("D MMM");

  return (
    <GraphSize>
      <MyResponsiveLine data={data} />
      <div className="dates">
        <p>{firstDate}</p>
        <p>{lastDate}</p>
      </div>
    </GraphSize>
  );
}
