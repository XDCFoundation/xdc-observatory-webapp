import React, { useEffect, useState } from "react";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import HolderGraphBar from "../explorer/holderGraph";
import TokenMarketDataTable from "./tokenMarketData";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import Tokentabs from "./tokentabs";
import TokentabsForAnalyics from "./tokentabsForAnalyics";
import { useParams } from "react-router-dom";
import TokenData from "../../services/token";
import Utility from "../../utility";
import Utils from "../../utility";
import ReactHtmlParser from "react-html-parser";
import ContractData from "../../services/contract";

const useStyles = makeStyles((theme) => ({
  transfer: {
    height: "38px",
  },
  websiteLink: {
    color: "#2149b9 !important",
    fontFamily: "Inter",
    fontWeight: "600",
  },
  "@media (min-width: 0px) and (max-width: 767px)": {
    maxWidth: "20px",
  },
}));
const MainContainer = styled.div`
  width: 75.125rem;
  height: 16.563rem;
  padding-top: 27px;
  padding-left: 26px;
  border-radius: 12px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  display: flex;
  margin: 30px auto auto auto;

  @media (min-width: 767px) and (max-width: 1240px) {
    flex-direction: column;
    width: 41.5rem;
    height: 38.625rem;
    padding: 0 1.875rem;
  }
  @media (max-width: 767px) {
    flex-direction: column-reverse;
    width: 21rem;
    height: 32.063rem;
    padding: 0 0.75rem;
  }
`;
const MobileScreen = styled.div`
  margin-right: 3px;
  @media (min-width: 767px) {
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
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 0px 0px 0px 0px;
    width: auto;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
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
  // padding-bottom: 1.125rem;
  @media (max-width: 767px) {
    padding: 1.875rem 0 0 0;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    padding: 1.5rem 0 0.125rem;
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
  @media (min-width: 0px) and (max-width: 767px) {
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
  color: #686868;
  font-size: 0.875rem;
  font-family: "Inter";
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;

  margin-bottom: 5px;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.75rem;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
  }
`;
const TitleValue = styled.div`
  font-size: 1rem;
  font-family: Inter;
  font-weight: bold;
  line-height: normal;

  color: #2a2a2a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
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
  font-size: 28px;
  font-weight: bold;
  font-family: Inter;
  color: #2a2a2a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 1.1875rem;
    font-weight: bold;
    color: #252525;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    font-size: 1.5rem;
  }
`;
const Line1 = styled.hr`
  background-color: #e3e7eb !important;
  width: 100%;
  position: absolute;
  top: 30%;
  left: 0%;
  @media (max-width: 767px) {
    margin-top: 2px;
    width: 100%;
    top: 30%;
  }
  @media (min-width: 768px) {
    width: 100%;
    top: 20%;
    margin-top: 2px;
  }
`;
const LeftTopSec = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  font-family: Inter;

  color: #2a2a2a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 1rem;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
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

  border: none;
  color: #2149b9;
  padding-top: 0px;
  padding-left: 0px;
  margin-top: -8px;
  @media (max-width: 767px) {
    font-size: 0.875rem;
  }
`;
// const RightFirst = styled.div`
//   flex: 0.1;
//   position: relative;
//   display: flex;
//   justify-content: space-between;
//   font-size: 2px;
//   align-items: center;
// `;
const RightTop = styled.div`
  flex: 0.2;
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  padding-bottom: 7px;
`;

const RightTitle = styled.div`
  font-size: 0.938rem;
  font-weight: 600;
  font-family: Inter;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;

  color: #2a2a2a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    text-align: left;

    color: #2a2a2a;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    font-size: 0.875rem;
    text-align: left;

    color: #2a2a2a;
  }
`;
const Line2 = styled.hr`
  background-color: #e3e7eb !important;
  width: 100%;
  position: absolute;
  top: 30%;
  left: 0%;
  @media (max-width: 767px) {
    width: 100%;
    top: 30%;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 100%;
    top: 20%;
    // display: none;
  }
`;
const RightTopSec = styled.div`
  width: 3.998rem;
  height: 1.3rem;
  font-size: 0.875rem;
  padding: 4.5px;
  color: #2a2a2a;
  border: none;
  border-radius: 4px;
  background-color: #e3e7eb;
  background-size: cover;
  font-family: "Inter" !important;
  font-weight: 600;
  padding-top: 1px;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.75rem;
    //width: 3.438rem;
    height: 1.375rem;
    white-space: nowrap;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    font-size: 0.875rem;
    width: 4.063rem;
    height: 1.375rem;
  }
`;

const GraphContainer = styled.div`
  width: 100%;
  flex: 0.8;
  padding-left: 0px;
`;

const ShowTopHeaderForMobileOnly = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
`;
const ShowTopHeaderForNonMobileOnly = styled.div`
  display: block;
  @media (max-width: 767px) {
    display: none;
  }
`;
const TokenImg = styled.img`
  height: 42px;
  width: 42px;
  margin-right: 13px;
`;

const Icons = styled.div`
  padding-top: 1px;
`;
const SocialMediaIcon = styled.img`
  margin-right: 15px;
  cursor: pointer;
`;

export default function TokenDataComponent() {
  const classes = useStyles();
  // let changePrice = 5.21;
  let changeHolders = 0;
  // let tokenName = 'XDC'
  // let contract = "xdc238610bfafef424e4d0020633387966d61c4c6e3";
  const [marketCapVal, setMarketCapValue] = React.useState(0);
  const [holders, setHolders] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [contractData, setContractData] = useState("");
  const { address } = useParams();
  const { tn } = useParams();

  let url = new URL(window.location.href);
  let searchParams = new URLSearchParams(url.search);
  const isAnalticsTab = searchParams.get("isAnalytics");

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }
  const CoinMarketExchangeForToken = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        TokenData?.CoinMarketExchangeForToken(data)
      );

      if (responseData && responseData?.responseCode !== 400) {
        setMarketCapValue(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let values = { address: address, skip: 0, limit: 10 };
    listOfHolders(values);
    let value = { addr: address };
    transferDetail(value);
    getContractDetails(value);
    // CoinMarketExchangeForToken(tn);
  }, []);
  const [transfer, settransfer] = useState([]);

  const transferDetail = async (values) => {
    let [error, tns] = await Utils.parseResponse(
      TokenData.getTotalTransferTransactionsForToken(values)
    );
    if (error || !tns) return;
    settransfer(tns.responseData);
  };

  const listOfHolders = async (values) => {
    let urlPath = `${address}`;
    let [error, tns] = await Utils.parseResponse(
      TokenData.getListOfHoldersForToken(values)
    );
    if (error || !tns) return;
    setHolders(tns);
  };
  const getContractDetails = async () => {
    setLoading(true);
    let urlPath = `${address}`;
    let [error, contractStatusData] = await Utils.parseResponse(
      ContractData.getContractDetailsUsingAddress(urlPath, {})
    );
    if (error || !contractStatusData) return;
    setContractData(contractStatusData);
    setLoading(false);
  };
  React.useEffect(() => {
    (async () => {
      await CoinMarketExchangeForToken(tn);
    })();
  }, []);
  let activeCurrency = window.localStorage.getItem("currency");
  let tokenPriceVal = 0;
  let tokenChanges24hr = 0;
  let CurrencySymbol = "";
  if (marketCapVal) {
    if (activeCurrency == "USD") {
      CurrencySymbol = "$";
      tokenPriceVal = marketCapVal.parseDataUSD.tokenPrice;
      tokenChanges24hr = marketCapVal.parseDataUSD.pricePercentageChange24_hr;
    } else if (activeCurrency == "EUR") {
      CurrencySymbol = "€";
      tokenPriceVal = marketCapVal.parseDataEUR.tokenPrice;
      tokenChanges24hr = marketCapVal.parseDataEUR.pricePercentageChange24_hr;
    } else if (activeCurrency == "INR") {
      CurrencySymbol = "₹";
      tokenPriceVal = marketCapVal.parseDataINR.tokenPrice;
      tokenChanges24hr = marketCapVal.parseDataINR.pricePercentageChange24_hr;
    } else {
      CurrencySymbol = "$";
      tokenPriceVal = marketCapVal.parseDataUSD.tokenPrice;
      tokenChanges24hr = marketCapVal.parseDataUSD.pricePercentageChange24_hr;
    }
  }
  let numberStatus = Math.sign(tokenChanges24hr);
  
  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <Tokensearchbar />
        <MainContainer>
          <LeftContainer>
            {/*{window.innerWidth >= 768 ? (*/}
            <ShowTopHeaderForNonMobileOnly>
              <TopHeaderSection
                tn={tn}
                tokenImage={contractData?.contractResponse?.tokenImage}
                CurrencySymbol={CurrencySymbol}
                tokenPriceVal={tokenPriceVal}
                numberStatus={numberStatus}
                tokenChanges24hr={tokenChanges24hr}
                isLoading={isLoading}
              />
            </ShowTopHeaderForNonMobileOnly>
            {/*) : (*/}
            {/*  ""*/}
            {/*)}*/}
            <LeftSec>
              <ValueMain>
                <MobileScreen>
                  <Value>
                    {/* <TitleIcon src={blockHeightImg} /> */}

                    <ValueName>
                      <Title>Holders</Title>
                      <div className="last_value">
                        <TitleValue>{holders?.responseCount}</TitleValue>
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
                                <div className="arrow_up_token">
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
                    <ValueName className={classes.transfer}>
                      <Title>Transfer</Title>
                      {}
                      <TitleValue>
                        {!transfer ? "" : transfer}
                      </TitleValue>
                    </ValueName>
                  </Value>
                  <Value>
                    {/* <TitleIcon src={transactionLogo} /> */}
                    <ValueName>
                      <Title>Contract</Title>
                      <ContractButton>
                        {" "}
                        <a className="token-link" href={`/address/${address}`}>
                          {" "}
                          {shorten(address)}
                        </a>
                      </ContractButton>
                    </ValueName>
                  </Value>
                </MobileScreen>
                <MobileScreen>
                  <Value>
                    {/* <TitleIcon src={difficultyLogo} /> */}
                    <ValueName>
                      <Title>Decimal</Title>
                      <TitleValue>
                        {contractData?.contractResponse?.decimals}
                      </TitleValue>
                    </ValueName>
                  </Value>
                  <Value>
                    {/* <TitleIcon src={maxLogo} /> */}
                    <ValueName>
                      <Title>Website</Title>
                      {!isLoading ? (contractData?.contractResponse?.website ?
                      (<a className={classes.websiteLink} href={contractData?.contractResponse?.website} target="_blank">
                        {contractData?.contractResponse?.website}
                      </a>):
                      (<TitleValue>Not available</TitleValue>)):("")}
                      {/* <ContractButton>www.usdc.com</ContractButton> */}
                    </ValueName>
                  </Value>
                  <Value>
                    {/* <TitleIcon src={accountLogo} /> */}
                    <ValueName>
                      <Title>Social Media</Title>
                      {!isLoading ? ((contractData?.contractResponse?.telegram ||
                        contractData?.contractResponse?.facebook ||
                        contractData?.contractResponse?.twitter) ?
                      <Icons>
                          {contractData?.contractResponse?.telegram ? 
                            (<a href={contractData?.contractResponse?.telegram}  target="_blank">
                              <SocialMediaIcon style={{width: "14px",}}src="/images/Telegram.svg" alt="telegram"></SocialMediaIcon>
                          </a>):("")}

                          {contractData?.contractResponse?.facebook ? 
                            (<a href={contractData?.contractResponse?.facebook}  target="_blank">
                              <SocialMediaIcon src="/images/facebook.svg" alt="facebook"></SocialMediaIcon>
                            </a>):("")}

                            {contractData?.contractResponse?.twitter ? 
                            (<a href={contractData?.contractResponse?.twitter}  target="_blank">
                              <SocialMediaIcon src="/images/twitter.svg" alt="twitter"></SocialMediaIcon>
                            </a>):("")}
                      </Icons>:<TitleValue>Not available</TitleValue>):("")}
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
          {/*{window.innerWidth < 768 ? (*/}
          <ShowTopHeaderForMobileOnly>
            <TopHeaderSection
              tn={tn}
              tokenImage={contractData?.contractResponse?.tokenImage}
              CurrencySymbol={CurrencySymbol}
              tokenPriceVal={tokenPriceVal}
              numberStatus={numberStatus}
              tokenChanges24hr={tokenChanges24hr}
              isLoading={isLoading}
            />
          </ShowTopHeaderForMobileOnly>
          {/*) : (*/}
          {/*  ""*/}
          {/*)}*/}
        </MainContainer>
        {marketCapVal == 0 ? (
          ""
        ) : (
          <TokenMarketDataTable marketCap={marketCapVal} />
        )}
        <br />
        <br />
        {isAnalticsTab ? (
          <TokentabsForAnalyics contractStatusData={contractData} />
        ) : (
          <Tokentabs contractStatusData={contractData} />
        )}
        <br />
        <br />
        <FooterComponent />
      </div>
    </>
  );
}

const TopHeaderSection = ({
  tn,
  tokenImage,
  CurrencySymbol,
  tokenPriceVal,
  numberStatus,
  tokenChanges24hr,
  isLoading,
}) => {
  return (
    <>
      {/* <RightTop>
              <Line1></Line1>
            </RightTop> */}
      <LeftFirst>
        <LeftTop>
          {/* {logo.length > 0 ?
                  <IconLogo src={logo} />
                  :
                  <span style={{ width: '25px', height: '25px', borderRadius: '15px', border: '1px solid', fontSize: '15px', marginTop: '5px', marginRight: '5px' }}>{tokenName.slice(0, 2).toUpperCase()}</span>
                } */}
          {!isLoading ? (
            tokenImage ? (
              <TokenImg src={tokenImage} />
            ) : (
              <TokenImg src={"/images/XRC20-Icon.svg"} />
            )
          ) : (
            ""
          )}

          <LeftTitle>{tn.toUpperCase()}</LeftTitle>
        </LeftTop>

        <LeftTopSecMain>
          <LeftTopSec>
            {CurrencySymbol}
            {!tokenPriceVal ? "" : tokenPriceVal.toFixed(10)}
          </LeftTopSec>
          <div
            className={
              numberStatus > 0
                ? "data_value_green last_value_main"
                : "data_value_red"
            }
          >
            {!tokenChanges24hr ? (
              ""
            ) : (
              <>
                <div className="value_changePrice">
                  {numberStatus > 0 ? (
                    <div className="arrow_up">
                      {/*<BsFillCaretUpFill size={10} />*/}
                      <img src={"/images/Up.svg"} style={{ width: "8px" }} />
                    </div>
                  ) : (
                    <div className="arrow_down">
                      {/* <BsFillCaretDownFill size={10} />*/}
                      <img src={"/images/Down.svg"} style={{ width: "8px" }} />
                    </div>
                  )}
                  &nbsp;{tokenChanges24hr.toFixed(2)}%
                </div>
              </>
            )}
          </div>
        </LeftTopSecMain>
      </LeftFirst>
      <hr></hr>
    </>
  );
};
