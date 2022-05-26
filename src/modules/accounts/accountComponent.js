import React from "react";
import "../../../src/assets/styles/blocksAndTransactionList.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Grid, TableContainer } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../assets/loader";
import utility from "../../utility";
import format from "format-number";
import ConfigureColumnPopOver from "../common/configureColumnsPopOver";
import ConfigureColumnsModal from "../common/configureColumnsModal";
import Utils from "../../utility";
import styled from "styled-components";
import { messages } from "../../constants";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import PageSelector from "../common/pageSelector";
import SearchAndFiltersComponent from "./searchAndFiltersComponent";
import { useEffect } from "react";

const useStyles = makeStyles({
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2a2a2a",
    fontFamily: "Inter !important",
  },
  container: {
    borderRadius: "0.875rem",
    boxShadow: "0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
    minHeight: "500px",
  },
  containerDark: {
    borderRadius: "0.875rem",
    boxShadow: "0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#192a59",
    minHeight: "500px",
  },
  RankColumn: {
    border: "none !important",
    borderBottom: "none !important",
    paddingLeft: "72px !important",
    "@media (min-width: 768px) and (max-width: 1240px)": {
      border: "none !important",
      borderBottom: "none !important",
      paddingLeft: "3% !important",
    },
  },

  RankColumnVal: {
    border: "none !important",
    borderBottom: "none !important",
    paddingLeft: "5.7% !important",
    "@media (max-width: 767px)": {
      RankColumnVal: {
        border: "none !important",
        borderBottom: "none !important",
        paddingLeft: "2% !important",
      },
    },
  },
  "@media (min-width: 768px) and (max-width: 1240px)": {
    RankColumnVal: {
      border: "none !important",
      borderBottom: "none !important",
      paddingLeft: "3.2% !important",
    },
  },
  PercentageColumn: {
    border: "none !important",
    borderBottom: "none !important",
    paddingLeft: "0% !important",
  },
  PercentageColumnVal: {
    border: "none !important",
    borderBottom: "none !important",
    paddingLeft: "0% !important",
  },
  btn: {
    textAlign: "start",
    padding: "0px",
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
  },
  sortButton: {
    color: "#3763dd",
    height: "20px",
    width: "15px",
    marginLeft: "5px",
  },
  "@media (max-width: 767px)": {
    headingContainer: {
      paddingTop: "15px",
      paddingBottom: "15px",
    },
    heading: {
      fontSize: "16px",
      fontWeight: "600",
    },
  },
  "@media (max-width: 1024px)": {
    container: {
      height: 600,
    },
    containerDark: {
      height: 600,
    },
  },
  customTooltip: {
    fontSize: "13px",
  },
  customTooltipDarkMode: {
    background: "#051440",
    color: "#adc4e4",
    fontSize: "13px",
  },
});

const NoDataFoundContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
  gap: 10px;
  @media (min-width: 767px) {
    margin: 100px !important;
  }
`;
export default function AccountComponent(props) {
  let [anchorEl, setAnchorEl] = React.useState();
  let [isColumnsModalOpen, setColumnsModal] = React.useState(false);
  let isSettingColumnOpen = Boolean(anchorEl);

  const [rankTT, setRankTT] = React.useState(false);
  const [addressTT, setaddressTT] = React.useState(false);
  const [typeTT, settypeTT] = React.useState(false);
  const [balanceTT, setbalanceTT] = React.useState(false);
  const [percentageTT, setpercentageTT] = React.useState(false);

  function handleSettingsClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function toggleModal() {
    setColumnsModal(!isColumnsModalOpen);
  }

  function handleOnClose() {
    setAnchorEl(null);
  }

  function shortenBalance(b, amountL = 12, amountR = 3, stars = 0) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(b.length - 3)}`;
  }
  useEffect(() => {
    props.sortData("balance");
  }, []);

  const { state } = props;
  const classes = useStyles();
  let rantValue = state.from;

  return (
    <div className={props.theme === "dark" ? "dark-theme-bg" : ""}>
      <Tokensearchbar theme={props.theme} />
      <div className="responsive-table-width-contract-list contact-list-tab ">
        <div className={classes.headingContainer}>
          <div
            className={
              props.theme === "dark"
                ? `${classes.heading} fc-white`
                : classes.heading
            }
          >
            {state.tableName}
          </div>
          <div className=" display-none-mobile display-flex flex-direction-column justify-content-center">
            <img
              onClick={handleSettingsClick}
              className="p-r-5 h-20 w-20-px cursor-pointer"
              src="/images/settings.svg"
              style={{ width: "25px" }}
            />
            <ConfigureColumnPopOver
              isOpen={isSettingColumnOpen}
              anchorEl={anchorEl}
              handleOnClose={handleOnClose}
              tableColumns={props.state.tableColumns}
              toggleTableColumns={props.toggleTableColumns}
              theme={props.theme}
            />
          </div>
          <div className=" display-none-tab display-none-desktop display-flex flex-direction-column justify-content-center">
            <img
              onClick={toggleModal}
              className="p-r-5 h-20 w-20-px cursor-pointer"
              src="/images/settings.svg"
              style={{ width: "25px" }}
            />
            <ConfigureColumnsModal
              isOpen={isColumnsModalOpen}
              onModalClose={toggleModal}
              tableColumns={props.state.tableColumns}
              toggleTableColumns={props.toggleTableColumns}
              theme={props.theme}
            />
          </div>
        </div>
        <SearchAndFiltersComponent
          searchAndFilters={props.state.searchAndFilters}
          updateFiltersAndGetAccounts={props.updateFiltersAndGetAccounts}
          getListOfAccounts={props.getListOfAccounts}
          theme={props.theme}
        />
        <div style={{ borderRadius: "0.875rem" }} elevation={0}>
          <TableContainer
            className={
              props.theme === "dark" ? classes.containerDark : classes.container
            }
            id="container-table"
          >
            <Table>
              <TableHead>
                <TableRow>
                  {props.state.tableColumns["Rank"].isActive && (
                    <TableCell className={classes.RankColumn} align="center">
                      <span
                        className={
                          props.theme === "dark"
                            ? "tableheaders_1 fc-white p-l-8-md"
                            : "tableheaders_1 p-l-8-md"
                        }
                      >
                        Rank
                        {window.innerWidth > 1024 ? (
                          <Tooltip
                            placement="top"
                            title={messages.RANK}
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          >
                            <img
                              alt="question-mark"
                              src="/images/info.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            open={rankTT}
                            onOpen={() => setRankTT(true)}
                            onClose={() => setRankTT(false)}
                            placement="top"
                            title={messages.RANK}
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          >
                            <img
                              onClick={() => setRankTT(!rankTT)}
                              alt="question-mark"
                              src="/images/info.svg"
                              className="tooltipInfoIconAccount"
                            />
                          </Tooltip>
                        )}
                      </span>
                    </TableCell>
                  )}
                  <TableCell
                    style={{ border: "none", paddingLeft: "2.2%" }}
                    align="center !important"
                    onClick={() => {
                      props.sortData("address");
                    }}
                  >
                    <span
                      className={
                        props.theme === "dark"
                          ? "tableheaders_1_address cursor-pointer fc-white"
                          : "tableheaders_1_address cursor-pointer"
                      }
                    >
                      Address
                      {window.innerWidth > 1024 ? (
                        <Tooltip
                          placement="top"
                          title={messages.ACCOUNT_ADDRESS}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            alt="question-mark"
                            src="/images/info.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          open={addressTT}
                          onOpen={() => setaddressTT(true)}
                          onClose={() => setaddressTT(false)}
                          placement="top"
                          title={messages.ACCOUNT_ADDRESS}
                          classes={{
                            tooltip:
                              props.theme === "dark"
                                ? classes.customTooltipDarkMode
                                : classes.customTooltip,
                          }}
                        >
                          <img
                            onClick={() => setaddressTT(!addressTT)}
                            alt="question-mark"
                            src="/images/info.svg"
                            className="tooltipInfoIconAccount"
                          />
                        </Tooltip>
                      )}
                    </span>
                    <Tooltip
                      placement="top"
                      title={props.getSortTitle(props?.state?.sortOrder)}
                      classes={{
                        tooltip:
                          props.theme === "dark"
                            ? classes.customTooltipDarkMode
                            : classes.customTooltip,
                      }}
                    >
                      {props?.state?.sortKey == "address" ? (
                        props?.state?.sortOrder === 1 ? (
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon rotate-180"
                          />
                        ) : (
                          <img
                            alt="question-mark"
                            src="/images/see-more.svg"
                            height={"14px"}
                            className="tooltipInfoIcon"
                          />
                        )
                      ) : (
                        <span></span>
                      )}
                    </Tooltip>
                  </TableCell>
                  {props.state.tableColumns["Type"].isActive && (
                    <TableCell
                      style={{ border: "none", paddingLeft: "5.4%" }}
                      align="center"
                    >
                      <span
                        className={
                          props.theme === "dark"
                            ? "tableheaders_1 fc-white p-l-8-md"
                            : "tableheaders_1 p-l-8-md"
                        }
                      >
                        Type
                        {window.innerWidth > 1024 ? (
                          <Tooltip
                            placement="top"
                            title={messages.ACCOUNT_TYPE}
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          >
                            <img
                              alt="question-mark"
                              src="/images/info.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            open={typeTT}
                            onOpen={() => settypeTT(true)}
                            onClose={() => settypeTT(false)}
                            placement="top"
                            title={messages.ACCOUNT_TYPE}
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          >
                            <img
                              onClick={() => settypeTT(!typeTT)}
                              alt="question-mark"
                              src="/images/info.svg"
                              className="tooltipInfoIconAccount"
                            />
                          </Tooltip>
                        )}
                      </span>
                    </TableCell>
                  )}
                  {props.state.tableColumns["Balance"].isActive && (
                    <TableCell
                      style={{
                        border: "none",
                        paddingRight: "60px",
                      }}
                      align="center"
                      onClick={() => {
                        props.sortData("balance");
                      }}
                    >
                      <span
                        className={
                          props.theme === "dark"
                            ? "tableheaders_1 fc-white p-l-8-md"
                            : "tableheaders_1 p-l-8-md"
                        }
                      >
                        Balance
                        {window.innerWidth > 1024 ? (
                          <Tooltip
                            placement="top"
                            title={messages.ACCOUNT_BALANCE}
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          >
                            <img
                              alt="question-mark"
                              src="/images/info.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            open={balanceTT}
                            onOpen={() => setbalanceTT(true)}
                            onClose={() => setbalanceTT(false)}
                            placement="top"
                            title={messages.ACCOUNT_BALANCE}
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          >
                            <img
                              onClick={() => setbalanceTT(!balanceTT)}
                              alt="question-mark"
                              src="/images/info.svg"
                              className="tooltipInfoIconAccount"
                            />
                          </Tooltip>
                        )}
                      </span>
                      <Tooltip
                        placement="top"
                        title={props.getSortTitle(props?.state?.sortOrder)}
                        classes={{
                          tooltip:
                            props.theme === "dark"
                              ? classes.customTooltipDarkMode
                              : classes.customTooltip,
                        }}
                      >
                        {props?.state?.sortKey == "balance" ? (
                          props?.state?.sortOrder === 1 ? (
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon rotate-180"
                            />
                          ) : (
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          )
                        ) : (
                          <span></span>
                        )}
                      </Tooltip>
                    </TableCell>
                  )}

                  {props.state.tableColumns["Percentage"].isActive && (
                    <TableCell
                      className={classes.PercentageColumn}
                      align="center"
                      onClick={() => {
                        props.sortData("percentage");
                      }}
                    >
                      <span
                        className={
                          props.theme === "dark"
                            ? "tableheaders_1 fc-white p-l-8-md"
                            : "tableheaders_1 p-l-8-md"
                        }
                      >
                        Percentage
                        {window.innerWidth > 1024 ? (
                          <Tooltip
                            placement="top"
                            title={messages.PERCENTAGE}
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          >
                            <img
                              alt="question-mark"
                              src="/images/info.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            open={percentageTT}
                            onOpen={() => setpercentageTT(true)}
                            onClose={() => setpercentageTT(false)}
                            placement="top"
                            title={messages.PERCENTAGE}
                            classes={{
                              tooltip:
                                props.theme === "dark"
                                  ? classes.customTooltipDarkMode
                                  : classes.customTooltip,
                            }}
                          >
                            <img
                              onClick={() => setpercentageTT(!percentageTT)}
                              alt="question-mark"
                              src="/images/info.svg"
                              className="tooltipInfoIconAccount"
                            />
                          </Tooltip>
                        )}
                      </span>
                      <Tooltip
                        placement="top"
                        title={props.getSortTitle(props?.state?.sortOrder)}
                        classes={{
                          tooltip:
                            props.theme === "dark"
                              ? classes.customTooltipDarkMode
                              : classes.customTooltip,
                        }}
                      >
                        {props?.state?.sortKey == "percentage" ? (
                          props?.state?.sortOrder === 1 ? (
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon rotate-180"
                            />
                          ) : (
                            <img
                              alt="question-mark"
                              src="/images/see-more.svg"
                              height={"14px"}
                              className="tooltipInfoIcon"
                            />
                          )
                        ) : (
                          <span></span>
                        )}
                      </Tooltip>
                    </TableCell>
                  )}
                  {/* <TableCell style={{ border: "none", paddingLeft: "4.4%" }} align="left"><span className={"tableheaders_1 percentage-table-accounts"}>Percentage</span></TableCell> */}
                </TableRow>
              </TableHead>
              {props.state.isLoading == true ? (
                <TableBody>
                  <TableRow>
                    <TableCell style={{ border: "none" }} colspan="6">
                      <div className="loader-block-list">
                        <Loader />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                props.state.noData == 1 && (
                  <TableBody>
                    {props.state.accountList &&
                      props.state.accountList.length >= 1 &&
                      props.state.accountList.map((row, index) => {
                        let finalBal = Utils.decimalDivisonOnly(row.balance, 8);
                        let bal = finalBal.toString();
                        var bal1 =
                          utility.convertToInternationalCurrencySystem(bal);
                        var bal2 = bal1.toString().split(".")[0];
                        var bal3 = bal1.toString().split(".")[1];
                        var regex = new RegExp("([0-9]+)|([a-zA-Z]+)", "g");
                        var splittedArray = bal3?.match(regex);

                        var bal4 =
                          splittedArray && splittedArray.length
                            ? splittedArray[0]
                            : 0;
                        var text =
                          splittedArray && splittedArray.length
                            ? splittedArray[1]
                            : 0;

                        rantValue = rantValue + 1;
                        let percentageValue =
                          state.totalSupply && state.totalSupply > 0
                            ? ((finalBal / state.totalSupply) * 100).toFixed(8)
                            : 0;

                        let percentageValue1 = percentageValue
                          .toString()
                          .split(".")[0];
                        let percentageValue2 = percentageValue
                          .toString()
                          .split(".")[1];

                        //state.totalSupply

                        return (
                          <TableRow
                            key={row.name}
                            style={
                              index % 2 !== 1
                                ? props.theme === "dark"
                                  ? { background: "#192a59" }
                                  : { background: "#f9f9f9" }
                                : props.theme === "dark"
                                ? { background: "#192a59" }
                                : { background: "white" }
                            }
                          >
                            {props.state.tableColumns["Rank"].isActive && (
                              <TableCell
                                className={
                                  props.theme === "dark"
                                    ? `${classes.RankColumnVal} fc-b1c3e1`
                                    : ` ${classes.RankColumnVal}`
                                }
                                align="center"
                              >
                                <span className="tabledata">{rantValue}</span>
                              </TableCell>
                            )}
                            <TableCell
                              className="w-1"
                              style={{
                                border: "none",
                                paddingLeft: "25.5px",
                                width: "",
                              }}
                            >
                              <a
                                className={
                                  props.theme === "dark"
                                    ? "linkTable fc-4878ff"
                                    : "linkTable"
                                }
                                href={"/address-details/" + row.address}
                              >
                                <span className="tabledata">{row.address}</span>
                              </a>
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.number, "height")}><span className="tabledata">{row.number}</span></a></TableCell> */}
                            {props.state.tableColumns["Type"].isActive && (
                              <TableCell
                                className="w-2"
                                style={{ border: "none", paddingLeft: "5%" }}
                                align="center"
                              >
                                <span
                                  className={
                                    props.theme === "dark"
                                      ? "tabledata fc-b1c3e1"
                                      : "tabledata"
                                  }
                                >
                                  {row.accountType == 0
                                    ? "Account"
                                    : "Contract"}
                                </span>
                              </TableCell>
                            )}
                            {props.state.tableColumns["Balance"].isActive && (
                              <TableCell
                                className="w-3"
                                style={{
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                align="center"
                              >
                                <Tooltip
                                  placement="right"
                                  title={format({})(finalBal)}
                                  classes={{
                                    tooltip:
                                      props.theme === "dark"
                                        ? classes.customTooltipDarkMode
                                        : classes.customTooltip,
                                  }}
                                >
                                  {bal3 >= 0 || bal3 == null ? (
                                    <span
                                      className={
                                        props.theme === "dark"
                                          ? "tabledata fc-b1c3e1"
                                          : "tabledata"
                                      }
                                    >
                                      {bal2}
                                    </span>
                                  ) : (
                                    <span
                                      className={
                                        props.theme === "dark"
                                          ? "tabledata fc-b1c3e1"
                                          : "tabledata"
                                      }
                                    >
                                      {bal2}
                                      {"."}
                                      <span style={{ color: "#9FA9BA" }}>
                                        {bal4}
                                      </span>
                                      {text}
                                    </span>
                                  )}
                                </Tooltip>
                              </TableCell>
                            )}
                            {props.state.tableColumns["Percentage"]
                              .isActive && (
                              <TableCell
                                className={`w-2 ${classes.PercentageColumnVal}`}
                                align="center"
                              >
                                <span
                                  className={
                                    props.theme === "dark"
                                      ? "tabledata fc-b1c3e1"
                                      : "tabledata"
                                  }
                                >
                                  {!percentageValue2 ? (
                                    <span>{percentageValue1}%</span>
                                  ) : (
                                    <span>
                                      {percentageValue1}
                                      {"."}
                                      <span style={{ color: "#9FA9BA" }}>
                                        {percentageValue2}
                                      </span>
                                      %
                                    </span>
                                  )}
                                </span>
                              </TableCell>
                            )}
                            {/* <TableCell className="w-4" style={{ border: "none", paddingLeft: "3.9%" }} align="left"><span className="tabledata"> &nbsp;{((finalBal / props.state.totalSupply) * 100).toString().substr(0, 7)}%</span></TableCell> */}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                )
              )}
            </Table>
            {props.state.noData == 0 && (
              <NoDataFoundContainer>
                <img
                  src={require("../../../src/assets/images/XDC-Alert.svg")}
                ></img>

                <div className={props.theme === "dark" ? "fc-b1c3e1" : ""}>
                  No data found.
                </div>
              </NoDataFoundContainer>
            )}
          </TableContainer>
        </div>
        {props.state.totalAccounts >= 10 && (
          <Grid container style={{ marginTop: "28px" }} className="Pagination">
            <Grid item className="Pagination_1">
              {!props.state.isLoading && props.state.noData ? (
                <>
                  <span
                    className={
                      props.theme === "dark" ? "text fc-b1c3e1" : "text"
                    }
                  >
                    Show
                  </span>
                  <PageSelector
                    value={props.state.amount}
                    height={30}
                    handler={props._handleChange}
                    theme={props.theme}
                  />
                  <span
                    className={
                      props.theme === "dark" ? "text fc-b1c3e1" : "text"
                    }
                  >
                    Records
                  </span>
                </>
              ) : (
                ""
              )}
            </Grid>

            <Grid item className="Pagination_2">
              <button
                id="btn_12"
                style={{ marginLeft: "0px" }}
                onClick={(event) => props._FirstPage(event)}
                className={
                  props.state.from === 0
                    ? props.theme === "dark"
                      ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1 disabled"
                      : "btn disabled"
                    : props.theme === "dark"
                    ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1"
                    : "btn"
                }
              >
                First
              </button>
              <button
                id="btn_12"
                onClick={(event) => props._PrevPage(event)}
                className={
                  props.state.from === 0
                    ? props.theme === "dark"
                      ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1 disabled"
                      : "btn disabled"
                    : props.theme === "dark"
                    ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1"
                    : "btn"
                }
              >
                <img
                  className="back-arrow rotate-180"
                  src={"/images/next.svg"}
                  alt="back"
                />
              </button>
              <button
                id="btn_12"
                className={
                  props.theme === "dark"
                    ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1"
                    : "btn"
                }
              >
                Page{" "}
                {Math.ceil(state.totalAccounts / state.amount) -
                  Math.ceil((state.totalAccounts - state.from) / state.amount) +
                  1}{" "}
                of {Math.ceil(state.totalAccounts / state.amount)}
              </button>
              <button
                id="btn_12"
                onClick={(event) => props._NextPage(event)}
                className={
                  props.state.from + props.state.accountList.length ===
                  props.state.totalAccounts
                    ? props.theme === "dark"
                      ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1 disabled"
                      : "btn disabled"
                    : props.theme === "dark"
                    ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1"
                    : "btn"
                }
              >
                <img className="back-arrow" src={"/images/next.svg"} />
              </button>
              <button
                id="btn_12"
                onClick={(event) => props._LastPage(event)}
                className={
                  props.state.from + props.state.accountList.length ===
                  props.state.totalAccounts
                    ? props.theme === "dark"
                      ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1 disabled"
                      : "btn disabled"
                    : props.theme === "dark"
                    ? "btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1"
                    : "btn"
                }
              >
                Last
              </button>
            </Grid>
          </Grid>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}
