import React, { useState, useEffect } from "react";
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
import moment from "moment";
import FooterComponent from '../common/footerComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "970px",
    marginTop: "100px",
    width: "100%",
    "@media (min-width: 300px) and (max-width: 567px)": {
      maxWidth: "330px",
    },
    "@media (min-width: 567px) and (max-width: 767px)": {
      maxWidth: "540px",
    },
    "@media (min-width: 767px) and (max-width: 1040px)": {
      maxWidth: "700px",
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
  useEffect(() => {
    getLatestaccount(blockNumber);
    setcount(blockNumber);
    setInterval(() => {
      getLatestaccount(count);
    }, 90000);
  }, []);

  const getLatestaccount = async (blockNumber) => {
    let urlPath = `/${blockNumber}`;
    let [error, blockDetailsUsingHeight] = await Utils.parseResponse(
      BlockService.getDetailsOfBlock(urlPath, {})
    );
    if (error || !blockDetailsUsingHeight) return;
    setHeight(blockDetailsUsingHeight);
  };
  function increment() {
    let updatedCount = Number(count) + 1;
    setcount(updatedCount);
    window.history.pushState("", "", `/block-details/${updatedCount}`);
    getLatestaccount(updatedCount);
  }

  function decrement() {
    let updatedCount = Number(count) - 1;
    setcount(updatedCount);
    window.history.pushState("", "", `/block-details/${updatedCount}`);
    getLatestaccount(updatedCount);
  }

  const hashid = `Hash of the block header from the previous block`;
  const blockheight = `Also known as Block Number. The block height, which indicates the length the length of the blockchain, increases after the addition of the new block.`;
  const timestamp = `The date and time at which a transaction is mined.`;
  const parenthash = `The hash of the block from which this block was generated, also known as its parent block`;
  const sha3uncles = `The mechanism which Ethereum Javascript RLP encodes an empty string`;
  const diffi = `  The amount of effort required to mine a new block. The difficulty algorithmmay adjust according to time`;
  const tdiffi = `Total difficulty of the chain until this block`;
  const gasU = `The total gas used in the block and  its percentage of gas filled in the block`;
  const gasL = `Total gas limit provided by all transactions in the block`;
  const nonc = `Block nonce is a value used during mining to demonstrate proof of work for a block.`;
  const extrad = `Any data that can be included by the miner in the block.`;
  var isActive = false;
  return (
    <div>
      <Tokensearchbar />
      <div className={classes.mainContainer}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <Spacing style={{borderBottom:'none'}}>
              <Container>
                <Heading>Block Details</Heading>
              </Container>

              {/* <SecondContainer>
              <Leftcontainer>122 Votes</Leftcontainer>
            </SecondContainer> */}
            </Spacing>

            <Div>
            <HashDiv>
                <Container>
                  <Tooltip align="right" title={hashid}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Hash ID</Hash>
                </Container>
                <MiddleContainerHash >
                <Content>
                      
                  {height.hash}
                  </Content>
                  </MiddleContainerHash>
                <SecondContainer>
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
                      <button
                        style={{
                          color: "blue",
                          backgroundColor: "white",
                          fontSize: 14,
                        }}
                      >
                        <i class="fa fa-clone" aria-hidden="true"></i>
                      </button>
                    </Tooltip>
                  </CopyToClipboard>
                  </SecondContainer>
                  </HashDiv>
            </Div>
            <Div__>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={blockheight}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>

                  <Hash>Block Height</Hash>
                </Container>
                <MiddleContainer>
                <Content>
                    <ArrowBackIosIcon
                      style={{
                        marginRight: "10px",
                        color: "#2149b9",
                        backgroundColor: "#9cd0f3",
                        width: "20px",
                        height: "20px",
                        padding: "3px",
                        paddingLeft: "6px",
                        borderRadius: "5px",
                        border: "1px #9cd0f3",
                        lineHeight: "1rem",
                      }}
                      onClick={decrement}
                    />
                    {count}
                    <ArrowForwardIosIcon
                      style={{
                        marginLeft: "10px",
                        color: "#2149b9",
                        backgroundColor: "#9cd0f3",
                        width: "20px",
                        height: "20px",
                        padding: "3px",
                        paddingLeft: "6px",
                        borderRadius: "5px",
                        border: "1px #9cd0f3",
                        lineHeight: "1rem",
                      }}
                      onClick={increment}
                    />
                  </Content>
                  </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={hashid}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Transaction</Hash>
                </Container>
                <MiddleContainer>
                 {height.transactions && height.transactions.length ? height.transactions.length : 0}
                </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={timestamp}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Time Stamp</Hash>
                </Container>
                <MiddleContainer>
                 
                    {moment(height.timestamp * 1000).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  
                </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={parenthash}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Parent Hash</Hash>
                </Container>
                <MiddleContainer>
                  <Content>
                    {" "}
                    <a
                      
                      onClick={decrement}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {height.parentHash}
                    </a>
                
               
                
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
                      <button
                        style={{
                          color: "blue",
                          backgroundColor: "white",
                          fontSize: 14,
                        }}
                      >
                        <i class="fa fa-clone" aria-hidden="true"></i>
                      </button>
                    </Tooltip>
                  </CopyToClipboard>
                  </Content>
                </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={sha3uncles}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Sha3Uncles</Hash>
                </Container>
                <MiddleContainer>
                  <Content>
                    {" "}
                    <a
                      className="parent_hash"
                      onClick={decrement}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {height.sha3Uncles}
                    </a>
                  
                
                
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
                      <button
                        style={{
                          color: "blue",
                          backgroundColor: "white",
                          fontSize: 14,
                        }}
                      >
                        <i class="fa fa-clone" aria-hidden="true"></i>
                      </button>
                    </Tooltip>
                  </CopyToClipboard>
                  </Content>
                </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={diffi}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Difficulty</Hash>
                </Container>
                <MiddleContainer>
                   {height.difficulty}
                </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={tdiffi}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Total Difficulty</Hash>
                </Container>
                <MiddleContainer>
                  {height.totalDifficulty}
                </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={gasU}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Gas Used</Hash>
                </Container>
                <MiddleContainer>
                  {height.gasUsed}
                </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={gasL}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Gas Limit</Hash>
                </Container>
                <MiddleContainer>
                  {height.gasLimit}
                </MiddleContainer>
              </Spacing>
              <Spacing >
                <Container>
                  <Tooltip align="right" title={nonc}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Nonce</Hash>
                </Container>
                <MiddleContainer>
                   {height.nonce}
                </MiddleContainer>
              </Spacing>
              <Spacing style={{borderBottom:'none'}}>
                <Container>
                  <Tooltip align="right" title={extrad}>
                    <ImageView
                      src={require("../../../src/assets/images/questionmark.png")}
                    />
                  </Tooltip>
                  <Hash>Extra Data</Hash>
                </Container>
                <MiddleContainer style={{height: '60px',width:'100%'}}>
                  
                    <textarea style={{width: "100%",
    height: "100%",
    borderRadius: "4px",
    outline: "transparent",
    border: "solid 1px #9fa9ba",
    backgroundColor: "#dee0e3",
    color: "#3a3a3a",
    marginLeft: "0px"}}
                      className="text-area"
                      readOnly
                      value={height.extraData}
                    />
                 
                </MiddleContainer>
              </Spacing>
              </Div__>
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
  letter-spacing: 0.54px;
  text-align: left;
  color: #2a2a2a;
`;
const Content = styled.span`
  font-family: Inter;
  font-size: 13px;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  word-break: break-all;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 10px;
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
  letter-spacing: 0.54px;
  text-align: left;
  color: #4878ff;
`;
const Blocks = styled.span`
  font-family: Inter;
  font-size: 14px;

  letter-spacing: 0.54px;
  text-align: left;
`;
const Div__ = styled.div`
  height: auto;
  border-radius: 7px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  background-color: #fff;
  padding: 9px;
`;
const MiddleContainer = styled.div`
  font-family: Inter;
  font-size: 13px;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 12px;
    margin-left: unset;
    margin-top: 8px;
    
  }
`;
const MiddleContainerHash = styled.div`
  font-family: Inter;
  font-size: 13px;
  letter-spacing: 0.54px;
  text-align: left;
  color: #3a3a3a;
  margin-left: 100px;
  width: 100%;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 12px;
    margin-left: unset;
    margin-top: 8px;
    padding-right:84px;
    
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
  @media (min-width: 300px) and (max-width: 767px) {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 13px;
  }
`;
const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 11px 6px;
  border-bottom: solid 1px #e3e7eb;

  @media (min-width: 300px) and (max-width: 767px) {
    display: block;
  }
`;
const HashDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 11px 6px;

  @media (min-width: 300px) and (max-width: 767px) {
    display: block;
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
`;

const ImageView = styled.img`
  width: 15px;
  margin-right: 15px;
`;