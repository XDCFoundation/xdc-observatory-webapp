import React, { Component } from "react";
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


class MarketDatatable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postLatestMarket: [],
            postPreviousMarket: []

        }
    }

    async componentDidMount() {
        await this.getMarketData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currency !== this.props.currency) {
            this.getMarketData();
        }

    }
    async getMarketData() {
        let [error, totalcoinMarketData] = await Utils.parseResponse(CoinMarketService.getCoinMarketData(this.props.currency, {}))

        if (error || !totalcoinMarketData)
            return
        totalcoinMarketData = totalcoinMarketData.sort((a, b) => {
            return a.lastUpdated - b.lastUpdated;
        });
        if (error || !totalcoinMarketData)
            return
        this.setState({ postLatestMarket: totalcoinMarketData[1] })
        this.setState({ postPreviousMarket: totalcoinMarketData[0] })
        const interval = setInterval(async () => {

            let [error, totalcoinMarketData] = await Utils.parseResponse(CoinMarketService.getCoinMarketData(this.props.currency, {}))
            if (error || !totalcoinMarketData)
                return
            this.setState({ postLatestMarket: totalcoinMarketData[1] })
            this.setState({ postPreviousMarket: totalcoinMarketData[0] })
        }, 90000)
    }

    render() {
        /* Calculating marketCap change percentege */
        const LatestMarketCap = this.state.postLatestMarket.marketCap
        const PreviousMarketCap = this.state.postPreviousMarket.marketCap
        const MarketCapchange = LatestMarketCap && PreviousMarketCap ? percentageChange(LatestMarketCap, PreviousMarketCap).toFixed(2) : 0;

        /* Calculating marketCap change percentege */
        const Latestfdmc = this.state.postLatestMarket.fullyDilutedMarketCap
        const Previousfdmc = this.state.postPreviousMarket.fullyDilutedMarketCap
        const FullyDilutedMarketCapchange = Previousfdmc && Latestfdmc ? percentageChange(Latestfdmc, Previousfdmc).toFixed(2) : 0;

        /* Calculating marketCap change percentege */
        const LatestVolume = this.state.postLatestMarket.volume
        const PreviousVolume = this.state.postPreviousMarket.volume
        const Volumechange = LatestVolume && PreviousVolume ? percentageChange(LatestVolume, PreviousVolume).toFixed(2) : 0;


        const MarketCapValue = convertToInternationalCurrencySystem(this.state.postLatestMarket.marketCap) //marketCap
        const FullyDilutedMarketCapValue = convertToInternationalCurrencySystem(this.state.postLatestMarket.fullyDilutedMarketCap) //Fully Diluted Market Cap
        const volumeValue = convertToInternationalCurrencySystem(this.state.postLatestMarket.volume) //volume(24hr)
        const circulatingSupplyValue = convertToInternationalCurrencySystem(this.state.postLatestMarket.circulatingSupply); //circulatingSupply
        const volumeMarketcap = this.state.postLatestMarket.volumeMarketCap; //volumeMarketCap
        const vmc = volumeMarketcap ? parseFloat(volumeMarketcap).toFixed(6) : 0;

        let totalSupplyValue = Math.round(this.state.postLatestMarket.totalSupply); //totalSupply
        totalSupplyValue = totalSupplyValue ? totalSupplyValue.toLocaleString() : 0;

        const currencySymbol = this.props.currency === "INR" ? "₹ " : this.props.currency === "USD" ? "$ " : "€ "
        return (

            <div className="main_mid">
                <div className="cont1">
                    <p>Market Cap</p>
                    <p>{currencySymbol}{MarketCapValue ? MarketCapValue : 0}</p>
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
                    <p>{currencySymbol}{FullyDilutedMarketCapValue ? FullyDilutedMarketCapValue : 0}</p>
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
                    <p>{currencySymbol}{volumeValue ? volumeValue : 0}</p>
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
                    <p>{circulatingSupplyValue ? circulatingSupplyValue : 0} XDC</p>
                </div>

                <div className="cont1">
                    <p>Total Supply</p>
                    <p>{!totalSupplyValue ? 0 : totalSupplyValue}</p>
                </div>
            </div>
        );
    }

}

export default MarketDatatable;
