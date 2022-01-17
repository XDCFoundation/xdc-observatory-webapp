import React from "react";
import styled from "styled-components";
import LoginDialog from "../explorer/loginDialog"
import { sessionManager } from "../../managers/sessionManager";
const Container = styled.div`
  margin: 8.125rem 0 0 0;
  height: 70rem;
`;
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 110px 0 0 0;
  width: 36.188rem;
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
  letter-spacing: 0px;
  color: #007b2c;
`;
const Rectangle = styled.div`
  width: 579px;
  height: 71px;
  margin: 29px 670px 61px 671px;
  padding: 19px 91px 18px 92px;
  border-radius: 6px;
  background-color: #f3fff7;
  color: #007b2c;
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
          Your email is verified. You may proceed to log in with your user ID
          and password.
        </Rectangle>
        {!isloggedIn ? <LoginDialog open={loginDialogIsOpen} onClose={closeLoginDialog} verifiedEmail={true}/>:<></>}
        <LoginButton style={{pointerEvents: isloggedIn? "none" : ""}} onClick={handleLogin}>
          {" "}
          Log in to your account
        </LoginButton>
      </MainDiv>
    </Container>
  );
}

export default VerifiedEmailScreenComponent;
