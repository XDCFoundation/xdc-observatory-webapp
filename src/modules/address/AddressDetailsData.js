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
import TokenContracttab from "../token/tokenContractTab";
import ReactHtmlParser from "react-html-parser";
import { Row } from "simple-flexbox";
import { sessionManager } from "../../managers/sessionManager";
import LoginDialog from "../explorer/loginDialog";
import AddressData from "../../services/address";
import ReadContract from "../contractMethods/read";
import WriteContract from "../contractMethods/write";
import styled from "styled-components";
import { connect } from "react-redux";
import { CoinMarketService } from "../../services";
import format from "format-number";
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

    marginLeft: "25px",
  },
});

const TabContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;

  @media (min-width: 0px) and (max-width: 767px) {
    width: 21rem;
  }
`;

const TabContainerParent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  border-bottom: solid 1px #e3e7eb;
  width: 100%;
  margin: auto;
  ${({ theme }) => theme === "dark" && `
    border-bottom: solid 1px #4a5d94;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    width: 21rem;
  }
`;

function AddressDetailsData(props) {
  const [toggleState, setToggleState] = useState(1);
  let { addressNumber } = useParams();
  const toggleTab = (index) => {
    setToggleState(index);
  };
  function shorten(b, amountL = 25, amountR = 5, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }
  const classes = useStyles();
  const [from, setFrom] = React.useState(0);
  const [amount, setAmount] = React.useState("");
  const [price, setPrice] = useState("");
  function _handleChange(event) {
    setAmount(event?.target?.value);
    window.localStorage.setItem("currency", event?.target?.value);
  }
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
  let balance = !data.balance ? 0 : data.balance;
  let balance1 = Number(balance.toString().split(".")[0]);
  let balance2 = balance.toString().split(".")[1];
  const [responses, setResponses] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const isloggedIn = sessionManager.getDataFromCookies("isLoggedIn");
  const [loginDialogIsOpen, setLoginDialogIsOpen] = React.useState(false);
  const openLoginDialog = () => setLoginDialogIsOpen(true);
  const closeLoginDialog = () => setLoginDialogIsOpen(false);

  let value = !data.balance ? 0 : data.balance;
  let value1 = value.toString().split(".")[0];
  let value2 = value.toString().split(".")[1];

  let changedValue =  data?.balance?Utility.convertToInternationalCurrencySystem(data?.balance * price):"";
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
          balance: Utility.decimalDivisonOnly(responseAPI?.balance,8),
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
  const getTransactionsCountForAddress = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getTransactionsCountForAddress(data)
      );
      if (error || !responseData) return;
      setCount(parseInt(responseData));
    } catch (error) {
      console.error(error);
    }
  };
  let activeCurrency = window.localStorage.getItem("currency");
  let currencySymbol = !price ? "" :
  activeCurrency === "USD" ? "$" : "€";
  const coinMarketCapDetails = async () => {
    let [error, totalcoinMarketPrice] = await Utility?.parseResponse(
      CoinMarketService?.getCoinMarketData(activeCurrency, {})
    );
    if (error || !totalcoinMarketPrice) return;
    totalcoinMarketPrice = totalcoinMarketPrice.sort((a, b) => {
      return a.lastUpdated - b.lastUpdated;
    });
    setPrice(totalcoinMarketPrice[1]?.price);
  };
  React.useEffect(() => {
    let values = { addr: addressNumber };
    getContractDetails(values);
    let data = { address: addressNumber };
    getTransactionsCountForAddress(data);
    coinMarketCapDetails()
  }, [amount]);

  return (
    <div style={props.theme.currentTheme === "dark" ? { backgroundColor: "#091b4e" } : { backgroundColor: "#fff" }}>
      <Tokensearchbar theme={props.theme.currentTheme}/>
      <Grid className="table-grid-block-contract ">
        <div>
          <div
            className="contract_details_heading p-t-30 display-flex justify-content-betwe"
          >
            <div className={props.theme.currentTheme === "dark" ? "contract-address-heading fc-white" : "contract-address-heading"}>Contract Address{" "}</div>

            <div className={props.theme.currentTheme === "dark" ? "AddressTitle fc-4878ff" : "AddressTitle"}>{addressNumber}</div>


          </div>
          <div className="address_block_main">
            <div className={props.theme.currentTheme === "dark" ? "contractOverview table-bg-dark border-none-dark" : "contractOverview"}>
              <div className="latest">
                <h1 className={props.theme.currentTheme === "dark" ? "fc-white" : "" }>Contract Overview</h1>
              </div>
              <div className="data">
                <TableContainer
                  component={Paper}
                  elevation={0}
                  style={{ padding: "0 1.5rem" }}
                  className={props.theme.currentTheme === "dark" ? "table-bg-dark" : ""}
                >
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-dark" : "left-table-contract"}>
                          Balance
                        </TableCell>
                        <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-data fc-b1c3e1 border-bottom-dark" : "left-table-contract-data"}>
                          {balance2 == null ? (
                            <span>{balance1?Number(balance1):0} XDC</span>
                          ) : (
                            <span>
                              {Number(balance1)}
                              {"."}
                              <span style={{ color: "#9FA9BA" }}>
                                {balance2}
                              </span>
                              &nbsp;XDC
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-dark" : "left-table-contract"}>
                          USD Value
                        </TableCell>
                        <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-data fc-b1c3e1 border-bottom-dark" : "left-table-contract-data"}>
                          {/* {ReactHtmlParser(data.currencySymbol)}
                          {value2 == null ? (
                            <span>{value1} </span>
                          ) : (
                            <span>
                              {value1}
                              {"."}
                              <span style={{ color: "#9FA9BA" }}>{value2}</span>
                            </span>
                          )}{" "}
                          (@ {ReactHtmlParser(data.currencySymbol)}
                          {changedValue2 == null ? (
                            <span>{changedValue1}/XDC </span>
                          ) : (
                            <span>
                              {changedValue1}
                              {"."}
                              <span style={{ color: "#9FA9BA" }}>
                                {changedValue2}
                              </span>
                              /XDC
                            </span>
                          )}
                          ) */}
                         
                          {changedValue2 == null ? (
                            <span>{currencySymbol}&nbsp;{changedValue1 ?changedValue1:0}&nbsp; </span>
                          ) : (
                            
                            <span>
                             {currencySymbol} {changedValue1}
                              {"."}
                              <span style={{ color: "#9FA9BA" }}>
                                {changedValue2}
                              </span>
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-dark" : "left-table-contract"}>
                          Transactions
                        </TableCell>
                        <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-data fc-b1c3e1 border-bottom-dark" : "left-table-contract-data"}>
                          {count}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-last-dark" : "left-table-contract-last"}>
                          Contract Name
                        </TableCell>
                        <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-data-last fc-b1c3e1" : "left-table-contract-data-last"}>
                          {!data.contractName
                            ? "Not Available"
                            : data.contractName}
                          <i class="fas fa-badge-check"></i>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>

            <div className={props.theme.currentTheme === "dark" ? "contractSummary table-bg-dark border-none-dark" : "contractSummary"}>
              <div className="latest">
                <h1 className={props.theme.currentTheme === "dark" ? "fc-white" : "" }>Contract Summary</h1>
              </div>
              <div className="data">
                <TableContainer
                  component={Paper}
                  elevation={0}
                  style={{ padding: "0 1.5rem" }}
                  className={props.theme.currentTheme === "dark" ? "table-bg-dark" : ""}
                >
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <div className="contract-summary-mobile">
                          <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-mobile fc-white border-bottom-dark" : "left-table-contract-mobile"}>
                            Creator
                          </TableCell>
                          <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-data-mobile-dark" : "left-table-contract-data-mobile"}>
                            {data.creator == "" ? "Not Available":(
                              <a
                              className={props.theme.currentTheme === "dark" ? "linkTable fc-4878ff" : "linkTable"}
                                href={"/address-details/" + data.creator}
                              >
                                <span className="tabledata">
                                  {shorten(data?.creator)}
                                </span>
                              </a>
                            )}
                          </TableCell>
                        </div>
                      </TableRow>
                      <TableRow>
                        <div className="contract-summary-mobile">
                          <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-mobile fc-white border-bottom-dark" : "left-table-contract-mobile"}>
                            Transaction
                          </TableCell>
                          <TableCell className={props.theme.currentTheme === "dark" ? "left-table-contract-data-mobile-dark" : "left-table-contract-data-mobile"}>
                          {data.transaction == "" ? "Not Available":(
                              <a
                              className={props.theme.currentTheme === "dark" ? "linkTable fc-4878ff" : "linkTable"}
                              href={
                                "/transaction-details/" + data.transaction
                              }
                            >
                              <span className="tabledata">
                                {shorten(data?.transaction)}
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
          <TabContainerParent theme={props.theme.currentTheme}>
            <TabContainer>
              <button
                className={
                  toggleState === 1
                    ? props.theme.currentTheme === "dark" ? "token-data-tabs active-tabs-token bg-transparent-dark fc-4878ff" : "token-data-tabs active-tabs-token"
                    : props.theme.currentTheme === "dark" ? "token-data-tabs bg-transparent-dark" : "token-data-tabs"
                }
                onClick={() => toggleTab(1)}
              >
                All Transactions
              </button>

              <button
                className={
                  toggleState === 2
                  ? props.theme.currentTheme === "dark" ? "token-data-tabs active-tabs-token bg-transparent-dark fc-4878ff" : "token-data-tabs active-tabs-token"
                  : props.theme.currentTheme === "dark" ? "token-data-tabs bg-transparent-dark" : "token-data-tabs"
                }
                onClick={() => toggleTab(2)}
              >
                Code
              </button>
              {/* <button
                className={
                  toggleState === 3
                    ? "token-data-tabs active-tabs-token"
                    : "token-data-tabs"
                }
                onClick={() => toggleTab(3)}
              >
                XRC20
              </button> */}
              {!responses ? (
                ""
              ) : responses?.contractStatus !== "Unverified" ? (
                <>
                  <button
                    className={
                      toggleState === 4
                      ? props.theme.currentTheme === "dark" ? "token-data-tabs active-tabs-token bg-transparent-dark fc-4878ff" : "token-data-tabs active-tabs-token"
                      : props.theme.currentTheme === "dark" ? "token-data-tabs bg-transparent-dark" : "token-data-tabs"
                    }
                    onClick={() => toggleTab(4)}
                  >
                    Read Contract
                  </button>
                  <button
                    className={
                      toggleState === 5
                      ? props.theme.currentTheme === "dark" ? "token-data-tabs active-tabs-token bg-transparent-dark fc-4878ff" : "token-data-tabs active-tabs-token"
                      : props.theme.currentTheme === "dark" ? "token-data-tabs bg-transparent-dark" : "token-data-tabs"
                    }
                    onClick={() => toggleTab(5)}
                  >
                    Write Contract
                  </button>
                </>
              ) : (
                ""
              )}
            </TabContainer>
          </TabContainerParent>

          {/* <div className="content-tabs_sec"> */}
          <div
            className={
              toggleState === 1
                ? "content_sec  active-content_sec"
                : "content_sec"
            }
          >
            {/* {console.log("resp",responses?.contractResponse?.creationTransaction)} */}
            <TransactionTableComponent theme={props.theme.currentTheme} hash={responses?.contractResponse?.creationTransaction}/>
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
            ) : responses?.contractStatus === "Unverified" ? (
              <TokenUnverifiedContract
                contractData={responses?.contractResponse}
                theme={props.theme.currentTheme}
              />
            ) : (
              <TokenContracttab contractData={responses?.contractResponse} theme={props.theme.currentTheme}/>
            )}
          </div>
          <div
            className={
              toggleState === 4
                ? "content_sec  active-content_sec"
                : "content_sec"
            }
          >
            <ReadContract
              contractData={
                responses?.contractResponse
                  ? { ...responses?.contractResponse }
                  : {}
              }
              theme={props.theme.currentTheme}
            />
          </div>
          <div
            className={
              toggleState === 5
                ? "content_sec  active-content_sec"
                : "content_sec"
            }
          >
            <WriteContract
              contractData={
                responses?.contractResponse
                  ? { ...responses?.contractResponse }
                  : {}
              }
              theme={props.theme.currentTheme}
            />
          </div>
          {/* </div> */}
        </div>
      </Grid>
      <FooterComponent  _handleChange={_handleChange} currency={amount} />
    </div>
  );
}


const mapStateToProps = (state) => {
  return { theme: state.theme };
};
export default connect(mapStateToProps, { dispatchAction })(AddressDetailsData);