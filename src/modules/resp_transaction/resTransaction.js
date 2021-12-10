import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
// import "tippy.js/dist/tippy.css";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import Tokensearchbar from "../explorer/tokensearchBar";
import { useParams } from "react-router";
import { TransactionService } from "../../services";
import Utils from "../../utility";
import FooterComponent from "../common/footerComponent";
import { Row, Column } from "simple-flexbox";
import moment from "moment";
import Loader from "../../assets/loader";
import PrivateAddressTag from "../../modules/common/dialog/privateAddressTag"
import PrivateNote from "../../modules/common/dialog/privateNote"
import { sessionManager } from "../../managers/sessionManager";
import LoginDialog from "../explorer/loginDialog"


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "75.125rem",

    marginRight: "auto",
    marginTop: "90px",
    marginLeft: "auto",
    marginBottom: "-39px",

    width: "100%",
    "@media (min-width: 0px) and (max-width: 767px)": {
      maxWidth: "22.563rem",
      marginTop: "200px",
    },
    "@media (min-width: 768px) and (max-width: 1239px)": {
      marginTop: "130px",
      maxWidth: "41.5rem",
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

  mainContainer: {
    width: "100%",
  },
}));

export default function Transaction({ _handleChange }) {
  const classes = useStyles();
  const { hash } = useParams();
  const [transactions, setTransactions] = useState(false);
  const [isPvtNote, setIsPvtNote] = useState(false);
  const [privateNote, setPrivateNote] = useState("")
  const [addressTag, setAddressTag] = useState("")
  const [addressTagTo, setAddressTagTo] = useState("")
  const [isTag, setIsTag] = useState(false)
  const [isTagTo, setIsTagTo] = useState(false)
  const [amount, setAmount] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const [dialogPvtTagIsOpen, setDialogPvtTagIsOpen] = React.useState(false)
  const [dialogValue, setDailogValue] = React.useState(0)
  const [dialogValue2, setDailogValue2] = React.useState(0)
  const [dialogPvtTagIsOpen2, setDialogPvtTagIsOpen2] = React.useState(false)
  const [dialogPvtNoteIsOpen, setDialogPvtNoteIsOpen] = React.useState(false)
  const [loginDialogIsOpen, setLoginDialogIsOpen] = React.useState(false)

  const openDialogPvtTag = () => {
    setDialogPvtTagIsOpen(true)
    setDailogValue(1);
  }
  const closeDialogPvtTag = () => {
    setDialogPvtTagIsOpen(false)
    setDailogValue(0);
  }
  const openDialogPvtTag2 = () => {
    setDialogPvtTagIsOpen2(true)
    setDailogValue2(1);
  }
  const closeDialogPvtTag2 = () => {
    setDialogPvtTagIsOpen2(false)
    setDailogValue2(0);
  }
  const openDialogPvtNote = () => setDialogPvtNoteIsOpen(true)
  const closeDialogPvtNote = () => setDialogPvtNoteIsOpen(false)
  const openLoginDialog = () => setLoginDialogIsOpen(true)
  const closeLoginDialog = () => setLoginDialogIsOpen(false)
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    transactionDetail();
    privateNoteUsingHash();
  }, [amount]);

  const transactionDetail = async () => {
    let urlPath = `${hash}`;
    let [error, transactiondetailusinghash] = await Utils.parseResponse(
      TransactionService.getTransactionDetailsUsingHash(urlPath, {})
    );
    if (error || !transactiondetailusinghash) return;
    setTransactions(transactiondetailusinghash);
    setLoading(false);

    tagUsingAddressFrom(transactiondetailusinghash);
    tagUsingAddressTo(transactiondetailusinghash);
  };

  const isloggedIn = sessionManager.getDataFromCookies("isLoggedIn");
  const privateNoteUsingHash = async () => {
    const data = {
      transactionHash: `${hash}`,
      userId: sessionManager.getDataFromCookies("userId")
    }
    let [error, privateNoteUsingHashResponse] = await Utils.parseResponse(
      TransactionService.getUserTransactionPrivateNoteUsingHash(data)
    );
    if (error || !privateNoteUsingHashResponse) return;
    setPrivateNote(privateNoteUsingHashResponse);
    setIsPvtNote(true);
  }


  const tagUsingAddressFrom = async (response) => {
    const data = {
      address: response.from,
      userId: sessionManager.getDataFromCookies("userId")
    }
    let [errors, tagUsingAddressHashResponse] = await Utils.parseResponse(
      TransactionService.getUserAddressTagUsingAddressHash(data)
    );
    if (errors || !tagUsingAddressHashResponse) return;
    setAddressTag(tagUsingAddressHashResponse);
    setIsTag(true);
  }

  const tagUsingAddressTo = async (response) => {
    const data = {
      address: response.to,
      userId: sessionManager.getDataFromCookies("userId")
    }
    let [errors, tagUsingAddressHashResponse] = await Utils.parseResponse(
      TransactionService.getUserAddressTagUsingAddressHash(data)
    );
    if (errors || !tagUsingAddressHashResponse) return;
    setAddressTagTo(tagUsingAddressHashResponse);
    setIsTagTo(true);
  }

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
  const privatenote = ` Private notes `;

  function _handleChange(event) {
    setAmount(event?.target?.value);
    window.localStorage.setItem("currency", event?.target?.value);
  }

  let CurrencyValue = window.localStorage.getItem("currency");
  const currencySymbol =
    CurrencyValue === "INR" ? "₹ " : CurrencyValue === "USD" ? "$ " : "€ ";
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
    : (transactionFetch / 1000000000000000000).toFixed(12);
  const txfee = !transactions.transactionFee
    ? 0
    : (transactions.transactionFee / 1000000000000000000).toFixed(12);
  const gasP = !transactions.gasPrice
    ? 0
    : (transactions.gasPrice / 1000000000000000000).toFixed(18);
  const valueDiv = !valueFetch
    ? 0
    : (valueFetch / 1000000000000000000).toFixed(11);

  // if (isLoading == true) {
  //   return (
  //     <div><Loader /></div>
  //   )
  // }
  return (
    <div className={classes.mainContainer}>
      <Tokensearchbar />

      <div className={classes.root}>
        <Grid>
          <div className={isLoading == true ? "cover-spin-2" : ""}>
            <div className={isLoading == true ? "cover-spin" : ""}>
              <div>
                <div>
                  <Spacing style={{ borderBottom: "none" }}>
                    <Container>
                      <Heading>Transaction Details</Heading>
                      {transactions ? (
                        transactions.status ? (
                          <p className="Success-rectangle">Success</p>
                        ) : (
                          <p className="Failed-rectangle">Failed</p>
                        )
                      ) : null}
                    </Container>
                  </Spacing>

                  <Div>
                    <HashDiv>
                      <Container>
                        <Tooltip align="right" title={hashid}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>

                        <Hash>Hash ID</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        <Content>{hash}
                        </Content>
                        <span className="copyEditContainer">
                          <CopyToClipboard text={hash} onCopy={() => setCopiedText(hash)}>
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
                                  marginLeft: "10px",
                                  marginRight: "5px",
                                }}
                              >
                                <img
                                  className="copy-icon"
                                  src={require("../../../src/assets/images/copy.svg")}
                                />
                              </button>
                            </Tooltip>
                          </CopyToClipboard>
                          {<PrivateNote open={dialogPvtNoteIsOpen} onClose={closeDialogPvtNote} hash={hash} pvtNote={privateNote[0]?.trxLable} />}
                          {<img className="edit-icon" onClick={openDialogPvtNote} src={require("../../../src/assets/images/XDC-Edit.svg")} />}
                        </span>
                      </MiddleContainer>
                    </HashDiv>
                  </Div>

                  <Div__>
                    <Spacing>
                      <Container>
                        <Tooltip title={blocknumber}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>

                        <Hash>Block Number</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        <Content>
                          <a
                            className="linkTableDetails-transaction"
                            href={"/block-details/" + transactions.blockNumber + "?hash=" + transactions.blockHash}
                          >
                            {" "}
                            {transactions.blockNumber}{" "}
                          </a>
                          - {transactions.blockConfirmation} Blocks Confirmation
                        </Content>
                      </MiddleContainer>
                    </Spacing>
                    <Spacing>
                      <Container>
                        <Tooltip title={timestamp}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>

                        <Hash>Timestamp</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        {" "}
                        {moment(transactions.timestamp * 1000).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </MiddleContainer>
                    </Spacing>
                    <SpacingHash>
                      <Container>
                        <Tooltip title={from}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>

                        <Hash>From</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        <Content>
                          {" "}
                          <span style={{ display: "flex" }}>
                            <a
                              className="linkTableDetails-transaction"
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
                                    marginLeft: "10px",
                                    marginRight: "5px",
                                  }}
                                >
                                  <img
                                    className="copy-icon"
                                    src={require("../../../src/assets/images/copy.svg")}
                                  />
                                </button>
                              </Tooltip>
                            </CopyToClipboard>
                            {<PrivateAddressTag open={dialogPvtTagIsOpen} onClose={closeDialogPvtTag} fromAddr={transactions.from} value={dialogValue} hash={hash} />}
                            {isTag ? (<div className="nameLabel">{addressTag[0]?.tagName}</div>) : (<img className="edit1-icon" onClick={openDialogPvtTag} src={require("../../../src/assets/images/XDC-Edit.svg")} />)}
                          </span>
                        </Content>

                      </MiddleContainer>
                    </SpacingHash>
                    <SpacingHash>
                      <Container>
                        <Tooltip title={to}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>

                        <Hash>To</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        <Content>
                          <a
                            className="linkTableDetails-transaction"
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
                                  marginRight: "5px",
                                }}
                              >
                                <img
                                  className="copy-icon"
                                  src={require("../../../src/assets/images/copy.svg")}
                                />
                              </button>
                            </Tooltip>
                          </CopyToClipboard>
                          {<PrivateAddressTag open={dialogPvtTagIsOpen2} onClose={closeDialogPvtTag2} toAddr={transactions.to} value={dialogValue2} hash={hash} />}
                          {isTagTo ? (<div className="nameLabel">{addressTagTo[0]?.tagName}</div>) : (<img className="edit1-icon" onClick={openDialogPvtTag2} src={require("../../../src/assets/images/XDC-Edit.svg")} />)}
                        </Content>
                      </MiddleContainer>
                    </SpacingHash>
                    <Spacing>
                      <Container>
                        <Tooltip title={value}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>
                        <Hash>Value</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        {" "}
                        {!transactions?.value
                          ? 0
                          : transactions?.value / 1000000000000000000}{" "}
                        XDC ({currencySymbol}
                        {valueDiv && valueDiv > 0 ? valueDiv : 0})
                      </MiddleContainer>
                    </Spacing>
                    <Spacing>
                      <Container>
                        <Tooltip title={txnfee}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>

                        <Hash>Txn Fee</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        <Content>
                          {" "}
                          {txfee} XDC ({currencySymbol}
                          {fetchtxn})
                        </Content>
                      </MiddleContainer>
                    </Spacing>
                    <Spacing>
                      <Container>
                        <Tooltip align="right" title={gasprovided}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>
                        <Hash>Gas Provided</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        {transactions.gas}
                        {/* <Content> {transactions.gas}</Content> */}
                      </MiddleContainer>
                    </Spacing>
                    <Spacing>
                      <Container>
                        <Tooltip align="right" title={gasprice}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>
                        <Hash>Gas Price</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        {gasP}
                        {/* <Content> {gasP}</Content> */}
                      </MiddleContainer>
                    </Spacing>
                    <Spacing>
                      <Container>
                        <Tooltip align="right" title={gasused}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>
                        <Hash>Gas Used</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        <Content>{transactions.gasUsed}</Content>
                      </MiddleContainer>
                    </Spacing>
                    <Spacing>
                      <Container>
                        <Tooltip align="right" title={nounced}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>
                        <Hash>Nounce</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        <Content> {transactions.nonce}</Content>
                      </MiddleContainer>
                    </Spacing>
                    <SpacingInputData>
                      <Container>
                        <Tooltip align="right" title={input}>
                          <ImageViewInputData
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>
                        <HashInputData>Input Data</HashInputData>
                      </Container>
                      <MiddleContainerInputData isTextArea={true}>
                        <div className="transaction-details-input-data">
                          <textarea
                            className="text-area-transaction"
                            readOnly
                            value={transactions.input}
                          />
                        </div>
                      </MiddleContainerInputData>
                    </SpacingInputData>
                    <SpacingPrivateNode>
                      <Container>
                        <Tooltip align="right" title={transferToken}>
                          <ImageView
                            src={require("../../../src/assets/images/questionmark.svg")}
                          />
                        </Tooltip>
                        <Hash>Private Note</Hash>
                      </Container>
                      <MiddleContainerPrivateNote>
                        {!isloggedIn ?
                          (<PrivateText>
                            {<LoginDialog open={loginDialogIsOpen} onClose={closeLoginDialog} hash={hash} />}
                            To access the Private Note feature, you must be
                            <a
                              className="linkTableDetails-transaction"
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={openLoginDialog}
                            >
                              Logged In
                            </a>
                          </PrivateText>) : (!isPvtNote ? (<span>Add private Note By click on Edit Icon in front of Hash ID</span>) :
                            (<span>{privateNote[0]?.trxLable}</span>))}
                      </MiddleContainerPrivateNote>
                    </SpacingPrivateNode>
                  </Div__>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>

      <FooterComponent _handleChange={_handleChange} currency={amount} />
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
  font-size: 0.935rem;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  word-break: break-all;
  line-height: 28px;
  display: flex;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    letter-spacing: 0.034rem;
    color: #3a3a3a;
    opacity: 1;
    line-height: 18px !important; 
    word-break: break-all;
  }
  @media (min-width: 768px) and (max-width: 1241px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    letter-spacing: 0.034rem;
    color: #3a3a3a;
    opacity: 1;
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
  float: left;
  padding: 14px;
  overflow-y: auto;
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 110%;
  }
`;
const PrivateText = styled.p`
  display: contents;
  @media (min-width: 0px) and (max-width: 767px) {
    display: contents;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    display: block;
    margin-bottom: -5px;
  }
`;
const Div__ = styled.div`
  height: 56.06rem;
  width: 75.125rem;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 0.563rem;
  padding-left: 2.188rem;
  padding-right: 2.188rem;
  @media (min-width: 0px) and (max-width: 767px) {
    width: 22.563rem;
    height: 61rem;
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 41.5rem;
    height: unset;
  }
`;
const MiddleContainerPrivateNote = styled.div`
  font-family: Inter;
  font-size: 0.938rem;
  letter-spacing: 0.2px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  border-radius: 4px;
  border: solid 1px #9fa9ba;
  height: auto;
  padding: 7px;
  @media (min-width: 0px) and (max-width: 767px) {
    margin-top: 10px;
    font-size: 0.875rem;
    text-align: left;
    letter-spacing: 0.2px;
    opacity: 1;
    word-break: break-all;
    margin-left: unset;
    line-height: 1.5;
    height: auto;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    height: 3.25rem;
    text-align: left;
    letter-spacing: 0.2px;
    opacity: 1;
  }
`;
const MiddleContainerInputData = styled.div`
  font-family: Inter;
  font-size: 0.938rem;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    text-align: left;
    letter-spacing: 0.034rem;
    opacity: 1;
    word-break: break-all;
    margin-left: unset;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    letter-spacing: 0.034rem;
    opacity: 1;
  }
`;

const MiddleContainer = styled.div`
  font-family: Inter;
  font-size: 0.938rem;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    letter-spacing: 0.034rem;
    color: #3a3a3a;
    opacity: 1;
    word-break: break-all;
    height: ${(props) => (props.isTextArea ? `100px` : `unset`)};
    margin-left: unset;
    margin-top: 10px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    letter-spacing: 0.034rem;
    color: #3a3a3a;
    opacity: 1;
  }
`;
const HashInputData = styled.span`
  color: var(--unnamed-color-2a2a2a);
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  padding-bottom: 30px;
  @media (min-width: 0px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    text-align: left;
    letter-spacing: 0.029rem;
    color: #2a2a2a;
    opacity: 1;
    padding-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: left;
    letter-spacing: 0.034rem;
    color: #2a2a2a;
    opacity: 1;
  }
`;

const Hash = styled.span`
  color: var(--unnamed-color-2a2a2a);
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    text-align: left;
    letter-spacing: 0.029rem;
    color: #2a2a2a;
    opacity: 1;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: left;
    letter-spacing: 0.034rem;
    color: #2a2a2a;
    opacity: 1;
  }
`;
const SpacingInputData = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;

  border-bottom: solid 1px #e3e7eb;
  height: 7.75rem;
  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
    height: 8.75rem;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    height: 6.25rem;
  }
`;
const SpacingPrivateNode = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  border-bottom: solid 1px #e3e7eb;
  height: 4.063rem;

  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
    border-bottom: none;
    padding-right: unset;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    padding-right: unset;
  }
`;
const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  border-bottom: solid 1px #e3e7eb;
  height: 4.063rem;

  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
  }
`;
const SpacingHash = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  border-bottom: solid 1px #e3e7eb;
  height: 4.063rem;

  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
    height: auto;
  }
`;
const HashDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 16px 33px;

  @media (max-width: 767px) {
    display: block;
    padding-left: 10px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    padding: 6px 30px;
  }
`;
const Container = styled.div`
  display: flex;

  width: 100%;
  align-items: center;
  max-width: 84px;
`;
const SecondContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
  }
`;

const Div = styled.div`
  height: 4.125rem;
  width: 75.125rem;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 15px;
  padding: 5px;
  @media (min-width: 0px) and (max-width: 767px) {
    width: 22.563rem;
    height: 6.813rem;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 41.5rem;
  }
`;

const Heading = styled.span`
  white-space: nowrap;
  color: #2a2a2a;
  box-shadow: none;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  @media (min-width: 0px) and (max-width: 767px) {
    height: 1rem;
    font-family: Inter;
    font-size: 1rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
    color: #2a2a2a;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    height: 1rem;
    font-family: Inter;
    font-size: 1rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
    color: #2a2a2a;
  }
`;
const ImageViewInputData = styled.img`
  width: 15px;
  margin-right: 15px;
  padding-bottom: 30px;
  @media (min-width: 0px) and (max-width: 767px) {
    width: 11px;
    padding-bottom: 17px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 0.875rem;
  }
`;
const ImageView = styled.img`
  width: 15px;
  margin-right: 15px;
  cursor: pointer;
  @media (min-width: 0px) and (max-width: 767px) {
    width: 0.688rem;
    height: 0.688rem;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 0.875rem;
    height: 0.875rem;
  }
`;
