import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import { messages } from "../../constants";
import TableBody from "@material-ui/core/TableBody";
import Loader from "../../assets/loader";
import utility from "../../utility";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Utility from "../../utility";
import TransactionDetailTooltip from "../common/transactionDetailTooltip";
import moment from "moment-timezone";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    container: {
        borderRadius: "0.875rem",
        boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
        borderBottom: "none",
        overflowX: 'auto',
        background: "#fff",
    },

});

const TransactionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 22px 15px 25px;
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
`;
const TransactionSubTitle = styled.div`
  width: auto;
  height: 1.125rem;
  text-align: left;
  
  color: #2a2a2a;
  font-family: Inter;
  font-size: 0.75rem;
  margin-left: 25px;
`;
const TableSubContainer = styled.div`
    @media (min-width: 0px) and (max-width: 767px) {
        max-width: 767px
        width: 100%;
        overflow-x: auto;
    }
`;

const LatestTransactionView = (props) => {
    const classes = useStyles();
    const { transactionList } = props;
    const timezone = useSelector(state => state.timezone)
    const [hashTT, setHashTT] = useState(false);
    const [amountTT, setAmountTT] = useState(false);
    const [timeStampTT, setTimeStampTT] = useState(false);

    return (<Paper
        className={"table-list"}
        style={{
            borderRadius: "0.875rem",
            minWidth: '48%',
            // marginLeft: "18%",
            // marginRight: "18%",
        }}
        elevation={0}
    >
        <TableContainer
            className={classes.container}
            id="container-table-token"
            style={{
                // borderRadius: "0.75rem",
                // border: "solid 0.063rem #e3e7eb",
                borderTop: "solid 0.063rem #e3e7eb",
                borderRadius: "0",
                boxShadow: 'none',
                backgroundColor: "#ffffff",
                // boxShadow: "0 0.063rem 0.625rem 0 rgba(0 0, 0, 0.,1)",
                minHeight: '100%'
            }}
        >
            {props.isHomePage ? (
                <>
                    <TransactionHeaderContainer>
                        <TransactionTitle>Latest Transactions</TransactionTitle>
                        <a
                            className="linkTable cursor-pointer"
                            href="/view-all-transaction"
                        >
                            View All
                        </a>
                    </TransactionHeaderContainer>
                    <TransactionSubTitle>{'The most recently published transactions'}</TransactionSubTitle>
                </>

            ) : (
                ""
            )}
            <TableSubContainer>
            <Table style={{ borderBottom: "none" }}>
                <TableHead>
                    <TableRow>
                        {props?.showHash && (
                            <TableCell style={{ border: "none", paddingLeft: '25px' }} align="left">
                                <span className={"tablehead-token-details"}>
                                    Hash
                                    <Tooltip placement="top" open={hashTT}
                                        title={messages.HASH}
                                        onOpen={() => setHashTT(true)}
                                        onClose={() => setHashTT(false)}
                                    >
                                        <img
                                            onClick={() => setHashTT(!hashTT)}
                                            alt="question-mark"
                                            src="/images/info.svg"
                                            height={"14px"}
                                            className="tooltipInfoIcon"
                                        />
                                    </Tooltip>
                                </span>
                            </TableCell>
                        )}
                        <TableCell style={{ border: "none" }} align="left">
                            <span className={"tablehead-token-details"}>
                                Amount
                                <Tooltip placement="top" title={messages.AMOUNT}
                                    open={amountTT}
                                    onOpen={() => setAmountTT(true)}
                                    onClose={() => setAmountTT(false)}
                                >
                                    <img
                                        onClick={() => setAmountTT(!amountTT)}
                                        alt="question-mark"
                                        src="/images/info.svg"
                                        height={"14px"}
                                        className="tooltipInfoIcon"
                                    />
                                </Tooltip>
                            </span>
                        </TableCell>
                        {props?.showDate && (
                            <TableCell style={{ border: "none" }} align="left">
                                <span className={"tablehead-token-details"}>
                                    Timestamp
                                    <Tooltip placement="top" title={messages.TRANSACTION_CREATION_TIME_STAMP}
                                        open={timeStampTT}
                                        onOpen={() => setTimeStampTT(true)}
                                        onClose={() => setTimeStampTT(false)}>
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
                        )}


                        {props?.showDetails && (
                            <TableCell
                                style={{ border: "none", whiteSpace: "nowrap" }}
                                align="left"
                            >
                            </TableCell>
                        )}
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

                                        {props?.showHash && (
                                            <TableCell id="td" className="w-150 bord-none" style={{ paddingLeft: '25px' }}>
                                                <div className="display-flex">
                                                    {/* <TransactionDetailTooltip
                                                    transactionAddress={row.hash} /> */}
                                                    <Tooltip placement="right" title={row.hash}>
                                                        <a
                                                            className="linkTable"
                                                            href={"/transaction-details/" + row.hash}>
                                                            <span
                                                                className={
                                                                    animationClass ? animationClass : "tabledata"
                                                                }
                                                            >
                                                                {shorten(row.hash)}
                                                            </span>
                                                        </a>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        )}

                                        <TableCell id="td" style={{ whiteSpace: "nowrap", width: '150px', border: 'none' }}>
                                            {amt2 == null ? (
                                                <span
                                                    className={animationClass ? animationClass : "tabledata"}>{amt1} XDC</span>) : (
                                                <span className={animationClass ? animationClass : "tabledata"}>
                                                    {amt1}{"."}<span style={{ color: "#9FA9BA" }}>{amt2}</span> XDC </span>
                                            )}
                                        </TableCell>
                                        {props?.showDate && (
                                            <TableCell id="td" className="bord-none" style={{ width: '200px' }}>
                                                <Tooltip
                                                    title={moment(row.timestamp * 1000).tz(timezone).format("YYYY-MM-DD hh:mm:ss")}
                                                    arrow={true} className="fs-15">
                                                    <span className={animationClass ? animationClass : "tabledata"}>
                                                        {moment(row.timestamp * 1000).tz(timezone).format("hh:mm A")}
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                        )}
                                        {props?.showDetails && (
                                            <TableCell className=" bord-none" style={{ paddingRight: '25px' }}>
                                                <div className="latest_child w-18 mar_child wid-17 details-pad ">
                                                    <a className="linkTable cursor-pointer"
                                                        href={"/transaction-details/" + row.hash}>
                                                        Details
                                                    </a>
                                                </div>
                                            </TableCell>
                                        )}

                                    </TableRow>
                                );
                            })}
                    </TableBody>

                )}
            </Table>
            </TableSubContainer>
        </TableContainer>
    </Paper>)

}

function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
        b.length - 3,
        b.length
    )}`;
}

export default LatestTransactionView