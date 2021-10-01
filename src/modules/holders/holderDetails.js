import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import AddressTableComponent from "./holderTable";
import { ImQrcode } from "react-icons/im";
import Popup from "reactjs-popup";
import { Grid, TableContainer } from "@material-ui/core";
import Utility, { dispatchAction } from "../../utility";
import AddressData from "../../services/address";
import ReactHtmlParser from "react-html-parser";
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
var QRCode = require('qrcode.react');

const DeskTopView = styled.div`
@media (min-width: 0px) and (max-width: 640px) {
  display: none;
}

@media (min-width: 641px) {
  display: visible;
}

`;

const MobileView = styled.div`
@media (min-width: 0px) and (max-width: 640px) {
  display: visible;
}

@media (min-width: 641px) {
  display: none;
}
`;

const useStyles = makeStyles({

  container: {

    borderRadius: '14px',
    boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1)',
    borderBottom: 'none',
    background: '#fff',
    width: "75.125rem"
  },

});
export default function HoldersDetails(props) {
  const [toggleState, setToggleState] = useState(1);

  const [txtAddress, setTxtAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [convertCurrency, setConvertCurrency] = useState('');
  const [coinValue, setCoinValue] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const [copiedText, setCopiedText] = useState("");
  // let nowCurrency = window.localStorage.getItem('currency')

  let { addr } = useParams();
  // let addressValue = 0

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const classes = useStyles();



  const options = {
    htmlparser2: {
      lowerCaseTags: false
    }
  };
  // useEffect(() => {
  //   getAddressDetails();
  // }, []);
  return (
    <>
      <DeskTopView>
        <div style={{ backgroundColor: '#fff' }}>
          <Tokensearchbar />
          <Grid className="table-grid-block">
            <div
              className="block_details_heading"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p className="block_details_heading_left">Holder Details</p>
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
                        Holder
                      </TableCell>
                      <TableCell className="second-row-table_address1">
                        {addr}
                      </TableCell>
                      <TableCell >
                        <div className="dis-flex">
                          <CopyToClipboard text={addr} onCopy={() => setCopiedText(addr)}>
                            <Tooltip
                              title={
                                copiedText === addr
                                  ? "Copied"
                                  : "Copy To Clipboard"
                              }
                              placement="top"
                            >
                              <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14, marginLeft: "25px" }}> <img src={require("../../../src/assets/images/copy.svg")} /> </button>
                            </Tooltip>
                          </CopyToClipboard>
                          <Popup trigger={<ImQrcode className="qr-code" />} modal>
                            {(close) => (
                              <div className="popup_qr">
                                <p>
                                  <div>
                                    <button style={{ outline: 'none', width: '0px', height: '0px', marginLeft: "0px", paddingTop: '1.5rem' }} className="close" onClick={close}>
                                      &times;
                                    </button>
                                    <div className="header" style={{ fontSize: '0.875rem', paddingTop: '1.563rem', paddingBottom: '60px' }}> {addr} </div>
                                    <QRCode size={320} style={{ height: 400, width: 400 }} value={addr} />
                                  </div>
                                </p>
                              </div>
                            )}
                          </Popup>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "0px",
                          paddingRight: "1px",

                        }}
                        id="td"
                      />
                      <TableCell className="first-row-table_address-balance" >
                        Balance
                      </TableCell>
                      <TableCell className="second-row-table_address-balance">
                        {balance} XDC({ReactHtmlParser(convertCurrency)} {coinValue})
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "0px",
                          paddingRight: "1px",
                        }}
                        id="td"
                      />
                      <TableCell className="first-row-table_address-balance" >
                        Transfers
                      </TableCell>
                      <TableCell className="second-row-table_address-balance">
                        30
                      </TableCell>
                      <TableCell></TableCell>
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
                        Contract Address
                      </TableCell>
                      <TableCell className="second-row-table_address">
                        {addr}
                      </TableCell>

                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Paper>
            <br />
            <br />
            <div className="container_sec">
              <div className="block_sec">
                <div className="bloc-tabs_sec">
                  <button
                    className={
                      toggleState === 1 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                    }
                    onClick={() => toggleTab(1)}
                  >
                    Transfers
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
      </DeskTopView>
      <MobileView>
        <div style={{ backgroundColor: '#fff' }}>
          <Tokensearchbar />
          <Grid lg={8} className="table-grid-block">
            <div
              className="block_details_heading"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p className="block_details_heading_left  fs-15">Holder Details</p>
            </div>
            <Paper style={{ borderRadius: '14px', width: '95%', marginLeft: '2%' }} elevation={0}>
              <TableContainer className={classes.container} id="container-table">
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell
                    style={{
                      width: "0px",
                      paddingRight: "1px",

                    }}
                    id="td"
                  /> */}
                      <TableCell className="first-row-table_address1">
                        Holder
                        <div className="sec-row-table">
                          <div className="word-break"> {addr}
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
                            <Popup trigger={<ImQrcode style={{ marginLeft: "10px", marginBottom: "2px", cursor: "pointer" }} />} modal>
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
                            </Popup></div></div>
                      </TableCell></TableRow>

                    <TableRow>
                      {/* <TableCell
                    style={{
                      width: "0px",
                      paddingRight: "1px",

                    }}
                    id="td"
                  /> */}
                      <TableCell className="first-row-table_address-balance" >
                        Balance
                        <div className="sec-row-table"> {balance} XDC({ReactHtmlParser(convertCurrency)} {coinValue})</div>
                      </TableCell></TableRow>

                    <TableRow>
                      {/* <TableCell
                    style={{
                      width: "0px",
                      paddingRight: "1px",
                    }}
                    id="td"
                  /> */}
                      <TableCell className="first-row-table_address-balance" >
                        Transfers
                        <div className="sec-row-table">  30</div>
                      </TableCell></TableRow>
                    <TableRow>
                      {/* <TableCell
                    style={{
                      width: "0px",
                      paddingRight: "1px",
                      borderBottom: "none",
                    }}
                    id="td"
                  /> */}
                      <TableCell className="first-row-table_address" >
                        Contract Address
                        <div className="sec-row-table">{addr}</div>
                      </TableCell></TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Paper>
            <br />
            <br />
            <div className="container_sec">
              <div className="block_sec">
                <div className="bloc-tabs_sec">
                  <button
                    className={
                      toggleState === 1 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                    }
                    onClick={() => toggleTab(1)}
                  >
                    Transfers
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
      </MobileView>
    </>
  );
}
