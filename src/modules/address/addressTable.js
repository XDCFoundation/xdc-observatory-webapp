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
import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";
import Utility, { dispatchAction } from "../../utility";
import AddressData from "../../services/address";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../assets/loader";
import styled from "styled-components";
import format from "format-number";
import { messages } from "../../constants";
import TransactionDetailTooltip from "../common/transactionDetailTooltip";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SearchAndFiltersComponent from "./searchAndFiltersComponent";
import PageSelector from "../common/pageSelector";
const SearchAndExportDiv = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const useStyles = makeStyles({
  container: {
    borderRadius: "0.875rem",
    boxShadow: "0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  containerDark: {
    borderRadius: "0.875rem",
    boxShadow: "0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#192a59",
  },
  btn: {
    textAlign: "start",
    padding: "0px",
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
  },
  sortButton: {
    color: "#3763dd",
    height: "20px",
    width: "15px",
    marginLeft: "5px",
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
export default function AddressTableComponent(props) {
  const { state } = props;
  const classes = useStyles();
  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }
  let { addr } = useParams();
  const [address, setAddress] = useState([]);
  const [txtAddress, setTxtAddress] = useState("");
  const [searchAndFilters, setSearchAndFilters] = useState({
    searchQuery: "",
    type: "ALL",
    status: "all",
    startDate: moment(),
    endDate: moment(),
  });
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [reportaddress, setReportaddress] = useState([]);
  const [downloadaddress, setDownloadaddress] = useState([]);
  //const [exports, exportAddress] = useState({});
  //const [toggle, handleToggle] = useState(false);
  const [page, setPage] = React.useState(0);
  const [checkAll, setCheckAll] = React.useState(0);
  const [isDownloadActive, setDownloadActive] = useState(0);
  const [noData, setNoData] = useState(false);
  const [arrowUpDown, setArrowUpDown] = useState(false);
  const [ageArrow, setAgeArrow] = useState(false);
  const [blockArrow, setBlockArrow] = useState(false);
  const [valueArrow, setValueArrow] = useState(false);
  let showPerPage = 10;
  let datas = {};
  let data = {};
  const [rowsPerPage, setRowsPerPage] = React.useState(showPerPage);
  // let isSettingColumnOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState();
  const [sortToggle, setSortToggle] = React.useState({
    blockNumber: 0,
    timestamp: 0,
    from: 0,
    to: 0,
    value: 0,
  });
  const [lastFrom, setLastFrom] = useState(0);
  const [lastPage, setlastPage] = useState(false);
  const [sortingKey, setSortingKey] = React.useState("");
  if (sortToggle["value"] === 1 && sortingKey === "value") {
    address.sort(function (a, b) {
      return Number(b.Value) - Number(a.Value);
    });
  } else if (sortToggle["value"] === -1 && sortingKey === "value") {
    address.sort(function (a, b) {
      return Number(a.Value) - Number(b.Value);
    });
  }

  function handleSettingsClick(event) {
    setOpen(true);
    setAnchorEl(event?.currentTarget);
  }

  const handleChangePage = (action) => {
    if (action == "first") {
      if (keywords) {
        setPage(0);
        setLastFrom(false)
        datas = {
          pageNum: 0,
          perpage: rowsPerPage,
          addrr: addr,
          keywords: keywords,
        };
        getTransactionSearch(datas);
      } else {
        setPage(0);
        setlastPage(false)
        datas = {
          pageNum: 0,
          perpage: rowsPerPage,
          addrr: addr,
          sortKey: sortingKey,
          sortType: sortToggle[sortingKey] == 1 ? -1 : 1,
        };
        getAddressDetails(datas);
      }
    }
    if (action === "last") {
      setlastPage(true)
      setLastFrom(0)
      let pagecount = (Math.ceil(totalRecord / rowsPerPage) - 1) * rowsPerPage;
      setPage(pagecount);
      if (keywords) {
        datas = {
          pageNum: pagecount,
          perpage: rowsPerPage,
          addrr: addr,
          keywords: keywords,
        };
        getTransactionSearch(datas);
      } else {
        let datas = {
          pageNum: lastFrom,
          perpage: rowsPerPage,
          addrr: addr,
          sortKey: "blockNumber",
          sortType: 1,
        };
        getAddressDetails(datas);
      }
    }

    if (action === "next") {
      let pagecount = +rowsPerPage + +page;
      setPage(pagecount);
      if (lastPage === true) {
        if (lastFrom - rowsPerPage >= 0) {
          let from = lastFrom - rowsPerPage
          setLastFrom(from)
          let datas = {
            pageNum: from,
            perpage: rowsPerPage,
            addrr: addr,
            sortKey: "blockNumber",
            sortType: 1
          };
          getAddressDetails(datas);
        }
      } else {
        if (+rowsPerPage + +page < totalRecord) {
          let pagecount = +rowsPerPage + +page;
          setPage(pagecount);
          if (keywords) {
            datas = {
              pageNum: pagecount,
              perpage: rowsPerPage,
              addrr: addr,
              keywords: keywords,
            };
            getTransactionSearch(datas);
          } else {
            let datas = {
              pageNum: pagecount,
              perpage: rowsPerPage,
              addrr: addr,
              sortKey: sortingKey,
              sortType: sortToggle[sortingKey] == 1 ? -1 : 1,
            };
            getAddressDetails(datas);
          }
        }
      }
    }

    if (action === "prev") {
      let pagecount = page - rowsPerPage;
      setPage(pagecount);
      if (lastPage === true) {

        let from = lastFrom + rowsPerPage
        setLastFrom(from)
        let datas = {
          pageNum: from,
          perpage: rowsPerPage,
          addrr: addr,
          sortKey: "blockNumber",
          sortType: 1
        };
        getAddressDetails(datas);

      } else {
        if (page - rowsPerPage >= 0) {
          let pagecount = page - rowsPerPage;
          setPage(pagecount);
          if (keywords) {
            datas = {
              pageNum: pagecount,
              perpage: rowsPerPage,
              addrr: addr,
              keywords: keywords,
            };
            getTransactionSearch(datas);
          } else {
            let datas = {
              pageNum: pagecount,
              perpage: rowsPerPage,
              addrr: addr,
              sortKey: sortingKey,
              sortType: sortToggle[sortingKey] == 1 ? -1 : 1,
            };
            getAddressDetails(datas);
          }
        }
      }

    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    // setPage(0);
    lastPage === false ?
      datas = {
        pageNum: 0,
        perpage: event.target.value,
        addrr: addr,
        sortKey: sortingKey,
        sortType: sortToggle[sortingKey] == 1 ? -1 : 1,
      } : datas = {
        pageNum: lastFrom,
        perpage: event.target.value,
        addrr: addr,
        sortKey: "blockNumber",
        sortType: 1,
      }
    getAddressDetails(datas);
  };

  const getAddressDetails = async (data, filters) => {
    const skip = Number(data?.pageNum) || 0;
    const limit = 100;
    const sortKey = data?.sortKey || "blockNumber";
    const sortType = data?.sortType;
    const requestData = { skip, limit, sortKey, sortType };
    requestData.address = data?.addrr || addr;
    const filtersData = filters || searchAndFilters;
    if (filtersData.searchQuery) {
      requestData.searchValue = filtersData.searchQuery;
      requestData.searchKeys = ["from", "to", "hash", "blockNumber"];
    }
    if (filtersData.type && filtersData.type !== "ALL")
      requestData.txnType = filtersData.type;
    if (filtersData.status && filtersData.status !== "all")
      requestData.status = filtersData.status;
    if (
      filtersData?.startDate?.toDate().toDateString() !==
      filtersData?.endDate?.toDate().toDateString()
    ) {
      if (filtersData.startDate)
        requestData.startDate = filtersData?.startDate?.toDate()?.getTime();
      if (filtersData.endDate)
        requestData.endDate = filtersData?.endDate?.toDate()?.getTime();
    }
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getFilteredAddressDetailWithLimit(requestData)
      );
      getTransactionsCountForAddress(requestData);
      if (responseData && responseData.length > 0) {
        setNoData(false);
        setLoading(false);
        parseResponseData(responseData, 1);
      } else {
        setNoData(true);
        setLoading(false);
        setBalance(parseFloat(0).toFixed(2));
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

  const getFiltersForAccountTransaction = async (data) => {
    const [error, responseData] = await Utility.parseResponse(
      AddressData.getFiltersForAccountTransaction(data)
    );
    setSearchAndFilters({
      ...searchAndFilters,
      startDate: error ? moment() : moment(responseData.startDate),
    });
  };
  useEffect(() => {
    //let address =props.trans
    datas = {
      pageNum: page,
      perpage: rowsPerPage,
      addrr: addr,
      sortKey:"blockNumber",
      sortType:"-1"
    };
    data = {
      addrr: addr,
    };
    // getFiltersForAccountTransaction({address: addr});
    getAddressDetails(datas);
    sortData("blockNumber");
  }, []);
  const sortData = async (sortKey) => {
    setArrowUpDown(false);
    let sortType = sortToggle[sortKey];
    if (sortType === 1) {
      // setLoading(true)
      getAddressDetails({
        pageNum: page,
        perpage: rowsPerPage,
        addrr: addr,
        sortKey: sortKey,
        sortType: sortType,
      });
      setSortToggle({ ...sortToggle, [sortKey]: -1 });

      setSortingKey(sortKey);

      setArrowUpDown(true);
    } else {
      // setLoading(true)
      getAddressDetails({
        pageNum: page,
        perpage: rowsPerPage,
        addrr: addr,
        sortKey: sortKey,
        sortType: sortType,
      });
      setSortToggle({ ...sortToggle, [sortKey]: 1 });
      setSortingKey(sortKey);

      setArrowUpDown(true);
    }
  };
  const getSortTitle = (sortKey) => {
    if (sortToggle[sortKey] === 1) return "Ascending";
    else return "Descending";
  };
  const getTransactionSearch = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getTransactionSearch(data)
      );
      if (responseData.responseTransaction.length > 0) {
        setNoData(false);
        parseResponseData(responseData, 2);
      } else {
        setNoData(true);
        setBalance(parseFloat(0).toFixed(2));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const parseResponseData = async (Recdata, type) => {
    let trxn = [];
    if (type == 1) {
      trxn = Recdata;
    } else {
      trxn = Recdata.responseTransaction;
    }
    setAddress(
      trxn.map((d) => {
        return {
          Txn_Hash: d.hash,
          Age: d.timestamp,
          Block: d.blockNumber,
          Block_Hash: d.blockHash,
          From: d.from,
          To: d.to,
          Value:
            Number(d?.value) < 10000000000
              ? Number(d?.value * 1000000000000000000)
              : d.value,
          contractAddress: d.contractAddress,
          id: d._id,
        };
      })
    );

    setReportaddress(
      trxn.map((d) => {
        return {
          Txn_Hash: d.hash,
          Age: d.timestamp,
          Block: d.blockNumber,
          From: d.from,
          To: d.to,
          Value: Utility.decimalDivison(d.Value, 8),
        };
      })
    );

    setDownloadaddress(
      trxn.map((d) => {
        return {
          TransactionHash: d.hash,
          Date: moment(d.timestamp * 1000).format("MMM DD, YYYY h:mm A"),
          Block: d.blockNumber,
          From: d.from,
          To: d.to,
          Value:
            d?.value < 10000000000
              ? Number(d?.value * 1000000000000000000)
              : Utility.decimalDivisonOnly(d.value, 8),
        };
      })
    );
  };
  // const handleKeyUp = (event) => {
  //   let searchkeyword = event.target.value;
  //   setPage(0);
  //   if (searchkeyword.length > 2) {
  //     setKeywords(searchkeyword);
  //     datas = {
  //       pageNum: 0,
  //       perpage: rowsPerPage,
  //       addrr: addr,
  //       keywords: searchkeyword,
  //     };
  //     getTransactionSearch(datas);
  //   }
  //   if (searchkeyword.length == 0) {
  //     setPage(0);
  //     datas = {
  //       pageNum: 0,
  //       perpage: rowsPerPage,
  //       addrr: addr,
  //     };
  //     getAddressDetails(datas);
  //   }
  // };

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
            TransactionHash: d.Txn_Hash,
            Date: moment(d.Age * 1000).format("MMM DD, YYYY h:mm A"),
            Block: d.Block,
            From: d.From,
            To: d.To,
            Value:
              d?.Value < 10000000000
                ? Number(d?.Value * 1000000000000000000)
                : Utility.decimalDivisonOnly(d.Value, 8),
          };
        })
      );
    } else {
      let tempAddress = address.map((addr) =>
        addr.id === name ? { ...addr, isChecked: checked } : addr
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
            TransactionHash: d.Txn_Hash,
            Date: moment(d.Age * 1000).format("MMM DD, YYYY h:mm A"),
            Block: d.Block,
            From: d.From,
            To: d.To,
            Value:
              d?.Value < 10000000000
                ? Number(
                  d?.Value * 1000000000000000000
                ) /*there are some transactions which are not in gwei in ou DB*/
                : Utility.decimalDivisonOnly(d.Value, 8),
          };
        })
      );
    }
  };

  const NoDataFoundContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
    gap: 10px;
    color: #c6cbcf;
    @media (min-width: 767px) {
      margin: 100px 0 !important;
    }
  `;

  //Tooltip States
  const [hashTT, setHashTT] = React.useState(false);
  const [ageTT, setageTT] = React.useState(false);
  const [blockTT, setblockTT] = React.useState(false);
  const [fromTT, setfromTT] = React.useState(false);
  const [toTT, settoTT] = React.useState(false);
  const [valueTT, setValueTT] = React.useState(false);
  const [downloadCsvTT, setDownloadCsvTT] = React.useState(false);
  const updateFiltersAndGetAccounts = async (filters) => {
    await setSearchAndFilters(filters);
    if (
      filters.searchQuery ||
      filters.type ||
      filters.status !==
      "all" /*|| filters.startDate?.format("D MMM, YYYY") !== filters.endDate?.format("D MMM, YYYY")*/
    )
      setLoading(true);
    getAddressDetails({}, filters);
  };

  return (
    <div>
      <SearchAndExportDiv>
        <SearchAndFiltersComponent
          searchAndFilters={searchAndFilters}
          updateFiltersAndGetAccounts={updateFiltersAndGetAccounts}
          theme={props.theme}
        />
        <div>
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
                    float: 'right'
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
                    float: "right"
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
                      float: "right"
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
                      float: "right"
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
        )}</div>
      </SearchAndExportDiv>

      <Grid lg={13} className="tablegrid_address_details">
        <div
          style={{ borderRadius: "0.75rem" }}
          elevation={0}
          className="table-paper paper-table"
        >
          <TableContainer
            className={
              props.theme === "dark" ? classes.containerDark : classes.container
            }
            id="container-table table-cont"
          >
            <Table className="table-trans">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="w-31 w-850"
                    style={{ border: "none", paddingTop: "1.375rem" }}
                    align="left"
                  >
                    <input
                      onChange={handleChanged}
                      type="checkbox"
                      name="allselect"
                      // checked={
                      //   address.filter((addr) => addr?.isChecked == true)
                      //     .length == address.length
                      // }
                      style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
                    />
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
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-16 w-19"
                    style={{
                      border: "none",
                      paddingLeft: "1.6%",
                      paddingTop: "1.375rem",
                    }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-age cursor-pointer fc-white"
                          : "tableheaders table-age cursor-pointer"
                      }
                      onClick={() => {
                        sortData("blockNumber");
                        setAgeArrow(true);
                        setBlockArrow(false);
                      }}
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
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      )}
                    </span>
                    <Tooltip
                      placement="top"
                      title={getSortTitle("blockNumber")}
                      classes={{
                        tooltip:
                          props.theme === "dark"
                            ? classes.customTooltipDarkMode
                            : classes.customTooltip,
                      }}
                    >
                      {sortingKey &&
                        ageArrow &&
                        sortingKey === "blockNumber" ? (
                        sortToggle.blockNumber == -1 ? (
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon rotate-180"
                          />
                        ) : (
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        )
                      ) : (
                        <></>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    className="w-450 w-19"
                    style={{
                      border: "none",
                      paddingLeft: "1.6%",
                      paddingTop: "1.375rem",
                    }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-block-dark cursor-pointer fc-white"
                          : "tableheaders table-block cursor-pointer"
                      }
                      onClick={() => {
                        sortData("blockNumber");
                        setAgeArrow(false);
                        setBlockArrow(true);
                      }}
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
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      )}
                    </span>
                    <Tooltip
                      placement="top"
                      title={getSortTitle("blockNumber")}
                      classes={{
                        tooltip:
                          props.theme === "dark"
                            ? classes.customTooltipDarkMode
                            : classes.customTooltip,
                      }}
                    >
                      {blockArrow &&
                        sortingKey &&
                        sortingKey === "blockNumber" ? (
                        sortToggle.blockNumber == -1 ? (
                          // <ArrowUpwardIcon
                          // onClick={() => {
                          //   sortData("blockNumber");
                          // }}
                          //   className={classes.sortButton}
                          // />
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon rotate-180"
                          />
                        ) : (
                          // <ArrowDownwardIcon
                          //   onClick={() => {
                          //     sortData("blockNumber");
                          //   }}
                          //   className={classes.sortButton}
                          // />
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        )
                      ) : (
                        <></>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    className="w-450 w-19"
                    style={{
                      border: "none",
                      paddingLeft: "1.5%",
                      paddingTop: "1.375rem",
                    }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-from cursor-pointer fc-white"
                          : "tableheaders table-from cursor-pointer"
                      }
                      onClick={() => {
                        sortData("from");
                      }}
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
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      )}
                    </span>
                    <button className={classes.btn}>
                      <Tooltip
                        placement="top"
                        title={getSortTitle("from")}
                        classes={{
                          tooltip:
                            props.theme === "dark"
                              ? classes.customTooltipDarkMode
                              : classes.customTooltip,
                        }}
                      >
                        {sortingKey && sortingKey === "from" ? (
                          sortToggle.from == 1 ? (
                            // <ArrowUpwardIcon
                            //   onClick={() => {
                            //     sortData("from");
                            //   }}
                            //   className={classes.sortButton}
                            // />
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon rotate-180"
                            />
                          ) : (
                            // <ArrowDownwardIcon
                            //   onClick={() => {
                            //     sortData("from");
                            //   }}
                            //   className={classes.sortButton}
                            // />
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          )
                        ) : (
                          <></>
                        )}
                      </Tooltip>
                    </button>
                  </TableCell>
                  <TableCell
                    className=""
                    style={{
                      border: "none",
                      paddingLeft: "1.5%",
                      paddingTop: "1.375rem",
                    }}
                    align="left"
                  >
                    <span className={"tableheaders table-value"} />
                  </TableCell>
                  <TableCell
                    className="w-450 w-18"
                    style={{
                      border: "none",
                      paddingLeft: "1.5%",
                      paddingTop: "1.375rem",
                    }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-to cursor-pointer fc-white"
                          : "tableheaders table-to cursor-pointer"
                      }
                      onClick={() => {
                        sortData("to");
                      }}
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
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      )}
                    </span>
                    <button className={classes.btn}>
                      <Tooltip
                        placement="top"
                        title={getSortTitle("to")}
                        classes={{
                          tooltip:
                            props.theme === "dark"
                              ? classes.customTooltipDarkMode
                              : classes.customTooltip,
                        }}
                      >
                        {sortingKey && sortingKey === "to" ? (
                          sortToggle.to == 1 ? (
                            // <ArrowUpwardIcon
                            //   onClick={() => {
                            //     sortData("to");
                            //   }}
                            //   className={classes.sortButton}
                            // />
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon rotate-180"
                            />
                          ) : (
                            // <ArrowDownwardIcon
                            //   onClick={() => {
                            //     sortData("from");
                            //   }}
                            //   className={classes.sortButton}
                            // />
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          )
                        ) : (
                          <></>
                        )}
                      </Tooltip>
                    </button>
                  </TableCell>
                  <TableCell
                    className="w-450 "
                    style={{
                      border: "none",
                      paddingLeft: "1.5%",
                      paddingTop: "1.375rem",
                    }}
                    align="left"
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders table-value cursor-pointer fc-white"
                          : "tableheaders table-value cursor-pointer"
                      }
                      onClick={() => {
                        sortData("value");
                        setValueArrow(true);
                      }}
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
                          onOpen={() => setValueTT(true)}
                          onClose={() => setValueTT(false)}
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
                            onClick={() => setValueTT(!valueTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      )}
                    </span>
                    <button className={classes.btn}>
                      <Tooltip placement="top" title={getSortTitle("value")}>
                        {valueArrow && sortingKey && sortingKey === "value" ? (
                          sortToggle.value == -1 ? (
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon rotate-180"
                            />
                          ) : (
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          )
                        ) : (
                          <></>
                        )}
                      </Tooltip>
                    </button>
                  </TableCell>
                  {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                </TableRow>
              </TableHead>
              {isLoading == true ? (
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
                     if(index >= rowsPerPage ) return; 
                      const TimeAge = !row.Age
                        ? ""
                        : moment(row.Age * 1000).format("MMM DD, YYYY h:mm A");

                        const valueToShowOnTooltip =
                        row.Value > 0 && row.Value < 1
                          ? row.Value
                          : Utility.decimalDivisonOnly(Number(row?.Value), 8);
                      const value =
                        row.Value > 0 && row.Value < 1
                          ? row.Value
                          : Utility.decimalDivison(Number(row?.Value), 8);

                      var value1 = value.toString().split(".")[0];
                      var value2 = value.toString().split(".")[1];

                      var regex = new RegExp("([0-9]+)|([a-zA-Z]+)", "g");
                      var splittedArray = value2?.match(regex);
                      var bal4 =
                        splittedArray && splittedArray.length
                          ? splittedArray[0]
                          : 0;
                      var text =
                        splittedArray && splittedArray.length
                          ? splittedArray[1]
                          : 0;
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
                            style={{
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                            margin-left="0.313rem"
                          >
                            <input
                              key={row.id}
                              name={row.id}
                              onChange={handleChanged}
                              type="checkbox"
                              checked={row?.isChecked || false}
                              // checked={checkAll}
                              style={{ marginRight: "0.5rem" }}
                            />
                            <div>
                              <TransactionDetailTooltip
                                transactionAddress={row.Txn_Hash}
                                currency={props.currency}
                              />
                            </div>

                            <a
                              className={
                                props.theme === "dark"
                                  ? "linkTable fc-4878ff"
                                  : "linkTable"
                              }
                              href={"/transaction-details/" + row.Txn_Hash}
                            >
                              <Tooltip
                                placement="top"
                                title={row.Txn_Hash}
                                classes={{
                                  tooltip:
                                    props.theme === "dark"
                                      ? classes.customTooltipDarkMode
                                      : classes.customTooltip,
                                }}
                              >
                                <span className="tabledata">
                                  {shorten(row.Txn_Hash)}{" "}
                                </span>
                              </Tooltip>
                            </a>
                          </TableCell>
                          <TableCell
                            style={{ border: "none", color: "#2a2a2a" }}
                            align="left"
                          >
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
                              className="linkTable"
                              href={"/block-details/" + row.Block}
                            >
                              <span
                                className={
                                  props.theme === "dark"
                                    ? "tabledata fc-4878ff"
                                    : "tabledata"
                                }
                              >
                                {row.Block}
                              </span>
                            </a>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <a
                              className="linkTable"
                              href={"/address-details/" + row.From}
                            >
                              <Tooltip
                                placement="top"
                                title={row.From}
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
                                      ? "tabledata fc-4878ff"
                                      : "tabledata"
                                  }
                                >
                                  {" "}
                                  {shorten(row.From)}
                                  {/* {let fromAddress = row.From} */}
                                </span>
                              </Tooltip>
                            </a>
                          </TableCell>

                          <TableCell style={{ border: "none" }} align="left">
                            <span
                              className={
                                row.From === addr
                                  ? props.theme === "dark"
                                    ? "out_dark"
                                    : "out"
                                  : props.theme === "dark"
                                    ? "in_dark"
                                    : "in"
                              }
                            >
                              {row.From === addr ? "Out" : "In"}
                            </span>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <a
                              className="linkTable"
                              href={
                                "/address-details/" + row.To
                                  ? row.To
                                  : row.contractAddress
                              }
                            >
                              <Tooltip
                                placement="top"
                                title={row.To ? row.To : row.contractAddress}
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
                                      ? "tabledata fc-4878ff"
                                      : "tabledata"
                                  }
                                >
                                  {row.To
                                    ? shorten(row.To)
                                    : shorten(
                                      row.contractAddress
                                    ).toLocaleLowerCase()}
                                </span>
                              </Tooltip>
                            </a>
                          </TableCell>
                          <TableCell
                            style={{ border: "none", color: "#2a2a2a" }}
                            align="left"
                          >
                            <Tooltip
                              placement="top"
                              title={format({})(valueToShowOnTooltip)}
                              classes={{
                                tooltip:
                                  props.theme === "dark"
                                    ? classes.customTooltipDarkMode
                                    : classes.customTooltip,
                              }}
                            >
                              {value2 == null ? (
                                <span
                                  className={
                                    props.theme === "dark"
                                      ? "tabledata fc-b1c3e1 cursor-pointer"
                                      : "tabledata cursor-pointer"
                                  }
                                >
                                  {row.Value == 0 ? 0 : value1}
                                  { } &nbsp;XDC
                                </span>
                              ) : (
                                <span
                                  className={
                                    props.theme === "dark"
                                      ? "tabledata fc-b1c3e1 cursor-pointer"
                                      : "tabledata cursor-pointer"
                                  }
                                >
                                  {row.Value == 0 ? 0 : value1}
                                  {"."}
                                  <span style={{ color: "#9FA9BA" }}>
                                    {bal4}
                                  </span>
                                  {text}
                                  &nbsp;XDC
                                </span>
                              )}
                            </Tooltip>
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
                      style={{ borderBottom: "none" }}
                    >
                      <span className="tabledata" style={{ color: "red" }}>
                        No transaction found.
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )} */}
            </Table>
            {noData == true && (
              <NoDataFoundContainer>
                <img
                  src={require("../../../src/assets/images/XDC-Alert.svg")}
                ></img>

                <div
                  className={
                    props.theme === "dark" ? "not-found fc-b1c3e1" : "not-found"
                  }
                >
                  No Transaction Found
                </div>
              </NoDataFoundContainer>
            )}
          </TableContainer>
        </div>
        <Grid
          container
          style={{
            marginTop: "1.75rem",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="page-container-address"
        >
          <Grid item className="pagination-tab-address">
            {(!isLoading && noData == true) || totalRecord < 10 ? (
              ""
            ) : (
              <>
                <span
                  className={
                    props.theme === "dark"
                      ? "textShowRecord fc-b1c3e1"
                      : "textShowRecord"
                  }
                >
                  Show
                </span>
                <PageSelector
                  value={rowsPerPage}
                  height={30}
                  handler={handleChangeRowsPerPage}
                  theme={props.theme}
                />
                <span
                  className={
                    props.theme === "dark"
                      ? "textShowRecord fc-b1c3e1"
                      : "textShowRecord"
                  }
                >
                  Records
                </span>
              </>
            )}
          </Grid>
          <Grid xs="1"></Grid>
          {totalRecord > rowsPerPage ? (
            <>
              {noData == true && (
                <Grid
                  item
                  xs="7"
                  style={{
                    flexBasis: "auto",
                    display: "flex",
                    alignItems: "baseline",
                  }}
                  className="pagination-page"
                >
                  <button
                    style={{ marginLeft: "0rem" }}
                    onClick={() => handleChangePage("first")}
                    className={
                      page === 0 || totalRecord === 0
                        ? props.theme === "dark"
                          ? "btn-latest-block-dark disabled"
                          : "btn disabled"
                        : props.theme === "dark"
                          ? "btn-latest-block-dark"
                          : "btn"
                    }
                  >
                    First
                  </button>
                  <button
                    onClick={() => handleChangePage("prev")}
                    className={
                      page === 0 || totalRecord === 0
                        ? props.theme === "dark"
                          ? "btn-latest-block-dark disabled"
                          : "btn disabled"
                        : props.theme === "dark"
                          ? "btn-latest-block-dark"
                          : "btn"
                    }
                  >
                    <img
                      className="back-arrow rotate-180"
                      src={"/images/next.svg"}
                    />
                  </button>
                  <button
                    className={
                      props.theme === "dark" ? "btn-latest-block-dark" : "btn"
                    }
                  >
                    Page 0 of 0
                  </button>
                  <button
                    onClick={() => handleChangePage("next")}
                    className={
                      page + rowsPerPage === totalRecord ||
                        +page + +rowsPerPage > totalRecord ||
                        totalRecord === 0
                        ? props.theme === "dark"
                          ? "btn-latest-block-dark disabled"
                          : "btn disabled"
                        : props.theme === "dark"
                          ? "btn-latest-block-dark"
                          : "btn"
                    }
                  >
                    <img className="back-arrow" src={"/images/next.svg"} />
                  </button>
                  <button
                    onClick={() => handleChangePage("last")}
                    className={
                      page + rowsPerPage === totalRecord ||
                        +page + +rowsPerPage > totalRecord ||
                        totalRecord === 0
                        ? props.theme === "dark"
                          ? "btn-latest-block-dark disabled"
                          : "btn disabled"
                        : props.theme === "dark"
                          ? "btn-latest-block-dark"
                          : "btn"
                    }
                  >
                    Last
                  </button>
                </Grid>
              )}
              {noData == false && (
                <Grid
                  item
                  xs="7"
                  style={{
                    flexBasis: "auto",
                    display: "flex",
                    alignItems: "baseline",
                  }}
                  className="pagination-page"
                >
                  <button
                    style={{ marginLeft: "0rem" }}
                    onClick={() => handleChangePage("first")}
                    className={
                      page === 0 || totalRecord === 0
                        ? props.theme === "dark"
                          ? "btn-latest-block-dark disabled"
                          : "btn disabled"
                        : props.theme === "dark"
                          ? "btn-latest-block-dark"
                          : "btn"
                    }
                  >
                    First
                  </button>
                  <button
                    onClick={() => handleChangePage("prev")}
                    className={
                      page === 0 || totalRecord === 0
                        ? props.theme === "dark"
                          ? "btn-latest-block-dark disabled"
                          : "btn disabled"
                        : props.theme === "dark"
                          ? "btn-latest-block-dark"
                          : "btn"
                    }
                  >
                    <img
                      className="back-arrow rotate-180"
                      src={"/images/next.svg"}
                      alt="back"
                    />
                  </button>
                  <button
                    className={
                      props.theme === "dark" ? "btn-latest-block-dark" : "btn"
                    }
                  >
                    Page{" "}
                    {Math.ceil(totalRecord / rowsPerPage) -
                      Math.ceil((totalRecord - page) / rowsPerPage) +
                      1}{" "}
                    of {Math.ceil(totalRecord / rowsPerPage)}
                  </button>
                  <button
                    onClick={() => handleChangePage("next")}
                    className={
                      page + rowsPerPage === totalRecord ||
                        +page + +rowsPerPage > totalRecord ||
                        totalRecord === 0
                        ? props.theme === "dark"
                          ? "btn-latest-block-dark disabled"
                          : "btn disabled"
                        : props.theme === "dark"
                          ? "btn-latest-block-dark"
                          : "btn"
                    }
                  >
                    <img className="back-arrow" src={"/images/next.svg"} />
                  </button>
                  <button
                    onClick={() => handleChangePage("last")}
                    className={
                      page + rowsPerPage === totalRecord ||
                        +page + +rowsPerPage > totalRecord ||
                        totalRecord === 0
                        ? props.theme === "dark"
                          ? "btn-latest-block-dark disabled"
                          : "btn disabled"
                        : props.theme === "dark"
                          ? "btn-latest-block-dark"
                          : "btn"
                    }
                  >
                    Last
                  </button>
                </Grid>
              )}
            </>
          ) : (
            ""
          )}
        </Grid>
        {/* <div
          className={
            props.theme === "dark"
              ? "transaction-synchronization-text mb-60"
              : "transaction-synchronization-text"
          }
        >
          Some transactions might not be visible as transaction synchronization
          is in progress
        </div> */}
      </Grid>
    </div>
  );
}
