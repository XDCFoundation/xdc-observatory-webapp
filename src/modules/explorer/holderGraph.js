import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ResponsiveLine } from "@nivo/line";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import Utils from "../../utility";
import TokenData from "../../services/token";
import moment from "moment";

const GraphSize = styled.div`
  height: 8.75rem;
  width: auto;
  margin-top: 1rem;
  [stroke="url(#someGradientId)"] {
    stroke: #c16c17;
  }
  @media (max-width: 767px) {
    height: 102px;
  }
`;

const height = 140;
const width = "none";

const gradProps = {
  gradientUnits: "userSpaceOnUse",
  x1: "0",
  y1: "0",
  x2: "0",
  y2: height,
};

const toolTipElement = (props) => {
  return (
    <div>
      <div className="Tooltip-graph">
        <p className="Tooltip-graph-date">{props.point?.data?.x}</p>
        <p className="Tooltip-graph-tx">Holders: {props.point?.data?.y}</p>
      </div>
      <div class="outer-oval">
        <div class="Oval"></div>
      </div>
      {/* <h1 className="dot-point">.</h1> */}
    </div>
  );
};
const MyResponsiveLine = ({ data }) => (
  <GraphSize>
    <ResponsiveLine
      data={data}
      tooltip={toolTipElement}
      margin={{ left: 40, bottom: 5, top: 10 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
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
      }}
      enableGridX={false}
      enableGridY={false}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={0.1}
      //colors={{ scheme: 'nivo' }}
      colors={["url(#someGradientId)"]}
      enableCrosshair={false}
      useMesh={true}
      theme={{ fontSize: 11, fontFamily: "Inter", textColor: "#9fa9ba" }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
    <svg>
      <defs>
        <linearGradient id="someGradientId" {...gradProps}>
          <stop offset="50%" stopColor="#c16c17" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  </GraphSize>
);

export default function App() {
  const [data, setData] = useState([]);
  const [graphTransactions, setGraphTransactions] = useState([]);
  const { address } = useParams();
  useEffect(async () => {
    let urlPath = `${address}`;
    let [error, transactionGraph] = await Utils.parseResponse(
      TokenData.getSomeDaysHolders(urlPath, {})
    );
    if (error || !transactionGraph) return;
    setGraphTransactions(transactionGraph);
    var arr = [
      {
        id: "Transaction",
        color: "hsl(248, 70%, 50%)",
        data: [],
      },
    ];

    var resultData = [];
    transactionGraph.map((items) => {
      let age = moment(items.date).format("D MMM YYYY");
      resultData.push({
        x: age,
        y: items.count,
      });
    });

    arr[0].data = resultData;
    setData(arr);
  }, []);

  let length = graphTransactions ? graphTransactions?.length : "";
  const firstDate =
    graphTransactions && graphTransactions?.length == 0
      ? ""
      : moment(graphTransactions[length - 1]?.date).format("D MMM");
  const lastDate =
    graphTransactions && graphTransactions?.length == 0
      ? ""
      : moment(graphTransactions[0]?.date).format("D MMM");
  return (
    <div>
      <MyResponsiveLine data={data} />
      <div className="dates">
        <p>{lastDate}</p>
        <p>{firstDate}</p>
      </div>

      {/* </div> */}
    </div>
  );
}
