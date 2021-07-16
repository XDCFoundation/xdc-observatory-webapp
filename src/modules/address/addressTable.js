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
import { CSVLink, CSVDownload } from "react-csv";
import SearchIcon from "@material-ui/icons/Search";
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

    const [address, setAddress] = useState([]);
    const [reportaddress, setReportaddress] = useState([]);
    const [downloadaddress, setDownloadaddress] = useState([]);
    const [exports, exportAddress] = useState({});
    const [toggle, handleToggle] = useState(false);
    const [page, setPage] = React.useState(0);
    const [checkAll, setCheckAll] = React.useState(0);

    let showPerPage = 10;
    const [rowsPerPage, setRowsPerPage] = React.useState(showPerPage);

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
        let address =props.trans
        
       setAddress(
            address.map((d) => {
                const currentTime = new Date();
                const previousTime = new Date(d.timestamp * 1000);
                const age = timeDiff(currentTime, previousTime);
                return {                   
                    Txn_Hash: d.hash,
                    Age: age,
                    Block: d.blockNumber,
                    From: d.from,
                    To: d.to,
                    Value: d.value,
                    id: d._id,
                };
            })
        );

       setReportaddress(
            address.map((d) => {
                const currentTime = new Date();
                const previousTime = new Date(d.timestamp * 1000);
                const age = timeDiff(currentTime, previousTime);
                return {
                    Txn_Hash: d.hash,
                    Age: age,
                    Block: d.blockNumber,
                    From: d.from,
                    To: d.to,
                    Value: d.value
                };
            })
        );
       setDownloadaddress(address.map((d) => {
                const currentTime = new Date();
                const previousTime = new Date(d.timestamp * 1000);
                const age = timeDiff(currentTime, previousTime);
                return {
                    Txn_Hash: d.hash,
                    Age: age,
                    Block: d.blockNumber,
                    From: d.from,
                    To: d.to,
                    Value: d.value
                };
            }))

    }, []);

const handleChanged = (event) => { 
   const {name , checked} = event.target;
   if(name === 'allselect'){
    let tempAddress = address.map((addr) =>{
        return {...addr, isChecked: checked}
    });
    setAddress(tempAddress)
    setDownloadaddress(tempAddress.map((d) => {                
                return {
                    Txn_Hash: d.Txn_Hash,
                    Age: d.Age,
                    Block: d.Block,
                    From: d.From,
                    To: d.To,
                    Value: d.Value
                };
            }))
   }else{
     let tempAddress = address.map((addr) => addr.id === name ? {...addr,isChecked: checked} : addr);
     setAddress(tempAddress)
     let tempAddr = tempAddress.filter((addr) =>{
        if(addr.isChecked === true){
            return addr
        }
       })
     console.log(tempAddr)
     setDownloadaddress(tempAddr.map((d) => {                
                return {
                    Txn_Hash: d.Txn_Hash,
                    Age: d.Age,
                    Block: d.Block,
                    From: d.From,
                    To: d.To,
                    Value: d.Value
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
               {downloadaddress.length > 0 &&
                  <CSVLink filename={"transactions.csv"} data={downloadaddress.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} 
                style={{fontSize: '15px',color: '#ffffff',backgroundColor: '#e3e7eb',borderRadius: '4px',width:'94px',height:'34px',padding: '4px 0px 0px 20px'}}>Export</CSVLink>  
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
                                    checked={address.filter((addr) => addr?.isChecked !== true).length < 1}
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
                        {address.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            
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
                        <option selected>10</option>
                        <option>25</option>
                        <option>50</option>
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
        </div>

    );
}