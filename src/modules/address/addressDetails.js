import React, { useState , useEffect } from "react";
import {useParams} from "react-router-dom";
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
import SearchIcon from "@material-ui/icons/Search";
import AddressTableComponent from "./addressTable";
import { ImQrcode } from "react-icons/im";
import Popup from "reactjs-popup";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Utility, { dispatchAction } from "../../utility";
import AddressData from "../../services/address";
import { CSVLink, CSVDownload } from "react-csv";
var QRCode = require('qrcode.react');

const useStyles = makeStyles({
  rootUI: {
    minWidth: 650,
    borderRadius: "10px",
    backgroundColor: "white",
  },
});

export default function AddressDetails() {
  const [toggleState, setToggleState] = useState(1);
  
  const [txtAddress, setTxtAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  let { address } = useParams();
  let addressValue =0
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const classes = useStyles();

    function shortenBalance(b, amountL = 12, amountR = 3, stars = 0) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,

        )}`;
    }
  const getAddressDetails = async () => {
    try {
       const [error, responseData] = await Utility.parseResponse(
        AddressData.getAddressDetail(address)
    );
       
      if(responseData) {
        setBalance(parseFloat(responseData.balance).toFixed(2));
        setTransactions(responseData.transaction);
        setTxtAddress(responseData.address);
        setLoading(false);
      }else{        
        setBalance(parseFloat(0).toFixed(2));
        setTransactions([]);
        setTxtAddress(0);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {    
     getAddressDetails();
  }, []);

        if (isLoading) {
            return <div className="App">Loading...</div>;
          }

  return (
    <div style={{backgroundColor:'#fff'}}>
      <Tokensearchbar />
      <Grid lg={8} className="table-grid-block">
        <div
          className="block_details_heading"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p className="block_details_heading_left">Address Details</p>
        </div>
        <Paper className={classes.rootUI}>
          <Table className="table-block" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: "0px",
                    paddingRight: "1px",
                    borderBottom: "none",
                  }}
                  id="td"
                />
                <TableCell className="first-row-table_address">
                  Address
                </TableCell>
                <TableCell className="second-row-table_address">
                  {address}
                </TableCell>
                <TableCell>
                  <CopyToClipboard text={txtAddress}>
                    <button
                      style={{
                        color: "#2149b9",
                        backgroundColor: "white",
                        fontSize: 14,
                      }}
                    >
                      <i class="fa fa-clone" aria-hidden="true" />
                    </button>
                  </CopyToClipboard>
                  <Popup trigger={<ImQrcode />} modal>
                    {(close) => (
                      <div className="popup_qr">
                        <p>
                        <div>
                        <button style={{border:'null',width:'0px'}} className="close" onClick={close}>
                        &times;
                      </button>
                          <div className="header" style={{fontSize:'12px',paddingTop:'6px',paddingBottom:'22px'}}> {address} </div>
                          <QRCode size="320" value={address} />
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
                <TableCell className="first-row-table_address">
                  XDC Value
                </TableCell>
                <TableCell className="second-row-table_address">
                  $ {shortenBalance(balance.toLocaleString())}
                </TableCell>
               
              </TableRow>
            </TableHead>
          </Table>
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
