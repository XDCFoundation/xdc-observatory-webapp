import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableContainer } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tokensearchbar from "../explorer/tokensearchBar";
import "../../assets/styles/custom.css";
import FooterComponent from "../common/footerComponent";
import Utility, { dispatchAction } from "../../utility";
import ContractData from "../../services/contract";
import styled from "styled-components";
import Loader from "../../assets/loader";
import ConfigureColumnPopOver from "../common/configureColumnsPopOver";
import ConfigureColumnsModal from "../common/configureColumnsModal";
import { messages } from "../../constants";
import Tooltip from "@material-ui/core/Tooltip";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  rootui: {
    borderRadius: "17px",
    marginLeft: "18%",
    width: "65%",
    backgroundColor: "white",
  },
});
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: auto;
  width: 75.125rem;
  /* margin-right: 18%;
   margin-left: 18%; */
  @media (min-width: 0px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    width: 21rem;
    margin: 0 auto;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 41.5rem;
    margin: 0 auto;
  }
`;
const RightPagination = styled.div`
  display: flex;

  margin-top: 2.188rem;
  flex-direction: row;
  @media (min-width: 768px) and (max-width: 1240px) {
    margin-right: 0%;
  }
`;
const LeftPagination = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 2.188rem;
  @media (min-width: 1024px) and (max-width: 1240px) {
    margin-right: 5%;
  }
`;

class Contractlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 0,
      amount: 10,
      rows: [],
      totalRecord: 0,
      keywords: "",
      noData: false,
      isLoading: true,
      isSettingColumnOpen: false,
      anchorEl: null,
      isColumnsModalOpen: null,
        tableColumns: {
            // "Address": {isActive: true, toolTipText: "Address of the contract"},
            "Token Name": {isActive: true, toolTipText: "Name of the token associated with the contract."},
            "Contract Name": {isActive: true, toolTipText: "Name of the Smart Contract."},
            "Token Yes/No": {isActive: true, toolTipText: "Whether the token is associated with the Smart Contract or not"}
        }
    };
  }

  componentDidMount = () => {
    let data = { pageNum: this.state.from, perpage: this.state.amount };
    this.getContractList(data);
    this.getTotalContractList();
  };

  handleKeyUp = async (event) => {
    let searchkeyword = event.target.value;
    this.setState({ from: 0 });
    if (searchkeyword.length > 2) {
      this.setState({ keywords: searchkeyword });
      this.setState({ isLoading: false });
      let data = {
        pageNum: this.state.from,
        perpage: this.state.amount,
        keywords: searchkeyword,
      };
      // window.location.reload();
      await this.getContractSearch(data);
    }
    if (searchkeyword.length == 0) {
      this.setState({ from: 0 });
      let data = { pageNum: 0, perpage: this.state.amount };
      await this.getContractList(data);
      await this.getTotalContractList();
    }
  };

  handleChangePage = (action) => {
    if (action == "first") {
      let page = 0;
      this.setState({ from: page });
      if (this.state.keywords) {
        let data = {
          pageNum: page,
          perpage: this.state.amount,
          keywords: this.state.keywords,
        };
        this.getContractSearch(data);
      } else {
        let data = { pageNum: page, perpage: this.state.amount };
        this.getContractList(data);
        this.getTotalContractList();
      }
    }
    if (action === "last") {
      let page = this.state.totalRecord - this.state.amount;
      this.setState({ from: page });
      if (this.state.keywords) {
        let data = {
          pageNum: page,
          perpage: this.state.amount,
          keywords: this.state.keywords,
        };
        this.getContractSearch(data);
      } else {
        let data = { pageNum: page, perpage: this.state.amount };
        this.getContractList(data);
        this.getTotalContractList();
      }
    }

    if (action === "next") {
      if (+this.state.amount + +this.state.from < this.state.totalRecord) {
        let page = +this.state.amount + +this.state.from;
        this.setState({ from: page });
        if (this.state.keywords) {
          let data = {
            pageNum: page,
            perpage: this.state.amount,
            keywords: this.state.keywords,
          };
          this.getContractSearch(data);
        } else {
          let data = { pageNum: page, perpage: this.state.amount };
          this.getContractList(data);
          this.getTotalContractList();
        }
      }
    }
    if (action === "prev") {
      if (this.state.from - this.state.amount >= 0) {
        let page = this.state.from - this.state.amount;
        this.setState({ from: page });
        if (this.state.keywords) {
          let data = {
            pageNum: page,
            perpage: this.state.amount,
            keywords: this.state.keywords,
          };
          this.getContractSearch(data);
        } else {
          let data = { pageNum: page, perpage: this.state.amount };
          this.getContractList(data);
          this.getTotalContractList();
        }
      }
    }
  };

  handleChangeRowsPerPage = async (event) => {
    this.setState({ amount: event.target.value });
    if (this.state.keywords) {
      let data = {
        pageNum: this.state.from,
        perpage: this.state.amount,
        keywords: this.state.keywords,
      };
      await this.getContractSearch(data);
    } else {
      let data = { pageNum: this.state.from, perpage: event.target.value };
      this.getContractList(data);
    }

    //this.getTotalContractList()
  };

  shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  getContractList = async (data) => {
    const [error, responseData] = await Utility.parseResponse(
      ContractData.getContractLists(data)
    );

    this.setState({ isLoading: false });
    if (responseData) {
      this.setState({ rows: responseData });
      this.setState({ noData: false });
    } else {
      //setLoading(false);
    }
  };

  getContractSearch = async (data) => {
    const [error, responseData] = await Utility.parseResponse(
      ContractData.getContractSearch(data)
    );

    if (responseData?.totalRecord == 0) {
      this.setState({ noData: true });
      this.setState({ totalRecord: 0 });
      this.setState({ rows: responseData?.response });
    }
    if (responseData?.totalRecord > 0) {
      this.setState({ totalRecord: responseData?.totalRecord });
      this.setState({ rows: responseData?.response });
      this.setState({ noData: false });
    } else {
      //setLoading(false);
    }
  };

  getTotalContractList = async () => {
    const [error, responseData] = await Utility.parseResponse(
      ContractData.getTotalContractList()
    );
    if (responseData == 0) {
      this.setState({ noData: true });
    }
    this.setState({ isLoading: false });
    if (responseData) {
      this.setState({ totalRecord: responseData });
      this.setState({ noData: false });
    }
  };

  handleSettingsClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      isSettingColumnOpen: !this.state.isSettingColumnOpen,
    });
  };

  handleOnClose = () => {
    this.setState({ anchorEl: null, isSettingColumnOpen: false });
  };

  toggleModal = () => {
    this.setState({ isColumnsModalOpen: !this.state.isColumnsModalOpen });
  };

  toggleTableColumns = (columnName) => {
    const columns = this.state.tableColumns;
    columns[columnName].isActive = !columns[columnName].isActive;
    this.setState({ tableColumns: columns });
  };

  render(props) {
    const { classes } = this.props;
    let contentStatus = "";
    // let msgStatus = "";
    // if (this.state.noData) {
    //   contentStatus = "hideContent";
    //   msgStatus = "showContent";
    // } else {
    //   contentStatus = "showContent";
    //   msgStatus = "hideContent";
    // }
    // if(this.state.isLoading){
    //     return(<div class="loader"></div>)
    // }
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
      <div>
        <Tokensearchbar />
        <div className="display-flex justify-content-between p-t-30 p-b-30 responsive-table-width-contract-list contact-list-tab">
          <div className="fs-24 fw-bold">Contracts</div>
          <div className=" display-none-mobile display-flex flex-direction-column justify-content-center">
            <img
              onClick={this.handleSettingsClick}
              className="p-r-5 h-20 w-20-px"
              src="/images/settings.svg"
            />
            <ConfigureColumnPopOver
              isOpen={this.state.isSettingColumnOpen}
              anchorEl={this.state.anchorEl}
              handleOnClose={this.handleOnClose}
              tableColumns={this.state.tableColumns}
              toggleTableColumns={this.toggleTableColumns}
            />
          </div>
          <div className=" display-none-tab display-none-desktop display-flex flex-direction-column justify-content-center">
            <img
              onClick={this.toggleModal}
              className="p-r-5 h-20 w-20-px"
              src="/images/settings.svg"
            />
            <ConfigureColumnsModal
              isOpen={this.state.isColumnsModalOpen}
              onModalClose={this.toggleModal}
              tableColumns={this.state.tableColumns}
              toggleTableColumns={this.toggleTableColumns}
            />
          </div>
        </div>
        <Paper
          className={"responsive-table-width-contract-list contact-list-tab"}
          style={{
            borderRadius: "14px",
          }}
          elevation={0}
        >
          <TableContainer
            className={classes.container}
            id="container-table"
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
              background: "#fff",
              border: "none",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ border: "none", paddingLeft: "3%" }}
                    align="left"
                  >
                    <span
                      style={{ fontSize: "14px" }}
                      className={"tableheaders-contract"}
                    >
                      Address
                      <Tooltip placement="top" title={messages.CONTRACT_ADDRESS}>
                      <img
                        alt="question-mark"
                        src="/images/question-mark.svg"
                        height={"14px"}
                        className="tooltipLatestTransactionTableDashboard"
                         />
                      </Tooltip>
                    </span>
                  </TableCell>
                  {this.state.tableColumns["Token Name"].isActive && (
                    <TableCell style={{ border: "none" }} align="left">
                      <span
                        style={{ fontSize: "14px" }}
                        className={"tableheaders"}
                      >
                        Token Name
                        <Tooltip placement="top" title={messages.TOKEN_NAME}>
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
                  {this.state.tableColumns["Contract Name"].isActive && (
                    <TableCell style={{ border: "none" }} align="left">
                      <span
                        style={{ fontSize: "14px" }}
                        className={"tableheaders"}
                      >
                        Contract Name
                        <Tooltip placement="top" title={messages.CONTRACT_NAME}>
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
                  {this.state.tableColumns["Token Yes/No"].isActive && (
                    <TableCell style={{ border: "none" }} align="left">
                      <span
                        style={{ fontSize: "14px" }}
                        className={"tableheaders"}
                      >
                        Token Yes/No
                        <Tooltip placement="top" title={messages.TOKEN_YES_NO}>
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
              {this.state.isLoading == true ? (
                <TableBody>
                  <TableRow>
                    <TableCell style={{ border: "none" }} colspan="6">
                      <div className="loader-contract-list">
                        <Loader />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {this.state.rows.map((row, index) => {
                    let isToken = "";
                    if (row.ERC == 0) {
                      isToken = "No";
                    } else {
                      isToken = "Yes";
                    }
                    return (
                      <TableRow
                        key={row.name}
                        style={
                          index % 2 !== 1
                            ? { background: "#f9f9f9" }
                            : { background: "white" }
                        }
                      >
                        <TableCell
                          id="td"
                          style={{ width: "46%", borderBottom: "none" }}
                        >
                          <a
                            style={{
                              color: "#2149b9",
                              fontSize: 14,
                              marginLeft: "1.375rem",
                            }}
                            href={`/address/${row.address}`}
                          >
                            <span className="tabledata">{row.address} </span>
                          </a>
                        </TableCell>
                        {this.state.tableColumns["Token Name"].isActive && (
                          <TableCell id="td" style={{ borderBottom: "none" }}>
                            <span
                              className="tabledata"
                              style={{ marginLeft: "5px" }}
                            >
                              {row.tokenName}
                            </span>
                          </TableCell>
                        )}
                        {this.state.tableColumns["Contract Name"].isActive && (
                          <TableCell id="td" style={{ borderBottom: "none" }}>
                            <span
                              className="tabledata"
                              style={{ marginLeft: "5px" }}
                            >
                              {row.contractName}
                            </span>
                          </TableCell>
                        )}
                        {this.state.tableColumns["Token Yes/No"].isActive && (
                          <TableCell id="td" style={{ borderBottom: "none" }}>
                            <span
                              className="tabledata"
                              style={{ marginLeft: "0.188rem", fontSize: 14 }}
                            >
                              {isToken}
                            </span>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
              {/* <TableBody className={msgStatus}>
                <TableCell id="td" style={{ border: "none" }}>
                  <span
                    style={{ textAlign: "center", color: "#2a2a2a" }}
                    className="tabledata"
                  >
                    No data found.
                  </span>
                </TableCell>
              </TableBody> */}
            </Table>
            {this.state.noData ? (
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
          //   marginLeft: "18%",
          //   marginTop: "20px",
          // }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              Show
            </p>

            <select
              value={this.state.amount}
              className="selectbox-contract"
              onChange={(event) => this.handleChangeRowsPerPage(event)}
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

          <RightPagination
          // style={{
          //   display: "flex",
          //   flexDirection: "row",
          //   marginRight: "17.5%",
          //   marginTop: "20px",
          // }}
          >
            <div
              className={
                this.state.from === 0
                  ? "firstbox-contract disabled boxfirst"
                  : "firstbox-contract"
              }
              onClick={() => this.handleChangePage("first")}
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
                this.state.from === 0
                  ? "previousbox-contract disabled"
                  : "previousbox-contract"
              }
              onClick={() => this.handleChangePage("prev")}
            >
              <img className="navigation-arrow" src={"/images/back.svg"} />
              {/* <p className="path-contract">{"<"}</p> */}
            </div>
            <div className="pagebox-contract">
              <p className="Page-1-of-5-contract">
                Page{" "}
                {Math.ceil(this.state.totalRecord / this.state.amount) -
                  Math.ceil(
                    (this.state.totalRecord - this.state.from) /
                    this.state.amount
                  ) +
                  1}{" "}
                of {Math.ceil(this.state.totalRecord / this.state.amount)}
              </p>
            </div>
            <div
              className={
                this.state.from + this.state.amount === this.state.totalRecord
                  ? "nextbox-contract disabled"
                  : "nextbox-contract"
              }
              onClick={() => this.handleChangePage("next")}
            >
              <img className="navigation-arrow" src={"/images/next.svg"} />
              {/* <p
                className="path-2-contract"
                onClick={() => this.handleChangePage("next")}
              >
                {">"}
              </p> */}
            </div>
            <div
              className={
                +this.state.from + +this.state.amount === this.state.totalRecord
                  ? "lastbox-contract disabled"
                  : "lastbox-contract"
              }
              onClick={() => this.handleChangePage("last")}
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
}

export default withStyles(useStyles)(Contractlist);
