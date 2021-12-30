import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import TransactionTableComponent from "./transactionTable";
import Utility, { dispatchAction } from "../../utility";
import { Grid } from "@material-ui/core";
import ContractData from "../../services/contract";
import TokenUnverifiedContract from "./tokenUnverifiedContract";
import TokenContracttab from "./tokenContractTab";
import ReactHtmlParser from "react-html-parser";
import { Row } from "simple-flexbox";
import { sessionManager } from "../../managers/sessionManager";
import LoginDialog from "../explorer/loginDialog"

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
  table: {},
  wantToLoginText: {
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Inter !important",
    color: "#3a3a3a",
    letterSpacing: "0.54px",
    marginLeft: "25px",
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
    contractName: "",
    creator: "",
    transaction: "",
    currencySymbol: "",
    val: 0.0,
    changedVal: 0.0,
    transactionlist: [],
  };
  const [data, setData] = React.useState(initialState);
  let balance = !data.balance ? 0 : data.balance
  let balance1 = balance.toString().split(".")[0];
  let balance2 = balance.toString().split(".")[1];
  const [responses, setResponses] = React.useState([]);

  const isloggedIn = sessionManager.getDataFromCookies("isLoggedIn");
  const [loginDialogIsOpen, setLoginDialogIsOpen] = React.useState(false);
  const openLoginDialog = () => setLoginDialogIsOpen(true);
  const closeLoginDialog = () => setLoginDialogIsOpen(false);

  let value = !data.val ? 0 : data.val
  let value1 = value.toString().split(".")[0];
  let value2 = value.toString().split(".")[1];

  let changedValue = data.changedVal
  let changedValue1 = changedValue.toString().split(".")[0];
  let changedValue2 = changedValue.toString().split(".")[1];

  const getContractDetails = async (values) => {
    try {
      const [error, responseAPI] = await Utility.parseResponse(
        ContractData.getContractDetails(values)
      );
      let responseData = responseAPI.contractResponse;
      if (responseData.address != "") {
        setResponses(responseAPI);
        let activeCurrency = window.localStorage.getItem("currency");
        let convertedCurrency = "";
        let value = 0;
        let changeVal = 0;
        if (activeCurrency == "USD") {
          convertedCurrency = '<i class="fa fa-usd" aria-hidden="true"></i>  ';
          if (responseData.xdcValueUSD)
            value = responseData.xdcValueUSD.toFixed(6);
          if (responseData.priceInUSD)
            changeVal = responseData.priceInUSD.toFixed(6);
        } else if (activeCurrency == "EUR") {
          convertedCurrency = "<i class='fa fa-eur' aria-hidden='true'></i>  ";
          if (responseData.xdcValueEUR)
            value = responseData.xdcValueEUR.toFixed(6);
          if (responseData.priceInEUR)
            changeVal = responseData.priceInEUR.toFixed(6);
        } else if (activeCurrency == "INR") {
          convertedCurrency = "<i class='fa fa-inr' aria-hidden='true'></i> ";
          if (responseData.xdcValueINR)
            value = responseData.xdcValueINR.toFixed(6);
          if (responseData.priceInINR)
            changeVal = responseData.priceInINR.toFixed(6);
        } else {
          convertedCurrency = '<i class="fa fa-usd" aria-hidden="true"></i>  ';
          if (responseData.xdcValueUSD)
            value = responseData.xdcValueUSD.toFixed(6);
          if (responseData.priceInUSD)
            changeVal = responseData.priceInUSD.toFixed(6);
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
          transactionlist: responseData.transactionArray,
        });
      }
    } catch (error) {
      // console.error(error);
    }
  };

  React.useEffect(() => {
    let values = { addr: addressNumber };
    getContractDetails(values);
  }, []);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Tokensearchbar />
      <Grid className="table-grid-block-contract ">
        <div className="container_sec">
          <div
            className="block_details_heading b-h1"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Row
              alignItems="center"
              justifyContent="center"
              className="contract_details_heading_left"
            >
              Address{" "}
              <span className="AddressTitle addtitle">{addressNumber}</span>
              {!isloggedIn ? (
                <span className={classes.wantToLoginText}>
                  <LoginDialog
                    open={loginDialogIsOpen}
                    onClose={closeLoginDialog}
                    dataHashOrAddress={addressNumber}
                  />
                  <div>Want to tag this address?
                    <a
                      className="linkTableDetails-transaction"
                      style={{ marginLeft: "5px", cursor: "pointer" }}
                      onClick={openLoginDialog}
                    >
                      Login
                    </a>
                  </div>
                </span>) : ("")}
            </Row>
          </div>
          <div className="address_block_main">
            <div className="contractOverview">
              <div className="latest">
                <h1>Contract Overview</h1>
              </div>
              <div className="data">
                <TableContainer
                  component={Paper}
                  elevation={0}
                  style={{ padding: "0 1.5rem" }}
                >
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell className="left-table-contract">
                          Balance
                        </TableCell>
                        <TableCell className="left-table-contract-data">
                          {balance2 == null ? (
                            <span>{balance1} XDC</span>
                          ) : (
                            <span>
                              {balance1}
                              {"."}
                              <span style={{ color: "#9FA9BA" }}>{balance2}</span>
                              XDC
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="left-table-contract">
                          USD Value
                        </TableCell>
                        <TableCell className="left-table-contract-data">
                          {ReactHtmlParser(data.currencySymbol)}
                          {value2 == null ? (
                            <span>{value1} </span>
                          ) : (
                            <span>
                              {value1}
                              {"."}
                              <span style={{ color: "#9FA9BA" }}>{value2}</span>

                            </span>
                          )} (@ {ReactHtmlParser(data.currencySymbol)}
                          {changedValue2 == null ? (
                            <span>{changedValue1}/XDC </span>
                          ) : (
                            <span>
                              {changedValue1}
                              {"."}
                              <span style={{ color: "#9FA9BA" }}>{changedValue2}</span>
                              /XDC
                            </span>
                          )})
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="left-table-contract">
                          Transactions
                        </TableCell>
                        <TableCell className="left-table-contract-data">
                          {data.transactionCout}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="left-table-contract-last">
                          Contract Name
                        </TableCell>
                        <TableCell className="left-table-contract-data-last">
                          {!data.contractName ? "Not Available" : data.contractName}
                          <i class="fas fa-badge-check"></i>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>

            <div className="contractSummary">
              <div className="latest">
                <h1>Contract Summary</h1>
              </div>
              <div className="data">
                <TableContainer
                  component={Paper}
                  elevation={0}
                  style={{ padding: "0 1.5rem" }}
                >
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <div className="contract-summary-mobile">
                          <TableCell className="left-table-contract-mobile">
                            Creator
                          </TableCell>
                          <TableCell className="left-table-contract-data-mobile">
                            {data.creator != "" && (
                              <a
                                className="linkTable"
                                href={"/address-details/" + data.creator}
                              >
                                <span className="tabledata">
                                  {shorten(data.creator)}
                                </span>
                              </a>
                            )}
                          </TableCell>
                        </div>
                      </TableRow>
                      <TableRow>
                        <div className="contract-summary-mobile">
                          <TableCell className="left-table-contract-mobile">
                            Transaction
                          </TableCell>
                          <TableCell className="left-table-contract-data-mobile">
                            {data.transaction != "" && (
                              <a
                                className="linkTable"
                                href={
                                  "/transaction-details/" + data.transaction
                                }
                              >
                                <span className="tabledata">
                                  {shorten(data.transaction)}
                                </span>
                              </a>
                            )}
                          </TableCell>
                        </div>
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
            <div className="block_sec_contract sec-block-contract">
              <div className="bloc-tabs_sec">
                <button
                  className={
                    toggleState === 1
                      ? "tabs_sec_contract active-tabs_sec_contract"
                      : "tabs_sec_contract"
                  }
                  onClick={() => toggleTab(1)}
                  id="transaction-btn"
                >
                  All Transactions
                </button>

                <button
                  className={
                    toggleState === 2
                      ? "tabs_sec_contract active-tabs_sec_contract"
                      : "tabs_sec_contract"
                  }
                  onClick={() => toggleTab(2)}
                  id="contract-btn"
                >
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
              {!responses ? (
                ""
              ) : responses.status === "unverified" ? (
                <TokenUnverifiedContract contractData={responses} />
              ) : (
                <TokenContracttab contractData={responses} />
              )}
            </div>
          </div>
        </div>
      </Grid>
      <FooterComponent />
    </div>
  );
}
