import React, { useState } from "react";
import {useParams} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import SearchIcon from "@material-ui/icons/Search";
import AddressTableComponent from "./addressTable";
import TransactionTableComponent from "./transactionTable";
import { ImQrcode } from "react-icons/im";
import Utility, { dispatchAction } from "../../utility";
import Popup from "reactjs-popup";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ContractData from "../../services/contract";
import ReactHtmlParser from "react-html-parser";
const useStyles = makeStyles({
  rootUI: {
    minWidth: 650,
    borderRadius: "10px",
    backgroundColor: "white",
  },
  table:{
    
  }
});

export default function AddressDetailsData() {
  const [toggleState, setToggleState] = useState(1);
  let { addressNumber } = useParams();
  const toggleTab = (index) => {
    setToggleState(index);
  };
  function shorten(b, amountL = 25, amountR = 5, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
        b.length - 3,
        b.length
    )}`;
}
  const classes = useStyles();
  const [from, setFrom] = React.useState(0);
  const [amount, setAmount] = React.useState(50);
  let initialState = {
    balance:0,
    transactionCout:0,
    contractName:'',
    creator:'',
    transaction:'',
    currencySymbol:'',
    val:0.00,
    changedVal:0.00,
    transactionlist:[]
  }
  const [data, setData] = React.useState(initialState);
  const [responses, setResponses] = React.useState([]);

  const getContractDetails = async (values) => {
    try {
        const [error, responseData] = await Utility.parseResponse(
          ContractData.getContractDetails(values)
        );

        if (responseData.address != '') { 
          setResponses(responseData)
          let activeCurrency = window.localStorage.getItem('currency')
          let convertedCurrency = ''
          let value = 0
          let changeVal = 0
          if (activeCurrency == 'USD') {
            convertedCurrency = '<i class="fa fa-usd" aria-hidden="true"></i>  '
            value = (responseData.xdcValueUSD).toFixed(6)
            changeVal = (responseData.priceInUSD).toFixed(6)
          } else if (activeCurrency == 'EUR') {
            convertedCurrency = "<i class='fa fa-eur' aria-hidden='true'></i>  "
            value = (responseData.xdcValueEUR).toFixed(6)
            changeVal = (responseData.priceInEUR).toFixed(6)
          } else if (activeCurrency == 'INR') {
            convertedCurrency = "<i class='fa fa-inr' aria-hidden='true'></i> "
            value = (responseData.xdcValueINR).toFixed(6)
            changeVal = (responseData.priceInINR).toFixed(6)
          } else {
            convertedCurrency = '<i class="fa fa-usd" aria-hidden="true"></i>  '
            value = (responseData.xdcValueUSD).toFixed(6)
            changeVal = (responseData.priceInUSD).toFixed(6)
          }
          
          setData({
            balance:responseData.balance,
            transactionCout:responseData.transactionCount,
            contractName:responseData.contractName,
            creator:responseData.owner,
            transaction:responseData.creationTransaction,
            currencySymbol:convertedCurrency,
            val:value,
            changedVal:changeVal,
            transactionlist:responseData.transactionArray

          })
          console.log(responses)
        } else {
            
        }
    } catch (error) {
        console.error(error);
    }
  }
  React.useEffect(() => {
    let values = { addr:addressNumber,pageNum: from, perpage: amount,keywords:'' }
    getContractDetails(values)
    
}, []);

  return (
    <div style={{backgroundColor:'#fff'}}>
      <Tokensearchbar />
      <Grid lg={8} className="table-grid-block">
        <div
          className="block_details_heading"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p className="block_details_heading_left">Address <span className="AddressTitle">{addressNumber}</span></p>
        </div>

        
        <div className="container_sec">
        <div className="address_block_main">
                <div className="contractOverview">
                    <div className="latest">
                        <h1>Contract Overview</h1>                        
                    </div>
                    <div className="data">                       
                      <TableContainer component={Paper} elevation={0} style={{padding:'15px'}}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableBody>                           
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold', padding:'8px'}}>Balance</TableCell> 
                              <TableCell style={{padding:'8px'}}>{data.balance} XDC</TableCell>                             
                            </TableRow>  
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold', padding:'8px'}}>XDC Value</TableCell> 
                              <TableCell style={{padding:'8px'}}>{ReactHtmlParser(data.currencySymbol)}{data.val} (@ {ReactHtmlParser(data.currencySymbol)}{data.changedVal}/XDC)</TableCell>                             
                            </TableRow>
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold', padding:'8px'}}>Transactions</TableCell> 
                              <TableCell style={{padding:'8px'}}>{data.transactionCout}</TableCell>                             
                            </TableRow>
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold', padding:'8px'}}>Contract Name</TableCell> 
                              <TableCell style={{padding:'8px'}}>{data.contractName}<i class="fas fa-badge-check"></i></TableCell>                             
                            </TableRow>                         
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                </div>
                <div className="contractSummary">
                    <div className="latest">
                        <h1>Contract-Summary</h1>
                    </div>
                    <div className="data">
                        <TableContainer component={Paper} elevation={0} style={{padding:'15px'}}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableBody>                           
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold', padding:'8px'}}>Creator</TableCell> 
                              <TableCell style={{padding:'8px'}}>
                              {data.creator != '' &&
                                  <a className="linkTable" href={'/address-details/' + data.creator}>
                                    <span className="tabledata">{shorten(data.creator)}</span>
                                  </a>
                                }
                              </TableCell>                             
                            </TableRow>  
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold', padding:'8px'}}>Transactions</TableCell> 
                              <TableCell style={{padding:'8px'}}>
                                {data.transaction != '' &&
                                  <a className="linkTable" href={'/transaction-details/' + data.transaction}>
                                    <span className="tabledata">{shorten(data.transaction)}</span>
                                  </a>
                                }
                                
                                </TableCell>                             
                            </TableRow>
                           
                                                    
                          </TableBody>
                        </Table>
                      </TableContainer>
                        
                    </div>
                </div>
            </div>
        
        <br />
        <br />
          <div className="block_sec">
            <div className="bloc-tabs_sec">
              <button
                className={
                  toggleState === 1 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(1)}
              >
                All Transactions
              </button>
              <button
                className={
                  toggleState === 2 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(2)}
              >
                Internal Transactions
              </button>
              <button
                className={
                  toggleState === 3 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(3)}
              >
                Contract Source
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
              
          <TransactionTableComponent />
            </div>

            <div
              className={
                toggleState === 2
                  ? "content_sec  active-content_sec"
                  : "content_sec"
              }
            >
              <div className="content_input_all">
                <div className="content_input_add">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search"
                    className="content_input_add_btn"
                  />
                </div>
                <span style={{color: '#2149b9',fontFamily: 'Inter',fontSize: '14px',fontStyle: 'normal'}}>
                <i class="fa fa-download" aria-hidden="true"></i> Download CSV</span>
                
              </div>
              {/* <AddressTableComponent />*/}
            </div>

            <div
              className={
                toggleState === 3
                  ? "content_sec  active-content_sec"
                  : "content_sec"
              }
            >
              <div className="content_input_all">
                <div className="content_input_add">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search"
                    className="content_input_add_btn"
                  />
                </div>
                <span style={{color: '#2149b9',fontFamily: 'Inter',fontSize: '14px',fontStyle: 'normal'}}>
                <i class="fa fa-download" aria-hidden="true"></i> Download CSV</span>
                
              </div>
             {/* <AddressTableComponent />*/}
            </div>
          </div>
        </div>
      </Grid>
      <FooterComponent />
    </div>
  );
}
