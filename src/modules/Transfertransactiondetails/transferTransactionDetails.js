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
import Utils from "../../utility";
import FooterComponent from "../common/footerComponent";
import moment from "moment";
import TokenData from "../../services/token";
import BlockService from "../../services/blocks";
import coinMarketService from "../../services/coinMarket";

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
      // marginTop: "130px",
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
}));

export default function TransferTransaction({ _handleChange }) {
  const classes = useStyles();
  function shorten(b, amountL = 25, amountR = 0, stars = 3) {
    return `${b?.slice(0, amountL)} ${".".repeat(stars)} ${b?.slice(
      b.length
    )} `;
  }

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
  // const privatenote = ` Private notes `;

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



  const valueDiv = !valueFetch ? 0 : Utils.decimalDivison(valueFetch, 2);
  return (
    <div className={classes.mainContainer}>
      <Tokensearchbar />
      <div className={classes.root}>
        <Grid>
          <div className={isLoading === true ? "cover-spin-2" : ""}>
            <div className={isLoading === true ? "cover-spin" : ""}>
              <Spacin>
                <Container>
                  <Heading>Transaction Details</Heading>
                  {transactions ? (
                    transactions.status === true ? (
                      <p className="Success-rectangle">Success</p>
                    ) : (
                      <p className="Failed-rectangle">Failed</p>
                    )
                  ) : null}
                </Container>
              </Spacin>

              <Div>
                <HashDiv>
                  <Container className="pad-left-5">
                    <Tooltip align="right" title={hashid}>
                      <ImageView src={"/images/questionmark.png"} />
                    </Tooltip>

                    <Hash>Hash ID</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content>
                      {address}

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
                            style={{
                              color: "#2149b9",
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
                </HashDiv>
              </Div>

              <Division className="pad-right-30">
                <Spacing>
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
                </Spacing>
                <Spacing>
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
                </Spacing>
                <Spacing>
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
                </Spacing>
                <Spacing>
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
                </Spacing>
                <Spacing>
                  <Container>
                    <Tooltip
                      title={transferToken}
                      style={{ cursor: "pointer" }}
                    >
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>

                    <Hash> Interacted With (To)</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content>
                      Contract{" "}

                      (<a className="linkTableDetails" href={"/address/" + transactions?.contract}>
                        {transactions?.contract}
                      </a>)
                    </Content>
                  </MiddleContainer>
                </Spacing>

                <Spacing>
                  <Container>
                    <Tooltip
                      title={transferToken}
                      style={{ cursor: "pointer" }}
                    >
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>

                    <Hash> Token Transfer</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content>
                      {tokenTransferValue}

                    </Content>
                  </MiddleContainer>
                </Spacing>

                <Spacing>
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
                </Spacing>
                <Spacing>
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
                </Spacing>
                <Spacing>
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
                    {/* <Content> {transactions.gas}</Content> */}
                  </MiddleContainer>
                </Spacing>
                <Spacing>
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
                    {/* <Content> {gasP}</Content> */}
                  </MiddleContainer>
                </Spacing>
                <Spacing>
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
                </Spacing>
                <Spacing>
                  <Container>
                    <Tooltip
                      align="right"
                      title={nounced}
                      style={{ cursor: "pointer" }}
                    >
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>
                    <Hash>Nonce</Hash>
                  </Container>
                  <MiddleContainer isTextArea={false}>
                    <Content> {transactions.nonce}</Content>
                  </MiddleContainer>
                </Spacing>
                <SpacingInputData>
                  <Container className="mar-bottom-45 mar-bottom-15 mar-bottom-40">
                    <Tooltip
                      align="right"
                      title={input}
                      style={{ cursor: "pointer" }}
                    >
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>
                    <Hash>Input Data</Hash>
                  </Container>
                  <MiddleContainerInputData isTextArea={true}>
                    <TextArea readOnly value={transactions.input} />
                  </MiddleContainerInputData>
                </SpacingInputData>
                <SpacingPrivateNode>
                  <Container>
                    <Tooltip
                      align="right"
                      title={transferToken}
                      style={{ cursor: "pointer" }}
                    >
                      <ImageView src={"/images/questionmark.svg"} />
                    </Tooltip>
                    <Hash>Private Note</Hash>
                  </Container>
                  <MiddleContainerPrivateNote>
                    {/* <Input /> */}
                    <PrivateBox>
                      To access the Private Note feature, you must be
                      <a className="linkTableDetails"> Logged In</a>
                    </PrivateBox>
                  </MiddleContainerPrivateNote>
                </SpacingPrivateNode>
              </Division>
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
// const Input = styled.input`
//   border-radius: 5px;
//   border: solid 1px #e3e7eb;
//   background-color: #fff;
//   font-family: Inter;
//   font-size: 14px;

//   text-align: left;
//   color: #2a2a2a;
// `;
const Content = styled.span`
  font-family: Inter;
  font-size: 13px;
  
  text-align: left;
  color: #3a3a3a;
  word-break: break-all;

  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    
    color: #3a3a3a;
    opacity: 1;
    word-break: break-all;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    
    color: #3a3a3a;
    opacity: 1;
  }
  @media (min-width: 1241px) {
    height: 1.125rem;
    font-family: Inter;
    font-size: 0.938rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    
    text-align: left;
    color: #3a3a3a;
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
    width: 109%;
  }
  @media (min-width: 1241px) {
    width: 59.125rem;
    height: 5.813rem;
    opacity: 0.33;
    border-radius: 4px;
    border: solid 1px #9fa9ba;
    background-color: #dee0e3;
    margin-left: 88px;
  }
`;

const Division = styled.div`
  height: auto;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 9px;

  @media (min-width: 0px) and (max-width: 767px) {
    width: 22.563rem;
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 41.5rem;
    padding: 13px;
  }
  @media (min-width: 1241px) {
    height: 64.06rem;
    width: 75.125rem;
    border-radius: 7px;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 0.563rem;
    padding-left: 2.188rem;
    padding-right: 2.188rem;
  }
`;
const MiddleContainer = styled.div`
  font-family: Inter;
  font-size: 13px;
  
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;

  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    
    color: #3a3a3a;
    opacity: 1;
    word-break: break-all;
    height: ${(props) => (props.isTextArea ? `100px` : `unset`)};
    margin-left: 2px;
    margin-top: 10px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    
    color: #3a3a3a;
    opacity: 1;
  }

  @media (min-width: 1241px) {
    font-family: Inter;
    font-size: 0.938rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    
    text-align: left;
    color: #3a3a3a;
  }
`;
const MiddleContainerPrivateNote = styled.div`
  font-family: Inter;
  font-size: 0.938rem;
  
  text-align: left;
  color: #3a3a3a;
  height: 2.313rem;
`;
const PrivateBox = styled.div`
  border-radius: 4px;
  border: solid 1px #9fa9ba;
  width: 59.125rem;
  padding: 7px;
  margin-left: 88px;
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 28.125rem;
    font-size: 0.875rem;
  }
  @media (min-width: 0px) and (max-width: 767px) {
    margin-left: unset;
    width: 100%;
    margin-top: 10px;
  }
`;
const MiddleContainerInputData = styled.div`
  font-family: Inter;
  font-size: 0.938rem;
  
  text-align: left;
  color: #3a3a3a;
  width: 100%;
  @media (min-width: 768px) and (max-width: 1240px) {
    margin-left: 88px;
  }
`;
// const InputContainer = styled.div`
//   font-family: Inter;
//   font-size: 13px;
//   
//   text-align: left;
//   color: #3a3a3a;
//   margin-left: 100px;
//   width: 100%;
// `;

const Hash = styled.span`
  color: var(--unnamed-color-2a2a2a);
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  
  color: #2a2a2a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    text-align: left;
    
    color: #2a2a2a;
    opacity: 1;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: left;
    
    color: #2a2a2a;
    opacity: 1;
  }
  @media (min-width: 1241px) {
    font-family: Inter;
    font-size: 0.938rem;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    
    text-align: left;
    color: #2a2a2a;
  }
`;
const Spacin = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  padding: 16px 23px;
`;

const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 4.063rem;
  align-items: center;
  border-bottom: solid 1px #e3e7eb;

  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
    height: auto;
  }
`;
const SpacingInputData = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  padding-right: 2.313rem;
  border-bottom: solid 1px #e3e7eb;
  height: 7.75rem;
  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
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
  padding-right: 2.313rem;
  @media (max-width: 767px) {
    display: block;
    padding: 11px 6px;
    height: 6.5rem;
    border-bottom: none;
  }
`;
const HashDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 16px 23px;

  @media (max-width: 767px) {
    display: block;
    padding: 16px 6px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    padding-left: 5px;
  }
`;
const Container = styled.div`
  display: flex;

  width: 100%;
  align-items: center;
  max-width: 100px;
`;
// const SecondContainer = styled.div`
//   display: flex;
//   align-items: center;
//   @media (max-width: 767px) {
//   }
// `;

const Div = styled.div`
  height: 4.125rem;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 15px;
  padding: 6px;

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
  color: var(--unnamed-color-2a2a2a);
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-left: -21px;
  @media (min-width: 0px) and (max-width: 767px) {
    height: 1rem;
    font-family: Inter;
    font-size: 1rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    
    text-align: left;
    color: #2a2a2a;
    // margin-top: 62px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    height: 1rem;
    font-family: Inter;
    font-size: 1rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    
    text-align: left;
    color: #2a2a2a;
  }
  @media (min-width: 1241px) {
    font-family: Inter;
    font-size: 1.5rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    
    text-align: left;
    color: #2a2a2a;
  }
`;

const ImageView = styled.img`
  width: 15px;
  margin-right: 15px;
  cursor: pointer;
  @media (min-width: 0px) and (max-width: 767px) {
    width: 14px;
    height: 14px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 0.875rem;
    height: 0.875rem;
  }
`;
const ImgView = styled.img`
  width: 20px;
  height: 20px;
  @media (min-width: 0px) and (max-width: 767px) {
    width: 1rem;
    height: 1rem;
  }
`;
