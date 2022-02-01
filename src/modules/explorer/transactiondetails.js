import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "./tokensearchBar";
import FooterComponent from "../common/footerComponent";
import moment from "moment";
import Utils from "../../utility";
import { Grid } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { useParams } from "react-router";
import { TransactionService } from "../../services";

const useStyles = makeStyles({
  rootui: {
    width: "100%",
    borderRadius: "6px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",

    "@media (min-width: 300px) and (max-width: 567px)": {
      // maxWidth: "300px",
    },
    "@media (min-width: 567px) and (max-width: 767px)": {
      // maxWidth: "500px",
    },
    "@media (min-width: 767px) and (max-width: 1040px)": {
      // maxWidth: "700px",
    },
  },
});

export default function TransactionsDetailsData({ _handleChange }) {
  const { hash } = useParams();
  const [transactions, setTransactions] = useState(false);
  const [amount, setAmount] = useState("");
  const [copiedText, setCopiedText] = useState("");
  useEffect(() => {
    transactionDetail();
  }, [amount]);

  const transactionDetail = async () => {
    let urlPath = `/${hash}`;
    let [error, transactiondetailusinghash] = await Utils.parseResponse(
      TransactionService.getTransactionDetailsUsingHash(urlPath, {})
    );
    if (error || !transactiondetailusinghash) return;

    setTransactions(transactiondetailusinghash);
  };

  // const interval = setInterval(async () => {
  //     let [error, transactiondetailusinghash] = await Utils.parseResponse(TransactionService.getTransactionDetailsUsingHash(urlPath, {}))
  //     setTransactions(transactiondetailusinghash);
  // }, 90000)

  const classes = useStyles();
  const hashid = `A transaction hash is a unique character identifier that is generated whenever the transaction is executed. `;
  const blocknumber = ` The number of block in which transaction was recorded. Block confirmation indicate how many blocks since the transaction is mined.  `;
  const timestamp = ` The date and time at which a transaction is mined. `;
  const from = ` The sending party of the transaction(could be from a contact address)  `;
  const to = ` The receiving party of the transaction(could be from a contact address) `;
  const value = ` The value being transacted in XDC and fiat value. Note: You can click the fiat value(if available) to see historical value at the time of Transaction `;
  const txnfee = ` The value being transacted in XDC and fiat value. Note: You can click the fiat value(if available) to see historical value at the time of Transaction `;
  const gasprovided = `Maximum amount of gas provided for the transaction. For normal XDC transfers the value is 21,000. For contract this value is higher an bound by block gas limit. `;
  const gasprice = ` Cost per unit of gas specified for the transaction, in XDC and Gwei. The higher the gas price the higher hance of getting included in a block `;
  const gasused = ` The exact unit of gas that was used for the transactions. `;
  const nounced = ` Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be 11th transaction sent from the sender's address. `;
  const input = `Additional information that is required for the transaction `;
  const transferToken = `The value being transacted in XDC and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction.`;
  const privatenote =  `User can add a private note to the transaction. Private note is being saved in the local storage of the device.`;

  function _handleChange(event) {
    setAmount(event?.target?.value);
    window.localStorage.setItem("currency", event?.target?.value);
  }

  let CurrencyValue = window.localStorage.getItem("currency");
  const currencySymbol =
    CurrencyValue === "INR" ? "₹" : CurrencyValue === "USD" ? "$" : "€";
  const valueFetch =
    CurrencyValue === "INR"
      ? transactions.valueINR
      : CurrencyValue === "USD"
        ? transactions.valueUSD
        : transactions.valueEUR;
  const transactionFetch =
    CurrencyValue === "INR"
      ? transactions.transactionFeeINR
      : CurrencyValue === "USD"
        ? transactions.transactionFeeUSD
        : transactions.transactionFeeEUR;
  const fetchtxn = !transactionFetch
    ? 0
    : Utils.decimalDivison(transactionFetch, 8);
  const txfee = !transactions.transactionFee
    ? 0
    : (transactions.transactionFee / 1000000000000000000).toFixed(8);
  const gasP = !transactions.gasPrice
    ? 0
    : (transactions.gasPrice / 1000000000000000000).toFixed(18);
  const valueDiv = !valueFetch
    ? 0
    : (valueFetch / 1000000000000000000).toFixed(11);



  return (
    <div>
      <Tokensearchbar />
      <Grid lg={8} className="table-grid-block">
        <div
          className="block_details_heading"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p className="block_details_heading_left_transaction">
            Transactionshhetails
          </p>
          {transactions ? (
            transactions.status ? (
              <p className="Success-rectangle">Success</p>
            ) : (
              <p className="Failed-rectangle">Failed</p>
            )
          ) : null}
        </div>
        <Paper className={classes.rootui} elevation={0}>
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
                >
                  <Tooltip align="right" title={hashid}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{ borderBottom: "none" }}
                  className="first-row-table-hashid"
                >
                  Hash ID
                </TableCell>
                <TableCell
                  className="second-row-table_hash"
                  style={{ borderBottom: "none" }}
                >
                  {hash}
                </TableCell>

                <p style={{ marginTop: "17px" }}>
                  <CopyToClipboard
                    text={hash}
                    onCopy={() => setCopiedText(hash)}
                  >
                    <Tooltip
                      title={
                        copiedText === hash ? "Copied" : "Copy To Clipboard"
                      }
                      placement="top"
                    >
                      <button
                        style={{
                          color: "#2149b9",
                          backgroundColor: "white",
                          fontSize: 14,
                        }}
                      >
                        <i class="fa fa-clone" aria-hidden="true"></i>
                      </button>
                    </Tooltip>
                  </CopyToClipboard>
                </p>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
        <br />
        <Paper className={classes.rootui} elevation={0}>
          <Table className="table-block" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={blocknumber}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>

                <TableCell
                  style={{
                    width: "15%",
                    whiteSpace: "nowrap",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  Block Number
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  <a
                    className="linkTableDetails"
                    href={"/block-details/" + transactions.blockNumber}
                  >
                    {" "}
                    {transactions.blockNumber}{" "}
                  </a>
                  - {transactions.blockConfirmation} Blocks Confirmation
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={timestamp}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  Timestamp
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  {moment(transactions.timestamp * 1000).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={from}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  From
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  <a
                    className="linkTableDetails"
                    href={"/address-details/" + transactions.from}
                  >
                    {transactions.from}{" "}
                  </a>

                  <CopyToClipboard
                    text={transactions.from}
                    onCopy={() => setCopiedText(transactions.from)}
                  >
                    <Tooltip
                      title={
                        copiedText === transactions.from
                          ? "Copied"
                          : "Copy To Clipboard"
                      }
                      placement="top"
                    >
                      <button
                        style={{
                          color: "blue",
                          backgroundColor: "white",
                          fontSize: 14,
                          marginLeft: "25px",
                        }}
                      >
                        <i class="fa fa-clone" aria-hidden="true"></i>
                      </button>
                    </Tooltip>
                  </CopyToClipboard>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={to}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  To
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  <a
                    className="linkTableDetails"
                    href={"/address-details/" + transactions.to}
                  >
                    {transactions.to}
                  </a>
                  <CopyToClipboard
                    text={transactions.to}
                    onCopy={() => setCopiedText(transactions.to)}
                  >
                    <Tooltip
                      title={
                        copiedText === transactions.to
                          ? "Copied"
                          : "Copy To Clipboard"
                      }
                      placement="top"
                    >
                      <button
                        style={{
                          color: "blue",
                          backgroundColor: "white",
                          fontSize: 14,
                          marginLeft: "10px",
                        }}
                      >
                        <i class="fa fa-clone" aria-hidden="true"></i>
                      </button>
                    </Tooltip>
                  </CopyToClipboard>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={value}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  Value
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  {!transactions?.value
                    ? 0
                    : transactions?.value / 1000000000000000000}{" "}
                  XDC ({currencySymbol}
                  {valueDiv && valueDiv > 0 ? valueDiv : 0})
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={txnfee}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  Transaction Fee
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  {txfee} XDC ({currencySymbol}
                  {fetchtxn})
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={gasprovided}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  Gas Provided
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  {transactions.gas}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={gasprice}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  Gas Price
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  {gasP}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={gasused}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  Gas Used
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  {transactions.gasUsed}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ width: "1px", borderBottom: "1px solid #e3e7eb" }}
                  id="td"
                >
                  <Tooltip title={nounced}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  Nonce
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontSize: "12px",
                    fontWeight: "normal",
                    lineHeight: "1rem",

                    color: "#3a3a3a",
                    paddingLeft: "28px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  {transactions.nonce}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    paddingBottom: "45px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                >
                  <Tooltip align="left" title={input}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    paddingBottom: "45px",
                    borderBottom: "1px solid #e3e7eb",
                  }}
                  id="td"
                >
                  <span className="input-data-text">Input Data</span>
                </TableCell>
                <TableCell className="second-row-table">
                  <textarea
                    className="text-area"
                    readOnly
                    value={transactions.input}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    width: "0px",
                    borderBottom: "none",
                  }}
                >
                  <Tooltip align="right" title={privatenote}>
                    <img
                      style={{ width: 13, height: 13 }}
                      src={"/images/questionmark.png"}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1rem",

                    color: "#2a2a2a",
                    borderBottom: "none",
                  }}
                  id="td"
                >
                  Private Note dhbh
                </TableCell>
                <TableCell
                  className="second-row-table"
                  style={{ borderBottom: "none" }}
                >
                  To access the Private Note feature, you must be{" "}
                  <a className="linkTableDetails">Logged In</a>
                  {/* <textarea className="input-area-2" type="text" 
                  placeholder="To access the Private Note feature, you must be Logged In" /> */}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
        <br />
        <br />
      </Grid>
      <FooterComponent _handleChange={_handleChange} currency={amount} />
    </div>
  );
}
