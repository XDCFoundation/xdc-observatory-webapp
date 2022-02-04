import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import { messages } from "../../constants";
import TableBody from "@material-ui/core/TableBody";
import Loader from "../../assets/loader";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { history } from "../../managers/history";

const useStyles = makeStyles({
  container: {
    borderRadius: "0.875rem",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    overflowX: "auto",
    background: "#fff",
  },
});

const TransactionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 22px 15px 15px;
`;

const TransactionTitle = styled.div`
  width: auto;
  height: 1.125rem;
  text-align: left;

  color: #2a2a2a;
  opacity: 1;
  font-family: Inter;
  font-size: 1.125rem;
  font-weight: 600;
  //@media (min-width: 0px) and (max-width: 767px) {
  //  margin-left: 12px;
  //}
`;
const TransactionSubTitle = styled.div`
  width: auto;
  height: 1.125rem;
  text-align: left;

  color: #2a2a2a;
  font-family: Inter;
  font-size: 0.75rem;
  margin-left: 15px;
`;
const TableSubContainer = styled.div`
    @media (min-width: 0px) and (max-width: 767px) {
        max-width: 767px
        width: 100%;
        overflow-x: auto;
    }
`;

const LatestBlockView = (props) => {
  const classes = useStyles();
  const timezone = useSelector((state) => state.timezone);
  const [heightTT, setHeightTT] = useState(false);
  const [transactionTT, setTransactionTT] = useState(false);
  const [timeStampTT, setTimeStampTT] = useState(false);

  return (
    <Paper
      className={"table-list"}
      style={{
        borderRadius: "0.875rem",
        minWidth: "48%",
      }}
      elevation={0}
    >
      <TableContainer
        className={classes.container}
        id="container-table-token"
        style={{
          borderTop: "solid 0.063rem #e3e7eb",
          borderRadius: "0",
          boxShadow: "none",
          // borderRadius: "0.75rem",
          // border: "solid 0.063rem #e3e7eb",
          backgroundColor: "#ffffff",
          // boxShadow: "0 0.063rem 0.625rem 0 rgba(0 0, 0, 0.,1)",
          minHeight: "100%",
        }}
      >
        <TransactionHeaderContainer>
          <TransactionTitle>Latest Blocks</TransactionTitle>
          <a className="linkTable cursor-pointer" href="/view-all-blocks">
            View All
          </a>
        </TransactionHeaderContainer>
        <TransactionSubTitle>
          {"The most recently mined blocks"}
        </TransactionSubTitle>

        <TableSubContainer>
          <Table style={{ borderBottom: "none" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ border: "none", paddingLeft: "15px" }}
                  align="left"
                >
                  <span
                    className={"tablehead-token-details"}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    Height
                    <Tooltip
                      open={heightTT}
                      onOpen={() => setHeightTT(true)}
                      onClose={() => setHeightTT(false)}
                      placement="top"
                      title={messages.BLOCK_HEIGHT}
                    >
                      <img
                        onClick={() => setHeightTT(!heightTT)}
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      />
                    </Tooltip>
                  </span>
                </TableCell>

                <TableCell style={{ border: "none" }} align="left">
                  <span
                    className={"tablehead-token-details"}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    Timestamp
                    <Tooltip
                      open={timeStampTT}
                      onOpen={() => setTimeStampTT(true)}
                      onClose={() => setTimeStampTT(false)}
                      placement="top"
                      title={messages.BLOCK_CREATION_TIME_STAMP}
                    >
                      <img
                        onClick={() => setTimeStampTT(!timeStampTT)}
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span
                    className={"tablehead-token-details"}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    Transactions
                    <Tooltip
                      open={transactionTT}
                      onOpen={() => setTransactionTT(true)}
                      onClose={() => setTransactionTT(false)}
                      placement="top"
                      title={messages.NO_OF_TRANSACTION}
                    >
                      <img
                        onClick={() => setTransactionTT(!transactionTT)}
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                {/*    <TableCell style={{border: "none"}} align="left">*/}
                {/*<span className={"tablehead-token-details"}>*/}
                {/*  Reward*/}
                {/*  <Tooltip placement="top" title={messages.HASH}>*/}
                {/*    <img*/}
                {/*        alt="question-mark"*/}
                {/*        src="/images/question-mark.svg"*/}
                {/*        height={"14px"}*/}
                {/*        className="tooltipLatestTransactionTableDashboard"*/}
                {/*    />*/}
                {/*  </Tooltip>*/}
                {/*</span>*/}
                {/*    </TableCell>*/}
              </TableRow>
            </TableHead>
            {props.state.isLoading === true ? (
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }} colspan="8">
                    <div className="loader-token-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {props.state.latestBlocksData &&
                  props.state.latestBlocksData.length >= 1 &&
                  props.state.latestBlocksData.map((row, index) => {
                    let blockNumber = row.number;
                    let animationClass =
                      props.state.blockAnimation?.[blockNumber];
                    let ageAnimationClass =
                      props.state.ageAnimation?.[blockNumber];
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.hash}
                        style={
                          index % 2 !== 1
                            ? { background: "white" }
                            : { background: "white" }
                        }
                      >
                        <TableCell
                          id="td"
                          className="w-150 bord-none"
                          style={{ paddingLeft: "15px", width: "150px" }}
                        >
                          <a
                            className="linkTable cursor-pointer"
                            href={"/block-details/" + row.number}
                          >
                            <span
                              className={
                                animationClass ? animationClass : "tabledata"
                              }
                            >
                              {row.number.toLocaleString()}
                            </span>
                          </a>
                        </TableCell>

                        <TableCell id="td" className="w-150 bord-none">
                          <Tooltip
                            title={moment(row.timestamp * 1000)
                              .tz(timezone)
                              .format("YYYY-MM-DD hh:mm:ss")}
                            arrow={true}
                            className="fs-15"
                          >
                            <span
                              className={
                                ageAnimationClass
                                  ? ageAnimationClass
                                  : "tabledata"
                              }
                            >
                              {moment(row.timestamp * 1000)
                                .tz(timezone)
                                .format("hh:mm A")}
                            </span>
                          </Tooltip>
                        </TableCell>

                        <TableCell
                          id="td"
                          className="bord-none"
                          style={{
                            width: "50px",
                            paddingLeft: "none",
                            paddingRight: "none",
                          }}
                        >
                          <span
                            className={
                              ageAnimationClass
                                ? ageAnimationClass
                                : "tabledata"
                            }
                          >
                            {row.transactions.length}
                          </span>
                        </TableCell>
                        {/*<TableCell className=" bord-none" style={{paddingRight: '25px'}}>*/}
                        {/*    <div className="">*/}
                        {/*            <span className={animationClass ? animationClass : "tabledata"}>*/}
                        {/*                {`0 XDC`}*/}
                        {/*            </span>*/}
                        {/*    </div>*/}
                        {/*</TableCell>*/}
                      </TableRow>
                    );
                  })}
              </TableBody>
            )}
          </Table>
        </TableSubContainer>
      </TableContainer>
    </Paper>
  );
};

export default LatestBlockView;
