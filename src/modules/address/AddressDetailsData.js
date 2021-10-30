import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import TokenUnverifiedContract from './tokenUnverifiedContract'
import TokenContracttab from './tokenContractTab'
import ReactHtmlParser from "react-html-parser";
import Utils from "../../utility";


const useStyles = makeStyles({
  rootUI: {
    minWidth: 650,
    borderRadius: "10px",
    backgroundColor: "white",
    "@media (min-width: 300px) and (max-width: 567px)": {
      maxWidth: "300px",
    },
    "@media (min-width: 567px) and (max-width: 767px)": {
      maxWidth: "500px",
    },
    "@media (min-width: 767px) and (max-width: 1040px)": {
      maxWidth: "700px",
    },
  },
  table: {

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
    balance: 0,
    transactionCout: 0,
    contractName: '',
    creator: '',
    transaction: '',
    currencySymbol: '',
    val: 0.00,
    changedVal: 0.00,
    transactionlist: []
  }
  const [data, setData] = React.useState(initialState);
  const [responses, setResponses] = React.useState([]);

  const getContractDetails = async (values) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        ContractData.getContractDetails(values)
      );
      console.log(responseData, "787")
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
          balance: responseData.balance,
          transactionCout: responseData.transactionCount,
          contractName: responseData.contractName,
          creator: responseData.owner,
          transaction: responseData.creationTransaction,
          currencySymbol: convertedCurrency,
          val: value,
          changedVal: changeVal,
          transactionlist: responseData.transactionArray

        })

      } else {

      }
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    let values = { addr: addressNumber, pageNum: from, perpage: amount, keywords: '' }
    getContractDetails(values)

  }, []);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Tokensearchbar />
      <Grid className="table-grid-block-contract ">
        <div
          className="block_details_heading b-h1"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p className="contract_details_heading_left">Address <span className="AddressTitle addtitle">{addressNumber}</span></p>
        </div>


        <div className="container_sec">
          <div className="address_block_main">
            <div className="contractOverview">
              <div className="latest">
                <h1>Contract Overview</h1>
              </div>
              <div className="data">
                <TableContainer component={Paper} elevation={0} style={{ padding: '0 1.5rem' }}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell className="left-table-contract">Balance</TableCell>
                        <TableCell className="left-table-contract-data">{data.balance} XDC</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="left-table-contract">XDC Value</TableCell>
                        <TableCell className="left-table-contract-data">{ReactHtmlParser(data.currencySymbol)}{data.val} (@ {ReactHtmlParser(data.currencySymbol)}{data.changedVal}/XDC)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="left-table-contract">Transactions</TableCell>
                        <TableCell className="left-table-contract-data">{data.transactionCout}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="left-table-contract-last">Contract Name</TableCell>
                        <TableCell className="left-table-contract-data-last">{data.contractName}<i class="fas fa-badge-check"></i></TableCell>
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
                <TableContainer component={Paper} elevation={0} style={{ padding: '0 1.5rem' }}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell className="left-table-contract">Creator</TableCell>
                        <TableCell className="left-table-contract-data">
                          {data.creator != '' &&
                            <a className="linkTable" href={'/address-details/' + data.creator}>
                              <span className="tabledata">{shorten(data.creator)}</span>
                            </a>
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="left-table-contract">Transactions</TableCell>
                        <TableCell className="left-table-contract-data">
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
          <div>
            <div className="block_sec_contract sec-block">
              <div className="bloc-tabs_sec">
                <button
                  className={
                    toggleState === 1 ? "tabs_sec_contract active-tabs_sec_contract" : "tabs_sec_contract"
                  }
                  onClick={() => toggleTab(1)}
                  id="transaction-btn">
                  All Transactions
                </button>

                <button
                  className={
                    toggleState === 2 ? "tabs_sec_contract active-tabs_sec_contract" : "tabs_sec_contract"
                  }
                  onClick={() => toggleTab(2)}
                  id="contract-btn">
                  Contract Source
                </button>
              </div>
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

              {!responses ? "" : responses.status === "verified" ? <TokenUnverifiedContract contractData={responses} /> : <TokenContracttab contractData={responses} />}
            </div>
            {/* <div
              className={
                toggleState === 2
                  ? "content_sec  active-content_sec"
                  : "content_sec"
              }
            > */}
            {/* <div className="content_input_all">
                <div className="content_input_add">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search"
                    className="content_input_add_btn"
                  />
                </div>
                <span style={{ color: '#2149b9', fontFamily: 'Inter', fontSize: '14px', fontStyle: 'normal' }}>
                  <i class="fa fa-download" aria-hidden="true"></i> Download CSV</span>

              </div> */}
            {/* <AddressTableComponent />*/}
            {/* </div> */}

          </div>
        </div>
      </Grid>
      <FooterComponent />
    </div>
  );
}
