import React, { useEffect, useState } from "react";
import "../../../src/assets/styles/blocksAndTransactionList.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, TableContainer } from "@material-ui/core";
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
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles({

    container: {

        borderRadius: '14px',
        boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1)',
        borderBottom: 'none',
        background: '#fff',
    },

});
export default function AddressTableComponent(props) {

    const { state } = props;
    const classes = useStyles();
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
    const [keywords, setKeywords] = useState('');

    const [reportaddress, setReportaddress] = useState([]);
    const [downloadaddress, setDownloadaddress] = useState([]);
    //const [exports, exportAddress] = useState({});
    //const [toggle, handleToggle] = useState(false);
    const [page, setPage] = React.useState(0);
    //const [checkAll, setCheckAll] = React.useState(0);
    const [isDownloadActive, setDownloadActive] = useState(0);
    const [noData, setNoData] = useState(false)
    let showPerPage = 50;
    let datas = {}
    const [rowsPerPage, setRowsPerPage] = React.useState(showPerPage);

    const history = useHistory()

    const dummyData = [

        {
            id: '1',
            TxHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Age: '1 hrs ago',
            Block: '22,650,452',
            From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Amount: '0 XDC'
        },
        {
            id: '2',
            TxHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Age: '1 hrs ago',
            Block: '22,650,452',
            From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Amount: '0 XDC'
        },
        {
            id: '3',
            TxHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Age: '1 hrs ago', Block: '22,650,452',
            From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Amount: '0 XDC'
        },
        {
            id: '4',
            TxHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Age: '1 hrs ago', Block: '22,650,452',
            From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Amount: '0 XDC'
        },
        {
            id: '5',
            TxHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Age: '1 hrs ago', Block: '22,650,452',
            From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Amount: '0 XDC'
        },
        {
            id: '6',
            TxHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Age: '1 hrs ago', Block: '22,650,452',
            From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
            Amount: '0 XDC'
        },

    ];

    const handleChangePage = (action) => {
        if (action == 'first') {

            if (keywords) {
                datas = {
                    pageNum: 0,
                    perpage: rowsPerPage,
                    addrr: addr,
                    keywords: keywords
                }
                getTransactionSearch(datas)
            } else {
                datas = {
                    pageNum: 0,
                    perpage: rowsPerPage,
                    addrr: addr
                }
                getAddressDetails(datas)
            }



        }
        if (action === 'last') {
            let pagecount = totalRecord - rowsPerPage
            setPage(pagecount)
            if (keywords) {
                datas = {
                    pageNum: pagecount,
                    perpage: rowsPerPage,
                    addrr: addr,
                    keywords: keywords
                }
                getTransactionSearch(datas)
            } else {
                datas = {
                    pageNum: pagecount,
                    perpage: rowsPerPage,
                    addrr: addr
                }
                getAddressDetails(datas)
            }

        }

        if (action === 'next') {
            if (rowsPerPage + page < totalRecord) {
                let pagecount = rowsPerPage + page
                setPage(pagecount)
                if (keywords) {
                    datas = {
                        pageNum: pagecount,
                        perpage: rowsPerPage,
                        addrr: addr,
                        keywords: keywords
                    }
                    getTransactionSearch(datas)
                } else {
                    let datas = { pageNum: pagecount, perpage: rowsPerPage, addrr: addr }
                    getAddressDetails(datas)
                }

            }
        }

        if (action === 'prev') {
            if (page - rowsPerPage >= 0) {
                let pagecount = page - rowsPerPage
                setPage(pagecount)
                if (keywords) {
                    datas = {
                        pageNum: pagecount,
                        perpage: rowsPerPage,
                        addrr: addr,
                        keywords: keywords
                    }
                    getTransactionSearch(datas)
                } else {
                    datas = {
                        pageNum: pagecount,
                        perpage: rowsPerPage,
                        addrr: addr
                    }
                    getAddressDetails(datas)
                }


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

            if (responseData.totalTransactionCount > 0) {
                setNoData(false)
                parseResponseData(responseData, 1)
            } else {
                setNoData(true)
                setBalance(parseFloat(0).toFixed(2));
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        //let address =props.trans
        // datas = {
        //     pageNum: page,
        //     perpage: rowsPerPage,
        //     addrr: addr
        // }

        setAddress(
            dummyData.map((d) => {


                return {
                    id: d.id,
                    TxHash: d.TxHash,
                    Age: d.Age,
                    Block: d.Block,
                    From: d.From,
                    To: d.To,
                    Amount: d.Amount
                };
            })
        );

        console.log(address, "<>")

        setReportaddress(
            dummyData.map((d) => {

                return {

                    TxHash: d.TxHash,
                    Age: d.Age,
                    From: d.From,
                    To: d.To,
                    Amount: d.Amount
                };
            })
        );
        setDownloadaddress(address.map((d) => {
            return {
                id: d.id,
                TxHash: d.TxHash,
                Age: d.Age,
                Block: d.Block,
                From: d.From,
                To: d.To,
                Amount: d.Amount
            };
        }))
        // getAddressDetails(datas);
    }, []);

    const getTransactionSearch = async (data) => {
        try {

            const [error, responseData] = await Utility.parseResponse(
                AddressData.getTransactionSearch(data)
            );

            if (responseData.responseTransaction.length > 0) {
                setNoData(false)
                parseResponseData(responseData, 2)
            } else {
                setNoData(true)
                setBalance(parseFloat(0).toFixed(2));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const parseResponseData = async (Recdata, type) => {
        let trxn = []
        if (type == 1) {
            trxn = Recdata.transaction
            setTotalRecord(Recdata.totalTransactionCount)
        }
        else {
            trxn = Recdata.responseTransaction
            setTotalRecord(Recdata.total)
        }

        // setAddress(
        //     trxn.map((d) => {

        //         return {
        //             Txn_Hash: d.hash,
        //             Age: d.timestamp,
        //             Block: d.blockNumber,
        //             From: d.from,
        //             To: d.to,
        //             Value: d.value,
        //             id: d._id,
        //         };
        //     })
        // );

        // setReportaddress(
        //     trxn.map((d) => {

        //         return {
        //             Txn_Hash: d.hash,
        //             Age: d.timestamp,
        //             Block: d.blockNumber,
        //             From: d.from,
        //             To: d.to,
        //             Value: (d.value / 1000000000000000000)
        //         };
        //     })
        // );
        // setDownloadaddress(trxn.map((d) => {
        //     return {
        //         Txn_Hash: d.hash,
        //         Age: moment(d.timestamp * 1000).format('DD/MM/YYYY hh:mm:ss'),
        //         Block: d.blockNumber,
        //         From: d.from,
        //         To: d.to,
        //         Value: (d.value / 1000000000000000000)
        //     };
        // }))
    }
    const handleKeyUp = (event) => {
        let searchkeyword = event.target.value
        setPage(0);
        if (searchkeyword.length > 2) {
            setKeywords(searchkeyword)
            datas = {
                pageNum: 0,
                perpage: rowsPerPage,
                addrr: addr,
                keywords: searchkeyword
            }
            getTransactionSearch(datas)
        }
        if (searchkeyword.length == 0) {
            setPage(0);
            datas = {
                pageNum: 0,
                perpage: rowsPerPage,
                addrr: addr
            }
            getAddressDetails(datas)
        }
    }

    const handleChanged = (event) => {
        const { name, checked } = event.target;
        if (name === 'allselect') {
            let tempAddress = address.map((addr) => {
                return { ...addr, isChecked: checked }
            });
            // console.log(tempAddress, "<<")
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
                    TxHash: d.TxHash,
                    Age: d.Age,
                    From: d.From,
                    To: d.To,
                    Amount: d.Amount
                };
            }))
        } else {
            // alert("hiiii")
            let tempAddress = address.map((addr) => addr.id === name ? { ...addr, isChecked: checked } : addr);
            console.log(tempAddress, ">>>>")
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
                    TxHash: d.TxHash,
                    Age: d.Age,  //moment(d.Age * 1000).format('DD/MM/YYYY hh:mm:ss')
                    From: d.From,
                    To: d.To,
                    Amount: d.Amount
                };
            }))
        }
    }


    return (

        <div>
            <div className="content_input_all">
                <div className="searchelement-input3">
                    <img style={{ width: 18, height: 18, marginRight: 5 }}
                        src={require('../../assets/images/Search.png')} />
                    <input
                        onKeyUp={(event) => props._handleSearch(event)}
                        style={{
                            fontSize: '11px',
                            letterSpacing: 0.62,
                            width: "105px",
                            color: '#2a2a2a',
                            fontFamily: 'Inter',
                            outlineColor: 'transparent',
                            borderWidth: 0,
                            fontWeight: "600"
                        }} type="text"
                        placeholder="Search Txn"
                        onKeyUp={handleKeyUp} />

                </div>

                {isDownloadActive ? <CSVLink filename={"transactions.csv"} data={downloadaddress}
                    style={{ fontSize: '15px', color: '#ffffff', textAlign: 'center', backgroundColor: 'rgb(7 125 245)', borderRadius: '4px', width: '94px', height: '30px' }}>Export</CSVLink>
                    :
                    <CSVLink filename={"transactions.csv"} data={downloadaddress}
                        style={{ pointerEvents: 'none', fontSize: '15px', textAlign: 'center', color: '#ffffff', backgroundColor: '#e3e7eb', borderRadius: '4px', width: '94px', height: '30px' }}>Export</CSVLink>
                }




            </div>

            <Grid lg={13} className="tablegrid_address">
                <Paper style={{ borderRadius: '14px' }} elevation={0}>
                    <TableContainer className={classes.container} id="container-table">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ border: "none" }} align="left">
                                       <input
                                            onChange={handleChanged}
                                            type="checkbox"
                                            name="allselect"
                                            checked={address.filter((addr) => addr?.isChecked == true).length == address.length}
                                            style={{ marginRight: "8px" }}
                                        />
                                        <span className={"tableheaders"}>Txn Hash</span>
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "none", paddingLeft: "1.8%" }}
                                        align="left"
                                    >
                                        <span className={"tableheaders mar-right-45 mar-right-40"}>Age</span>
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "none", paddingLeft: "1.8%" }}
                                        align="left"
                                    >
                                        <span className={"tableheaders"}>Block</span>
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "none", paddingLeft: "1.8%" }}
                                        align="left"
                                    >
                                        <span className={"tableheaders"}>From</span>
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "none", paddingLeft: "1.8%" }}
                                        align="left"
                                    >
                                        <span className={"tableheaders"}>To</span>
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "none", paddingLeft: "1%" }}
                                        align="left"
                                    >
                                        <span className={"tableheaders"}>Amount</span>
                                    </TableCell>
                                    {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                                </TableRow>
                            </TableHead>
                            {noData == false &&
                                <TableBody >
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
                                                <TableCell style={{ border: "none", width: '22%' }} margin-left="5px" >
                                                   <div className="dis-flex"> <input
                                                        key={row.id}
                                                        name={row.id}
                                                        onChange={handleChanged}
                                                        type="checkbox"
                                                        checked={row?.isChecked || false}
                                                        style={{ marginRight: "8px" }}
                                                    />

                                                    <a className="linkTable" href={'/transaction-details/' + row.Txn_Hash}>
                                                        <Tooltip placement="top" title={row.TxHash}>
                                                            <span className="tabledata">
                                                                {shorten(row.TxHash)}{" "}
                                                            </span>
                                                        </Tooltip>
                                                    </a></div>

                                                </TableCell>
                                                <TableCell style={{ border: "none", width: '17%' }} align="left">
                                                    <span className="tabledata">{row.Age}</span>
                                                </TableCell>
                                                <TableCell style={{ border: "none", width: '15%' }} align="left">
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

                                                    <span className="tabledata">{row.Amount}</span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            }
                            {noData == true &&
                                <TableBody >
                                    <TableRow>
                                        <TableCell id="td" colspan="6" style={{ borderBottom: "none" }}>
                                            <span className="tabledata" style={{ color: 'red' }}>No transaction found.</span>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                        </Table>

                    </TableContainer>
                </Paper>
                <Grid container className="mar-top-15 flex-dir-col">
                    <Grid item xs="3" className="dis-flex">
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
        </div >

    );
}