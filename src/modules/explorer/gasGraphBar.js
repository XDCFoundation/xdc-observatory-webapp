import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import "../../assets/styles/custom.css";
import moment from "moment";
import { TransactionService } from "../../services";
import Utils from "../../utility";
import styled from "styled-components";
import coinMarketService from "../../services/coinMarket";

const toolTipElement = (props) => {
  let activeCurrency = window.localStorage.getItem("currency");
  let currencySymbol = activeCurrency === "INR" ? "INR" : activeCurrency === "USD" ? "USD" : "EUR"
  return (
    <div>
      <div className="Tooltip-graph">
        <p className="Tooltip-graph-date">{props.point?.data?.x}</p>
        <p className="Tooltip-graph-tx">
          Avg Transaction Fee({currencySymbol}): {(props.point?.data?.y).toFixed(8)}
        </p>
      </div>
      {/* {console.log("props", props)} */}
      <div class="outer-oval-trans">
        <div class="Oval"></div>
      </div>
    </div>
  );
};
const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    margin={{ left: 60, bottom: 5, top: 5 }}
    data={data}
    tooltip={toolTipElement}
    // colors={{ scheme: "category10" }}
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

      tickValues: 3,
    }}
    enableGridX={false}
    enableGridY={false}
    // colors={{ scheme: 'purple_blue' }}
    enablePoints={false}
    pointSize={10}
    pointColor={{ theme: "background" }}
    enableCrosshair={false}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableArea={true}
    useMesh={true}
    legends={[]}
    theme={{ fontSize: 11, fontFamily: "Inter", textColor: "#9fa9ba" }}
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
  const [coinmarketcap, setCoinmarketcap] = useState("");
  const [graphTransactions, setGraphTransactions] = useState([]);

  let CurrencyValue = window.localStorage.getItem("currency");
  useEffect(async () => {
    console.log("In useEffect")
    let coinmarketCapValue = await getcoinMarketCapData()

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
        id: "GasPrice",
        color: "hsl(248, 70%, 50%)",
        data: [],
      },
    ];

    var resultData = [];

    transactionGraph.map((items) => {
      let covertedFee = (Utils.decimalDivisonOnly(items?.avgGasPrice, 8) * coinmarketCapValue[coinmarketCapValue.length-1].price)
      let covertedfeeFixed = covertedFee.toFixed(8)
      resultData.push({
        x: items.day,
        y: parseFloat(covertedfeeFixed),
        // z: coinmarketCapValue[coinmarketCapValue.length-1].price,
      });
    });

    let graphdata = resultData;
    // console.log("graph data",graphdata)
    graphdata.reverse();
    arr[0].data = resultData;
    setData(arr);
  }, []);
  const getcoinMarketCapData = async () => {
    let urlPath = `${CurrencyValue}`;
    let [error, coinMarket] = await Utils.parseResponse(
      coinMarketService.getCoinMarketData(urlPath, {})
    );
    if (error || !coinMarket) return;
    setCoinmarketcap(coinMarket[0])
    return coinMarket;
  };
  // {console.log("coinmarketcap",coinmarketcap)}
  let length = graphTransactions ? graphTransactions?.length : "";

  const firstDate =
    graphTransactions && graphTransactions?.length === 0
      ? ""
      : moment(graphTransactions[length - 1]?.day).format("D MMM");
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
