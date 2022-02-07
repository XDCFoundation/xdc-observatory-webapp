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
import Loader from "../../assets/loader";
import utility from "../../utility";
import { Tooltip } from "@material-ui/core";
import format from "format-number";
import { messages } from "../../constants";
import PageSelector from "../common/pageSelector";
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
    max-width:95px;
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
      // height: "12.563rem",
    },
  },

  divider: {
    borderTop: "0px solid #bbb",
    width: "100%",
  },
  noData: {
    width: "auto",
    height: "19px",
    margin: "25px 15px 0 530px",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",

    color: "#c6cbcf",
  },
  alert: {
    margin: "110px 0 0 580px",
  },
  table: {
    marginBottom: "200px",
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [holders, setHolders] = useState([]);
  const [totalHolder, setTotalHolder] = useState({});
  const [visibleRowCount, setVisibleRowCount] = useState({});
  const [noData, setNoData] = useState(true);
  const { address } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const { tn } = useParams();

  const sortTable = (_sortKey) => {
    let _sortOrder = -1;
    if (sortKey && sortKey.includes(_sortKey)) {
      _sortOrder = sortOrder * -1;
    } else {
      setSortKey(_sortKey);
    }
    setSortOrder(_sortOrder);
    if (_sortKey === "percentage")
      _sortKey = "balance";
    let requestObj = {
      skip: 0,
      limit: rowsPerPage,
      address: address,
      sortKey: { [_sortKey]: _sortOrder }
    }
    listOfHolders(requestObj);
  }

  useEffect(() => {
    let values = { address: address, skip: 0, limit: 10 };
    listOfHolders(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sortTable("balance")
  }, []);
  const listOfHolders = async (values) => {
    if (!values.sortKey && sortKey && sortOrder)
      values.sortKey = { [sortKey]: sortOrder }
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
    setVisibleRowCount(tns?.data.length)
  };

  const handleChangePage = (action) => {
    let values = { address: address, limit: rowsPerPage };
    if (action === "first") {
      setPage(0);
      values.skip = 0;
    }
    if (action === "prev") {
      if (page - rowsPerPage >= 0) {
        let pageValue = page - rowsPerPage;
        setPage(pageValue);

        values.skip = pageValue;
      }
    }
    if (action === "next") {
      if (+rowsPerPage + +page < totalHolder) {
        let pageValue = +rowsPerPage + +page;
        setPage(pageValue);
        values.skip = pageValue;
      }
    }

    if (action === "last") {
      let pageValue = (Math.round(totalHolder / rowsPerPage)) * rowsPerPage;
      setPage(pageValue);
      values.skip = pageValue;
    }
    listOfHolders(values);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    let values = { address: address, skip: 0, limit: event.target.value };
    listOfHolders(values);
  };
  // function shorten(b, amountL = 10, amountR = 3, stars = 3) {
  //   return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
  //     b.length - 3,
  //     b.length
  //   )}`;
  // }

  const NoDataFoundContainer = styled.div`
    display: flex;
    flex-flow: column;
    height: 300px !important;
    justify-content: center;
    align-items: center;
    margin-top: 140px !important;
    gap: 10px;
    @media (min-width: 0px) and (max-width: 767px) {
      margin: 30px 0 !important;
      height: 70px !important;
    }
  `;
  let decimals = props?.contractData
    ? props?.contractData?.contractResponse?.decimals
    : "";

  return (
    <div>
      <Paper style={{ borderRadius: "14px" }} elevation={0}>
        {isLoading == true ? (
          <TableContainer className={classes.container} id="container-table-token-holders-tab">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }} colspan="5">
                    <div className="loader-transfer-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : noData == false ? (
          <TableContainer className={classes.container} id="container-table-token-holders-tab">
            <Table>
              <TableHead>
                <TableRow className="w-100">
                  <TableCell
                    style={{ border: "none" }}
                    className="w-10"
                    align="left"
                  >
                    <span className={"tableheaders table-headers"}>
                      Rank
                      <Tooltip placement="top" title={messages.HOLDER_RANK}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIconMarketData"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                  <TableCell
                    style={{ border: "none" }}
                    className="w-40"
                    align="left"
                  >
                    <span className={"tableheaders table-headers"} >
                      Address
                      <Tooltip placement="top" title={messages.WALLET_ADDRESS}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIconMarketData"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                  <TableCell
                    style={{ border: "none", paddingLeft: "17px" }}
                    className="w-20"
                    align="left"
                  >
                    <span className={"tableheaders table-headers"} >
                      Quantity
                      <Tooltip placement="top" title={messages.QUANTITY}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIconMarketData"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                  <TableCell
                    style={{ border: "none", paddingLeft: "17px" }}
                    className="w-21"
                    align="left"
                  >
                    <span className={"tableheaders table-headers"} >
                      Percentage
                      <Tooltip placement="top" title={messages.PERCENTAGE}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIconMarketData"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                  {/* <TableCell
                    style={{ border: "none", paddingLeft: "17px" }}
                    className="w-12"
                    align="left"
                  >
                    <span className={"tableheaders table-headers"}>Value</span>
                  </TableCell> */}
                </TableRow>
              </TableHead>
            </Table>
            <NoDataFoundContainer>
              <img
                src={require("../../../src/assets/images/XDC-Alert.svg")}
              ></img>
              <div className="not-found">No Holder Found</div>
            </NoDataFoundContainer>
          </TableContainer>
        ) : (
          <TableContainer className={classes.container} id="container-table-token-holders-tab">
            <Table>
              <TableHead>
                <TableRow className="w-100">
                  <TableCell
                    style={{ border: "none" }}
                    className="w-10 p-l-22"
                    align="left"
                  >
                    <span className={"tableheaders table-headers"}>
                      Rank
                      <Tooltip placement="top" title={messages.HOLDER_RANK}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIconMarketData"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                  <TableCell
                    style={{ border: "none", paddingLeft: "0" }}
                    className="w-10"
                    align="left"
                  >
                    <span className={"tableheaders table-headers cursor-pointer"} onClick={() => sortTable("address")}>
                      Address
                      <Tooltip placement="top" title={messages.WALLET_ADDRESS}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIconMarketData"
                        />
                      </Tooltip>
                      {sortKey && sortOrder && sortKey == "address" ? (sortOrder === -1 ? <img
                        alt="question-mark"
                        src="/images/see-more.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      /> :
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon rotate-180"
                        />) : ""}
                    </span>
                  </TableCell>
                  <TableCell
                    style={{ border: "none" }}
                    className="w-10 p-l-22"
                    align="left"
                  >
                    <span className={"tableheaders table-headers cursor-pointer"} onClick={() => sortTable("balance")}>
                      Quantity
                      <Tooltip placement="top" title={messages.QUANTITY}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIconMarketData"
                        />
                      </Tooltip>
                      {sortKey && sortOrder && sortKey == "balance" ? (sortOrder === -1 ? <img
                        alt="question-mark"
                        src="/images/see-more.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      /> :
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon rotate-180"
                        />) : ""}
                    </span>
                  </TableCell>
                  <TableCell
                    style={{ border: "none" }}
                    className="w-10 p-l-22"
                    align="left"
                  >
                    <span className={"tableheaders table-headers cursor-pointer"} onClick={() => sortTable("percentage")}>
                      Percentage
                      <Tooltip placement="top" title={messages.PERCENTAGE}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIconMarketData"
                        />
                      </Tooltip>
                      {sortKey && sortOrder && sortKey == "percentage" ? (sortOrder === -1 ? <img
                        alt="question-mark"
                        src="/images/see-more.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      /> :
                        <img
                          alt="question-mark"
                          src="/images/see-more.svg"
                          height={"14px"}
                          className="tooltipInfoIcon rotate-180"
                        />) : ""}
                    </span>
                  </TableCell>
                  {/* <TableCell
                    style={{ border: "none", paddingLeft: "17px" }}
                    className="w-12"
                    align="left"
                  >
                    <span className={"tableheaders table-headers"}>Value</span>
                  </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {holders?.data?.map((row, index) => {
                  let quantity = (
                    row[0]?.Quantity / Math.pow(10, decimals)
                  )?.toFixed(decimals);
                  let quantity1 =
                    row[0]?.Quantity / Math.pow(10, decimals) >= 1
                      ? format({})(
                        utility.convertToInternationalCurrencySystem(
                          row[0]?.Quantity / Math.pow(10, decimals)
                        )
                      )
                      : (row[0]?.Quantity / Math.pow(10, decimals))?.toFixed(
                        decimals
                      );
                  var quantity2 = quantity1.toString().split(".")[0];
                  var quantity3 = quantity1.toString().split(".")[1];
                  var regex = new RegExp("([0-9]+)|([a-zA-Z]+)", "g");
                  var splittedArray = quantity3?.match(regex);

                  var percentageValue = !row[0]?.Percentage
                    ? "0"
                    : row[0].Percentage.toFixed(8);
                  let percentageValue1 = percentageValue
                    .toString()
                    .split(".")[0];
                  let percentageValue2 = percentageValue
                    .toString()
                    .split(".")[1];
                  var quantity4 =
                    splittedArray && splittedArray.length
                      ? splittedArray[0]
                      : 0;
                  var text =
                    splittedArray && splittedArray.length
                      ? splittedArray[1]
                      : 0;
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell id="td" style={{ border: "none" }}>
                        <span className="tabledata table-data">
                          {row[0]?.Rank}
                        </span>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none", paddingLeft: "0" }}>
                        <a
                          style={{ color: "#2149b9", fontSize: 11 }}
                          href={"/holder-details/" + row[0]?.Address + "/" + tn}
                        >
                          <span className="tabledata table-data">
                            {row[0]?.Address}
                          </span>
                        </a>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        <Tooltip
                          placement="top"
                          title={format({})(
                            quantity >= 1 ? parseFloat(quantity) : quantity
                          )}
                        >
                          {quantity3 >= 0 || quantity3 == null ? (
                            <span className="tabledata table-data mar-lef-3">
                              {quantity2}
                            </span>
                          ) : (
                            <span className="tabledata table-data mar-lef-3">
                              {quantity2}
                              {"."}
                              <span style={{ color: "#9FA9BA" }}>
                                {quantity4}
                              </span>
                              {text}
                            </span>
                          )}
                        </Tooltip>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <span className="tabledata table-data mar-lef-3">
                        {percentageValue2 == null|| percentageValue2==0? (
                      <span>{format({})(percentageValue1)}%</span>
                    ) : (
                      <>
                          {percentageValue1}
                          {"."}
                          <span style={{ color: "#9FA9BA" }}>
                            {percentageValue2}
                          </span>
                          %
                          </>
                    )}
                        </span>
                      </TableCell>
                      <TableCell id="td" style={{ border: "none" }}>
                        {" "}
                        <span className="tabledata table-data mar-lef-3">
                          <a
                            href={`/holder-details/${row[0]?.Address}/${tn}?isAnalytics=true&tokenAddress=${address}`}
                          >
                            Analytics
                          </a>
                        </span>
                      </TableCell>
                      {/* <TableCell
                        id="td"
                        style={{ border: "none" }}
                        className="cursor-pointer"
                      >
                        <Tooltip
                          placement="top"
                          title={format({})(row[0]?.Value)}
                        >
                          <span className="tabledata table-data mar-lef-2">
                            {utility.convertToInternationalCurrencySystem(
                              row[0]?.Value
                            )}
                          </span>
                        </Tooltip>
                      </TableCell> */}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Pagination>
        <LeftPagination>
          {(!isLoading && noData == false) || totalHolder<10?  (
""
          ) : (
<>
              <p className="p-pagination">Show</p>
              <PageSelector
                value={rowsPerPage}
                height={35}
                handler={handleChangeRowsPerPage}
              />
              <p className="p-pagination"> Records</p>
            </>
          )}
        </LeftPagination>
        {(noData == true && totalHolder > rowsPerPage) ? (
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
                <img className="rotate-180" alt="back" src={"/images/next.svg"} width="9px" />
              </p>
            </div>
            <div className="pagebox">
              <p className="Page-1-of-5">
                Page{" "}
                {Math.round(totalHolder / rowsPerPage) -
                  Math.round((totalHolder - page) / rowsPerPage)}{" "}
                of {Math.round(totalHolder / rowsPerPage)}
              </p>
            </div>
            <div
              className={
                page + visibleRowCount === totalHolder
                  ? "nextbox disabled"
                  : "nextbox"
              }
            >
              <p className="path-2" onClick={() => handleChangePage("next")}>
                <img alt="next" src={"/images/next.svg"} width="9px" />
              </p>
            </div>
            <div
              className={
                page + visibleRowCount === totalHolder
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
        ) : ""}
      </Pagination>
    </div>
  );
}
