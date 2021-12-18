import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";


const useStyles = makeStyles((theme) => ({
  textStyle1: {
    fontWeight: "600",
    color: "red",
  },

  textStyle2: {
    color: "#2149b9",
  },

  textStyle3: {
    fontWeight: 500,
  },
}));

export default function ActivateAccount() {
  
  const classes = useStyles();
  return (
    <div>
      <Tokensearchbar />
      <div className="activateAccountBox">
        <div className="activateHeadingContainer"><img src={require("../../../src/assets/images/noun-email-4466398.svg")} />
        <div className="activateHeading">Activate Your Account</div>
        </div>
        <div className="activateTextContainer">Your account registration has been submitted and is pending email verification</div>
        <div className="activateText" style={{marginTop: "10px"}}>we have sent an email to "--------------email.com" with a link to a link to activate your account.</div>
        <div className="activateText" style={{marginBottom: "25px"}}>To complete the sign-up process, please click on the confirmation link in the email.</div>
        <div className="activateText">If you have not recieve a confirmation email, please check your spam folder.</div>
      </div>
      <FooterComponent />
    </div>
  );
}


