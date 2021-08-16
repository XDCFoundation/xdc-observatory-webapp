import React, { useState, useEffect } from "react";
import "../../assets/styles/custom.css";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import ReactHtmlParser from "react-html-parser";

let convertToInternationalCurrencySystem = function givenCurrency(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + " K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000 && num < 100000000) {
        return (num / 1000000).toFixed(2) + " M"; // convert to M for number from > 1 million && < 1 billion
    } else if (num > 100000000) {
        return (num / 100000000).toFixed(2) + " B"; // convert to B for number from > 1 billion
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
};

let percentageChange = function differenceBtwNumbers(a, b) {
    return ((a - b) * 100) / b;
};


export default function TokenMarketDataTable(props) {
    console.log('test',props.marketCap)
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
    let FullyDilutedMarketCapchange = percentageChange(200442570, 305578852).toFixed(2);

    /* Calculating marketCap change percentege */
    // let LatestVolume = postLatestMarket.volume
    // let PreviousVolume = postPreviousMarket.volume
    let Volumechange = percentageChange(600, 670).toFixed(2);


    let MarketCapValue = convertToInternationalCurrencySystem(5824785458) //marketCap
    let FullyDilutedMarketCapValue = convertToInternationalCurrencySystem(5888300556) //Fully Diluted Market Cap
    let volumeValue = convertToInternationalCurrencySystem(15258335585) //volume(24hr)
    let circulatingSupplyValue = convertToInternationalCurrencySystem(2554856348); //circulatingSupply
    let volumeMarketcap = 0.25887954; //volumeMarketCap
    let vmc = parseFloat(volumeMarketcap).toFixed(6);

    var totalSupplyValue = 25425328688//totalSupply
    totalSupplyValue = totalSupplyValue.toLocaleString();
    let activeCurrency = window.localStorage.getItem('currency')
    let CurrencySymbol = ''
    let marketCapVal = 0
    let totalSupplyVal = 0
    let circulatingSupplyVal = 0
    let fullyDilutedMarketCapmarketCapVal = 0
    let tokenPriceVal = 0
    let val24 = 0
    let symbol = ''
    if(props.marketCap){
        symbol = props.marketCap.symbol
   if (activeCurrency == 'USD') {
        CurrencySymbol = '<i class="fa fa-usd" aria-hidden="true"></i> '
         marketCapVal = props.marketCap.parseDataUSD.marketCap.toFixed(2)
         totalSupplyVal = props.marketCap.parseDataUSD.totalSupply.toFixed(2)
         circulatingSupplyVal = props.marketCap.parseDataUSD.circulatingSupply.toFixed(2)
         fullyDilutedMarketCapmarketCapVal = props.marketCap.parseDataUSD.fullyDilutedMarketCap.toFixed(2)
         tokenPriceVal = props.marketCap.parseDataUSD.tokenPrice.toFixed(2)
         val24 = props.marketCap.parseDataUSD.volume24_hr.toFixed(2)
    } else if (activeCurrency == 'EUR') {
        CurrencySymbol = "<i class='fa fa-eur' aria-hidden='true'></i> "
         marketCapVal = props.marketCap.parseDataEUR.marketCap.toFixed(2)
         totalSupplyVal = props.marketCap.parseDataEUR.totalSupply.toFixed(2)
         circulatingSupplyVal = props.marketCap.parseDataEUR.circulatingSupply.toFixed(2)
         fullyDilutedMarketCapmarketCapVal = props.marketCap.parseDataEUR.fullyDilutedMarketCap.toFixed(2)
         tokenPriceVal = props.marketCap.parseDataEUR.tokenPrice.toFixed(2)
         val24 = props.marketCap.parseDataEUR.volume24_hr.toFixed(2)
    }else if (activeCurrency == 'INR') {
        CurrencySymbol = "<i class='fa fa-inr' aria-hidden='true'></i> "
         marketCapVal = props.marketCap.parseDataINR.marketCap.toFixed(2)
         totalSupplyVal = props.marketCap.parseDataINR.totalSupply.toFixed(2)
         circulatingSupplyVal = props.marketCap.parseDataINR.circulatingSupply.toFixed(2)
         fullyDilutedMarketCapmarketCapVal = props.marketCap.parseDataINR.fullyDilutedMarketCap.toFixed(2)
         tokenPriceVal = props.marketCap.parseDataINR.tokenPrice.toFixed(2)
         val24 = props.marketCap.parseDataINR.volume24_hr.toFixed(2)
    }else{
        CurrencySymbol = '<i class="fa fa-usd" aria-hidden="true"></i> '
         marketCapVal = props.marketCap.parseDataUSD.marketCap.toFixed(2)
         totalSupplyVal = props.marketCap.parseDataUSD.totalSupply.toFixed(2)
         circulatingSupplyVal = props.marketCap.parseDataUSD.circulatingSupply.toFixed(2)
         fullyDilutedMarketCapmarketCapVal = props.marketCap.parseDataUSD.fullyDilutedMarketCap.toFixed(2)
         tokenPriceVal = props.marketCap.parseDataUSD.tokenPrice.toFixed(2)
         val24 = props.marketCap.parseDataUSD.volume24_hr.toFixed(2)
    }
}
    return (

        <div className="main_mid">
            <div className="cont1">
                <p>Market Cap</p>
                <p>{ReactHtmlParser(CurrencySymbol)}{marketCapVal}</p>
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
            <div className="cont1">
                <p>Fully Diluted Market Cap</p>
                <p>{ReactHtmlParser(CurrencySymbol)}{fullyDilutedMarketCapmarketCapVal}</p>
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
            <div className="cont1">
                <p>Volume (24hr)</p>
                <p>{ReactHtmlParser(CurrencySymbol)}{val24}</p>
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
            <div className="cont1">
                <p>Circulating Supply</p>
                <p>{circulatingSupplyVal} {symbol}</p>
            </div>

            <div className="cont1">
                <p>Total Supply</p>
                <p>{totalSupplyVal}</p>
            </div>
        </div>
    );
}
