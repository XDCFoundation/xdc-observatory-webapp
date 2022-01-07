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
import { messages } from "../../constants"

const useStyles = makeStyles({
  container: {
    borderRadius: "0.875rem",
    boxShadow: "0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  RankColumn: {
    border: "none !important",
    borderBottom: "none !important",
    paddingLeft: "5.8% !important",
  },
  RankColumnVal: {
    border: "none !important",
    borderBottom: "none !important",
    paddingLeft: "5% !important",
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
  "@media (max-width: 1024px)": {
    container: {
      height: 600,
    },
  },
});

const NoDataFoundContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  gap: 10px;
  @media (min-width: 767px) {
    margin: 100px !important;
  }
`;
export default function AccountComponent(props) {
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

  function shortenBalance(b, amountL = 12, amountR = 3, stars = 0) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(b.length - 3)}`;
  }

  const { state } = props;
  const classes = useStyles();
  let rantValue = state.from;

  return (
    <div>
      <Tokensearchbar />
      <div className="responsive-table-width-contract-list contact-list-tab ">
        <div className="display-flex justify-content-between p-t-30 p-b-30">
          <div class="fs-24 fw-bold">{state.tableName}</div>
          <div className=" display-none-mobile display-flex flex-direction-column justify-content-center">
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
          <div className=" display-none-tab display-none-desktop display-flex flex-direction-column justify-content-center">
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
        </div>
        <Paper style={{ borderRadius: "0.875rem" }} elevation={0}>
          <TableContainer className={classes.container} id="container-table">
            <Table>
              <TableHead>
                <TableRow>
                  {props.state.tableColumns["Rank"].isActive && (
                    <TableCell
                      className={classes.RankColumn}
                      align="center"
                    >
                      <span className={"tableheaders_1 pl--1"}>
                        Rank
                        <Tooltip placement="top" title={messages.RANK}>
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
                    style={{ border: "none", paddingLeft: "2.2%" }}
                    align="center !important"
                  >
                    <span className={"tableheaders_1_address"}>
                      Address
                      <Tooltip placement="top" title={messages.ACCOUNT_ADDRESS}>
                        <img
                          alt="question-mark"
                          src="/images/question-mark.svg"
                          height={"14px"}
                          className="tooltipLatestTransactionTableDashboard"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                  {props.state.tableColumns["Type"].isActive && (
                    <TableCell
                      style={{ border: "none", paddingLeft: "6%" }}
                      align="center"
                    >
                      <span className={"tableheaders_1 pl--1"}>
                        Type
                        <Tooltip placement="top" title={messages.ACCOUNT_TYPE}>
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
                  {props.state.tableColumns["Balance"].isActive && (
                    <TableCell
                      style={{ border: "none", paddingLeft: "5%", paddingRight: "48px" }}
                      align="center"
                    >
                      <span className={"tableheaders_1"}>
                        Balance
                        <Tooltip placement="top" title={messages.ACCOUNT_BALANCE}>
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

                  {props.state.tableColumns["Percentage"].isActive && (
                    <TableCell
                      className={classes.PercentageColumn}
                      align="center"
                    >
                      <span className={"tableheaders_1"}>
                        Percentage
                        <Tooltip placement="top" title={messages.PERCENTAGE}>
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
                        let finalBal = Utils.decimalDivisonOnly(row.balance, 8)
                        let bal = finalBal.toString();
                        var bal1 =
                          utility.convertToInternationalCurrencySystem(bal);
                        var bal2 = bal1.toString().split(".")[0];
                        var bal3 = bal1.toString().split(".")[1];
                        var regex = new RegExp("([0-9]+)|([a-zA-Z]+)", "g");
                        var splittedArray = bal3?.match(regex);

                        var bal4 = splittedArray && splittedArray.length ? splittedArray[0] : 0;
                        var text = splittedArray && splittedArray.length ? splittedArray[1] : 0;


                        rantValue = rantValue + 1;
                        let percentageValue = (
                          (finalBal / state.totalSupply) *
                          100
                        ).toFixed(8);
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
                                ? { background: "#f9f9f9" }
                                : { background: "white" }
                            }
                          >
                            {props.state.tableColumns["Rank"].isActive && (
                              <TableCell
                                className={`w-2 ${classes.RankColumnVal}`}
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
                                className="linkTable"
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
                                <span className="tabledata">
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
                                  paddingLeft: "5%",
                                  cursor: "pointer",
                                }}
                                align="center"
                              >
                                <Tooltip
                                  placement="right"
                                  title={format({})(finalBal)}
                                >
                                  {bal3 >= 0 || bal3 == null ? (
                                    <span className="tabledata">{bal2}</span>
                                  ) : (
                                    <span className="tabledata">
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
                                  <span className="tabledata">
                                    {percentageValue1}
                                    {"."}
                                    <span style={{ color: "#9FA9BA" }}>
                                      {percentageValue2}
                                    </span>
                                    %
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

                <div>No account found.</div>
              </NoDataFoundContainer>
            )}
          </TableContainer>
        </Paper>

        <Grid container style={{ marginTop: "35px" }} className="Pagination">
          <Grid item className="Pagination_1">
          {!props.state.isLoading && props.state.noData ?
            (<><span className="text">Show</span>
            <select
              value={props.state.amount}
              className="select-amount"
              onChange={(event) => props._handleChange(event)}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </select>
            <span className="text">Records</span></>):("")}
          </Grid>

          <Grid item className="Pagination_2">
            <button
              id="btn_12"
              style={{ marginLeft: "0px" }}
              onClick={(event) => props._FirstPage(event)}
              className={props.state.from === 0 ? "btn disabled" : "btn"}
            >
              First
            </button>
            <button
              id="btn_12"
              onClick={(event) => props._PrevPage(event)}
              className={props.state.from === 0 ? "btn disabled" : "btn"}
            >
              <img className="back-arrow" src={"/images/back.svg"} />
            </button>
            <button id="btn_12" className="btn">
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
                props.state.from + props.state.amount ===
                  props.state.totalAccounts
                  ? "btn disabled"
                  : "btn"
              }
            >
              <img className="back-arrow" src={"/images/next.svg"} />
            </button>
            <button
              id="btn_12"
              onClick={(event) => props._LastPage(event)}
              className={
                props.state.from + props.state.amount ===
                  props.state.totalAccounts
                  ? "btn disabled"
                  : "btn"
              }
            >
              Last
            </button>
          </Grid>
        </Grid>
      </div>
      <FooterComponent />
    </div>
  );
}
