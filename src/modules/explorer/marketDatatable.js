import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, redarrow, greenarrow } from "@material-ui/core";
import "../../assets/styles/custom.css";
import axios from "axios";

const MarketDataChange = [
  { key: "Market Cap", value: "$82.69 B", change: -10.47 },
  { key: "Fully Diluted Market Cap", value: "$261.69 B", change: 10.47 },
  { key: "Volume (24hr)", value: "$5.28 B", change: -13.69 },
];
const MarketDataNoChange = [
  { key: "Circulating Supply", value: "12.27B XDC" },
  { key: "Volume/Market Cap", value: "0.006061" },
  { key: "Total Supply", value: "37,666,937,873" },
];

export default function MarketDatatable() {
  const [MarketDataChange, setMarketDataChange] = useState([{}]);
  useEffect(() => {
    async function fetchData4() {
      const res = await axios.get(
        "https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/getCoinMarketCap/USD"
      );
      res.data.responseData = res.data.responseData.sort((a, b) => {
        return a.lastUpdated - b.lastUpdated;
      });
      setMarketDataChange(res.data.responseData[1]);
      console.log(res.data.responseData[1]);
    }
    let valueChange;
    const intervalId = setInterval(() => {
      fetchData4();
    }, 1000 * 0.5); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="centerbox-1">
        <p style={{ backgroundColor: "red" }}></p>
        <div className="main-form-container">
          <Grid>
            <Grid container>
              {MarketDataChange.map((e) => {
                return (
                  <Grid align="center" md={2}>
                    <Grid className="TableHeaders">{key}</Grid>
                    <Grid style={{ marginTop: 7 }} className="TableTexts">
                      {value}
                    </Grid>
                    {change < 0 ? (
                      <span
                        className="XDCPriceDropText"
                        style={{ color: "red" }}
                      >
                        <img
                          style={{
                            width: "8px",
                            height: "6px",
                            margin: "6px 4px 5px 0",
                          }}
                          src={require("../../../src/assets/images/down-red.png")}
                        ></img>{" "}
                        &nbsp;{change}%
                      </span>
                    ) : (
                      <span
                        className="XDCPriceDropText"
                        style={{ color: "green" }}
                      >
                        <img
                          style={{
                            width: "8px",
                            height: "6px",
                            margin: "6px 4px 5px 0",
                          }}
                          src={require("../../../src/assets/images/up-green.png")}
                        ></img>{" "}
                        &nbsp;{change}%
                      </span>
                    )}
                  </Grid>
                );
              })}

              {MarketDataNoChange.map((z) => {
                return (
                  <Grid align="center" md={2}>
                    <Box>
                      <Grid className="TableHeaders">{key}</Grid>
                      <Grid style={{ marginTop: 7 }} className="TableTexts">
                        {value}
                      </Grid>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

// function convertToInternationalCurrencySystem (labelValue) {

//     // Nine Zeroes for Billionsreturn Math.abs(Number(labelValue)) >= 1.0e+9

//     ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"// Six Zeroes for Millions
//     : Math.abs(Number(labelValue)) >= 1.0e+6

//     ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"// Three Zeroes for Thousands
//     : Math.abs(Number(labelValue)) >= 1.0e+3

//     ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

//     : Math.abs(Number(labelValue));

// }
