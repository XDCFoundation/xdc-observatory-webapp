import React, { Component } from "react";
import "../../assets/styles/custom.css";
import { CoinMarketService } from "../../services";
import styled from "styled-components";
import Utils from "../../utility";
import utility from "../../utility";
import Tooltip from "@material-ui/core/Tooltip";
import { messages } from "../../constants";
import { withStyles } from "@material-ui/core/styles";
import logger from "redux-logger";
import format from "format-number";
// import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  customTooltip: {
    fontSize: "13px",
  },
  customTooltipDarkMode: {
    background: "#051440",
    color: "#adc4e4",
    fontSize: "13px",
  },
});

const DeskTopView = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: block;
    margin-bottom: 35px;
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

  justify-content: center;
  color: #686868;
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 2px;
  ${({ theme }) =>
    theme === "dark" &&
    `
    color: #fff;
  `}

  @media (min-width: 768px) and (max-width: 1239px) {
    font-family: Inter;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;

    color: #686868;
    font-size: 0.75rem;
    opacity: 1;
    ${({ theme }) =>
      theme === "dark" &&
      `
      color: #fff;
    `}
  }
  @media (min-width: 350px) and (max-width: 1239px) {
    justify-content: left;
    align-item: left;
  }

  @media (min-width: 350px) and (max-width: 767px) {
    color: #686868;
    display: flex;
    gap: 10px;
    width: 60%;
    ${({ theme }) =>
      theme === "dark" &&
      `
     color: #fff;
    `}
  }
`;
const Value = styled.p`
  font-size: 18px !important;
  ${({ theme }) =>
    theme === "dark" &&
    `
    color: #b1c3e1 !important;
  `}
`;
const ThirdRowValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    padding-top: 10px;
  }
`;
const InDiv = styled.div`
  width: 24px;
  height: 19.2px;
  border-radius: 4px;
  background-color: #d4ffe3;
  font-family: Inter;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-align: center;
  padding: 3px;
  color: #007b2c;
  ${({ theme }) =>
    theme === "dark" &&
    `
    color: #007b2c !important;
    background-color: #153451;
  `}
`;
const OutDiv = styled.div`
  width: 24px;
  height: 19.2px;
  border-radius: 4px;
  background-color: #ffece3;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;

  text-align: center;
  color: #ff4200;
  padding: 2px 1px;
  ${({ theme }) =>
    theme === "dark" &&
    `
    color: #ff4200 !important;
    background-color: #36284d;
  `}
`;
const InValue = styled.span`
  font-family: Inter !important;
  font-size: 15px !important;
  font-weight: normal !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: normal !important;

  text-align: center !important;
  color: #585858 !important;
  padding: 4px 10px 5px 2px !important;
  ${({ theme }) =>
    theme === "dark" &&
    `
    color: #fff !important;
  `}
  @media (min-width: 768px) and (max-width: 1240px) {
    padding: 2px 10px 5px 2px !important;
    height: 1.5rem !important;
  }
`;
const OutValue = styled.span`
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;

  text-align: center;
  padding: 4px 0px 5px 2px;
  color: #585858;
  ${({ theme }) =>
    theme === "dark" &&
    `
    color: #fff;
  `}
`;
let convertToInternationalCurrencySystem = function givenCurrency(num) {
  if (num > 999.99999999 && num < 1000000) {
    return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 999999.99999999 && num < 999999999.99999999) {
    return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million && < 1 billion
  } else if (num > 1000000000) {
    return (num / 1000000000).toFixed(2) + "B"; // convert to B for number from > 1 billion
  } else if (num < 999.99999999) {
    return num; // if value < 1000, nothing to do
  }
};

let percentageChange = function relDiff(a, b) {
  return ((a - b) * 100) / b;
};

class AddressStatsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postLatestMarket: [],
      postPreviousMarket: [],
      loading: true,
      totalTxnTT: false,
      highestTxnTT: false,
      avgBalanceTT: false,
      txnFeePaidTT: false,
    };
  }
  render() {
    const { classes } = this.props;

    const currencyPrice = this.props?.price;
    let activeCurrency = this.props.currency;
    let highestTransaction = this.props?.statData?.highestTransaction;
    highestTransaction = Utils.decimalDivisonOnly(highestTransaction, 2);
    let highestTxn = highestTransaction

    let highestTransactionConverted = (Number(highestTransaction) * Number(currencyPrice)).toFixed(2).replace(/\.?0+$/, "");
      

    let averageBalance = this.props?.statData?.avgBalance;
    averageBalance = Utils.decimalDivisonOnly(averageBalance, 2);
    let avgBalance = averageBalance
    let avgBalanceConverted = !currencyPrice
      ? ""
      : (Number(averageBalance) * Number(currencyPrice)).toFixed(2).replace(/\.?0+$/, "");
        

    let tokens = this.props?.statData?.tokens?.length;
    let tokensConverted = Utils.convertToInternationalCurrencySystem(
      Number(tokens) * Number(currencyPrice)
    );
    let gasP = Utils.decimalDivison(Number(this.props?.statData?.gasFee), 12);
    let gasPrice = !gasP ? "" : parseFloat(Number(gasP));
    let gasPriceConverted = !gasP
      ? ""
      : Number(gasPrice) * Number(currencyPrice);

    let currencySymbol = activeCurrency === "EUR" ? "€" : "$";
    console.log("loffer", gasPrice);
    return (
      <>
        <DeskTopView>
          <div
            className={
              this.props.theme === "dark"
                ? "main_mid_address_dark"
                : "main_mid_address"
            }
          >
            <div className="main_child_address">
              <div className="cont1 p-t-0">
                <MarketDataPointTitle theme={this.props.theme}>
                  <Tooltip
                    placement="top"
                    title={messages.Total_Txn}
                    classes={{
                      tooltip:
                        this.props.theme === "dark"
                          ? classes.customTooltipDarkMode
                          : classes.customTooltip,
                    }}
                  >
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Total Txn(s)
                </MarketDataPointTitle>
                {!this.props?.statData?.totalTransactionsCount ? (
                  <div className="m-l-5">
                    <div className="animated-background"></div>
                  </div>
                ) : (
                  <>
                    <Value theme={this.props.theme}>
                      {this.props?.statData?.totalTransactionsCount}
                    </Value>
                    <ThirdRowValue>
                      <InDiv theme={this.props.theme}>In</InDiv>
                      <InValue theme={this.props.theme}>
                        {this.props?.statData?.toTransactionsCount}
                      </InValue>
                      <OutDiv theme={this.props.theme}>Out</OutDiv>
                      <OutValue theme={this.props.theme}>
                        {this.props?.statData?.fromTransactionsCount}
                      </OutValue>
                    </ThirdRowValue>
                  </>
                )}
              </div>

              <div className="cont1 p-t-0">
                <MarketDataPointTitle theme={this.props.theme}>
                  <Tooltip
                    placement="top"
                    title={messages.Highest_Txn}
                    classes={{
                      tooltip:
                        this.props.theme === "dark"
                          ? classes.customTooltipDarkMode
                          : classes.customTooltip,
                    }}
                  >
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Highest Txn
                </MarketDataPointTitle>
                {!highestTxn ? (
                  <div>
                    <div className="animated-background"></div>
                  </div>
                ) : (
                  <>
                    <Value theme={this.props.theme}>
                      {isNaN(highestTxn) ? "":format({})(highestTxn)}
                      &nbsp;XDC
                    </Value>
                    <ThirdRowValue>
                      <OutValue theme={this.props.theme}>
                        {currencySymbol}

                        {isNaN(highestTransactionConverted) ? "":format({})(highestTransactionConverted)}
                      </OutValue>
                    </ThirdRowValue>
                  </>
                )}
              </div>
              <div className="cont1 p-t-0">
                <MarketDataPointTitle theme={this.props.theme}>
                  <Tooltip
                    placement="top"
                    title={messages.AVERAGE_BALANCE}
                    classes={{
                      tooltip:
                        this.props.theme === "dark"
                          ? classes.customTooltipDarkMode
                          : classes.customTooltip,
                    }}
                  >
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Average Balance
                </MarketDataPointTitle>
                {!avgBalance ? (
                  <div>
                    <div className="animated-background"></div>
                  </div>
                ) : (
                  <>
                    <Value theme={this.props.theme}>
                    {isNaN(avgBalance) ? "":format({})(avgBalance)}
                      &nbsp;XDC
                    </Value>
                    <ThirdRowValue>
                      <OutValue theme={this.props.theme}>
                        {currencySymbol}
                        {isNaN(avgBalanceConverted) ? "":format({})(avgBalanceConverted)}
                      </OutValue>
                    </ThirdRowValue>
                  </>
                )}
              </div>
            </div>

            <div className="main_sec_address">
              <div className="cont1 p-t-0">
                <div className="cont1-child">
                  <MarketDataPointTitle theme={this.props.theme}>
                    <Tooltip
                      placement="top"
                      title={messages.Txn_Fee}
                      classes={{
                        tooltip:
                          this.props.theme === "dark"
                            ? classes.customTooltipDarkMode
                            : classes.customTooltip,
                      }}
                    >
                      <img
                        alt="question-mark"
                        src="/images/info-new.svg"
                        height={"14px"}
                        className="info-new-icon"
                      />
                    </Tooltip>
                    Txn Fee Paid
                  </MarketDataPointTitle>
                  {typeof gasPrice === "string" ? (
                    <div style={{marginLeft:"14px"}}>
                      <div className="animated-background"></div>
                    </div>
                  ) : (
                    <>
                      <Value theme={this.props.theme}>
                        {gasPrice > 0 ? Number(gasPrice).toFixed(12) : gasPrice}
                        &nbsp;XDC
                      </Value>
                      <ThirdRowValue>
                        <OutValue theme={this.props.theme}>
                          {currencySymbol}
                          {gasPriceConverted > 0
                            ? Number(gasPriceConverted).toFixed(12)
                            : gasPriceConverted}
                        </OutValue>
                      </ThirdRowValue>
                    </>
                  )}
                </div>
              </div>

              {/*<div className="cont1 p-t-0 cont1_align">*/}
              {/*  <div className="cont1-child2">*/}
              {/*    <MarketDataPointTitle>*/}
              {/*      <Tooltip placement="top" title={messages.Tokens}>*/}
              {/*        <img*/}
              {/*          alt="question-mark"*/}
              {/*          src="/images/info-new.svg"*/}
              {/*          height={"14px"}*/}
              {/*          className="info-new-icon"*/}
              {/*        />*/}
              {/*      </Tooltip>*/}
              {/*      Tokens*/}
              {/*    </MarketDataPointTitle>*/}
              {/*    <Value>{this.props?.statData?.tokens?.length}</Value>*/}
              {/*    <ThirdRowValue>*/}
              {/*      <OutValue>*/}
              {/*        {currencySymbol}*/}
              {/*        {!tokensConverted ? "" : tokensConverted}*/}
              {/*      </OutValue>*/}
              {/*    </ThirdRowValue>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="con"> </div>
            </div>
          </div>
        </DeskTopView>
        <MobileView>
          <div
            className={
              this.props.theme === "dark"
                ? "second_mid_address_dark"
                : "second_mid_address"
            }
          >
            <div className="second_cont_address">
              <div className="w-45-per">
                <MarketDataPointTitle theme={this.props.theme}>
                  <Tooltip
                    placement="top"
                    title={messages.Total_Txn}
                    open={this.state.totalTxnTT}
                    onOpen={() => this.setState({ totalTxnTT: true })}
                    onClose={() => this.setState({ totalTxnTT: false })}
                    classes={{
                      tooltip:
                        this.props.theme === "dark"
                          ? classes.customTooltipDarkMode
                          : classes.customTooltip,
                    }}
                  >
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                      onClick={() =>
                        this.setState({ totalTxnTT: !this.state.totalTxnTT })
                      }
                    />
                  </Tooltip>
                  Total Txn(s)
                </MarketDataPointTitle>
              </div>
              <div
                className={
                  this.props.theme === "dark"
                    ? "mid_cont_address_dark"
                    : "mid_cont_address "
                }
              >
                <p>{this.props?.statData?.totalTransactionsCount}</p>

                <ThirdRowValue>
                  <InDiv>In</InDiv>
                  <InValue theme={this.props.theme}>
                    {this.props?.statData?.toTransactionsCount}
                  </InValue>
                  <OutDiv>Out</OutDiv>
                  <OutValue theme={this.props.theme}>
                    {this.props?.statData?.fromTransactionsCount}
                  </OutValue>
                </ThirdRowValue>
              </div>
            </div>

            <div className="second_cont_address">
              <div className="w-45-per">
                {" "}
                <MarketDataPointTitle theme={this.props.theme}>
                  <Tooltip
                    placement="top"
                    title={messages.Highest_Txn}
                    open={this.state.highestTxnTT}
                    onOpen={() => this.setState({ highestTxnTT: true })}
                    onClose={() => this.setState({ highestTxnTT: false })}
                    classes={{
                      tooltip:
                        this.props.theme === "dark"
                          ? classes.customTooltipDarkMode
                          : classes.customTooltip,
                    }}
                  >
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                      onClick={() =>
                        this.setState({
                          highestTxnTT: !this.state.highestTxnTT,
                        })
                      }
                    />
                  </Tooltip>
                  Highest Txn
                </MarketDataPointTitle>
              </div>
              <div
                className={
                  this.props.theme === "dark"
                    ? "mid_cont_address_dark"
                    : "mid_cont_address "
                }
              >
                {" "}
                <p>{isNaN(highestTxn) ? "":format({})(highestTxn)}&nbsp;XDC</p>
                <ThirdRowValue>
                  <OutValue theme={this.props.theme}>
                    {" "}
                    {currencySymbol}
                    {isNaN(highestTransactionConverted) ? "":format({})(highestTransactionConverted)}
                  </OutValue>
                </ThirdRowValue>
              </div>
            </div>

            <div className="second_cont_address">
              <div className="w-45-per">
                {" "}
                <MarketDataPointTitle theme={this.props.theme}>
                  <Tooltip
                    placement="top"
                    title={messages.VOLUMEX24}
                    open={this.state.avgBalanceTT}
                    onOpen={() => this.setState({ avgBalanceTT: true })}
                    onClose={() => this.setState({ avgBalanceTT: false })}
                    classes={{
                      tooltip:
                        this.props.theme === "dark"
                          ? classes.customTooltipDarkMode
                          : classes.customTooltip,
                    }}
                  >
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                      onClick={() =>
                        this.setState({
                          avgBalanceTT: !this.state.avgBalanceTT,
                        })
                      }
                    />
                  </Tooltip>
                  Average Balance
                </MarketDataPointTitle>
              </div>
              <div
                className={
                  this.props.theme === "dark"
                    ? "mid_cont_address_dark"
                    : "mid_cont_address "
                }
              >
                {" "}
                <p>{isNaN(avgBalance) ? "":format({})(avgBalance)}&nbsp;XDC</p>
                <ThirdRowValue>
                  <OutValue theme={this.props.theme}>
                    {" "}
                    {currencySymbol}
                    {isNaN(avgBalanceConverted) ? "":format({})(avgBalanceConverted)}
                  </OutValue>
                </ThirdRowValue>
              </div>
            </div>

            <div className="second_cont_address">
              <div className="w-45-per">
                {" "}
                <MarketDataPointTitle theme={this.props.theme}>
                  <Tooltip
                    placement="top"
                    title={messages.Txn_Fee}
                    open={this.state.txnFeePaidTT}
                    onOpen={() => this.setState({ txnFeePaidTT: true })}
                    onClose={() => this.setState({ txnFeePaidTT: false })}
                    classes={{
                      tooltip:
                        this.props.theme === "dark"
                          ? classes.customTooltipDarkMode
                          : classes.customTooltip,
                    }}
                  >
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                      onClick={() =>
                        this.setState({
                          txnFeePaidTT: !this.state.txnFeePaidTT,
                        })
                      }
                    />
                  </Tooltip>
                  Txn Fee Paid
                </MarketDataPointTitle>
              </div>
              <div
                className={
                  this.props.theme === "dark"
                    ? "mid_cont_address_dark"
                    : "mid_cont_address "
                }
              >
                {" "}
                <p>
                  {gasPrice > 0 ? Number(gasPrice).toFixed(12) : gasPrice}
                  &nbsp;XDC
                </p>
                <ThirdRowValue>
                  <OutValue theme={this.props.theme}>
                    {currencySymbol}
                    {gasPriceConverted > 0
                      ? Number(gasPriceConverted).toFixed(12)
                      : gasPriceConverted}
                  </OutValue>
                </ThirdRowValue>
              </div>
            </div>

            {/*<div className="second_cont_address">*/}
            {/*  <div className="w-45-per">*/}
            {/*    {" "}*/}
            {/*    <MarketDataPointTitle>*/}
            {/*      <Tooltip placement="top" title={messages.Tokens}>*/}
            {/*        <img*/}
            {/*          alt="question-mark"*/}
            {/*          src="/images/info-new.svg"*/}
            {/*          height={"14px"}*/}
            {/*          className="info-new-icon"*/}
            {/*        />*/}
            {/*      </Tooltip>*/}
            {/*      Tokens*/}
            {/*    </MarketDataPointTitle>*/}
            {/*  </div>*/}
            {/*  <div className="mid_cont_address">*/}
            {/*    {" "}*/}
            {/*    <p>{this.props?.statData?.tokens?.length}</p>*/}
            {/*    <ThirdRowValue>*/}
            {/*      <OutValue>*/}
            {/*        {" "}*/}
            {/*        {currencySymbol}*/}
            {/*        {!tokensConverted ? "" : tokensConverted}*/}
            {/*      </OutValue>*/}
            {/*    </ThirdRowValue>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </MobileView>
      </>
    );
  }
}

export default withStyles(useStyles)(AddressStatsData);
