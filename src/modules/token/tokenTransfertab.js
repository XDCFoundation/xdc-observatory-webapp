import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "../../assets/styles/custom.css";
import Tooltip from "@material-ui/core/Tooltip";
import TokenData from "../../services/token";
import Utils from "../../utility";
import { useParams } from "react-router";
import styled from "styled-components";
import Loader from "../../assets/loader";
import TableBody from "@material-ui/core/TableBody";
import { messages } from "../../constants";
import PageSelector from "../common/pageSelector";
import SearchAndFiltersComponent from "./searchAndFiltersComponent";
import moment from "moment";

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 75.125rem;
  margin: auto;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 1240px) {
    width: auto;
  }
`;
const RightPagination = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    margin-top: 24px;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    margin-top: 31px;
  }
`;
const LeftPagination = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 39px;

  @media (max-width: 1240px) {
    margin-top: 31px;
    max-width: 95px;
  }
`;

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderTopColor: "white",
    backgroundColor: "white",
    borderBottomColor: "white",
    borderBottom: "none",
    background: "#fff",
    padding: "0 px",
    "@media (min-width: 0px) and (max-width: 1240px)": {
      // height: "12.563rem",
    },
  },

  divider: {
    borderTop: "0px solid #bbb",
    width: "100%",
  },
  noData: {
    width: "auto",
    height: "19px",
    margin: "25px 15px 0 530px",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",

    color: "#c6cbcf",
  },
  alert: {
    margin: "110px 0 0 580px",
  },
  table: {
    marginBottom: "200px",
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transfer, settransfer] = useState({});
  const [totalToken, setTotalToken] = useState([]);
  const [noData, setNoData] = useState(true);
  const [searchAndFilters, setSearchAndFilters] = useState({
    searchQuery: "",
    startDate: "",
  });
  const [isLoading, setLoading] = useState(true);
  const { address } = useParams();

  // tooltip states
  const [txHashToolTop, setTxHashToolTop] = React.useState(false);
  const [ageToolTip, setAgeToolTip] = React.useState(false);
  const [blockToolTip, setBlockToolTip] = React.useState(false);
  const [fromToolTip, setFromToolTip] = React.useState(false);
  const [toToolTip, setToToolTip] = React.useState(false);
  const [sortingKey, setSortingKey] = React.useState(false);
  const [sortingOrder, setSortingOrder] = React.useState(0);

  const sortTable = (key) => {
    let order = -1;
    setSortingKey(key);
    if (!sortingOrder) {
      setSortingOrder(-1);
    } else {
      sortingOrder === -1 ? (order = 1) : (order = -1);
      setSortingOrder(order);
    }
    let values = { addr: address, pageNum: 0, perpage: rowsPerPage };
    transferDetail(values, searchAndFilters, key, order);
  };

  useEffect(() => {
    let values = { addr: address, pageNum: page, perpage: rowsPerPage };
    transferDetail(values);
    let value = { addr: address };
    getTotalTransferToken(value);
    sortTable("blockNumber");
  }, []);

  const transferDetail = async (
    values,
    filters,
    _sortingKey,
    _sortingOrder
  ) => {
    const requestData = {};
    requestData.addr = values ? values.addr : address;
    requestData.skip = values ? values.pageNum : 0;
    requestData.limit = values ? values.perpage : 10;
    const filtersData = filters || searchAndFilters;
    if (filtersData.searchQuery)
      requestData.searchValue = filtersData.searchQuery;
    if (filtersData.startDate) requestData.startDate = filtersData.startDate;
    if (filtersData.startDate || filtersData.searchQuery)
      getTotalTransferToken(requestData);
    if (sortingKey || _sortingKey)
      requestData.sortKey = _sortingKey ? _sortingKey : sortingKey;
    if (sortingOrder || _sortingOrder)
      requestData.sortType = _sortingOrder ? _sortingOrder : sortingOrder;
    let [error, tns] = await Utils.parseResponse(
      TokenData.getListOfTransferTransactionsForToken(requestData)
    );
    if (!tns || tns.length == 0) {
      setNoData(false);
      setLoading(false);
    } else {
      settransfer(tns);
      setLoading(false);
    }
  };
  const getTotalTransferToken = async (data) => {
    try {
      const [error, responseData] = await Utils.parseResponse(
        TokenData.getTotalTransferTransactionsForToken(data)
      );
      setTotalToken(responseData?.responseData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangePage = (action) => {
    if (action == "first") {
      setPage(0);
      let values = { addr: address, pageNum: 0, perpage: rowsPerPage };
      transferDetail(values);
    }
    if (action == "prev") {
      if (page - rowsPerPage >= 0) {
        let pageValue = page - rowsPerPage;
        setPage(pageValue);
        let values = {
          addr: address,
          pageNum: pageValue,
          perpage: rowsPerPage,
        };
        transferDetail(values);
      }
    }
    if (action == "next") {
      if (+rowsPerPage + +page < totalToken) {
        let pageValue = +rowsPerPage + +page;
        setPage(pageValue);
        let values = {
          addr: address,
          pageNum: pageValue,
          perpage: rowsPerPage,
        };
        transferDetail(values);
      }
    }

    if (action == "last") {
      let pageValue = (Math.ceil(totalToken / rowsPerPage)-1) * rowsPerPage;
      setPage(pageValue);
      let values = { addr: address, pageNum: pageValue, perpage: rowsPerPage };
      transferDetail(values);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    let values = { addr: address, pageNum: 0, perpage: event.target.value };
    transferDetail(values);
  };

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const updateFiltersAndGetAccounts = async (filters) => {
    await setSearchAndFilters(filters);
    setLoading(true);
    setSortingKey(0);
    setSortingOrder(0);
    transferDetail(null, filters);
  };
  const NoDataFoundContainer = styled.div`
      display: flex;
      flex-flow: column;
      height: 300px !important;,
    justify-content: center;
      align-items: center;
      margin-top: 140px !important;,
    gap: 10 px;
      @media (min-width: 0px) and (max-width: 767px) {
        margin: 30px 0 !important;
        height: 70px !important;,
      }
    `;

  return (
    <>
      <SearchAndFiltersComponent
        searchAndFilters={searchAndFilters}
        updateFiltersAndGetAccounts={updateFiltersAndGetAccounts}
      />
      <Paper elevation={0}>
        <TableContainer className={classes.container} id="container-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ border: "none" }} align="left">
                  <span
                    className={
                      "tableheaders_Transfer-table-hash cursor-pointer"
                    }
                    onClick={() => sortTable("hash")}
                  >
                    Transaction Hash
                    <Tooltip
                      open={txHashToolTop}
                      onOpen={() => setTxHashToolTop(true)}
                      onClose={() => setTxHashToolTop(false)}
                      placement="top"
                      title={messages.HASH}
                    >
                      <img
                        onClick={() => setTxHashToolTop(!txHashToolTop)}
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                    {sortingKey && sortingOrder && sortingKey == "hash" ? (
                      sortingOrder === -1 ? (
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
                    className={"tableheaders_Transfer-table-age cursor-pointer"}
                    onClick={() => sortTable("timestamp")}
                  >
                    Age
                    <Tooltip
                      open={ageToolTip}
                      onOpen={() => setAgeToolTip(true)}
                      onClose={() => setAgeToolTip(false)}
                      placement="top"
                      title={messages.AGE}
                    >
                      <img
                        onClick={() => setAgeToolTip(!ageToolTip)}
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                    {sortingKey && sortingOrder && sortingKey == "timestamp" ? (
                      sortingOrder === -1 ? (
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
                      "tableheaders_Transfer-table-block cursor-pointer"
                    }
                    onClick={() => sortTable("blockNumber")}
                  >
                    Block
                    <Tooltip
                      open={blockToolTip}
                      onOpen={() => setBlockToolTip(true)}
                      onClose={() => setBlockToolTip(false)}
                      placement="top"
                      title={messages.BLOCK}
                    >
                      <img
                        onClick={() => setBlockToolTip(!blockToolTip)}
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                    {sortingKey &&
                    sortingOrder &&
                    sortingKey == "blockNumber" ? (
                      sortingOrder === -1 ? (
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
                      "tableheaders_Transfer-table-from cursor-pointer"
                    }
                    onClick={() => sortTable("from")}
                  >
                    From
                    <Tooltip
                      open={fromToolTip}
                      onOpen={() => setFromToolTip(true)}
                      onClose={() => setFromToolTip(false)}
                      placement="top"
                      title={messages.FROM}
                    >
                      <img
                        onClick={() => setFromToolTip(!fromToolTip)}
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                    {sortingKey && sortingOrder && sortingKey == "from" ? (
                      sortingOrder === -1 ? (
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
                    className={"tableheaders_Transfer-table-to cursor-pointer"}
                    onClick={() => sortTable("to")}
                  >
                    To
                    <Tooltip
                      open={toToolTip}
                      onOpen={() => setToToolTip(true)}
                      onClose={() => setToToolTip(false)}
                      placement="top"
                      title={messages.TO}
                    >
                      <img
                        onClick={() => setToToolTip(!toToolTip)}
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                    {sortingKey && sortingOrder && sortingKey == "to" ? (
                      sortingOrder === -1 ? (
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
              </TableRow>
            </TableHead>
            {isLoading == true ? (
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }} colspan="5">
                    <div className="loader-transfer-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              transfer &&
              transfer.length >= 1 &&
              transfer.map((row) => {
                const currentTime = new Date();
                const previousTime = new Date(row.timestamp * 1000);
                const ti = Utils.timeDiff(currentTime, previousTime);
                return (
                  <StyledTableRow tabIndex={-1} key={row.code}>
                    <TableCell id="td" style={{ border: "none" }}>
                      <a
                        style={{ color: "#2b51bc", fontSize: 11 }}
                        href={"/transfer-transaction-details/" + row.hash}
                      >
                        <span className="tabledata table-data">
                          {shorten(row.hash)}
                        </span>
                      </a>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>
                      <span
                        style={{ color: "#2a2a2a" }}
                        className="tabledata table-data"
                      >
                        {ti}
                      </span>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>
                      <a
                        style={{ color: "#2b51bc", fontSize: 11 }}
                        href={"/block-details/" + row.blockNumber}
                      >
                        <span className="tabledata table-data">
                          {" "}
                          {row.blockNumber}
                        </span>
                      </a>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>
                      <a
                        style={{ color: "#2b51bc", fontSize: 11 }}
                        href={"/address-details/" + row.from}
                      >
                        <Tooltip placement="top" title={row.from}>
                          <span className="tabledata table-data">
                            {shorten(row.from)}
                          </span>
                        </Tooltip>
                      </a>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>
                      <a
                        style={{ color: "#2419b9", fontSize: 11 }}
                        href={"/address-details/" + row.to}
                      >
                        <Tooltip placement="top" title={row.to}>
                          <span className="tabledata table-data">
                            {shorten(row.to)}
                          </span>
                        </Tooltip>
                      </a>
                    </TableCell>
                  </StyledTableRow>
                );
              })
            )}
            {/* {
              noData == false && (

                <TableCell id="td" style={{ border: "none" }}>
                  <span className="tabledata table-data">
                    No Transfers Found
                  </span>
                </TableCell>

              )
            } */}
          </Table>
          {noData == false && (
            <NoDataFoundContainer>
              <img
                src={require("../../../src/assets/images/XDC-Alert.svg")}
              ></img>

              <div className="not-found">No Transfers Found</div>
            </NoDataFoundContainer>
          )}
        </TableContainer>
      </Paper>
      <Pagination>
        <LeftPagination>
          {(!isLoading && noData == false) || totalToken < 10? (
            ""
          ) : (
            <>
              <p className="p-pagination">Show</p>
              <PageSelector
                value={rowsPerPage}
                height={35}
                handler={handleChangeRowsPerPage}
              />

              <p className="p-pagination">Records</p>
            </>
          )}
        </LeftPagination>
        {noData == true && totalToken > rowsPerPage ? (
          <RightPagination
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: "0%",
            }}
          >
            <div
              className={page === 0 ? "firstbox disabled" : "firstbox"}
              onClick={() => handleChangePage("first")}
            >
              <button style={{ backgroundColor: "white" }} className="first">
                First
              </button>
            </div>
            <div
              className={page === 0 ? "previousbox disabled" : "previousbox"}
              onClick={() => handleChangePage("prev")}
            >
              <p className="path">
                <img className="rotate-180" src={"/images/next.svg"} width="9px" />
              </p>
            </div>
            <div className="pagebox">
              <p className="Page-1-of-5">
                Page&nbsp;
                {Math.ceil(totalToken / rowsPerPage) -
                  Math.ceil((totalToken - page) / rowsPerPage) +
                  1}
                &nbsp;of {Math.ceil(totalToken / rowsPerPage)}
              </p>
            </div>
            <div
              className={
                page + transfer.length === totalToken
                  ? "nextbox disabled"
                  : "nextbox"
              }
            >
              <p className="path-2" onClick={() => handleChangePage("next")}>
                <img src={"/images/next.svg"} width="9px" />
              </p>
            </div>
            <div
              className={
                page + transfer.length === totalToken
                  ? "lastbox disabled"
                  : "lastbox"
              }
              onClick={() => handleChangePage("last")}
            >
              <button style={{ backgroundColor: "white" }} className="last">
                Last
              </button>
            </div>
          </RightPagination>
        ) : (
          ""
        )}
      </Pagination>
    </>
  );
}
