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
      <Grid lg={8} className="table-grid-block">
        <div
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
                Transactions
              </button>
              <button
                className={
                  toggleState === 2 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(2)}
              >
                Internal Txn
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
