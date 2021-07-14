import React, { useEffect, useState } from "react";

import "../../../src/assets/styles/blocksAndTransactionList.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
export default function AddressTableComponent(props) {
    function shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }

    const [address, setAddress] = useState([]);
    const [exports, exportAddress] = useState({});
    const [toggle, handleToggle] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const history = useHistory()

    const handleChangePage = (action) => {

        if (action == 'next') {
            if (Math.ceil(address.length / rowsPerPage) != page + 1) {
                setPage(page + 1)

            }

        } else {
            if (0 != page) {
                setPage(page - 1)
            }
        }
        if (action == 'next') {
            if (Math.ceil(address.length / rowsPerPage) < page + 1)
                setPage(Math.ceil(address.length / rowsPerPage))
        }


    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        let address = [
            {
                Txn_Hash: "0x3243ab7818dcbd7b4e8898743d5be2c5410cdab5a1b34c559a61c8757be0dd9b",
                Age: "1 day ago",
                Block: "30972506",
                From: "xdc374b7cc91c918c32a1149bd73b9527076e86bba4",
                To: "xdc0000000000000000000000000000000000000089",
                Value: "45000.00XDC",
                id: 1,
            },
            {
                Txn_Hash: "0x3243ab7818dcbd7b4e8898743d5be2c5410cdab5a1b34c559a61c8757be0dd9b",
                Age: "1 day ago",
                Block: "30972506",
                From: "xdc374b7cc91c918c32a1149bd73b9527076e86bba4",
                To: "xdc0000000000000000000000000000000000000089",
                Value: "45000.00XDC",
                id: 2,
            },
            {
                Txn_Hash: "0x3243ab7818dcbd7b4e8898743d5be2c5410cdab5a1b34c559a61c8757be0dd9b",
                Age: "1 day ago",
                Block: "30972506",
                From: "xdc374b7cc91c918c32a1149bd73b9527076e86bba4",
                To: "xdc0000000000000000000000000000000000000089",
                Value: "45000.00XDC",
                id: 3,
            },
        ];
        setAddress(
            address.map((d) => {
                return {
                    select: false,
                    Txn_Hash: d.Txn_Hash,
                    Age: d.Age,
                    Block: d.Block,
                    From: d.From,
                    To: d.To,
                    Value: d.Value,
                    id: d.id,
                };
            })
        );
    }, []);

    const { state } = props;
    return (
        <Grid lg={13} className="tablegrid_address">
            <Grid component={Paper}>
                <Table className="table" aria-label="Latest Transactions">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: "none" }} align="left">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setAddress(
                                            address.map((d) => {
                                                d.select = checked;

                                                return d;
                                            })
                                        );
                                    }}
                                    style={{
                                        marginRight: "10px",
                                    }}
                                />
                                <span className={"tableheaders"}>Txn Hash</span>
                            </TableCell>
                            <TableCell
                                style={{ border: "none", paddingLeft: "1.8%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Age</span>
                            </TableCell>
                            <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Block</span>
                            </TableCell>
                            <TableCell
                                style={{ border: "none", paddingLeft: "1%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>From</span>
                            </TableCell>
                            <TableCell
                                style={{ border: "none", paddingLeft: "1%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>To</span>
                            </TableCell>
                            <TableCell
                                style={{ border: "none", paddingLeft: "1%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Value</span>
                            </TableCell>
                            {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {address.map((row, index) => {
                            // const currentTime = new Date();
                            // const previousTime = new Date(row.timestamp * 1000);
                            // const ti = timeDiff(currentTime, previousTime);
                            return (
                                <TableRow
                                    style={
                                        index % 2 !== 1
                                            ? { background: "#f9f9f9" }
                                            : { background: "white" }
                                    }
                                >
                                    <TableCell style={{ border: "none" }} margin-left="5px">

                                        <input
                                            onChange={(event) => {
                                                let checked = event.target.checked;
                                                exportAddress(row);
                                                handleToggle(checked);
                                            }}
                                            type="checkbox"
                                            checked={toggle}
                                            style={{ marginRight: "8px" }}
                                        />
                                        <a className="linkTable" href="/">
                                            <Tooltip placement="top" title={row.Txn_Hash}>
                                                <span className="tabledata">
                                                    {shorten(row.Txn_Hash)}{" "}
                                                </span>
                                            </Tooltip>
                                        </a>
                                    </TableCell>
                                    <TableCell style={{ border: "none" }} align="left">
                                        <span className="tabledata">{row.Age}</span>
                                    </TableCell>
                                    <TableCell style={{ border: "none" }} align="left">
                                        <a className="linkTable" href="/">
                                            <span className="tabledata">{row.Block}</span>
                                        </a>
                                    </TableCell>
                                    <TableCell style={{ border: "none" }} align="left">
                                        <a className="linkTable" href="/">
                                            <Tooltip placement="top" title={row.From}>
                                                <span className="tabledata"> {shorten(row.From)}</span>
                                            </Tooltip>
                                        </a>
                                    </TableCell>
                                    <TableCell style={{ border: "none" }} align="left">
                                        <a className="linkTable" href="/">
                                            <Tooltip placement="top" title={row.To}>
                                                <span className="tabledata">{shorten(row.To)}</span>
                                            </Tooltip>
                                        </a>
                                    </TableCell>
                                    <TableCell style={{ border: "none" }} align="left">
                                        <span className="tabledata">{row.Value}</span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                
            </Grid>
            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '45px',marginLeft: '0%'}}>
                    Show
                    <select className="selectbox" onChange={handleChangeRowsPerPage}> 
                        <option selected>50</option>
                        <option>75</option>
                        <option>100</option>
                    </select>
                    Records
                </div>

                <div style={{display: 'flex', flexDirection: 'row', marginRight: '0%'}}>
                    <div className="firstbox" onClick={() => setPage(0)}>
                        <button style={{backgroundColor: 'white'}} className="first">First</button>
                    </div>
                    <div className="previousbox" onClick={() => handleChangePage("prev")}>
                        <p className="path"><ChevronLeftIcon/></p>
                    </div>
                    <div className="pagebox">
                        <p className="Page-1-of-5">Page {page + 1} of {Math.ceil(address.length / rowsPerPage)}</p>
                    </div>
                    <div className="nextbox">
                        <p className="path-2" onClick={() => handleChangePage("next")}><ChevronRightIcon/></p>
                    </div>
                    <div className="lastbox" onClick={() => setPage(Math.ceil(address.length / rowsPerPage) - 1)}>
                        <button style={{backgroundColor: 'white'}} className="last">Last</button>
                    </div>
                </div>


            </div>
        </Grid>

    );
}