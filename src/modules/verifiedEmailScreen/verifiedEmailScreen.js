import React from "react";
import styled from "styled-components";
import LoginDialog from "../explorer/loginDialog"
import { sessionManager } from "../../managers/sessionManager";
const Container = styled.div`
  margin: 8.125rem 0 15.125rem 0;
  @media (min-width: 0px) and (max-width: 767px) {
    margin: 2.125rem 0 7.125rem 0;
  }
`;
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 110px 15px 0;
  max-width: 37.188rem;
  width: 100%;
  margin: auto;
`;
const EmailVerified = styled.div`
  margin: 3px 0 3px 13px;
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  color: #007b2c;
`;
const Rectangle = styled.div`
  max-width: 579px;
  width: 100%;
  margin: 29px 670px 61px 671px;
  padding: 19px 91px 18px 92px;
  border-radius: 6px;
  background-color: #f3fff7;
  color: #007b2c;
  @media (min-width: 0px) and (max-width: 767px) {
    padding: 19px 33px 18px 33px;
  }

`;
const LoginButton = styled.button`
  width: 287px;
  height: 44px;
  padding: 12px 57px 13px 56px;
  border-radius: 4px;
  background-color: #3763dd;
  color: white;
`;
const Verified = styled.div`
  display: flex;
  justify-content: center;
`;

function VerifiedEmailScreenComponent() {

  const [loginDialogIsOpen, setLoginDialogIsOpen] = React.useState(false)
  const isloggedIn = sessionManager.getDataFromCookies("isLoggedIn");
  const handleLogin = () => setLoginDialogIsOpen(true)
  const closeLoginDialog = () => setLoginDialogIsOpen(false)

  return (
    <Container>
      <MainDiv>
        <Verified>
          <img alt="greenTick" src={"/images/greenTick.svg"} />{" "}
          <EmailVerified> Email Verified </EmailVerified>
        </Verified>
        <Rectangle>
          Your email is verified. You may proceed to login with your user name 
          and password.
        </Rectangle>
        {!isloggedIn ? <LoginDialog open={loginDialogIsOpen} onClose={closeLoginDialog} verifiedEmail={true} /> : <></>}
        <LoginButton style={{ pointerEvents: isloggedIn ? "none" : "" }} onClick={handleLogin}>
          {" "}
          Login to your account
        </LoginButton>
      </MainDiv>
    </Container>
  );
}

export default VerifiedEmailScreenComponent;
