import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import Tokensearchbar from "./tokensearchBar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Utils from "../../utility";
import { useParams } from "react-router";
import { BlockService } from "../../services";
import Tooltip from "@material-ui/core/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment-timezone";
import "../../assets/styles/custom.css";
import FooterComponent from "../common/footerComponent";
import queryString from "query-string";
import utility from "../../utility";
import { useSelector } from "react-redux";
import Utility from "../../utility";
import format from "format-number";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    // marginTop: "100px",
    width: "75.125rem",
    "@media (min-width: 0px) and (max-width: 767px)": {
      // marginTop: "130px",
      maxWidth: "21rem",
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
  line: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "0px",
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

export default function BlockDetails() {
  const classes = useStyles();
  const [height, setHeight] = useState([]);
  const [count, setcount] = useState(0);
  const [copiedText, setCopiedText] = useState("");
  const { blockNumber } = useParams();
  const [isLoading, setLoading] = useState(true);
  const parsed = queryString.parse(useLocation().search);
  let hashKey = parsed?.hash;

  // useEffect(() => {
  //   getLatestaccount(blockNumber);
  //   setcount(blockNumber);
  // }, []);

  const getLatestaccount = async (blockNumber) => {
    let urlPath = `${blockNumber}`;

    let [error, blockDetailsUsingHeight] = await Utils.parseResponse(
      BlockService.getDetailsOfBlock(urlPath, {})
    );


    if (!blockDetailsUsingHeight || blockDetailsUsingHeight.length === 0 || blockDetailsUsingHeight === "" || blockDetailsUsingHeight === null) {
      setLoading(false);
    }
    if (error || !blockDetailsUsingHeight) return;
    setHeight(blockDetailsUsingHeight);
    setLoading(false);
  };
  function increment() {
    setLoading(true);
    let updatedCount = Number(count) + 1;
    setcount(updatedCount);
    window.history.pushState("", "", `/block-details/${updatedCount}`);
    getLatestaccount(updatedCount);
  }

  function decrement() {
    setLoading(true);
    let updatedCount = Number(count) - 1;
    setcount(updatedCount);
    window.history.pushState("", "", `/block-details/${updatedCount}`);
    getLatestaccount(updatedCount);
  }

  //--------------------->
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  React.useEffect(() => {
    getLatestaccount(blockNumber);
    setcount(blockNumber);
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { width } = windowDimensions;

  const hashid = `Hash of the block header from the previous block`;
  const blockheight = `Also known as Block Number. The block height, which indicates the length the length of the blockchain, increases after the addition of the new block.`;
  const transactionT = `Number of transactions associated with a particular block`;
  const timestamp = `The date and time at which a transaction is mined.`;
  const parenthash = `The hash of the block from which this block was generated, also known as its parent block`;
  const sha3uncles = `The mechanism which Ethereum Javascript RLP encodes an empty string`;
  const diffi = `  The amount of effort required to mine a new block. The difficulty algorithm may adjust according to time`;
  const tdiffi = `Total difficulty of the chain until this block`;
  const gasU = `The total gas used in the block and  its percentage of gas filled in the block`;
  const gasL = `Total gas limit provided by all transactions in the block`;
  const nonc = `Block nonce is a value used during mining to demonstrate proof of work for a block.`;
  const extrad = `Any data that can be included by the miner in the block.`;

  const truncate = (input) => {
    if (input.length > 40) {
      return input.substring(0, 38) + '...';
    }
    return input;
  };
  let td = parseInt(height?.totalDifficulty);


  let difficulty = parseInt(height?.difficulty)


  const getHoursAgo = (date) => {
    let today = Date.now()
    let difference = today - date;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24
    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60
    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60
    var secondsDifference = Math.floor(difference / 1000);
    if (secondsDifference < 60 && minutesDifference === 0 && hoursDifference === 0 && daysDifference === 0) {
      if (secondsDifference === 1)
        return secondsDifference + " second ago "
      else return secondsDifference + " seconds ago "
    }
    if (minutesDifference < 60 && hoursDifference === 0 && daysDifference === 0) {
      if (minutesDifference === 1)
        return minutesDifference + " minute ago "
      return minutesDifference + " minutes ago"
    }
    if (hoursDifference < 60 && daysDifference === 0) {
      if (hoursDifference === 1)
        return hoursDifference + " hour ago "
      return hoursDifference + " hours ago"
    }
    if (daysDifference < 30) {
      if (hoursDifference === 1)
        return hoursDifference + " day ago "
      return daysDifference + " days ago"
    }
  }
  const timezone = useSelector(state => state.timezone)

  return (
    <div>
      <Tokensearchbar />
      <div className={classes.mainContainer}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <div className={isLoading == true ? "cover-spin-2" : ""}>
              <div className={isLoading == true ? "cover-spin" : ""}>
                <Spacing style={{ borderBottom: "none" }}>
                  <Container>
                    <Heading>Block Details</Heading>
                  </Container>
                </Spacing>

                <Div>
                  <HashDiv>
                    <Container className="pad-left-6 pad-left-7">
                      <Tooltip align="right" title={hashid}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Hash ID</Hash>
                    </Container>

                    <MiddleContainerHash>
                      <Content>
                        {/* {height.hash} */}
                        {width > 1240 ? height.hash : (width <= 1240 && width >= 768 ? Utils.shortenHashTab(height.hash) : height.hash)}
                        <CopyToClipboard
                          text={height.hash}
                          onCopy={() => setCopiedText(height.hash)}
                        >
                          <Tooltip
                            title={
                              copiedText === height.hash
                                ? "Copied"
                                : "Copy To Clipboard"
                            }
                            placement="top"
                          >
                            <button className="copy-icon-block-details">
                              <ImgView
                                src="/images/copy-grey.svg"
                              />
                            </button>
                          </Tooltip>
                        </CopyToClipboard>
                      </Content>
                    </MiddleContainerHash>
                  </HashDiv>
                </Div>
                <Div__>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={blockheight}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>

                      <Hash>Block Height</Hash>
                    </Container>
                    <MiddleContainer>
                      <Content>
                        <ArrowBackIosIcon
                          style={{
                            marginRight: "10px",
                            color: "white",
                            backgroundColor: "#2149b9",
                            width: "20px",
                            height: "20px",
                            padding: "3px",
                            paddingLeft: "6px",
                            borderRadius: "5px",
                            border: "1px #2149b9",
                            lineHeight: "1rem",
                            verticalAlign: "bottom",
                          }}
                          onClick={decrement}
                        />
                        {count}
                        <ArrowForwardIosIcon
                          style={{
                            marginLeft: "10px",
                            color: "white",
                            backgroundColor: "#2149b9",
                            width: "20px",
                            height: "20px",
                            padding: "3px",
                            paddingLeft: "6px",
                            borderRadius: "5px",
                            border: "1px #2149b9",
                            lineHeight: "1rem",
                            verticalAlign: "bottom",
                          }}
                          onClick={increment}
                        />
                      </Content>
                    </MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={transactionT}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Transaction</Hash>
                    </Container>
                    <MiddleContainer>
                      {height.transactions && height.transactions.length
                        ? height.transactions.length
                        : 0}
                    </MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={timestamp}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Time Stamp</Hash>
                    </Container>
                    <MiddleContainer>
                      {height?.timestamp && getHoursAgo(height.timestamp * 1000)}
                      (
                      {`${height?.timestamp && moment(height.timestamp * 1000).tz(timezone).format(
                        "MMM DD, YYYY, hh:mm A") || ''} ${timezone && Utility.getUtcOffset(timezone) || ''}`})
                    </MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={parenthash}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Parent Hash</Hash>
                    </Container>
                    <MiddleContainer>
                      <Content>
                        <a
                          onClick={decrement}
                          className="parent_hash"
                          style={{ cursor: "pointer" }}
                        >
                          {/* {height.parentHash} */}
                          {width > 1240 ? height.parentHash : (width <= 1240 && width >= 768 ? Utils.shortenHashTab(height.parentHash) : height.parentHash)}

                        </a>
                        <CopyToClipboard
                          text={height.parentHash}
                          onCopy={() => setCopiedText(height.parentHash)}
                        >
                          <Tooltip
                            title={
                              copiedText === height.parentHash
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
                              <ImgView
                                src="/images/copy-grey.svg"
                              />
                            </button>
                          </Tooltip>
                        </CopyToClipboard>
                      </Content>
                    </MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={sha3uncles}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Sha3Uncles</Hash>
                    </Container>
                    <MiddleContainer>
                      <Content>
                        {/* {height.sha3Uncles} */}
                        {width > 1240 ? height.sha3Uncles : (width <= 1240 && width >= 768 ? Utils.shortenHashTab(height.sha3Uncles) : height.sha3Uncles)}
                        <CopyToClipboard
                          text={height.sha3Uncles}
                          onCopy={() => setCopiedText(height.sha3Uncles)}
                        >
                          <Tooltip
                            title={
                              copiedText === height.sha3Uncles
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
                              <ImgView
                                src="/images/copy-grey.svg"
                              />
                            </button>
                          </Tooltip>
                        </CopyToClipboard>
                      </Content>
                    </MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={diffi}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Difficulty</Hash>
                    </Container>
                    <MiddleContainer>{format({})(difficulty)}</MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={tdiffi}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Total Difficulty</Hash>
                    </Container>
                    <MiddleContainer>{format({})(td)}</MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={gasU}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Gas Used</Hash>
                    </Container>
                    <MiddleContainer>{format({})(parseInt(height?.gasUsed))}</MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={gasL}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Gas Limit</Hash>
                    </Container>
                    <MiddleContainer>{format({})(parseInt(height?.gasLimit))}</MiddleContainer>
                  </Spacing>
                  <Spacing>
                    <Container>
                      <Tooltip align="right" title={nonc}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Nonce</Hash>
                    </Container>
                    <MiddleContainer>{height.nonce}</MiddleContainer>
                  </Spacing>
                  <Spacing style={{ height: "unset" }}>
                    <Container className="pad-bottom-34">
                      <Tooltip align="right" title={extrad}>
                        <ImageView
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash>Extra Data</Hash>
                    </Container>
                    <div className="block-details-extraData">
                      <textarea
                        className="text-area"
                        readOnly
                        value={height.extraData}
                      />
                    </div>
                  </Spacing>
                </Div__>
              </div>
            </div>
          </Grid>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

const Input = styled.input`
  border-radius: 5px;
  border: solid 1px #e3e7eb;
  background-color: #fff;
  font-family: Inter;
  font-size: 14px;
  
  text-align: left;
  color: #2a2a2a;
`;
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
  height: 85px;
  float: left;

  overflow-y: auto;
`;
const Digits = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #4878ff;
`;
const Blocks = styled.span`
  font-family: Inter;
  font-size: 14px;

  
  text-align: left;
`;
const Div__ = styled.div`
  height: auto;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  background-color: #fff;
  padding: 0rem 2.188rem 0rem 2.188rem;
  @media (min-width: 0px) and (max-width: 767px) {
    padding-right: 10px;
    padding-left: 10px;
    margin-bottom: 23px;
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
    margin-left: unset;
    margin-top: 8px;
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    
    color: #3a3a3a;
    opacity: 1;
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
const MiddleContainerHash = styled.div`
  font-family: Inter;
  font-size: 13px;
  
  text-align: left;
  color: #3a3a3a;
  margin-left: 105px;
  width: 100%;
  @media (min-width: 300px) and (max-width: 767px) {
    margin-left: unset;
    margin-top: 8px;
    padding-right: 53px;
  }
`;
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
    height: 1.125rem;
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
const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 11px 6px 11px 0px;
  border-bottom: solid 1px #e3e7eb;
  height: 4.063rem;

  @media (min-width: 0px) and (max-width: 767px) {
    display: block;
    height: unset;
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
  padding: 15px 24px;

  @media (min-width: 0px) and (max-width: 767px) {
    display: block;
    padding-left: 10px;
  }
`;
const Container = styled.div`
  display: flex;
  word-break: break-all;
  width: 100%;
  align-items: center;
  max-width: 84px;
`;
const SecondContainer = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 300px) and (max-width: 767px) {
  }
`;

const Div = styled.div`
  height: auto;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
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
  font-size: 18px;

  @media (min-width: 1241px) {
    height: 1.813rem;
    font-family: Inter;
    font-size: 1.5rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    
    text-align: left;
    color: #2a2a2a;
  }
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
    margin-top: 15px;
    margin-bottom: 10px;
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
`;

const ImageView = styled.img`
  width: 22px;
  margin-right: 12px;
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 767px) {
    width: 22px;
    // height: 14px;
    margin-right: 6px;
    margin-left: -4px;
  }

  @media (min-width: 768px) and (max-width: 1240px) {
    width: 22px;
    // height: 0.875rem;
  }
`;
const ImgView = styled.img`
  width: 20px;
`;
