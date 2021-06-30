import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "../../modules/explorer/tokensearchbar";
import FooterComponent from "../common/footerComponent";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import moment from "moment";
import Utils from "../../utility";
import SearchIcon from "@material-ui/icons/Search";
import AddressTableComponent from "./addressTable";
import searchIcon from "../../assets/images/Search.png";
import { ImQrcode } from "react-icons/im";
// import { AccountService, CoinMarketService, BlockService, TransactionService } from '../../services'
// import "../../../src/assets/styles/blocksAndTransactionList.css";

import { Grid } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useParams } from "react-router";
import { BlockService } from "../../services";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  rootui: {
    minWidth: 650,
    borderRadius: "10px",
    backgroundColor: "white",
  },
});

export default function AddressDetails() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  //   useEffect(async () => {
  //     let urlPath = `/${blockNumber}`;
  //     let [error, blockDetailsUsingHeight] = await Utils.parseResponse(
  //       BlockService.getDetailsOfBlock(urlPath, {})
  //     );
  //     if (error || !blockDetailsUsingHeight) return;
  //     setHeight(blockDetailsUsingHeight);
  //     const interval = setInterval(async () => {
  //       let [error, blockDetailsUsingHeight] = await Utils.parseResponse(
  //         BlockService.getDetailsOfBlock(urlPath, {})
  //       );
  //       setHeight(blockDetailsUsingHeight);
  //     }, 45000);
  //   }, []);

  const classes = useStyles();

  return (
    <div>
      <Tokensearchbar />
      <Grid lg={8} className="table-grid-block">
        <div
          className="block_details_heading"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p className="block_details_heading_left">Account Details</p>
        </div>
        <Paper className={classes.rootui}>
          <Table className="table-block" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: "0px",
                    paddingRight: "1px",
                    borderBottom: "none",
                  }}
                  id="td"
                ></TableCell>
                <TableCell className="first-row-table_address">
                  Address
                </TableCell>
                <TableCell className="second-row-table_address">
                  xdcbb70bbce1429d622d0306b5b149b48f233d70df3
                </TableCell>
                <TableCell>
                  <CopyToClipboard text="xdcbb70bbce1429d622d0306b5b149b48f233d70df3">
                    <button
                      style={{
                        color: "#2149b9",
                        backgroundColor: "white",
                        fontSize: 14,
                      }}
                    >
                      <i class="fa fa-clone" aria-hidden="true"></i>
                    </button>
                  </CopyToClipboard>
                  <ImQrcode />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    width: "0px",
                    paddingRight: "1px",
                    borderBottom: "none",
                  }}
                  id="td"
                ></TableCell>
                <TableCell className="first-row-table_address">
                  XDC Value
                </TableCell>
                <TableCell className="second-row-table_address">
                  $145.80 (@ $0.054055/XDC)
                </TableCell>
                <TableCell>
                  <CopyToClipboard text="fxcfxfgxfgfcfchchgchgtycccujgcvj">
                    <button
                      style={{
                        color: "#2149b9",
                        backgroundColor: "white",
                        fontSize: 14,
                      }}
                    >
                      <i class="fa fa-clone" aria-hidden="true"></i>
                    </button>
                  </CopyToClipboard>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
        <br />
        <br />
        <div className="container_sec">
          <div className="block_sec">
            <div className="bloc-tabs_sec">
              <button
                className={
                  toggleState === 1 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(1)}
              >
                Transactions
              </button>
              <button
                className={
                  toggleState === 2 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(2)}
              >
                Internal Txn
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
                <Button variant="contained" disabled>
                  Export
                </Button>
              </div>
              <AddressTableComponent />
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
                <Button variant="contained" disabled>
                  Export
                </Button>
                {/* {this.address === true ? (
                  <Button variant="contained" color="primary">
                    Export
                  </Button>
                ) : (
                  <Button variant="contained" disabled>
                    Disabled
                  </Button>
                )} */}
              </div>
              <AddressTableComponent />
            </div>
          </div>
        </div>
      </Grid>
      <FooterComponent />
    </div>
  );
}
