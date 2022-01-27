import React, { Component } from "react";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import { Grid } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  padding: 100px 90px;
  background-color: transparent;
  @media (max-width: 1240px) {
    flex-direction: column;
    padding: 0px;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  flex: 0.6;
  flex-direction: column;
  padding: 100px 0px;
`;
const RightContainer = styled.div`
  display: flex;
  flex:0.4    
  background-color: #fff;
  border-radius: 20px;
  height:601px;
`;
const XDC = styled.div`
  font-size: 33px;
  font-weight: 600;
  color: #fff;
  margin-left: 10px;
`;
const XdcLogo = styled.div`
  display: flex;
`;
const FirstLineText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  width: 83%;
  margin-left: 10px;
  margin-top: 40px;
`;
const SecondLineText = styled.div`
  display: flex;
  margin: 20px 0px 20px 0px;
  align-items: center;
`;
const RightBottomText = styled.div`
  display: flex;
  margin: 25px 0px 25px 0px;
  align-items: center;
`;
const LogoText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-left: 50px;
`;
const IconLogo = styled.div``;

const RightContainerMain = styled.div`
  margin: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const RightTopContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const RightBelowContainer = styled.div``;
const ButtonGlobalid = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 29px;
  background-color: #0d51ff;
  color: #fff;
`;
const RightTopText = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #242424;
`;
const RightTopText2 = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  margin: 15px;
`;
const RightBottomLogoText = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  color: #2a2a2a;
  margin-left: 20px;
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
  margin-top: 40px;
`;
const RightTopLogo = styled.div``;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 20px;
`;
const CrossButton = styled.div`
  cursor: pointer;
`;

export default function GlobalIdCon() {
  const history = useHistory();
  function handleClick() {
    window.location.href = "/";
  }
  function btoa(str) {
    return Buffer.from(str, "binary").toString("base64");
  }
  var randomText = btoa(Math.random().toString()).substr(10, 10).toLowerCase();

  return (
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
      <Grid className="table-grid-block-global-id grid-block-table">
        <MainContainer>
          <LeftContainer>
            <XDC>Login to your account to get started</XDC>
            <FirstLineText>
              Log in to your account gives you access to following features on
              XDC Observatory:
            </FirstLineText>
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
          </LeftContainer>
          <RightContainer>
            <RightContainerMain>
              <RightTopContainer>
                <RightTopText>Continue with GlobaliD</RightTopText>
                <RightTopText2>
                  We use GlobaliD to keep your personal information and the XDC
                  Network safe.
                </RightTopText2>
                <RightTopLogo>
                  <img src={"/images/global-id.svg"} />
                </RightTopLogo>
              </RightTopContainer>
              <RightBelowContainer>
                <RightBottomText>
                  <IconLogo>
                    <img
                      className="global-id-icon"
                      src={"/images/addTransactionLabel.svg"}
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
                      src={"/images/addTransactionLabel.svg"}
                    />
                  </IconLogo>
                  <RightBottomLogoText>
                    GlobaliD guarantees that your information remains private
                    and secure with the latest state of the art encryption.
                  </RightBottomLogoText>
                </RightBottomText>
                <a
                  href={
                    "https://connect.global.id/?client_id=808e791a-70b4-43a4-bb30-6f33c610d4ec&response_type=code&scope=openid&redirect_uri=http://localhost:3000/&qr_only=true&acrc_id=35fde324-7736-491a-b89f-c29854417300&document_id=tos pp&nonce=" +
                    randomText
                  }
                >
                  <ButtonGlobalid>Continue with GlobaliD</ButtonGlobalid>
                </a>
                <SignUpBottom>Don’t have an account? Sign up</SignUpBottom>
              </RightBelowContainer>
            </RightContainerMain>
          </RightContainer>
        </MainContainer>
      </Grid>
    </div>
  );
}
