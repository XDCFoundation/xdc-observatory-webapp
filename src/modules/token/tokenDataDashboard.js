import React, { useEffect, useState } from "react";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import logo from "../../assets/images/usdc.png";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaRedditSquare } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import HolderGraphBar from "../explorer/holderGraph";

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
  let changeHolders = 351;
  let contract = "xdc238610bfafef424e4d0020633387966d61c4c6e3";
  function shorten(b, amountL = 17, amountR = 0, stars = 3) {
    return `${b.slice(0, amountL)} ${".".repeat(stars)} ${b.slice(b.length)} `;
  }
  return (
    <MainContainer>
      <LeftContainer>
        <LeftFirst>
          <LeftTop>
            <IconLogo src={logo} />
            <LeftTitle>USDC</LeftTitle>
          </LeftTop>
          <LeftTopSecMain>
            <LeftTopSec>$0.061780</LeftTopSec>
            <div
              className={
                changePrice > 0
                  ? "data_value_green last_value_main"
                  : "data_value_red"
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
                &nbsp;{changePrice}%
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
                  <TitleValue>4521</TitleValue>
                  <div className="last_value">
                    <div
                      className={
                        changeHolders > 0
                          ? "data_value_green last_value_main"
                          : "data_value_red"
                      }
                    >
                      <div className="value_p">
                        {changeHolders > 0 ? (
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
  );
}
