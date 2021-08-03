import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Divider } from "@material-ui/core";
import "../../assets/styles/custom.css";
import { useHistory } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const rows = [
  {
    TxnHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "5 min Ago",
    Block: "267333",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
  },
  {
    TxnHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "5 min Ago",
    Block: "267333",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
  },
  {
    TxnHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "5 min Ago",
    Block: "267333",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
  },
  {
    TxnHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "5 min Ago",
    Block: "267333",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
  },
  {
    TxnHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "5 min Ago",
    Block: "267333",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
  },
];

const useStyles = makeStyles({
  rootui: {
    backgroundColor: "white",
  },

  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    border: "solid 0.5px #e3e7eb",
    borderTopColor: "white",
    backgroundColor: "white",
    borderBottomColor: "white",
    borderBottom: "none",
    background: "#fff",
    padding: "0 px",
  },

  divider: {
    borderTop: "0px solid #bbb",
    width: "100%",
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const history = useHistory();
  const handleChangePage = (action) => {
    if (action == "next") {
      if (Math.ceil(rows.length / rowsPerPage) != page + 1) {
        setPage(page + 1);
      }
    } else {
      if (0 != page) {
        setPage(page - 1);
      }
    }
    if (action == "next") {
      if (Math.ceil(rows.length / rowsPerPage) < page + 1)
        setPage(Math.ceil(rows.length / rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  return (
    <>
      <Paper style={{ borderRadius: "14px" }} elevation={0}>
        <TableContainer className={classes.container} id="container-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders"}>TxnHash</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders"}>Age</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders"}>Block</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders"}>From</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders"}>To</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell id="td" style={{ border: "none" }}>
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <Tooltip placement="top" title={row.TxnHash}>
                            <span className="tabledata">
                              {" "}
                              {shorten(row.TxnHash)}{" "}
                            </span>
                          </Tooltip>{" "}
                        </a>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        <span className="tabledata">{row.Age}</span>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <span className="tabledata"> {row.Block}</span>{" "}
                        </a>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <Tooltip placement="top" title={row.From}>
                            <span className="tabledata">
                              {" "}
                              {shorten(row.From)}{" "}
                            </span>
                          </Tooltip>
                        </a>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <Tooltip placement="top" title={row.To}>
                            <span className="tabledata">
                              {" "}
                              {shorten(row.To)}{" "}
                            </span>
                          </Tooltip>
                        </a>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "45px",
                marginLeft: "1%",
              }}
            >
              Show
              <select className="selectbox" onChange={handleChangeRowsPerPage}>
                <option selected>50</option>
                <option>75</option>
                <option>100</option>
              </select>
              Records
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginRight: "0%",
              }}
            >
              <div className="firstbox" onClick={() => setPage(0)}>
                <button style={{ backgroundColor: "white" }} className="first">
                  First
                </button>
              </div>
              <div
                className="previousbox"
                onClick={() => handleChangePage("prev")}
              >
                <p className="path">
                  <ChevronLeftIcon />
                </p>
              </div>
              <div className="pagebox">
                <p className="Page-1-of-5">
                  Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
                </p>
              </div>
              <div className="nextbox">
                <p className="path-2" onClick={() => handleChangePage("next")}>
                  <ChevronRightIcon />
                </p>
              </div>
              <div
                className="lastbox"
                onClick={() =>
                  setPage(Math.ceil(rows.length / rowsPerPage) - 1)
                }
              >
                <button style={{ backgroundColor: "white" }} className="last">
                  Last
                </button>
              </div>
            </div>
          </div>
        </TableContainer>
      </Paper>
    </>
  );
}
