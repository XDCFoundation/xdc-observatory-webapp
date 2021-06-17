import React from "react";
// import { Row } from 'simple-flexbox'
import "../../assets/styles/custom.css";
import styled from "styled-components";
import logo from "../../images/XDC-Icon.svg";
import blockHeightImg from "../../images/Block Height.svg";
import priceLogo from "../../images/Gas Price.svg";
import transactionLogo from "../../images/Transaction.svg";
import maxLogo from "../../images/Current Max_TPS.svg";
import difficultyLogo from "../../images/Difficulty.svg";
import accountLogo from "../../images/Accounts.svg";
import Tab from "./Tab";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";

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
  flex: 0.53;
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div`
  flex: 0.47;
  display: flex;
  margin-left: 12px;
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
  // margin-left: 2px;
`;
const Title = styled.div`
  color: #a09e9e;
  font-size: 10px;
  font-family: "Inter";
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.65px;
  margin-bottom: 5px;
`;
const TitleValue = styled.div`
  font-size: 13.5px;
  font-family: Inter;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.58px;
  color: #252525;
`;
const LeftTop = styled.div`
  display: flex;
  align-item: center;
  text-align: center;
  justify-content: center;
`;
const IconLogo = styled.img`
  width:52%;
  height:52%
  margin-right: 12px;
  margin-left:5px;
`;
const LeftTitle = styled.div`
margin-top:3px
  font-size: 20px;
  font-weight: 600;
  font-family: Inter;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  color: #252525;
`;
const Line = styled.hr`
  backgroundcolor: #e3e7eb;
  width: 440px;
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
export default function BlockChainDataComponent() {
  let changePrice = -8.156;
  let changeAccounts = 352;
  return (
    <MainContainer>
      <LeftContainer>
        <LeftFirst>
          <LeftTop>
            <IconLogo src={logo} />
            <LeftTitle>XDC</LeftTitle>
          </LeftTop>
          <LeftTopSecMain>
            <LeftTopSec>$0.054024</LeftTopSec>
            <div
              className={
                changePrice > 0 ? "data_value_green" : "data_value_red"
              }
            >
              <div className="value_changePrice">
                {changePrice > 0 ? (
                  <div className="arrow_up">
                    <BsFillCaretUpFill size={10} />
                  </div>
                ) : (
                  <div className="arrow_down">
                    <BsFillCaretDownFill size={10} />
                  </div>
                )}
                {changePrice}
              </div>
            </div>
          </LeftTopSecMain>

          <Line></Line>
        </LeftFirst>
        <LeftSec>
          <ValueMain>
            <Value>
              <TitleIcon src={blockHeightImg} />
              <ValueName>
                <Title>Block Height</Title>
                <TitleValue>30,080,290</TitleValue>
              </ValueName>
            </Value>
            <Value>
              <TitleIcon src={priceLogo} />
              <ValueName>
                <Title>Gas Price</Title>
                <TitleValue>0.0000034</TitleValue>
              </ValueName>
            </Value>
            <Value>
              <TitleIcon src={transactionLogo} />
              <ValueName>
                <Title>Transactions</Title>
                <TitleValue>148,875,836</TitleValue>
              </ValueName>
            </Value>
            <Value>
              <TitleIcon src={difficultyLogo} />
              <ValueName>
                <Title>Difficulty</Title>
                <TitleValue>85412.0</TitleValue>
              </ValueName>
            </Value>
            <Value>
              <TitleIcon src={maxLogo} />
              <ValueName>
                <Title>Current/Max TPS</Title>
                <TitleValue>0/2000</TitleValue>
              </ValueName>
            </Value>
            <Value>
              <TitleIcon src={accountLogo} />
              <ValueName>
                <Title>Accounts</Title>
                <div className="last_value">
                  <TitleValue>24,273</TitleValue>
                  <div
                    className={
                      changeAccounts > 0
                        ? "data_value_green last_value_main"
                        : "data_value_red"
                    }
                  >
                    <div className="value_p">
                      {changeAccounts > 0 ? (
                        <div className="arrow_up">
                          <BsFillCaretUpFill size={10} />
                        </div>
                      ) : (
                        <div className="arrow_down">
                          <BsFillCaretDownFill size={10} />
                        </div>
                      )}
                      {changeAccounts}
                    </div>
                  </div>
                </div>
              </ValueName>
            </Value>
          </ValueMain>
        </LeftSec>
      </LeftContainer>

      <RightContainer>
        <Tab />
      </RightContainer>
    </MainContainer>
  );
}
