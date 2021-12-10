import React from "react";
import "../../../src/assets/styles/blocksAndTransactionList.css";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, TableContainer } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tokensearchbar from '../explorer/tokensearchBar';
import FooterComponent from '../common/footerComponent';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../../assets/loader'

const useStyles = makeStyles({

  container: {

    borderRadius: '0.875rem',
    boxShadow: '0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)',
    borderBottom: 'none',
    background: '#fff',
  },
  "@media (max-width: 1024px)": {
    container: {
      height: 600,
    },
  },

});
export default function AccountComponent(props) {

  function shortenBalance(b, amountL = 12, amountR = 3, stars = 0) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,

    )}`;
  }
  const { state } = props
  const classes = useStyles();
  //alert(props.state.noData)
  return (
    <div>
      <Tokensearchbar />
      <Grid className="table_1 ">
        <Grid class="tabletop-header">{state.tableName}</Grid>
        <div className="searchelement-input2">
          <img style={{ width: 20, height: 20, marginRight: 6, marginTop: 3 }}
            src={require('../../assets/images/Search.svg')} />
          <input
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                props._handleSearch(e)
              }

            }}
            onChange={(e) => {
              if (e.target.value == "") {
                props._handleSearch(e)
              }
            }} className="account-searchbar"
            type="text"
            placeholder="Search Accounts" />
          {/* name="NAME" */}
        </div>
        <br />

        <Paper style={{ borderRadius: '0.875rem' }} elevation={0}>
          <TableContainer className={classes.container} id="container-table">
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell style={{ border: "none", paddingLeft: "2.2%" }} align="left" ><span className={"tableheaders_1_address"}>Address</span></TableCell>
                  <TableCell style={{ border: "none", paddingLeft: "2.2%" }} align="left"><span className={"tableheaders_1 pl--1"}>Type</span></TableCell>
                  <TableCell style={{ border: "none", paddingLeft: "2.2%" }} align="left"><span className={"tableheaders_1"}>Balance</span></TableCell>
                  <TableCell style={{ border: "none", paddingLeft: "4.4%" }} align="left"><span className={"tableheaders_1 percentage-table-accounts"}>Percentage</span></TableCell>
                </TableRow>
              </TableHead>
              {props.state.isLoading == true ? (
                <TableBody>
                  <TableRow>
                    <TableCell style={{ border: 'none' }} colspan="6">
                      <div className="loader-block-list">
                        <Loader />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) :
                props.state.noData == 1 &&
                <TableBody>
                  {props.state.accountList && props.state.accountList.length >= 1 && props.state.accountList.map((row, index) => {
                    let num = row.balance;
                    let finalBal = num / 1000000000000000000;
                    let bal = finalBal.toString()
                    return (
                      <TableRow key={row.name} style={index % 2 !== 1 ? { background: "#f9f9f9" } : { background: "white" }}>
                        <TableCell className="w-1" style={{ border: "none", paddingLeft: "25.5px", width: "48%" }} >

                          <a className="linkTable" href={'/address-details/' + row.address}><span className="tabledata">{(row.address)}</span></a>

                        </TableCell>
                        {/* <TableCell style={{ border: "none" }} align="left"><a className="linkTable" href={props.create_url(row.number, "height")}><span className="tabledata">{row.number}</span></a></TableCell> */}
                        <TableCell className="w-2" style={{ border: "none" }} align="left"><span className="tabledata">{row.accountType == 0 ? "Account" : "Contract"}</span></TableCell>
                        <TableCell className="w-3" style={{ border: "none", paddingLeft: "2%" }} align="left"><span className="tabledata">{bal.substr(0, 18)}</span></TableCell>
                        <TableCell className="w-4" style={{ border: "none", paddingLeft: "3.9%" }} align="left"><span className="tabledata"> &nbsp;{((finalBal / props.state.totalSupply) * 100).toString().substr(0, 7)}%</span></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              }
              {props.state.noData == 0 &&
                <TableBody >
                  <TableCell id="td" colSpan="4" style={{ borderBottom: "none" }}>
                    <span style={{ textAlign: 'center', color: 'black', borderBottom: "none" }} className="tabledata">No Account Found.</span>
                  </TableCell>
                </TableBody>
              }
            </Table>
          </TableContainer>
        </Paper>

        <Grid container style={{ marginTop: "35px" }} className="Pagination">
          <Grid item className="Pagination_1">
            <span className="text">Show</span>
            <select value={props.state.amount} className="select-amount" onChange={(event) => props._handleChange(event)} >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text">Records</span>
          </Grid>

          <Grid item className="Pagination_2">
            <button id="btn_12" style={{ marginLeft: "0px" }} onClick={(event) => props._FirstPage(event)} className={props.state.from === 0 ? "btn disabled" : "btn"}>First</button>
            <button id="btn_12" onClick={(event) => props._PrevPage(event)} className={props.state.from === 0 ? "btn disabled" : "btn"}><img
              className="back-arrow"
              src={require("../../assets/images/back.svg")}
            /></button>
            <button id="btn_12" className="btn">Page {Math.ceil(state.totalAccounts / state.amount)  - Math.ceil((state.totalAccounts - state.from) / state.amount) + 1} of {Math.ceil(state.totalAccounts / state.amount)}</button>
            <button id="btn_12" onClick={(event) => props._NextPage(event)} className={props.state.from + props.state.amount === props.state.totalAccounts ? "btn disabled" : "btn"}><img
              className="back-arrow"
              src={require("../../assets/images/next.svg")}
            /></button>
            <button id="btn_12" onClick={(event) => props._LastPage(event)} className={props.state.from + props.state.amount === props.state.totalAccounts ? "btn disabled" : "btn"}>Last</button>

          </Grid>
        </Grid>
      </Grid >
      <FooterComponent />
    </div >
  )
}