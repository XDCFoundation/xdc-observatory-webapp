import React, { useEffect, useState } from "react";
import "../../../src/assets/styles/blocksAndTransactionList.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import { Grid, TableContainer } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";
import Utility, { dispatchAction } from "../../utility";
import { useParams } from "react-router-dom";
import AddressData from "../../services/address";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../assets/loader";
import styled from "styled-components";
import format from "format-number";
import { messages } from "../../constants";
import PageSelector from "../common/pageSelector";

export default function TransactionTableComponent(props) {
  console.log(props,"<<<<<<<<")
  const { state } = props;
  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }
  let { addr } = useParams();
  let { addressNumber } = useParams();
  const [from, setFrom] = React.useState(parseInt(0));
  const [amount, setAmount] = React.useState(parseInt(10));
  const [address, setAddress] = useState([]);
  const [ContractAddress, setContractAddress] = useState(addressNumber);
  const [keywords, setKeywords] = useState("");
  const [creationTransaction, setCreationTransaction] = useState("");
  const [reportaddress, setReportaddress] = useState([]);
  const [downloadaddress, setDownloadaddress] = useState([]);
  const [isDownloadActive, setDownloadActive] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [noData, setNoData] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setLoading] = useState(true);
  let datas = {};
  const useStyles = makeStyles({
    container: {
      borderRadius: "14px",
      boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
      borderBottom: "none",
      background: "#fff",
    },
    customTooltip: {
      fontSize: "13px",
    },
    customTooltipDarkMode: {
      background: "#051440",
      color: "#adc4e4",
      fontSize: "13px",
    },
  });
  const getContractDetails = async (values) => {
    try {
      if(creationTransaction) 
        values["hash"] = creationTransaction;
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getAddressDetailWithlimit(values)
      );
      if (!responseData || responseData.length === 0) {
        setNoData(true);
        setTotalRecord(parseInt(0));
        setAddress([]);
        setLoading(false);
        return;
      }
      setNoData(false)
      let transactionSortByValue = responseData.sort((a, b) => {
        return Number(b.value) - Number(a.value);
      });

      setVisibleCount(responseData.length);
      if (transactionSortByValue && transactionSortByValue.length > 0) {
        setAddress(transactionSortByValue);
        setLoading(false);
      } else {
        setNoData(true);
        setTotalRecord(parseInt(0));
        setAddress([]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getTransactionsCountForAddress = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getTransactionsCountForAddress(data)
      );
      if (!responseData) {
        setNoData(true);
      }
      setTotalRecord(parseInt(responseData));
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyUp = (event) => {
    let searchkeyword = event.target.value;
    setFrom(parseInt(0));
    if (searchkeyword.length > 2) {
      setKeywords(searchkeyword);
      datas = {
        pageNum: 0,
        perpage: amount,
        keywords: searchkeyword,
        addrr: ContractAddress,
        hash: props?.hash,
      };
      getContractDetails(datas);
    }
    if (searchkeyword.length == 0) {
      setNoData(false);
      setKeywords("");
      setFrom(parseInt(0));
      datas = {
        pageNum: 0,
        perpage: amount,
        addrr: ContractAddress,
        keywords: "",
        hash: props?.hash,
      };
      getContractDetails(datas);
    }
  };
  const handleChangePage = (action) => {
    if (action == "first") {
      setFrom(parseInt(0));
      if (keywords) {
        datas = {
          pageNum: 0,
          perpage: amount,
          addrr: ContractAddress,
          keywords: keywords,
          hash: props?.hash,
        };
        getContractDetails(datas);
      } else {
        datas = {
          pageNum: 0,
          perpage: amount,
          addrr: ContractAddress,
          keywords: "",
          hash: props?.hash,
        };
        getContractDetails(datas);
      }
    }
    if (action === "last") {
      let pagecount =
        (Math.ceil(parseInt(totalRecord) / parseInt(amount)) - 1) * amount;
      setFrom(parseInt(pagecount));
      if (keywords) {
        datas = {
          pageNum: pagecount,
          perpage: amount,
          addrr: ContractAddress,
          keywords: keywords,
          hash: props?.hash,
        };
        getContractDetails(datas);
      } else {
        datas = {
          pageNum: pagecount,
          perpage: amount,
          addrr: ContractAddress,
          keywords: keywords,
          hash: props?.hash,
        };
        getContractDetails(datas);
      }
    }

    if (action === "next") {
      if (+amount + +from < totalRecord) {
        let pagecount = +amount + +from;
        setFrom(parseInt(pagecount));
        if (keywords) {
          datas = {
            pageNum: pagecount,
            perpage: amount,
            addrr: ContractAddress,
            keywords: keywords,
            hash: props?.hash,
          };
          getContractDetails(datas);
        } else {
          let datas = {
            pageNum: pagecount,
            perpage: amount,
            addrr: ContractAddress,
            keywords: keywords,
            hash: props?.hash,
          };

          getContractDetails(datas);
        }
      }
    }

    if (action === "prev") {
      if (+from - +amount >= 0) {
        let pagecount = +from - +amount;
        setFrom(parseInt(pagecount));
        if (keywords) {
          datas = {
            pageNum: pagecount,
            perpage: amount,
            addrr: ContractAddress,
            keywords: keywords,
            hash: props?.hash,
          };
          getContractDetails(datas);
        } else {
          datas = {
            pageNum: pagecount,
            perpage: amount,
            addrr: ContractAddress,
            keywords: keywords,
            hash: props?.hash,
          };
          getContractDetails(datas);
        }
      }
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setAmount(parseInt(event.target.value));
    setFrom(parseInt(0));
    datas = {
      pageNum: 0,
      perpage: event.target.value,
      addrr: ContractAddress,
      keywords: keywords,
      hash: props?.hash,
    };
    getContractDetails(datas);
  };

  const handleChanged = (event) => {
    const { name, checked } = event.target;
    if (name === "allselect") {
      let tempAddress = address.map((addr) => {
        return { ...addr, isChecked: checked };
      });
      setAddress(tempAddress);
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked === true) {
          return addr;
        }
      });
      if (tempAddr.length > 0) {
        setDownloadActive(1);
      } else {
        setDownloadActive(0);
      }

      setDownloadaddress(
        tempAddress.map((d) => {
          return {
            TransactionHash: d.hash,
            Date: moment(d.timestamp * 1000).format("DD/MM/YYYY hh:mm:ss"),
            Block: d.blockNumber,
            From: d.from,
            To: d.to,
            Value: d.Value,
          };
        })
      );
    } else {
      let tempAddress = address.map((addr) =>
        addr._id === name ? { ...addr, isChecked: checked } : addr
      );
      setAddress(tempAddress);
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked === true) {
          return addr;
        }
      });
      if (tempAddr.length > 0) {
        setDownloadActive(1);
      } else {
        setDownloadActive(0);
      }
      setDownloadaddress(
        tempAddr.map((d) => {
          return {
            TransactionHash: d.hash,
            Date: moment(d.timestamp * 1000).format("DD/MM/YYYY hh:mm:ss"),
            Block: d.blockNumber,
            From: d.from,
            To: d.to,
            Value: d.Value,
          };
        })
      );
    }
  };
  React.useEffect(() => {

    setContractAddress(addressNumber);
    setCreationTransaction(props?.contractData?.creationTransaction)
    let values = {
      addrr: ContractAddress,
      pageNum: from,
      perpage: amount,
      keywords: keywords,
      hash: props?.hash,
    };
    getContractDetails(values);
    let data = {
      address: ContractAddress,
    };
    getTransactionsCountForAddress(data);
    setLoading(false);
  }, [props.hash]);
  const classes = useStyles();
  const history = useHistory();

  const NoDataFoundContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #c6cbcf;
    margin: 100px 0 !important;

    //@media (min-width: 767px) {
    //  margin: 100px 0 !important;
    //}
  `;

  //tooltip states
  const [downloadCsvTT, setDownloadCsvTT] = React.useState(false);
  const [hashTT, setHashTT] = React.useState(false);
  const [ageTT, setageTT] = React.useState(false);
  const [blockTT, setblockTT] = React.useState(false);
  const [fromTT, setfromTT] = React.useState(false);
  const [toTT, settoTT] = React.useState(false);
  const [valueTT, setvalueTT] = React.useState(false);
  const [gasTT, setgasTT] = React.useState(false);
  return (
    <div>
      <div className="content_input_all cont-tab-contract">
        <div className="searchelement-input4 search-btn">
          {/* <img
            style={{ width: 18, height: 18, marginRight: 5, marginTop: 3 }}
            src={"/images/Search.svg"}
          />
          } <input
            onKeyUp={(event) => props._handleSearch(event)}
            className="account-searchbar"
            type="text"
            placeholder="Search"
            onKeyUp={handleKeyUp}
  />*/}
        </div>
        {noData == false ? (
          <>
            {isDownloadActive ? (
              <CSVLink
                filename={"Transactions.csv"}
                data={downloadaddress}
                style={
                  props.theme === "dark"
                    ? {
                        fontSize: "0.938rem",
                        color: "#ffffff",
                        textAlign: "center",
                        backgroundColor: "#283966",
                        borderRadius: "0.25rem",
                        width: "5.875rem",
                        height: "2.125rem",
                        paddingTop: "0.125rem",
                      }
                    : {
                        fontSize: "0.938rem",
                        color: "#ffffff",
                        textAlign: "center",
                        backgroundColor: "rgb(7 125 245)",
                        borderRadius: "0.25rem",
                        width: "5.875rem",
                        height: "2.125rem",
                        paddingTop: "0.125rem",
                      }
                }
              >
                Export
              </CSVLink>
            ) : (
              <Tooltip
                open={downloadCsvTT}
                onOpen={() => setDownloadCsvTT(true)}
                onClose={() => setDownloadCsvTT(false)}
                placement="top"
                title={messages.DOWNLOAD_CSV}
                classes={{
                  tooltip:
                    props.theme === "dark"
                      ? classes.customTooltipDarkMode
                      : classes.customTooltip,
                }}
              >
                <div
                  onClick={() => setDownloadCsvTT(!downloadCsvTT)}
                  style={
                    props.theme === "dark"
                      ? {
                          fontSize: "0.938rem",
                          textAlign: "center",
                          color: "#ffffff",
                          backgroundColor: "#283966",
                          borderRadius: "0.25rem",
                          width: "5.875rem",
                          height: "2.125rem",
                          paddingTop: "0.125rem",
                          opacity: 0.7,
                        }
                      : {
                          fontSize: "0.938rem",
                          textAlign: "center",
                          color: "#ffffff",
                          backgroundColor: "#e3e7eb",
                          borderRadius: "0.25rem",
                          width: "5.875rem",
                          height: "2.125rem",
                          paddingTop: "0.125rem",
                        }
                  }
                >
                  <CSVLink
                    filename={"Transactions.csv"}
                    data={downloadaddress}
                    style={
                      props.theme === "dark"
                        ? {
                            pointerEvents: "none",
                            fontSize: "0.938rem",
                            textAlign: "center",
                            color: "#ffffff",
                          }
                        : {
                            pointerEvents: "none",
                            fontSize: "0.938rem",
                            textAlign: "center",
                            color: "#ffffff",
                          }
                    }
                  >
                    Export
                  </CSVLink>
                </div>
              </Tooltip>
            )}
          </>
        ) : (
          ""
        )}
      </div>

      <Grid lg={13} className="tablegrid_address">
        <Paper
          style={{ borderRadius: "14px" }}
          elevation={0}
          className={
            props.theme === "dark"
              ? "table-paper-contract table-bg-dark"
              : "table-paper-contract"
          }
        >
          <TableContainer
            className={
              props.theme === "dark"
                ? `${classes.container} table-bg-dark`
                : classes.container
            }
            id="container-table table-cont"
          >
            <Table className="table-trans-contract">
              <TableHead>
                <TableRow
                  className={props.theme === "dark" ? "table-bg-dark" : ""}
                >
                  <TableCell
                    className="w-31"
                    style={{ border: "none", display: "flex", flexFlow: "nowrap" }}
                    align="left"
                  >
                    {noData == false && (
                      <input
                        onChange={handleChanged}
                        type="checkbox"
                        name="allselect"
                        checked={ address.length > 0 ?
                          address.filter((addr) => addr?.isChecked == true)
                            .length == address.length : false
                        }
                        style={{ marginRight: "8px", marginTop: window.innerWidth < 768 ? "2px" : window.innerWidth > 1240 ? "2px": "3px" }}
                      />
                    )}
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-hash fc-white"
                          : "tableheaders table-hash"
                      }
                    >
                      Transaction Hash
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.HASH}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={hashTT}
                          onOpen={() => setHashTT(true)}
                          onClose={() => setHashTT(false)}
                          placement="top"
                          title={messages.HASH}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => setHashTT(!hashTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-16 w-19"
                    style={{ border: "none", paddingLeft: "1.8%" }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-age fc-white"
                          : "tableheaders table-age"
                      }
                    >
                      Age
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.AGE}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={ageTT}
                          onOpen={() => setageTT(true)}
                          onClose={() => setageTT(false)}
                          placement="top"
                          title={messages.AGE}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => setageTT(!ageTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-450 w-19"
                    style={{ border: "none", paddingLeft: "1.8%" }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-block fc-white bg-transparent-dark"
                          : "tableheaders table-block"
                      }
                    >
                      Block
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.BLOCK}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={blockTT}
                          onOpen={() => setblockTT(true)}
                          onClose={() => setblockTT(false)}
                          placement="top"
                          title={messages.BLOCK}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => setblockTT(!blockTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-450 w-19"
                    style={{ border: "none", paddingLeft: "1.8%" }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-from fc-white"
                          : "tableheaders table-from"
                      }
                    >
                      From
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.FROM}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={fromTT}
                          onOpen={() => setfromTT(true)}
                          onClose={() => setfromTT(false)}
                          placement="top"
                          title={messages.FROM}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => setfromTT(!fromTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-450 w-18"
                    style={{ border: "none", paddingLeft: "1.8%" }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-to fc-white"
                          : "tableheaders table-to"
                      }
                    >
                      To
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.TO}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={toTT}
                          onOpen={() => settoTT(true)}
                          onClose={() => settoTT(false)}
                          placement="top"
                          title={messages.TO}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => settoTT(!toTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-450 "
                    style={{ border: "none", paddingLeft: "1.8%" }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-value fc-white"
                          : "tableheaders table-value"
                      }
                    >
                      Value
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.VALUE}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={valueTT}
                          onOpen={() => setvalueTT(true)}
                          onClose={() => setvalueTT(false)}
                          placement="top"
                          title={messages.VALUE}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => setvalueTT(!valueTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-450 "
                    style={{ border: "none", paddingLeft: "1.8%" }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-value fc-white"
                          : "tableheaders table-value"
                      }
                    >
                      Avg Txn Fee
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.GAS}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={gasTT}
                          onOpen={() => setgasTT(true)}
                          onClose={() => setgasTT(false)}
                          placement="top"
                          title={messages.GAS}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => setgasTT(!gasTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
                  {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                </TableRow>
              </TableHead>
              {isLoading === true ? (
                <TableBody>
                  <TableRow>
                    <TableCell style={{ border: "none" }} colspan="6">
                      <div className="loader-address-details-list">
                        <Loader />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                noData == false && (
                  <TableBody>
                    {address.map((row, index) => {
                      console.log(row,">>>>>>>>>>>")
                      const currentTime = new Date();
                      const previousTime = new Date(row.timestamp * 1000);
                      const TimeAge = Utility.timeDiff(
                        currentTime,
                        previousTime
                      );
                      return (
                        <TableRow
                          style={
                            index % 2 !== 1
                              ? props.theme === "dark"
                                ? { background: "#192a59" }
                                : { background: "#f9f9f9" }
                              : props.theme === "dark"
                              ? { background: "#192a59" }
                              : { background: "white" }
                          }
                        >
                          <TableCell
                            style={{ border: "none", display: "flex", flexFlow: "nowrap" }}
                            margin-left="5px"
                          >
                            <input
                              key={row._id}
                              name={row._id}
                              onChange={handleChanged}
                              type="checkbox"
                              checked={row?.isChecked || false}
                              //checked={checkAll}
                              style={{ marginRight: "8px", marginTop: window.innerWidth < 768 ? "5px" : window.innerWidth > 1240 ? "7px": "8px"}}
                            />

                            <a
                              className={
                                props.theme === "dark"
                                  ? "linkTable fc-4878ff"
                                  : "linkTable"
                              }
                              href={"/transaction-details/" + row.hash}
                            >
                              <Tooltip
                                placement="top"
                                title={row.hash}
                                classes={{
                                  tooltip:
                                    props.theme === "dark"
                                      ? classes.customTooltipDarkMode
                                      : classes.customTooltip,
                                }}
                              >
                                <span className="tabledata">
                                  {shorten(row.hash)}{" "}
                                </span>
                              </Tooltip>
                            </a>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <span
                              className={
                                props.theme === "dark"
                                  ? "tabledata fc-b1c3e1"
                                  : "tabledata"
                              }
                            >
                              {TimeAge}
                            </span>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <a
                              className={
                                props.theme === "dark"
                                  ? "linkTable fc-4878ff"
                                  : "linkTable"
                              }
                              href={"/block-details/" + row.blockNumber}
                            >
                              <span className="tabledata">
                                {row.blockNumber}
                              </span>
                            </a>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            {row.from != addr ? (
                              <a
                                className={
                                  props.theme === "dark"
                                    ? "linkTable fc-4878ff"
                                    : "linkTable"
                                }
                                href={"/address-details/" + row.from}
                              >
                                <Tooltip
                                  placement="top"
                                  title={row.from}
                                  classes={{
                                    tooltip:
                                      props.theme === "dark"
                                        ? classes.customTooltipDarkMode
                                        : classes.customTooltip,
                                  }}
                                >
                                  <span className="tabledata">
                                    {" "}
                                    {shorten(row.from)}
                                  </span>
                                </Tooltip>
                              </a>
                            ) : (
                              <Tooltip
                                placement="top"
                                title={row.from}
                                classes={{
                                  tooltip:
                                    props.theme === "dark"
                                      ? classes.customTooltipDarkMode
                                      : classes.customTooltip,
                                }}
                              >
                                <span className="tabledata">
                                  {" "}
                                  {shorten(row.from)}
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            {row.to != addr ? (
                              <a
                                className={
                                  props.theme === "dark"
                                    ? "linkTable fc-4878ff"
                                    : "linkTable"
                                }
                                href={"/address-details/" + row.to}
                              >
                                <Tooltip
                                  placement="top"
                                  title={row.to}
                                  classes={{
                                    tooltip:
                                      props.theme === "dark"
                                        ? classes.customTooltipDarkMode
                                        : classes.customTooltip,
                                  }}
                                >
                                  <span className="tabledata">
                                    {shorten(row.to)}
                                  </span>
                                </Tooltip>
                              </a>
                            ) : (
                              <Tooltip
                                placement="top"
                                title={row.to}
                                classes={{
                                  tooltip:
                                    props.theme === "dark"
                                      ? classes.customTooltipDarkMode
                                      : classes.customTooltip,
                                }}
                              >
                                <span className="tabledata">
                                  {shorten(row.to)}
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <Tooltip
                              placement="top"
                              title={format({})(row.value)}
                              classes={{
                                tooltip:
                                  props.theme === "dark"
                                    ? classes.customTooltipDarkMode
                                    : classes.customTooltip,
                              }}
                            >
                              <span
                                className={
                                  props.theme === "dark"
                                    ? "tabledata fc-b1c3e1"
                                    : "tabledata"
                                }
                              >
                                {Utility.decimalDivison(row.value, 8)}
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <span
                              className={
                                props.theme === "dark"
                                  ? "tabledata fc-b1c3e1"
                                  : "tabledata"
                              }
                            >
                              {Utility.divideByDecimalValue(row?.gasUsed * row?.gasPrice, props?.decimal ?props?.decimal : 18)}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )
              )}
              {/* {noData == true && (
                <TableBody>
                  <TableRow>
                    <TableCell
                      id="td"
                      colspan="6"
                      style={{ borderBottom: 'none' }}
                    >
                      <span className="tabledata" style={{ color: 'black' }}>
                        No transaction found.
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )} */}
            </Table>
            {noData == true && (
              <NoDataFoundContainer>
                <img src={"/images/XDC-Alert.svg"} />

                <div>No Transactions Found</div>
              </NoDataFoundContainer>
            )}
          </TableContainer>
        </Paper>

        <Grid
          container
          style={{
            marginTop: "2.25rem",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="page-container"
        >
          {noData == true || totalRecord < 10 ? (
            ""
          ) : (
            <>
              <Grid className="Pagination_1">
                <span
                  className={props.theme === "dark" ? "text fc-b1c3e1" : "text"}
                >
                  Show
                </span>
                <PageSelector
                  value={amount}
                  height={30}
                  handler={handleChangeRowsPerPage}
                  theme={props.theme}
                />
                <span
                  className={props.theme === "dark" ? "text fc-b1c3e1" : "text"}
                >
                  Records
                </span>
              </Grid>
              <Grid xs="2"></Grid>
            </>
          )}

          {/* {noData == true && totalRecord < amount ? (
            <Grid item xs="7" className="page-tab">
              <button
                style={{ marginLeft: "0px" }}
                onClick={() => handleChangePage("first")}
                className={from === 0 || totalRecord === 0 ? "btn-contract disabled" : "btn-contract"}>
                First
              </button>
              <button
                onClick={() => handleChangePage("prev")}
                className={from === 0 || totalRecord === 0 ? "btn-contract disabled" : "btn-contract"}>
                <img src={"/images/back.svg"} />
              </button>
              <button className="btn-contract">Page 0 of 0</button>
              <button
                onClick={() => handleChangePage("next")}
                className={
                  +from + +amount === totalRecord || totalRecord === 0 ? "btn-contract disabled" : "btn-contract"
                }>
                <img src={"/images/next.svg"} />
              </button>
              <button
                onClick={() => handleChangePage("last")}
                className={
                  +from + +amount === totalRecord || totalRecord === 0 ? "btn-contract disabled" : "btn-contract"
                }>
                Last
              </button>
            </Grid>
          ) : ""} */}

          {noData == false && totalRecord > amount ? (
            <Grid item xs="7" className="page-tab">
              <button
                style={{ marginLeft: "0px" }}
                onClick={() => handleChangePage("first")}
                className={
                  from === 0 || totalRecord === 0
                    ? props.theme === "dark"
                      ? "btn-contract-dark disabled"
                      : "btn-contract disabled"
                    : props.theme === "dark"
                    ? "btn-contract-dark"
                    : "btn-contract"
                }
              >
                First
              </button>
              <button
                onClick={() => handleChangePage("prev")}
                className={
                  from === 0 || totalRecord === 0
                    ? props.theme === "dark"
                      ? "btn-contract-dark disabled"
                      : "btn-contract disabled"
                    : props.theme === "dark"
                    ? "btn-contract-dark"
                    : "btn-contract"
                }
              >
                <img
                  className="rotate-180"
                  src={"/images/next.svg"}
                  alt="back"
                />
              </button>

              <button
                className={
                  props.theme === "dark" ? "btn-contract-dark" : "btn-contract"
                }
              >
                Page{" "}
                {Math.ceil(parseInt(totalRecord) / parseInt(amount)) -
                  Math.ceil(
                    (parseInt(totalRecord) - parseInt(from)) / parseInt(amount)
                  ) +
                  1}{" "}
                of {Math.ceil(parseInt(totalRecord) / parseInt(amount))}
              </button>
              <button
                onClick={() => handleChangePage("next")}
                className={
                  +from + visibleCount === totalRecord ||
                  +from + visibleCount > totalRecord ||
                  totalRecord === 0
                    ? props.theme === "dark"
                      ? "btn-contract-dark disabled"
                      : "btn-contract disabled"
                    : props.theme === "dark"
                    ? "btn-contract-dark"
                    : "btn-contract"
                }
              >
                <img src={"/images/next.svg"} />
              </button>
              <button
                onClick={() => handleChangePage("last")}
                className={
                  +from + visibleCount === totalRecord ||
                  +from + visibleCount > totalRecord ||
                  totalRecord === 0
                    ? props.theme === "dark"
                      ? "btn-contract-dark disabled"
                      : "btn-contract disabled"
                    : props.theme === "dark"
                    ? "btn-contract-dark"
                    : "btn-contract"
                }
              >
                Last
              </button>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
}
