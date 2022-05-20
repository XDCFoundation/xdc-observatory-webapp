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
import { useHistory, useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import moment from "moment";
import Utility from "../../utility";
import AddressData from "../../services/address";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import TokenData from "../../services/token";
import Loader from "../../assets/loader";
import format from "format-number";
import PageSelector from "../common/pageSelector";
import { messages } from "../../constants";

const DeskTopView = styled.div`
  @media (min-width: 0px) and (max-width: 1023px) {
    display: none;
  }

  @media (min-width: 1024px) {
    display: visible;
  }
`;

const MobileView = styled.div`
  @media (min-width: 0px) and (max-width: 1023px) {
    display: visible;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
const PaginationInLine = styled.div`
  display: flex;
  width: 75.125rem;
  justify-content: space-between;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  /* width: 990px; */
  margin: auto;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 641px) and (max-width: 1023px) {
    display: flex;
  }
`;
const RightPagination = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  /* width: 100%; */
`;
const LeftPagination = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const useStyles = makeStyles({
  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  containerDark: {
    borderRadius: "14px",
    boxShadow: "none",
    borderBottom: "none",
    background: "#192a59",
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
export default function HolderTableComponent(props) {
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
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [keywords, setKeywords] = useState("");

  const [reportaddress, setReportaddress] = useState([]);
  const [downloadaddress, setDownloadaddress] = useState([]);
  const [page, setPage] = React.useState(0);
  const [isDownloadActive, setDownloadActive] = useState(0);
  const [noData, setNoData] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  let showPerPage = 10;
  let datas = {};
  const [rowsPerPage, setRowsPerPage] = React.useState(showPerPage);

  // tooltip states
  const [txHashToolTop, setTxHashToolTop] = React.useState(false);
  const [ageToolTip, setAgeToolTip] = React.useState(false);
  const [blockToolTip, setBlockToolTip] = React.useState(false);
  const [fromToolTip, setFromToolTip] = React.useState(false);
  const [toToolTip, setToToolTip] = React.useState(false);
  const [amountToolTip, setAmountToolTip] = React.useState(false);
  const [exportToolTip, setExportToolTip] = React.useState(false);
  const [holderTotalTransfersCount, setHolderTotalTransfersCount] =
    React.useState(0);

  const sortTable = (_sortKey) => {
    let _sortOrder = -1;
    if (sortKey.includes(_sortKey)) {
      _sortOrder = sortOrder * -1;
    } else {
      setSortKey(_sortKey);
    }
    setSortOrder(_sortOrder);
    let requestObj = {
      skip: 0,
      limit: rowsPerPage,
      address: addr,
      tokenContract: props?.contractAddress,
      sortKey: { [_sortKey]: _sortOrder },
    };
    getHolderDetails(requestObj);
  };

  const handleChangePage = (action) => {
    let requestObj = {
      limit: rowsPerPage,
      address: addr,
      tokenContract: props?.contractAddress,
    };
    if (keywords) requestObj.keywords = keywords;
    if (action == "first") {
      requestObj.skip = 0;
      setPage(0);
    }
    if (action === "last") {
      let pagecount = totalRecord - rowsPerPage;
      setPage(pagecount);
      requestObj.skip = pagecount;
    }

    if (action === "next") {
      if (rowsPerPage + page < totalRecord) {
        let pagecount = rowsPerPage + page;
        setPage(pagecount);
        requestObj.skip = pagecount;
      }
    }

    if (action === "prev") {
      if (page - rowsPerPage >= 0) {
        let pagecount = page - rowsPerPage;
        setPage(pagecount);
        requestObj.skip = pagecount;
      }
    }
    getHolderDetails(requestObj);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    const reqObj = {
      skip: 0,
      limit: event.target.value,
      address: addr,
      tokenContract: props?.contractAddress,
    };
    getHolderDetails(reqObj);
  };
  const getHolderDetails = async (data) => {
    try {
      if (!data.sortKey && sortKey && sortOrder)
        data.sortKey = { [sortKey]: sortOrder };
      const [error, responseData] = await Utility.parseResponse(
        TokenData.getHolderDetailsUsingAddressforToken(data)
      );

      if (responseData[0].Total_transfes_transactions_Count > 0) {
        setLoading(false);
        setNoData(false);
        parseResponseData(responseData, 1);
        setHolderTotalTransfersCount(
          responseData[0].Total_transfes_transactions_Count
        );
      } else {
        setLoading(false);
        setNoData(true);
        setBalance(parseFloat(0).toFixed(2));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    datas = {
      skip: page,
      limit: rowsPerPage,
      address: addr,
      tokenContract: props?.contractAddress,
    };
    getHolderDetails(datas);
  }, []);

  // const getTransactionSearch = async (data) => {
  //     try {
  //         const [error, responseData] = await Utility.parseResponse(
  //             AddressData.getTransactionSearch(data)
  //         );
  //
  //         if (responseData.responseTransaction.length > 0) {
  //             setNoData(false);
  //             parseResponseData(responseData, 2);
  //         } else {
  //             setNoData(true);
  //             setBalance(parseFloat(0).toFixed(2));
  //         }
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  const parseResponseData = async (Recdata, type) => {
    let trxn = [];
    if (type == 1) {
      trxn = JSON.parse(Recdata[0].Transfers);
      setTotalRecord(Recdata[0].Total_transfes_transactions_Count);
    } else {
      trxn = Recdata.responseTransaction;
      setTotalRecord(Recdata.total);
    }

    setAddress(
      trxn.map((d) => {
        return {
          Txn_Hash: d.hash,
          Age: d.timestamp,
          Block: d.blockNumber,
          From: d.from,
          To: d.to,
          Value: d.value,
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
          Value: d.value / 10 ** 18,
        };
      })
    );
    setDownloadaddress(
      trxn.map((d) => {
        return {
          TransactionHash: d.hash,
          Age: moment(d.timestamp * 1000).format("DD/MM/YYYY hh:mm:ss"),
          Block: d.blockNumber,
          From: d.from,
          To: d.to,
          Value: d.value / 10 ** 18,
        };
      })
    );
  };
  const handleKeyUp = (event) => {
    let searchkeyword = event.target.value;
    setSortKey(0);
    setSortOrder(0);
    setPage(0);
    if (searchkeyword.length > 2) {
      setKeywords(searchkeyword);
      datas = {
        skip: 0,
        limit: rowsPerPage,
        address: addr,
        keywords: searchkeyword,
        tokenContract: props?.contractAddress,
      };
      getHolderDetails(datas);
    }
    if (searchkeyword.length == 0) {
      setPage(0);
      datas = {
        skip: 0,
        limit: rowsPerPage,
        address: addr,
        tokenContract: props?.contractAddress,
      };
      getHolderDetails(datas);
    }
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
            TransactionHash: d.Txn_Hash,
            Age: moment(d.Age * 1000).format("MMM DD, YYYY h:mm A"),
            Block: d.Block,
            From: d.From,
            To: d.To,
            Amount: d.Value,
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
            Age: moment(d.Age * 1000).format("MMM DD, YYYY h:mm A"),
            Block: d.Block,
            From: d.From,
            To: d.To,
            Amount: d.Value,
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
  return (
    <div>
      <div className="content_input_all">
        <div
          className={
            props.theme === "dark"
              ? "searchelement-input3 bg-transparent-dark"
              : "searchelement-input3"
          }
        >
          <img
            style={{ width: 18, height: 18, marginRight: 5, marginTop: 7 }}
            src={"/images/Search.svg"}
          />
          <input
            className={
              props.theme === "dark"
                ? "account-searchbar bg-transparent-dark fc-b1c3e1"
                : "account-searchbar"
            }
            type="text"
            placeholder="Search Transaction"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleKeyUp(e);
              }
            }}
            onChange={(e) => {
              if (e.target.value == "") {
                handleKeyUp(e);
              }
            }}
          />
        </div>

        {isDownloadActive ? (
          <CSVLink
            filename={"Transactions.csv"}
            data={downloadaddress}
            style={{
              fontSize: "0.938rem",
              color: "#ffffff",
              textAlign: "center",
              backgroundColor: "rgb(7 125 245)",
              borderRadius: "4px",
              width: "5.875rem",
              height: "2.125rem",
              paddingTop: "2px",
            }}
          >
            Export
          </CSVLink>
        ) : (
          <Tooltip
            open={exportToolTip}
            onOpen={() => setExportToolTip(true)}
            onClose={() => setExportToolTip(false)}
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
              style={{
                fontSize: "15px",
                textAlign: "center",
                color: "#ffffff",
                backgroundColor: "#e3e7eb",
                borderRadius: "4px",
                width: "5.875rem",
                height: "2.125rem",
                paddingTop: "2px",
              }}
              onClick={() => setExportToolTip(!exportToolTip)}
            >
              <CSVLink
                filename={"Transactions.csv"}
                data={downloadaddress}
                style={{
                  pointerEvents: "none",
                  color: "#ffffff",
                }}
              >
                Export
              </CSVLink>
            </div>
          </Tooltip>
        )}
      </div>

      <Grid lg={13} className="tablegrid_address">
        <Paper
          style={
            props.theme === "dark"
              ? { background: "#192a59", borderRadius: "14px" }
              : { borderRadius: "14px" }
          }
          elevation={0}
        >
          <TableContainer
            className={
              props.theme === "dark" ? classes.containerDark : classes.container
            }
            id="container-table-holder"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: "none" }} align="left">
                    <input
                      onChange={handleChanged}
                      type="checkbox"
                      name="allselect"
                      checked={
                        address.length > 0
                          ? address.filter((addr) => addr?.isChecked == true)
                              .length == address.length
                          : false
                      }
                      style={{ marginRight: "8px" }}
                    />
                    <span onClick={() => sortTable("hash")}>
                      <span
                        className={
                          props.theme === "dark"
                            ? "tableheader fc-white"
                            : "tableheader"
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
                            open={txHashToolTop}
                            onOpen={() => setTxHashToolTop(true)}
                            onClose={() => setTxHashToolTop(false)}
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
                              onClick={() => setTxHashToolTop(!txHashToolTop)}
                              alt="question-mark"
                              src="/images/info.svg"
                              height={"14px"}
                              className="tooltipInfoIconAccount"
                            />
                          </Tooltip>
                        )}
                      </span>
                      {sortKey && sortOrder && sortKey == "hash" ? (
                        sortOrder === -1 ? (
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        ) : (
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon rotate-180"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </TableCell>
                  <TableCell style={{ border: "none" }} align="left">
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheader mar-right-45 mar-right-40 fc-white"
                          : "tableheader mar-right-45 mar-right-40"
                      }
                      onClick={() => sortTable("timestamp")}
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
                          open={ageToolTip}
                          onOpen={() => setAgeToolTip(true)}
                          onClose={() => setAgeToolTip(false)}
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
                            onClick={() => setAgeToolTip(!ageToolTip)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                      {sortKey && sortOrder && sortKey == "timestamp" ? (
                        sortOrder === -1 ? (
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        ) : (
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon rotate-180"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    style={{ border: "none" }}
                    align="left"
                    onClick={() => sortTable("blockNumber")}
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheader fc-white"
                          : "tableheader"
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
                          open={blockToolTip}
                          onOpen={() => setBlockToolTip(true)}
                          onClose={() => setBlockToolTip(false)}
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
                            onClick={() => setBlockToolTip(!blockToolTip)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                    {sortKey && sortOrder && sortKey == "blockNumber" ? (
                      sortOrder === -1 ? (
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon"
                        />
                      ) : (
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon rotate-180"
                        />
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell
                    style={{ border: "none" }}
                    align="left"
                    onClick={() => sortTable("from")}
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheader fc-white"
                          : "tableheader"
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
                          open={fromToolTip}
                          onOpen={() => setFromToolTip(true)}
                          onClose={() => setFromToolTip(false)}
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
                            onClick={() => setFromToolTip(!fromToolTip)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                    {sortKey && sortOrder && sortKey == "from" ? (
                      sortOrder === -1 ? (
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon"
                        />
                      ) : (
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon rotate-180"
                        />
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell
                    style={{ border: "none" }}
                    align="left"
                    onClick={() => sortTable("to")}
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheader fc-white"
                          : "tableheader"
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
                          open={toToolTip}
                          onOpen={() => setToToolTip(true)}
                          onClose={() => setToToolTip(false)}
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
                            onClick={() => setToToolTip(!toToolTip)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          />
                        </Tooltip>
                      )}
                    </span>
                    {sortKey && sortOrder && sortKey == "to" ? (
                      sortOrder === -1 ? (
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon"
                        />
                      ) : (
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon rotate-180"
                        />
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell
                    style={{ border: "none" }}
                    align="left"
                    onClick={() => sortTable("value")}
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheader fc-white"
                          : "tableheader"
                      }
                    >
                      Amount
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.AMOUNT}
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
                          open={amountToolTip}
                          onOpen={() => setAmountToolTip(true)}
                          onClose={() => setAmountToolTip(false)}
                          placement="top"
                          title={messages.AMOUNT}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => setAmountToolTip(!amountToolTip)}
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                    {sortKey && sortOrder && sortKey == "value" ? (
                      sortOrder === -1 ? (
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon"
                        />
                      ) : (
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon rotate-180"
                        />
                      )
                    ) : (
                      ""
                    )}
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
                      const currentTime = new Date();
                      const previousTime = new Date(row.Age * 1000);
                      const TimeAge = Utility.timeDiff(
                        currentTime,
                        previousTime
                      );
                      const value = Utility.divideByDecimalValue(
                        row.Value,
                        Number(props?.decimal)
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
                            style={{ border: "none", width: "22%" }}
                            marginleft="5px"
                          >
                            <div className="holder-tranferTable-checkbox-container">
                              {" "}
                              <input
                                key={row.id}
                                name={row.id}
                                onChange={handleChanged}
                                type="checkbox"
                                checked={row?.isChecked || false}
                                style={{ marginRight: "8px" }}
                                className="transfer-checkbox"
                              />
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
                            </div>
                          </TableCell>
                          <TableCell
                            style={{ border: "none", width: "17%" }}
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
                          <TableCell
                            style={{ border: "none", width: "15%" }}
                            align="left"
                          >
                            <a
                              className={
                                props.theme === "dark"
                                  ? "linkTable fc-4878ff"
                                  : "linkTable"
                              }
                              href={"/block-details/" + row.Block}
                            >
                              <span className="tabledata">{row.Block}</span>
                            </a>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            {row.From != addr ? (
                              <a
                                className={
                                  props.theme === "dark"
                                    ? "linkTable fc-4878ff"
                                    : "linkTable"
                                }
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
                                  <span className="tabledata">
                                    {" "}
                                    {shorten(row.From)}
                                  </span>
                                </Tooltip>
                              </a>
                            ) : (
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
                                      ? "tabledata fc-b1c3e1"
                                      : "tabledata"
                                  }
                                >
                                  {" "}
                                  {shorten(row.From)}
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            {row.To != addr ? (
                              <a
                                className={
                                  props.theme === "dark"
                                    ? "linkTable fc-4878ff"
                                    : "linkTable"
                                }
                                href={
                                  "/address-details/" +
                                  `${
                                    row.To === "xdc"
                                      ? props?.contractAddress
                                      : row.To
                                  }`
                                }
                              >
                                <Tooltip
                                  placement="top"
                                  title={
                                    row.To === "xdc"
                                      ? props?.contractAddress
                                      : row.To
                                  }
                                  classes={{
                                    tooltip:
                                      props.theme === "dark"
                                        ? classes.customTooltipDarkMode
                                        : classes.customTooltip,
                                  }}
                                >
                                  <span className="tabledata">
                                    {row.To === "xdc"
                                      ? shorten(props?.contractAddress)
                                      : shorten(row.To)}
                                  </span>
                                </Tooltip>
                              </a>
                            ) : (
                              <Tooltip
                                placement="top"
                                title={
                                  row.To === "xdc"
                                    ? props?.contractAddress
                                    : row.To
                                }
                                classes={{
                                  tooltip:
                                    props.theme === "dark"
                                      ? classes.customTooltipDarkMode
                                      : classes.customTooltip,
                                }}
                              >
                                <span className="tabledata">
                                  {row.To === "xdc"
                                    ? shorten(props?.contractAddress)
                                    : shorten(row.To)}
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <span
                              className={
                                props.theme === "dark"
                                  ? "tabledata fc-b1c3e1"
                                  : "tabledata"
                              }
                            >
                              {Number(value) === Number(row.Value)
                                ? 0
                                : format({})(value)}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )
              )}
            </Table>
            {noData == true && (
              <NoDataFoundContainer>
                <img
                  src={require("../../../src/assets/images/XDC-Alert.svg")}
                ></img>

                <div>No transactions found</div>
              </NoDataFoundContainer>
            )}
          </TableContainer>
        </Paper>
        <DeskTopView>
          {holderTotalTransfersCount >= rowsPerPage ? (
            <Grid
              container
              style={{ marginTop: "1.75rem" }}
              className="Pagination"
            >
              <Grid className="Pagination_1">
                <span className={props.theme === "dark" ? "text-dark" : "text"}>
                  Show
                </span>
                <PageSelector
                  value={rowsPerPage}
                  height={35}
                  handler={handleChangeRowsPerPage}
                  theme={props.theme}
                />
                <span className={props.theme === "dark" ? "text-dark" : "text"}>
                  Records
                </span>
              </Grid>

              <Grid item className="Pagination_2">
                <button
                  onClick={() => handleChangePage("first")}
                  className={
                    page === 0
                      ? props.theme === "dark"
                        ? "btn-latest-block-dark disabled-dark btn-first"
                        : "btn disabled btn-first"
                      : props.theme === "dark"
                      ? "btn-latest-block-dark btn-first"
                      : "btn btn-first"
                  }
                >
                  First
                </button>
                <button
                  onClick={() => handleChangePage("prev")}
                  className={
                    page === 0
                      ? props.theme === "dark"
                        ? "btn-latest-block-dark disabled-dark btn-back"
                        : "btn disabled btn-back"
                      : props.theme === "dark"
                      ? "btn-latest-block-dark  btn-back"
                      : "btn btn-back"
                  }
                >
                  <img
                    className="rotate-180"
                    alt="back"
                    src={"/images/next.svg"}
                  />{" "}
                </button>
                <button
                  className={
                    props.theme === "dark"
                      ? "btn-latest-block-dark  btn-page"
                      : "btn btn-page"
                  }
                >
                  Page{" "}
                  {Math.round(totalRecord / rowsPerPage) +
                    1 -
                    Math.round((totalRecord - page) / rowsPerPage)}
                  &nbsp;of {Math.ceil(totalRecord / rowsPerPage)}
                </button>
                <button
                  onClick={() => handleChangePage("next")}
                  className={
                    page + rowsPerPage === totalRecord
                      ? props.theme === "dark"
                        ? "btn-latest-block-dark disabled-dark"
                        : "btn disabled"
                      : props.theme === "dark"
                      ? "btn-latest-block-dark  btn-next"
                      : "btn btn-next"
                  }
                >
                  <img alt="next" src={"/images/next.svg"} />
                </button>
                <button
                  onClick={() => handleChangePage("last")}
                  className={
                    page + rowsPerPage === totalRecord
                      ? props.theme === "dark"
                        ? "btn-latest-block-dark disabled-dark"
                        : "btn disabled"
                      : props.theme === "dark"
                      ? "btn-latest-block-dark  btn-last"
                      : "btn btn-last"
                  }
                >
                  Last
                </button>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </DeskTopView>
        <MobileView>
          {holderTotalTransfersCount >= rowsPerPage ? (
            <Grid
              container
              style={{ marginTop: "1.75rem" }}
              className="Pagination"
            >
              <Grid className="Pagination_1">
                <span className={props.theme === "dark" ? "text-dark" : "text"}>
                  Show
                </span>
                <PageSelector
                  value={rowsPerPage}
                  height={35}
                  handler={handleChangeRowsPerPage}
                  theme={props.theme}
                />
                <span className={props.theme === "dark" ? "text-dark" : "text"}>
                  Records
                </span>
              </Grid>

              <Grid item className="Pagination_2">
                <button
                  onClick={() => handleChangePage("first")}
                  className={
                    page === 0
                      ? props.theme === "dark"
                        ? "btn-latest-block-dark disabled-dark btn-first"
                        : "btn disabled btn-first"
                      : props.theme === "dark"
                      ? "btn-latest-block-dark btn-first"
                      : "btn btn-first"
                  }
                >
                  First
                </button>
                <button
                  onClick={() => handleChangePage("prev")}
                  className={
                    page === 0
                      ? props.theme === "dark"
                        ? "btn-latest-block-dark disabled-dark btn-back"
                        : "btn disabled btn-back"
                      : props.theme === "dark"
                      ? "btn-latest-block-dark  btn-back"
                      : "btn btn-back"
                  }
                >
                  <img
                    className="rotate-180"
                    alt="back"
                    src={"/images/next.svg"}
                  />{" "}
                </button>
                <button
                  className={
                    props.theme === "dark"
                      ? "btn-latest-block-dark  btn-page"
                      : "btn btn-page"
                  }
                >
                  Page{" "}
                  {Math.round(totalRecord / rowsPerPage) +
                    1 -
                    Math.round((totalRecord - page) / rowsPerPage)}
                  &nbsp;of {Math.ceil(totalRecord / rowsPerPage)}
                </button>
                <button
                  onClick={() => handleChangePage("next")}
                  className={
                    page + rowsPerPage === totalRecord
                      ? props.theme === "dark"
                        ? "btn-latest-block-dark disabled-dark"
                        : "btn disabled"
                      : props.theme === "dark"
                      ? "btn-latest-block-dark  btn-next"
                      : "btn btn-next"
                  }
                >
                  <img alt="next" src={"/images/next.svg"} />
                </button>
                <button
                  onClick={() => handleChangePage("last")}
                  className={
                    page + rowsPerPage === totalRecord
                      ? props.theme === "dark"
                        ? "btn-latest-block-dark disabled-dark"
                        : "btn disabled"
                      : props.theme === "dark"
                      ? "btn-latest-block-dark  btn-last"
                      : "btn btn-last"
                  }
                >
                  Last
                </button>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </MobileView>
      </Grid>
    </div>
  );
}
