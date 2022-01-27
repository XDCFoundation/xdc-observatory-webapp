import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import Table from "@material-ui/core/Table";
// import { Grid, TableContainer } from "@material-ui/core";
import styled from "styled-components";
// const Explorer = styled.div`
//   color: #2149b9;
// `;
const Heading = styled.div`
  font-family: Inter;
  font-size: 24px;
  font-weight: 600;
  
  color: #2a2a2a;
  @media (min-width:0px) and (max-width:767px) {
    font-size:18px;
  };
  
`;
const Subheading = styled.div`
  margin-top: 16px;
  font-size: 18px;
  font-weight: 600;
  
  color: #2a2a2a;
  @media (min-width:0px) and (max-width:767px) {
    font-size:15px;
  };
`;
const PointHeading = styled.div`
  font-weight: 600;
  margin: 32px 0 0 1px;
  font-size: 15px;
  
  color: #252525;
  @media (min-width:0px) and (max-width:767px) {
    margin-top:14px;
  };
`;
const Para = styled.div`
  margin: 16px 0 0 1px;
  font-family: Inter;
  font-size: 15px;

  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
`;
// const Point = styled.div`
//   font-size: 0.8rem;
//   margin-top: 1rem;
// `;

const Div = styled.div`
  width: 1202px;
  height: auto;
  margin: 55.5px auto 101px auto;
  padding: 32px 23px 115px 26px;
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: var(--white-two);
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
    overflow-x:hidden;
  };
  @media (min-width:0px) and (max-width:767px) {
    max-width: 360px;
    width: 100%;
    overflow-x:hidden;
  };
  @media (min-width:1240) {
   
    width: 100%;
  };
`;

const TableDiv = styled.div`
@media (min-width:768px) and (max-width:1240px) {
  max-width: 740px;
  width: 100%;
  overflow:scroll
 
};
`
const Block1 = styled.div`
  width: 1152px;
  font-size: 15px;
  
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 303px;
  };


`;
const CookiesList = styled.ol`
  margin-top: 10px
`;
const Block2 = styled.div`
  margin: 77px 13px 77px 1px;
  font-family: Inter;
  font-size: 15px;
 
  
 
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block3 = styled.div`
  width: 1136px;
  margin: 77px 16px 28px 1px;
 
  font-size: 15px;
 
  
 
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block4 = styled.div`
  width: 1121px;
 
  margin: 28px 16px 28px 7px;
  
  font-size: 15px;
 
  
 
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    
  };
`;
const Block5 = styled.div`
  width: 1136px;

  margin: 28px 16px 77px 1px;
 
  font-size: 15px;
  
  

  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block6 = styled.div`
  width: 1136px;
 
  margin: 77px 16px 28px 1px;
 
  font-size: 15px;

  
 
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block7 = styled.div`
  width: 1121px;

  margin: 28px 16px 28px 7px;
  
  font-size: 15px;
  
  
  
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block9 = styled.div`
  width: 1136px;
  
  margin: 77px 16px 28px 1px;
 
  font-size: 15px;
 
  
  
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block10 = styled.div`
  width: 1113px;
 
  margin: 28px 39px 28px 1px;
 
  font-size: 15px;
 
  
  
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block11 = styled.div`
  width: 1121px;
 
  margin: 28px 31px 28px 1px;
 
  font-size: 15px;
 
  
  
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block12 = styled.div`
  width: 1121px;
 
  margin: 28px 31px 22px 1px;
 
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block13 = styled.div`
  width: 1121px;
 
  margin: 22px 16px 28px 7px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block14 = styled.div`
  width: 1121px;
 
  margin: 28px 31px 28px 1px;
  font-family: Inter;
  font-size: 15px;
 
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block15 = styled.div`
  width: 1121px;

  margin: 28px 31px 28px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block16 = styled.div`
  width: 1121px;
 
  margin: 28px 31px 77px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block17 = styled.div`
  width: 1136px;
  
  margin: 77px 16px 28px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block18 = styled.div`
  width: 531px;
  
  margin: 28px 606px 5px 7px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block19 = styled.div`
  width: 1136px;

  margin: 5px 16px 77px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block20 = styled.div`
  width: 1136px;
 
  margin: 77px 16px 28px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block21 = styled.div`
  width: 1121px;
 
  margin: 28px 16px 28px 7px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block22 = styled.div`
  width: 1136px;

  margin: 28px 16px 77px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;

  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block23 = styled.div`
  width: 1136px;

  margin: 5px 16px 77px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block24 = styled.div`
  width: 1136px;
 
  margin: 77px 16px 80px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block25 = styled.div`
  width: 1131px;
 
  margin: 80px 21px 28px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  

  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block26 = styled.div`
  width: 824px;

  margin: 28px 313px 71px 7px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block27 = styled.div`
  width: 1136px;

  margin: 28px 16px 28px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block28 = styled.div`
  width: 828px;
 
  margin: 28px 309px 28px 7px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;
const Block29 = styled.div`
  width: 1136px;

  margin: 28px 16px 28px 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
   
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
  };
`;

const useStyles = makeStyles((theme) => ({
  table: {
    width: "1136px",
    height: "1487px",
    margin: "28px 16px 28px 1px",
    padding: "0 1.2px 0 0",
    border: "solid 1px #dedede",
    backgroundColor: "var(--white-two)",

  },
  materialTable: {
    '@media (min-width:0px) and (max-width:767px)': {
      "display": "none"
    }
  },
  mobileTable: {
    width: "300px",
    margin: "28px 16px 28px 1px",
    padding: "0 1.2px 0 0",
    border: "solid 1px #dedede",
    backgroundColor: "var(--white-two)",
    '@media (min-width:768px)': {
      "display": "none"
    }
  },
  purpose: {
    fontSize: "15px",
    fontWeight: "600",
    border: "solid 1px #dedede",

    textAlign: "center",
    color: "#252525",
    '@media (min-width:0px) and (max-width:767px)': {
      marginBottom: "12px",
      border: "none",
      textAlign: "left"
    }
  },
  rowNumber: {
    border: "solid 1px #dedede",
    padding: "0px 5px",
    textAlign: "center"

  },
  tableData: {
    border: "solid 1px #dedede",
    padding: "5px 0px 2px 5px"
  },
  personal: {
    border: "solid 1px #dedede",
    fontSize: "15px",
    fontWeight: "600",

    textAlign: "center",
    color: "#252525",
    '@media (min-width:0px) and (max-width:767px)': {
      marginTop: "12px",
      marginBottom: "12px",
      border: "none",
      textAlign: "left"
    }
  },
  lawful: {
    fontSize: "15px",
    fontWeight: "600",
    border: "solid 1px #dedede",

    textAlign: "center",
    color: "#252525",
    '@media (min-width:0px) and (max-width:767px)': {
      marginTop: "12px",
      marginBottom: "12px",
      border: "none",
      textAlign: "left"
    }
  },
  rectangleCopy5: {
    width: "531px",
    margin: "28px 606px 5px 7px",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",

    textAlign: "left",
    color: "#252525",
    '@media (min-width:0px) and (max-width:767px)': {
      width: "300px",
      margin: "35px 2px 0px 0px"
    }
  },
  hash: {
    width: "106.6px",
    height: "38px",
    margin: "19px 58.8px 32.2px 70.4px",
    border: "solid 1px #dedede",
    textAlign: "center",
    color: "#252525",
  },
  row: {
    border: "solid 1px #dedede",
    textAlign: "center",
    color: "#252525",
    '@media (min-width:0px) and (max-width:767px)': {
      border: "none",
      textAlign: "left"
    }
  },
  blockNumber: {
    width: "271px",
    height: "38px",
    margin: "31.8px 36.6px 3px 17.4px",
    fontFamily: "Inter",
    fontSize: "15px",
    fonWeight: "600",
    fontStretch: "normal",

    fontStyle: "normal",
    lineHeight: "normal",

    textAlign: "left",
    color: "#252525",
  },
  blockData: {
    width: "398px",
    height: "152px",
    margin: "31.8px 14.8px 6px 13.4px",
    fontFamily: "Inter",
    fontSize: "15px",
    fonWeight: "600",
    fontStretch: "normal",

    fontStyle: "normal",
    lineHeight: "normal",

    textAlign: "left",
    color: "#252525",
  },
  textStyle: {
    fontFamily: "Inter",
    fontSize: "15px",
    fonWeight: "600",
  },
}));

function PrivacyPolicy() {
  const classes = useStyles();
  return (
    <div>
      <Tokensearchbar />
      <Div >
        <div className="color-2149b9">
          <Heading>Privacy Policy</Heading>
          <Subheading>1. PURPOSE OF THIS PRIVACY NOTICE</Subheading>
          <Block1>
            <Para>
              The purpose of this privacy notice is to give you information on
              how XDC Foundation processes your Personal Data through your use
              of the website at <br /> <a href="">https://observer.xdc.org/</a> (hereinafter
              referred to as the “Website”), including any data you may provide
              through the Website when you sign up to use any of the services we
              provide.
            </Para>
            <Para>
              It is important that you read this privacy notice together with
              any other privacy notice or fair processing notice we may provide
              on specific occasions when we are processing Personal Data about
              you so that you are fully aware of how and why we are using your
              data. This privacy notice supplements all other notices and is not
              intended to supersede them..
            </Para>
          </Block1>
          <Block2>
            <PointHeading>
              2. WHO WE ARE AND HOW YOU CAN CONTACT US
            </PointHeading>
            <PointHeading>(a) Who we are</PointHeading>
            <Para>
              XDC Foundation, SIX, 2nd Floor, Cricket Square, P.O. Box 2681,
              George Town, Grand Cayman, KY1-1111, Cayman Islands__, is <br /> the
              controller and is responsible for processing your Personal Data
              (referred to as ”XDC Foundation”, “we”, “us” or “our” in this
              privacy notice) in the context of this Website.
            </Para>
            <PointHeading>
              (b) Our Data Protection Compliance Manager
            </PointHeading>
            <Para>
              We have appointed a Data Protection Compliance Manager (DPCM) who
              is responsible for overseeing questions in relation to this
              privacy notice. If you have any questions about this privacy
              notice, including any requests to exercise your legal rights,
              please contact the DPCM using the details set out below or by
              sending an email to
              <a href=""> education+privacy@xdcfoundation.org.</a>
            </Para>
            <PointHeading>(c) DPCM Contact Details</PointHeading>
            <Para>
              You can contact the DPCM by post: <br />
              XDC Foundation (Data Protection Compliance Manager) <br />
              SIX, Second Floor, Cricket Square <br />
              P.O. Box 2681 George Town, Grand Cayman KY1-1111
              <br />
              Cayman Islands
            </Para>
          </Block2>
          <Block3>
            <PointHeading>3. THE DATA WE PROCESS ABOUT YOU</PointHeading>
            <PointHeading>(a) Personal Data</PointHeading>
            <Para>
              Personal Data, or personal information, means any information
              about an individual from which that person can be identified. It
              does not include data where the identity has been removed
              (anonymous data).
            </Para>
            <Para>
              We may collect, use, store and transfer (together “process”)
              different kinds of Personal Data about you which we have grouped
              together as follows:
            </Para>
          </Block3>
          <Block4>
            <Para>
              <b>Identity Data</b> includes your legal given and family names.
            </Para>
            <Para>
              <b>Contact Data</b> includes physical address, mailing address,
              email address and telephone numbers.
            </Para>
            <Para>
              <b>Technical Data</b> includes internet protocol (IP) address,
              login data, browser type and version, time zone setting and
              location, browser plug-in types and versions, operating system and
              platform, and information regarding the technology on the devices
              you use to access this Website.
            </Para>
            <Para>
              <b>Usage Data</b> includes information about how you use our
              Website.
            </Para>
            <Para>
              <b> Marketing and Communications Data</b> includes your choices
              and preferences in receiving marketing from us and our third
              parties, your communication preferences, data in social media
              profiles and social media username, and all information you
              provide to us via email or the Website or otherwise.
            </Para>
          </Block4>
          <Block5>
            <PointHeading>(b) Aggregated Data</PointHeading>
            <Para>
              We also collect, use and share Aggregated Data such as statistical
              or demographic data for certain purposes. Aggregated Data may be
              derived from your Personal Data but is not considered Personal
              Data as this data does not directly or indirectly reveal your
              identity. For example, we may aggregate your Usage Data to
              calculate the percentage of users accessing a specific website
              feature.
            </Para>
          </Block5>
          <Block6>
            <PointHeading>4. HOW WE COLLECT YOUR PERSONAL DATA</PointHeading>
            <PointHeading>(a) Direct interactions</PointHeading>
            <Para>
              You may give us your Identity and Contact Data as well as
              Marketing and Communications Data by filling in forms or by
              corresponding with us by post, phone, email or otherwise. This
              includes Personal Data you provide when you:
            </Para>
          </Block6>
          <Block7>
            <Para>create a username or other site-specific credentials;</Para>
            <Para>utilize our services; or</Para>
            <Para>
              request marketing or other correspondence be sent to you.
            </Para>
          </Block7>
          <PointHeading>
            (b) Automated technologies or interactions
          </PointHeading>
          <Para>
            As you interact with our Website, we may automatically collect
            Technical Data about your equipment, browsing actions and patterns.
            We collect this Personal Data by using Cookies (defined below) and
            other similar technologies.
          </Para>
          <PointHeading>(c) Third parties</PointHeading>
          <Para>
            We do not collect data from third parties except in the event we are
            partnered with another brand or organisation to undertake joint
            marketing activity. In such case, how your data would be used by
            each party will be made clear.
          </Para>
          <Block9>
            <PointHeading>
              5. HOW WE PROCESS AND USE YOUR PERSONAL DATA
            </PointHeading>
            <Para>
              We will only use your Personal Data when the law allows us to as
              described below. Most commonly, we will use your Personal Data in
              the following circumstances:
            </Para>
            <PointHeading>
              (a) Purposes for which we process your personal data
            </PointHeading>
            <Para>
              We have set out below, in a table format, a description of all the
              ways we process your Personal Data, and which of the legal bases
              we rely on to do so. Wherever the legal basis is consent, we will
              ask you explicitly to consent on our website or otherwise.  This
              request for consent will typically be in the form of a checkbox
              which you will be asked to check and by which you may indicate
              your consent.
            </Para>
          </Block9>
          <TableDiv>
            <Table className={classes.materialTable}>
              <table className={classes.table}>
                <tr>
                  <th className={classes.hash}>#</th>
                  <th className={classes.purpose}>Perpose Activity</th>
                  <th className={classes.personal}>Type Personal Data</th>
                  <th className={classes.lawful}>
                    Lawful bases for processing including basis of legitimate
                    interest
                  </th>
                </tr>
                <tr className={classes.row}>
                  <td style={{ border: "solid 1px #dedede" }}>1</td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div className={classes.blockNumber}>
                      To manage our relationship with you which will include:
                    </div>
                    <ul>
                      <li
                        style={{
                          width: "271px",
                          height: "38px",
                          margin: "19px 12.6px 6px 16px",
                        }}
                        className={classes.blockNumber}
                      >
                        Providing services to you on the Website;
                      </li>
                      <div
                        style={{
                          width: "271px",
                          height: "19px",
                          margin: "16px 12.6px 22px 16px",
                        }}
                        className={classes.blockNumber}
                      >
                        Responding to your inquiries;
                      </div>
                      <div
                        style={{
                          width: "271px",
                          height: "38px",
                          margin: "6px 12.6px 22px 16px",
                        }}
                        className={classes.blockNumber}
                      >
                        Notifying you of changes to our terms or privacy policy,
                        and
                      </div>
                      <div
                        style={{
                          width: "271px",
                          height: "38px",
                          margin: "22px 12.6px 32.2px 16px",
                        }}
                        className={classes.blockNumber}
                      >
                        Asking you to provide a review or complete a survey.
                      </div>
                    </ul>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "84px",
                        height: "19px",
                        margin: "31.8px 191.6px 22px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (1) Identity
                    </div>
                    <div
                      style={{
                        width: "89px",
                        height: "19px",
                        margin: "3px 186.6px 2px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (2) Contact
                    </div>
                    <div
                      style={{
                        width: "270px",
                        height: "19px",
                        margin: "12px 5.6px 0px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (3) Marketing and Communications
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div className={classes.blockData}>
                      <div className={classes.blockNumber}>
                        (a) Necessary to comply with a request from you (contract
                        performance).
                      </div>
                      <div className={classes.blockNumber}>
                        (b) Necessary to comply with legal obligations.
                      </div>
                      <div className={classes.blockNumber}>
                        (c) Necessary for our legitimate interests (to keep our
                        records updated and to study how customers use our
                        products and services)
                      </div>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "154px" }} className={classes.row}>
                  <td style={{ border: "solid 1px #dedede" }}>2</td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "295px",
                        height: "95px",
                        margin: "26.8px 12.6px 32.2px 17.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      To administer and protect our business and this Website
                      (including troubleshooting, data analysis,testing, system
                      maintenance, support, reporting and hosting of data)
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "84px",
                        height: "19px",
                        margin: "31.8px 191.6px 22px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (1) Identity
                    </div>
                    <div
                      style={{
                        width: "101px",
                        height: "19px",
                        margin: "22px 174.6px 62.2px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (2) Technical
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "398px",
                        height: "95px",
                        margin: "31.8px 14.8px 27.2px 13.4px",
                      }}
                      className={classes.blockData}
                    >
                      <div className={classes.blockNumber}>
                        (a) Necessary for our legitimate interests (for running
                        our business, provision of administration and IT services,
                        network security)
                      </div>
                      <div className={classes.blockNumber}>
                        (b) Necessary to comply with legal obligations.
                      </div>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "164.8px" }} className={classes.row}>
                  <td style={{ border: "solid 1px #dedede" }}>3</td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "303px",
                        height: "76px",
                        margin: "31.8px 4.6px 6px 17.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      We send you marketing communications from us if you have
                      requested information from us based on your interests
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "84px",
                        height: "19px",
                        margin: "31.8px 191.6px 22px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (1) Identity
                    </div>
                    <div
                      style={{
                        width: "89px",
                        height: "19px",
                        margin: "22px 186.6px 22px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (2) Contact
                    </div>
                    <div
                      style={{
                        width: "270px",
                        height: "19px",
                        margin: "6px 5.6px 32px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (3) Marketing and Communications
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "100px",
                        height: "19px",
                        margin: "26.8px 312.8px 24px 13.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      Your Consent
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "165px" }} className={classes.row}>
                  <td style={{ border: "solid 1px #dedede" }}>4</td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "303px",
                        height: "76px",
                        margin: "32px 4.6px 6px 17.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      To deliver relevant website content to you and measure or
                      understand the effectiveness of the communication that we
                      deliver to you
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "84px",
                        height: "19px",
                        margin: "32px 191.6px 14px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (1) Identity
                    </div>
                    <div
                      style={{
                        width: "89px",
                        height: "19px",
                        margin: "22px 186.6px 22px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (2) Contact
                    </div>
                    <div
                      style={{
                        width: "270px",
                        height: "19px",
                        margin: "6px 5.6px 32px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (3) Marketing and Communications
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "100px",
                        height: "19px",
                        margin: "26.8px 312.8px 24px 13.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      Your Consent
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "159px" }} className={classes.row}>
                  <td style={{ border: "solid 1px #dedede" }}>5</td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "303px",
                        height: "76px",
                        margin: "32px 4.6px 51px 17.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      To use data analytics to improve our Website, products and
                      services, marketing, customer relationships and experiences
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "89px",
                        height: "19px",
                        margin: "32px 191.6px 14px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (1) Identity
                    </div>
                    <div
                      style={{
                        width: "89px",
                        height: "19px",
                        margin: "22px 186.6px 67px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (2) Usage
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "398px",
                        height: "95px",
                        margin: "32px 14.8px 32px 13.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      Necessary for our legitimate interests (to define types of
                      customers for our products and services, to keep our website
                      updated and relevant, to develop our business and to inform
                      our marketing strategy)
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "187.7px" }} className={classes.row}>
                  <td style={{ border: "solid 1px #dedede" }}>6</td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "295px",
                        height: "133px",
                        margin: "32px 12.6px 22.2px 17.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      To deliver relevant marketing materials, including news
                      articles, newsletters and event invitations  to individuals
                      subscribed to our mailing lists. We use mailing list
                      software in conjunction with our CRM to deliver the
                      communication by email.
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "84px",
                        height: "19px",
                        margin: "36px 191.6px 22px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (1) Identity
                    </div>
                    <div
                      style={{
                        width: "89px",
                        height: "19px",
                        margin: "22px 186.6px 22px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (2) Contact
                    </div>
                    <div
                      style={{
                        width: "270px",
                        height: "19px",
                        margin: "18px 5.6px 50.2px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      (3) Marketing and Communications
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "100px",
                        height: "19px",
                        margin: "32px 312.8px 26px 13.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      Your Consent
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "121px" }} className={classes.row}>
                  <td style={{ border: "solid 1px #dedede" }}>7</td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "295px",
                        height: "57px",
                        margin: "31.8px 12.6px 32.2px 17.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      To allow you to interact with our XDC Observatory by adding
                      “tags” and other identity characteristics
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "251px",
                        height: "19px",
                        margin: "31.8px 24.6px 70.2px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      User defined at user’s discretion
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "100px",
                        height: "19px",
                        margin: "31.8px 312.8px 70.2px 13.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      Your Consent
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "126.8px" }} className={classes.row}>
                  <td style={{ border: "solid 1px #dedede" }}>8</td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "295px",
                        height: "57px",
                        margin: "31.8px 12.6px 38px 17.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      To allow you to receive notification and alerts via email
                      and push notification
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "251px",
                        height: "19px",
                        margin: "31.8px 24.6px 6px 7.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      User defined at user’s discretion
                    </div>
                  </td>
                  <td style={{ border: "solid 1px #dedede" }}>
                    <div
                      style={{
                        width: "100px",
                        height: "19px",
                        margin: "31.8px 312.8px 6px 13.4px",
                      }}
                      className={classes.blockNumber}
                    >
                      Your Consent
                    </div>
                  </td>
                </tr>
              </table>
            </Table>
          </TableDiv>
          <MobileResponisveTable />
          <Block10>
            <PointHeading>(b) Your marketing choices</PointHeading>
            <Para>
              We do not collect data from third parties except in the event we
              are partnered with another brand or organisation to undertake
              joint marketing activity. In such case, how your data would be
              used by each party will be made clear.
            </Para>
            <Para>
              We strive to provide you with choices regarding certain Personal
              Data uses, particularly around marketing and advertising. For
              example, when subscribing for our notices, we offer a variety of
              information options you can choose from. You can ask us to stop
              sending you marketing messages at any time by contacting us at any
              time at education+privacy@xdcfoundation.org. Each communication we
              send will have an unsubscribe option in the fo
            </Para>
          </Block10>
          <PointHeading
            Style={{
              width: "89px",
              height: "19px",
              margin: "28px 1063px 28px 1px",
            }}
          >
            (c) Cookies
          </PointHeading>
          <Block11>
            <PointHeading>(i) What are cookies?</PointHeading>
            <Para>
              “Cookies” are pieces of information that are placed on your
              computer by us or by a third-party service for the purpose of
              facilitating and enhancing your communication and interaction with
              that service. There are other technologies with similar purposes,
              such as clear gifs, web beacons, tags, or pixels, that we also
              call “cookies” in this policy.
            </Para>
          </Block11>
          <Block12>
            <PointHeading>(ii)Which types of cookies do we use?</PointHeading>
            <Para>We use the following types of cookies on the Website:</Para>
          </Block12>
          <Block13>
            <PointHeading>Strictly necessary Cookies</PointHeading>
            <Para>
              These cookies are necessary to allow you to browse the Website and
              use Website functions. Without these cookies the Website would not
              function properly. These cookies do not collect your Personal
              Data.
            </Para>
            <PointHeading>Functional Cookies</PointHeading>
            <Para>
              These cookies allow websites to remember your chosen preferences
              (such as your language settings). They allow us to provide you
              with improved functions. It is not possible for us to personally
              identify you using the information collected by these cookies
            </Para>
            <PointHeading>Performance cookies</PointHeading>
            <Para>
              These cookies assist us in understanding how visitors interact
              with the Website by providing information about the visited pages,
              the time spent on the Website, and error messages in case of
              technical problems. This helps us to improve the performance of
              our websites. We use these cookies only if you have consented via
              the cookie banner.
            </Para>
            <PointHeading>Analytical cookies</PointHeading>
            <Para>
              We use analytical cookies to see, for example, which content on
              the Website is highly frequented and to analyse if content should
              be updated or improved. These cookies are also used to provide you
              with personalized content based on the pages you have shown
              interest in. We use these cookies only if you have consented via
              the cookie banner.
            </Para>
          </Block13>
          <Block14>
            <PointHeading>(iii) How do we use cookies?</PointHeading>
            <Para>
              We use cookies on the Website to customize your visit and for
              other purposes to make your visit more convenient or to enable us
              to enhance our service. For example, we may use cookies to allow
              easier access to your specific country of origin on the global
              landing page of the Website. Cookies and similar items are not
              used by us to automatically retrieve personally identifiable
              information from your computer without your knowledge.
            </Para>
          </Block14>
          <Block15>
            <PointHeading>(iv) Which specific cookies do we use</PointHeading>
            <Para>
              Please find here a list of the most
              important cookies we are using.
            </Para>
            <CookiesList>
                <li>Strictly necessary Cookies</li>
                <li>Functional Cookies</li>
                <li>Performance cookies</li>
                <li>Analytical cookies</li>
              </CookiesList>
          </Block15>
          <Block16>
            <PointHeading>(v) How can you control cookies?</PointHeading>
            <Para>
              You can set your browser to refuse all or some browser cookies, or
              to alert you when websites set or access cookies. If you disable
              or refuse cookies, please note that some parts of this Website may
              become inaccessible or not function properly.
            </Para>
          </Block16>
          <Block17>
            <PointHeading>6. DISCLOSURES OF YOUR PERSONAL DATA</PointHeading>
            <PointHeading>(a) Direct interactions</PointHeading>
            <Para>
              We may have to share your Personal Data with third parties set out
              below for the purposes set out in the table in paragraph 5 (a)
              above:
            </Para>
          </Block17>
          <Block18>
            <span>
              <Para>
                {" "}
                Service providers who provide IT and system administration
              </Para>
              <Para>
                {" "}
                services; Customer Relationship Management (CRM) platforms;{" "}
              </Para>
              <Para> Data collections platforms; and</Para>
              <Para>Analytics Providers</Para>
            </span>
          </Block18>
          <Block19>
            <Para>
              We require all third parties to respect the security of your
              Personal Data and to treat it in accordance with the law. We do
              not allow our third-party service providers to use your Personal
              Data for their own purposes and only permit them to process your
              Personal Data for specified purposes and in accordance with our
              instructions.
            </Para>
          </Block19>
          <Block20>
            <PointHeading>7. INTERNAL TRANSFERS</PointHeading>
            <Para>
              Whenever we transfer your Personal Data to a third party, we
              ensure a similar degree of protection is afforded to it by
              ensuring that appropriate safeguards are implemented.  Those
              safeguards include our observance of the standards established by
              the European Commission, such as:
            </Para>
          </Block20>
          <Block21>
            <span>
              <Para>
                {" "}
                We will only transfer your Personal Data to countries that have
                been deemed to provide an adequate level of protection for
                Personal Data by the European Commission.
              </Para>
              <Para>
                {" "}
                Where we use certain service providers, we may use specific
                contracts approved by the European Commission which give
                Personal Data the same protection it has in Europe (so called
                Standard Contractual Clauses).
              </Para>
            </span>
          </Block21>
          <Block22>
            <Para>
              Please contact us on education+privacy@xdcfoundation.org if you
              want further information on or a copy of the specific mechanism
              used by us when transferring your Personal Data out of the EEA.
            </Para>
          </Block22>
          <Block23>
            <PointHeading>8. Third Party Links</PointHeading>
            <Para>
              This Website may include links to third-party websites, blogs,
              social media platforms and applications. Clicking on those links
              or enabl
            </Para>
          </Block23>
          <Block24>
            <PointHeading>9. Data Security</PointHeading>
            <Para>
              We have put in place appropriate security measures to prevent your
              Personal Data from being accidentally lost, used or accessed in an
              unauthorised way, altered, or disclosed. In addition, we limit
              access to your Personal Data to those employees, agents,
              contractors and other third parties who have a business need to
              know. They will only process your Personal Data on our
              instructions and they are subject to a duty of confidentiality.
            </Para>
            <Para>
              We have put in place procedures to deal with any suspected
              Personal Data breach and will notify you and any applicable
              regulator of a breach where we are legally required to do so.
            </Para>
          </Block24>
          <Block25>
            <PointHeading>9. Data Retention</PointHeading>
            <PointHeading style={{ fontWeight: "500" }}>
              HOW LONG WILL WE RETAIN YOUR PERSONAL DATA?
            </PointHeading>
            <Para>
              We will only retain your Personal Data for as long as necessary to
              fulfil the purposes we collected it for, including for the
              purposes of satisfying any legal requirements, or until you ask us
              to delete it. For example:
            </Para>
          </Block25>
          <Block26>
            <Para>
              {" "}
              We will retain your Personal Data concerning your user account for
              as long as you do not withdraw consent. Customer Relationship
              Management (CRM) platforms;
            </Para>
            <Para>
              {" "}
              We will retain your Personal Data concerning marketing and notices
              for as long as you do not withdraw consent.
            </Para>
            <Para>
              {" "}
              We store cookie data until the respective cookies expire at the
              end of the cookie’s lifespan
            </Para>
          </Block26>
          <PointHeading
            style={{
              width: "1131px",
              height: "19px",
              margin: "71px 21px 28px 1px",
            }}
          >
            10. YOUR LEGAL RIGHTS
          </PointHeading>
          <Block27>
            <PointHeading>(a) Your Rights</PointHeading>

            <Para>
              Depending on your circumstances, you may have rights under data
              protection laws in relation to your Personal Data.
            </Para>
            <Para>Such rights may include the right to:</Para>
          </Block27>
          <Block28>
            <Para>
              <b>Request access </b>
              to your Personal Data (commonly known as a “data subject access
              request”). This enables you to receive a copy of the Personal Data
              we hold about you and to check that we are lawfully processing it.
            </Para>
            <Para>
              <b>Request correction </b>
              of the Personal Data that we hold about you. This enables you to
              have any incomplete or inaccurate data we hold about you
              corrected, though we may need to verify the accuracy of the new
              data you provide to us. Please keep us informed if your Personal
              Data changes during your relationship with us.
            </Para>
            <Para>
              <b>Request erasure </b>
              of your Personal Data. This enables you to ask us to delete or
              remove Personal Data where there is no good reason for us
              continuing to process it. You also have the right to ask us to
              delete or remove your Personal Data where you have successfully
              exercised your right to object to processing (see below), where we
              may have processed your information unlawfully or where we are
              required to erase your Personal Data to comply with local law.
              Note, however, that we may not always be able to comply with your
              request of erasure for specific legal reasons concerning which we
              will notify you, if applicable, at the time of your request.
            </Para>
            <Para>
              <b>Request restriction </b>
              of processing of your Personal Data. This enables you to ask us to
              suspend the processing of your Personal Data in the following
              scenarios: (a) if you want us to establish the data’s accuracy;
              (b) where our use of the data is unlawful but you do not want us
              to erase it; (c) where you need us to hold the data even if we no
              longer require it as you need it to establish, exercise or defend
              legal claims; or (d) you have objected to our use of your data but
              we need to verify whether we have overriding legitimate grounds to
              use it.
            </Para>
            <Para>
              <b>Request the transfer </b>
              of your Personal Data to you or to a third party. We will provide
              to you, or a third party you have chosen, your Personal Data in a
              structured, commonly used, machine-readable format. Note that this
              right only applies to automated information which you initially
              provided consent for us to use or where we used the information to
              perform a contract with you.
            </Para>
            <Para>
              <b>Withdraw consent </b>
              at any time where we are relying on consent to process your
              Personal Data. However, this will not affect the lawfulness of any
              processing carried out before you withdraw your consent. If you
              withdraw your consent, we may not be able to provide certain
              products or services to you. We will advise you if this is the
              case at the time you withdraw your consent.
            </Para>
            <Para>
              <b>Object to processing </b>
              of your Personal Data where we are relying on a legitimate
              interest (or those of a third party) and there is something about
              your particular situation which makes you want to object to
              processing on this ground as you feel it impacts on your
              fundamental rights and freedoms. You also have the right to object
              where we are processing your Personal Data for direct marketing
              purposes. In some cases, we may demonstrate that we have
              compelling legitimate grounds to process your information which
              override your rights and freedoms.
            </Para>
          </Block28>
          <Para
          // style={{
          //   width: "879px",
          //   height: "19px",
          //   margin: "28px 258px 28px 7px",
          // }}
          >
            If you wish to exercise any of the rights set out above, please
            contact us at{" "}
            <a
              style={{ color: "#2149b9" }}
              href="education+privacy@xdcfoundation.org."
            ></a>
          </Para>
        </div>
        <Block29>
          <PointHeading>(b) No fee usually required</PointHeading>
          <Para>
            You will not have to pay a fee to access your Personal Data (or to
            exercise any of the other rights). However, we may charge a
            reasonable fee if your request is clearly unfounded, repetitive or
            excessive. Alternatively, we may refuse to comply with your request
            in these circumstances.
          </Para>
        </Block29>
        <div
          className={classes.rectangleCopy5}
        // style={{
        //   width: "1136px",
        //   height: "95px",
        //   margin: "28px 16px 28px 1px",
        // }}
        >
          <PointHeading>(c) What we may need from you</PointHeading>
          <Para>
            We may need to request specific information from you to help us
            confirm your identity and ensure your right to access your Personal
            Data (or to exercise any of your other rights). This is a security
            measure to ensure that Personal Data is not disclosed to any person
            who has no right to receive it. We may also contact you to ask you
            for further information in relation to your request to speed up our
            response.
          </Para>
        </div>
        <div
          className={classes.rectangleCopy5}
        // style={{
        //   width: "1136px",
        //   height: "76px",
        //   margin: "28px 16px 77px 1px",
        // }}
        >
          <PointHeading>(c)Time limit to respond</PointHeading>
          <Para>
            We try to respond to all legitimate
            requests within one month. Occasionally it may take us longer than a
            month if your request is particularly complex or you have made a
            number of requests. In this case, we will notify you and keep you
            updated.
          </Para>
        </div>
        <div
          className={classes.rectangleCopy5}
        // style={{
        //   width: "1136px",
        //   height: "76px",
        //   margin: "28px 16px 77px 1px",
        // }}
        >
          <PointHeading>
            11. CHANGES TO THE PRIVACY NOTICE AND YOUR DUTY TO INFORM US OF
            CHANGES
          </PointHeading>
          <Para>
            This privacy policy was last updated on 2021 Nov. __. If we make
            substantial changes to this privacy notice, we will inform you in
            advance by e-mail if you are registered with us or on the Website;
            otherwise, you may view updated versions of this policy on the
            Website
          </Para>
        </div>
      </Div>

      <FooterComponent />
    </div>
  );
}

const MobileResponisveTable = () => {
  const classes = useStyles();
  return (
    <Table className={classes.mobileTable}>
      <table >
        {/* <tr>
        <th className={classes.hash}># testing</th>
        <th className={classes.purpose}>Perpose Activity</th>
        <th className={classes.personal}>Type Personal Data</th>
        <th className={classes.lawful}>
          Lawful bases for processing including basis of legitimate
          interest
        </th>
      </tr> */}

        <tr className={classes.row}>
          <td className={classes.rowNumber}>1</td>
          <td className={classes.tableData}>
            <div className={classes.purpose} >Purpose Activity</div>
            <div >
              To manage our relationship with you which will include:
            </div>
            <ul>
              <li>Providing services to you on the Website;</li>
              <div>Responding to your inquiries;</div>
              <div>Notifying you of changes to our terms or privacy policy,
                and</div>
              <div>
                Asking you to provide a review or complete a survey.
              </div>
            </ul>
            {/* </td> */}
            {/* <td style={{ border: "solid 1px #dedede" }}> */}
            <div className={classes.personal}>Type Personal Data</div>
            <div>(1) Identity
            </div>
            <div>
              (2) Contact
            </div>
            <div>(3) Marketing and Communications
            </div>
            {/* </td> */}
            {/* <td style={{ border: "solid 1px #dedede" }}> */}
            <div className={classes.lawful}>
              Lawful bases for processing including basis of legitimate
              interest
            </div>
            <div>
              <div >
                (a) Necessary to comply with a request from you (contract
                performance).
              </div>
              <div >
                (b) Necessary to comply with legal obligations.
              </div>
              <div >
                (c) Necessary for our legitimate interests (to keep our
                records updated and to study how customers use our
                products and services)
              </div>
            </div>
          </td>
        </tr>


        <tr className={classes.row}>
          <td className={classes.rowNumber}>2</td>
          <td className={classes.tableData}>

            <div className={classes.purpose}>Purpose Activity</div>
            <div>
              To administer and protect our business and this Website
              (including troubleshooting, data analysis,testing, system
              maintenance, support, reporting and hosting of data)
            </div>
            <div className={classes.personal}>Type Personal Data</div>
            <div>(1) Identity</div>
            <div>(2) Technical</div>
            <div className={classes.lawful}>
              Lawful bases for processing including basis of legitimate
              interest
            </div>
            <div>
              <div >
                (a) Necessary for our legitimate interests (for running
                our business, provision of administration and IT services,
                network security)
              </div>
              <div >
                (b) Necessary to comply with legal obligations.
              </div>
            </div>
          </td>
        </tr>

        <tr className={classes.row}>
          <td className={classes.rowNumber}>3</td>
          <td className={classes.tableData}>

            <div className={classes.purpose}>Purpose Activity</div>
            <div>
              We send you marketing communications from us if you have
              requested information from us based on your interests
            </div>
            <div className={classes.personal}>Type Personal Data</div>
            <div>(1) Identity</div>
            <div>(2) Contact</div>
            <div>(3) Marketing and Communications</div>
            <div className={classes.lawful}>
              Lawful bases for processing including basis of legitimate
              interest
            </div>
            <div>Your Consent</div>
          </td>
        </tr>


        <tr className={classes.row}>
          <td className={classes.rowNumber}>4</td>
          <td className={classes.tableData}>

            <div className={classes.purpose}>Purpose Activity</div>
            <div>
              To deliver relevant website content to you and measure or
              understand the effectiveness of the communication that we
              deliver to you
            </div>
            <div className={classes.personal}>Type Personal Data</div>
            <div>
              (1) Identity
            </div>
            <div>
              (2) Contact
            </div>
            <div>
              (3) Marketing and Communications
            </div>
            <div className={classes.lawful}>
              Lawful bases for processing including basis of legitimate
              interest
            </div>
            <div>
              Your Consent
            </div>
          </td>
        </tr>


        <tr className={classes.row}>
          <td className={classes.rowNumber}>5</td>
          <td className={classes.tableData}>

            <div className={classes.purpose} >Purpose Activity</div>
            <div>
              To use data analytics to improve our Website, products and
              services, marketing, customer relationships and experiences
            </div>
            <div className={classes.personal}>Type Personal Data</div>
            <div>
              (1) Identity
            </div>
            <div>
              (2) Usage
            </div>
            <div className={classes.lawful}>
              Lawful bases for processing including basis of legitimate
              interest
            </div>
            <div>
              Necessary for our legitimate interests (to define types of
              customers for our products and services, to keep our website
              updated and relevant, to develop our business and to inform
              our marketing strategy)
            </div>
          </td>
        </tr>

        <tr className={classes.row}>
          <td className={classes.rowNumber}>6</td>
          <td className={classes.tableData}>

            <div className={classes.purpose} >Purpose Activity</div>
            <div>
              To deliver relevant marketing materials, including news
              articles, newsletters and event invitations  to individuals
              subscribed to our mailing lists. We use mailing list
              software in conjunction with our CRM to deliver the
              communication by email.
            </div>
            <div className={classes.personal}>Type Personal Data</div>
            <div>
              (1) Identity
            </div>
            <div>
              (2) Contact
            </div>
            <div>
              (3) Marketing and Communications
            </div>
            <div className={classes.lawful}>
              Lawful bases for processing including basis of legitimate
              interest
            </div>
            <div>
              Your Consent
            </div>
          </td>
        </tr>


        <tr className={classes.row}>
          <td className={classes.rowNumber}>7</td>
          <td className={classes.tableData}>

            <div className={classes.purpose}>Purpose Activity</div>
            <div>
              To allow you to interact with our XDC Observatory by adding
              “tags” and other identity characteristics
            </div>
            <div className={classes.personal}>Type Personal Data</div>
            <div>
              User defined at user’s discretion
            </div>
            <div className={classes.lawful}>
              Lawful bases for processing including basis of legitimate
              interest
            </div>
            <div>
              Your Consent
            </div>
          </td>
        </tr>

        <tr className={classes.row}>
          <td className={classes.rowNumber}>8</td>
          <td className={classes.tableData}>

            <div className={classes.purpose}>Purpose Activity</div>
            <div>
              To allow you to receive notification and alerts via email
              and push notification
            </div>
            <div className={classes.personal}>Type Personal Data</div>
            <div>
              User defined at user’s discretion
            </div>
            <div className={classes.lawful}>
              Lawful bases for processing including basis of legitimate
              interest
            </div>
            <div>
              Your Consent
            </div>
          </td>
        </tr>
      </table>
    </Table>
  )
}
export default PrivacyPolicy;
