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
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../assets/loader";
import { messages } from "../../constants"
import utility from "../../utility"

const useStyles = makeStyles({
  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  "@media (min-width:0px) and (max-width: 1240px)": {
    container: {
      // height: "48.375rem",
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
                    <Tooltip placement="top" title={messages.HASH}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>
                    Height
                    <Tooltip placement="top" title={messages.BLOCK_HEIGHT}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>
                    Age
                    <Tooltip placement="top" title={messages.AGE}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>
                    Transactions
                    <Tooltip placement="top" title={messages.NO_OF_TRANSACTION}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>
                    Difficulty
                    <Tooltip placement="top" title={messages.DIFFICULTY}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders table-headers"}>
                    Gas Used
                    <Tooltip placement="top" title={messages.GAS_USED}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
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
                    const ti = utility.timeDiff(currentTime, previousTime);
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

                          <span
                            className={
                              animationClass
                                ? animationClass
                                : "tabledata table-data"
                            }
                          >
                            {shorten(row.hash)}{" "}
                          </span>

                        </TableCell>
                        <TableCell
                          style={{ border: "none" }}
                          className="w-2"
                          align="left"
                        >
                          <a
                            className="linkTable"
                            href={"/block-details/" + row.number}
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
      <Grid container style={{ marginTop: "28px" }} className="Pagination">
        <Grid item className="Pagination_1">
          <span className="textShowRecordBlock">Show</span>
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
          <span className="textShowRecordBlock">Records</span>
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
            <img className="rotate-180" src={"/images/next.svg"} width="10px" />
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
            <img src={"/images/next.svg"} width="10px" />
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
