import React, { useEffect, useState } from "react";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import logo from "../../assets/images/usdc.png";

import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { FaReddit } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaFileAlt } from 'react-icons/fa'
import HolderGraphBar from "../explorer/holderGraph";
import TokenMarketDataTable from "./tokenMarketData";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import Tokentabs from "./tokentabs";
import { useParams } from "react-router-dom";
import TokenData from "../../services/token";
import Utility, { dispatchAction } from "../../utility";
import ReactHtmlParser from "react-html-parser";
import Utils from "../../utility";


const MainContainer = styled.div`
  width: 75.125rem;
  height: 16.563rem;
  margin: 0 auto;
  margin-top: 50px;
  padding-top: 1.9rem;
  padding-left: 1.75rem;
  border-radius: 12px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  display: flex;
  @media (min-width:768px) and (max-width: 1240px) {
    flex-direction: column;
    width: 41.5rem;
    height: 38.625rem;
    padding: 0 1.875rem;
    margin:0 auto;
    margin-top: 140px;
  }
  @media (max-width :767px){
    flex-direction: column;
    width: 22.563rem;
    height: 32.063rem;
    padding: 0 1.875rem;
    margin: 0 auto;
    margin-top: 140px;
  }
`;
const MobileScreen = styled.div`
margin-right: 3px;
@media (min-width:768px){
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-right: 0px;
}
`;
const LeftContainer = styled.div`
  flex: 0.55;
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div`
  flex: 0.45;
  display: flex;
  margin-right: 0px;
  flex-direction: column;
  padding: 0px 20px 25px 40px;
  width: 50%;
  @media (max-width:767px){
    margin-top: -10px;
    padding: 0px 0px 0px 0px;
    width: auto;
  }
  @media (min-width:768px) and (max-width:1240px){
    padding: 0px 0px 0px 0px;
    width: auto;
  }
`;
const LeftFirst = styled.div`
  flex: 0.3;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width:767px){
   padding: 1.875rem 0;
  }
  @media (min-width:768px) and (max-width:1240px){
   padding: 3.125rem 0;
  }
`;
const LeftSec = styled.div`
  flex: 0.7;
      margin-top: 10px;
  
`;
const ValueMain = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* margin-top: 12px; */
`;

const Value = styled.div`
  display: flex;
  width: 10.625rem;
  padding-bottom: 35px;
  @media (min-width:0px) and (max-width:767px){
    width: 6.625rem;
    padding-bottom: 23px;
  }
`;
const TitleIcon = styled.img`
  width: 22%;
  margin-right: 8px;
  margin-bottom: 36px;
`;

const ValueName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.div`
  color: #a09e9e;
  font-size: 0.875rem;
  font-family: "Inter";
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.65px;
  margin-bottom: 5px;
  @media (min-width:0px) and (max-width:767px){
    font-size: 0.75rem;
  }
  @media (min-width:768px) and (max-width:1240px){
    font-size: 0.875rem;
  }
`;
const TitleValue = styled.div`
  font-size: 1rem;
  font-family: Inter;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.58px;
  color: #252525;
  @media (min-width:0px) and (max-width:767px){
    font-size: 0.875rem;
  }
  @media (min-width:768px) and (max-width:1240px){
    font-size: 1rem;
  }
`;
const LeftTop = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const IconLogo = styled.img`
  width: 32px;
  height: 30px;
  margin-right: 12px;
  margin-left: 5px;
`;
const LeftTitle = styled.div`
  margin-top: 3px;
  font-size: 1.75rem;
  font-weight: 600;
  font-family: Inter;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  color: #252525;
  @media (min-width:0px) and (max-width:767px){
    font-size: 1.375rem;
  }
  @media (min-width:767px) and (max-width:1240px){
    font-size: 1.5rem;
  }
`;
const Line1 = styled.hr`
  background-color: #fff;
  width: 100%;
  position: absolute;
  top: 65%;
  @media (max-width:767px){
    width:100%;
    top: 75%;
    }
    @media (min-width:768px) and (max-width:1240px){
    width:100%;
    top: 60%;
    }
`;
const LeftTopSec = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  font-family: Inter;
  letter-spacing: 0.55px;
  color: #252525;
  @media (min-width:0px) and (max-width:767px){
    font-size: 1rem;
  }
  @media (min-width:768px) and (max-width:1240px){
    font-size: 1.375rem;
  }
`;
const LeftTopSecMain = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  
`;

const ContractButton = styled.button`
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.45px;
  border: none;
  color: #2149b9;
  padding-top: 2.5px;
  padding-left: 0px;
  @media (max-width:767px){
    font-size: 0.875rem;
  }
`;
const RightFirst = styled.div`
  flex: 0.1;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 2px;
  align-items: center;
`;
const RightTop = styled.div`
  flex: 0.2;
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

const RightTitle = styled.div`
  font-size: 0.938rem;
  font-weight: 600;
  font-family: Inter;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.65px;
  color: #2a2a2a;
  @media (min-width:0px) and (max-width:767px){
    font-size: 0.875rem;
    text-align: left;
    letter-spacing: 0.01px;
    color: #9FA9BA;
  }
  @media (min-width:768px) and (max-width:1240px){
    font-size: 0.875rem;
    text-align: left;
    letter-spacing: 0.54px;
    color: #252525;
  }
  
  `;
const Line2 = styled.hr`
  background-color: #e3e7eb !important;
  width: 100%;
  position: absolute;
  top: 20%;
  left: 0%;
  @media (max-width:767px){
    width:100%;
    top: 30%;
    }
  @media (min-width:768px) and (max-width:1240px){
    width:100%;
    top: 20%;
    }
`;
const RightTopSec = styled.div`
  width: 3.938rem;
    height: 1.375rem;
    font-size: 0.875rem;
    padding: 4.5px;
    color: #2a2a2a;
    border: none;
    border-radius: 4px;
    background-color: #e3e7eb;
    background-size: cover;
    font-family: "Inter" !important;
    font-weight: 600;
    padding-top: 2px;
    @media (min-width:0px) and (max-width:767px){
    font-size: 0.75rem;
    width: 3.438rem;
    height: 1.375rem;
  }
  @media (min-width:768px) and (max-width:1240px){
    font-size: 0.875rem;
    width: 4.063rem;
    height: 1.573rem;
    
  }
`;

const GraphContainer = styled.div`
  width: 100%;
  flex: 0.8;
  padding-left: 0px;
`;

const Icons = styled.div`
  padding-top: 1px;
`;

export default function TokenDataComponent() {
  let changePrice = 5.21;
  let changeHolders = 0;
  let tokenName = 'XDC'
  let contract = "xdc238610bfafef424e4d0020633387966d61c4c6e3";
  const [marketCapVal, setMarketCapValue] = React.useState(0);
  const [holders, setHolders] = useState({})
  const { address } = useParams();
  function shorten(b, amountL = 14, amountR = 0, stars = 3) {
    return `${b?.slice(0, amountL)} ${".".repeat(stars)} ${b?.slice(b.length)} `;
  }
  const CoinMarketExchangeForToken = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        TokenData.CoinMarketExchangeForToken(data)
      );

      if (responseData) {

        setMarketCapValue(responseData)

      }
    } catch (error) {
      console.error(error);
    }
  }




  useEffect(() => {
    let values = { addr: address, pageNum: 0, perpage: 50 }
    listOfHolders(values);
    transferDetail(values);
  }, []);
  const [transfer, settransfer] = useState({});


  const transferDetail = async (values) => {

    let [error, tns] = await Utils.parseResponse(
      TokenData.getTotalTransferTransactionsForToken(values)
    );
    if (error || !tns) return;
    settransfer(tns);

    const interval = setInterval(async () => {
      let [error, tns] = await Utils.parseResponse(
        TokenData.getTotalTransferTransactionsForToken(values)
      );
      settransfer(tns);
    }, 90000);
  };

  const listOfHolders = async (values) => {
    let urlPath = `${address}`;
    let [error, tns] = await Utils.parseResponse(
      TokenData.getListOfHoldersForToken(values)
    );
    if (error || !tns) return;
    setHolders(tns);
  }
  console.log(transfer, "<><>")
  React.useEffect(() => {
    (async () => {
      let token = 'XDC'
      await CoinMarketExchangeForToken(tokenName)
    })();
  }, []);
  let activeCurrency = window.localStorage.getItem('currency')
  let tokenPriceVal = 0
  let tokenChanges24hr = 0
  let CurrencySymbol = ''
  if (marketCapVal) {
    if (activeCurrency == 'USD') {
      CurrencySymbol = '$'
      tokenPriceVal = marketCapVal.parseDataUSD.tokenPrice
      tokenChanges24hr = marketCapVal.parseDataUSD.pricePercentageChange24_hr
    } else if (activeCurrency == 'EUR') {
      CurrencySymbol = '€'
      tokenPriceVal = marketCapVal.parseDataEUR.tokenPrice
      tokenChanges24hr = marketCapVal.parseDataEUR.pricePercentageChange24_hr

    } else if (activeCurrency == 'INR') {
      CurrencySymbol = '₹'
      tokenPriceVal = marketCapVal.parseDataINR.tokenPrice
      tokenChanges24hr = marketCapVal.parseDataINR.pricePercentageChange24_hr

    } else {
      CurrencySymbol = '$'
      tokenPriceVal = marketCapVal.parseDataUSD.tokenPrice
      tokenChanges24hr = marketCapVal.parseDataUSD.pricePercentageChange24_hr
    }
  }
  let numberStatus = Math.sign(tokenChanges24hr)
  return (
    <>
      <div style={{ backgroundColor: '#fff' }}>
        <Tokensearchbar />
        <br />
        <br />
        <MainContainer>
          <LeftContainer>
            <LeftFirst>
              <LeftTop>
                {/* {logo.length > 0 ?
                  <IconLogo src={logo} />
                  :
                  <span style={{ width: '25px', height: '25px', borderRadius: '15px', border: '1px solid', fontSize: '15px', marginTop: '5px', marginRight: '5px' }}>{tokenName.slice(0, 2).toUpperCase()}</span>
                } */}
                <LeftTitle>{tokenName.toUpperCase()}</LeftTitle>
              </LeftTop>

              <LeftTopSecMain>
                <LeftTopSec>{ReactHtmlParser(CurrencySymbol)}{tokenPriceVal.toFixed(5)}</LeftTopSec>
                <div
                  className={
                    numberStatus > 0
                      ? "data_value_green last_value_main"
                      : "data_value_red"
                  }
                >
                  <div className="value_changePrice">
                    {numberStatus > 0 ? (
                      <div className="arrow_up">
                        {/*<BsFillCaretUpFill size={10} />*/}
                        <img
                          src={require("../../../src/assets/images/Up.svg")}
                          style={{ width: "8px" }}
                        />
                      </div>
                    ) : (
                      <div className="arrow_down">
                        {/* <BsFillCaretDownFill size={10} />*/}
                        <img
                          src={require("../../../src/assets/images/Down.svg")}
                          style={{ width: "8px" }}
                        />
                      </div>
                    )}
                    &nbsp;{tokenChanges24hr.toFixed(2)}%
                  </div>
                </div>
              </LeftTopSecMain>
              <Line1></Line1>
            </LeftFirst>
            <LeftSec>
              <ValueMain>
                <MobileScreen>
                  <Value>
                    {/* <TitleIcon src={blockHeightImg} /> */}
                    <ValueName>
                      <Title>Holders</Title>
                      <div className="last_value">
                        <TitleValue>{holders.responseCount}</TitleValue>
                        <div className="last_value">
                          <div
                            className={
                              changeHolders >= 0
                                ? "data_value_green last_value_main"
                                : "data_value_red"
                            }
                          >
                            <div className="value_p">
                              {changeHolders >= 0 ? (
                                <div className="arrow_up">
                                  <BsFillCaretUpFill size={10} />
                                </div>
                              ) : (
                                <div className="arrow_down">
                                  <BsFillCaretDownFill size={10} />
                                </div>
                              )}
                              {changeHolders}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ValueName>
                  </Value>
                  <Value>
                    {/* <TitleIcon src={priceLogo} /> */}
                    <ValueName>
                      <Title>Transfer</Title>
                      <TitleValue>{transfer.totalTransactionCount}</TitleValue>
                    </ValueName>
                  </Value>
                  <Value>
                    {/* <TitleIcon src={transactionLogo} /> */}
                    <ValueName>
                      <Title>Contract</Title>
                      <ContractButton> {shorten(address)}</ContractButton>
                    </ValueName>
                  </Value>
                </MobileScreen>
                <MobileScreen>
                  <Value>
                    {/* <TitleIcon src={difficultyLogo} /> */}
                    <ValueName>
                      <Title>Decimal</Title>
                      <TitleValue>8</TitleValue>
                    </ValueName>
                  </Value>
                  <Value>
                    {/* <TitleIcon src={maxLogo} /> */}
                    <ValueName>
                      <Title>Website</Title>
                      <TitleValue>Not available</TitleValue>
                      {/* <ContractButton>www.usdc.com</ContractButton> */}
                    </ValueName>
                  </Value>
                  <Value>
                    {/* <TitleIcon src={accountLogo} /> */}
                    <ValueName>
                      <Title>Social Media</Title>
                      <TitleValue>Not available</TitleValue>
                      {/* <Icons>
                      <GrMail
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}
                      />
                      <FaReddit
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}
                      />
                      <FaFacebookF
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}

                      />
                      <AiOutlineTwitter
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}
                      />
                      <FaFileAlt
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}
                      /> */}
                      {/* <AiOutlineTwitter
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}
                      />
                      <AiOutlineTwitter
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}
                      /> */}
                      {/* </Icons> */}
                    </ValueName>
                  </Value>
                </MobileScreen>
              </ValueMain>

            </LeftSec>
          </LeftContainer>

          <RightContainer>
            <RightTop>
              <RightTitle>Holders</RightTitle>
              <RightTopSec>14 Days</RightTopSec>
              <Line2></Line2>
            </RightTop>
            <GraphContainer>
              <HolderGraphBar />
            </GraphContainer>
          </RightContainer>
        </MainContainer>
        <TokenMarketDataTable
          marketCap={marketCapVal}
        />
        <br /><br />
        <Tokentabs />
        <br /><br />
        <FooterComponent />
      </div>
    </>
  );
}
