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
import { useHistory } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CSVLink, CSVDownload } from "react-csv";
import SearchIcon from "@material-ui/icons/Search";
import moment from 'moment'
import Utility, { dispatchAction } from "../../utility";
import AddressData from "../../services/address";
import { useParams } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
export default function AddressTableComponent(props) {

    const { state } = props;
    function shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }
    let { addr } = useParams();
    const [address, setAddress] = useState([]);
    const [txtAddress, setTxtAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);


    const [reportaddress, setReportaddress] = useState([]);
    const [downloadaddress, setDownloadaddress] = useState([]);
    const [exports, exportAddress] = useState({});
    const [toggle, handleToggle] = useState(false);
    const [page, setPage] = React.useState(0);
    const [checkAll, setCheckAll] = React.useState(0);
    const [isDownloadActive, setDownloadActive] = useState(0);

    let showPerPage = 50;
    let datas = {}
    const [rowsPerPage, setRowsPerPage] = React.useState(showPerPage);

    const history = useHistory()
    const handleChangePage = (action) => {
        if (action == 'first') {
            setPage(0)
            datas = {
                pageNum: 0,
                perpage: rowsPerPage,
                addrr: addr
            }
            getAddressDetails(datas)

        }
        if (action === 'last') {
            let pagecount = totalRecord - rowsPerPage
            setPage(pagecount)
            datas = {
                pageNum: pagecount,
                perpage: rowsPerPage,
                addrr: addr
            }
            getAddressDetails(datas)
        }

        if (action === 'next') {
            if (rowsPerPage + page < totalRecord) {
                let pagecount = rowsPerPage + page
                setPage(pagecount)
                let datas = { pageNum: pagecount, perpage: rowsPerPage, addrr: addr }
                getAddressDetails(datas)
            }
        }

        if (action === 'prev') {
            if (page - rowsPerPage >= 0) {
                let pagecount = page - rowsPerPage
                setPage(pagecount)
                datas = {
                    pageNum: pagecount,
                    perpage: rowsPerPage,
                    addrr: addr
                }
                getAddressDetails(datas)

            }
        }


    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
        datas = {
            pageNum: 0,
            perpage: event.target.value,
            addrr: addr
        }
        getAddressDetails(datas)
    };
    const getAddressDetails = async (data) => {
        try {

            const [error, responseData] = await Utility.parseResponse(
                AddressData.getAddressDetailWithlimit(data)
            );

            if (responseData) {
                let trxn = responseData.transaction
                setTotalRecord(responseData.totalTransactionCount)
                setAddress(
                    trxn.map((d) => {

                        return {
                            Txn_Hash: d.hash,
                            Age: d.timestamp,
                            Block: d.blockNumber,
                            From: d.from,
                            To: d.to,
                            Value: d.value,
                            id: d._id,
                        };
                    })
                );

                setReportaddress(
                    trxn.map((d) => {

                        return {
                            Txn_Hash: d.hash,
                            Age: d.timestamp,
                            Block: d.blockNumber,
                            From: d.from,
                            To: d.to,
                            Value: (d.value / 1000000000000000000)
                        };
                    })
                );
                setDownloadaddress(trxn.map((d) => {
                    return {
                        Txn_Hash: d.hash,
                        Date: moment(d.timestamp * 1000).format('DD/MM/YYYY hh:mm:ss'),
                        Block: d.blockNumber,
                        From: d.from,
                        To: d.to,
                        Value: (d.value / 1000000000000000000)
                    };
                }))
            } else {
                setBalance(parseFloat(0).toFixed(2));
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        //let address =props.trans
        datas = {
            pageNum: page,
            perpage: rowsPerPage,
            addrr: addr
        }
        getAddressDetails(datas);
    }, []);

    const handleChanged = (event) => {
        const { name, checked } = event.target;
        if (name === 'allselect') {
            let tempAddress = address.map((addr) => {
                return { ...addr, isChecked: checked }
            });
            setAddress(tempAddress)
            let tempAddr = tempAddress.filter((addr) => {
                if (addr.isChecked === true) {
                    return addr
                }
            })
            if (tempAddr.length > 0) {
                setDownloadActive(1)
            } else {
                setDownloadActive(0)
            }

            setDownloadaddress(tempAddress.map((d) => {
                return {
                    Txn_Hash: d.Txn_Hash,
                    Date: moment(d.Age * 1000).format('DD/MM/YYYY hh:mm:ss'),
                    Block: d.Block,
                    From: d.From,
                    To: d.To,
                    Value: (d.Value / 1000000000000000000)
                };
            }))
        } else {
            let tempAddress = address.map((addr) => addr.id === name ? { ...addr, isChecked: checked } : addr);
            setAddress(tempAddress)
            let tempAddr = tempAddress.filter((addr) => {
                if (addr.isChecked === true) {
                    return addr
                }
            })
            //
            if (tempAddr.length > 0) {
                setDownloadActive(1)
            } else {
                setDownloadActive(0)
            }
            setDownloadaddress(tempAddr.map((d) => {
                return {
                    Txn_Hash: d.Txn_Hash,
                    Date: moment(d.Age * 1000).format('DD/MM/YYYY hh:mm:ss'),
                    Block: d.Block,
                    From: d.From,
                    To: d.To,
                    Value: (d.Value / 1000000000000000000)
                };
            }))
        }


    }


    return (
        <div>
            <div className="content_input_all">
                <div className="content_input_add">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search"
                        className="content_input_add_btn"
                    />
                </div>

                {isDownloadActive ? <CSVLink filename={"transactions.csv"} data={downloadaddress}
                    style={{ fontSize: '15px', color: '#ffffff', textAlign: 'center', backgroundColor: 'rgb(7 125 245)', borderRadius: '4px', width: '94px', height: '30px' }}>Export</CSVLink>
                    :
                    <CSVLink filename={"transactions.csv"} data={downloadaddress}
                        style={{ pointerEvents: 'none', fontSize: '15px', textAlign: 'center', color: '#ffffff', backgroundColor: '#e3e7eb', borderRadius: '4px', width: '94px', height: '30px' }}>Export</CSVLink>
                }




            </div>

            <Grid lg={13} className="tablegrid_address">
                <Grid component={Paper}>
                    <Table className="table" aria-label="Latest Transactions">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ border: "none" }} align="left">
                                    <input
                                        onChange={handleChanged}
                                        type="checkbox"
                                        name="allselect"
                                        checked={address.filter((addr) => addr?.isChecked !== true).length <= 1}
                                        style={{ marginRight: "8px" }}
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
                                const currentTime = new Date();
                                const previousTime = new Date(row.Age * 1000);
                                const TimeAge = timeDiff(currentTime, previousTime);
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
                                                key={row.id}
                                                name={row.id}
                                                onChange={handleChanged}
                                                type="checkbox"
                                                checked={row?.isChecked || false}
                                                //checked={checkAll}
                                                style={{ marginRight: "8px" }}
                                            />

                                            <a className="linkTable" href={'/transaction-details/' + row.Txn_Hash}>
                                                <Tooltip placement="top" title={row.Txn_Hash}>
                                                    <span className="tabledata">
                                                        {shorten(row.Txn_Hash)}{" "}
                                                    </span>
                                                </Tooltip>
                                            </a>

                                        </TableCell>
                                        <TableCell style={{ border: "none" }} align="left">
                                            <span className="tabledata">{TimeAge}</span>
                                        </TableCell>
                                        <TableCell style={{ border: "none" }} align="left">
                                            <a className="linkTable" href={'/block-details/' + row.Block}>
                                                <span className="tabledata">{row.Block}</span>
                                            </a>
                                        </TableCell>
                                        <TableCell style={{ border: "none" }} align="left">
                                            {row.From != addr ?
                                                <a className="linkTable" href={'/address-details/' + row.From}>
                                                    <Tooltip placement="top" title={row.From}>
                                                        <span className="tabledata"> {shorten(row.From)}</span>
                                                    </Tooltip>
                                                </a>
                                                :
                                                <Tooltip placement="top" title={row.From}>
                                                    <span className="tabledata"> {shorten(row.From)}</span>
                                                </Tooltip>
                                            }
                                        </TableCell>
                                        <TableCell style={{ border: "none" }} align="left">
                                            {row.To != addr ?
                                                <a className="linkTable" href={'/address-details/' + row.To}>
                                                    <Tooltip placement="top" title={row.To}>
                                                        <span className="tabledata">{shorten(row.To)}</span>
                                                    </Tooltip>
                                                </a>
                                                :
                                                <Tooltip placement="top" title={row.To}>
                                                    <span className="tabledata">{shorten(row.To)}</span>
                                                </Tooltip>
                                            }
                                        </TableCell>
                                        <TableCell style={{ border: "none" }} align="left">
                                            {row.To == addr &&
                                                <i class="fa fa-long-arrow-down green-color" aria-hidden="true"></i>
                                            }
                                            {row.From == addr &&
                                                <i class="fa fa-long-arrow-up red-color" aria-hidden="true"></i>
                                            }
                                            <span className="tabledata">{(row.Value / 1000000000000000000)}</span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                </Grid>
                <Grid container>
                    <Grid item xs="3">
                        <span className="text">Show</span>
                        <Select value={rowsPerPage} className="select-amount" onChange={handleChangeRowsPerPage} >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={500}>500</MenuItem>
                        </Select>
                        <span className="text">Records</span>
                    </Grid>
                    <Grid xs="5"></Grid>
                    <Grid item xs="4">
                        <button style={{ marginLeft: "0px" }} onClick={() => handleChangePage("first")} className={page === 0 ? "btn disabled" : "btn"}>First</button>
                        <button onClick={() => handleChangePage("prev")} className={page === 0 ? "btn disabled" : "btn"}>{"<"}</button>
                        <button className="btn">Page {Math.round(totalRecord / rowsPerPage) + 1 - Math.round((totalRecord - page) / rowsPerPage)} of {Math.round(totalRecord / rowsPerPage)}</button>
                        <button onClick={() => handleChangePage("next")} className={page + rowsPerPage === totalRecord ? "btn disabled" : "btn"}>{">"}</button>
                        <button onClick={() => handleChangePage("last")} className={page + rowsPerPage === totalRecord ? "btn disabled" : "btn"}>Last</button>

                    </Grid>
                </Grid>

            </Grid>
        </div>

    );
}