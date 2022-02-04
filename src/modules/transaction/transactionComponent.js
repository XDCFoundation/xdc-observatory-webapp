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
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Loader from "../../assets/loader";
import ConfigureColumnPopOver from "../common/configureColumnsPopOver";
import ConfigureColumnsModal from "../common/configureColumnsModal";
import moment from "moment";
import { messages } from "../../constants"
import TransactionDetailTooltip from "../common/transactionDetailTooltip";
import format from "format-number";
import utility from "../../utility";
import PageSelector from "../common/pageSelector";



const useStyles = makeStyles({
  container: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  container1: {
    borderRadius: "14px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  "@media (min-width:0px) and (max-width: 1240px)": {
    container: {
      height: "36.375rem",
    },
    container1: {
      height: "23.375rem",
    },
  },
});
const Pagination = styled.div`
  @media (min-width: 640px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

export default function TransactionComponent(props) {
  const classes = useStyles();

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

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const { state } = props;

  const NoDataFoundContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    gap: 10px;
    color: #c6cbcf;
    @media (min-width: 767px) {
      margin: 100px 0 !important;
    }
  `;

  const tableColumns = { "Transaction Hash": { isActive: true } };
  return (
    <div className="responsive-table-width-transactions-list contact-list-tab ">
      <div className="display-flex justify-content-between p-t-30 p-b-15">
        <div class="latestTransactionHeading">{state.tableName}</div>
        <div class=" display-none-mobile display-flex flex-direction-column justify-content-center">
          <img
            onClick={handleSettingsClick}
            className="m-r-9 h-20 w-20-px cursor-pointer"
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
            className="p-r-5 h-20 w-20-px cursor-pointer"
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

      <Paper style={{ borderRadius: "14px" }} elevation={0}>
        <TableContainer className={!props.state.isData ? classes.container1 : classes.container} id="container-table-transaction-list">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  className="table-head-hash hash-transaction-list-all"
                  align="left"
                >
                  <span className={("tableheaders-hash", "tableheaders")}>
                    Hash
                    <Tooltip placement="top" title={messages.HASH}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                {props.state.tableColumns["Amount"].isActive && (
                  <TableCell
                    style={{ border: "none", paddingLeft: "2.813rem" }}
                    className="table-head-all"
                    align="left"
                  >
                    <span className={("tableheaders", "tableheaders-all")}>
                      Amount
                      <Tooltip placement="top" title={messages.AMOUNT}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIcon"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                )}
                {props.state.tableColumns["Age"].isActive && (
                  <TableCell
                    style={{ border: "none", paddingLeft: "3rem" }}
                    className="table-head-all"
                    align="left"
                  >
                    <span className={("tableheaders", "tableheaders-age")}>
                      Age
                      <Tooltip placement="top" title={messages.AGE}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIcon"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                )}
                {props.state.tableColumns["Date"].isActive && (
                  <TableCell
                    style={{ border: "none", paddingLeft: "3rem" }}
                    className="table-head-all"
                    align="left"
                  >
                    <span className={("tableheaders", "tableheaders-age")}>
                      Date
                      <Tooltip placement="top" title={messages.DATE}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIcon"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                )}
                {props.state.tableColumns["Block"].isActive && (
                  <TableCell
                    style={{ border: "none", paddingLeft: "3rem" }}
                    className="table-head-all"
                    align="left"
                  >
                    <span className={("tableheaders", "tableheaders-all")}>
                      Block
                      <Tooltip placement="top" title={messages.BLOCK}>
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                          height={"14px"}
                          className="tooltipInfoIcon"
                        />
                      </Tooltip>
                    </span>
                  </TableCell>
                )}
                <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-all")}>
                    From
                    <Tooltip placement="top" title={messages.FROM}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-all")}>
                    To
                    <Tooltip placement="top" title={messages.TO}>
                      <img
                        alt="question-mark"
                        src="/images/info.svg"
                        height={"14px"}
                        className="tooltipInfoIcon"
                      />
                    </Tooltip>
                  </span>
                </TableCell>
                {/* <TableCell
                  style={{ border: "none", paddingLeft: "3rem" }}
                  className="table-head-all"
                  align="left"
                >
                  <span className={("tableheaders", "tableheaders-txn-fee")}>
                    Txn Fee
                  </span>
                </TableCell> */}
              </TableRow>
            </TableHead>
            {props.state.isLoading == true ? (
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }} colspan="7">
                    <div className="loader-block-list">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {props.state.transactionList &&
                  props.state.transactionList.length >= 1 &&
                  props.state.transactionList.map((row, index) => {
                    const currentTime = new Date();
                    const previousTime = new Date(row.timestamp * 1000);
                    const ti = utility.timeDiff(currentTime, previousTime);
                    // const txFee = (
                    //   (row?.gasUsed * row?.gasPrice) /
                    //   100000000000000000
                    // ).toFixed(9);
                    let amt = utility.decimalDivison(row.value, 8);
                    const Hash = row.hash;
                    let animationClass = props.state.hashAnimation?.[Hash];
                    return (
                      <TableRow
                        key={row.name}
                        style={
                          index % 2 !== 1
                            ? { background: "#f9f9f9" }
                            : { background: "white" }
                        }
                      >
                        <TableCell style={{ border: "none", width: "190px", margin: 0, display: "flex", alignItems: "center" }}>
                          <div>
                            <TransactionDetailTooltip
                              transactionAddress={row.hash} />
                          </div>
                          <a
                            className="linkTable"
                            href={"/transaction-details/" + row.hash}
                          >
                            {" "}
                            <span
                              className={
                                animationClass ? animationClass : "tabledata"
                              }
                            >
                              {" "}
                              {shorten(row.hash)}
                            </span>{" "}
                          </a>
                        </TableCell>
                        {props.state.tableColumns["Amount"].isActive && (
                          <TableCell
                            style={{
                              border: "none",
                              width: "100px",
                              paddingLeft: "2.813rem",
                            }}
                            align="left"
                          >
                            <span
                              className={
                                animationClass ? animationClass : "tabledata"
                              }
                            >
                              {amt}
                            </span>
                          </TableCell>
                        )}
                        {props.state.tableColumns["Age"].isActive && (
                          <TableCell
                            style={{
                              border: "none",
                              width: "120px",
                              paddingLeft: "2.813rem",
                            }}
                            align="left"
                          >
                            <span
                              className={
                                animationClass ? animationClass : "tabledata"
                              }
                            >
                              {ti}
                            </span>
                          </TableCell>
                        )}
                        {props.state.tableColumns["Date"].isActive && (
                          <TableCell
                            style={{
                              border: "none",
                              width: "120px",
                              paddingLeft: "2.813rem",
                            }}
                            align="left"
                          >
                            <span
                              className={
                                animationClass ? animationClass : "tabledata"
                              }
                            >
                              {moment(row.timestamp * 1000).format(
                                "MMM DD, YYYY h:mm A"
                              )}
                            </span>
                          </TableCell>
                        )}
                        {props.state.tableColumns["Block"].isActive && (
                          <TableCell
                            style={{
                              border: "none",
                              width: "120px",
                              paddingLeft: "2.813rem",
                            }}
                            align="left"
                          >
                            {" "}
                            <a
                              className="linkTable"
                              href={"/block-details/" + row.blockNumber}
                            >
                              {" "}
                              <span
                                className={
                                  animationClass ? animationClass : "tabledata"
                                }
                              >
                                {" "}
                                {row.blockNumber}
                              </span>{" "}
                            </a>
                          </TableCell>
                        )}
                        <TableCell
                          style={{
                            border: "none",
                            width: "160px",
                            paddingLeft: "2.813rem",
                          }}
                          align="left"
                        >
                          {" "}
                          <a
                            className="linkTable"
                            href={"/address-details/" + row.from}
                          >
                            <Tooltip placement="top" title={row.from}>
                              <span
                                className={
                                  animationClass ? animationClass : "tabledata"
                                }
                              >
                                {shorten(row.from)}
                              </span>
                            </Tooltip>
                          </a>
                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",
                            width: "155px",
                            paddingLeft: "2.813rem",
                            paddingRight: "15px"
                          }}
                          align="left"
                        >
                          {" "}
                          <a
                            className="linkTable"
                            href={"/address-details/" + row.to}
                          >
                            <Tooltip placement="top" title={row.to}>
                              <span
                                className={
                                  animationClass ? animationClass : "tabledata"
                                }
                              >
                                {!row.to
                                  ? "------------------"
                                  : shorten(row.to)}
                              </span>
                            </Tooltip>
                          </a>
                        </TableCell>
                        {/* <TableCell
                          style={{ border: "none", paddingLeft: "2.813rem" }}
                          align="left"
                        >
                          <span
                            className={
                              animationClass ? animationClass : "tabledata"
                            }
                          >
                            {txFee == 0 ? 0 : txFee} XDC
                          </span>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
              </TableBody>
            )}
          </Table>
          {!props.state.isData && !props.state.isLoading ? (
            <NoDataFoundContainer>
              <img
                src={require("../../../src/assets/images/XDC-Alert.svg")}
              ></img>

              <div>No transactions found</div>
            </NoDataFoundContainer>
          ) : (
            ""
          )}
        </TableContainer>
      </Paper>

      <Grid container style={{ marginTop: "1.75rem" }} className="Pagination">
        {/* <Pagination> */}
        <Grid className="Pagination_1">
          {!props.state.isLoading && props.state.isData ?
            (<><span className="text">Show</span>
              <PageSelector value={props.state.amount}
                height={35}
                handler={props._handleChange} />
              <span className="text">Records</span></>) : ("")}
        </Grid>

        <Grid item className="Pagination_2">
          <button
            onClick={(event) => props._FirstPage(event)}
            className={
              props.state.from === 0
                ? "btn disabled btn-first"
                : "btn btn-first"
            }
          >
            First
          </button>
          <button
            onClick={(event) => props._PrevPage(event)}
            className={
              props.state.from === 0 ? "btn disabled btn-back" : "btn btn-back"
            }
          >
            <img className="rotate-180" alt="back" src={"/images/next.svg"} />{" "}
          </button>
          <button className="btn btn-page">
            Page{" "}
            {Math.round(state.totalTransaction / state.amount) +
              1 -
              Math.round(
                (state.totalTransaction - state.from) / state.amount
              )}{" "}
            of {Math.round(state.totalTransaction / state.amount)}
          </button>
          <button
            onClick={(event) => props._NextPage(event)}
            className={
              props.state.from + props.state.amount ===
                props.state.totalTransaction
                ? "btn disabled"
                : "btn btn-next"
            }
          >
            <img alt="next" src={"/images/next.svg"} />
          </button>
          <button
            onClick={(event) => props._LastPage(event)}
            className={
              props.state.from + props.state.amount ===
                props.state.totalTransaction
                ? "btn disabled"
                : "btn btn-last"
            }
          >
            Last
          </button>
        </Grid>
        {/* </Pagination> */}
      </Grid>
    </div>
  );
}
