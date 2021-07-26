import React, { useState } from "react";
import {useParams} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import SearchIcon from "@material-ui/icons/Search";
import AddressTableComponent from "./addressTable";
import { ImQrcode } from "react-icons/im";

import Popup from "reactjs-popup";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  rootUI: {
    minWidth: 650,
    borderRadius: "10px",
    backgroundColor: "white",
  },
});

export default function AddressDetailsData() {
  const [toggleState, setToggleState] = useState(1);
  let { addressNumber } = useParams();
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const classes = useStyles();

  return (
    <div style={{backgroundColor:'#fff'}}>
      <Tokensearchbar />
      <Grid lg={8} className="table-grid-block">
        <div
          className="block_details_heading"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p className="block_details_heading_left">Address <span className="AddressTitle">{addressNumber}</span></p>
        </div>

        
        <div className="container_sec">
        <div className="address_block_main">
                <div className="contractOverview">
                    <div className="latest">
                        <h1>Contract Overview</h1>                        
                    </div>
                    <div className="data">                       
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableBody>                           
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold'}}>Balance</TableCell> 
                              <TableCell>0.00000076 XDC</TableCell>                             
                            </TableRow>  
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold'}}>XDC Value</TableCell> 
                              <TableCell>$0.00 (@ $0.068376/CDX)</TableCell>                             
                            </TableRow>
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold'}}>Transactions</TableCell> 
                              <TableCell>21</TableCell>                             
                            </TableRow>
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold'}}>Contract Name</TableCell> 
                              <TableCell>EURG contact Verified<i class="fas fa-badge-check"></i></TableCell>                             
                            </TableRow>                         
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                </div>
                <div className="contractSummary">
                    <div className="latest">
                        <h1>Contract-Summary</h1>
                    </div>
                    <div className="data">
                        <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableBody>                           
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold'}}>Creator</TableCell> 
                              <TableCell>{addressNumber.substring(0,30)}</TableCell>                             
                            </TableRow>  
                            <TableRow>
                              <TableCell style={{fontWeight: 'bold'}}>Transactions</TableCell> 
                              <TableCell>{addressNumber.substring(0,30)}</TableCell>                             
                            </TableRow>
                           
                                                    
                          </TableBody>
                        </Table>
                      </TableContainer>
                        
                    </div>
                </div>
            </div>
        
        <br />
        <br />
          <div className="block_sec">
            <div className="bloc-tabs_sec">
              <button
                className={
                  toggleState === 1 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(1)}
              >
                All Transactions
              </button>
              <button
                className={
                  toggleState === 2 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(2)}
              >
                Internal Transactions
              </button>
              <button
                className={
                  toggleState === 3 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(3)}
              >
                Contract Source
              </button>
            </div>
          </div>

          <div className="content-tabs_sec">
            <div
              className={
                toggleState === 1
                  ? "content_sec  active-content_sec"
                  : "content_sec"
              }
            >
              <div className="content_input_all">
                <div className="content_input_add">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search"
                    className="content_input_add_btn"
                  />
                </div>
                <span style={{color: '#2149b9',fontFamily: 'Inter',fontSize: '14px',fontStyle: 'normal'}}>
                <i class="fa fa-download" aria-hidden="true"></i> Download CSV</span>
                
              </div>
              {/* <AddressTableComponent />*/}
            </div>

            <div
              className={
                toggleState === 2
                  ? "content_sec  active-content_sec"
                  : "content_sec"
              }
            >
              <div className="content_input_all">
                <div className="content_input_add">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search"
                    className="content_input_add_btn"
                  />
                </div>
                <span style={{color: '#2149b9',fontFamily: 'Inter',fontSize: '14px',fontStyle: 'normal'}}>
                <i class="fa fa-download" aria-hidden="true"></i> Download CSV</span>
                
              </div>
              {/* <AddressTableComponent />*/}
            </div>

            <div
              className={
                toggleState === 3
                  ? "content_sec  active-content_sec"
                  : "content_sec"
              }
            >
              <div className="content_input_all">
                <div className="content_input_add">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search"
                    className="content_input_add_btn"
                  />
                </div>
                <span style={{color: '#2149b9',fontFamily: 'Inter',fontSize: '14px',fontStyle: 'normal'}}>
                <i class="fa fa-download" aria-hidden="true"></i> Download CSV</span>
                
              </div>
             {/* <AddressTableComponent />*/}
            </div>
          </div>
        </div>
      </Grid>
      <FooterComponent />
    </div>
  );
}
