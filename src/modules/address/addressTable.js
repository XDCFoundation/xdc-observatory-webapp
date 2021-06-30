import React, { useEffect, useState } from "react";
import BaseComponent from "../baseComponent";
import "../../../src/assets/styles/blocksAndTransactionList.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Grid } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox } from "material-ui";
import Button from "@material-ui/core/Button";

export default function AddressTableComponent(props) {
  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const [address, setAddress] = useState([]);

  useEffect(() => {
    let address = [
      {
        Txn_Hash: "dfhdfnfldflkdngigikafihnadiadfiaikfnhai",
        Age: "1 day ago",
        Block: "30972506",
        From: "xdccejkvlenvlkenvklev",
        To: "nvjvevevbekvnklnvksnvikvni",
        Value: "45000.00XDC",
        id: 1,
      },
      {
        Txn_Hash: "dfhdfnfldflkdngigikafihnadiadfiaikfnhai",
        Age: "1 day ago",
        Block: "30972506",
        From: "xdccejkvlenvlkenvklev",
        To: "nvjvevevbekvnklnksnvikvni",
        Value: "45000.00XDC",
        id: 2,
      },
      {
        Txn_Hash: "dfhdfnfldflkdngigikafihnadiadfiaikfnhai",
        Age: "1 day ago",
        Block: "30972506",
        From: "xdccejkvlenvlkenvklev",
        To: "nvjvevevbekvnklnvksnvikvni",
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
                ></input>
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
                    {/* <Tooltip placement="right" title={row.Txn_Hash}>
                      <VisibilityIcon
                        fontSize="small"
                        style={{ color: "#b9b9b9" }}
                      />
                    </Tooltip> */}
                    <input
                      onChange={(event) => {
                        let checked = event.target.checked;
                        setAddress(
                          address.map((data) => {
                            if (row.id === data.id) {
                              data.select = checked;
                            }
                            return data;
                          })
                        );
                      }}
                      type="checkbox"
                      checked={row.select}
                      style={{ marginRight: "8px" }}
                    ></input>
                    <a className="linkTable" href="/">
                      <span className="tabledata">
                        {shorten(row.Txn_Hash)}{" "}
                      </span>
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
                      <span className="tabledata"> {row.From}</span>
                    </a>
                  </TableCell>
                  <TableCell style={{ border: "none" }} align="left">
                    <a className="linkTable" href="/">
                      <span className="tabledata">{row.To}</span>
                    </a>
                  </TableCell>
                  <TableCell style={{ border: "none" }} align="left">
                    <span className="tabledata">{row.Value}</span>
                  </TableCell>
                  {/* <TableCell style={{ border: "none" }} align="right"><span className="tabledata">0.00000000005 XDC</span></TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}
