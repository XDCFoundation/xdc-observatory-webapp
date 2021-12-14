import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "../../assets/styles/custom.css";
import { useParams } from "react-router-dom";
import TokenData from "../../services/token";
import Utils from "../../utility";
import styled from "styled-components";
import back from "../../assets/images/back.svg";
import next from "../../assets/images/next.svg";
import Loader from "../../assets/loader";

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 75.125rem;
  margin: 0 auto;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 1240px) {
    width: auto;
  }
`;
const RightPagination = styled.div`
  display: flex;

  flex-direction: row;

  @media (max-width: 767px) {
    margin-top: 24px;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    margin-top: 31px;
  }
`;
const LeftPagination = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 39px;

  @media (max-width: 1240px) {
    margin-top: 31px;
  }
`;
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "f9f9f9",
    },
  },
}))(TableRow);
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
    "@media (min-width: 0px) and (max-width: 1240px)": {
      height: "12.563rem",
    },
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
  const [holders, setHolders] = useState([]);
  const [totalHolder, setTotalHolder] = useState({});
  const [noData, setNoData] = useState(true);
  const { address } = useParams();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let values = { addr: address, pageNum: 0, perpage: 10 };
    listOfHolders(values);
  }, []);
  const listOfHolders = async (values) => {
    let [error, tns] = await Utils.parseResponse(
      TokenData.getListOfHoldersForToken(values)
    );
    if (error || !tns) return;
    setHolders(tns);
    setLoading(false);

    if (!tns.data || tns.data.length === 0) {
      setNoData(false);
    }

    setTotalHolder(tns?.responseCount);
  };

  const handleChangePage = (action) => {
    if (action === "first") {
      setPage(0);
      let values = { addr: address, pageNum: page, perpage: rowsPerPage };
      listOfHolders(values);
    }
    if (action === "prev") {
      if (page - rowsPerPage >= 0) {
        let pageValue = page - rowsPerPage;
        setPage(pageValue);
        let values = { addr: address, pageNum: page, perpage: rowsPerPage };
        listOfHolders(values);
      }
    }
    if (action === "next") {
      if (rowsPerPage + page < totalHolder) {
        let pageValue = rowsPerPage + page;
        setPage(pageValue);
        let values = { addr: address, pageNum: page, perpage: rowsPerPage };
        listOfHolders(values);
      }
    }

    if (action === "last") {
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
  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  return (
    <div>
      <Paper style={{ borderRadius: "14px" }} elevation={0}>
        <TableContainer className={classes.container} id="container-table">
          <Table>
            <TableHead>
              <TableRow className="w-100">
                <TableCell
                  style={{ border: "none" }}
                  className="w-10"
                  align="left"
                >
                  <span className={"tableheaders table-headers"}>Rank</span>
                </TableCell>
                <TableCell
                  style={{ border: "none" }}
                  className="w-40"
                  align="left"
                >
                  <span className={"tableheaders table-headers"}>Address</span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "17px" }}
                  className="w-20"
                  align="left"
                >
                  <span className={"tableheaders table-headers"}>Quantity</span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "17px" }}
                  className="w-21"
                  align="left"
                >
                  <span className={"tableheaders table-headers"}>
                    Percentage
                  </span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "17px" }}
                  className="w-12"
                  align="left"
                >
                  <span className={"tableheaders table-headers"}>Value</span>
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading == true ? (
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }} colspan="5">
                    <div className="loader-holder-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {holders?.data?.map((row, index) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell id="td" style={{ border: "none" }}>
                        <span className="tabledata table-data">
                          {row[0]?.Rank}
                        </span>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        <a
                          style={{ color: "#2149b9", fontSize: 11 }}
                          href={"/holder-details/" + row[0]?.Address}
                        >
                          <span className="tabledata table-data">
                            {row[0]?.Address}
                          </span>
                        </a>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        <span className="tabledata table-data mar-lef-3">
                          {row[0]?.Quantity}
                        </span>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <span className="tabledata table-data mar-lef-3">
                          {" "}
                          {!row[0]?.Percentage
                            ? "------"
                            : row[0].Percentage.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <span className="tabledata table-data mar-lef-2">
                          {" "}
                          {row[0]?.Value}
                        </span>{" "}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
                {noData === false && (
                  <div className="No-data-found">
                    <span
                      style={{ textAlign: "center", color: "#2a2a2a" }}
                      className="tabledata"
                    >
                      No Holders Found
                    </span>
                  </div>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
      <Pagination>
        <LeftPagination>
          <p className="p-pagination">Show</p>

          <select className="selectbox" onChange={handleChangeRowsPerPage}>
            <option selected>10</option>
            <option>50</option>
            <option>75</option>
            <option>100</option>
          </select>
          <p className="p-pagination"> Records</p>
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
            <p className="path">
              <img src={back} width="9px" />
            </p>
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
              <img src={next} width="9px" />
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
