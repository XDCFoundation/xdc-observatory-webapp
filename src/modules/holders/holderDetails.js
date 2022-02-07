import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import HolderTableComponent from "./holderTable";
import { ImQrcode } from "react-icons/im";
import Popup from "reactjs-popup";
import { Grid, TableContainer } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";
import Utils from "../../utility";
import TokenData from "../../services/token";
import { Row } from "simple-flexbox";
import format from "format-number";
import ContractData from "../../services/contract";
import HolderAnalytics from "../token/holderAnalytics/analyticsComponent";

var QRCode = require("qrcode.react");

const DeskTopView = styled.div`
  @media (min-width: 0px) and (max-width: 640px) {
    display: none;
  }

  @media (min-width: 641px) {
    display: visible;
  }
`;

const MobileView = styled.div`
  @media (min-width: 0px) and (max-width: 640px) {
    display: visible;
  }

  @media (min-width: 641px) {
    display: none;
  }
`;
const CloseIcon = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  @media (min-width: 0) and (max-width: 768px) {
    margin-left: 18rem;
    width: 10.6px;
    height: 10.8px;
    // margin-right: 20px;
    display: ${(props) => (props.isDesktop ? "none" : "block")};
  }
  @media (min-width: 768px) {
    display: ${(props) => (props.isDesktop ? "block" : "none")};
  }
`;

const useStyles = makeStyles({
  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
    // width: "75.125rem"
  },
});
export default function HoldersDetails(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const isAnalytics = urlParams.get("isAnalytics");
  const [toggleState, setToggleState] = useState(
    isAnalytics === "true" ? 2 : 1
  );

  const [transactions, setTransactions] = useState([]);

  const [copiedText, setCopiedText] = useState("");

  const [holder, setHolderDetail] = useState(0);
  const [contractAddress, setContractAddress] = useState(0);
  const [decimal, setDecimal] = useState(0);
  const { addr } = useParams();
  const { tn } = useParams();

  useEffect(() => {
    let values = { address: addr, skip: 0, limit: 1 };
    holderDetail(values);
    if (holder !== 0) {
      getContractDetails();
    }
  }, [contractAddress]);

  const getContractDetails = async () => {
    let urlPath = `${contractAddress}`;
    let [error, contractDecimal] = await Utils.parseResponse(
      ContractData.getContractDetailsUsingAddress(urlPath, {})
    );
    if (error || !contractDecimal) return;
    setDecimal(contractDecimal.contractResponse?.decimals);
  };

  const holderDetail = async (values) => {
    let [error, tns] = await Utils.parseResponse(
      TokenData.getHolderDetailsUsingAddressforToken(values)
    );
    if (error || !tns) return;
    setHolderDetail(tns);
    setContractAddress(tns[0]?.Contract_address);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const classes = useStyles();

  return (
    <>
      <DeskTopView>
        <div style={{ backgroundColor: "#fff" }}>
          <Tokensearchbar />
          <Grid className="table-grid-block grid-block-table_11">
            <div
              className="block_details_heading"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p className="block_details_heading_left">Holder Details</p>
            </div>
            <Paper style={{ borderRadius: "14px" }} elevation={0}>
              <TableContainer
                className={classes.container}
                id="container-table"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "0px",
                          paddingRight: "1px",
                        }}
                        id="td"
                      />
                      <TableCell className="first-row-table_address1">
                        Holder
                      </TableCell>
                      <TableCell className="second-row-table_address1">
                        {addr}
                      </TableCell>
                      <TableCell>
                        <div>
                          <CopyToClipboard
                            text={addr}
                            onCopy={() => setCopiedText(addr)}
                          >
                            <Tooltip
                              title={
                                copiedText === addr
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
                                {" "}
                                <img alt="copy" src={"/images/copy.svg"} />{" "}
                              </button>
                            </Tooltip>
                          </CopyToClipboard>
                          <Popup
                            trigger={<ImQrcode className="imQrcode" />}
                            lockScroll
                            modal
                          >
                            {(close) => (
                              <div className="popup_qr">
                                <CloseIcon
                                  isDesktop={false}
                                  src="/images/XDC-Cross.svg"
                                  // className="qrClose"
                                  onClick={close}
                                />
                                <p>
                                  <div>
                                    <div className="header-popup">
                                      <Row alignItems="center">{addr}</Row>
                                      <CloseIcon
                                        isDesktop={true}
                                        src="/images/XDC-Cross.svg"
                                        // className="qrClose"
                                        onClick={close}
                                      />
                                      {/* &times; */}
                                      {/* </img> */}
                                    </div>
                                    {window.innerWidth > 767 ? (
                                      <QRCode
                                        size={320}
                                        style={{
                                          height: 400,
                                          width: 400,
                                          marginTop: "0.625rem",
                                        }}
                                        value={addr}
                                      />
                                    ) : (
                                      <QRCode
                                        // style={{window.innerWidth > 768 ? '800px' : '400px'}}
                                        size={320}
                                        className="qrcode-label"
                                        //style={{ height: 400, width: 400, marginTop: '0.625rem' }}
                                        value={addr}
                                      />
                                    )}
                                  </div>
                                </p>
                              </div>

                              // <div className="popup_qr">
                              //   <p>
                              //     <div>
                              //       <button style={{ outline: 'none', width: '0px', height: '0px', marginLeft: "0px", paddingTop: '1.5rem' }} className="close" onClick={close}>
                              //         &times;
                              //       </button>
                              //       <div className="header" style={{ fontSize: '0.875rem', paddingTop: '1.563rem', paddingBottom: '60px' }}> {addr} </div>
                              //       <QRCode size={320} style={{ height: 400, width: 400 }} value={addr} />
                              //     </div>
                              //   </p>
                              // </div>
                            )}
                          </Popup>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "0px",
                          paddingRight: "1px",
                        }}
                        id="td"
                      />
                      <TableCell className="first-row-table_address-balance">
                        Balance
                      </TableCell>
                      <TableCell className="second-row-table_address-balance">
                        {format({})(holder[0]?.Holder_token_balance)} {tn}
                        {/* ({ReactHtmlParser(convertCurrency)} {coinValue}) */}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "0px",
                          paddingRight: "1px",
                        }}
                        id="td"
                      />
                      <TableCell className="first-row-table_address-balance">
                        Transfers
                      </TableCell>
                      <TableCell className="second-row-table_address-balance">
                        {holder[0]?.Total_transfes_transactions_Count}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "0px",
                          paddingRight: "1px",
                          borderBottom: "none",
                        }}
                        id="td"
                      />
                      <TableCell className="first-row-table_address">
                        Contract Address
                      </TableCell>
                      <TableCell className="second-row-table_address">
                        {holder[0]?.Contract_address}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Paper>
            <br />
            <br />
            <TabComponent
              toggleTab={toggleTab}
              toggleState={toggleState}
              transactions={transactions}
              decimal={decimal}
              contractAddress={contractAddress}
              addr={addr}
            />
          </Grid>
          <FooterComponent />
        </div>
      </DeskTopView>
      <MobileView>
        <div style={{ backgroundColor: "#fff" }}>
          <Tokensearchbar />
          <Grid lg={8} className="table-grid-block">
            <div
              className="holder-detail-table"
            >
              <p className="block_details_heading_left  fs-15">
                Holder Details
              </p>
            </div>
            <Paper
              className="holder-detail-table"
              elevation={0}
            >
              <TableContainer
                className={classes.container}
                id="container-table"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell
                    style={{
                      width: "0px",
                      paddingRight: "1px",

                    }}
                    id="td"
                  /> */}
                      <TableCell className="first-row-table_address1">
                        Holder
                        <div className="sec-row-table">
                          <div className="word-break">
                            {" "}
                            {addr}
                            <CopyToClipboard
                              text={addr}
                              onCopy={() => setCopiedText(addr)}
                            >
                              <Tooltip
                                title={
                                  copiedText === addr
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
                            <Popup
                              trigger={<ImQrcode className="imQrcode" />}
                              lockScroll
                              modal
                            >
                              {(close) => (
                                <div className="popup_qr">
                                  <CloseIcon
                                    isDesktop={false}
                                    src="/images/XDC-Cross.svg"
                                    // className="qrClose"
                                    onClick={close}
                                  />
                                  <p>
                                    <div>
                                      <div className="header-popup">
                                        <Row alignItems="center">{addr}</Row>
                                        <CloseIcon
                                          isDesktop={true}
                                          src="/images/XDC-Cross.svg"
                                          // className="qrClose"
                                          onClick={close}
                                        />
                                        {/* &times; */}
                                        {/* </img> */}
                                      </div>
                                      {window.innerWidth > 767 ? (
                                        <QRCode
                                          size={320}
                                          style={{
                                            height: 400,
                                            width: 400,
                                            marginTop: "0.625rem",
                                          }}
                                          value={addr}
                                        />
                                      ) : (
                                        <QRCode
                                          // style={{window.innerWidth > 768 ? '800px' : '400px'}}
                                          size={320}
                                          className="qrcode-label"
                                          //style={{ height: 400, width: 400, marginTop: '0.625rem' }}
                                          value={addr}
                                        />
                                      )}
                                    </div>
                                  </p>
                                </div>
                              )}
                            </Popup>
                            {/* <Popup
                              trigger={
                                <ImQrcode
                                  style={{
                                    marginLeft: "10px",
                                    marginBottom: "2px",
                                    cursor: "pointer",
                                  }}
                                />
                              }
                              modal
                            >
                              {(close) => (
                                <div className="popup_qr">
                                  <p>
                                    <div>
                                      <button
                                        style={{
                                          outline: "none",
                                          width: "0px",
                                          height: "0px",
                                          marginLeft: "0px",
                                        }}
                                        className="close"
                                        onClick={close}
                                      >
                                        &times;
                                      </button>
                                      <div
                                        className="header"
                                        style={{
                                          fontSize: "11.5px",
                                          paddingTop: "5px",
                                          paddingBottom: "22px",
                                        }}
                                      >
                                        {" "}
                                        {addr}{" "}
                                      </div>
                                      <QRCode
                                        size={320}
                                        style={{ height: 320, width: 320 }}
                                        value={addr}
                                      />
                                    </div>
                                  </p>
                                </div>
                              )}
                            </Popup> */}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="first-row-table_address-balance">
                        Balance
                        <div className="sec-row-table">
                          {" "}
                          {holder[0]?.Holder_token_balance} XDC
                          {/* ({ReactHtmlParser(convertCurrency)} {coinValue}) */}
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="first-row-table_address-balance">
                        Transfers
                        <div className="sec-row-table">
                          {" "}
                          {holder[0]?.Total_transfes_transactions_Count}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="first-row-table_address">
                        Contract Address
                        <div className="sec-row-table">
                          {holder[0]?.Contract_address}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Paper>
            <br />
            <br />
            <TabComponent
              toggleTab={toggleTab}
              toggleState={toggleState}
              transactions={transactions}
              decimal={decimal}
              contractAddress={contractAddress}
              addr={addr}
            />
            {/* <div className="container_sec">
              <div className="block_sec">
                <div className="bloc-tabs_sec">
                  <button
                    className={
                      toggleState === 1
                        ? "tabs_sec active-tabs_sec"
                        : "tabs_sec"
                    }
                    onClick={() => toggleTab(1)}
                  >
                    Transfers
                  </button>
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
                  <HolderTableComponent
                    trans={transactions}
                    decimal={decimal}
                  />
                </div> */}

            {/* <div
                  className={
                    toggleState === 2
                      ? "content_sec  active-content_sec"
                      : "content_sec"
                  }
                >
                  <HolderTableComponent  />
                </div> */}
            {/* </div>
            </div> */}
          </Grid>
          <FooterComponent />
        </div>
      </MobileView>
    </>
  );
}

const TabComponent = ({
  toggleTab,
  toggleState,
  transactions,
  decimal,
  contractAddress,
  addr,
}) => {
  return (
    <div className="container_sec_holder">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
          height: "25px",
          borderBottom: "solid 1px #e3e7eb",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "transparent",
          }}
        >
          <button
            className={
              toggleState === 1 ? "tabs-data active-tabs-token" : "tabs-data"
            }
            onClick={() => toggleTab(1)}
          >
            Transfers
          </button>
          <button
            className={
              toggleState === 2
                ? "tabs-data active-tabs-token-holder"
                : "tabs-data"
            }
            onClick={() => toggleTab(2)}
          >
            Analytics
          </button>
        </div>
      </div>

      <div
        className={
          toggleState === 1 ? "content_sec  active-content_sec" : "content_sec"
        }
      >
        <HolderTableComponent trans={transactions} decimal={decimal} />
      </div>

      <div
        className={
          toggleState === 2 ? "content_sec  active-content_sec" : "content_sec"
        }
      >
        <HolderAnalytics
          walletAddress={addr}
          contractAddress={contractAddress}
        />
      </div>
    </div>
  );
};
