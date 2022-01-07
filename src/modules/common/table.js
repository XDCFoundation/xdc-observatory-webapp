import React from "react";
import {
  Paper,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Loader from "../../assets/loader";
import { makeStyles } from "@material-ui/core/styles";
import utility from "../../utility";
import styled from "styled-components";
import moment from "moment";
import Utility from "../../utility";
import { CompareArrowsOutlined } from "@material-ui/icons";
import { messages } from "../../constants";
import TransactionDetailTooltip from "./transactionDetailTooltip";

const useStyles = makeStyles({
  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  // "@media (min-width:0px) and (max-width: 1240px)": {
  //   container: {
  //     height: "48.375rem",
  //   },
  // },
  input: {
    paddingRight: "30px !important",
  },
});

const TransactionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 15px 15px 15px;
`;

const TransactionTitle = styled.div`
  width: auto;
  margin-left: 25px;
  height: 1.125rem;
  text-align: left;
  letter-spacing: 0.043rem;
  color: #2a2a2a;
  opacity: 1;
  font-family: Inter;
  font-size: 1.125rem;
  font-weight: 600;
  @media (min-width: 0px) and (max-width: 767px) {
    margin-left: 12px;
  }
`;

export default function CommonTransactionsTable(props) {
  const classes = useStyles();
  const { transactionList } = props;

  return (
    <Paper
      style={{ borderRadius: "14px", width: "100%" }}
      elevation={0}
      className={classes.container}
    >
      {/* <TableContainer> */}
      {props.isHomePage ? (
        <TransactionHeaderContainer>
          <TransactionTitle></TransactionTitle>
          <a
            className="nav_button margin-right-30px"
            href="/view-all-transaction"
          >
            View All
          </a>
        </TransactionHeaderContainer>
      ) : (
        ""
      )}
      <div className="overflow-auto br-14px">
        <Table id="container-table">
          <TableHead>
            <TableRow>
              <TableCell
                className="table-head-hash border-none padding-left-40px padding-bottom-20px padding-top-20px"
                align="left"
              >
                <span className={("tableheaders-hash", "tableheaders")}>
                  Hash
                  <Tooltip placement="top" title={messages.HASH}>
                    <img
                      alt="question-mark"
                      src="/images/question-mark.svg"
                      height={"14px"}
                      className="tooltipLatestTransactionTableDashboard"
                    />
                  </Tooltip>
                </span>
              </TableCell>
              <TableCell
                style={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
                className="padding-20px"
                align="left"
              >
                <span className={("tableheaders", "tableheaders-all")}>
                  Amount
                  <Tooltip placement="top" title={messages.AMOUNT}>
                    <img
                      alt="question-mark"
                      src="/images/question-mark.svg"
                      height={"14px"}
                      className="tooltipLatestTransactionTableDashboard"
                    />
                  </Tooltip>
                </span>
              </TableCell>
              <TableCell
                style={{ border: "none" }}
                className="padding-20px padding-top-0px"
                align="left"
              >
                <span className={("tableheaders", "tableheaders-age")}>
                  Date
                  <Tooltip placement="top" title={messages.DATE}>
                    <img
                      alt="question-mark"
                      src="/images/question-mark.svg"
                      height={"14px"}
                      className="tooltipLatestTransactionTableDashboard"
                    />
                  </Tooltip>
                </span>
              </TableCell>
              {props.showBlock ? (
                <TableCell
                  style={{
                    border: "none",
                    whiteSpace: "nowrap",
                  }}
                  className="padding-20px"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-all")}>
                    Block
                    <Tooltip placement="top" title={messages.BLOCK}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        className="tooltipLatestTransactionTableDashboard"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
              ) : (
                ""
              )}
              <TableCell
                style={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
                className="padding-20px"
                align="left"
              >
                <span className={("tableheaders", "tableheaders-all")}>
                  From
                  <Tooltip placement="top" title={messages.FROM}>
                    <img
                      alt="question-mark"
                      src="/images/question-mark.svg"
                      height={"14px"}
                      className="tooltipLatestTransactionTableDashboard"
                    />
                  </Tooltip>
                </span>
              </TableCell>
              <TableCell
                style={{ border: "none" }}
                className="padding-20px"
                align="left"
              >
                <span className={("tableheaders", "tableheaders-all")}>
                  To
                  <Tooltip placement="top" title={messages.TO}>
                    <img
                      alt="question-mark"
                      src="/images/question-mark.svg"
                      height={"14px"}
                      className="tooltipLatestTransactionTableDashboard"
                    />
                  </Tooltip>
                </span>
              </TableCell>
              {props.showDetail ? (
                <TableCell
                  style={{
                    border: "none",
                    whiteSpace: "nowrap",
                  }}
                  className="padding-20px"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-all")} />
                </TableCell>
              ) : (
                ""
              )}
              {/* <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className=""
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-txn-fee")}>
                    Txn Fee
                  </span>
                </TableCell> */}
            </TableRow>
          </TableHead>
          {props.state.isLoading === true ? (
            <TableBody>
              <TableRow>
                <TableCell style={{ border: "none" }} colspan="7">
                  <div className="loader-block-list">
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {transactionList &&
                transactionList.length >= 1 &&
                transactionList.map((row, index) => {
                  const currentTime = new Date();
                  const previousTime = new Date(row.timestamp * 1000);
                  const ti = utility.timeDiff(currentTime, previousTime);
                  // const txFee = (
                  //   (row?.gasUsed * row?.gasPrice) /
                  //   100000000000000000
                  // ).toFixed(9);
                  let amt = Utility.decimalDivison(row.value, 8);
                  let amt1 = amt?.toString()?.split(".")[0]
                  let amt2 = amt?.toString()?.split(".")[1]



                  const Hash = row.hash;
                  let animationClass = props.state.hashAnimation?.[Hash];
                  return (
                    <>
                      {/* {amt > 0 ?  //if transaction amount is greater than 0 only then show the transaction */}
                      <TableRow
                        key={row.hash}
                        style={
                          index % 2 !== 1
                            ? { background: "#f9f9f9" }
                            : { background: "white" }
                        }
                      >
                        <TableCell
                          style={{
                            border: "none",
                            width: "190px",
                            whiteSpace: "nowrap",
                            padding: "20px",
                            display: "flex",
                            margin: 0,
                            alignItems: "center"
                          }}
                          className="padding-left-40px"
                        >
                          <div><TransactionDetailTooltip transactionAddress={row.hash} /></div>
                          <Tooltip placement="right" title={row.hash}>

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
                          </Tooltip>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",
                            width: "100px",
                            whiteSpace: "nowrap",
                            padding: "20px",
                          }}
                          align="left"
                        >{amt2 == null ? (<span
                          className={
                            animationClass ? animationClass : "tabledata"
                          }
                        >

                          {amt1} XDC
                        </span>) : (
                          <span
                            className={
                              animationClass ? animationClass : "tabledata"
                            }
                          >

                            {amt1}{"."}<span style={{ color: "#9FA9BA" }}>{amt2}</span> XDC
                          </span>
                        )}

                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",
                            width: "120px",
                            whiteSpace: "nowrap",
                            padding: "20px",
                          }}
                          align="left"
                        >
                          <Tooltip
                            title={moment(row.timestamp * 1000).format(
                              "YYYY-MM-DD hh:mm:ss"
                            )}
                            arrow={true}
                            className="fs-15"
                          >
                            <span
                              className={
                                animationClass ? animationClass : "tabledata"
                              }
                            >
                              {moment(row.timestamp * 1000).format(
                                "MMMM DD, YYYY"
                              )}
                            </span>
                          </Tooltip>
                        </TableCell>
                        {props.showBlock ? (
                          <TableCell
                            style={{
                              border: "none",
                              width: "120px",
                              whiteSpace: "nowrap",
                              padding: "20px",
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
                        ) : (
                          ""
                        )}
                        <TableCell
                          style={{
                            border: "none",
                            width: "160px",
                            whiteSpace: "nowrap",
                            padding: "20px",
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
                            whiteSpace: "nowrap",

                            paddingRight: "30px !important",
                          }}
                          align="left"
                          className={classes.input}
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
                                style={{
                                  paddingRight: "30px !important",
                                }}
                              >
                                {!row.to
                                  ? "------------------"
                                  : shorten(row.to)}
                              </span>
                            </Tooltip>
                          </a>
                        </TableCell>
                        {props.showDetail ? (
                          <TableCell
                            style={{
                              border: "none",
                              width: "155px",
                              whiteSpace: "nowrap",
                              padding: "20px",
                            }}
                            align="left"
                          >
                            {" "}
                            <div className="latest_child w-18 mar_child wid-17 details-pad ">
                              <a
                                className={
                                  animationClass ? animationClass : "details "
                                }
                                href={"/transaction-details/" + row.hash}
                              >
                                Details
                              </a>
                            </div>
                          </TableCell>
                        ) : (
                          ""
                        )}
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
                      {/* : "" } */}
                    </>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </div>
      {/* </TableContainer> */}
    </Paper>
  );
}

function shorten(b, amountL = 10, amountR = 3, stars = 3) {
  return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
    b.length - 3,
    b.length
  )}`;
}
