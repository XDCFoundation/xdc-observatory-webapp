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
import { messages } from "../../constants";
import utility from "../../utility";
import { useState } from "react";
import PageSelector from "../../modules/common/pageSelector"

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
  selectAmount: {
    height: "70%",
    marginRight: "20px",
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
  const [hashTT, setHashTT] = useState(false);
  const [heightTT, setHeightTT] = useState(false);
  const [ageTT, setAgeTT] = useState(false);
  const [transactionTT, setTransactionTT] = useState(false);
  const [difficultyTT, setDifficultyTT] = useState(false);
  const [gasUsedTT, setGasUsedTT] = useState(false);

  if(props.state.lastPage===true){
    props.state.blocksList.sort(function (a, b) {
      return Number(b.number) - Number(a.number);
    });
  }
  return (
    <Grid className="table_1 ">
      <Grid class={props.theme === "dark" ? "tabletop-heading-dark table-top-header" : "tabletop-header table-top-header"}>{state.tableName}</Grid>
      <div style={{ borderRadius: "14px"}} elevation={0}>
        <TableContainer className={props.theme === "dark" ? classes.containerDark : classes.container} id="container-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={props.theme === "dark" ? "tableheaders-dark table-headers-dark block-list-all" : "tableheaders table-headers block-list-all"}>
                    Hash
                    <Tooltip
                      open={hashTT}
                      onOpen={() => setHashTT(true)}
                      onClose={() => setHashTT(false)}
                      placement="top" 
                      title={messages.HASH}>
                      <img
                        onClick={() => setHashTT(!hashTT)}
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={props.theme === "dark" ? "tableheaders-dark table-headers-dark" : "tableheaders table-headers"}>
                    Height
                    <Tooltip
                      open={heightTT}
                      onOpen={() => setHeightTT(true)}
                      onClose={() => setHeightTT(false)}  
                      placement="top" 
                      title={messages.BLOCK_HEIGHT}>
                      <img
                        onClick={() => setHeightTT(!heightTT)}
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={props.theme === "dark" ? "tableheaders-dark table-headers-dark" : "tableheaders table-headers"}>
                    Age
                    <Tooltip 
                      open={ageTT}
                      onOpen={() => setAgeTT(true)}
                      onClose={() => setAgeTT(false)} 
                      placement="top" 
                      title={messages.AGE}>
                      <img
                        onClick={() => setAgeTT(!ageTT)}
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={props.theme === "dark" ? "tableheaders-dark table-headers-dark" : "tableheaders table-headers"}>
                    Transactions
                    <Tooltip 
                      open={transactionTT}
                      onOpen={() => setTransactionTT(true)}
                      onClose={() => setTransactionTT(false)}
                      placement="top" 
                      title={messages.NO_OF_TRANSACTION}>
                      <img
                        onClick={() => setTransactionTT(!transactionTT)}
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={props.theme === "dark" ? "tableheaders-dark table-headers-dark" : "tableheaders table-headers"}>
                    Difficulty
                    <Tooltip 
                      open={difficultyTT}
                      onOpen={() => setDifficultyTT(true)}
                      onClose={() => setDifficultyTT(false)} 
                      placement="top" 
                      title={messages.DIFFICULTY}>
                      <img
                        onClick={() => setDifficultyTT(!difficultyTT)}
                        alt="question-mark"
                        src="/images/info.svg"
                        className="tooltipInfoIconAccount"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={props.theme === "dark" ? "tableheaders-dark table-headers-dark" : "tableheaders table-headers"}>
                    Gas Used
                    <Tooltip 
                      open={gasUsedTT}
                      onOpen={() => setGasUsedTT(true)}
                      onClose={() => setGasUsedTT(false)} 
                      placement="top" 
                      title={messages.GAS_USED}>
                      <img
                        onClick={() => setGasUsedTT(!gasUsedTT)}
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
                            ? props.theme === "dark" ? { background: "#192a59" } : { background: "#f9f9f9" }
                            : props.theme === "dark" ? { background: "#192a59" } : { background: "white" }
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
                                ?  props.theme === "dark" ? `${animationClass} latest-blocks-tabledata-dark` : animationClass
                                : props.theme === "dark" ? "latest-blocks-tabledata-dark" : "tabledata table-data"
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
                            className={props.theme === "dark" ? "linkTable-dark" : "linkTable"}
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
                                ?  props.theme === "dark" ? `${animationClass} latest-blocks-tabledata-dark` : animationClass
                                : props.theme === "dark" ? "latest-blocks-tabledata-dark" : "tabledata table-data"
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
                                ?  props.theme === "dark" ? `${animationClass} latest-blocks-tabledata-dark` : animationClass
                                : props.theme === "dark" ? "latest-blocks-tabledata-dark pad-left-6" : "tabledata table-data pad-left-6"
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
                                ?  props.theme === "dark" ? `${animationClass} latest-blocks-tabledata-dark` : animationClass
                                : props.theme === "dark" ? "latest-blocks-tabledata-dark pad-left-4" : "tabledata table-data pad-left-4"
                            }
                          >
                            {row.difficulty}
                          </span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span
                            className={
                              animationClass
                                ?  props.theme === "dark" ? `${animationClass} latest-blocks-tabledata-dark` : animationClass
                                : props.theme === "dark" ? "latest-blocks-tabledata-dark pad-left-7" : "tabledata table-data pad-left-7"
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
      </div>
      <Grid container style={{ marginTop: "28px" }} className="Pagination">
        <Grid item className="Pagination_1">
          <span className={props.theme === "dark" ? "textShowRecordBlockDark" : "textShowRecordBlock"}>Show</span>
          <PageSelector value={props.state.amount}
                height={35}
                handler={(event) => props._handleChange(event)} 
                theme={props.theme}
                />
          {/* <select
            value={props.state.amount}
            className="select-amount"
            onChange={(event) => props._handleChange(event)}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select> */}
          <span className={props.theme === "dark" ? "textShowRecordBlockDark" : "textShowRecordBlock"}>Records</span>
        </Grid>

        <Grid item className="Pagination_2">
          <button
            onClick={(event) => props._FirstPage(event)}
            className={
              props.state.from === 0
                ? props.theme === "dark" ? "btn-latest-block-dark disabled-dark btn-first" : "btn disabled btn-first"
                : props.theme === "dark" ? "btn-latest-block-dark btn-first" : "btn btn-first"
            }
          >
            First
          </button>
          <button
            onClick={(event) => props._PrevPage(event)}
            className={
              props.state.from === 0 
              ? props.theme === "dark" ? "btn-latest-block-dark disabled-dark btn-back" : "btn disabled btn-back" 
              : props.theme === "dark" ? "btn-latest-block-dark  btn-back" : "btn btn-back"
            }
          >
            <img className="rotate-180" src={"/images/next.svg"} width="10px" />
          </button>
          <button className={props.theme === "dark" ? "btn-latest-block-dark  btn-page" : "btn btn-page"}>
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
                ? props.theme === "dark" ? "btn-latest-block-dark disabled-dark" : "btn disabled"
                : props.theme === "dark" ? "btn-latest-block-dark  btn-next" : "btn btn-next"
            }
          >
            <img src={"/images/next.svg"} width="10px" />
          </button>
          <button
            onClick={(event) => props._LastPage(event)}
            className={
              props.state.from + props.state.amount === props.state.totalblocks
                ? props.theme === "dark" ? "btn-latest-block-dark disabled-dark" : "btn disabled"
                : props.theme === "dark" ? "btn-latest-block-dark  btn-last" : "btn btn-last"
            }
          >
            Last
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
}
