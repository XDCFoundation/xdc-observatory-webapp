import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import TokenData from "../../services/token";
import Utility, { dispatchAction } from "../../utility";
import ReactHtmlParser from "react-html-parser";
import Utils from "../../utility";
import styled from "styled-components";

const Pagination = styled.div`

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 75.125rem;
    margin: 0 auto;

    @media (max-width:640px){
      display: flex;
      flex-direction:column;
    }  
    @media (max-width:1023px){
      width: auto;
    }       
  `;
const RightPagination = styled.div`
  display:flex ;  

  flex-direction: row;
  

    @media(max-width:640px){
    margin-top: 10px;
    /* margin-right: 5%; */
    }
    
`
const LeftPagination = styled.div`
display: flex;
flex-direction: row;
margin-top: 39px;

@media (max-width:1023px){
  /* margin-left: 5%; */
  margin-top: 20px;
}
`;
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "f9f9f9",
    },
  },
}))(TableRow);
const rows = [
  {
    Rank: "12",
    Address: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Quantity: "267333",
    Percentage: "9.76%",
    Value: "0 XDC",
  },
  {
    Rank: "12",
    Address: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Quantity: "267333",
    Percentage: "9.76%",
    Value: "0 XDC",
  },
  {
    Rank: "12",
    Address: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Quantity: "267333",
    Percentage: "9.76%",
    Value: "0 XDC",
  },
  {
    Rank: "12",
    Address: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Quantity: "267333",
    Percentage: "9.76%",
    Value: "0 XDC",
  },
  {
    Rank: "12",
    Address: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Quantity: "267333",
    Percentage: "9.76%",
    Value: "0 XDC",
  },
  {
    Rank: "12",
    Address: "xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60",
    Quantity: "267333",
    Percentage: "9.76%",
    Value: "0 XDC",
  },
];

const useStyles = makeStyles({
  rootui: {
    backgroundColor: "white",
  },

  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderTopColor: "white",
    backgroundColor: "transparent",
    borderBottomColor: "white",
    borderBottom: "none",
    background: "#fff",
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
  const [holders, setHolders] = useState([]);
  const [totalHolder, setTotalHolder] = useState({});
  const [transfer, settransfer] = useState({});
  const { address } = useParams();
  const history = useHistory();
  useEffect(() => {
    let values = { addr: address, pageNum: 0, perpage: 50 };
    listOfHolders(values);
  }, []);
  const listOfHolders = async (values) => {
    let [error, tns] = await Utils.parseResponse(
      TokenData.getListOfHoldersForToken(values)
    );
    if (error || !tns) return;
    setHolders(tns.response);
    setTotalHolder(tns.responseCount);
  };

  const handleChangePage = (action) => {
    if (action == "first") {
      setPage(0);
      let values = { addr: address, pageNum: page, perpage: rowsPerPage };
      listOfHolders(values);
    }
    if (action == "prev") {
      if (page - rowsPerPage >= 0) {
        let pageValue = page - rowsPerPage;
        setPage(pageValue);
        let values = { addr: address, pageNum: page, perpage: rowsPerPage };
        listOfHolders(values);
      }
    }
    if (action == "next") {
      if (rowsPerPage + page < totalHolder) {
        let pageValue = rowsPerPage + page;
        setPage(pageValue);
        let values = { addr: address, pageNum: page, perpage: rowsPerPage };
        listOfHolders(values);
      }
    }

    if (action == "last") {
      let pageValue = totalHolder - rowsPerPage;
      setPage(pageValue);
      let values = { addr: address, pageNum: page, perpage: rowsPerPage };
      listOfHolders(values);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    let values = { addr: address, pageNum: 0, perpage: event.target.value };
    listOfHolders(values);
  };
  console.log(rowsPerPage, "???");
  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  console.log(holders, "<<<<");

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

  return (
    <div>
      <Paper style={{ borderRadius: "14px" }} elevation={0}>
        <TableContainer className={classes.container} id="container-table">
          <Table>
            <TableHead>
              <TableRow className="w-100">
                <TableCell style={{ border: "none" }} className="w-10" align="left">
                  <span className={"tableheaders table-headers"}>Rank</span>
                </TableCell>
                <TableCell style={{ border: "none" }}  className="w-40"align="left">
                  <span className={"tableheaders table-headers"}>Address</span>
                </TableCell>
                <TableCell style={{ border: "none" }} className="w-20"align="left">
                  <span className={"tableheaders table-headers"}>Quantity</span>
                </TableCell>
                <TableCell style={{ border: "none" }} className="w-21" align="left">
                  <span className={"tableheaders table-headers"}>Percentage</span>
                </TableCell>
                <TableCell style={{ border: "none" }} className="w-12" align="left">
                  <span className={"tableheaders table-headers"}>Value</span>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
                        </TableHead>
                        <TableBody>
                            {holders?.map((row, index) => {
                                return (

                                    <StyledTableRow hover role="checkbox" tabIndex={-1} >

                                        <TableCell id="td"><span className="tabledata">{index + 1 ? index + 1 : ""}</span></TableCell>
                                        <TableCell id="td">
                                            <a style={{ color: 'blue', fontSize: 11 }} href={"/holder-details/" + holders.address}>

                                                <span
                                                    className="tabledata"> {holders.address} </span>

                                            </a>
                                        </TableCell>
                                        <TableCell id="td"><span className="tabledata">{holders.quantity}</span></TableCell>
                                        <TableCell id="td"> <span className="tabledata"> {holders.percentage}</span>
                                        </TableCell>
                                        <TableCell id="td"> <span className="tabledata"> {holders.Value}</span> </TableCell>


                                    </StyledTableRow>

                                );
                            })}

                            
                        </TableBody> */}

            <TableBody>
            {rows.map((row, index) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell id="td">
                      <span className="tabledata table-data">{index + 1 ? index + 1 : ""}</span>
                    </TableCell>
                    <TableCell id="td">
                      <a
                        style={{ color: "blue", fontSize: 11 }}  href={"/holder-details/" + row.Address}>
                        {/* <Tooltip placement="top" title={row.Address}>
                        <span className="tabledata table-data"> 
                         {" "}
                        {shorten(row.Address)}{" "}
                        </span>
                        </Tooltip>{" "} */}
                        <span className="tabledata table-data">{row.Address}</span>
                      </a>
                    </TableCell>
                    <TableCell id="td">
                      <span className="tabledata table-data">{row.Quantity}</span>
                    </TableCell>
                    <TableCell id="td">
                      {" "}
                      <span className="tabledata table-data">  {row.Percentage}</span>
                    </TableCell>
                    <TableCell id="td">
                      {" "}
                      <span className="tabledata table-data">  {row.Value}</span>{" "}
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
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
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   marginRight: "0%",
        // }}
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
              {Math.round(totalHolder / rowsPerPage) +
                1 -
                Math.round((totalHolder - page) / rowsPerPage)}{" "}
              of {Math.round(totalHolder / rowsPerPage)}
            </p>
          </div>
          <div
            className={
              page + rowsPerPage === totalHolder
                ? "nextbox disabled"
                : "nextbox"
            }
          >
            <p className="path-2" onClick={() => handleChangePage("next")}>
              {">"}
            </p>
          </div>
          <div
            className={
              page + rowsPerPage === totalHolder
                ? "lastbox disabled"
                : "lastbox"
            }
            onClick={() => handleChangePage("last")}
          >
            <button style={{ backgroundColor: "white" }} className="last">
              Last
            </button>
          </div>
        </RightPagination>
      </Pagination>
    </div>
  );
}
