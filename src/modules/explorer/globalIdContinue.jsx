import React, { Component, useState, useEffect } from "react";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import { Grid } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router";

const MainContainer = styled.div`
  display: flex;
  padding: 100px 90px;
  background-color: transparent;
  justify-content: center;
  @media (max-width: 1240px) {
    flex-direction: column;
    padding: 0px;
    align-items: center;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 0px;
  @media (min-width: 768px) and (max-width: 1240px) {
    align-items: center;
    padding: 60px 0px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const RightContainer = styled.div`
  display: flex;
  width: 540px;
  background-color: #fff;
  border-radius: 20px;
  height: 601px;
  @media (min-width: 768px) and (max-width: 1240px) {
    border-radius: 12px;
    width: 650px;
    height: 478px;
  }
  @media (max-width: 767px) {
    width:20rem;
  }
`;
const XDC = styled.div`
  font-size: 33px;
  font-weight: 600;
  color: #fff;
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 28px;
  }
`;
const XdcLogo = styled.div`
  display: flex;
  align-items: center;
`;
const FirstLineText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  width: 70%;
  margin-top: 40px;
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 15px;
    text-align: center;
    margin-top: 20px;
  }
`;
const SecondLineText = styled.div`
  display: flex;
  margin: 12px 0;
  align-items: center;
  @media (min-width: 768px) and (max-width: 1240px) {
    text-align: center;
    flex-direction: column;
    width: 100%;
  }
`;
const RightBottomText = styled.div`
  display: flex;
  margin: 25px 0px 30px 0px;
  align-items: center;
`;
const LogoText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-left: 50px;
  @media (min-width: 768px) and (max-width: 1240px) {
    margin: 15px 0 0 0;
    font-size: 14px;
  }
`;
const IconLogo = styled.div``;

const RightContainerMain = styled.div`
  margin: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    margin: 30px 0;
    padding: 0 10px;
  }
`;
const RightTopContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const RightBelowContainer = styled.div`
  @media (max-width: 767px) {
    margin-top: 10px;
  }
`;
const ButtonGlobalid = styled.button`
  width: 478px;
  height: 50px;
  margin: 15px 0;
  border-radius: 29px;
  background-color: #0d51ff;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 290px;
    height: 44px;
    border-radius: 4px;
    background-color: #0d51ff;
    align-items: center;
    margin: 10px 150px;
  }
  @media (min-width: 0px) and (max-width: 767px) {
    width: 290px;
    height: 44px;
    border-radius: 4px;
    background-color: #0d51ff;
    align-items: center;
    margin: 35px;
  }
`;
const RightTopText = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #242424;
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 17px;
  }
  @media (max-width: 767px) {
    font-size: 17px;
    margin:0 55px 0 35px
  }
`;
const RightTopText2 = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  margin: 15px 45px;
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
    margin: 15px 101px;
  }
  @media(max-width:767px){
    font-size:14px
    width:75%
  }
`;
const RightBottomLogoText = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  color: #2a2a2a;
  margin-left: 20px;
  width:80%;
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
    width:83%;
  }
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 14px;
    width: 75%;
  }
`;
const SignUpBottom = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #2a2a2a;
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;
const RightTopLogo = styled.div``;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 20px;
  @media (min-width: 0px) and (max-width: 767px) {
    display: none;
  }
`;
const CrossButton = styled.div`
  cursor: pointer;
`;
const SignUp = styled.div`
  color: #0d51ff;
  cursor: pointer;
`;
const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1240px) {
    flex-direction: row;
    margin: 20px 0 0 0;
  }
`;
const RightTopDiv = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 767px) {
    justify-content: space-between;
    align-items: center;
  }
`;
const RightTopBack = styled.div`
  @media (min-width: 767px) {
    display: none;
  }
  display: flex;
  width: 20px;
  height: 20px;
`;
const GlobalIdButtonContinue = styled.div`
display:flex;
justify-content:center;
`;
export default function GlobalIdCon() {
  const [LoginText, setLoginText] = useState(1);
  const history = useHistory();
  let { mode } = useParams();
  function handleClick() {
    window.location.href = "/";
  }
  function btoa(str) {
    return Buffer.from(str, "binary").toString("base64");
  }
  var randomText = btoa(Math.random().toString()).substr(10, 10).toLowerCase();
  useEffect(() => {
    if (mode === "signup") setLoginText(2);
  }, []);
  return (
    <div>
      <div className="global-id">
        <Header>
          <XdcLogo>
            <a className="logo_tokensearch" href={"/"}>
              {" "}
              <img
                className="Shape"
                onClick={handleClick}
                src={"/images/XDC-Icon-Logo.svg"}
              />
            </a>

            <a className="XDC" href={"/"}>
              XDC
            </a>
          </XdcLogo>
          <CrossButton>
            <img
              className="Shape"
              onClick={handleClick}
              src={"/images/cross.svg"}
            />
          </CrossButton>
        </Header>
        <Grid className="table-grid-block-global-id grid-block-table-global-id">
          <MainContainer>
            <LeftContainer>
              {(() => {
                switch (LoginText) {
                  case 1:
                    return (
                      <>
                        <XDC>Login to your account to get started</XDC>
                        <FirstLineText>
                          Log in to your account gives you access to following
                          features on XDC Observatory:
                        </FirstLineText>
                      </>
                    );
                  case 2:
                    return (
                      <>
                        <XDC>Create your account to get started</XDC>
                        <FirstLineText>
                          Creating the account gives you access to following
                          features on XDC Observatory:
                        </FirstLineText>
                      </>
                    );
                  default:
                    return;
                }
              })()}
              <IconDiv>
                <SecondLineText>
                  <IconLogo>
                    <img
                      className="global-id-icon"
                      src={"/images/createWatchlist.svg"}
                    />
                  </IconLogo>
                  <LogoText>Create Watchlist and get notifications</LogoText>
                </SecondLineText>
                <SecondLineText>
                  <IconLogo>
                    <img
                      className="global-id-icon"
                      src={"/images/addTransactionLabel.svg"}
                    />
                  </IconLogo>
                  <LogoText>Add Transaction Label</LogoText>
                </SecondLineText>
                <SecondLineText>
                  <IconLogo>
                    <img
                      className="global-id-icon"
                      src={"/images/add-private-tag-to-address.svg"}
                    />
                  </IconLogo>
                  <LogoText>Add Private Tags to Addresses</LogoText>
                </SecondLineText>
              </IconDiv>
            </LeftContainer>
            <RightContainer>
              <RightContainerMain>
                <RightTopContainer>
                  <RightTopDiv>
                    <RightTopBack>
                      <img onClick={handleClick} src="/images/back.svg" />
                    </RightTopBack>
                    <RightTopText>Continue with GlobaliD</RightTopText>
                  </RightTopDiv>{" "}
                  <RightTopText2>
                    We use GlobaliD to keep your personal information and the
                    XDC Network safe.
                  </RightTopText2>
                  <RightTopLogo>
                    <img
                      src={"/images/global-id.svg"}
                      className="global-id-image"
                    />
                  </RightTopLogo>
                </RightTopContainer>
                <RightBelowContainer>
                  <RightBottomText>
                    <IconLogo>
                      <img
                        className="global-id-icon"
                        src={"/images/group-27.svg"}
                      />
                    </IconLogo>
                    <RightBottomLogoText>
                      Create a decentralized digital identity with GlobaliD to
                      securely connect to the XDC Network without passwords.
                    </RightBottomLogoText>
                  </RightBottomText>
                  <RightBottomText>
                    <IconLogo>
                      <img
                        className="global-id-icon"
                        src={"/images/group-26.svg"}
                      />
                    </IconLogo>
                    <RightBottomLogoText>
                      GlobaliD guarantees that your information remains private
                      and secure with the latest state of the art encryption.
                    </RightBottomLogoText>
                  </RightBottomText>
                  <GlobalIdButtonContinue>
                    <a
                      href={
                        "https://connect.global.id/?client_id=808e791a-70b4-43a4-bb30-6f33c610d4ec&response_type=code&scope=openid&redirect_uri=https://observer.xdc.org/&qr_only=true&acrc_id=35fde324-7736-491a-b89f-c29854417300&document_id=tos pp&nonce=" +
                        randomText
                      }
                    >
                      <ButtonGlobalid>Continue with GlobaliD</ButtonGlobalid>
                    </a>
                  </GlobalIdButtonContinue>

                  {/* <SignUpBottom>
                    {" "}
                    {LoginText == 1
                      ? "Don’t have an account?"
                      : "Already have an account?"}
                    {(() => {
                      switch (LoginText) {
                        case 1:
                          return (
                            <SignUp onClick={() => setLoginText(2)}>
                              &nbsp;Sign up
                            </SignUp>
                          );
                        case 2:
                          return (
                            <SignUp onClick={() => setLoginText(1)}>
                              &nbsp;Sign in
                            </SignUp>
                          );
                        default:
                          return;
                      }
                    })()}
                  </SignUpBottom> */}
                </RightBelowContainer>
              </RightContainerMain>
            </RightContainer>
          </MainContainer>
        </Grid>
      </div>
    </div>
  );
}
