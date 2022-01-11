import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import {messages} from "../../constants";
import TableBody from "@material-ui/core/TableBody";
import Loader from "../../assets/loader";
import utility from "../../utility";
import Paper from "@material-ui/core/Paper";
import React from "react";
import styled from "styled-components";
import {makeStyles} from "@material-ui/core/styles";
import Utility from "../../utility";
import TransactionDetailTooltip from "../common/transactionDetailTooltip";
import moment from "moment-timezone";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    container: {
        borderRadius: "0.875rem",
        boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
        borderBottom: "none",
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
  letter-spacing: 0.043rem;
  color: #2a2a2a;
  opacity: 1;
  font-family: Inter;
  font-size: 1.125rem;
  font-weight: 600;
`;

const LatestTransactionView = (props) => {
    const classes = useStyles();
    const {transactionList} = props;
    const timezone = useSelector(state=> state.timezone)

    return (<Paper
        className={"table-list"}
        style={{
            borderRadius: "0.875rem",
            width: '48%',
            // marginLeft: "18%",
            // marginRight: "18%",
        }}
        elevation={0}
    >
        <TableContainer
            className={classes.container}
            id="container-table-token"
            style={{
                borderRadius: "0.75rem",
                border: "solid 0.063rem #e3e7eb",
                backgroundColor: "#ffffff",
                boxShadow: "0 0.063rem 0.625rem 0 rgba(0 0, 0, 0.,1)",
                minHeight: '100%'
            }}
        >
            {props.isHomePage ? (
                <TransactionHeaderContainer>
                    <TransactionTitle>Latest Transactions</TransactionTitle>
                    <a
                        className="nav_button cursor-pointer"
                        href="/view-all-transaction"
                    >
                        View All
                    </a>
                </TransactionHeaderContainer>
            ) : (
                ""
            )}
            <Table style={{borderBottom: "none"}}>
                <TableHead>
                    <TableRow>
                        {props?.showHash && (
                            <TableCell style={{border: "none", paddingLeft: '25px'}} align="left">
                    <span className={"tablehead-token-details"}>
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
                        )}
                        <TableCell style={{border: "none"}} align="left">
                  <span className={"tablehead-token-details"}>
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
                        {props?.showDate && (
                            <TableCell style={{border: "none"}} align="left">
                    <span className={"tablehead-token-details"}>
                      Timestamp
                      <Tooltip placement="top" title={messages.TRANSACTION_CREATION_TIME_STAMP}>
                        <img
                            alt="question-mark"
                            src="/images/question-mark.svg"
                            height={"14px"}
                            className="tooltipLatestTransactionTableDashboard"
                        />
                      </Tooltip>
                    </span>
                            </TableCell>
                        )}


                        {props?.showDetails && (
                            <TableCell
                                style={{border: "none", whiteSpace: "nowrap"}}
                                align="left"
                            >
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                {props.state.isLoading === true ? (
                    <TableBody>
                        <TableRow>
                            <TableCell style={{border: "none"}} colspan="8">
                                <div className="loader-token-list">
                                    <Loader/>
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
                                            ? {background: "#f9f9f9"}
                                            : {background: "white"}
                                    }
                                >

                                    {props?.showHash && (
                                        <TableCell id="td" className="w-150 bord-none" style={{paddingLeft: '25px'}}>
                                            <div className="display-flex"><TransactionDetailTooltip
                                                transactionAddress={row.hash}/>
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

                                    <TableCell id="td" style={{whiteSpace: "nowrap", width: '150px', border: 'none'}}>
                                        {amt2 == null ? (
                                            <span
                                                className={animationClass ? animationClass : "tabledata"}>{amt1 < 0 ? amt1 : 0} XDC</span>) : (
                                            <span className={animationClass ? animationClass : "tabledata"}>
                                                {amt1}{"."}<span style={{color: "#9FA9BA"}}>{amt2}</span> XDC </span>
                                        )}
                                    </TableCell>
                                    {props?.showDate && (
                                        <TableCell id="td" className="bord-none" style={{width: '200px'}}>
                                            <Tooltip
                                                title={moment(row.timestamp * 1000).tz(timezone).format("YYYY-MM-DD hh:mm:ss")}
                                                arrow={true} className="fs-15">
                                 <span className={animationClass ? animationClass : "tabledata"}>
                              {moment(row.timestamp * 1000).tz(timezone).format("MMM DD, YYYY, hh:mm A")}
                                 </span>
                                            </Tooltip>
                                        </TableCell>
                                    )}
                                    {props?.showDetails && (
                                        <TableCell className=" bord-none" style={{paddingRight: '25px'}}>
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