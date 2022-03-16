import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
// import "tippy.js/dist/tippy.css";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import Tokensearchbar from "../explorer/tokensearchBar";
import { useParams } from "react-router";
import Utils, { dispatchAction } from "../../utility";
import FooterComponent from "../common/footerComponent";
import moment from "moment";
import TokenData from "../../services/token";
import BlockService from "../../services/blocks";
import coinMarketService from "../../services/coinMarket";
import format from "format-number";
import { sessionManager } from "../../managers/sessionManager";
import PrivateAddressTag from "../../modules/common/dialog/privateAddressTag";
import PrivateNote from "../../modules/common/dialog/privateNote";
import { cookiesConstants } from "../../constants";
import LoginDialog from "../explorer/loginDialog";
import { BsCaretRightFill } from "react-icons/bs";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "75.125rem",

    marginRight: "auto",
    // marginTop: "90px",
    marginLeft: "auto",
    marginBottom: "auto",

    width: "100%",

    "@media (min-width: 0px) and (max-width: 767px)": {
      maxWidth: "22.563rem",
      paddingLeft: "7px",
      paddingRight: "7px",
    },
    "@media (min-width: 768px) and (max-width: 1239px)": {
      // marginTop: "130px",
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
  mainContainerDark: {
    width: "100%",
    backgroundColor: "#091b4e"
  },
}));

function TransferTransaction({ _handleChange,theme }) {
  const classes = useStyles();
  function shorten(b, amountL = 25, amountR = 0, stars = 3) {
    return `${b?.slice(0, amountL)} ${".".repeat(stars)} ${b?.slice(
      b.length
    )} `;
  }

  const width = window.innerWidth;

  let decimalValue = 0
  let currentBlock = 0
  let CurrencyValue = window.localStorage.getItem("currency");
  const { address } = useParams();
  const [transactions, setTransactions] = useState(false);
  const [latestBlocks, setLatestBlocks] = useState(0);
  const [coinmarketcap, setCoinmarketcap] = useState([]);
  const [amount, setAmount] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [tokenTransferValue, setTokenTransferValue] = useState(0)
  const [isSeeMore, setSeeMore] = useState(false);
  useEffect(() => {
    transferTransactionDetail();
    getLatestBlocks();
    getcoinMarketCapData()
  }, [amount]);

  const getcoinMarketCapData = async () => {
    let urlPath = `${CurrencyValue}`;
    let [error, coinMarket] = await Utils.parseResponse(
      coinMarketService.getCoinMarketData(urlPath, {})
    );
    if (error || !coinMarket) return;
    setCoinmarketcap(coinMarket[0])
  };

  const getLatestBlocks = async () => {
    let urlPath = "?skip=0&limit=1";
    let [error, latestBlock] = await Utils.parseResponse(
      BlockService.getLatestBlock(urlPath, {})
    );
    if (error || !latestBlock) return;
    setLatestBlocks(latestBlock[0].number);

  };

  const transferTransactionDetail = async () => {
    let urlPath = `/${address}`;
    let [error, transactiondetailusinghash] = await Utils.parseResponse(
      TokenData.getTransferTransactionDetailsUsingHash(urlPath, {})
    );
    if (error || !transactiondetailusinghash) return;
    setTransactions(transactiondetailusinghash);
    setFromAddress(transactiondetailusinghash.from);
    setToAddress(transactiondetailusinghash.to);
    setLoading(false);
    if (transactiondetailusinghash.decimals !== undefined) {
      decimalValue = Math.pow(10, transactiondetailusinghash.decimals)
      setTokenTransferValue(parseInt(parseInt(transactiondetailusinghash.value) / decimalValue))
    }
    currentBlock = transactiondetailusinghash.number
  };

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
  const privatenote = `User can add a private note to the transaction. Private note is being saved in the local storage of the device.`;

  function _handleChange(event) {
    setAmount(event?.target?.value);
    window.localStorage.setItem("currency", event?.target?.value);
  }


  const currencySymbol = CurrencyValue === "INR" ? "₹ " : CurrencyValue === "USD" ? "$ " : "€ ";
  const valueFetch = coinmarketcap.price

  const transactionFetch = CurrencyValue === "INR" ? transactions.transactionFeeINR : CurrencyValue === "USD" ? transactions.transactionFeeUSD : transactions.transactionFeeEUR;

  const fetchtxn = !transactionFetch ? 0 : (transactionFetch / 1000000000000000000).toFixed(12);


  let txfee = !transactions.gasPrice ? 0 : Utils.decimalDivison(transactions.gasPrice, 2);
  txfee = txfee * transactions.gasUsed


  const gasP = !transactions.gasPrice ? 0 : Utils.decimalDivison(transactions.gasPrice, 2);
  const avgTxnFeeConverted =
    CurrencyValue === "INR"
      ? gasP * coinmarketcap.price
      : CurrencyValue === "USD"
      ? gasP * coinmarketcap.price
      : gasP * coinmarketcap.price;
  const avgTxnFeeFetch = !avgTxnFeeConverted
    ? 0
    : parseFloat(avgTxnFeeConverted)?.toFixed(14);
  let avgTxnFeeFetch1 = avgTxnFeeFetch.toString().split(".")[0];
  let avgTxnFeeFetch2 = avgTxnFeeFetch.toString().split(".")[1];


  const valueDiv = !valueFetch ? 0 : Utils.decimalDivison(valueFetch, 2);

  const userInfo = sessionManager.getDataFromCookies("userInfo");
  const [dialogPvtTagIsOpen, setDialogPvtTagIsOpen] = React.useState(false);
  const [dialogValue, setDailogValue] = React.useState(0);
  const [dialogValue2, setDailogValue2] = React.useState(0);
  const [dialogPvtTagIsOpen2, setDialogPvtTagIsOpen2] = React.useState(false);
  const [dialogPvtNoteIsOpen, setDialogPvtNoteIsOpen] = React.useState(false);
  const [loginDialogIsOpen, setLoginDialogIsOpen] = React.useState(false);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [privateNote, setPrivateNote] = useState("");

  const openDialogPvtTag = () => {
    window.scrollTo(0, 0);
    setDialogPvtTagIsOpen(true);
    setDailogValue(1);
  };
  const closeDialogPvtTag = () => {
    setDialogPvtTagIsOpen(false);
    setDailogValue(0);
  };
  const openDialogPvtTag2 = () => {
    window.scrollTo(0, 0);
    setDialogPvtTagIsOpen2(true);
    setDailogValue2(1);
  };
  const closeDialogPvtTag2 = () => {
    setDialogPvtTagIsOpen2(false);
    setDailogValue2(0);
  };
  const openDialogPvtNote = () => setDialogPvtNoteIsOpen(true);
  const closeDialogPvtNote = () => setDialogPvtNoteIsOpen(false);
  const openLoginDialog = () => setLoginDialogIsOpen(true);
  const closeLoginDialog = () => setLoginDialogIsOpen(false);
  const handleSeeMore = () => {
    setSeeMore(true);
  };
  const handleSeeLess = () => {
    setSeeMore(false);
  };

  const privateNoteUsingHash = async () => {
    const data = {
      transactionHash: `${address}`,
      userId: sessionManager.getDataFromCookies("userId"),
    };
    let transactionLabel = localStorage.getItem(
      data.userId + cookiesConstants.USER_TRASACTION_LABELS
    );
    transactionLabel = JSON.parse(transactionLabel);
    if (!transactionLabel || !transactionLabel.length) return;

    const existingTransactionLabel = transactionLabel.find(
      (item) =>
        item.transactionHash == data.transactionHash &&
        item.userId == data.userId
    );
    if (existingTransactionLabel) {
      setPrivateNote(existingTransactionLabel);
    }
  };
  const getListOfTxnLabel = () => {
    privateNoteUsingHash();
  };

  // ---------------------------------------> fetch from/to address tag (local-storage) <------------------------------------//
  var addrTagFrom = fromAddress;
  var addrTagTo = toAddress;

  let taggedAddress = localStorage.getItem(
    sessionManager.getDataFromCookies("userId") +
      cookiesConstants.USER_TAGGED_ADDRESS
  );
  let tags =
    taggedAddress && taggedAddress.length > 0 ? JSON.parse(taggedAddress) : "";
  var tagValueFrom =
    tags && tags.length > 0
      ? tags?.filter(
          (obj) => obj.address === addrTagFrom && obj.userId === userInfo.sub
        )
      : "";
  var tagValueTo =
    tags && tags.length > 0
      ? tags?.filter(
          (obj) => obj.address === addrTagTo && obj.userId === userInfo.sub
        )
      : "";

  // ---------------------------------------> fetch pvt note from (local-storage) <--------------------------------------------//

  var pvtNotehash = `${address}`;
  let pvtNoteLocal = localStorage.getItem(
    cookiesConstants.USER_TRASACTION_LABELS
  );

  let pvtNote =
    pvtNoteLocal && pvtNoteLocal.length > 0 ? JSON.parse(pvtNoteLocal) : "";
  var pvtNoteValue =
    pvtNote && pvtNote.length > 0
      ? pvtNote?.filter(
          (obj) =>
            obj.transactionHash === pvtNotehash && obj.userId === userInfo.sub
        )
      : "";
  

  return (
    <div className={theme.currentTheme === "dark" ? classes.mainContainerDark : classes.mainContainer}>
      <Tokensearchbar theme={theme.currentTheme}/>
      <div className={classes.root}>
        <Grid>
          <div className={isLoading === true ? "cover-spin-2" : ""}>
            <div className={isLoading === true ? "cover-spin" : ""}>
              <Container>
                <Heading theme={theme.currentTheme}>Transaction Details</Heading>
              </Container>

              <Div theme={theme.currentTheme}>
              {transactions ? (
                  transactions.status == true ? (
                    <StatusContainer theme={theme.currentTheme}>
                      <StatusContainerInside>
                        <StatusImgContainer>
                          <StatusImg src="/images/success.svg"></StatusImg>
                        </StatusImgContainer>
                        <StatusTextSuccess>Success</StatusTextSuccess>
                      </StatusContainerInside>
                    </StatusContainer>
                  ) : (
                    <StatusContainer theme={theme.currentTheme}>
                      <StatusImgContainer>
                        <StatusImg src="/images/failed.svg"></StatusImg>
                      </StatusImgContainer>
                      <StatusTextFailed>Failed</StatusTextFailed>
                    </StatusContainer>
                  )
                ) : null}
                <TxnDetailsRightContainer>
                  <TxnDetailsRightTopContainer>
                    <Container>
                      <Tooltip align="right" title={hashid}>
                        <ImageView src={"/images/info.svg"} />
                      </Tooltip>

                      <Hash theme={theme.currentTheme}>Transaction Hash</Hash>
                    </Container>
                    <DetailsMiddleContainer isTextArea={false}>
                      <ContentHash theme={theme.currentTheme}>
                        {address}
                      </ContentHash>
                      <span
                        className={
                          width >= 768
                            ? "copyEditContainer2"
                            : "copyEditContainerMobile"
                        }
                      >
                        <CopyToClipboard
                          text={address}
                          onCopy={() => setCopiedText(address)}
                        >
                          <Tooltip
                            title={
                              copiedText === address
                                ? "Copied"
                                : "Copy To Clipboard"
                            }
                            placement="top"
                          >
                            <button
                              className={
                                width > 1240
                                  ? theme.currentTheme === "dark" ? "copyToClipboardHash table-bg-dark" : "copyToClipboardHash"
                                  : theme.currentTheme === "dark" ? "copyToClipboardHashMobile table-bg-dark" : "copyToClipboardHashMobile"
                              }
                            >
                              <img
                                className={
                                  width > 1240
                                    ? "copy-icon"
                                    : width < 768
                                    ? "copyIconHashMobile"
                                    : "copyIconHash"
                                }
                                src={"/images/copy-grey.svg"}
                              />
                            </button>
                          </Tooltip>
                        </CopyToClipboard>
                      </span>
                    </DetailsMiddleContainer>
                  </TxnDetailsRightTopContainer>
                  <TxnDetailsRightBottomContainer>
                    <DetailsContainer>
                      <Container>
                        <Tooltip title={value}>
                          <ImageView src={"/images/info.svg"} />
                        </Tooltip>
                        <Hash theme={theme.currentTheme}>Transaction Value</Hash>
                      </Container>
                      <Tooltip title={transactions?.value}>
                        <DetailsMiddleContainer isTextArea={false} theme={theme.currentTheme}>
                          {!transactions?.transactionValue
                            ? 0
                            : Utils.decimalDivison(transactions?.transactionValue, 2)}{" "}
                            XDC ({currencySymbol}
                          {coinmarketcap && coinmarketcap?.price > 0 ? Utils.decimalDivison(coinmarketcap.price * transactions?.transactionValue, 2) : 0})
                        </DetailsMiddleContainer>
                      </Tooltip>
                    </DetailsContainer>
                    {/* <Spacing>
                  <Container>
                    <Tooltip title={value} style={{ cursor: "pointer" }}>
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>
                    <Hash>Value</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    {!transactions?.transactionValue
                      ? 0
                      : Utils.decimalDivison(transactions?.transactionValue, 2)}{" "}
                    XDC ({currencySymbol}
                    {coinmarketcap && coinmarketcap?.price > 0 ? Utils.decimalDivison(coinmarketcap.price * transactions?.transactionValue, 2) : 0})
                  </MiddleContainer>
                </Spacing> */}
                    {/* ------------------------------------------------time stamp------------------------------------- */}
                    <DetailsContainer className="mobileTimeStamp">
                      <Container>
                        <Tooltip title={timestamp}>
                          <ImageView src={"/images/info.svg"} />
                        </Tooltip>

                        <Hash theme={theme.currentTheme}>Transaction Timestamp</Hash>
                      </Container>
                      <DetailsMiddleContainer isTextArea={false} theme={theme.currentTheme}>
                        {/* {`${
                          (transactions?.timestamp &&
                            moment(transactions.timestamp * 1000)
                              .tz(timezone)
                              .format("MMM DD, YYYY, hh:mm A")) ||
                          ""
                        } ${
                          (timezone && Utility.getUtcOffset(timezone)) || ""
                        }`} */}
                        {transactions.timestamp &&
                      !isNaN(Number(transactions.timestamp))
                      ? moment(Number(transactions.timestamp) * 1000).utc().format(
                        "MMMM Do YYYY, h:mm:ss A"
                      ) + "  UTC"
                      : ""}
                        {/*============================================================================({getHoursAgo(transactions.timestamp * 1000)})==================================*/}
                      </DetailsMiddleContainer>
                    </DetailsContainer>
                    {/* <Spacing>
                  <Container>
                    <Tooltip title={timestamp}>
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>

                    <Hash>Timestamp</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    {transactions.timestamp &&
                      !isNaN(Number(transactions.timestamp))
                      ? moment(Number(transactions.timestamp) * 1000).utc().format(
                        "MMMM Do YYYY, h:mm:ss A"
                      ) + "  UTC"
                      : ""}
                  </MiddleContainer>
                </Spacing> */}
                    {/* ------------------------------------------------------block-------------------------------  */}
                    <DetailsContainer>
                      <Container>
                        <Tooltip title={blocknumber}>
                          <ImageView src={"/images/info.svg"} />
                        </Tooltip>

                        <Hash theme={theme.currentTheme}>Block Number</Hash>
                      </Container>
                      <DetailsMiddleContainer isTextArea={false}>
                        <Content>
                          <a
                            className={theme.currentTheme === "dark" ? "linkTableDetails-transaction fc-4878ff" : "linkTableDetails-transaction"}
                            href={"/block-details/" + transactions.blockNumber}
                          >
                            {" "}
                            {transactions.blockNumber
                              ? transactions.blockNumber
                              : ""}
                          </a>
                          &nbsp;{" "}
                          <BlockConfirmation theme={theme.currentTheme}>
                          {latestBlocks && latestBlocks > 0 ? latestBlocks - parseInt(transactions?.blockNumber) : 0} Blocks Confirmation
                          </BlockConfirmation>
                        </Content>
                      </DetailsMiddleContainer>
                    </DetailsContainer>
                    {/* <Spacing>
                  <Container>
                    <Tooltip title={blocknumber}>
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>

                    <Hash>Block Number</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content>
                      <a
                        className="linkTableDetails"
                        href={"/block-details/" + transactions.blockNumber}
                      >
                        {transactions.blockNumber}
                      </a>
                      - {latestBlocks && latestBlocks > 0 ? latestBlocks - parseInt(transactions?.blockNumber) : 0}  Blocks Confirmation
                    </Content>
                  </MiddleContainer>
                </Spacing> */}
                  </TxnDetailsRightBottomContainer>
                </TxnDetailsRightContainer>

              </Div>




              <DivMiddleContainer>
                {/* -----------------------------------------------from---------------------------- */}
                {/* <Spacing>
                  <Container>
                    <Tooltip title={from}>
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>

                    <Hash>From</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content>
                      <a
                        className="linkTableDetails"
                        href={"/address-details/" + transactions.from}
                      >
                        {transactions.from}
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
                            }}
                          >
                            <ImgView src={"/images/copy.svg"} />
                          </button>
                        </Tooltip>
                      </CopyToClipboard>
                    </Content>
                  </MiddleContainer>
                </Spacing> */}
                <DivMiddle theme={theme.currentTheme}>
                  <Container>
                    <Tooltip title={from}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>

                    <Hash theme={theme.currentTheme}>From</Hash>
                  </Container>
                  <DetailsMiddleContainer isTextArea={false}>
                    <Content>
                      {" "}
                      <div style={{ display: width >= 768 ? "flex" : "block" }}>
                        <a
                          className={theme.currentTheme === "dark" ? "linkTableDetails-transaction fc-4878ff" : "linkTableDetails-transaction"}
                          href={"/address-details/" + transactions.from}
                        >
                          {transactions.from}
                        </a>
                        <div
                          className={
                            width < 768
                              ? "fromContainerMobile"
                              : "fromContainer"
                          }
                        >
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
                                className={
                                  width > 1240
                                  ? theme.currentTheme === "dark" ? "copyToClipboardHash table-bg-dark" : "copyToClipboardHash"
                                  : theme.currentTheme === "dark" ? "copyToClipboardHashMobile table-bg-dark" : "copyToClipboardHashMobile"
                                }
                              >
                                <img
                                  className={
                                    width > 1240
                                      ? "copy-icon"
                                      : width < 768
                                      ? "copy-icon-from"
                                      : "copy-icon-from-tab"
                                  }
                                  src={"/images/copy-grey.svg"}
                                />
                              </button>
                            </Tooltip>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </Content>
                    <TabTag>
                      {width >= 768 && width <= 1240 ? (
                        userInfo ? (
                          <>
                            {
                              <PrivateAddressTag
                                open={dialogPvtTagIsOpen}
                                onClose={closeDialogPvtTag}
                                fromAddr={transactions.from}
                                value={dialogValue}
                                hash={address}
                              />
                            }

                            {tagValueFrom && tagValueFrom?.length > 0 ? (
                              <Tag>
                                {
                                  tagValueFrom[tagValueFrom?.length - 1]
                                    ?.tagName
                                }
                              </Tag>
                            ) : (
                              <Tooltip
                                title="Add a new Address Tag"
                                placement="top"
                              >
                                <AddTagContainer onClick={openDialogPvtTag}>
                                  <ImgAddTag>
                                    <img src="/images/add-tag-white.svg" />
                                  </ImgAddTag>
                                  <AddTagtext>Add Tag</AddTagtext>
                                </AddTagContainer>
                              </Tooltip>
                            )}
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </TabTag>
                  </DetailsMiddleContainer>
                  <MobileDesktopTag>
                    {width < 768 || width > 1240 ? (
                      userInfo ? (
                        <>
                          {
                            <PrivateAddressTag
                              open={dialogPvtTagIsOpen}
                              onClose={closeDialogPvtTag}
                              fromAddr={transactions.from}
                              value={dialogValue}
                              hash={address}
                            />
                          }

                          {tagValueFrom && tagValueFrom?.length ? (
                            <Tag>
                              {tagValueFrom[tagValueFrom?.length - 1]?.tagName}
                            </Tag>
                          ) : (
                            <Tooltip
                              title="Add a new Address Tag"
                              placement="top"
                            >
                              <AddTagContainer onClick={openDialogPvtTag}>
                                <ImgAddTag>
                                  <img src="/images/add-tag-white.svg" />
                                </ImgAddTag>
                                <AddTagtext>Add Tag</AddTagtext>
                              </AddTagContainer>
                            </Tooltip>
                          )}
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </MobileDesktopTag>
                </DivMiddle>
                <DivCircle>
                  <ImgNextArrow>
                    <img src="/images/next-arrow.svg" />
                  </ImgNextArrow>
                </DivCircle>
                {/* --------------------------------------------------------------------to--------------------- */}
                <DivMiddle theme={theme.currentTheme}>
                {/* <Spacing>
                  <Container>
                    <Tooltip title={to}>
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>

                    <Hash>To</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content>
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
                            }}
                          >
                            <ImgView src={"/images/copy.svg"} />
                          </button>
                        </Tooltip>
                      </CopyToClipboard>
                    </Content>
                  </MiddleContainer>
                </Spacing> */}
                  <Container>
                    <Tooltip title={to}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>

                    <Hash theme={theme.currentTheme}>To</Hash>
                  </Container>
                  <DetailsMiddleContainer isTextArea={false}>
                    <Content>
                      <span
                        style={{ display: width >= 768 ? "flex" : "block" }}
                      >
                        <a
                          className={theme.currentTheme === "dark" ? "linkTableDetails-transaction fc-4878ff" : "linkTableDetails-transaction"}
                          href={"/address-details/" + transactions.to}
                        >
                          {transactions.to
                            ? transactions.to
                            : transactions.contractAddress}
                        </a>
                        <div
                          className={
                            width < 768
                              ? "fromContainerMobile"
                              : "fromContainer"
                          }
                        >
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
                                className={
                                  width > 1240
                                  ? theme.currentTheme === "dark" ? "copyToClipboardHash table-bg-dark" : "copyToClipboardHash"
                                  : theme.currentTheme === "dark" ? "copyToClipboardFromMobile table-bg-dark" : "copyToClipboardFromMobile"
                                }
                              >
                                <img
                                  className={
                                    width > 1240
                                      ? "copy-icon"
                                      : width < 768
                                      ? "copy-icon-from"
                                      : "copy-icon-from-tab"
                                  }
                                  src={"/images/copy-grey.svg"}
                                />
                              </button>
                            </Tooltip>
                          </CopyToClipboard>
                        </div>
                      </span>
                    </Content>
                    <TabTag>
                      {width >= 768 && width <= 1240 ? (
                        userInfo ? (
                          <>
                            {
                              <PrivateAddressTag
                                open={dialogPvtTagIsOpen2}
                                onClose={closeDialogPvtTag2}
                                toAddr={transactions.to}
                                value={dialogValue2}
                                hash={address}
                              />
                            }
                            {tagValueTo && tagValueTo?.length ? (
                              <Tag>
                                {tagValueTo[tagValueTo?.length - 1]?.tagName}
                              </Tag>
                            ) : (
                              <Tooltip
                                title="Add a new Address Tag"
                                placement="top"
                              >
                                <AddTagContainer onClick={openDialogPvtTag2}>
                                  <ImgAddTag>
                                    <img src="/images/add-tag-white.svg" />
                                  </ImgAddTag>
                                  <AddTagtext>Add Tag</AddTagtext>
                                </AddTagContainer>
                              </Tooltip>
                            )}
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </TabTag>
                  </DetailsMiddleContainer>
                  <MobileDesktopTag>
                    {width < 768 || width > 1240 ? (
                      userInfo ? (
                        <>
                          {
                            <PrivateAddressTag
                              open={dialogPvtTagIsOpen2}
                              onClose={closeDialogPvtTag2}
                              toAddr={transactions.to}
                              value={dialogValue2}
                              hash={address}
                            />
                          }
                          {tagValueTo && tagValueTo?.length ? (
                            <Tag>
                              {tagValueTo[tagValueTo?.length - 1]?.tagName}
                            </Tag>
                          ) : (
                            <Tooltip
                              title="Add a new Address Tag"
                              placement="top"
                            >
                              <AddTagContainer onClick={openDialogPvtTag2}>
                                <ImgAddTag>
                                  <img src="/images/add-tag-white.svg" />
                                </ImgAddTag>
                                <AddTagtext>Add Tag</AddTagtext>
                              </AddTagContainer>
                            </Tooltip>
                          )}
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </MobileDesktopTag>
                </DivMiddle>
              </DivMiddleContainer>

              <Div__>
              <Spacing>
                  <Container>
                    <Tooltip align="right" title={gasprovided}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>
                    <Hash>Token Transferred</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <TokenTransferredMiddleContainer>
                      <TokenTransferredContent>
                    <BlackText>XRC-721</BlackText>
                    <GreyText>Token ID</GreyText>
                    <GreyText>[</GreyText>
                    <BlueText>1256</BlueText>
                    <GreyText>]</GreyText>
                    <BlueText>CunningFox.. (CFX)</BlueText>
                    </TokenTransferredContent>
                    <ImgProfileIcon src="/images/xyz.svg" />
                    </TokenTransferredMiddleContainer>
                  </MiddleContainer>
                </Spacing>
                <SpacingTxnAction>
                  <ContainerTxnAction>
                    <Tooltip align="right" title={gasprovided}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>
                    <Hash>Txn Action</Hash>
                  </ContainerTxnAction>
                  <MiddleContainer isTextArea={false}>
                  <MainContainerTxnAction>
                    <TxnActionNextRow>
                      <div className="arrow_right_grey">
                        <BsCaretRightFill size={10}/>
                      </div>
                      <GreyText>Sale:</GreyText>
                      <BlackText>1 NFT</BlackText>
                      <GreyText>For</GreyText>
                      <BlackText>2500.00 XDC</BlackText>
                      <ImgNextRed src="/images/xyz.svg" />
                      <BlackText>FleekApp</BlackText>
                    </TxnActionNextRow>
                    <TxnActionNextRow>
                      <Gap1 />
                      <div className="arrow_right_grey">
                        <BsCaretRightFill size={10}/>
                      </div>
                      <BlackText>Transfer of</BlackText>
                      <BlueText>CunningFox.. (CFX)</BlueText>
                      <GreyText>from</GreyText>
                      <BlueText>xdcc4e69958…5b9c</BlueText>
                      <GreyText>to</GreyText>
                      <BlueText>xdcc4e69958…9e9a</BlueText>
                    </TxnActionNextRow>
                    <TxnActionNextRow>
                      <Gap2 />
                      <div className="arrow_right_grey">
                        <BsCaretRightFill size={10}/>
                      </div>
                      <BlackText>1 of</BlackText>
                      <GreyText>Token ID</GreyText>
                      <GreyText>[</GreyText>
                      <BlueText>1256</BlueText>
                      <GreyText>]</GreyText>
                    </TxnActionNextRow>  
                  </MainContainerTxnAction>
                  </MiddleContainer>
                </SpacingTxnAction>
                <SpacingInteractedWith>
                  <ContainerInteractedWith>
                    <Tooltip align="right" title={gasprovided}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>
                    <Hash>Interacted With (To)</Hash>
                  </ContainerInteractedWith>
                  <MiddleContainer isTextArea={false}>
                  <MainContainerInteractedWith>
                    <ContentInteractedWith>
                      <div>Contract</div>
                      &nbsp;
                      <span><a className="linkTableDetails-transaction" href={"/address/" + transactions?.contract}>
                      {transactions?.contract}
                      </a></span>
                      &nbsp;&nbsp;
                      (<div>FleekApp</div>)
                      <ImgInteracted src="/images/success.svg" />
                      <ImgCopyGrey src="/images/copy-grey.svg" />
                    </ContentInteractedWith>
                    <InteractedWithNextRow>
                      <ImgNewLine src="/images/xyz.svg" />
                      <GreyText>TRANSFER</GreyText>
                      <BlackText>0.000000006 XDC</BlackText>
                      <GreyText>From</GreyText>
                      <BlueText>Fleek: NFT App</BlueText>
                      <GreyText>to</GreyText>
                      <BlackText>Fleek:</BlackText>
                      <BlueText>NFT App</BlueText>
                    </InteractedWithNextRow>
                    <InteractedWithNextRow>
                      <ImgNewLine src="/images/xyz.svg" />
                      <GreyText>TRANSFER</GreyText>
                      <BlackText>0.000000006 XDC</BlackText>
                      <GreyText>From</GreyText>
                      <BlueText>Fleek: NFT App</BlueText>
                      <GreyText>to</GreyText>
                      <BlueText>xdcc4e6995811141…eb9a</BlueText>
                    </InteractedWithNextRow>
                    </MainContainerInteractedWith>
                  </MiddleContainer>
                </SpacingInteractedWith>
                {/* -------------------------------------------------------------txn fee----------------------- */}
                {/* <Spacing>
                  <Container>
                    <Tooltip title={txnfee} style={{ cursor: "pointer" }}>
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>

                    <Hash>Txn Fee</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content>
                      {txfee && txfee > 0 ? txfee : 0}  XDC ({currencySymbol}
                      {txfee && txfee > 0 ? Utils.decimalDivison(coinmarketcap.price * txfee, 2) : 0}
                      )
                    </Content>
                  </MiddleContainer>
                </Spacing> */}
                <Spacing>
                  <Container>
                    <Tooltip title={txnfee}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>

                    <Hash theme={theme.currentTheme}>Transaction Fee</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content theme={theme.currentTheme}>
                      {/* {" "}
                      {txnFee2 == 0 ? (
                        <span>{txnFee1}</span>
                      ) : (
                        <span>
                          {txnFee1}
                          {"."}
                          <span style={{ color: "#9FA9BA" }}>{txnFee2}</span>
                        </span>
                      )}
                      &nbsp;XDC ({currencySymbol}
                      {fetchtxn2 == null ? (
                        <span>{fetchtxn1}</span>
                      ) : (
                        <span>
                          {fetchtxn1}
                          {"."}
                          <span style={{ color: "#9FA9BA" }}>{fetchtxn2}</span>
                        </span>
                      )}
                      ) */}
                      {txfee && txfee > 0 ? txfee : 0}  XDC ({currencySymbol}
                      {txfee && txfee > 0 ? Utils.decimalDivison(coinmarketcap.price * txfee, 2) : 0}
                      )
                    </Content>
                  </MiddleContainer>
                </Spacing>
                {/* --------------------------------gas provided-------------------------------- */}
                {/* <Spacing>
                  <Container>
                    <Tooltip
                      align="right"
                      title={gasprovided}
                      style={{ cursor: "pointer" }}
                    >
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>
                    <Hash>Gas Provided</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    {transactions.gas}
                  </MiddleContainer>
                </Spacing> */}
                <Spacing>
                  <Container>
                    <Tooltip align="right" title={gasprovided}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>
                    <Hash theme={theme.currentTheme}>Gas Provided</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false} theme={theme.currentTheme}>
                    {format({})(transactions.gas)}
                  </MiddleContainer>
                </Spacing>
                {/* ---------------------------------------avg txn fee --------------------- */}
                {/* <Spacing>
                  <Container>
                    <Tooltip
                      align="right"
                      title={gasprice}
                      style={{ cursor: "pointer" }}
                    >
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>
                    <Hash>Gas Price</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    {gasP}
                  </MiddleContainer>
                </Spacing> */}
                <Spacing>
                  <Container>
                    <Tooltip align="right" title={gasprice}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>
                    <Hash theme={theme.currentTheme}>Avg Transaction Fee</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content theme={theme.currentTheme}>
                    {/* {gasPrice2 == 0 ? (
                      <span>{gasPrice1}</span>
                    ) : (
                      <span>
                        {gasPrice1}
                        {"."}
                        <span style={{ color: "#9FA9BA" }}>{gasPrice2}</span>
                      </span>
                    )} */}
                    {gasP}&nbsp;XDC ({currencySymbol}
                      {avgTxnFeeFetch2 == null ? (
                        <span>{avgTxnFeeFetch1}</span>
                      ) : (
                        <span>
                          {avgTxnFeeFetch1}
                          {"."}
                          <span style={{ color: "#9FA9BA" }}>{avgTxnFeeFetch2}</span>
                        </span>
                      )}
                      )
                      </Content>
                  </MiddleContainer>
                </Spacing>
                {/* --------------------------------------------gas used--------------------------- */}
                {/* <Spacing>
                  <Container>
                    <Tooltip
                      align="right"
                      title={gasused}
                      style={{ cursor: "pointer" }}
                    >
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>
                    <Hash>Gas Used</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content>{transactions.gasUsed}</Content>
                  </MiddleContainer>
                </Spacing> */}
                <Spacing>
                  <Container>
                    <Tooltip align="right" title={gasused}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>
                    <Hash theme={theme.currentTheme}>Gas Used</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content theme={theme.currentTheme}>{format({})(transactions?.gasUsed)}</Content>
                  </MiddleContainer>
                </Spacing>

                {/* --------------------------------------------see more------------------------------------ */}
                {!isSeeMore ? (
                  <Spacing>
                    <SeeMoreContainer onClick={handleSeeMore}>
                      <SeeMoreText>See more</SeeMoreText>
                      <ImgSeeMore src="/images/see-more.svg"></ImgSeeMore>
                    </SeeMoreContainer>
                  </Spacing>
                ) : (
                  <>
                  {/* <Spacing>
                    <Container>
                      <Tooltip title={transferToken}>
                        <ImageView src={"/images/info.svg"} />
                      </Tooltip>
                    <Hash theme={theme.currentTheme}> Interacted With (To)</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <ContentInteractedWith>
                      <div className={theme.currentTheme === "dark" ? "fc-b1c3e1" : ""}>Contract</div>
                      &nbsp;
                      <span>(<a className={theme.currentTheme === "dark" ? "linkTableDetails-transaction fc-4878ff" : "linkTableDetails-transaction"} href={"/address/" + transactions?.contract}>
                        {transactions?.contract}
                      </a>)</span>
                    </ContentInteractedWith>
                  </MiddleContainer>
                  </Spacing>
                  <Spacing>
                  <Container>
                    <Tooltip title={transferToken}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>            
                    <Hash theme={theme.currentTheme}> Token Transfer</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content theme={theme.currentTheme}>
                      {tokenTransferValue}

                    </Content>
                  </MiddleContainer>
                </Spacing> */}
                    <Spacing>
                      <Container>
                        <Tooltip align="right" title={nounced}>
                          <ImageView src={"/images/info.svg"} />
                        </Tooltip>
                        <Hash theme={theme.currentTheme}>Nonce</Hash>
                      </Container>
                      <MiddleContainer isTextArea={false}>
                        <Content theme={theme.currentTheme}> {transactions.nonce}</Content>
                      </MiddleContainer>
                    </Spacing>
                    <SpacingInputData>
                      <Container>
                        <Tooltip align="right" title={input}>
                          <ImageViewInputData src={"/images/info.svg"} />
                        </Tooltip>
                        <HashInputData theme={theme.currentTheme}>Input Data</HashInputData>
                      </Container>
                      <MiddleContainerInputData isTextArea={true} theme={theme.currentTheme}>
                        <div className={theme.currentTheme === "dark" ? "bg-transparent-dark" : "transaction-details-input-data"}>
                          <textarea
                            className={theme.currentTheme === "dark" ? "text-area-transaction-details-dark" : "text-area-transaction"}
                            readOnly
                            value={transactions.input}
                          />
                        </div>
                      </MiddleContainerInputData>
                    </SpacingInputData>
                    <Spacing>
                      <SeeMoreContainer onClick={handleSeeLess}>
                        <SeeMoreText>See Less</SeeMoreText>
                        <ImgSeeLess src="/images/see-more.svg"></ImgSeeLess>
                      </SeeMoreContainer>
                    </Spacing>
                  </>
                )}
                <SpacingPrivateNode>
                  <Container>
                    <Tooltip align="right" title={privatenote}>
                      <ImageView src={"/images/info.svg"} />
                    </Tooltip>
                    <Hash theme={theme.currentTheme}>Private Note</Hash>
                  </Container>
                  <MiddleContainerPrivateNote>
                    {!userInfo ? (
                      <PrivateText theme={theme.currentTheme}>
                        {
                          <LoginDialog
                            open={loginDialogIsOpen}
                            onClose={closeLoginDialog}
                            dataHashOrAddress={address}
                          />
                        }
                        To access the private note feature, you must be
                        <a
                          className={ theme.currentTheme === "dark" ? "linkTableDetails-transaction fc-4878ff" : "linkTableDetails-transaction"}
                          style={{ marginLeft: "5px", cursor: "pointer" }}
                          onClick={openLoginDialog}
                        >
                          Logged In
                        </a>
                      </PrivateText>
                    ) : privateNote ? (
                      <span>{privateNote?.trxLable}</span>
                    ) : (
                      <AddLabel>
                        <AddLabelText>
                          Add private note by clicking on this icon
                        </AddLabelText>
                        {
                          <PrivateNote
                            open={dialogPvtNoteIsOpen}
                            getListOfTxnLabel={getListOfTxnLabel}
                            getTotalCountTxnLabel={() => {}}
                            onClose={closeDialogPvtNote}
                            hash={address}
                            pvtNote={
                              pvtNoteValue[pvtNoteValue?.length - 1]?.trxLable
                            }
                          />
                        }
                        {
                          <Tooltip
                            title="Add Transaction Label"
                            placement="top"
                          >
                            <img
                              className={
                                width > 1240 ? "edit-icon1" : "editIconHash"
                              }
                              onClick={openDialogPvtNote}
                              src={require("../../../src/assets/images/label.svg")}
                            />
                          </Tooltip>
                        }
                      </AddLabel>
                    )}
                  </MiddleContainerPrivateNote>
                </SpacingPrivateNode>
              </Div__>
              <br />
              <br />
            </div>
          </div>
        </Grid>
      </div>

      <FooterComponent _handleChange={_handleChange} currency={amount} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { theme: state.theme };
};
export default connect(mapStateToProps, { dispatchAction })(TransferTransaction);

const Input = styled.input`
  border-radius: 5px;
  border: solid 1px #e3e7eb;
  background-color: #fff;
  font-family: Inter;
  font-size: 14px;

  text-align: left;
  color: #2a2a2a;
`;
const Content = styled.div`
  font-family: Inter;
  font-size: 0.935rem;

  text-align: left;
  color: #3a3a3a;
  line-height: 22px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;

    color: #3a3a3a;
    opacity: 1;
    line-height: 18px !important;
    word-break: break-all;
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
  }
  @media (min-width: 768px) and (max-width: 1241px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;

    color: #3a3a3a;
    opacity: 1;
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
  }
`;
const ContentHash = styled.div`
  font-family: Inter;
  font-size: 0.935rem;

  text-align: left;
  color: #3a3a3a;
  line-height: 22px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;

    color: #2a2a2a;
    opacity: 1;
    line-height: 18px !important;
    word-break: break-all;
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
  }
  @media (min-width: 768px) and (max-width: 1241px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;

    color: #3a3a3a;
    opacity: 1;
    width: 33rem;
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
  }
`;
// const ContentInteractedWith = styled.div`
//   font-family: Inter;
//   font-size: 0.935rem;

//   text-align: left;
//   color: #3a3a3a;
//   line-height: 22px;
//   display: flex;
//   align-items: center;
//   @media (min-width: 0px) and (max-width: 767px) {
//     font-size: 0.875rem;
//     text-align: left;
//     color: #3a3a3a;
//     opacity: 1;
//     line-height: 7px !important;
//     flex-direction: column;
//     align-items: flex-start;
//     padding-right: 10px;
//     padding-top: 5px;
//   }
//   @media (min-width: 768px) and (max-width: 1241px) {
//     font-size: 0.875rem;
//     word-break: break-all;
//     text-align: left;

//     color: #3a3a3a;
//     opacity: 1;
//   }
// `;
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
  ${({ theme }) => theme === "dark" && `
    color: #fff !important;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    display: contents;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    display: block;
    margin-bottom: -5px;
  }
`;
const Div__ = styled.div`
  width: 75.125rem;
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 0.563rem;
  padding-left: 27px;
  padding-right: 25px;
  margin-top: 35px;
  ${({ theme }) => theme === "dark" && `
    background-color: #192a59;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    max-width: 22.563rem;
    width: 100%;
    // height: 61rem;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 35px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 41.5rem;
    height: unset;
    margin-bottom: 54px;
  }
`;
const MiddleContainerPrivateNote = styled.div`
  font-family: Inter;
  font-size: 0.938rem;

  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  border-radius: 4px;
  border: solid 1px #9fa9ba;
  height: auto;
  padding: 1px 9px 1px 18px;
  @media (min-width: 0px) and (max-width: 767px) {
    margin-top: 10px;
    font-size: 0.875rem;
    text-align: left;

    opacity: 1;
    word-break: break-all;
    margin-left: unset;
    line-height: 1.5;
    height: auto;
    padding: 1px 6px 1px 6px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    text-align: left;

    opacity: 1;
    margin-left: 100px;
  }
`;
const MiddleContainerInputData = styled.div`
  font-family: Inter;
  font-size: 0.938rem;

  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  ${({ theme }) => theme === "dark" && `
    border: none;
    background-color: #9fa9ba;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    text-align: left;

    opacity: 1;
    word-break: break-all;
    margin-left: unset;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;

    opacity: 1;
    margin-left: 100px;
  }
`;

const MiddleContainer = styled.div`
  font-family: Inter;
  font-size: 0.938rem;

  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;

    color: #3a3a3a;
    opacity: 1;
    word-break: break-all;
    height: ${(props) => (props.isTextArea ? `100px` : `unset`)};
    margin-left: unset;
    margin-top: 10px;
    padding-left: 5px;
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;

    color: #3a3a3a;
    opacity: 1;
    margin-left: 100px;
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
  }
`;

const MiddleContainer1 = styled.div`
  font-family: Inter;
  font-size: 0.938rem;

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

    color: #3a3a3a;
    opacity: 1;
    word-break: break-all;
    height: ${(props) => (props.isTextArea ? `100px` : `unset`)};
    margin-left: unset;
    margin-top: 10px;
    display: block;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    // word-break: break-all;
    // text-align: left;
    //
    // color: #3a3a3a;
    // opacity: 1;
    // display: block;
    margin-left: 64px;
  }
`;

const HashInputData = styled.span`
  color: var(--unnamed-color-2a2a2a);
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 15px;

  color: #2a2a2a;
  padding-bottom: 30px;
  ${({ theme }) => theme === "dark" && `
    color: #fff;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    text-align: left;

    color: #2a2a2a;
    opacity: 1;
    padding-bottom: 20px;
    ${({ theme }) => theme === "dark" && `
      color: #fff;
    `}
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: left;

    color: #2a2a2a;
    opacity: 1;
    ${({ theme }) => theme === "dark" && `
      color: #fff;
    `}
  }
`;

const Hash = styled.span`
  white-space: nowrap;
  font-family: Inter;
  font-weight: 600;
  font-size: 15px;

  color: #252525;
  ${({ theme }) => theme === "dark" && `
    color: #fff;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    text-align: left;

    color: #252525;
    opacity: 1;
    ${({ theme }) => theme === "dark" && `
      color: #fff;
    `}
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: left;

    color: #2a2a2a;
    opacity: 1;
    ${({ theme }) => theme === "dark" && `
      color: #fff;
    `}
  }
`;
const SpacingInputData = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  border-bottom: solid 1px #e3e7eb;
  padding: 13px 0 8px 0;
  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    // height: 6.25rem;
  }
`;
const SpacingPrivateNode = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  // border-bottom: solid 1px #e3e7eb;
  padding: 15px 0 6px 0;

  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
    border-bottom: none;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
  }
`;
const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  border-bottom: solid 1px #e3e7eb;
  height: 4.063rem;

  @media (max-width: 767px) {
    display: block;
    height: auto;
    padding: 12px 0 17px 0;
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
    // padding-right: 85px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    padding: 14px 30px;
  }
`;
const Container = styled.div`
  display: flex;

  width: 100%;
  align-items: center;
  max-width: 165px;
`;
const SecondContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
  }
`;

const Div = styled.div`
  display: flex;
  width: 75.125rem;
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 15px;
  ${({ theme }) => theme === "dark" && `
    background-color: #192a59;
  `}
  // @media (min-width: 0px) and (max-width: 767px) {
  //   width: 22.563rem;
  //   height: 6.813rem;
  // }
  @media (min-width: 0px) and (max-width: 1240px) {
    max-width: 41.5rem;
    width: 100%;
    display: block;
  }
`;
const DivMiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  margin-bottom: 36px;
   @media (min-width: 0px) and (max-width: 767px) {
    margin-top: 25px;
    margin-bottom: 25px;
  }
  @media (min-width: 0px) and (max-width: 1240px) {
    display: block;
  }
`;
const DivMiddle = styled.div`
  max-width: 35.625rem;
  width: 100%;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  // margin-bottom: 15px;
  ${({ theme }) => theme === "dark" && `
    background-color: #192a59;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    padding: 10px;
  }
  @media (min-width: 0px) and (max-width: 1240px) {
    max-width: 41.5rem;
    width: 100%;
  }
`;

const Heading = styled.span`
  white-space: nowrap;
  color: #2a2a2a;
  box-shadow: none;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 46px;
  margin-bottom: 12px;
  ${({ theme }) => theme === "dark" && `
    color: #fff;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-family: Inter;
    font-size: 14px;
    text-align: left;
    color: #252525;
    margin-top: 12px;
    margin-bottom: 17px;
    ${({ theme }) => theme === "dark" && `
      color: #fff;
    `}
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-family: Inter;
    font-size: 18px;
    text-align: left;
    color: #2a2a2a;
    margin-top: 19px;
    margin-bottom: 28px;
    ${({ theme }) => theme === "dark" && `
      color: #fff;
    `}
  }
`;
const ImageViewInputData = styled.img`
  width: 22px;
  margin-right: 15px;
  padding-bottom: 30px;
  @media (min-width: 0px) and (max-width: 767px) {
    width: 22px;
    padding-bottom: 17px;
    margin-left: -4px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 22px;
  }
`;
const ImageView = styled.img`
  width: 22px;
  margin-right: 15px;
  cursor: pointer;
  // @media (min-width: 0px) and (max-width: 767px) {

  // }
  // @media (min-width: 768px) and (max-width: 1240px) {
  //   width: 0.875rem;
  //   height: 0.875rem;
  // }
`;
const StatusContainer = styled.div`
  max-width: 10.75rem;
  width: 100%;
  border-right: 1px solid #e3e7eb;
  ${({ theme }) => theme === "dark" && `
    border-right: 1px solid #4a5d94;
  `}
  // @media (min-width: 0px) and (max-width: 767px) {
  //   width: 14px;
  //   height: 14px;
  // }
  @media (min-width: 0px) and (max-width: 1240px) {
    max-width: 41.5rem;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e3e7eb;
    padding-bottom: 30px;
    ${({ theme }) => theme === "dark" && `
      border-right: 1px solid #4a5d94;
    `}
  }
`;
const StatusImgContainer = styled.div`
  width: 58px;
  margin: 44px auto 10px auto;
  // @media (min-width: 0px) and (max-width: 767px) {

  // }
  @media (min-width: 0px) and (max-width: 1240px) {
    margin: 21px auto 10px auto;
  }
`;
const StatusContainerInside = styled.div`
  width: 100px;
  margin: auto;
  // @media (min-width: 0px) and (max-width: 767px) {

  // }
  @media (min-width: 0px) and (max-width: 1240px) {
    padding-top: 1px;
  }
`;
const StatusImg = styled.img`
  width: 58px;
  align-item: center;
`;
const StatusTextSuccess = styled.div`
  font-family: Inter;
  font-size: 14px;

  text-align: center;
  color: #03be46;
`;
const StatusTextFailed = styled.div`
  font-family: Inter;
  font-size: 14px;

  text-align: center;
  color: red;
`;
const SeeMoreContainer = styled.div`
  display: flex;
  cursor: pointer;
`;
const SeeMoreText = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;

  color: #4878ff;
  margin-left: 4px;
  margin-right: 5px;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 13px;
  }
`;
const ImgSeeMore = styled.img`
  display: flex;
  @media (min-width: 0px) and (max-width: 767px) {
    height: 15px;
    margin-top: 2px;
  }
`;
const ImgSeeLess = styled.img`
  display: flex;
  transform: rotate(180deg);
  @media (min-width: 0px) and (max-width: 767px) {
    height: 15px;
    margin-top: 2px;
  }
`;
const TxnDetailsRightContainer = styled.div`
  width: 100%;
  padding-left: 21px;
  padding-right: 25px;
  @media (min-width: 0px) and (max-width: 767px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;
const TxnDetailsRightBottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 25px;
  @media (min-width: 0px) and (max-width: 767px) {
    flex-flow: row wrap;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    flex-flow: row wrap;
    padding-top: 0px;
    justify-content: flex-start;
  }
`;
const TxnDetailsRightTopContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  padding-top: 22px;
`;
const DetailsContainer = styled.div`
  display: block;
  // @media (min-width: 0px) and (max-width: 767px) {

  // }
  @media (min-width: 0px) and (max-width: 1240px) {
    padding-top: 29px;
  }
`;
const DetailsMiddleContainer = styled.div`
  margin-left: 4px;
  display: flex;
  font-family: Inter;
  font-size: 15px;

  color: #3a3a3a;
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1;
  `}
  @media (min-width: 768px) and (max-width: 1240px) {
    justify-content: space-between;
    padding-top: 10px;
    margin-right: 22px;
  }
  @media (min-width: 0px) and (max-width: 767px) {
    display: block;
    padding-top: 10px;
    color: #2a2a2a;
    padding-right: 15px;
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
  }
`;
const BlockConfirmation = styled.div`
  margin-left: 4px;
  display: flex;
  font-family: Inter;
  font-size: 13px;

  color: #2149b9;
  background-color: #e2eaff;
  padding-left: 8px;
  padding-right: 10px;
  border-radius: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  ${({ theme }) => theme === "dark" && `
    border: solid 1px #3552a5;
    background-color: #091b4e;
    color: #4878ff;
  `}
`;

const DivCircle = styled.div`
  max-width: 36px;
  height: 36px;
  width: 100%;
  border-radius: 50%;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: auto;

  @media (min-width: 0px) and (max-width: 767px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    margin-top: 34px;
    margin-bottom: 33px;
  }
`;

const ImgNextArrow = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12px;
  @media (min-width: 0px) and (max-width: 1240px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 0px;
    transform: rotate(90deg);
    padding-left: 17px;
  }
`;
const AddTagContainer = styled.div`
  background-color: #4878ff;
  display: flex;
  width: 95px;
  padding: 3px 0 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 2px;
  margin-left: 4px;
  cursor: pointer;
  @media (min-width: 768px) and (max-width: 1240px) {
    margin-left: auto;
    margin-right: auto;
  }
`;
const ImgAddTag = styled.div`
  margin-right: 4px;
`;
const AddTagtext = styled.div`
  color: #ffffff;
`;

const Tag = styled.div`
  padding: 2px 5px 3px 5px;
  border-radius: 4px;
  border: solid 1px #d2deff;
  background-color: #eaf0ff;
  font-size: 14px;
  font-weight: 500;

  text-align: center;
  color: #4878ff;
  width: fit-content;
  margin-top: 2px;
  margin-left: 4px;
`;
const TabTag = styled.div`
  width: 180px;
`;
const MobileDesktopTag = styled.div`
  padding-top: 10px;
`;
const AddLabel = styled.div`
  display: flex;
`;
const AddLabelText = styled.div`
  margin-right: 8px;
`;
const MainContainerInteractedWith = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainContainerTxnAction = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentInteractedWith = styled.div`
  font-family: Inter;
  font-size: 0.935rem;
  text-align: left;
  color: #3a3a3a;
  line-height: 22px;
  display: flex;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    text-align: left;
    color: #3a3a3a;
    opacity: 1;
    line-height: 7px !important;
    flex-direction: column;
    align-items: flex-start;
    padding-right: 10px;
    padding-top: 5px;
  }
  @media (min-width: 768px) and (max-width: 1241px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;

    color: #3a3a3a;
    opacity: 1;
  }
`;
const InteractedWithNextRow = styled.div`
  display: flex;
`;
const TxnActionNextRow = styled.div`
  display: flex;
`;
const TokenTransferredMiddleContainer = styled.div`
  display: flex;
`;
const TokenTransferredContent = styled.div`
  display: flex;
  margin-top: 5px;
  margin-right: 12px;
`;

const ImgInteracted = styled.img`
  width: 19px;
  margin-left: 13px;
  margin-right: 9px;
`;

const ImgProfileIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const ImgCopyGrey = styled.img`
  width: 25px;
`;

const ImgNextArrowLine = styled.img`
  width: 18px;
`;
const ImgNextRed = styled.img`
  width: 18px;
  margin-left: 10px;
  margin-right: 20px;
`;
const ImgNewLine = styled.img`
  width: 25px;
`;

const GreyText = styled.span`
  color: #9fa9ba;
  margin-left: 2px;
`;

const BlackText = styled.span`
  color: #2a2a2a;
  margin-left: 2px;
`;

const BlueText = styled.span`
  color: #2149b9;
  margin-left: 2px;
`;

const Gap1 = styled.span`
  margin-left: 15px;
`;
const Gap2 = styled.span`
  margin-left: 30px;
`;
const SpacingInteractedWith = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  border-bottom: solid 1px #e3e7eb;
  height: 7rem;

  @media (max-width: 767px) {
    display: block;
    height: auto;
    padding: 12px 0 17px 0;
  }
`;
const SpacingTxnAction = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  border-bottom: solid 1px #e3e7eb;
  height: 7rem;

  @media (max-width: 767px) {
    display: block;
    height: auto;
    padding: 12px 0 17px 0;
  }
`;


const ContainerInteractedWith = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  max-width: 165px;
  margin-top: -40px;
`;
const ContainerTxnAction = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  max-width: 165px;
  margin-top: -40px;
`;
