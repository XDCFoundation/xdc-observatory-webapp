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
import Tooltip from "@material-ui/core/Tooltip";
import { TransactionService } from "../../services";
import { sessionManager } from "../../managers/sessionManager";
import Utils from "../../utility";
var QRCode = require("qrcode.react");

const useStyles = makeStyles({
  container: {
    borderRadius: "0.875rem",
    boxShadow: "0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "187.5rem",
    // marginTop: "6.25rem",
    marginBottom: "0.938rem",
    width: "100%",
    "@media (min-width: 300px) and (max-width: 567px)": {
      marginTop: "8.125rem",
      maxWidth: "31.25rem",
      padding: "0 0.5rem 0 0.5rem",
    },
    "@media (min-width: 567px) and (max-width: 767px)": {
      marginTop: "8.75rem",
      maxWidth: "46.25rem",
    },
    "@media (min-width: 767px) and (max-width: 1040px)": {
      maxWidth: "63.75rem",
    },
  },
  rowDiv: {
    width: "100%",
    alignItems: "center",
    height: "3.313rem",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "0.438rem",

    justifyContent: "space-between",
  },
  line: {
    width: "100%",
    marginTop: "0rem",
    marginBottom: "0rem",
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});
export default function AddressDetails(props) {
  const [toggleState, setToggleState] = useState(1);

  const [txtAddress, setTxtAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [convertCurrency, setConvertCurrency] = useState("");
  const [coinValue, setCoinValue] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [copiedText, setCopiedText] = useState("");
  let nowCurrency = window.localStorage.getItem("currency");
  const [addressTag, setAddressTag] = useState("")
  const [isTag, setIsTag] = useState(false)

  let { addr } = useParams();
  let addressValue = 0;

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const classes = useStyles();

  function shortenBalance(b, amountL = 12, amountR = 3, stars = 0) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(b.length - 3)}`;
  }
  function _handleChange(event) {
    alert("dd");
  }
  const getAddressDetails = async () => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getAddressDetail(addr)
      );

      if (responseData) {
        setBalance((responseData.balance / 1000000000000000000).toFixed(18));
        let activeCurrency = window.localStorage.getItem("currency");
        let convertedCurrency = "";
        if (activeCurrency == "USD") {
          convertedCurrency = '<i class="fa fa-usd" aria-hidden="true"></i>  ';
          setCoinValue(
            (responseData.balanceInUSD / 1000000000000000000).toFixed(18)
          );
          setConvertCurrency(convertedCurrency);
        } else if (activeCurrency == "EUR") {
          convertedCurrency = "<i class='fa fa-eur' aria-hidden='true'></i>  ";
          setCoinValue(
            (responseData.balanceInEUR / 1000000000000000000).toFixed(18)
          );
          setConvertCurrency(convertedCurrency);
        } else if (activeCurrency == "INR") {
          convertedCurrency = "<i class='fa fa-inr' aria-hidden='true'></i> ";
          setCoinValue(
            (responseData.balanceInINR / 1000000000000000000).toFixed(18)
          );
          setConvertCurrency(convertedCurrency);
        } else {
          convertedCurrency = '<i class="fa fa-usd" aria-hidden="true"></i>  ';
          setCoinValue(
            (responseData.balanceInUSD / 1000000000000000000).toFixed(18)
          );
          setConvertCurrency(convertedCurrency);
        }
        setLoading(false);
      } else {
        setBalance(parseFloat(0).toFixed(18));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    htmlparser2: {
      lowerCaseTags: false,
    },
  };

  const tagUsingAddressHash = async () => {
    const data = {
      address: addr,
      userId: sessionManager.getDataFromCookies("userId")
    }

    let [error, tagUsingAddressHashResponse] = await Utils.parseResponse(
      TransactionService.getUserAddressTagUsingAddressHash(data)
    );
    if (error || !tagUsingAddressHashResponse) return;
    setAddressTag(tagUsingAddressHashResponse);
    setIsTag(true);
  }

  useEffect(() => {
    getAddressDetails();
    tagUsingAddressHash();
  }, []);
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Tokensearchbar />
      <Grid className="table-grid-block grid-block-table">
        <div className={classes.mainContainer}>
          <div className={classes.root}>
            <Grid style={{ width: "75.125rem" }}>
              <AddressPath>
                <Explorer>Explorer</Explorer>
                <Next src={require("../../../src/assets/images/next.svg")} />
                <Address>Address</Address>
              </AddressPath>
              <Spacing style={{ borderBottom: "none" }}>
                <Container>
                  <Heading>Address Details</Heading>
                </Container>
              </Spacing>
              <Div>
                <Spacing>
                  <HashDiv>
                    <Container>
                      <Tooltip title="An address is a unique sequence of numbers and letters">
                        <ImageView
                          src={require("../../../src/assets/images/questionmark.svg")}
                        />
                      </Tooltip>
                      <Hash>Address</Hash>

                    </Container>
                    <MiddleContainerHash>
                      <Content>{addr}</Content>
                      {isTag ? (<div className="nameLabel1">{addressTag[0]?.tagName}</div>) : ("")}
                    </MiddleContainerHash>
                    <SecondContainer>
                      <CopyToClipboard
                        text={addr}
                        onCopy={() => setCopiedText(addr)}
                      >
                        <Tooltip
                          title={
                            copiedText === addr ? "Copied" : "Copy To Clipboard"
                          }
                          placement="top"
                        >
                          <button
                            style={{
                              color: "blue",
                              backgroundColor: "white",
                              fontSize: 17,
                            }}
                          >
                            <img
                              src={require("../../../src/assets/images/copy.svg")}
                            />
                          </button>
                        </Tooltip>
                      </CopyToClipboard>

                      <Popup
                        trigger={
                          <ImQrcode
                            style={{
                              marginLeft: "0.625rem",
                              marginBottom: "0.125rem",
                              cursor: "pointer",
                              color: "#2149b9",
                              height: "1.063rem",
                              width: "1.063rem",
                            }}
                          />
                        }
                        lockScroll
                        modal
                      >
                        {(close) => (
                          <div className="popup_qr">
                            <p>
                              <div>
                                <button
                                  style={{
                                    outline: "none",
                                    // width: "0rem",
                                    height: "0rem",
                                    marginLeft: "0rem",
                                  }}
                                  className="close"
                                  onClick={close}
                                >
                                  &times;
                                </button>
                                <div
                                  className="header-popup"
                                // style={{
                                //   fontSize: "0.875rem",
                                //   paddingTop: "0.313rem",
                                //   paddingBottom: "3.75rem",
                                // }}
                                >
                                  {" "}
                                  {addr}{" "}
                                </div>
                                {window.innerWidth > 767 ?
                                  <QRCode
                                    size={320}
                                    style={{ height: 400, width: 400, marginTop: '0.625rem' }}
                                    value={process.env.REACT_APP_QR_CODE_LINK + addr}
                                  /> :
                                  <QRCode
                                    // style={{window.innerWidth > 768 ? '800px' : '400px'}}
                                    size={320}
                                    className="qrcode-label"
                                    //style={{ height: 400, width: 400, marginTop: '0.625rem' }}
                                    value={process.env.REACT_APP_QR_CODE_LINK + addr}
                                  />}
                              </div>
                            </p>
                          </div>
                        )}
                      </Popup>
                    </SecondContainer>
                  </HashDiv>
                </Spacing>
                {/* <Spacing style={{ borderBottom: "none" }}>
                  <HashDiv>
                    <Container>
                      <Hash>Balance</Hash>
                    </Container>
                    <MiddleContainerHash>
                      <Content>
                        {balance} XDC({ReactHtmlParser(convertCurrency)}{" "}
                        {coinValue})
                      </Content>
                    </MiddleContainerHash>
                  </HashDiv>
                </Spacing> */}
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
          <div className="block_sec sec-block sec-block-mb">
            <div className="bloc-tabs_sec">
              <button
                className={
                  toggleState === 1 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(1)}
                id="transaction-btn"
              >
                Transactions
              </button>
            </div>
          </div>


          <div
            className={
              toggleState === 1
                ? "content_sec  active-content_sec sec-active"
                : "content_sec"
            }
          >
            <AddressTableComponent trans={transactions} coinadd={addr} />
          </div>

        </div>
      </Grid>
      <FooterComponent />
    </div>
  );
}

const Input = styled.input`
  border-radius: 0.313rem;
  border: solid 0.063rem #e3e7eb;
  background-color: #fff;
  font-family: Inter;
  font-size: 0.875rem;
  letter-spacing: 0.034rem;
  text-align: left;
  color: #2a2a2a;
`;
const Content = styled.span`
  font-family: Inter;
  font-size: 0.938rem;
  letter-spacing: 0.034rem;
  text-align: left;
  color: #3a3a3a;
  word-break: break-all;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
  }
`;
const TextArea = styled.textarea`
  opacity: 0.33;
  border-radius: 0.25rem;
  border: solid 0.063rem #9fa9ba;
  background-color: #dee0e3;
  width: 100%;
  font-family: Inter;
  font-size: 0.875rem;
  height: 5.313rem;
  float: left;

  overflow-y: auto;
`;
const Digits = styled.span`
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.034rem;
  text-align: left;
  color: #4878ff;
`;
const Blocks = styled.span`
  font-family: Inter;
  font-size: 0.875rem;

  letter-spacing: 0.034rem;
  text-align: left;
`;
const Div__ = styled.div`
  height: auto;
  border-radius: 0.438rem;
  box-shadow: 0 0.125rem 0.938rem 0 rgba(0, 0, 0, 0.1);
  margin-top: 1.25rem;
  background-color: #fff;
  padding: 0.563rem;
`;
const MiddleContainer = styled.div`
  font-family: Inter;
  font-size: 0.813rem;
  letter-spacing: 0.034rem;
  text-align: left;
  color: #3a3a3a;
  margin-left: 6.25rem;
  width: 100%;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 0.75rem;
    margin-left: unset;
    margin-top: 0.5rem;
  }
`;
const MiddleContainerHash = styled.div`
  font-family: Inter;
  font-size: 0.813rem;
  letter-spacing: 0.034rem;
  text-align: left;
  color: #3a3a3a;
  margin-left: 6.25rem;
  width: 100%;
  display: flex;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 0.75rem;
    margin-left: unset;
    margin-top: 0.5rem;
    padding-right: 2.313rem;
  }
`;
const Hash = styled.span`
  color: var(--unnamed-color-2a2a2a);
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 0.938rem;
  letter-spacing: 0.031rem;
  color: #2a2a2a;
  @media (min-width: 300px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.813rem;
  }
`;
const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 0.188rem 0.25rem;

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
  padding: 0.938rem 0.938rem;

  @media (min-width: 300px) and (max-width: 767px) {
    display: block;
  }
`;
const Container = styled.div`
  display: flex;
  word-break: break-all;
  width: 100%;
  align-items: center;
  max-width: 5.25rem;
`;
const SecondContainer = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 300px) and (max-width: 767px) {
  }
`;

const Div = styled.div`
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 0.938rem 0 rgba(0, 0, 0, 0.1);
  border: solid 0.063rem #e3e7eb;
  background-color: #fff;
  margin-bottom: 0.938rem;
  // padding: 0.313rem;
  margin-top: 0.625rem;
    @media (min-width: 300px) and (max-width: 767px) {
    width: 22.563rem;
    margin-top: 0rem;
  }
`;

const Heading = styled.span`
  white-space: nowrap;
  color: #2a2a2a !important;
  box-shadow: none;
  color: var(--unnamed-color-2a2a2a);
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1.125rem;
`;

const ImageView = styled.img`
  width: 0.938rem;
  margin-right: 0.938rem;
  cursor: pointer;
`;

const AddressPath = styled.div`
  width: 100%;
  font-size: 0.875rem;
  display: flex;
  margin-bottom: 12px;
  margin-Left: 4px;
  margin-top: -30px;
  ;
`;

const Explorer = styled.div`
  color: #2149b9;
`;
const Address = styled.div`
  color: #686868;
`;
const Next = styled.img`
  width: 7px;
  height: 7px;
  margin-top: 7px;
  margin-left: 5px;
  margin-right: 4px;
`;