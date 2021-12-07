import React from "react";
import BaseComponent from "../baseComponent";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import back from "../../assets/images/back.svg";
import next from "../../assets/images/next.svg";
import Loader from "../../assets/loader";

function timeDiff(curr, prev) {
  if (curr < prev) return "0 secs ago";
  let ms_Min = 60 * 1000; // milliseconds in Minute
  let ms_Hour = ms_Min * 60; // milliseconds in Hour
  let ms_Day = ms_Hour * 24; // milliseconds in day
  let ms_Mon = ms_Day * 30; // milliseconds in Month
  let ms_Yr = ms_Day * 365; // milliseconds in Year
  let diff = curr - prev; //difference between dates.
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

export default function BlocksComponent(props) {
  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const { state } = props;
  const classes = useStyles();
  return (
    <Grid className="table_1 ">
      <Grid class="tabletop-header table-top-header">{state.tableName}</Grid>
      <Paper style={{ borderRadius: "14px" }} elevation={0}>
        <TableContainer className={classes.container} id="container-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers block-list-all"}>
                    Hash
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>Height</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>Age</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>
                    Transactions
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>
                    Difficulty
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>Gas Used</span>
                </TableCell>
                {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
              </TableRow>
            </TableHead>
            {props.state.isLoading == true ? (
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }} colspan="6">
                    <div className="loader-block-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {props.state.blocksList &&
                  props.state.blocksList.length >= 1 &&
                  props.state.blocksList.map((row, index) => {
                    const currentTime = new Date();
                    const previousTime = new Date(row.timestamp * 1000);
                    const ti = timeDiff(currentTime, previousTime);
                    const blockNumber = row.number;
                    let animationClass =
                      props.state.blockAnimation?.[blockNumber];
                    return (
                      <TableRow
                        key={row.name}
                        style={
                          index % 2 !== 1
                            ? { background: "#f9f9f9" }
                            : { background: "white" }
                        }
                      >
                        <TableCell
                          style={{ border: "none" }}
                          className="w-1"
                          margin-left="5px"
                        >
                          <Tooltip placement="right" title={row.hash}>
                            <VisibilityOutlinedIcon
                              fontSize="small"
                              style={{ color: "#b9b9b9", marginRight: "7px" }}
                            />
                          </Tooltip>
                          <a
                            className="linkTable"
                            href={"/transaction-details/" + row.hash}
                          >
                            <span
                              className={
                                animationClass
                                  ? animationClass
                                  : "tabledata table-data"
                              }
                            >
                              {shorten(row.hash)}{" "}
                            </span>
                          </a>
                        </TableCell>
                        <TableCell
                          style={{ border: "none" }}
                          className="w-2"
                          align="left"
                        >
                          <a
                            className="linkTable"
                            href={"/block-details/" + row._id}
                          >
                            <span
                              className={
                                animationClass
                                  ? animationClass
                                  : "tabledata table-data "
                              }
                            >
                              {row.number}
                            </span>
                          </a>
                        </TableCell>
                        <TableCell
                          style={{ border: "none" }}
                          className="w-3"
                          align="left"
                        >
                          <span
                            className={
                              animationClass
                                ? animationClass
                                : "tabledata table-data "
                            }
                          >
                            {ti < 0 ? "0 secs ago" : ti}
                          </span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none" }}
                          className="w-4"
                          align="left"
                        >
                          <span
                            className={
                              animationClass
                                ? animationClass
                                : "tabledata table-data pad-left-6"
                            }
                          >
                            {" "}
                            {row.transactions.length}
                          </span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none" }}
                          className="w-5"
                          align="left"
                        >
                          <span
                            className={
                              animationClass
                                ? animationClass
                                : "tabledata table-data pad-left-4"
                            }
                          >
                            {row.difficulty}
                          </span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span
                            className={
                              animationClass
                                ? animationClass
                                : "tabledata pad-left-7"
                            }
                          >
                            {row.gasUsed}
                          </span>
                        </TableCell>
                        {/* <TableCell style={{ border: "none" }} align="right"><span className="tabledata">0.00000000005 XDC</span></TableCell> */}
                      </TableRow>
                    );
                  })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
      <Grid container style={{ marginTop: "25px" }} className="Pagination">
        <Grid item className="Pagination_1">
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
            <img src={back} width="10px" />
          </button>
          <button className="btn btn-page">
            Page{" "}
            {Math.round(state.totalblocks / state.amount) +
              1 -
              Math.round((state.totalblocks - state.from) / state.amount)}{" "}
            of {Math.round(state.totalblocks / state.amount)}
          </button>
          <button
            onClick={(event) => props._NextPage(event)}
            className={
              props.state.from + props.state.amount === props.state.totalblocks
                ? "btn disabled"
                : "btn btn-next"
            }
          >
            <img src={next} width="10px" />
          </button>
          <button
            onClick={(event) => props._LastPage(event)}
            className={
              props.state.from + props.state.amount === props.state.totalblocks
                ? "btn disabled"
                : "btn btn-last"
            }
          >
            Last
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
}
