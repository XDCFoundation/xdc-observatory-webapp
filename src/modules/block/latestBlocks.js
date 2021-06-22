import React from "react";
import BaseComponent from "../baseComponent";
import "../../assets/styles/latestblocks.css";
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
import MenuItem from "@material-ui/core/MenuItem"

function create_data(hash, amount, age, block, from, to, txnfee) {
    return { hash, amount, age, block, from, to, txnfee }
}

function concat_data(b, amountL = 12, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${'.'.repeat(stars)}${b.slice(b.length - amountR, b.length)}`
}

function create_url(item, type) {
    // This function is to create URL for table items. changing it can affect whole table.
    return `#${item}-#{type}`
}



export default class LatestBlocks extends BaseComponent {
    constructor(props) {
        super(props);
        this.TableName = "Latest Transactions"
        this.state = {
            DataSet: Array(250).fill(create_data("0x43730ce5eb14d295d2a08f31a1402c65930aff870a5734b39077dc2407c046e2", `99.99 XDC`, "43 secs ago", "30771616", "0xb7f5d2172d17dcaa6269eabfdb58fb82d2f3f3c0", "0xb7f5d2172d17dcaa6269eabfdb58fb82d2f3f3c0", "0.00000000005 XDC")),
            from: 0,
            amount: 50
        }
        this._handleChange = (event) => { this.setState({ amount: event.target.value }) }
        this._FirstPage = (event) => {
            this.setState({ from: 0 })
        }
        this._LastPage = (event) => {
            this.setState({ from: this.state.DataSet.length - this.state.amount })
        }
        this._NextPage = (event) => {
            if (this.state.amount + this.state.from < this.state.DataSet.length) {
                this.setState({ from: this.state.amount + this.state.from })
            }
        }
        this._PrevPage = (event) => {
            if (this.state.from - this.state.amount >= 0) {
                this.setState({ from: this.state.from - this.state.amount })
            }
        }


    }
    render() {

        return (
            <Grid lg={8} className="tablegrid">
                <Grid class="tabletop-header">{this.TableName}</Grid>
                <Grid component={Paper}>
                    <Table className="table" aria-label="Latest Blocks">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ border: "none", paddingLeft: "3%" }} align="left" ><span className={"tableheaders"}>Hash</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Amount</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Age</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Block</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>From</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>To</span></TableCell>
                                <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.DataSet.slice(this.state.from, this.state.from + this.state.amount).map((row, index) => (
                                <TableRow key={row.name} style={index % 2 !== 1 ? { background: "#f9f9f9" } : { background: "white" }}>
                                    <TableCell style={{ border: "none" }} >
                                        <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip> <a href={create_url(row.hash, "hash")}> <span className="tabledata">{concat_data(row.hash)}  </span> </a>
                                    </TableCell>
                                    <TableCell style={{ border: "none" }} align="right"><span className="tabledata">{row.amount}</span></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"><span className="tabledata">{row.age}</span></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"> <a href={create_url(row.block, "block")}> <span className="tabledata"> {row.block}</span> </a></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"><a href={create_url(row.from, "hash")}><Tooltip placement="top" title={row.from}><span className="tabledata">{concat_data(row.from)}</span></Tooltip></a></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"><a href={create_url(row.to, "hash")}><Tooltip placement="top" title={row.to}><span className="tabledata">{concat_data(row.to)}</span></Tooltip></a></TableCell>
                                    <TableCell style={{ border: "none" }} align="right"><span className="tabledata">{row.txnfee}</span></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid container>
                    <Grid item xs="3">
                        <span className="text">Show</span>
                        <Select value={this.state.amount} className="select-amount" onChange={this._handleChange} >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                        <span className="text">Records</span>
                    </Grid>
                    <Grid xs="5"></Grid>
                    <Grid item xs="4">
                        <button style={{ marginLeft: "25px" }} onClick={this._FirstPage} className={this.state.from === 0 ? "btn disabled" : "btn"}>First</button>
                        <button onClick={this._PrevPage} className={this.state.from === 0 ? "btn disabled" : "btn"}>{"<"}</button>
                        <button className="btn">Page {Math.round(this.state.DataSet.length / this.state.amount) + 1 - Math.round((this.state.DataSet.length - this.state.from) / this.state.amount)} of {Math.round(this.state.DataSet.length / this.state.amount)}</button>
                        <button onClick={this._NextPage} className={this.state.from + this.state.amount === this.state.DataSet.length ? "btn disabled" : "btn"}>{">"}</button>
                        <button onClick={this._LastPage} className={this.state.from + this.state.amount === this.state.DataSet.length ? "btn disabled" : "btn"}>Last</button>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}