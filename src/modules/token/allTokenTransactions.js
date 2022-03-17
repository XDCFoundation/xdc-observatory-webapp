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
    containerDark: {
      borderRadius: "14px",
      boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
      backgroundColor: "#192a59",
      background: "#192a59",
      borderBottom: "none",
      "@media (min-width: 0px) and (max-width: 1240px)": {
        // height: "12.563rem",
      },
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

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transfer, settransfer] = useState({});
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [noData, setNoData] = useState(true);
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
  const [transactions, setTransactions] = useState([]);

  const sortTable = (_sortKey) => {
    let _sortOrder = -1;
    if (sortingKey && sortingKey.includes(_sortKey)) {
      _sortOrder = sortingOrder * -1;
    } else {
      setSortingKey(_sortKey);
    }
    setSortingOrder(_sortOrder);
    if (_sortKey === "timestamp") _sortKey = "blockNumber";
    let requestObj = {
      skip: 0,
      limit: rowsPerPage,
      address: address,
      sortKey: { [_sortKey]: _sortOrder },
    };
    listOfTxns(requestObj);
  };

  useEffect(() => {
    let values = { address: address, skip: 0, limit: 10 };
    listOfTxns(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sortTable("blockNumber");
  }, []);
  const listOfTxns = async (values) => {
    if (!values.sortKey && sortingKey && sortingOrder)
      values.sortKey = { [sortingKey]: sortingOrder };
    let [error, tns] = await Utils.parseResponse(
      TokenData.getTokenTransactions(values)
    );
    if (error || !tns) return;
    setTransactions(tns.response);
    setLoading(false);

    if (!tns.response || tns.response.length === 0) {
      setNoData(false);
    }

    setTotalTransactions(tns?.count);
  };

  const handleChangePage = (action) => {
    if (action == "first") {
      setPage(0);
      let values = { address: address, skip: 0, limit: rowsPerPage };
      listOfTxns(values);
    }
    if (action == "prev") {
      if (page - rowsPerPage >= 0) {
        let pageValue = page - rowsPerPage;
        setPage(pageValue);
        let values = {
          address: address,
          skip: pageValue,
          limit: rowsPerPage,
        };
        listOfTxns(values);
      }
    }
    if (action == "next") {
      if (+rowsPerPage + +page < totalTransactions) {
        let pageValue = +rowsPerPage + +page;
        setPage(pageValue);
        let values = {
          address: address,
          skip: pageValue,
          limit: rowsPerPage,
        };
        listOfTxns(values);
      }
    }

    if (action == "last") {
      let pageValue =
        (Math.ceil(totalTransactions / rowsPerPage) - 1) * rowsPerPage;
      setPage(pageValue);
      let values = { address: address, skip: pageValue, limit: rowsPerPage };
      listOfTxns(values);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    let values = { address: address, skip: 0, limit: event.target.value };
    listOfTxns(values);
  };

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const NoDataFoundContainer = styled.div`
    display: flex;
    flex-flow: column;
    height: 300px !important;
    justify-content: center;
    align-items: center;
    margin-top: 140px !important;
    gap: 10 px;
    @media (min-width: 0px) and (max-width: 767px) {
      margin: 30px 0 !important;
      height: 70px !important;
    }
  `;

  return (
    <>
      <Paper style={props.theme === "dark" ? {borderRadius: "14px", backgroundColor: "#192a59"} : { borderRadius: "14px" }} elevation={0}>
        <TableContainer className={props.theme === "dark" ? classes.containerDark : classes.container} id="container-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ border: "none" }} align="left">
                  <span
                    className={
                      props.theme === "dark" ? "color-white tableheaders_Transfer-table-hash cursor-pointer":"tableheaders_Transfer-table-hash cursor-pointer"
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
                    className={props.theme === "dark" ? "tableheaders_Transfer-table-age cursor-pointer color-white":"tableheaders_Transfer-table-age cursor-pointer"}
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
                      props.theme === "dark" ? "tableheaders_Transfer-table-block cursor-pointer color-white":"tableheaders_Transfer-table-block cursor-pointer"
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
                      props.theme === "dark" ? "tableheaders_Transfer-table-from cursor-pointer color-white": "tableheaders_Transfer-table-from cursor-pointer"
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
                    className={props.theme === "dark" ? "tableheaders_Transfer-table-to cursor-pointer color-white":"tableheaders_Transfer-table-to cursor-pointer"}
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
              transactions &&
              transactions.length >= 1 &&
              transactions.map((row) => {
                const currentTime = new Date();
                const previousTime = new Date(row.timestamp * 1000);
                const ti = Utils.timeDiff(currentTime, previousTime);
                return (
                  <StyledTableRow tabIndex={-1} key={row.code}>
                    <TableCell id="td" style={{ border: "none" }}>
                      <a
                        style={{ color: props.theme === "dark" ? "#4874f4" : "#2b51bc", fontSize: 11 }}
                        href={"/transfer-transaction-details/" + row.hash}
                      >
                        <span className="tabledata table-data">
                          {shorten(row.hash)}
                        </span>
                      </a>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>
                      <span
                        style={{ color: props.theme === "dark" ? "#b1c3e1" : "#2a2a2a" }}
                        className="tabledata table-data"
                      >
                        {ti}
                      </span>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>
                      <a
                        style={{ color: props.theme === "dark" ? "#4874f4" : "#2b51bc", fontSize: 11 }}
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
                        style={{ color: props.theme === "dark" ? "#4874f4" : "#2b51bc", fontSize: 11 }}
                        href={"/address-details/" + row.from}
                      >
                        <Tooltip placement="top" title={row.from}>
                          <span className="tabledata table-data">
                            {row.from > "xdc" ? shorten(row.from) : row.from}
                          </span>
                        </Tooltip>
                      </a>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>
                      <a
                        style={{ color: props.theme === "dark" ? "#4874f4" : "#2b51bc", fontSize: 11 }}
                        href={"/address-details/" + row.to}
                      >
                        <Tooltip
                          placement="top"
                          title={
                            row.to > "xdc"
                              ? shorten(row.to)
                              : shorten(row.contract)
                          }
                        >
                          <span className="tabledata table-data">
                            {row.to > "xdc"
                              ? shorten(row.to)
                              : shorten(row.contract)}
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
          {(!isLoading && noData == false) || totalTransactions < 10 ? (
            ""
          ) : (
            <>
              <p className={props.theme === "dark" ? "p-pagination fc-b1c3e1" : "p-pagination"}>Show</p>
              <PageSelector
                value={rowsPerPage}
                height={35}
                handler={handleChangeRowsPerPage}
                theme={props.theme}
              />

              <p className={props.theme === "dark" ? "p-pagination fc-b1c3e1" : "p-pagination"}>Records</p>
            </>
          )}
        </LeftPagination>
        {noData == true && totalTransactions > rowsPerPage ? (
          <RightPagination
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: "0%",
            }}
          >
            <div
              className={page === 0  
                ? props.theme === "dark" ? "firstbox-dark disabled" : "firstbox disabled" 
                : props.theme === "dark" ? "firstbox-dark" : "firstbox" }
              onClick={() => handleChangePage("first")}
            >
              <button style={props.theme === "dark" ? {background: "transparent"} : { backgroundColor: "white" }} className={props.theme === "dark" ? "first-dark" : "first"}>
                First
              </button>
            </div>
            <div
              className={page === 0 
                ? props.theme === "dark" ? "previousbox-dark disabled" : "previousbox disabled" 
                : props.theme === "dark" ? "previousbox-dark" : "previousbox"}
              onClick={() => handleChangePage("prev")}
            >
              <p className="path">
                <img className="rotate-180" src={"/images/next.svg"} />
              </p>
            </div>
            <div className={props.theme === "dark" ? "pagebox-dark" : "pagebox"}>
              <p className={props.theme === "dark" ? "Page-1-of-5-dark" : "Page-1-of-5"}>
                Page&nbsp;
                {Math.ceil(totalTransactions / rowsPerPage) -
                  Math.ceil((totalTransactions - page) / rowsPerPage) +
                  1}
                &nbsp;of {Math.ceil(totalTransactions / rowsPerPage)}
              </p>
            </div>
            <div
              className={
                page + transactions.length === totalTransactions
                ? props.theme === "dark" ? "nextbox-dark disabled" : "nextbox disabled"
                : props.theme === "dark" ? "nextbox-dark" : "nextbox"
              }
            >
              <p className="path-2" onClick={() => handleChangePage("next")}>
                <img src={"/images/next.svg"} />
              </p>
            </div>
            <div
              className={
                page + transactions.length === totalTransactions
                ? props.theme === "dark" ? "lastbox-dark disabled" : "lastbox disabled"
                : props.theme === "dark" ? "lastbox-dark" : "lastbox"
              }
              onClick={() => handleChangePage("last")}
            >
              <button style={props.theme === "dark" ? {background: "transparent"} : { backgroundColor: "white" }} className={props.theme === "dark" ? "last-dark" : "last"}>
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
