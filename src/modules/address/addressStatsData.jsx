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

  @media (min-width: 768px) and (max-width: 1239px) {
    font-family: Inter;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;

    color: #686868;
    font-size: 0.75rem;
    opacity: 1;
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
  }
`;
const Value = styled.p`
  font-size: 18px !important;
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
    };
  }
  render() {
    const currencyPrice = this.props?.price;
    let activeCurrency = window.localStorage.getItem("currency");
    let highestTransaction = this.props?.statData?.highestTransaction;
    highestTransaction = Utils.decimalDivisonOnly(highestTransaction, 8);
    let highestTxn = Utils.convertToInternationalCurrencySystem(
      Number(highestTransaction)
    );
    let highestTransactionConverted =
      Utils.convertToInternationalCurrencySystem(
        Number(highestTransaction) * Number(currencyPrice)
      );

    let averageBalance = this.props?.statData?.avgBalance;
    averageBalance = Utils.decimalDivisonOnly(averageBalance, 8);
    let avgBalance = Utils.convertToInternationalCurrencySystem(
      Number(averageBalance)
    );
    let avgBalanceConverted = !currencyPrice
      ? ""
      : Utils.convertToInternationalCurrencySystem(
          Number(averageBalance) * Number(currencyPrice)
        );

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
    return (
      <>
        <DeskTopView>
          <div className="main_mid_address">
            <div className="main_child_address">
              <div className="cont1 p-t-0">
                <MarketDataPointTitle>
                  <Tooltip placement="top" title={messages.Total_Txn}>
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Total Txn(s)
                </MarketDataPointTitle>

                <Value>{this.props?.statData?.totalTransactionsCount}</Value>
                <ThirdRowValue>
                  <InDiv>In</InDiv>
                  <InValue>{this.props?.statData?.toTransactionsCount}</InValue>
                  <OutDiv>Out</OutDiv>
                  <OutValue>
                    {this.props?.statData?.fromTransactionsCount}
                  </OutValue>
                </ThirdRowValue>
              </div>

              <div className="cont1 p-t-0">
                <MarketDataPointTitle>
                  <Tooltip placement="top" title={messages.Highest_Txn}>
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Highest Txn
                </MarketDataPointTitle>
                <Value>{highestTxn}&nbsp;XDC</Value>
                <ThirdRowValue>
                  <OutValue>
                    {currencySymbol}
                    {!highestTransactionConverted
                      ? ""
                      : highestTransactionConverted}
                  </OutValue>
                </ThirdRowValue>
              </div>
              <div className="cont1 p-t-0">
                <MarketDataPointTitle>
                  <Tooltip placement="top" title={messages.AVERAGE_BALANCE}>
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Average Balance
                </MarketDataPointTitle>
                <Value>
                  {avgBalance}
                  &nbsp;XDC
                </Value>
                <ThirdRowValue>
                  <OutValue>
                    {currencySymbol}
                    {avgBalanceConverted}
                  </OutValue>
                </ThirdRowValue>
              </div>
            </div>

            <div className="main_sec_address">
              <div className="cont1 p-t-0">
                <div className="cont1-child">
                  <MarketDataPointTitle>
                    <Tooltip placement="top" title={messages.Txn_Fee}>
                      <img
                        alt="question-mark"
                        src="/images/info-new.svg"
                        height={"14px"}
                        className="info-new-icon"
                      />
                    </Tooltip>
                    Txn Fee Paid
                  </MarketDataPointTitle>
                  <Value>
                    {gasPrice > 0 ? Number(gasPrice).toFixed(12) : gasPrice}
                    &nbsp;XDC
                  </Value>
                  <ThirdRowValue>
                    <OutValue>
                      {currencySymbol}
                      {gasPriceConverted > 0
                        ? Number(gasPriceConverted).toFixed(12)
                        : gasPriceConverted}
                    </OutValue>
                  </ThirdRowValue>
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
          <div className="second_mid_address">
            <div className="second_cont_address">
              <div className="w-45-per">
                <MarketDataPointTitle>
                  <Tooltip placement="top" title={messages.Total_Txn}>
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Total Txn(s)
                </MarketDataPointTitle>
              </div>
              <div className="mid_cont_address ">
                <p>{this.props?.statData?.totalTransactionsCount}</p>

                <ThirdRowValue>
                  <InDiv>In</InDiv>
                  <InValue>{this.props?.statData?.toTransactionsCount}</InValue>
                  <OutDiv>Out</OutDiv>
                  <OutValue>
                    {this.props?.statData?.fromTransactionsCount}
                  </OutValue>
                </ThirdRowValue>
              </div>
            </div>

            <div className="second_cont_address">
              <div className="w-45-per">
                {" "}
                <MarketDataPointTitle>
                  <Tooltip placement="top" title={messages.Highest_Txn}>
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Highest Txn
                </MarketDataPointTitle>
              </div>
              <div className="mid_cont_address ">
                {" "}
                <p>{highestTxn}&nbsp;XDC</p>
                <ThirdRowValue>
                  <OutValue>
                    {" "}
                    {currencySymbol}
                    {!highestTransactionConverted
                      ? ""
                      : highestTransactionConverted}
                  </OutValue>
                </ThirdRowValue>
              </div>
            </div>

            <div className="second_cont_address">
              <div className="w-45-per">
                {" "}
                <MarketDataPointTitle>
                  <Tooltip placement="top" title={messages.VOLUMEX24}>
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Average Balance
                </MarketDataPointTitle>
              </div>
              <div className="mid_cont_address ">
                {" "}
                <p>{avgBalance}&nbsp;XDC</p>
                <ThirdRowValue>
                  <OutValue>
                    {" "}
                    {currencySymbol}
                    {!avgBalanceConverted ? "" : avgBalanceConverted}
                  </OutValue>
                </ThirdRowValue>
              </div>
            </div>

            <div className="second_cont_address">
              <div className="w-45-per">
                {" "}
                <MarketDataPointTitle>
                  <Tooltip placement="top" title={messages.Txn_Fee}>
                    <img
                      alt="question-mark"
                      src="/images/info-new.svg"
                      height={"14px"}
                      className="info-new-icon"
                    />
                  </Tooltip>
                  Txn Fee Paid
                </MarketDataPointTitle>
              </div>
              <div className="mid_cont_address">
                {" "}
                <p>
                  {gasPrice > 0 ? Number(gasPrice).toFixed(12) : gasPrice}
                  &nbsp;XDC
                </p>
                <ThirdRowValue>
                  <OutValue>
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

export default AddressStatsData;
