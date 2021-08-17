import React, { useEffect, useState } from "react";
import "../../assets/styles/custom.css";
import styled from "styled-components";
//import logo from "../../assets/images/usdc.png";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaRedditSquare } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
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
  width: 950px;
  height: 200px;
  margin: 0 auto;
  margin-top: 76px;
  padding-top:20px;
  padding-left:15px
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  display: flex;
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
`;
const LeftFirst = styled.div`
  flex: 0.3;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 2px;
  align-item: center;
`;
const LeftSec = styled.div`
  flex: 0.7;
  padding-left: 2px;
  margin-bottom: 2px;
`;
const ValueMain = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const Value = styled.div`
  display: flex;
  width: 140px;
  padding-bottom: 22px;
`;
const TitleIcon = styled.img`
  width: 22%;
  margin-right: 8px;
`;

const ValueName = styled.div`
  display: flex;
  flex-direction: column;
  align-item: flex-end;
`;
const Title = styled.div`
  color: #a09e9e;
  font-size: 11px;
  font-family: "Inter";
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.65px;
`;
const TitleValue = styled.div`
  font-size: 13.5px;
  font-family: Inter;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.58px;
  color: #252525;
  padding-top: 3px;
`;
const LeftTop = styled.div`
  display: flex;
  align-item: center;
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
margin-top:5px
  font-size: 20px;
  font-weight: 800;
  font-family: Inter;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  color: #252525;
`;
const Line1 = styled.hr`
  backgroundcolor: #e3e7eb !important;
  width: 478px;
  position: absolute;
  top: 55%;
  left: 1%;
`;
const LeftTopSec = styled.div`
  font-size: 18px;
  font-weight: 800;
  margin-right: 3px;
  font-family: Inter;
  letter-spacing: 0.55px;
  color: #252525;
`;
const LeftTopSecMain = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const ContractButton = styled.button`
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.45px;
  border: none;
  color: #2149b9;
  padding-top: 2.5px;
  padding-left: 0px;
`;
const RightFirst = styled.div`
  flex: 0.1;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 2px;
  align-item: center;
`;
const RightTop = styled.div`
  flex: 0.2;
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

const RightTitle = styled.div`
  margin-top:3px
  font-size: 13px;
  font-weight: 600;
  font-family: Inter;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.65px;
  color: #2a2a2a;`;
const Line2 = styled.hr`
  backgroundcolor: #e3e7eb !important;
  width: 392px;
  position: absolute;
  top: 20%;
  left: 0%;
`;
const RightTopSec = styled.div`
  width: 50px;
  height: 18px;
  font-size: 11px;
  color: #2a2a2a;
  border: none;
  border-radius: 4px;
  background-color: #e3e7eb;
  background-size: cover;
  font-family: "Inter" !important;
  font-weight: 600;
  padding-left: 3px;
  padding-top: 1px;
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
  function shorten(b, amountL = 17, amountR = 0, stars = 3) {
    return `${b.slice(0, amountL)} ${".".repeat(stars)} ${b.slice(b.length)} `;
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
<<<<<<< HEAD
  }
  useEffect(() => {
    listOfHolders();
  }, []);
  const { address } = useParams();
  const listOfHolders = async () => {
    let urlPath = `${address}`;
    let [error, tns] = await Utils.parseResponse(
      TokenData.getListOfHoldersForToken(urlPath, {})
    );
    if (error || !tns) return;
    setHolders(tns);
=======
}
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
let logo = ''
if(marketCapVal){
  if (activeCurrency == 'USD') {
    CurrencySymbol = '<i class="fa fa-usd" aria-hidden="true"></i> '
    tokenPriceVal = marketCapVal.parseDataUSD.tokenPrice
    tokenChanges24hr = marketCapVal.parseDataUSD.pricePercentageChange24_hr
  }else if(activeCurrency == 'EUR'){
    CurrencySymbol = '<i class="fa fa-eur" aria-hidden="true"></i> '
    tokenPriceVal = marketCapVal.parseDataEUR.tokenPrice
    tokenChanges24hr = marketCapVal.parseDataEUR.pricePercentageChange24_hr
>>>>>>> 9e1b3a796b1fa1436b8c6ac06d2ea59b06cc34de

    const interval = setInterval(async () => {
      let [error, tns] = await Utils.parseResponse(
        TokenData.getListOfHoldersForToken(urlPath, {})
      );
      setHolders(tns);
    }, 90000);
  };
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
      CurrencySymbol = '<i class="fa fa-usd" aria-hidden="true"></i> '
      tokenPriceVal = marketCapVal.parseDataUSD.tokenPrice
      tokenChanges24hr = marketCapVal.parseDataUSD.pricePercentageChange24_hr
    } else if (activeCurrency == 'EUR') {
      CurrencySymbol = '<i class="fa fa-eur" aria-hidden="true"></i> '
      tokenPriceVal = marketCapVal.parseDataEUR.tokenPrice
      tokenChanges24hr = marketCapVal.parseDataEUR.pricePercentageChange24_hr

    } else if (activeCurrency == 'INR') {
      CurrencySymbol = '<i class="fa fa-INR" aria-hidden="true"></i> '
      tokenPriceVal = marketCapVal.parseDataINR.tokenPrice
      tokenChanges24hr = marketCapVal.parseDataINR.pricePercentageChange24_hr

    } else {
      CurrencySymbol = '<i class="fa fa-usd" aria-hidden="true"></i> '
      tokenPriceVal = marketCapVal.parseDataUSD.tokenPrice
      tokenChanges24hr = marketCapVal.parseDataUSD.pricePercentageChange24_hr
    }
  }
  let numberStatus = Math.sign(tokenChanges24hr)
  console.log(holders, "HIIIII")
  return (
    <>
<<<<<<< HEAD
      <div style={{ backgroundColor: '#fff' }}>
        <Tokensearchbar />
        <br />
        <br />
        <MainContainer>
          <LeftContainer>
            <LeftFirst>
              <LeftTop>
                {logo.length > 0 ?
                  <IconLogo src={logo} />
                  :
                  <span>{tokenName.slice(0, 2).toUpperCase()}</span>
=======
    <div style={{backgroundColor:'#fff'}}>
    <Tokensearchbar/>
    <br/>
    <br/>
      <MainContainer>
        <LeftContainer>
          <LeftFirst>
            <LeftTop>
              {logo.length > 0 ?
              <IconLogo src={logo} />
              :
              <span style={{width: '25px',height: '25px',borderRadius: '15px',border: '1px solid',fontSize:'15px',marginTop: '5px',marginRight: '5px'}}>{tokenName.slice(0, 2).toUpperCase()}</span>
            }
              <LeftTitle>{tokenName.toUpperCase()}</LeftTitle>
            </LeftTop>
            <LeftTopSecMain>
              <LeftTopSec>{ReactHtmlParser(CurrencySymbol)}{tokenPriceVal.toFixed(5)}</LeftTopSec>
              
              <div
                className={
                  numberStatus > 0
                    ? "data_value_green last_value_main"
                    : "data_value_red"
>>>>>>> 9e1b3a796b1fa1436b8c6ac06d2ea59b06cc34de
                }
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
                        <img src="http://www.clipartbest.com/cliparts/RTG/6or/RTG6orRrc.gif" style={{ width: "8px" }} />
                      </div>
                    ) : (
                      <div className="arrow_down">
                        {/* <BsFillCaretDownFill size={10} />*/}
                        <img src="https://i2.wp.com/exergic.in/wp-content/uploads/2018/06/Red-animated-arrow-down.gif?fit=600%2C600&ssl=1" style={{ width: "8px" }} />
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
                    <TitleValue>685632</TitleValue>
                  </ValueName>
                </Value>
                <Value>
                  {/* <TitleIcon src={transactionLogo} /> */}
                  <ValueName>
                    <Title>Contract</Title>
                    <ContractButton> {shorten(contract)}</ContractButton>
                  </ValueName>
                </Value>
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
                    <ContractButton>www.usdc.com</ContractButton>
                  </ValueName>
                </Value>
                <Value>
                  {/* <TitleIcon src={accountLogo} /> */}
                  <ValueName>
                    <Title>Social Media</Title>

                    <Icons>
                      <FiMail
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}
                      />
                      <FaRedditSquare
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
                      <AiOutlineTwitter
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
                      <AiOutlineTwitter
                        style={{
                          color: "#a09e9e",
                          cursor: "pointer",
                          marginRight: "4px",
                        }}
                      />
                    </Icons>
                  </ValueName>
                </Value>
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
