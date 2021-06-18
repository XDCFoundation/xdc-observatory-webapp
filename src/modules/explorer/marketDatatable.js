import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, redarrow, greenarrow } from "@material-ui/core";
import "../../assets/styles/custom.css";
import axios from "axios";

// const MarketDataChange = [
//   { key: "Market Cap", value: "$82.69 B", change: -10.47 },
//   { key: "Fully Diluted Market Cap", value: "$261.69 B", change: 10.47 },
//   { key: "Volume (24hr)", value: "$5.28 B", change: -13.69 },
// ];
// const MarketDataNoChange = [
//   { key: "Circulating Supply", value: "12.27B XDC" },
//   { key: "Volume/Market Cap", value: "0.006061" },
//   { key: "Total Supply", value: "37,666,937,873" },
// ];
let convertToInternationalCurrencySystem = function givenCurrency(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(2) + " K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000 && num < 100000000) {
    return (num / 1000000).toFixed(2) + " M"; // convert to M for number from > 1 million
  } else if (num > 100000000) {
    return (num / 100000000).toFixed(2) + " B"; // convert to B for number from > 1 billion
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

let percentageChange = function relDiff(a, b) {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
};
export default function MarketDatatable() {
  const [postPrice, setPostPrice] = useState([]);
  useEffect(() => {
    async function fetchData4() {
      const res = await axios.get(
        "https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/getCoinMarketCap/USD"
      );
      res.data.responseData = res.data.responseData.sort((a, b) => {
        return a.lastUpdated - b.lastUpdated;
      });
      setPostPrice(res.data.responseData[1]);
      console.log(res.data.responseData[1]);
    }

    const intervalId = setInterval(() => {
      fetchData4();
    }, 1000 * 0.5); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  let volume = 0.011589107291034973;
  volume = volume.toFixed(6);

  var totalSupply = 12273893721.1;
  totalSupply = totalSupply.toLocaleString();
  return (
    // <div style={{ display: "flex", justifyContent: "center" }}>
    //   <div className="centerbox-1">
    //     <div className="market_data">
    //       <div className="heading_market">
    //         <p>Market Cap</p>
    //         <p>Fully Diluted Market Cap</p>
    //         <p>Volume(24hr)</p>
    //         <p>Circulating Supply</p>
    //         <p>Volume/Market Cap</p>
    //         <p>Total Supply</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="main_mid">
      <div className="cont1">
        <p>Market Cap</p>
        <p>${convertToInternationalCurrencySystem(7842730345.1775348)}</p>
        <p>
          &nbsp;
          {percentageChange(791078980.4354044, 784273034.1775348).toFixed(2)}%
        </p>
      </div>
      <div className="cont1">
        <p>Fully Diluted Market Cap</p>
        <p>${convertToInternationalCurrencySystem(2407273487.0708227)}</p>
        <p>
          &nbsp;
          {percentageChange(791078980.4354044, 784273034.1775348).toFixed(2)}%
        </p>
      </div>
      <div className="cont1">
        <p>Volume(24hr)</p>
        <p>${convertToInternationalCurrencySystem(9089024.33854899)}</p>
        <p>
          &nbsp;
          {percentageChange(791078980.4354044, 784273034.1775348).toFixed(2)}%
        </p>
      </div>
      <div className="cont1">
        <p>Circulating Supply</p>
        <p>{convertToInternationalCurrencySystem(12273893721.1)} XDC</p>
      </div>
      <div className="cont1">
        <p>Volume/Market Cap</p>
        <p>{volume}</p>
      </div>
      <div className="cont1">
        <p>Total Supply</p>
        <p>{totalSupply}</p>
      </div>
    </div>
  );
}
