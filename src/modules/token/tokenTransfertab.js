import React, { useState, useEffect } from "react";
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
import TokenData from "../../services/token";
import Utils from "../../utility";
import { useParams } from "react-router";
import styled from "styled-components";

const Pagination=styled.div`

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 950px;
    margin:auto;

    @media (max-width:640px){
      display: flex;
      flex-direction:column;
    }  
    @media (max-width:1023px){
      width: auto;
    }       
  `;
  const RightPagination =styled.div`
  display:flex ;  
  margin-top: 20px;
  flex-direction: row;
  

    @media(max-width:640px){
    margin-top: 10px;
    /* margin-right: 5%; */
    }
    
`
const LeftPagination=styled.div`
display: flex;
flex-direction: row;
margin-top: 60px;

@media (max-width:1023px){
  /* margin-left: 5%; */
  margin-top: 20px;
}
`;

const dummyData = [
  {
    id: "1",
    TxHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "1 hrs ago",
    Block: "22,650,452",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Amount: "0 XDC",
  },
  {
    id: "1",
    TxHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "1 hrs ago",
    Block: "22,650,452",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Amount: "0 XDC",
  },
  {
    id: "1",
    TxHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "1 hrs ago",
    Block: "22,650,452",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Amount: "0 XDC",
  },
  {
    id: "1",
    TxHash: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Age: "1 hrs ago",
    Block: "22,650,452",
    From: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    To: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Amount: "0 XDC",
  },
];
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
  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
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
  const [transfer, settransfer] = useState({});
  const [totalToken, setTotalToken] = useState({});
  const { address } = useParams();

  useEffect(() => {
    let values = { addr: address, pageNum: page, perpage: rowsPerPage };
    transferDetail(values);
  }, []);
  console.log(rowsPerPage, "<>?");

  const transferDetail = async (values) => {
    let [error, tns] = await Utils.parseResponse(
      TokenData.getTotalTransferTransactionsForToken(values)
    );
    if (error || !tns) return;
    settransfer(tns);
    setTotalToken(tns.totalTransactionCount);
    const interval = setInterval(async () => {
      let [error, tns] = await Utils.parseResponse(
        TokenData.getTotalTransferTransactionsForToken(values)
      );
      settransfer(tns);
      setTotalToken(tns.totalTransactionCount);
    }, 90000);
  };

  const handleChangePage = (action) => {
    if (action == "first") {
      setPage(0);
      let values = { addr: address, pageNum: page, perpage: rowsPerPage };
      transferDetail(values);
    }
    if (action == "prev") {
      if (page - rowsPerPage >= 0) {
        let pageValue = page - rowsPerPage;
        setPage(pageValue);
        let values = { addr: address, pageNum: page, perpage: rowsPerPage };
        transferDetail(values);
      }
    }
    if (action == "next") {
      if (rowsPerPage + page < totalToken) {
        let pageValue = rowsPerPage + page;
        setPage(pageValue);
        let values = { addr: address, pageNum: page, perpage: rowsPerPage };
        transferDetail(values);
      }
    }

    if (action == "last") {
      let pageValue = totalToken - rowsPerPage;
      setPage(pageValue);
      let values = { addr: address, pageNum: page, perpage: rowsPerPage };
      transferDetail(values);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    let values = { addr: address, pageNum: 0, perpage: event.target.value };
    transferDetail(values);
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
                  <span className={"tableheaders_Transfer-table-hash"}>TxnHash</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders_Transfer-table-age"}>Age</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"Tableheaders"}>Block</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"Tableheaders"}>From</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"Tableheaders"}>To</span>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {transfer.totalTransactions &&
                transfer.totalTransactions.length >= 1 &&
                transfer.totalTransactions.map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell id="td" style={{ border: "none" }}>
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <Tooltip placement="top" title={row.hash}>
                            <span className="tabledata">
                              {" "}
                              {shorten(row.hash)}{" "}
                            </span>
                          </Tooltip>{" "}
                        </a>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        <span className="tabledata">{row.timestamp}</span>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <span className="tabledata"> {row.blockNumber}</span>{" "}
                        </a>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <Tooltip placement="top" title={row.from}>
                            <span className="tabledata">
                              {" "}
                              {shorten(row.from)}{" "}
                            </span>
                          </Tooltip>
                        </a>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <Tooltip placement="top" title={row.to}>
                            <span className="tabledata">
                              {" "}
                              {shorten(row.to)}{" "}
                            </span>
                          </Tooltip>
                        </a>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody> */}

            {dummyData.map((row)=> (
              <>
              <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell id="td" style={{ border: "none" }}>
                        <a style={{ color: "blue", fontSize: 11 }} href="#text">
                          <Tooltip placement="top" title={row.TxHash}>
                            <span className="tabledata">
                              {" "}
                              {shorten(row.TxHash)}{" "}
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

              </>
            ))}

          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   flexDirection: "row",
        // }}
      >
        <LeftPagination
          // style={{
          //   display: "flex",
          //   flexDirection: "row",
          //   marginTop: "45px",
          //   marginLeft: "1%",
          // }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: "600",
              marginTop: "6px"
            }}
          >
            Show
          </p>
          <select className="selectbox" onChange={handleChangeRowsPerPage}>
            <option selected>50</option>
            <option>75</option>
            <option>100</option>
          </select>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "600",
              marginTop: "6px"
            }}
          >
            {" "}
            Records
          </p>
        </LeftPagination>

        <RightPagination
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: "0%",
          }}
        >
          <div
            className={page === 0 ? "firstbox disabled" : "firstbox"}
            onClick={() => handleChangePage("first")}
          >
            <button style={{ backgroundColor: "white" }} className="first">
              First
            </button>
          </div>
          <div
            className={page === 0 ? "previousbox disabled" : "previousbox"}
            onClick={() => handleChangePage("prev")}
          >
            <p className="path">{"<"}</p>
          </div>
          <div className="pagebox">
            <p className="Page-1-of-5">
              Page{" "}
              {Math.round(totalToken / rowsPerPage) +
                1 -
                Math.round((totalToken - page) / rowsPerPage)}{" "}
              of {Math.round(totalToken / rowsPerPage)}
            </p>
          </div>
          <div
            className={
              page + rowsPerPage === totalToken ? "nextbox disabled" : "nextbox"
            }
          >
            <p className="path-2" onClick={() => handleChangePage("next")}>
              {">"}
            </p>
          </div>
          <div
            className={
              page + rowsPerPage === totalToken ? "lastbox disabled" : "lastbox"
            }
            onClick={() => handleChangePage("last")}
          >
            <button style={{ backgroundColor: "white" }} className="last">
              Last
            </button>
          </div>
        </RightPagination>
      </Pagination>
    </>
  );
}
