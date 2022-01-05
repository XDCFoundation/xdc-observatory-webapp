import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tokensearchbar from "../explorer/tokensearchBar";
import "../../assets/styles/custom.css";
import FooterComponent from "../common/footerComponent";
import Utility from "../../utility";
import TokenData from "../../services/token";
import styled from "styled-components";
import Loader from "../../assets/loader";
import utility from "../../utility";
import ConfigureColumnPopOver from "../common/configureColumnsPopOver";
import { Column, Row } from "simple-flexbox";
import ConfigureColumnsModal from "../common/configureColumnsModal";
import format from "format-number";
import Tooltip from "@material-ui/core/Tooltip";
import { messages } from "../../constants"

import { useParams } from "react-router-dom";
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 75.125rem;
  margin: 1.25rem auto;

  @media (min-width: 0px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    width: 22.563rem;
    margin: 0 auto;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 41.5rem;
    margin: 0 auto;
  }
`;
const RightPagination = styled.div`
  display: flex;
  margin-top: 1.75rem;
  flex-direction: row;

  @media (min-width: 768px) and (max-width: 1240px) {
    margin-right: 0%;
  }
`;
const LeftPagination = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.75rem;

  @media (min-width: 768px) and (max-width: 1240px) {
    margin-right: 5%;
  }
`;
// function capitalize(text) {
//   return text.charAt(0).toUpperCase() + text.slice(1);
// }

const useStyles = makeStyles({
  rootui: {
    borderRadius: "0.875rem",
    marginLeft: "18%",
    marginRight: "18%",
  },
  container: {
    borderRadius: "0.875rem",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  tableFirstHeading: {
    border: "none",
    paddingLeft: "75px !important"
  },
  tableFirstData: {
    paddingLeft: "75px !important"
  },
  divider: {
    borderTop: "0rem solid #bbb",
    width: "100%",
  },

  "@media (max-width: 1024px)": {
    container: {
      height: 615,
    },
  },

  "@media (max-width: 1240px)": {
    tableFirstHeading: {
      paddingLeft: "32px !important"
    },
    tableFirstData: {
      paddingLeft: "32px !important"
    },
  }
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [from, setFrom] = React.useState(0);
  const [amount, setAmount] = React.useState(10);
  const [isLoading, setLoading] = React.useState(true);
  const [totalToken, setTotalToken] = React.useState(0);
  const [keywords, setKeywords] = React.useState("");
  const [rows, setRows] = React.useState([]);
  let { token } = useParams();

  const [noData, setNoData] = React.useState(true);
  const handleChangePage = (action) => {
    if (action === "first") {
      setFrom(0);
      if (keywords) {
        let data = { pageNum: 0, perpage: amount, searchkey: keywords };
        SearchTokens(data);
      } else {
        setNoData(false);
        let data = { pageNum: 0, perpage: amount };
        getTokenList(data);
        getTotalTokenList();
      }
    }
    if (action === "prev") {
      if (from - amount >= 0) {
        let page = from - amount;
        setFrom(page);
        if (keywords) {
          let data = { pageNum: page, perpage: amount, searchkey: keywords };
          SearchTokens(data);
        } else {
          setNoData(false);
          let data = { pageNum: page, perpage: amount };
          getTokenList(data);
          getTotalTokenList();
        }
      }
    }
    if (action === "next") {
      if (+amount + +from < totalToken) {
        let page = +amount + +from;
        setFrom(page);
        if (keywords) {
          let data = { pageNum: page, perpage: amount, searchkey: keywords };
          SearchTokens(data);
        } else {
          setNoData(false);
          let data = { pageNum: page, perpage: amount };
          getTokenList(data);
          getTotalTokenList();
        }
      }
    }

    if (action === "last") {
      let page = totalToken - amount;
      setFrom(page);

      if (keywords) {
        let data = { pageNum: page, perpage: amount, searchkey: keywords };
        SearchTokens(data);
      } else {
        setNoData(false);
        let data = { pageNum: page, perpage: amount };
        getTokenList(data);
        getTotalTokenList();
      }
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setAmount(event.target.value);
    setFrom(0);
    if (keywords) {
      let data = {
        pageNum: 0,
        perpage: event.target.value,
        searchkey: keywords,
      };
      SearchTokens(data);
    } else {
      setNoData(false);
      let data = { pageNum: 0, perpage: event.target.value };
      getTokenList(data);
      getTotalTokenList();
    }
  };
  const handleSearchKeyUp = (event) => {
    let searchkeyword = event?.target?.value;

    if (searchkeyword?.length > 2) {
      setKeywords(searchkeyword);
      setLoading(false);
      let data = { pageNum: 0, perpage: amount, searchkey: searchkeyword };
      SearchTokens(data);
    }
    if (searchkeyword?.length === 0) {
      setKeywords("");
      setLoading(false);
      setNoData(false);
      let data = { pageNum: from, perpage: amount };
      getTokenList(data);
      getTotalTokenList();
    }
  };
  const getTokenList = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        TokenData.getTokenLists(data)
      );
      if (error) return;
      if (responseData) {
        setNoData(false);
        setLoading(false);
        setRows(responseData);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getTotalTokenList = async () => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        TokenData.getTotalToken()
      );
      if (error) return;
      if (responseData) {
        setNoData(false);
        setTotalToken(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const SearchTokens = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        TokenData.getTokenSearch(data)
      );
      if (error) return;
      if (responseData.total === 0) {
        setNoData(true);
        setTotalToken(0);
        setRows([]);
      }

      if (responseData.total > 0) {
        setNoData(false);
        setTotalToken(responseData.total);
        setLoading(false);
        setRows(responseData.resultSet);
        //alert(responseData.length)
      }
    } catch (error) {
      console.error(error);
    }
  };

  let [anchorEl, setAnchorEl] = React.useState();
  let [isColumnsModalOpen, setColumnsModal] = React.useState(false);
  let isSettingColumnOpen = Boolean(anchorEl);

  function handleSettingsClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function toggleModal() {
    setColumnsModal(!isColumnsModalOpen);
  }

  function handleOnClose() {
    setAnchorEl(null);
  }

  React.useEffect(() => {
    let unmounted = false;
    if (token) {
      let datas = { pageNum: 0, perpage: amount, searchkey: token };
      SearchTokens(datas)
    } else {

      let data = { pageNum: from, perpage: amount };
      getTokenList(data);
      getTotalTokenList();
    }
    return () => {
      unmounted = true;
    };
  }, []);
  function shorten(b, amountL = 10, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - amountR,
      b.length
    )}`;
  }

  const TokenTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    @media (max-width: 1250px) {
      font-size: 16px;
    }
  `;

  const NoDataFoundContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    gap: 10px;
    @media (min-width: 767px) {
      margin: 100px 0 !important;
    }
  `;

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Tokensearchbar />
      <form
        method="post"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <Column
          className={
            "responsive-table-width-token-list token-list-tab_11 search-container"
          }
        >
          <Row justifyContent="space-between" alignItems="center">
            <TokenTitle>Tokens</TokenTitle>
            <div className="display-none-mobile display-flex flex-direction-column w-100 margin-0 justify-content-end align-items-end">
              <img
                onClick={handleSettingsClick}
                className="p-r-5 h-20 w-20-px"
                src="/images/settings.svg"
              />
              <ConfigureColumnPopOver
                isOpen={isSettingColumnOpen}
                anchorEl={anchorEl}
                handleOnClose={handleOnClose}
                tableColumns={props.state.tableColumns}
                toggleTableColumns={props.toggleTableColumns}
              />
            </div>
            <div className="display-none-tab display-none-desktop display-flex flex-direction-column justify-content-center">
              <img
                onClick={toggleModal}
                className="p-r-5 h-20 w-20-px"
                src="/images/settings.svg"
              />
              <ConfigureColumnsModal
                isOpen={isColumnsModalOpen}
                onModalClose={toggleModal}
                tableColumns={props.state.tableColumns}
                toggleTableColumns={props.toggleTableColumns}
              />
            </div>
          </Row>
          <div className="searchelement-input input-searchelement_11 margin-top-15px">
            <img
              style={{
                width: 20,
                height: 20,
                marginRight: 6,
                marginTop: 3,
              }}
              src={"/images/Search.svg"}
            />

            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchKeyUp(e);
                }
              }}
              onChange={(e) => {
                if (e.target.value == "") {
                  handleSearchKeyUp(e);
                }
              }}
              className="account-searchbar"
              type="text"
              placeholder="Search Tokens"
            />
          </div>
        </Column>
      </form>
      {/* </div> */}
      {/* </div> */}

      <br />
    
      <Paper
        className={"responsive-table-width-token-list token-list-tab_11"}
        style={{
          borderRadius: "0.875rem",
          // marginLeft: "18%",
          // marginRight: "18%",
        }}
        elevation={0}
      >
        <TableContainer
          className={classes.container}
          id="container-table-token"
          style={{
            borderRadius: "0.75rem",
            border: "solid 0.063rem #e3e7eb",
            backgroundColor: "#ffffff",
            boxShadow: "0 0.063rem 0.625rem 0 rgba(0 0, 0, 0.,1)",
          }}
        >
          <Table style={{ borderBottom: "none" }}>
            <TableHead style={{ borderBottom: "0.063rem solid #e5e8f0" }}>
              <TableRow>
                <TableCell
                  style={{ border: "none", paddingLeft: "75px"}}
                  align="left"
                >
                  <span style={{display:"flex"}}>
                    #
                    <Tooltip placement="top" title={messages.SI_NO}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        className="tooltipLatestTransactionTableDashboard"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                {props?.state?.tableColumns["Symbol"].isActive && (
                  <TableCell style={{ border: "none" }} align="left">
                    <span className={"tablehead-token-details"}>
                      Symbol
                      <Tooltip placement="top" title={messages.SYMBOL}>
                        <img
                          alt="question-mark"
                          src="/images/question-mark.svg"
                          height={"14px"}
                          className="tooltipLatestTransactionTableDashboard"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                )}
                <TableCell style={{ border: "none" }} align="left">
                  <span className={"tablehead-token-details"}>
                    Name
                    <Tooltip placement="top" title={messages.NAME}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        className="tooltipLatestTransactionTableDashboard"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                {props?.state?.tableColumns["Type"].isActive && (
                  <TableCell style={{ border: "none", whiteSpace: "nowrap" }}
                    align="left">
                    <span className={"tablehead-token-details"}>
                      Type
                      <Tooltip placement="top" title={messages.TOKEN_TYPE}>
                        <img
                          alt="question-mark"
                          src="/images/question-mark.svg"
                          height={"14px"}
                          className="tooltipLatestTransactionTableDashboard"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                )}
                {props?.state?.tableColumns["Hash"].isActive && (
                  <TableCell style={{ border: "none" }} align="left">
                    <span className={"tablehead-token-details"}>
                      Contract
                      <Tooltip placement="top" title={messages.CONTRACT}>
                        <img
                          alt="question-mark"
                          src="/images/question-mark.svg"
                          height={"14px"}
                          className="tooltipLatestTransactionTableDashboard"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                )}

                <TableCell
                  style={{ border: "none", whiteSpace: "nowrap" }}
                  align="left"
                >
                  <span className={"tablehead-token-details"}>
                    Total Supply
                    <Tooltip placement="top" title={messages.TOKEN_TOTAL_SUPPLY}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        className="tooltipLatestTransactionTableDashboard"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                {props?.state?.tableColumns["Total Holders"].isActive && (
                  <TableCell
                    style={{ border: "none", whiteSpace: "nowrap" }}
                    align="left"
                  >
                    <span className={"tablehead-token-details"}>
                      Total Holders
                      <Tooltip placement="top" title={messages.HOLDER}>
                        <img
                          alt="question-mark"
                          src="/images/question-mark.svg"
                          height={"14px"}
                          className="tooltipLatestTransactionTableDashboard"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            {isLoading == true ? (
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }} colspan="8">
                    <div className="loader-token-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              noData == false && (
                <TableBody>
                  {rows?.map((row, index) => {
                    let totalsupply = utility.divideByDecimalValue(row?.totalSupply, row?.decimals)
                    const supply = utility.divideByDecimalValue(row?.totalSupply, row?.decimals) >= 1 ? format({})(utility.convertToInternationalCurrencySystem(utility.divideByDecimalValue(row?.totalSupply, row?.decimals))) : (utility.divideByDecimalValue(row?.totalSupply, row?.decimals))
                    var supply1 = supply.toString().split(".")[0];
                    var supply2 = supply.toString().split(".")[1];
                    var regex = new RegExp("([0-9]+)|([a-zA-Z]+)", "g");
                    var splittedArray = supply2?.match(regex);

                    var supply4 = splittedArray && splittedArray.length ? splittedArray[0] : 0;
                    var text = splittedArray && splittedArray.length ? splittedArray[1] : 0;
                    let tokenName = row?.tokenName?.length <= 15 || row?.tokenName?.length == 0 ? row?.tokenName : shorten(row?.tokenName, 15, 0, 3)
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell style={{ paddingLeft: "75px" }} id="td">
                          {index + 1}
                        </TableCell>

                        {props?.state?.tableColumns["Symbol"].isActive && (
                          <TableCell id="td">
                            <img
                              style={{ height: "24", width: "24" }}
                              src={"/images/XRC20-Icon.svg"}
                            ></img>
                            &nbsp;{row.symbol}
                          </TableCell>
                        )}

                        <TableCell id="td" style={{ whiteSpace: "nowrap" }}>
                          {tokenName}
                        </TableCell>
                        {props?.state?.tableColumns["Type"].isActive && (
                          <TableCell id="td">{row.type}</TableCell>
                        )}
                        {props?.state?.tableColumns["Hash"].isActive && (
                          <TableCell>
                            <a
                              className="token-details-address-link"
                              href={`/token-data/${row.address}/${row?.symbol ? row?.symbol : "NA"
                                }`}
                            >
                              {shorten(row.address)}
                            </a>
                          </TableCell>
                        )}


                        <TableCell id="td" style={{ paddingleft: "15" }}>
                          <Tooltip
                            placement="top"
                            title={format({})(totalsupply >= 1 ? parseFloat(totalsupply) : totalsupply == 0 ? parseFloat(totalsupply) : totalsupply)}
                          ><span>
                              {supply4 === 0 || supply4 == null ? (
                                <span className="tabledata">{supply1}</span>
                              ) : (
                                <span className="tabledata">
                                  {supply1}
                                  {"."}
                                  <span style={{ color: "#9FA9BA" }}>
                                    {supply4}
                                  </span>
                                  {text}
                                </span>
                              )}

                            </span>
                          </Tooltip>
                        </TableCell>
                        {props?.state?.tableColumns["Total Holders"]
                          .isActive && (
                            <TableCell id="td" style={{ paddingleft: "15" }}>
                              {format({})(row.tokenHolders)}
                            </TableCell>
                          )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              )
            )}
            {/* {noData == true && (
              <TableBody>
                <TableCell id="td" style={{ borderBottom: "none" }}>
                  <span
                    style={{ textAlign: "center", color: "#2a2a2a" }}
                    className="tabledata"
                  >
                    No data found.
                  </span>
                </TableCell>
              </TableBody>
            )} */}
          </Table>
          {noData == true && !isLoading ? (
            <NoDataFoundContainer>
              <img
                src={require("../../../src/assets/images/XDC-Alert.svg")}
              ></img>

              <div style={{ color: "#c6cbcf" }}>No Tokens found</div>
            </NoDataFoundContainer>
          ) : ("")}
        </TableContainer>

        {/* <Divider className={classes.divider}/>*/}
      </Paper>

      <Pagination>
        <LeftPagination>
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
          >
            Show
          </p>

          <select
            value={amount}
            className="selectbox-contract"
            onChange={(event) => handleChangeRowsPerPage(event)}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
          >
            {" "}
            Records
          </p>
        </LeftPagination>

        <RightPagination>
          <div
            className={
              from === 0 ? "firstbox-contract disabled" : "firstbox-contract"
            }
            onClick={() => handleChangePage("first")}
          >
            <button
              style={{ backgroundColor: "white" }}
              className="first-contract"
            >
              First
            </button>
          </div>
          <div
            className={
              from === 0
                ? "previousbox-contract disabled"
                : "previousbox-contract"
            }
            onClick={() => handleChangePage("prev")}
          >
            <img className="navigation-arrow" src={"/images/back.svg"} />

            {/* <p className="path-contract">{"<"}</p> */}
          </div>
          <div className="pagebox-contract">
            <p className="Page-1-of-5-contract">
              Page{" "}
              {Math.ceil(totalToken / amount) -
                Math.ceil((totalToken - from) / amount) +
                1}{" "}
              of {Math.ceil(totalToken / amount)}
            </p>
          </div>
          <div
            className={
              from + amount === totalToken
                ? "nextbox-contract disabled"
                : "nextbox-contract"
            }
            onClick={() => handleChangePage("next")}
          >
            <img className="navigation-arrow" src={"/images/next.svg"} />
          </div>
          <div
            className={
              from + amount === totalToken
                ? "lastbox-contract disabled"
                : "lastbox-contract"
            }
            onClick={() => handleChangePage("last")}
          >
            <button
              style={{ backgroundColor: "white" }}
              className="last-contract"
            >
              Last
            </button>
          </div>
        </RightPagination>
      </Pagination>
      <FooterComponent />
    </div>
  );
}
