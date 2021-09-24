import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import AddressTableComponent from "./addressTable";
import { ImQrcode } from "react-icons/im";
import Popup from "reactjs-popup";
import { Grid, TableContainer } from "@material-ui/core";
import Utility, { dispatchAction } from "../../utility";
import AddressData from "../../services/address";
import ReactHtmlParser from "react-html-parser";
import Tooltip from '@material-ui/core/Tooltip';
var QRCode = require('qrcode.react');

const useStyles = makeStyles({

  container: {

    borderRadius: '14px',
    boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1)',
    borderBottom: 'none',
    background: '#fff',
  },
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "3000px",
    marginTop: "100px",
    marginBottom:"15px",
    width: "100%",
    "@media (min-width: 300px) and (max-width: 567px)": {
      
         marginTop: "130px",
        maxWidth: "500px",
        padding:"0 8px 0 8px"
           },
           "@media (min-width: 567px) and (max-width: 767px)": {
        marginTop: "140px",
             maxWidth: "740px",
           },
           "@media (min-width: 767px) and (max-width: 1040px)": {
        
             maxWidth: "1020px",
           },
  },
  rowDiv: {
    width: "100%",
    alignItems: "center",
    height: "53px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "7px",

    justifyContent: "space-between",
  },
  line: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "0px",
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

});
export default function AddressDetails(props) {
  const [toggleState, setToggleState] = useState(1);

  const [txtAddress, setTxtAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [convertCurrency, setConvertCurrency] = useState('');
  const [coinValue, setCoinValue] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [copiedText, setCopiedText] = useState("");
  let nowCurrency = window.localStorage.getItem('currency')

  let { addr } = useParams();
  let addressValue = 0

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const classes = useStyles();

  function shortenBalance(b, amountL = 12, amountR = 3, stars = 0) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,

    )}`;
  }
  function _handleChange(event) {
    alert('dd')
  }
  const getAddressDetails = async () => {
    try {

      const [error, responseData] = await Utility.parseResponse(
        AddressData.getAddressDetail(addr)
      );

      if (responseData) {
        setBalance((responseData.balance / 1000000000000000000).toFixed(2));
        let activeCurrency = window.localStorage.getItem('currency')
        let convertedCurrency = ''
        if (activeCurrency == 'USD') {
          convertedCurrency = '<i class="fa fa-usd" aria-hidden="true"></i>  '
          setCoinValue((responseData.balanceInUSD / 1000000000000000000).toFixed(2))
          setConvertCurrency(convertedCurrency)
        } else if (activeCurrency == 'EUR') {
          convertedCurrency = "<i class='fa fa-eur' aria-hidden='true'></i>  "
          setCoinValue((responseData.balanceInEUR / 1000000000000000000).toFixed(2))
          setConvertCurrency(convertedCurrency)
        } else if (activeCurrency == 'INR') {
          convertedCurrency = "<i class='fa fa-inr' aria-hidden='true'></i> "
          setCoinValue((responseData.balanceInINR / 1000000000000000000).toFixed(2))
          setConvertCurrency(convertedCurrency)
        } else {
          convertedCurrency = '<i class="fa fa-usd" aria-hidden="true"></i>  '
          setCoinValue((responseData.balanceInUSD / 1000000000000000000).toFixed(2))
          setConvertCurrency(convertedCurrency)
        }
        setLoading(false);
      } else {
        setBalance(parseFloat(0).toFixed(2));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const options = {
    htmlparser2: {
      lowerCaseTags: false
    }
  };
  useEffect(() => {
    getAddressDetails();
  }, []);
  return (

    <div style={{ backgroundColor: '#fff' }}>
      <Tokensearchbar />
      <Grid lg={8} className="table-grid-block tb-grid tb-grid-block">
      <div className={classes.mainContainer}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <Spacing style={{borderBottom:'none'}}>
              <Container>
                <Heading>Address Details</Heading>
              </Container>
            </Spacing>

            <Div>
            <Spacing >
            <HashDiv>
                <Container>
                  <Hash>Hash ID</Hash>
                </Container>
                <MiddleContainerHash >
                <Content>
                      
                {addr}
                  </Content>
                  </MiddleContainerHash>
                <SecondContainer>
                <CopyToClipboard text={addr} onCopy={() => setCopiedText(addr)}>
                      <Tooltip
                        title={
                          copiedText === addr
                            ? "Copied"
                            : "Copy To Clipboard"
                        }
                        placement="top"
                      >
                        <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 20}}><i
                          class="fa fa-clone" aria-hidden="true"></i></button>
                      </Tooltip>
                    </CopyToClipboard>
                    <Popup trigger={<ImQrcode style={{ marginLeft: "10px", marginBottom: "2px", cursor: "pointer", color: "#2149b9", height: "20px", width: "20px"}} />} modal>
                      {(close) => (
                        <div className="popup_qr">
                          <p>
                            <div>
                              <button style={{ outline: 'none', width: '0px', height: '0px', marginLeft: "0px" }} className="close" onClick={close}>
                                &times;
                              </button>
                              <div className="header" style={{ fontSize: '11.5px', paddingTop: '5px', paddingBottom: '22px' }}> {addr} </div>
                              <QRCode size={320} style={{ height: 320, width: 320 }} value={addr} />
                            </div>
                          </p>
                        </div>
                      )}
                    </Popup>
                  </SecondContainer>
                  </HashDiv>
                  </Spacing>
                  <Spacing style={{borderBottom:'none'}}>
            <HashDiv>
                <Container>
                  <Hash>Balance</Hash>
                </Container>
                <MiddleContainerHash >
                <Content>
                      
                {balance} XDC({ReactHtmlParser(convertCurrency)} {coinValue})
                  </Content>
                  </MiddleContainerHash>
                  </HashDiv>
                  </Spacing>
            </Div>
          </Grid>
        </div>
      </div>
      
        {/* <div
          className="block_details_heading"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p className="block_details_heading_left">Address Details</p>
        </div>
        <Paper style={{ borderRadius: '14px' }} elevation={0}>
          <TableContainer className={classes.container} id="container-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: "0px",
                      paddingRight: "1px",

                    }}
                    id="td"
                  />
                  <TableCell className="first-row-table_address1">
                    Address
                  </TableCell>
                  <TableCell className="second-row-table_address1">
                    {addr}
                  </TableCell>
                  <TableCell>
                    <CopyToClipboard text={addr} onCopy={() => setCopiedText(addr)}>
                      <Tooltip
                        title={
                          copiedText === addr
                            ? "Copied"
                            : "Copy To Clipboard"
                        }
                        placement="top"
                      >
                        <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14, marginLeft: "25px" }}><i
                          class="fa fa-clone" aria-hidden="true"></i></button>
                      </Tooltip>
                    </CopyToClipboard>
                    <Popup trigger={<ImQrcode style={{ marginLeft: "10px", marginBottom: "2px", cursor: "pointer", color: "#2149b9" }} />} modal>
                      {(close) => (
                        <div className="popup_qr">
                          <p>
                            <div>
                              <button style={{ outline: 'none', width: '0px', height: '0px', marginLeft: "0px" }} className="close" onClick={close}>
                                &times;
                              </button>
                              <div className="header" style={{ fontSize: '11.5px', paddingTop: '5px', paddingBottom: '22px' }}> {addr} </div>
                              <QRCode size={320} style={{ height: 320, width: 320 }} value={addr} />
                            </div>
                          </p>
                        </div>
                      )}
                    </Popup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{
                      width: "0px",
                      paddingRight: "1px",
                      borderBottom: "none",
                    }}
                    id="td"
                  />
                  <TableCell className="first-row-table_address" >
                    Balance
                  </TableCell>
                  <TableCell className="second-row-table_address">
                    {balance} XDC({ReactHtmlParser(convertCurrency)} {coinValue})
                  </TableCell>

                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper> */}
        
        <div className="container_sec sec-contain">
          <div className="block_sec sec-block">
            <div className="bloc-tabs_sec">
              <button
                className={
                  toggleState === 1 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(1)}
                id="transaction-btn">
                Transactions
              </button>
            </div>
          </div>

          <div className="content-tabs_sec">
            <div
              className={
                toggleState === 1
                  ? "content_sec  active-content_sec"
                  : "content_sec"
              }
            >

              <AddressTableComponent
                trans={transactions}
                coinadd={addr}
              />


            </div>

            <div
              className={
                toggleState === 2
                  ? "content_sec  active-content_sec"
                  : "content_sec"
              }
            >

              <AddressTableComponent
                trans={transactions}
              />
            </div>
          </div>
        </div>
      </Grid>
      <FooterComponent />
    </div>
  );
}



const Input = styled.input`
  border-radius: 5px;
  border: solid 1px #e3e7eb;
  background-color: #fff;
  font-family: Inter;
  font-size: 14px;
  letter-spacing: 0.54px;
  text-align: left;
  color: #2a2a2a;
`;
const Content = styled.span`
  font-family: Inter;
  font-size: 0.938rem;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  word-break: break-all;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 10px;
    word-break: break-all;
  }
`;
const TextArea = styled.textarea`
  opacity: 0.33;
  border-radius: 4px;
  border: solid 1px #9fa9ba;
  background-color: #dee0e3;
  width: 100%;
  font-family: Inter;
  font-size: 14px;
  height: 85px;
  float: left;

  overflow-y: auto;
`;
const Digits = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.54px;
  text-align: left;
  color: #4878ff;
`;
const Blocks = styled.span`
  font-family: Inter;
  font-size: 14px;

  letter-spacing: 0.54px;
  text-align: left;
`;
const Div__ = styled.div`
  height: auto;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  background-color: #fff;
  padding: 9px;
`;
const MiddleContainer = styled.div`
  font-family: Inter;
  font-size: 13px;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 12px;
    margin-left: unset;
    margin-top: 8px;
    
  }
`;
const MiddleContainerHash = styled.div`
  font-family: Inter;
  font-size: 13px;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 12px;
    margin-left: unset;
    margin-top: 8px;
    padding-right:37px;
    
  }
`;
const Hash = styled.span`
  color: var(--unnamed-color-2a2a2a);
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 0.938rem;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  @media (min-width: 300px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 13px;
  }
`;
const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 3px 4px;
  border-bottom: solid 1px #e3e7eb;

  @media (min-width: 300px) and (max-width: 767px) {
    display: block;
  }
`;
const HashDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 15px 15px;

  @media (min-width: 300px) and (max-width: 767px) {
    display: block;
  }
`;
const Container = styled.div`
  display: flex;
  word-break: break-all;
  width: 100%;
  align-items: center;
  max-width: 84px;
`;
const SecondContainer = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 300px) and (max-width: 767px) {
  }
`;

const Div = styled.div`
  height: auto;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: #fff;
  margin-bottom: 15px;
  padding: 5px;
  margin-top: 10px;
`;

const Heading = styled.span`
  white-space: nowrap;
  color: #2a2a2a;
  box-shadow: none;
  color: var(--unnamed-color-2a2a2a);
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`;

const ImageView = styled.img`
  width: 15px;
  margin-right: 15px;
`;