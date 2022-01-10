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

function timeDiff(curr, prev) {
  var ms_Min = 60 * 1000; // milliseconds in Minute
  var ms_Hour = ms_Min * 60; // milliseconds in Hour
  var ms_Day = ms_Hour * 24; // milliseconds in day
  var ms_Mon = ms_Day * 30; // milliseconds in Month
  var ms_Yr = ms_Day * 365; // milliseconds in Year
  var diff = curr - prev; //difference between dates.
  // If the diff is less then milliseconds in a minute
  if (diff < ms_Min) {
    return Math.abs(Math.round(diff / 1000)) + " secs ago";

    // If the diff is less then milliseconds in a Hour
  } else if (diff < ms_Hour) {
    return Math.abs(Math.round(diff / ms_Min)) + " mins ago";

    // If the diff is less then milliseconds in a day
  } else if (diff < ms_Day) {
    return Math.abs(Math.round(diff / ms_Hour)) + " hrs ago";

    // If the diff is less then milliseconds in a Month
  } else if (diff < ms_Mon) {
    return Math.abs(Math.round(diff / ms_Day)) + " days ago";

    // If the diff is less then milliseconds in a year
  } else if (diff < ms_Yr) {
    return Math.abs(Math.round(diff / ms_Mon)) + " months ago";
  } else {
    return Math.abs(Math.round(diff / ms_Yr)) + " years ago";
  }
}

const useStyles = makeStyles({
  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
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
  let showPerPage = 50;
  let datas = {};
  const [rowsPerPage, setRowsPerPage] = React.useState(showPerPage);

  const history = useHistory();
  const handleChangePage = (action) => {
    if (action == "first") {
      if (keywords) {
        datas = {
          pageNum: 0,
          perpage: rowsPerPage,
          addr: addr,
          keywords: keywords,
        };
        getTransactionSearch(datas);
      } else {
        let pageValue = 0;
        setPage(pageValue);
        datas = {
          pageNum: page,
          perpage: rowsPerPage,
          addr: addr,
        };
        getHolderDetails(datas);
      }
    }
    if (action === "last") {
      let pagecount = totalRecord - rowsPerPage;
      setPage(pagecount);
      if (keywords) {
        datas = {
          pageNum: pagecount,
          perpage: rowsPerPage,
          addr: addr,
          keywords: keywords,
        };
        getTransactionSearch(datas);
      } else {
        datas = {
          pageNum: pagecount,
          perpage: rowsPerPage,
          addr: addr,
        };
        getHolderDetails(datas);
      }
    }

    if (action === "next") {
      if (rowsPerPage + page < totalRecord) {
        let pagecount = rowsPerPage + page;
        setPage(pagecount);
        if (keywords) {
          datas = {
            pageNum: pagecount,
            perpage: rowsPerPage,
            addr: addr,
            keywords: keywords,
          };
          getTransactionSearch(datas);
        } else {
          let datas = { pageNum: pagecount, perpage: rowsPerPage, addr: addr };
          getHolderDetails(datas);
        }
      }
    }

    if (action === "prev") {
      if (page - rowsPerPage >= 0) {
        let pagecount = page - rowsPerPage;
        setPage(pagecount);
        if (keywords) {
          datas = {
            pageNum: pagecount,
            perpage: rowsPerPage,
            addr: addr,
            keywords: keywords,
          };
          getTransactionSearch(datas);
        } else {
          datas = {
            pageNum: pagecount,
            perpage: rowsPerPage,
            addr: addr,
          };
          getHolderDetails(datas);
        }
      }
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    datas = {
      pageNum: 0,
      perpage: event.target.value,
      addr: addr,
    };
    getHolderDetails(datas);
  };
  const getHolderDetails = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        TokenData.getHolderDetailsUsingAddressforToken(data)
      );

      if (responseData[0].Total_transfes_transactions_Count > 0) {
        setLoading(false);
        setNoData(false);
        parseResponseData(responseData, 1);
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
      pageNum: page,
      perpage: rowsPerPage,
      addr: addr,
    };
    getHolderDetails(datas);
  }, []);

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
          Value: d.value / 1000000000000000000,
        };
      })
    );
    setDownloadaddress(
      trxn.map((d) => {
        return {
          Txn_Hash: d.hash,
          Age: moment(d.timestamp * 1000).format("DD/MM/YYYY hh:mm:ss"),
          Block: d.blockNumber,
          From: d.from,
          To: d.to,
          Value: d.value / 1000000000000000000,
        };
      })
    );
  };
  const handleKeyUp = (event) => {
    let searchkeyword = event.target.value;
    setPage(0);
    if (searchkeyword.length > 2) {
      setKeywords(searchkeyword);
      datas = {
        pageNum: 0,
        perpage: rowsPerPage,
        addr: addr,
        keywords: searchkeyword,
      };
      getTransactionSearch(datas);
    }
    if (searchkeyword.length == 0) {
      setPage(0);
      datas = {
        pageNum: 0,
        perpage: rowsPerPage,
        addr: addr,
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
            TxHash: d.Txn_Hash,
            Age: moment(d.Age * 1000).format("DD/MM/YYYY hh:mm:ss"),
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
            TxHash: d.Txn_Hash,
            Age: moment(d.Age * 1000).format("DD/MM/YYYY hh:mm:ss"),
            Block: d.Block,
            From: d.From,
            To: d.To,
            Amount: d.Value,
          };
        })
      );
    }
  };

  return (
    <div>
      <div className="content_input_all">
        <div className="searchelement-input3">
          <img
            style={{ width: 18, height: 18, marginRight: 5, marginTop: 7 }}
            src={"/images/Search.svg"}
          />
          <input
            className="account-searchbar"
            type="text"
            placeholder="Search Transaction"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleKeyUp(e);
              }
            }}
          />
        </div>

        {isDownloadActive ? (
          <CSVLink
            filename={"transactions.csv"}
            data={downloadaddress}
            style={{
              fontSize: "0.938rem",
              color: "#ffffff",
              textAlign: "center",
              backgroundColor: "rgb(7 125 245)",
              borderRadius: "4px",
              width: "5.875rem",
              height: "2.125rem",
            }}
          >
            Export
          </CSVLink>
        ) : (
          <CSVLink
            filename={"transactions.csv"}
            data={downloadaddress}
            style={{
              pointerEvents: "none",
              fontSize: "15px",
              textAlign: "center",
              color: "#ffffff",
              backgroundColor: "#e3e7eb",
              borderRadius: "4px",
              width: "94px",
              height: "30px",
            }}
          >
            Export
          </CSVLink>
        )}
      </div>

      <Grid lg={13} className="tablegrid_address">
        <Paper style={{ borderRadius: "14px" }} elevation={0}>
          <TableContainer
            className={classes.container}
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
                        address.filter((addr) => addr?.isChecked == true)
                          .length == address.length
                      }
                      style={{ marginRight: "8px" }}
                    />
                    <span className={"tableheader"}>Transaction Hash</span>
                  </TableCell>
                  <TableCell style={{ border: "none" }} align="left">
                    <span className={"tableheader mar-right-45 mar-right-40"}>
                      Age
                    </span>
                  </TableCell>
                  <TableCell style={{ border: "none" }} align="left">
                    <span className={"tableheader"}>Block</span>
                  </TableCell>
                  <TableCell style={{ border: "none" }} align="left">
                    <span className={"tableheader"}>From</span>
                  </TableCell>
                  <TableCell style={{ border: "none" }} align="left">
                    <span className={"tableheader"}>To</span>
                  </TableCell>
                  <TableCell style={{ border: "none" }} align="left">
                    <span className={"tableheader"}>Amount</span>
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
                      const TimeAge = timeDiff(currentTime, previousTime);
                      const value = Utility.divideByDecimalValue(
                        row.Value,
                        Number(props?.decimal)
                      );

                      return (
                        <TableRow
                          style={
                            index % 2 !== 1
                              ? { background: "#f9f9f9" }
                              : { background: "white" }
                          }
                        >
                          <TableCell
                            style={{ border: "none", width: "22%" }}
                            marginleft="5px"
                          >
                            <div className="dis-flex input_12">
                              {" "}
                              <input
                                key={row.id}
                                name={row.id}
                                onChange={handleChanged}
                                type="checkbox"
                                checked={row?.isChecked || false}
                                style={{ marginRight: "8px" }}
                              />
                              <a
                                className="linkTable"
                                href={"/transaction-details/" + row.Txn_Hash}
                              >
                                <Tooltip placement="top" title={row.Txn_Hash}>
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
                            <span className="tabledata">{TimeAge}</span>
                          </TableCell>
                          <TableCell
                            style={{ border: "none", width: "15%" }}
                            align="left"
                          >
                            <a
                              className="linkTable"
                              href={"/block-details/" + row.Block}
                            >
                              <span className="tabledata">{row.Block}</span>
                            </a>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            {row.From != addr ? (
                              <a
                                className="linkTable"
                                href={"/address-details/" + row.From}
                              >
                                <Tooltip placement="top" title={row.From}>
                                  <span className="tabledata">
                                    {" "}
                                    {shorten(row.From)}
                                  </span>
                                </Tooltip>
                              </a>
                            ) : (
                              <Tooltip placement="top" title={row.From}>
                                <span className="tabledata">
                                  {" "}
                                  {shorten(row.From)}
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            {row.To != addr ? (
                              <a
                                className="linkTable"
                                href={"/address-details/" + row.To}
                              >
                                <Tooltip placement="top" title={row.To}>
                                  <span className="tabledata">
                                    {shorten(row.To)}
                                  </span>
                                </Tooltip>
                              </a>
                            ) : (
                              <Tooltip placement="top" title={row.To}>
                                <span className="tabledata">
                                  {shorten(row.To)}
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <span className="tabledata">
                              {Number(value) === Number(row.Value)
                                ? 0
                                : format({})(parseFloat(value))}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )
              )}
              {noData == true && (
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
              )}
            </Table>
          </TableContainer>
        </Paper>
        <DeskTopView>
          <Grid container style={{ marginTop: "2.25rem" }}>
            <PaginationInLine>
              <Grid item style={{ width: "12.5rem" }}>
                <span className="text">Show</span>
                <select
                  value={rowsPerPage}
                  className="select-amount"
                  onChange={handleChangeRowsPerPage}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={75}>75</option>
                  <option value={100}>100</option>
                </select>
                <span className="text">Records</span>
              </Grid>

              <Grid>
                <button
                  style={{ marginLeft: "0px" }}
                  onClick={() => handleChangePage("first")}
                  className={page === 0 ? "btn disabled" : "btn"}
                >
                  First
                </button>
                <button
                  onClick={() => handleChangePage("prev")}
                  className={page === 0 ? "btn disabled" : "btn"}
                >
                  {"<"}
                </button>
                <button className="btn">
                  Page{" "}
                  {Math.round(totalRecord / rowsPerPage) +
                    1 -
                    Math.round((totalRecord - page) / rowsPerPage)}
                  &nbsp;of {Math.round(totalRecord / rowsPerPage)}
                </button>
                <button
                  onClick={() => handleChangePage("next")}
                  className={
                    page + rowsPerPage === totalRecord ? "btn disabled" : "btn"
                  }
                >
                  {">"}
                </button>
                <button
                  onClick={() => handleChangePage("last")}
                  className={
                    page + rowsPerPage === totalRecord ? "btn disabled" : "btn"
                  }
                >
                  Last
                </button>
              </Grid>
            </PaginationInLine>
          </Grid>
        </DeskTopView>
        <MobileView>
          <Pagination>
            <LeftPagination>
              <span className="text">Show</span>
              <select
                value={rowsPerPage}
                className="select-amount"
                onChange={handleChangeRowsPerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
              <span className="text">Records</span>
            </LeftPagination>

            <RightPagination className="pagiantion-11">
              <button
                id="btn_12"
                style={{ marginLeft: "0px" }}
                onClick={() => handleChangePage("first")}
                className={page === 0 ? "btn disabled" : "btn"}
              >
                First
              </button>
              <button
                id="btn_12"
                onClick={() => handleChangePage("prev")}
                className={page === 0 ? "btn disabled" : "btn"}
              >
                {"<"}
              </button>
              <button id="btn_12" className="btn w-100">
                <div className="txt-center">
                  Page
                  {Math.round(totalRecord / rowsPerPage) +
                    1 -
                    Math.round((totalRecord - page) / rowsPerPage)}{" "}
                  &nbsp;of {Math.round(totalRecord / rowsPerPage)}
                </div>
              </button>
              <button
                id="btn_12"
                onClick={() => handleChangePage("next")}
                className={
                  page + rowsPerPage === totalRecord ? "btn disabled" : "btn"
                }
              >
                {">"}
              </button>
              <button
                id="btn_12"
                onClick={() => handleChangePage("last")}
                className={
                  page + rowsPerPage === totalRecord ? "btn disabled" : "btn"
                }
              >
                Last
              </button>
            </RightPagination>
          </Pagination>
        </MobileView>
      </Grid>
    </div>
  );
}
