import React, { useState, useEffect } from "react";
import "../../assets/styles/custom.css";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import utility from "../../utility";
const DeskTopView = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: visible;
  }
`;

const MobileView = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
    display: visible;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
const Heading = styled.span`
  margin: 0px;
  color: #686868;
  font-size: 10.5px;
  font-family: "Inter";
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  ${({ theme }) => theme === "dark" && `
    color: #ffffff;
  `}
`;

let convertToInternationalCurrencySystem = function givenCurrency(num) {
  if (num > 999.99999999 && num < 1000000) {
    return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 999999.99999999 && num < 999999999.99999999) {
    return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million && < 1 billion
  } else if (num > 100000000) {
    return (num / 100000000).toFixed(2) + "B"; // convert to B for number from > 1 billion
  } else if (num < 999.99999999) {
    return num; // if value < 1000, nothing to do
  }
};

let percentageChange = function differenceBtwNumbers(a, b) {
  return ((a - b) * 100) / b;
};

export default function TokenMarketDataTable(props) {
  // const [postLatestMarket, setLatestMarket] = useState([]);
  // const [postPreviousMarket, setPreviousMarket] = useState([]);
  // useEffect(() => {
  //     async function fetchData4() {
  //         const res = await axios.get(
  //             "https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/getCoinMarketCap/USD"
  //         );
  //         res.data.responseData = res.data.responseData.sort((a, b) => {
  //             return a.lastUpdated - b.lastUpdated;
  //         });
  //         setLatestMarket(res.data.responseData[1]);
  //         setPreviousMarket(res.data.responseData[0]);
  //     }

  //     const intervalId = setInterval(() => {
  //         fetchData4();
  //     }, 1000 * 0.5); // in milliseconds
  //     return () => clearInterval(intervalId);
  // }, []);

  /* Calculating marketCap change percentege */
  // let LatestMarketCap = postLatestMarket.marketCap
  // let PreviousMarketCap = postPreviousMarket.marketCap
  let MarketCapchange = percentageChange(2055, 2255).toFixed(2);

  /* Calculating marketCap change percentege */
  // let Latestfdmc = postLatestMarket.fullyDilutedMarketCap
  // let Previousfdmc = postPreviousMarket.fullyDilutedMarketCap
  let FullyDilutedMarketCapchange = percentageChange(
    200442570,
    305578852
  ).toFixed(2);

  /* Calculating marketCap change percentege */
  // let LatestVolume = postLatestMarket.volume
  // let PreviousVolume = postPreviousMarket.volume
  let Volumechange = percentageChange(600, 670).toFixed(2);

  let MarketCapValue = convertToInternationalCurrencySystem(5824785458); //marketCap
  let FullyDilutedMarketCapValue =
    convertToInternationalCurrencySystem(5888300556); //Fully Diluted Market Cap
  let volumeValue = convertToInternationalCurrencySystem(15258335585); //volume(24hr)
  let circulatingSupplyValue = convertToInternationalCurrencySystem(2554856348); //circulatingSupply
  let volumeMarketcap = 0.25887954; //volumeMarketCap
  let vmc = parseFloat(volumeMarketcap).toFixed(6);

  var totalSupplyValue = 25425328688; //totalSupply
  // totalSupplyValue = totalSupplyValue.toLocaleString();
  let activeCurrency = props.activeCurrency;
  let CurrencySymbol = "";
  let marketCapVal = 0;
  let totalSupplyVal = 0;
  let circulatingSupplyVal = 0;
  let fullyDilutedMarketCapmarketCapVal = 0;
  let tokenPriceVal = 0;
  let val24 = 0;
  let symbol = "";
  if (props.marketCap) {
    symbol = props.marketCap.symbol;
    if (activeCurrency == "USD") {
      CurrencySymbol = "$";
      marketCapVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.marketCap
      );
      let totalSupplyValue = Math.round(
        props.marketCap.parseDataUSD.totalSupply
      ); //totalSupply
      totalSupplyVal = totalSupplyValue ? totalSupplyValue : 0;
      circulatingSupplyVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataEUR.circulatingSupply
      );
      fullyDilutedMarketCapmarketCapVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.fullyDilutedMarketCap
      );
      tokenPriceVal = props.marketCap.parseDataUSD.tokenPrice.toFixed(2);
      val24 = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.volume24_hr
      );
    } else if (activeCurrency == "EUR") {
      CurrencySymbol = "€";
      marketCapVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataEUR.marketCap
      );
      let totalSupplyValue = Math.round(
        props.marketCap.parseDataEUR.totalSupply
      ); //totalSupply
      totalSupplyVal = totalSupplyValue ? totalSupplyValue : 0;
      circulatingSupplyVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataEUR.circulatingSupply
      );
      fullyDilutedMarketCapmarketCapVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataEUR.fullyDilutedMarketCap
      );
      tokenPriceVal = props.marketCap.parseDataEUR.tokenPrice.toFixed(2);
      val24 = convertToInternationalCurrencySystem(
        props.marketCap.parseDataEUR.volume24_hr
      );
    } else if (activeCurrency == "INR") {
      CurrencySymbol = "₹";
      marketCapVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.marketCap
      );
      let totalSupplyValue = Math.round(
        props.marketCap.parseDataUSD.totalSupply
      ); //totalSupply
      totalSupplyVal = totalSupplyValue ? totalSupplyValue : 0;
      circulatingSupplyVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataEUR.circulatingSupply
      );
      fullyDilutedMarketCapmarketCapVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.fullyDilutedMarketCap
      );
      tokenPriceVal = props.marketCap.parseDataINR.tokenPrice.toFixed(2);
      val24 = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.volume24_hr
      );
    } else {
      CurrencySymbol = "$";
      marketCapVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.marketCap
      );
      let totalSupplyValue = Math.round(
        props.marketCap.parseDataUSD.totalSupply
      ); //totalSupply
      totalSupplyVal = totalSupplyValue ? totalSupplyValue : 0;
      circulatingSupplyVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataEUR.circulatingSupply
      );
      fullyDilutedMarketCapmarketCapVal = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.fullyDilutedMarketCap
      );
      tokenPriceVal = props.marketCap.parseDataUSD.tokenPrice.toFixed(2);
      val24 = convertToInternationalCurrencySystem(
        props.marketCap.parseDataUSD.volume24_hr
      );
    }
  }
  return (
    <>
      <DeskTopView>
        <div className={props.theme === "dark" ? "main_mid_token_dark" : "main_mid_token"}>
          <div className="main_child">
            <div className={props.theme === "dark" ? "cont-token-data-dark" : "cont-token-data"}>
              <Heading theme={props.theme}>Market Cap </Heading>
              <p>
                {ReactHtmlParser(CurrencySymbol)}
                {marketCapVal === 0 ? "--" : marketCapVal}
              </p>
              {/* <div
                    className={
                        MarketCapchange >= 0
                            ? "data_value_green"
                            : "data_value_red"
                    }
                >
                    <div className="varMarket">
                        {MarketCapchange >= 0 ? (
                            <div className="arrow_up">
                                <BsFillCaretUpFill size={10} />
                            </div>
                        ) : (
                            <div className="arrow_down">
                                <BsFillCaretDownFill size={10} />
                            </div>
                        )}
                        &nbsp;{MarketCapchange}%
                    </div>
                </div> */}
            </div>
            <div className={props.theme === "dark" ? "cont-token-data-dark" : "cont-token-data"}>
              <Heading theme={props.theme}>Fully Diluted Market Cap</Heading>
              <p>
                {ReactHtmlParser(CurrencySymbol)}
                {fullyDilutedMarketCapmarketCapVal === 0 ? "--" : fullyDilutedMarketCapmarketCapVal}
              </p>
              {/*<div
                    className={
                        FullyDilutedMarketCapchange >= 0
                            ? "data_value_green"
                            : "data_value_red"
                    }
                >
                    <div className="varMarket">
                        {FullyDilutedMarketCapchange >= 0 ? (
                            <div className="arrow_up">
                                <BsFillCaretUpFill size={10} />
                            </div>
                        ) : (
                            <div className="arrow_down">
                                <BsFillCaretDownFill size={10} />
                            </div>
                        )}
                        &nbsp;{FullyDilutedMarketCapchange}%
                    </div>
                </div>*/}
            </div>
            <div className={props.theme === "dark" ? "cont-token-data-dark" : "cont-token-data"}>
              <Heading theme={props.theme}>Volume (24hr)</Heading>
              <p>
                {ReactHtmlParser(CurrencySymbol)}
                {val24 === 0 ? "--" : val24}
              </p>
              {/*<div
                    className={
                        Volumechange >= 0
                            ? "data_value_green"
                            : "data_value_red"
                    }
                >
                    <div className="varMarket">
                        {Volumechange >= 0 ? (
                            <div className="arrow_up">
                                <BsFillCaretUpFill size={10} />
                            </div>
                        ) : (
                            <div className="arrow_down">
                                <BsFillCaretDownFill size={10} />
                            </div>
                        )}
                        &nbsp;{Volumechange}%
                    </div>
                </div>*/}
            </div>
          </div>
          <div className="main_sec">
            <div className={props.theme === "dark" ? "cont-token-data-dark" : "cont-token-data"}>
              <div className="cont1-child">
                <Heading theme={props.theme}>Circulating Supply</Heading>
                <p>
                  {circulatingSupplyVal === 0 ? "--" : circulatingSupplyVal} {symbol}
                </p>
              </div>
            </div>

            <div className={props.theme === "dark" ? "cont-token-data-dark cont1_align" : "cont-token-data cont1_align"}>
              <div className="cont1-child">
                <Heading theme={props.theme}>Total Supply</Heading>
                <p>
                  {totalSupplyVal === 0 ? "--" : utility.convertToInternationalCurrencySystem(totalSupplyVal)}
                </p>
              </div>
            </div>
            <div className="con"> </div>
          </div>
        </div>
      </DeskTopView>
      <MobileView>
        <div className="second_mid_token">
          <div className="second_cont">
            <div className="w-54-per">
              <p>Market Cap</p>{" "}
            </div>
            <div className="mid_cont ">
              {" "}
              <p>
                {ReactHtmlParser(CurrencySymbol)}
                {marketCapVal === 0 ? "--" : marketCapVal}
              </p>
            </div>
            {/* <div
                    className={
                        MarketCapchange >= 0
                            ? "data_value_green"
                            : "data_value_red"
                    }
                >
                    <div className="varMarket">
                        {MarketCapchange >= 0 ? (
                            <div className="arrow_up">
                                <BsFillCaretUpFill size={10} />
                            </div>
                        ) : (
                            <div className="arrow_down">
                                <BsFillCaretDownFill size={10} />
                            </div>
                        )}
                        &nbsp;{MarketCapchange}%
                    </div>
                </div> */}
          </div>
          <div className="second_cont">
            <div className="w-54-per">
              {" "}
              <p>Fully Diluted Market Cap</p>
            </div>
            <div className="mid_cont ">
              {" "}
              <p>
                {ReactHtmlParser(CurrencySymbol)}
                {fullyDilutedMarketCapmarketCapVal === 0 ? "--" : fullyDilutedMarketCapmarketCapVal}
              </p>
            </div>
            {/*<div
                    className={
                        FullyDilutedMarketCapchange >= 0
                            ? "data_value_green"
                            : "data_value_red"
                    }
                >
                    <div className="varMarket">
                        {FullyDilutedMarketCapchange >= 0 ? (
                            <div className="arrow_up">
                                <BsFillCaretUpFill size={10} />
                            </div>
                        ) : (
                            <div className="arrow_down">
                                <BsFillCaretDownFill size={10} />
                            </div>
                        )}
                        &nbsp;{FullyDilutedMarketCapchange}%
                    </div>
                </div>*/}
          </div>
          <div className="second_cont">
            <div className="w-54-per">
              {" "}
              <p>Volume (24hr)</p>
            </div>
            <div className="mid_cont ">
              <p>
                {ReactHtmlParser(CurrencySymbol)}
                {val24 === 0 ? "--" : val24}
              </p>
            </div>
            {/*<div
                    className={
                        Volumechange >= 0
                            ? "data_value_green"
                            : "data_value_red"
                    }
                >
                    <div className="varMarket">
                        {Volumechange >= 0 ? (
                            <div className="arrow_up">
                                <BsFillCaretUpFill size={10} />
                            </div>
                        ) : (
                            <div className="arrow_down">
                                <BsFillCaretDownFill size={10} />
                            </div>
                        )}
                        &nbsp;{Volumechange}%
                    </div>
                </div>*/}
          </div>
          <div className="second_cont">
            <div className="w-54-per">
              {" "}
              <p>Circulating Supply</p>
            </div>
            <div className="mid_cont">
              <p>
                {circulatingSupplyVal === 0 ? "--" : circulatingSupplyVal} {symbol}
              </p>
            </div>
          </div>

          <div className="second_cont">
            <div className="w-54-per">
              <p>Total Supply</p>
            </div>
            <div className="mid_cont">
              <p>
                {totalSupplyVal === 0 ? "--" : utility.convertToInternationalCurrencySystem(totalSupplyVal)}
              </p>
            </div>
          </div>
        </div>
      </MobileView>
    </>
  );
}
