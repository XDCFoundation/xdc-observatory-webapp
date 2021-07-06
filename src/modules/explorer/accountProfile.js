import { mergeClasses } from '@material-ui/styles';
import React, { Component } from 'react';
import "../../assets/styles/profile.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Transaction from './dashboardPopup/transactionpopup';
import Watchlist from './dashboardPopup/watchlist';
import Private from './dashboardPopup/private'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

// import * as React from 'react';
// import { DataGrid } from '@material-ui/data-grid';
// import { useDemoData } from '@material-ui/x-grid-data-generator';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import { Grid } from "@material-ui/core";


class AccountProfile extends Component {
    state={
    table1:false
    }
    handleWatch=()=>{
     this.setState({
     table1:true    
     })
    }
    shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }
    // const { data } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 10,
    //     maxColumns: 6,
    //   });

    // export default function CheckboxSelectionGrid() {
    //     const { data } = useDemoData({
    //       dataSet: 'Commodity',
    //       rowLength: 10,
    //       maxColumns: 6,
    //     });
    // }

    create_url(item, type) {
        // Thisn is to create URL for table items. changing it can affect whole table.
        if (!item || !item.length) {
            return "..."
        }
        return `#${item}-#{type}`
    }
    //  splitId(id) {
    //     return(
    //         id.split(0,8)+"..."+id.split(id.length-3)
    //     ) 
           
        
    // }
    render() {

        
            
        
        return (
            <div className="maindiv" >
                <div className="heading">
                <span ><img className="icon" src={require("../../assets/images/Profile.png")}></img>
                </span>
                <span >
                <div className="nameicon">
                <span className="welcome">welcome, CrytoAlex</span><span ><img className="noticon" src={require("../../assets/images/notification.png")} ></img></span>
                </div>
                <div className="edit">
                Edit Profile
                </div>

                </span>
                
                </div>
                <div className="divbox">
                    <Watchlist/>
                {/* <div className="div1" onClick={<Transaction/>}>
                    
                    <div >
                    <img className="imagediv1" src={require("../../assets/images/watchlist.png")}></img>
                    </div>
                    <div className="headingdiv1">
                     Create Watchlist
                    </div>
                    <div className="paradiv1">
                     An Email notification can be sent to you when an address on your watchlist recieves an incoming notifications
                    </div>
                    
                </div> */}
                {/* <div className="div2">
                <div >
                <img className="imagediv2" src={require("../../assets/images/transaction.png")}></img>
                    </div>
                    <div className="headingdiv2">
                    Add Transaction label
                    </div>
                    <div className="paradiv2">
                     Add a personal note to transacton hash to track it in future
                    </div>
                    
                </div> */}
                <Transaction/>
                <Private/>
                {/* <div className="div3">
                <div >
                <img className="imagediv3" src={require("../../assets/images/private.png")}></img>
                    </div>
                    <div className="headingdiv3">
                    Add private tag to an address
                    </div>
                    <div className="paradiv3">
                     Add a short memo or private tag to the address of interest
                    </div>
                    
                </div> */}
                </div>

                <div className="innerdiv">
                    <span className="mywatch" >
                        My Watchlist
                    </span>
                    <span className="txnprivate" >
                        Txn Private Note

                    </span>
                    <span className="address">
                        Tagged Adresses

                    </span>
                </div>

                <div className="line" ></div>
                
                <div className="searchdiv">
                    {/* <SearchIcon style={{paddingRight:"4px"}}></SearchIcon> */}
                    <span>
                    <span className="searchiccon"><SearchIcon style={{color:"#9fa9ba", marginRight:"-4px",position:"relative",left:'20px'}}/></span>
                        <span><input type ="text" placeholder="Search"  className="searchinput">
                        {/* <img  src={require("../../assets/images/Search.png")}></img> */}
                        </input>
                        </span>
                        </span>
                    
                        <button style={{color:"white",borderRadius: "4px",
  backgroundColor: "#9fa9ba"}}> Export</button>

                    
                </div>

                

                <div className="griddiv">

                  
<Table >
                <TableHead >
                        <TableRow >
                            <TableCell style={{ border: "none", paddingLeft: "6%" }} align="left" >
                            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></input>
                                <span className={"tableheaders"}>Address</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "8.5%" }} align="left"><span className={"tableheaders"}>Description</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "13%" }} align="left"><span className={"tableheaders"}>Balance</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "8.5%" }} align="left"><span className={"tableheaders"}>AddedOn</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "6.5%" }} align="left"><span className={"tableheaders"}>Notification</span></TableCell>
                
                        </TableRow>
                    </TableHead> 

                    <TableBody>
                        {/* {props.state.transactionList && props.state.transactionList.length && props.state.transactionList.map((row, index) => { */}

                            {/* const currentTime = new Date();
                            const previousTime = new Date(row.timestamp * 1000);
                            const ti = timeDiff(currentTime, previousTime);
                            return ( */}
                                <TableRow >
                                {/* <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></input> */}
                                    <TableCell 
                                    style={{ border: "none" }} align="left">
                                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></input>
                                        <span className="tabledata">xdcc4e699581116412965b…5e7c</span>
                                        {/* <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip> */}
                                        {/* <a className="linkTable" href={("address")}> <span className="tabledata"> </span> </a> */}
                                    </TableCell>
                                    <TableCell style={{ border: "none",  }} align="left"><span className="tabledata">My Wallet</span></TableCell>
                                    <TableCell style={{ border: "none",}} align="right"><span className="tabledata">13,141 XDC ($633.37)</span></TableCell>
                                    <TableCell style={{ border: "none",  }} align="right"> <span className="tabledata"> 10:30 AM, 9 Jun 2021</span></TableCell>
                                    <TableCell style={{ border: "none", }} align="right"><span className="tabledata">Off</span></TableCell>
                                    {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.to, "hash")}><Tooltip placement="top" title={row.to}><span className="tabledata">{!row.to ? "------------------" : shorten(row.to)}</span></Tooltip></a></TableCell> */}
                                    <TableCell style={{ border: "none",  }} align="right"><span className="tabledata">Edit</span></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell style={{ border: "none" }} align="left">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></input>
                                        <span className="tabledata">xdcc4e699581116412965b…5e7c</span>
                                        {/* <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip> */}
                                        {/* <a className="linkTable" href={("address")}> <span className="tabledata"> </span> </a> */}
                                    </TableCell>
                                    <TableCell style={{ border: "none",  }} align="left"><span className="tabledata">JohnB</span></TableCell>
                                    <TableCell style={{ border: "none",}} align="right"><span className="tabledata">800 XDC ($38.56)</span></TableCell>
                                    <TableCell style={{ border: "none",  }} align="right"> <span className="tabledata"> 8:12 PM, 6 Jun 2021</span></TableCell>
                                    <TableCell style={{ border: "none", }} align="right"><span className="tabledata">Email</span></TableCell>
                                    {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.to, "hash")}><Tooltip placement="top" title={row.to}><span className="tabledata">{!row.to ? "------------------" : shorten(row.to)}</span></Tooltip></a></TableCell> */}
                                    <TableCell style={{ border: "none",  }} align="right"><span className="tabledata">Edit</span></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell style={{ border: "none" }} align="left">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></input>
                                        <span className="tabledata">5e7c71b8e2dd50ac8d30x…5b9c</span>
                                        {/* <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip> */}
                                        {/* <a className="linkTable" href={("address")}> <span className="tabledata"> </span> </a> */}
                                    </TableCell>
                                    <TableCell style={{ border: "none",  }} align="left"><span className="tabledata">Company</span></TableCell>
                                    <TableCell style={{ border: "none",}} align="right"><span className="tabledata">621 XDC ($26.50)</span></TableCell>
                                    <TableCell style={{ border: "none",  }} align="right"> <span className="tabledata">5:18 PM, 1 Jun 2021</span></TableCell>
                                    <TableCell style={{ border: "none", }} align="right"><span className="tabledata">Email</span></TableCell>
                                    {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.to, "hash")}><Tooltip placement="top" title={row.to}><span className="tabledata">{!row.to ? "------------------" : shorten(row.to)}</span></Tooltip></a></TableCell> */}
                                    <TableCell style={{ border: "none",  }} align="right"><span className="tabledata">Edit</span></TableCell>
                                </TableRow>
                            {/* );
                        })} */}
                    {/* })} */}
                    </TableBody>
                    </Table>



  










              

























                {/* <Grid lg={8} className="tablegrid">
            <Grid class="tabletop-header"></Grid>
            <Grid component={Paper}>
                <Table className="table" aria-label="Latest Transactions">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: "none", paddingLeft: "4%" }} align="left" ><span className={"tableheaders"}>Address</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "1.5%" }} align="left"><span className={"tableheaders"}>Description</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "3%" }} align="left"><span className={"tableheaders"}>Balance</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Added On</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Notification</span></TableCell>
                            {/* <TableCell style={{ border: "none", paddingLeft: "1.5%" }} align="left"><span className={"tableheaders"}>To</span></TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                        {/* </TableRow>
                    </TableHead> */} 

                    {/* <TableBody>

                    </TableBody> */}
                    {/* <TableBody>
                        {props.state.transactionList && props.state.transactionList.length && props.state.transactionList.map((row, index) => {

                            const currentTime = new Date();
                            const previousTime = new Date(row.timestamp * 1000);
                            const ti = timeDiff(currentTime, previousTime);
                            return (
                                <TableRow key={row.name} style={index % 2 !== 1 ? { background: "#f9f9f9" } : { background: "white" }}>
                                    <TableCell style={{ border: "none" }} >
                                        <Tooltip placement="right" title={row.hash}><VisibilityIcon fontSize="small" style={{ color: "#b9b9b9" }} /></Tooltip>
                                        <a className="linkTable" href={props.create_url(row.hash, "hash")}> <span className="tabledata">{shorten(row.hash)}  </span> </a>
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
                    </TableBody> */}
                {/* </Table>
            </Grid>
</Grid> */}


                </div>

              <div>
                <h1></h1>
              </div>


            </div>
        );
    }
}

export default AccountProfile;
// export default function CheckboxSelectionGrid() {
//     const { data } = useDemoData({
//       dataSet: 'Commodity',
//       rowLength: 10,
//       maxColumns: 6,
//     });
// }





