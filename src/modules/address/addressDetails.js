import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "../explorer/tokensearchbar";
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

export default function AddressDetails() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

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
        <Paper className={classes.rootUI}>
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
                />
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
                      <i class="fa fa-clone" aria-hidden="true" />
                    </button>
                  </CopyToClipboard>
                  <Popup trigger={<ImQrcode />} modal>
                    {(close) => (
                      <div className="popup_qr">
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Atque, a nostrum. Dolorem, repellat quidem ut,
                          minima sint vel eveniet quibusdam voluptates delectus
                          doloremque, explicabo tempore dicta adipisci fugit
                          amet dignissimos? Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit. Consequatur sit commodi
                          beatae optio voluptatum sed eius cumque, delectus
                          saepe repudiandae explicabo nemo nam libero ad,
                          doloribus, voluptas rem alias. Vitae?
                        </p>
                        <button
                          className="close"
                          onClick={() => {
                            close();
                          }}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </Popup>
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
                />
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
                      <i class="fa fa-clone" aria-hidden="true" />
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
