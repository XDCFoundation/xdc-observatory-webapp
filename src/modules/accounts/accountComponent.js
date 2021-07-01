import React from "react";
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
import Tokensearchbar from '../explorer/tokensearchBar';
import FooterComponent from '../common/footerComponent';


export default function AccountComponent(props) {

    function shortenBalance(b, amountL = 12, amountR = 3, stars = 0) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,

        )}`;
    }
    const { state } = props

    return (
        <div>
            <Tokensearchbar />
            <Grid lg={8} className="tablegrid">
                <Grid class="tabletop-header">{state.tableName}</Grid>
                <Grid component={Paper}>
                    <Table className="table" aria-label="Latest Transactions">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ border: "none", paddingLeft: "5%" }} align="left" ><span className={"tableheaders"}>Address</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "1.5%" }} align="left"><span className={"tableheaders"}>Type</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "4.1%" }} align="left"><span className={"tableheaders"}>Balance</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "5.5%" }} align="left"><span className={"tableheaders"}>Percentage</span></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.state.accountList && props.state.accountList.length && props.state.accountList.map((row, index) => {
                                let num = row.balance;
                                let bal = shortenBalance(num.toLocaleString())
                                return (
                                    <TableRow key={row.name} style={index % 2 !== 1 ? { background: "#f9f9f9" } : { background: "white" }}>
                                        <TableCell style={{ border: "none" }} margin-left="5px" >
                                            <Tooltip placement="left" title={row.address}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9", marginRight: "10px" }} /></Tooltip>
                                            <a className="linkTable" href={props.create_url(row.from, "hash")}><span className="tabledata">{props.shorten(row.address)}</span></a>

                                        </TableCell>
                                        {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.number, "height")}><span className="tabledata">{row.number}</span></a></TableCell> */}
                                        <TableCell style={{ border: "none" }} align="left"><span className="tabledata">{row.accountType == 0 ? "Account" : "Contract"}</span></TableCell>
                                        <TableCell style={{ border: "none", paddingLeft: "4%" }} align="left"><span className="tabledata">{row.balance.toFixed(2)}</span></TableCell>
                                        <TableCell style={{ border: "none", paddingLeft: "5%" }} align="left"><span className="tabledata"> &nbsp;{((row.balance / 37676671812.45) * 100).toFixed(2)}%</span></TableCell>
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
                        <button style={{ marginLeft: "0px" }} onClick={(event) => props._FirstPage(event)} className={props.state.from === 0 ? "btn disabled" : "btn"}>First</button>
                        <button onClick={(event) => props._PrevPage(event)} className={props.state.from === 0 ? "btn disabled" : "btn"}>{"<"}</button>
                        <button className="btn">Page {Math.round(state.totalAccounts / state.amount) + 1 - Math.round((state.totalAccounts - state.from) / state.amount)} of {Math.round(state.totalAccounts / state.amount)}</button>
                        <button onClick={(event) => props._NextPage(event)} className={props.state.from + props.state.amount === props.state.totalAccounts ? "btn disabled" : "btn"}>{">"}</button>
                        <button onClick={(event) => props._LastPage(event)} className={props.state.from + props.state.amount === props.state.totalAccounts ? "btn disabled" : "btn"}>Last</button>

                    </Grid>
                </Grid>
            </Grid >
            <FooterComponent />
        </div>
    )
}