import React, { useState, useEffect } from "react";
import "../../assets/styles/custom.css";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { CoinMarketService } from '../../services'
import Utils from '../../utility'


let convertToInternationalCurrencySystem = function givenCurrency(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + " K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 999999 && num < 999999999) {
        return (num / 1000000).toFixed(2) + " M"; // convert to M for number from > 1 million && < 1 billion
    } else if (num > 1000000000) {
        return (num / 1000000000).toFixed(2) + " B"; // convert to B for number from > 1 billion
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
};

let percentageChange = function relDiff(a, b) {
    return ((a - b) * 100) / b;
};


export default function MarketDatatable() {
    const [postLatestMarket, setLatestMarket] = useState([]);
    const [postPreviousMarket, setPreviousMarket] = useState([]);

    useEffect(async () => {
        let [error, totalcoinMarketData] = await Utils.parseResponse(CoinMarketService.getCoinMarketData())

        if (error || !totalcoinMarketData)
            return
        totalcoinMarketData = totalcoinMarketData.sort((a, b) => {
            return a.lastUpdated - b.lastUpdated;
        });
        if (error || !totalcoinMarketData)
            return
        setLatestMarket(totalcoinMarketData[1]);
        setPreviousMarket(totalcoinMarketData[0]);
        const interval = setInterval(async () => {

            let [error, totalcoinMarketData] = await Utils.parseResponse(CoinMarketService.getCoinMarketData())
            if (error || !totalcoinMarketData)
                return
            setLatestMarket(totalcoinMarketData[1]);
            setPreviousMarket(totalcoinMarketData[0]);
        }, 45000)
    }, []);

    /* Calculating marketCap change percentege */
    let LatestMarketCap = postLatestMarket.marketCap
    let PreviousMarketCap = postPreviousMarket.marketCap
    let MarketCapchange = percentageChange(LatestMarketCap, PreviousMarketCap).toFixed(2);

    /* Calculating marketCap change percentege */
    let Latestfdmc = postLatestMarket.fullyDilutedMarketCap
    let Previousfdmc = postPreviousMarket.fullyDilutedMarketCap
    let FullyDilutedMarketCapchange = percentageChange(Latestfdmc, Previousfdmc).toFixed(2);

    /* Calculating marketCap change percentege */
    let LatestVolume = postLatestMarket.volume
    let PreviousVolume = postPreviousMarket.volume
    let Volumechange = percentageChange(LatestVolume, PreviousVolume).toFixed(2);


    let MarketCapValue = convertToInternationalCurrencySystem(postLatestMarket.marketCap) //marketCap
    let FullyDilutedMarketCapValue = convertToInternationalCurrencySystem(postLatestMarket.fullyDilutedMarketCap) //Fully Diluted Market Cap
    let volumeValue = convertToInternationalCurrencySystem(postLatestMarket.volume) //volume(24hr)
    let circulatingSupplyValue = convertToInternationalCurrencySystem(postLatestMarket.circulatingSupply); //circulatingSupply
    let volumeMarketcap = postLatestMarket.volumeMarketCap; //volumeMarketCap
    let vmc = parseFloat(volumeMarketcap).toFixed(6);

    var totalSupplyValue = Math.round(postLatestMarket.totalSupply); //totalSupply
    totalSupplyValue = totalSupplyValue.toLocaleString();

    return (

        <div className="main_mid">
            <div className="cont1">
                <p>Market Cap</p>
                <p>${MarketCapValue}</p>
                <div
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
                </div>
            </div>
            <div className="cont1">
                <p>Fully Diluted Market Cap</p>
                <p>${FullyDilutedMarketCapValue}</p>
                <div
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
                </div>
            </div>
            <div className="cont1">
                <p>Volume (24hr)</p>
                <p>${volumeValue}</p>
                <div
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
                </div>
            </div>
            <div className="cont1">
                <p>Circulating Supply</p>
                <p>{circulatingSupplyValue} XDC</p>
            </div>
            <div className="cont1">
                <p>Volume/Market Cap</p>
                <p>{vmc}</p>
            </div>
            <div className="cont1">
                <p>Total Supply</p>
                <p>{totalSupplyValue}</p>
            </div>
        </div>
    );
}
