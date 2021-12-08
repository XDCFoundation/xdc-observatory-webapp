import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "../../assets/styles/custom.css";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import TokenData from "../../services/token";
import Utils from "../../utility";
import { useParams } from "react-router";
import styled from "styled-components";
import back from '../../assets/images/back.svg';
import next from '../../assets/images/next.svg';
import Loader from '../../assets/loader'
import TableBody from '@material-ui/core/TableBody'


function timeDiff(curr, prev) {
  if (curr < prev) return "0 secs ago";
  let ms_Min = 60 * 1000; // milliseconds in Minute
  let ms_Hour = ms_Min * 60; // milliseconds in Hour
  let ms_Day = ms_Hour * 24; // milliseconds in day
  let ms_Mon = ms_Day * 30; // milliseconds in Month
  let ms_Yr = ms_Day * 365; // milliseconds in Year
  let diff = curr - prev; //difference between dates.
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
const Pagination = styled.div`

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 75.125rem;
    margin:auto;

    @media (max-width:767px){
      display: flex;
      flex-direction:column;
    }  
    @media (max-width:1240px){
      width: auto;
    }       
  `;
const RightPagination = styled.div`
  display:flex ;  
  flex-direction: row;
  

    @media(max-width:767px){
    margin-top: 24px;
    }
    @media (min-width:767px) and (max-width:1240px){
    margin-top: 31px;
    }
    
`
const LeftPagination = styled.div`
display: flex;
flex-direction: row;
margin-top: 39px;

@media (max-width:1240px){
  margin-top: 31px;
}
`;

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


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
    "@media (min-width: 0px) and (max-width: 1240px)": {
      height: "12.563rem"
    }
  },


  divider: {
    borderTop: "0px solid #bbb",
    width: "100%",
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transfer, settransfer] = useState({});
  const [totalToken, setTotalToken] = useState({});
  const [noData, setNoData] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const { address } = useParams();

  useEffect(() => {
    let values = { addr: address, pageNum: page, perpage: rowsPerPage };
    transferDetail(values);
  }, []);

  const transferDetail = async (values) => {
    let [error, tns] = await Utils.parseResponse(
      TokenData.getTotalTransferTransactionsForToken(values)
    );
    if (error || !tns) return;
    settransfer(tns);
    setLoading(false)
    if (tns.totalTransactions.length == 0) {
      setNoData(false)
    }
    setTotalToken(tns.totalTransactionCount);

    const interval = setInterval(async () => {
      let [error, tns] = await Utils.parseResponse(
        TokenData.getTotalTransferTransactionsForToken(values)
      );
      settransfer(tns);

      setTotalToken(tns.totalTransactionCount);
      setLoading(false)
    }, 90000);
  };

  const handleChangePage = (action) => {
    if (action == "first") {
      let pageValue = 0
      setPage(pageValue);
      let values = { addr: address, pageNum: 0, perpage: rowsPerPage };
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
      if (+rowsPerPage+ + page < totalToken) {
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
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }
  return (
    <>
      <Paper elevation={0}>
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
                  <span className={"tableheaders_Transfer-table-block"}>Block</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders_Transfer-table-from"}>From</span>
                </TableCell>
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tableheaders_Transfer-table-to"}>To</span>
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading == true ? (
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: 'none' }} colspan="5">
                    <div className="loader-transfer-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) :

              transfer.totalTransactions &&
              transfer.totalTransactions.length >= 1 &&
              transfer.totalTransactions.map((row) => {
                const currentTime = new Date();
                const previousTime = new Date(row.timestamp * 1000);
                const ti = timeDiff(currentTime, previousTime);
                return (
                  <StyledTableRow
                    tabIndex={-1}
                    key={row.code}
                  >
                    <TableCell id="td" style={{ border: "none" }}>
                      <a style={{ color: "#2b51bc", fontSize: 11 }} href={"/transfer-transaction-details/" + row.hash}>
                        <span className="tabledata table-data">
                          {shorten(row.hash)}
                        </span>
                      </a>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>
                      <span style={{ color: "#2a2a2a" }} className="tabledata table-data">{ti}</span>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>

                      <a style={{ color: "#2b51bc", fontSize: 11 }} href={"/block-details/" + row.blockNumber}>
                        <span className="tabledata table-data"> {row.blockNumber}</span>
                      </a>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>

                      <a style={{ color: "#2b51bc", fontSize: 11 }} href="#text">
                        <Tooltip placement="top" title={row.from}>
                          <span className="tabledata table-data">

                            {shorten(row.from)}
                          </span>
                        </Tooltip>
                      </a>
                    </TableCell>
                    <TableCell id="td" style={{ border: "none" }}>

                      <a style={{ color: "#2419b9", fontSize: 11 }} href="#text">
                        <Tooltip placement="top" title={row.to}>
                          <span className="tabledata table-data">

                            {shorten(row.to)}
                          </span>
                        </Tooltip>
                      </a>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            {
              noData == false && (

                <TableCell id="td" style={{ border: "none" }}>
                  <span className="tabledata table-data">
                    No Transfers Found
                  </span>
                </TableCell>

              )
            }


          </Table>
        </TableContainer>
      </Paper>
      <Pagination>
        <LeftPagination>
          <p
            className="p-pagination"
          >
            Show
          </p>
          <select className="selectbox" onChange={handleChangeRowsPerPage}>
            <option selected>10</option>
            <option>50</option>
            <option>75</option>
            <option>100</option>
          </select>
          <p
            className="p-pagination"
          >

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
            <p className="path"><img src={back} width="9px" /></p>
          </div>
          <div className="pagebox">
            <p className="Page-1-of-5">
              Page&nbsp;
              {Math.ceil(totalToken / rowsPerPage) -
                Math.ceil((totalToken - page) / rowsPerPage) + 1}
              &nbsp;of {Math.ceil(totalToken / rowsPerPage)}
            </p>
          </div>
          <div
            className={
              page + rowsPerPage === totalToken ? "nextbox disabled" : "nextbox"
            }
          >
            <p className="path-2" onClick={() => handleChangePage("next")}>
              <img src={next} width="9px" />
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
