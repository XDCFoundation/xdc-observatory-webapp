import React from "react";
import BaseComponent from "../baseComponent";
import "../../../src/assets/styles/blocksAndTransactionList.css";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router";


function timeDiff(curr, prev) {
    var ms_Min = 60 * 1000; // milliseconds in Minute
    var ms_Hour = ms_Min * 60; // milliseconds in Hour
    var ms_Day = ms_Hour * 24; // milliseconds in day
    var ms_Mon = ms_Day * 30; // milliseconds in Month
    var ms_Yr = ms_Day * 365; // milliseconds in Year
    var diff = curr - prev; //difference between dates.
    // If the diff is less then milliseconds in a minute
    if (diff < ms_Min) {
        return Math.abs(Math.round(diff / 1000)) + ' secs ago';

        // If the diff is less then milliseconds in a Hour
    } else if (diff < ms_Hour) {
        return Math.abs(Math.round(diff / ms_Min)) + ' mins ago';

        // If the diff is less then milliseconds in a day
    } else if (diff < ms_Day) {
        return Math.abs(Math.round(diff / ms_Hour)) + ' hrs ago';

        // If the diff is less then milliseconds in a Month
    } else if (diff < ms_Mon) {
        return Math.abs(Math.round(diff / ms_Day)) + ' days ago';

        // If the diff is less then milliseconds in a year
    } else if (diff < ms_Yr) {
        return Math.abs(Math.round(diff / ms_Mon)) + ' months ago';
    } else {
        return Math.abs(Math.round(diff / ms_Yr)) + ' years ago';
    }
}

export default function TransactionComponent(props) {

    const history = useHistory();

    function shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }

    const { state } = props
    return (
        <Grid lg={8} className="tablegrid">
            <Grid class="tabletop-header">{state.tableName}</Grid>
            <Grid component={Paper}>
                <Table className="table" aria-label="Latest Transactions">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: "none", paddingLeft: "4%" }} align="left" ><span className={"tableheaders"}>Hash</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "1.5%" }} align="left"><span className={"tableheaders"}>Amount</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "3%" }} align="left"><span className={"tableheaders"}>Age</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Block</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>From</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "1.5%" }} align="left"><span className={"tableheaders"}>To</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.state.transactionList && props.state.transactionList.length && props.state.transactionList.map((row, index) => {

                            const currentTime = new Date();
                            const previousTime = new Date(row.timestamp * 1000);
                            const ti = timeDiff(currentTime, previousTime);
                            return (
                                <TableRow key={row.name} style={index % 2 !== 1 ? { background: "#f9f9f9" } : { background: "white" }}>
                                    <TableCell style={{ border: "none" }} >
                                        <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip>
                                        <a className="linkTable" href={props.create_url(row.hash, "hash")}> <span className="tabledata" onClick={() => history.push("/transaction-details/" + row.hash)}>{shorten(row.hash)}  </span> </a>
                                    </TableCell>
                                    <TableCell style={{ border: "none" }} align="left"><span className="tabledata">{row.value}</span></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"><span className="tabledata">{ti}</span></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"> <a className="linkTable" href={props.create_url(row.blockNumber, "block")}> <span className="tabledata"> {row.blockNumber}</span> </a></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"><a className="linkTable" href={props.create_url(row.from, "hash")}><Tooltip placement="top" title={row.from}><span className="tabledata">{shorten(row.from)}</span></Tooltip></a></TableCell>
                                    <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.to, "hash")}><Tooltip placement="top" title={row.to}><span className="tabledata">{!row.to ? "------------------" : shorten(row.to)}</span></Tooltip></a></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"><span className="tabledata">0.00000000005 XDC</span></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Grid>
            <Grid container>
                <Grid item xs="3">
                    <span className="text">Show</span>
                    <Select value={props.state.amount} className="select-amount" onChange={(event) => props._handleChange(event)} >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                    <span className="text">Records</span>
                </Grid>
                <Grid xs="5"></Grid>

                <Grid item xs="4">
                    <button style={{ marginLeft: "15px" }} onClick={(event) => props._FirstPage(event)} className={props.state.from === 0 ? "btn disabled" : "btn"}>First</button>
                    <button onClick={(event) => props._PrevPage(event)} className={props.state.from === 0 ? "btn disabled" : "btn"}>{"<"}</button>
                    <button className="btn">Page {Math.round(state.totalTransaction / state.amount) + 1 - Math.round((state.totalTransaction - state.from) / state.amount)} of {Math.round(state.totalTransaction / state.amount)}</button>
                    <button onClick={(event) => props._NextPage(event)} className={props.state.from + props.state.amount === props.state.totalTransaction ? "btn disabled" : "btn"}>{">"}</button>
                    <button onClick={(event) => props._LastPage(event)} className={props.state.from + props.state.amount === props.state.totalTransaction ? "btn disabled" : "btn"}>Last</button>

                </Grid>
            </Grid>
        </Grid>
    )
}