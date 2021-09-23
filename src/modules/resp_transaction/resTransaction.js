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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "75.125rem",

    marginRight: "auto",
    marginTop: "90px",
    marginLeft: "auto",
    marginBottom: "auto",

    width: "100%",
    "@media (min-width: 300px) and (max-width: 567px)": {
      maxWidth: "300px",

      marginTop: "155px",
    },
    "@media (min-width: 567px) and (max-width: 767px)": {
      maxWidth: "500px",
      marginTop: "160px",
    },
    "@media (min-width: 768px) and (max-width: 1040px)": {
      maxWidth: "700px",
      marginTop: "140px",
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
  function shorten(b, amountL = 25, amountR = 0, stars = 3) {
    return `${b.slice(0, amountL)} ${".".repeat(stars)} ${b.slice(b.length)} `;
  }

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

  return (
    <div className={classes.mainContainer}>
      <Tokensearchbar />
      <div className={classes.root}>
        <Grid >
          <Spacing>
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
                <Content>{hash}</Content>
              </MiddleContainer>
              <SecondContainer>
                <CopyToClipboard text={hash} onCopy={() => setCopiedText(hash)}>
                  <Tooltip
                    title={copiedText === hash ? "Copied" : "Copy To Clipboard"}
                    placement="top"
                  >
                    <button
                      style={{
                        color: "#2149b9",
                        backgroundColor: "white",
                        fontSize: 14,
                      }}
                    >
                      <ImageView
                    src={require("../../../src/assets/images/copy.svg")}
                  />
                    </button>
                  </Tooltip>
                </CopyToClipboard>
              </SecondContainer>
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
                    className="linkTableDetails"
                    href={"/block-details/" + transactions.blockNumber}
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
            <Spacing>
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
                        <ImageView
                    src={require("../../../src/assets/images/copy.svg")}
                  />
                      </button>
                    </Tooltip>
                  </CopyToClipboard>
                </Content>
              </MiddleContainer>
            </Spacing>
            <Spacing>
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
                        <ImageView
                    src={require("../../../src/assets/images/copy.svg")}
                  />
                      </button>
                    </Tooltip>
                  </CopyToClipboard>
                </Content>
              </MiddleContainer>
            </Spacing>
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
                <TextArea readOnly value={transactions.input} />
              </MiddleContainerInputData>
            </SpacingInputData>
            <Spacing>
              <Container>
                <Tooltip align="right" title={transferToken}>
                  <ImageView
                    src={require("../../../src/assets/images/questionmark.svg")}
                  />
                </Tooltip>
                <Hash>Private Note</Hash>
              </Container>
              <MiddleContainerPrivateNote>
                {/* <Input /> */}
                To access the Private Note feature, you must be{" "}
                <a className="linkTableDetails">Logged In</a>
              </MiddleContainerPrivateNote>
            </Spacing>
          </Div__>
          <br />
          <br />
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
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 12px;
    word-break: break-all;
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
`;

const Div__ = styled.div`
  height: 56.06rem;
  width: 75.125rem;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 9px;
`;
const MiddleContainerPrivateNote = styled.div`
  font-family: Inter;
  font-size: 0.938rem;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  border-radius: 4px;
  border: solid 1px #9fa9ba;
  height: 2.313rem;
  padding:7px
  `
  const MiddleContainerInputData = styled.div`
  font-family: Inter;
  font-size: 0.938rem;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  `

const MiddleContainer = styled.div`
  font-family: Inter;
  font-size: 0.938rem;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;

  @media (max-width: 767px) {
    font-size: 12px;
    margin-left: unset;
    margin-top: 10px;
    width: 100%;
    // max-width: 232px;
    height: ${(props) => (props.isTextArea ? `100px` : `unset`)};
  }
  // @media (max-width: 1024px) {
  //   width: 100%;
  //   max-width: 340px;
  // }
`;
const HashInputData = styled.span`
  color: var(--unnamed-color-2a2a2a);
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  padding-bottom:30px;
  `

const Hash = styled.span`
  color: var(--unnamed-color-2a2a2a);
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  @media (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 13px;
  }
`;
const SpacingInputData = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 16px 23px;
  border-bottom: solid 1px #e3e7eb;
  height:7.75rem;
  `
const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 16px 28px;
  border-bottom: solid 1px #e3e7eb;
  height:4.063rem;

  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
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
    padding: 16px 6px;
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
  width:75.125rem;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  // border: solid 1px #e3e7eb;
  background-color: #fff;
  margin-bottom: 15px;
  padding: 5px;
`;

const Heading = styled.span`
  white-space: nowrap;
  color: #2a2a2a;
  box-shadow: none;
  color: var(--unnamed-color-2a2a2a);
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-left: -21px;
  @media (min-width: 300px) and (max-width: 767px) {
    margin-left: unset;
  }
`;
const ImageViewInputData = styled.img`
  width: 15px;
  margin-right: 15px;
  padding-bottom: 30px;

`;
const ImageView = styled.img`
  width: 15px;
  margin-right: 15px;
`;
