import React from "react";
import "../../../src/assets/styles/blocksAndTransactionList.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Grid, TableContainer } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Loader from '../../assets/loader'

function timeDiff(curr, prev) {
  if (curr < prev) return "0 secs ago";
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
  "@media (min-width:0px) and (max-width: 1240px)": {
    container: {
      height: "48.375rem",
    },

  },
});
const Pagination = styled.div`
  @media (min-width: 640px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

export default function TransactionComponent(props) {
  const classes = useStyles();

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const { state } = props;
  return (
    <Grid className="tableresponsive">
      <Grid class="tabletop-header">{state.tableName}</Grid>

      <Paper style={{ borderRadius: "14px" }} elevation={0}>
        <TableContainer className={classes.container} id="container-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  className="table-head-hash hash-transaction-list-all"
                  align="left"
                >
                  <span className={("tableheaders-hash", "tableheaders")}>
                    Hash
                  </span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "2.813rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-all")}>
                    Amount
                  </span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-age")}>
                    Age
                  </span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-all")}>
                    Block
                  </span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-all")}>
                    From
                  </span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-all")}>
                    To
                  </span>
                </TableCell>
                {/* <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-txn-fee")}>
                    Txn Fee
                  </span>
                </TableCell> */}
              </TableRow>
            </TableHead>
            {props.state.isLoading == true ? (
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: 'none' }} colspan="7">
                    <div className="loader-block-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) :
              <TableBody>
                {props.state.transactionList &&
                  props.state.transactionList.length >= 1 &&
                  props.state.transactionList.map((row, index) => {
                    const currentTime = new Date();
                    const previousTime = new Date(row.timestamp * 1000);
                    const ti = timeDiff(currentTime, previousTime);
                    const txFee = (
                      (row?.gasUsed * row?.gasPrice) / 100000000000000000
                    ).toFixed(9);
                    let amt = (row.value / 1000000000000000000).toFixed(4);
                    const Hash = row.hash;
                    let animationClass = props.state.hashAnimation?.[Hash];
                    return (
                      <TableRow
                        key={row.name}
                        style={
                          index % 2 !== 1
                            ? { background: "#f9f9f9" }
                            : { background: "white" }
                        }
                      >
                        <TableCell style={{ border: "none", width: "190px" }}>
                          <Tooltip placement="right" title={row.hash}>
                            <VisibilityOutlinedIcon
                              fontSize="small"
                              style={{ color: "#b9b9b9", marginRight: "3px" }}
                            />
                          </Tooltip>
                          <a
                            className="linkTable"
                            href={"/transaction-details/" + row.hash}
                          >
                            {" "}
                            <span
                              className={
                                animationClass ? animationClass : "tabledata"
                              }
                            >
                              {" "}
                              {shorten(row.hash)}
                            </span>{" "}
                          </a>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",
                            width: "100px",
                            paddingLeft: "2.813rem",
                          }}
                          align="left"
                        >
                          <span
                            className={
                              animationClass ? animationClass : "tabledata"
                            }
                          >
                            {amt >= 0.0001 ? amt : 0}
                          </span>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",
                            width: "120px",
                            paddingLeft: "2.813rem",
                          }}
                          align="left"
                        >
                          <span
                            className={
                              animationClass ? animationClass : "tabledata"
                            }
                          >
                            {ti}
                          </span>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",
                            width: "120px",
                            paddingLeft: "2.813rem",
                          }}
                          align="left"
                        >
                          {" "}
                          <a
                            className="linkTable"
                            href={"/block-details/" + row.blockNumber}
                          >
                            {" "}
                            <span
                              className={
                                animationClass ? animationClass : "tabledata"
                              }
                            >
                              {" "}
                              {row.blockNumber}
                            </span>{" "}
                          </a>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",
                            width: "160px",
                            paddingLeft: "2.813rem",
                          }}
                          align="left"
                        >
                          {" "}
                          <a
                            className="linkTable"
                            href={"/address-details/" + row.from}
                          >
                            <Tooltip placement="top" title={row.from}>
                              <span
                                className={
                                  animationClass ? animationClass : "tabledata"
                                }
                              >
                                {shorten(row.from)}
                              </span>
                            </Tooltip>
                          </a>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",
                            width: "155px",
                            paddingLeft: "2.813rem",
                          }}
                          align="left"
                        >
                          {" "}
                          <a
                            className="linkTable"
                            href={"/address-details/" + row.to}
                          >
                            <Tooltip placement="top" title={row.to}>
                              <span
                                className={
                                  animationClass ? animationClass : "tabledata"
                                }
                              >
                                {!row.to ? "------------------" : shorten(row.to)}
                              </span>
                            </Tooltip>
                          </a>
                        </TableCell>
                        {/* <TableCell
                          style={{ border: "none", paddingLeft: "2.813rem" }}
                          align="left"
                        >
                          <span
                            className={
                              animationClass ? animationClass : "tabledata"
                            }
                          >
                            {txFee == 0 ? 0 : txFee} XDC
                          </span>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
              </TableBody>}
          </Table>
        </TableContainer>
      </Paper>

      <Grid container style={{ marginTop: "2.25rem" }} className="Pagination">
        {/* <Pagination> */}
        <Grid className="Pagination_1">
          <span className="text">Show</span>
          <select
            value={props.state.amount}
            className="select-amount"
            onChange={(event) => props._handleChange(event)}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text">Records</span>
        </Grid>

        <Grid item className="Pagination_2">
          <button
            onClick={(event) => props._FirstPage(event)}
            className={
              props.state.from === 0
                ? "btn disabled btn-first"
                : "btn btn-first"
            }
          >
            First
          </button>
          <button
            onClick={(event) => props._PrevPage(event)}
            className={
              props.state.from === 0 ? "btn disabled btn-back" : "btn btn-back"
            }
          >
            <img src={"/images/back.svg"} />{" "}
          </button>
          <button className="btn btn-page">
            Page{" "}
            {Math.round(state.totalTransaction / state.amount) +
              1 -
              Math.round(
                (state.totalTransaction - state.from) / state.amount
              )}{" "}
            of {Math.round(state.totalTransaction / state.amount)}
          </button>
          <button
            onClick={(event) => props._NextPage(event)}
            className={
              props.state.from + props.state.amount ===
                props.state.totalTransaction
                ? "btn disabled"
                : "btn btn-next"
            }
          >
            <img src={"/images/next.svg"} />
          </button>
          <button
            onClick={(event) => props._LastPage(event)}
            className={
              props.state.from + props.state.amount ===
                props.state.totalTransaction
                ? "btn disabled"
                : "btn btn-last"
            }
          >
            Last
          </button>
        </Grid>
        {/* </Pagination> */}
      </Grid>
    </Grid>
  );
}
