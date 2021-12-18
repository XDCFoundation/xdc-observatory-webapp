import React from "react";
import {
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Loader from "../../assets/loader";
import { makeStyles } from "@material-ui/core/styles";
import utility from "../../utility";
import styled from "styled-components";
import moment from "moment";

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
`;

export default function CommonTransactionsTable(props) {
  const classes = useStyles();
  const { transactionList, detailanimationclass, TransactionHeading } = props;

  return (
    <Paper
      style={{ borderRadius: "14px", width: "100%" }}
      elevation={0}
      className={classes.container}
    >
      {/* <TableContainer> */}
      {props.isHomePage ? (
        <TransactionHeaderContainer>
          <TransactionTitle>Latest Transactions</TransactionTitle>
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
                </span>
              </TableCell>
              <TableCell
                style={{ border: "none" }}
                className="padding-20px padding-top-0px"
                align="left"
              >
                <span className={("tableheaders", "tableheaders-age")}>
                  Age
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
                </span>
              </TableCell>
              <TableCell
                style={{ border: "none" }}
                className="padding-20px"
                align="left"
              >
                <span className={("tableheaders", "tableheaders-all")}>To</span>
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
          {props.state.isLoading == true ? (
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
                  const txFee = (
                    (row?.gasUsed * row?.gasPrice) /
                    100000000000000000
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
                      <TableCell
                        style={{
                          border: "none",
                          width: "190px",
                          whiteSpace: "nowrap",
                          padding: "20px",
                        }}
                        className="padding-left-40px"
                      >
                        <Tooltip placement="right" title={row.hash}>
                          {/* <VisibilityOutlinedIcon
                            fontSize="small"
                            style={{ color: "#b9b9b9", marginRight: "3px" }}
                          />
                        </Tooltip> */}
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
                          whiteSpace: "nowrap",
                          padding: "20px",
                        }}
                        align="left"
                      >
                        <Tooltip title={moment(row.timestamp* 1000).format('YYYY-MM-DD hh:mm:ss')} arrow={true} className="fs-15">
                        <span
                          className={
                            animationClass ? animationClass : "tabledata"
                          }
                        >
                          {ti}
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
                          padding: "20px",
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