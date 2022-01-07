import React, { Component } from "react";
import "../../assets/styles/custom.css";
import { CoinMarketService } from "../../services";
import styled from "styled-components";
import Utils from "../../utility";
import utility from "../../utility";
import Tooltip from "@material-ui/core/Tooltip";
import { messages } from "../../constants";

const DeskTopView = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: block;
  }
`;

const MobileView = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
    display: block;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MarketDataPointTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.034rem;
  justify-content: center;
  color: #686868;
  display: flex;
  flex-flow: row;
  align-item: center;
  gap: 2px;

  @media (min-width: 768px) and (max-width: 1239px) {
    font-family: Inter;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.029rem;
    height: 0.938rem;
    color: #686868;
    font-size: 0.75rem;
    opacity: 1;
  }
  @media (min-width: 350px) and (max-width: 1239px) {
    justify-content: left;
    align-item: left;
  }

  @media (min-width: 350px) and (max-width: 767px) {
    // display: block;
    color: #686868;
    display: flex;
    gap: 10px;
    flex-flow: row-reverse;
  }
`;

let convertToInternationalCurrencySystem = function givenCurrency(num) {
  if (num > 999.99999999 && num < 1000000) {
    return (num / 1000).toFixed(2) + " K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 999999.99999999 && num < 999999999.99999999) {
    return (num / 1000000).toFixed(2) + " M"; // convert to M for number from > 1 million && < 1 billion
  } else if (num > 1000000000) {
    return (num / 1000000000).toFixed(2) + " B"; // convert to B for number from > 1 billion
  } else if (num < 999.99999999) {
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
      postPreviousMarket: [],
      loading: true,
    };
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
    let [error, totalcoinMarketData] = await Utils.parseResponse(
      CoinMarketService?.getCoinMarketData(this.props.currency, {})
    );

    if (error || !totalcoinMarketData) return;
    totalcoinMarketData = totalcoinMarketData.sort((a, b) => {
      return a.lastUpdated - b.lastUpdated;
    });
    if (error || !totalcoinMarketData) return;
    this.setState({ postLatestMarket: totalcoinMarketData[1] });
    this.setState({ postPreviousMarket: totalcoinMarketData[0] });
    this.setState({ loading: false });
    setInterval(async () => {
      let [error, totalcoinMarketData] = await Utils.parseResponse(
        CoinMarketService?.getCoinMarketData(this.props.currency, {})
      );
      if (error || !totalcoinMarketData) return;
      this.setState({ postLatestMarket: totalcoinMarketData[1] });
      this.setState({ postPreviousMarket: totalcoinMarketData[0] });
    }, 90000);
  }

  render() {
    /* Calculating marketCap change percentege */
    const LatestMarketCap = this.state.postLatestMarket.marketCap;
    const PreviousMarketCap = this.state.postPreviousMarket.marketCap;
    const MarketCapchange =
      LatestMarketCap && PreviousMarketCap
        ? percentageChange(LatestMarketCap, PreviousMarketCap).toFixed(2)
        : 0;

    /* Calculating marketCap change percentege */
    const Latestfdmc = this.state.postLatestMarket.fullyDilutedMarketCap;
    const Previousfdmc = this.state.postPreviousMarket.fullyDilutedMarketCap;
    const FullyDilutedMarketCapchange =
      Previousfdmc && Latestfdmc
        ? percentageChange(Latestfdmc, Previousfdmc).toFixed(2)
        : 0;

    /* Calculating marketCap change percentege */
    const LatestVolume = this.state.postLatestMarket.volume;
    const PreviousVolume = this.state.postPreviousMarket.volume;
    const Volumechange =
      LatestVolume && PreviousVolume
        ? percentageChange(LatestVolume, PreviousVolume).toFixed(2)
        : 0;

    const MarketCapValue = convertToInternationalCurrencySystem(
      this.state.postLatestMarket.marketCap
    ); //marketCap
    const FullyDilutedMarketCapValue = convertToInternationalCurrencySystem(
      this.state.postLatestMarket.fullyDilutedMarketCap
    ); //Fully Diluted Market Cap
    const volumeValue = convertToInternationalCurrencySystem(
      this.state.postLatestMarket.volume
    ); //volume(24hr)
    const circulatingSupplyValue = convertToInternationalCurrencySystem(
      this.state.postLatestMarket.circulatingSupply
    ); //circulatingSupply
    const volumeMarketcap = this.state.postLatestMarket.volumeMarketCap; //volumeMarketCap
    // const vmc = volumeMarketcap ? parseFloat(volumeMarketcap).toFixed(6) : 0;

    let totalSupplyValue = Math.round(this.state.postLatestMarket.totalSupply); //totalSupply
    totalSupplyValue = totalSupplyValue ? totalSupplyValue : 0;

    const currencySymbol =
      this.props.currency === "INR"
        ? "₹"
        : this.props.currency === "USD"
          ? "$"
          : "€";
    return (
      <>
        <DeskTopView>
          <div className={this.state.loading === true ? "cover-spin-4" : ""}>
            <div className="main_mid">
              <div className="main_child">
                <div className="cont1">
                  <MarketDataPointTitle>
                    Market Cap
                    <Tooltip placement="top" title={messages.MARKET_CAP}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                      />
                    </Tooltip>
                  </MarketDataPointTitle>
                  <p>
                    {currencySymbol}
                    {MarketCapValue ? MarketCapValue : 0}
                  </p>
                  <div
                    className={
                      MarketCapchange >= 0
                        ? "data_value_green"
                        : "data_value_red"
                    }
                  >
                    <div className="varMarket">
                      {MarketCapchange === 0 ? (
                        ""
                      ) : MarketCapchange > 0 ? (
                        <div className="arrow_up">
                          {/* <BsFillCaretUpFill size={10} /> */}
                          <img
                            src={"/images/Up.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      ) : (
                        <div className="arrow_down">
                          {/* <BsFillCaretDownFill size={10} /> */}
                          <img
                            src={"/images/Down.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      )}
                      &nbsp;{MarketCapchange}%
                    </div>
                  </div>
                </div>
                <div className="cont1">
                  <MarketDataPointTitle>
                    Fully Diluted Market Cap
                    <Tooltip placement="top" title={messages.FDMP}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                      />
                    </Tooltip>
                  </MarketDataPointTitle>
                  <p>
                    {currencySymbol}
                    {FullyDilutedMarketCapValue
                      ? FullyDilutedMarketCapValue
                      : 0}
                  </p>
                  <div
                    className={
                      FullyDilutedMarketCapchange >= 0
                        ? "data_value_green"
                        : "data_value_red"
                    }
                  >
                    <div className="varMarket">
                      {FullyDilutedMarketCapchange == 0 ? (
                        ""
                      ) : FullyDilutedMarketCapchange > 0 ? (
                        <div className="arrow_up">
                          {/* <BsFillCaretUpFill size={10} /> */}
                          <img
                            src={"/images/Up.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      ) : (
                        <div className="arrow_down">
                          {/* <BsFillCaretDownFill size={10} /> */}
                          <img
                            src={"/images/Down.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      )}
                      &nbsp;{FullyDilutedMarketCapchange}%
                    </div>
                  </div>
                </div>
                <div className="cont1">
                  <MarketDataPointTitle>
                    Volume (24hr)
                    <Tooltip placement="top" title={messages.VOLUMEX24}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                      />
                    </Tooltip>
                  </MarketDataPointTitle>
                  <p>
                    {currencySymbol}
                    {volumeValue ? volumeValue : 0}
                  </p>
                  <div
                    className={
                      Volumechange >= 0 ? "data_value_green" : "data_value_red"
                    }
                  >
                    <div className="varMarket">
                      {Volumechange == 0 ? (
                        ""
                      ) : Volumechange > 0 ? (
                        <div className="arrow_up">
                          {/* <BsFillCaretUpFill size={10} /> */}
                          <img
                            src={"/images/Up.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      ) : (
                        <div className="arrow_down">
                          {/* <BsFillCaretDownFill size={10} /> */}
                          <img
                            src={"/images/Down.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      )}
                      &nbsp;{Volumechange}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_sec">
                <div className="cont1">
                  <div className="cont1-child">
                    <MarketDataPointTitle>
                      Circulating Supply
                      <Tooltip
                        placement="top"
                        title={messages.CIRCULATING_SUPPLY}
                      >
                        <img
                          alt="question-mark"
                          src="/images/question-mark.svg"
                          height={"14px"}
                          style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                        />
                      </Tooltip>
                    </MarketDataPointTitle>
                    <p>
                      {circulatingSupplyValue ? circulatingSupplyValue : 0} XDC
                    </p>
                  </div>
                </div>

                <div className="cont1 cont1_align">
                  <div className="cont1-child2">
                    <MarketDataPointTitle>
                      Total Supply
                      <Tooltip placement="top" title={messages.TOTAL_SUPPLY}>
                        <img
                          alt="question-mark"
                          src="/images/question-mark.svg"
                          height={"14px"}
                          style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                        />
                      </Tooltip>
                    </MarketDataPointTitle>
                    <p>
                      {!totalSupplyValue
                        ? 0
                        : utility.convertToInternationalCurrencySystem(
                          totalSupplyValue
                        )}
                    </p>
                  </div>
                </div>
                <div className="con"> </div>
              </div>
            </div>
          </div>
        </DeskTopView>
        <MobileView>
          <div className={this.state.loading == true ? "cover-spin-4" : ""}>
            <div className="second_mid">
              <div className="second_cont">
                <div className="w-54-per">
                  <MarketDataPointTitle>
                    Market Cap
                    <Tooltip placement="top" title={messages.MARKET_CAP}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                      />
                    </Tooltip>
                  </MarketDataPointTitle>
                </div>
                <div className="mid_cont ">
                  <p className="word-space-4">
                    {currencySymbol}
                    {MarketCapValue ? MarketCapValue : 0}
                  </p>

                  <div
                    className={
                      MarketCapchange >= 0
                        ? "data_value_green"
                        : "data_value_red"
                    }
                  >
                    <div className="secondMarket">
                      {MarketCapchange == 0 ? (
                        ""
                      ) : MarketCapchange > 0 ? (
                        <div className="arrow_up">
                          {/* <BsFillCaretUpFill size={10} /> */}
                          <img
                            src={"/images/Up.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      ) : (
                        <div className="arrow_down">
                          {/* <BsFillCaretDownFill size={10} /> */}
                          <img
                            src={"/images/Down.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      )}
                      &nbsp;{MarketCapchange}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="second_cont">
                <div className="w-54-per">
                  {" "}
                  <MarketDataPointTitle>
                    Fully Diluted Market Cap
                    <Tooltip placement="top" title={messages.FDMP}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                      />
                    </Tooltip>
                  </MarketDataPointTitle>
                </div>
                <div className="mid_cont ">
                  {" "}
                  <p className="word-space-4">
                    {currencySymbol}
                    {FullyDilutedMarketCapValue
                      ? FullyDilutedMarketCapValue
                      : 0}
                  </p>
                  <div
                    className={
                      FullyDilutedMarketCapchange >= 0
                        ? "data_value_green"
                        : "data_value_red"
                    }
                  >
                    <div className="secondMarket">
                      {FullyDilutedMarketCapchange == 0 ? (
                        ""
                      ) : FullyDilutedMarketCapchange > 0 ? (
                        <div className="arrow_up">
                          {/* <BsFillCaretUpFill size={10} /> */}
                          <img
                            src={"/images/Up.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      ) : (
                        <div className="arrow_down">
                          {/* <BsFillCaretDownFill size={10} /> */}
                          <img
                            src={"/images/Down.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      )}
                      &nbsp;{FullyDilutedMarketCapchange}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="second_cont">
                <div className="w-54-per">
                  {" "}
                  <MarketDataPointTitle>
                    Volume (24hr)
                    <Tooltip placement="top" title={messages.VOLUMEX24}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                      />
                    </Tooltip>
                  </MarketDataPointTitle>
                </div>
                <div className="mid_cont ">
                  {" "}
                  <p className="word-space-4">
                    {currencySymbol}
                    {volumeValue ? volumeValue : 0}
                  </p>
                  <div
                    className={
                      Volumechange >= 0 ? "data_value_green" : "data_value_red"
                    }
                  >
                    <div className="secondMarket">
                      {Volumechange == 0 ? (
                        ""
                      ) : Volumechange > 0 ? (
                        <div className="arrow_up">
                          {/* <BsFillCaretUpFill size={10} /> */}
                          <img
                            src={"/images/Up.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      ) : (
                        <div className="arrow_down">
                          {/* <BsFillCaretDownFill size={10} /> */}
                          <img
                            src={"/images/Down.svg"}
                            style={{ width: "8px" }}
                          />
                        </div>
                      )}
                      &nbsp;{Volumechange}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="second_cont">
                <div className="w-54-per">
                  {" "}
                  <MarketDataPointTitle>
                    Circulating Supply
                    <Tooltip
                      placement="top"
                      title={messages.CIRCULATING_SUPPLY}
                    >
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                      />
                    </Tooltip>
                  </MarketDataPointTitle>
                </div>
                <div className="mid_cont">
                  {" "}
                  <p style={{ marginRight: "42px" }}>
                    {circulatingSupplyValue ? circulatingSupplyValue : 0} XDC
                  </p>
                </div>
              </div>

              <div className="second_cont">
                <div className="w-54-per">
                  {" "}
                  <MarketDataPointTitle>
                    Total Supply
                    <Tooltip placement="top" title={messages.TOTAL_SUPPLY}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        style={{ margin: "auto 0 auto 0", marginLeft: "2px" }}
                      />
                    </Tooltip>
                  </MarketDataPointTitle>
                </div>
                <div className="mid_cont">
                  {" "}
                  <p style={{ marginRight: "25px" }}>
                    {!totalSupplyValue
                      ? 0
                      : utility.convertToInternationalCurrencySystem(
                        totalSupplyValue
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MobileView>
      </>
    );
  }
}

export default MarketDatatable;
