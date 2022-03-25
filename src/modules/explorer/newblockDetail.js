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
import utility,{ dispatchAction } from "../../utility";
import { connect, useSelector } from "react-redux";
import Utility from "../../utility";
import format from "format-number";
import { transparent } from "material-ui/styles/colors";
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
  mainContainerDark: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#091b4e"
  },
}));

function BlockDetails(props) {
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
  const blockheight = `Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block.`;
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
  const [hashTT, setHashTT] = useState(false);
  const [blockHeightTT, setBlockHeightTT] = useState(false);
  const [transactionTT, setTransactionTT] = useState(false);
  const [timeStampTT, setTimeStampTT] = useState(false);
  const [parentHashTT, setParentHashTT] = useState(false);
  const [sha3UnclesTT, setSha3UnclesTT] = useState(false);
  const [difficultyTT, setDifficultyTT] = useState(false);
  const [totalDifficultyTT, setTotalDifficultyTT] = useState(false);
  const [gasUsedTT, setGasUsedTT] = useState(false);
  const [gasLimitTT, setGasLimitTT] = useState(false);
  const [nonceTT, setNonceTT] = useState(false);
  const [extraDataTT, setExtraDataTT] = useState(false);

  return (
    <div>
      <Tokensearchbar theme={props.theme.currentTheme}/>
      <div className={props.theme.currentTheme === "dark" ? classes.mainContainerDark : classes.mainContainer}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <div className={isLoading == true ? "cover-spin-2" : ""}>
              <div className={isLoading == true ? "cover-spin" : ""}>
                <Spacing style={{ borderBottom: "none" }}>
                  <Container>
                    <Heading theme={props.theme.currentTheme}>Block Details</Heading>
                  </Container>
                </Spacing>

                <Div theme={props.theme.currentTheme}>
                  <HashDiv>
                    <Container className="pad-left-6 pad-left-7">
                      <Tooltip 
                        open={hashTT}
                        onOpen={() => setHashTT(true)}
                        onClose={() => setHashTT(false)}
                        align="right" 
                        title={hashid}>
                        <ImageView
                          onClick={() => setHashTT(!hashTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Hash ID</Hash>
                    </Container>

                    <MiddleContainerHash>
                      <Content theme={props.theme.currentTheme}>
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
                            <button className={props.theme.currentTheme === "dark" ? "copy-icon-block-details-dark" : "copy-icon-block-details"}>
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
                <Div__ theme={props.theme.currentTheme}>
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={blockHeightTT}
                        onOpen={() => setBlockHeightTT(true)}
                        onClose={() => setBlockHeightTT(false)}
                        align="right" 
                        title={blockheight}>
                        <ImageView
                          onClick={() => setBlockHeightTT(!blockHeightTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>

                      <Hash theme={props.theme.currentTheme}>Block Height</Hash>
                    </Container>
                    <MiddleContainer>
                      <Content theme={props.theme.currentTheme}>
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
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={transactionTT}
                        onOpen={() => setTransactionTT(true)}
                        onClose={() => setTransactionTT(false)}
                        align="right" 
                        title={transactionT}>
                        <ImageView
                          onClick={() => setTransactionTT(!transactionTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Transaction</Hash>
                    </Container>
                    <MiddleContainer theme={props.theme.currentTheme}>
                      {height.transactions && height.transactions.length
                        ? height.transactions.length
                        : 0}
                    </MiddleContainer>
                  </Spacing>
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={timeStampTT}
                        onOpen={() => setTimeStampTT(true)}
                        onClose={() => setTimeStampTT(false)}
                        align="right" 
                        title={timestamp}>
                        <ImageView
                          onClick={() => setTimeStampTT(!timeStampTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Time Stamp</Hash>
                    </Container>
                    <MiddleContainer theme={props.theme.currentTheme}>
                      {height?.timestamp && getHoursAgo(height.timestamp * 1000)}
                      (
                      {`${height?.timestamp && moment(height.timestamp * 1000).tz(timezone).format(
                        "MMM DD, YYYY, hh:mm A") || ''} ${timezone && Utility.getUtcOffset(timezone) || ''}`})
                    </MiddleContainer>
                  </Spacing>
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={parentHashTT}
                        onOpen={() => setParentHashTT(true)}
                        onClose={() => setParentHashTT(false)}
                        align="right" 
                        title={parenthash}>
                        <ImageView
                          onClick={() => setParentHashTT(!parentHashTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Parent Hash</Hash>
                    </Container>
                    <MiddleContainer>
                      <Content theme={props.theme.currentTheme}>
                        <a
                          onClick={decrement}
                          className={props.theme.currentTheme === "dark" ? "parent_hash_dark" : "parent_hash"}
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
                              style={props.theme.currentTheme === "dark" ? {
                                color: "blue",
                                fontSize: 14,
                                background: "transparent",
                              }: {
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
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={sha3UnclesTT}
                        onOpen={() => setSha3UnclesTT(true)}
                        onClose={() => setSha3UnclesTT(false)}
                        align="right" 
                        title={sha3uncles}>
                        <ImageView
                          onClick={() => setSha3UnclesTT(!sha3UnclesTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Sha3Uncles</Hash>
                    </Container>
                    <MiddleContainer>
                      <Content theme={props.theme.currentTheme}>
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
                              style={props.theme.currentTheme === "dark" ? {
                                color: "blue",
                                fontSize: 14,
                                background: "transparent"
                              }: {
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
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={difficultyTT}
                        onOpen={() => setDifficultyTT(true)}
                        onClose={() => setDifficultyTT(false)}
                        align="right" 
                        title={diffi}>
                        <ImageView
                          onClick={() => setDifficultyTT(!difficultyTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Difficulty</Hash>
                    </Container>
                    <MiddleContainer theme={props.theme.currentTheme}>{format({})(difficulty)}</MiddleContainer>
                  </Spacing>
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={totalDifficultyTT}
                        onOpen={() => setTotalDifficultyTT(true)}
                        onClose={() => setTotalDifficultyTT(false)}
                        align="right" 
                        title={tdiffi}>
                        <ImageView
                          onClick={() => setTotalDifficultyTT(!totalDifficultyTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Total Difficulty</Hash>
                    </Container>
                    <MiddleContainer theme={props.theme.currentTheme}>{format({})(td)}</MiddleContainer>
                  </Spacing>
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={gasUsedTT}
                        onOpen={() => setGasUsedTT(true)}
                        onClose={() => setGasUsedTT(false)}
                        align="right" 
                        title={gasU}>
                        <ImageView
                          onClick={() => setGasUsedTT(!gasUsedTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Gas Used</Hash>
                    </Container>
                    <MiddleContainer theme={props.theme.currentTheme}>{format({})(parseInt(height?.gasUsed))}</MiddleContainer>
                  </Spacing>
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip
                        open={gasLimitTT}
                        onOpen={() => setGasLimitTT(true)}
                        onClose={() => setGasLimitTT(false)} 
                        align="right" 
                        title={gasL}>
                        <ImageView
                          onClick={() => setGasLimitTT(!gasLimitTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Gas Limit</Hash>
                    </Container>
                    <MiddleContainer theme={props.theme.currentTheme}>{format({})(parseInt(height?.gasLimit))}</MiddleContainer>
                  </Spacing>
                  <Spacing theme={props.theme.currentTheme}>
                    <Container>
                      <Tooltip 
                        open={nonceTT}
                        onOpen={() => setNonceTT(true)}
                        onClose={() => setNonceTT(false)}
                        align="right" 
                        title={nonc}>
                        <ImageView
                          onClick={() => setNonceTT(!nonceTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Nonce</Hash>
                    </Container>
                    <MiddleContainer theme={props.theme.currentTheme}>{height.nonce}</MiddleContainer>
                  </Spacing>
                  <Spacing lastBorder={true} theme={props.theme.currentTheme} style={{ height: "unset" }}>
                    <Container className="pad-bottom-34">
                      <Tooltip 
                        open={extraDataTT}
                        onOpen={() => setExtraDataTT(true)}
                        onClose={() => setExtraDataTT(false)}
                        align="right" 
                        title={extrad}>
                        <ImageView
                          onClick={() => setExtraDataTT(!extraDataTT)}
                          src="/images/info.svg"
                        />
                      </Tooltip>
                      <Hash theme={props.theme.currentTheme}>Extra Data</Hash>
                    </Container>
                    <div className="block-details-extraData">
                      <textarea
                        className={props.theme.currentTheme === "dark" ? "text-area-dark" : "text-area"}
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

const mapStateToProps = (state) => {
  return { theme: state.theme };
};
export default connect(mapStateToProps, { dispatchAction })(BlockDetails);

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
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    
    color: #3a3a3a;
    opacity: 1;
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
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
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
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
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
  ${({ theme }) => theme === "dark" && `
    background-color: #192a59;
    margin-bottom: 60px;
  `}
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
  ${({ theme }) => theme === "dark" && `
    color: #b1c3e1;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    margin-left: unset;
    margin-top: 8px;
    font-size: 0.875rem;
    word-break: break-all;
    text-align: left;
    
    color: #3a3a3a;
    opacity: 1;
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
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
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
    ${({ theme }) => theme === "dark" && `
      color: #b1c3e1;
    `}
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
  ${({ theme }) => theme === "dark" && `
    color: #ffffff;
  `}
  @media (min-width: 0px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    text-align: left;
    
    color: #2a2a2a;
    opacity: 1;
    ${({ theme }) => theme === "dark" && `
      color: #ffffff;
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
      color: #ffffff;
    `}
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
    ${({ theme }) => theme === "dark" && `
      color: #ffffff;
    `}
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
  ${({ theme }) => theme === "dark" && `
    border-bottom: solid 1px #4a5d94;
  `}
  ${({ lastBorder, theme }) => theme === "dark" &&  lastBorder === true && `
    border-bottom: none;
  `}

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
  ${({ theme }) => theme === "dark" && `
    background-color: #192a59;
    border: none;
  `}
`;

const Heading = styled.span`
  white-space: nowrap;
  color: #2a2a2a;
  box-shadow: none;
  color: var(--unnamed-color-2a2a2a);
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  ${({ theme }) => theme === "dark" && `
    color: #ffffff;
  `}

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
    ${({ theme }) => theme === "dark" && `
    color: #ffffff;
  `}
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
    ${({ theme }) => theme === "dark" && `
    color: #ffffff;
  `}
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
    ${({ theme }) => theme === "dark" && `
    color: #ffffff;
  `}
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
