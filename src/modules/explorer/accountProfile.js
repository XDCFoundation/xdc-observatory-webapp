import { mergeClasses, withTheme } from "@material-ui/styles";
import React, { Component } from "react";
import moment from "moment";
import "../../assets/styles/profile.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Transaction from "./dashboardPopup/transactionLable";
import Watchlist from "./dashboardPopup/watchlist";
import Private from "./dashboardPopup/private";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import watchlistComponent from "./table/watchlistTable";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Tooltip } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tokensearchbar from "./tokensearchBar";
import FooterComponent from "../common/footerComponent";
import { UserService } from "../../services";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";

import EditWatchList from "./editWatchlist";
import EditTagAddress from "./editTagAddress";
import EditTxnLabel from "./editTxnLabel";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// const a11yProps = {
//     underlineStyle: {borderColor: '#f65857'}
//   };

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: "#f8f9fa00",
    // width: "100vw",
    borderRadius: "none",
    padding: "40px 0px",
    justifyContent: "space-around",
    textTransform: "none",
  },
  label: {
    textTransform: "none",
  },
  appbar: {
    backgroundColor: "#f8f9fa00",
    marginLeft: "115px",
    borderRadius: "0px",

    width: "55vw",
  },
  PrivateTabIndicatorColorSecondary57: {
    backgroundColor: "#2149b9",
  },
  // taboption: {

  //         activeTintColor: "white",
  //         inactiveTintColor: "blue",

  //         indicatorStyle :{
  //               backgroundColor:'blue'
  //         },

  //         style: {
  //           backgroundColor: 'grey',
  //         },
  //         labelStyle: {
  //           fontSize: 9,
  //           margin: 0,
  //           padding: 0,
  //           fontFamily: 'Poppins-bold',
  //         },
  //       },
  mywatch: {
    /* width: 100px; */
    height: "19px",
    /* margin: 65px 56.5px 10.5px 200px; */
    paddingLeft: "30px",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.58px",
    textAlign: "center",
    // color: "#2149b9",
  },
  txnprivate: {
    height: "19px",
    /* margin: 65px 67.5px 10.5px 8.5px; */
    paddingLeft: "30px",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.58px",
    textAlign: "center",
    color: "#6b7482",
  },
  address: {
    height: "19px",
    /* margin: 65px 314px 10.5px 2px; */
    paddingLeft: "30px",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.58px",
    textAlign: "center",
    color: "#6b7482",
  },
}));

export default function SimpleTabs(props) {
  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const [address, setAddress] = React.useState([]);
  const [watchlist, setWatchlist] = React.useState([]);
  const [privateAddress, setPrivateAddress] = React.useState([]);
  const [exports, exportAddress] = React.useState({});
  const [toggle, handleToggle] = React.useState(false);

  React.useEffect(() => {
    getUserWatchlist();
    async function getUserWatchlist() {
      //the user id has to be change from
      const data = "12345";
      const response = await UserService.getUserWatchlist(data);
      // console.log("url response", response);
      setWatchlist(response);
    }
    getuserdata();
    async function getuserdata() {
      //the user id has to be change from
      const data = "12345";
      const response = await UserService.getUserPrivateNote(data);
      setAddress(response);
      console.log("tttt", response);
    }

    getPvtTagAddress();
    async function getPvtTagAddress() {
      //the user id has to be change from
      const data = "12345";
      const response = await UserService.getPrivateTagToAddress(data);
      setPrivateAddress(response);
    }
  }, []);

  // const [search, setSearch] = React.useState("");

  // const filteredProducts = address.filter((product) => {
  //   if (
  //     product.tags.toLowerCase().includes(search) ||
  //     product.title.toLowerCase().includes(search) ||
  //     product.category.toLowerCase().includes(search)
  //   ) {
  //     return product;
  //   }
  // });

  const { state } = props;

  // 765876778994489048984589865
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const a11yProps(() => {
  //     underlineStyle: {borderColor: '#f65857'}
  // });
  return (
    <div>
      <Tokensearchbar />

      <div className="maindiv">
        <div className="heading">
          <span>
            <img
              className="icon"
              src={require("../../assets/images/Profile.png")}
            ></img>
          </span>
          <span>
            <div className="nameicon">
              <span className="welcome">Welcome, CrytoAlex</span>
              <span>
                <img
                  className="noticon"
                  src={require("../../assets/images/notification.png")}
                ></img>
              </span>
            </div>
            <div className="edit">Edit Profile</div>
          </span>
        </div>
        <div className="divbox">
          <Watchlist />

          <Transaction />
          <Private />
        </div>

        {/* <div className="innerdiv">
                    <span className="mywatch" >
                        My Watchlist
                    </span>
                    <span className="txnprivate" >
                        Txn Private Note

                    </span>
                    <span className="address">
                        Tagged Adresses

                    </span>
                </div> */}

        {/* <div className="line" ></div> */}

        <div className={classes.root}>
          <AppBar
            position="static"
            style={{ boxShadow: "0px 0px 0px 0px" }}
            className={classes.appbar}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              style={{ color: "#2149b9" }}
              tabBarUnderlineStyle={{ backgroundColor: "blue" }}
              indicatorColor="primary"
              textColor="primary"
              centered
              textTransform="uppercase"
            >
              <Tab
                label="My Watchlist"
                className={classes.mywatch}
                {...a11yProps(0)}
              />
              <Tab
                label="Txn Private Note"
                className={classes.txnprivate}
                {...a11yProps(1)}
              />
              <Tab
                label="Tagged Adresses"
                className={classes.address}
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <div className="line"></div>
          <div className="searchdiv">
            <span>
              <span className="searchiccon">
                <SearchIcon
                  style={{
                    color: "#9fa9ba",
                    marginRight: "-4px",
                    position: "relative",
                    left: "20px",
                  }}
                />
              </span>
              <span>
                <input
                  type="text"
                  placeholder="Search"
                  // onChange={(e) => {
                  //     setSearch(e.target.value.toLowerCase());
                  //   }}
                  className="searchinput"
                ></input>
              </span>
            </span>

            <button
              style={{
                color: "white",
                borderRadius: "4px",
                backgroundColor: "#9fa9ba",
              }}
            >
              {" "}
              Export
            </button>
          </div>
          <TabPanel value={value} index={0}>
            <div className="griddiv">
              <Grid lg={13} className="tablegrid_address">
                <Grid
                  component={Paper}
                  style={{ boxShadow: "0px 0px 0px 0px" }}
                >
                  <Table
                    className="table"
                    aria-label="Latest Transactions"
                    style={{ boxShadow: "0px 0px 0px 0px" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ border: "none" }} align="left">
                          {/* <input
                                            onChange={(event) => {
                                                let checked = event.target.checked;
                                                exportAddress(event.row);
                                                handleToggle(checked);
                                            }}
                                            type="checkbox"
                                            checked={toggle}
                                            style={{ marginRight: "8px" }}
                                        /> */}
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              let checked = e.target.checked;
                              setWatchlist(
                                watchlist.map((d) => {
                                  d.select = checked;

                                  return d;
                                })
                              );
                              // let checked = e.target.checked;
                              exportAddress(e.row);
                              handleToggle(checked);
                            }}
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          <span className={"tableheaders"}>Address</span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none", paddingLeft: "1.8%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}>Description</span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none", paddingLeft: "2%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}>Balance</span>
                          <span>
                            <ArrowUpwardIcon
                              style={{
                                color: "#3763dd",
                                height: "20px",
                                width: "15px",
                                marginLeft: "5px",
                              }}
                            />
                          </span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none", paddingLeft: "1%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}>AddedOn</span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none", paddingLeft: "1%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}>Notification</span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none", paddingLeft: "1%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}></span>
                        </TableCell>
                        {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {filteredProducts.map((product)=>{ */}

                      {watchlist.map((row, index) => {
                        return (
                          <TableRow
                            style={
                              index % 2 !== 1
                                ? { background: "#f9f9f9" }
                                : { background: "white" }
                            }
                          >
                            <TableCell
                              style={{ border: "none" }}
                              margin-left="5px"
                            >
                              {/* <Tooltip placement="right" title={row.Adress}>
                      <VisibilityIcon
                        fontSize="small"
                        style={{ color: "#b9b9b9" }}
                      />
                    </Tooltip> */}

                              {/* <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setAddress(
                                            address.map((d) => {
                                                d.select = checked;

                                                return d;
                                            })
                                        );
                                    }}
                                    style={{
                                        marginRight: "10px",
                                    }}
                                /> */}
                              <input
                                onChange={(event) => {
                                  // let checked = event.target.checked;
                                  // exportAddress(row);
                                  // handleToggle(checked);
                                  //         let checked = event.target.checked;
                                  // setAddress(
                                  //     address.map((d) => {
                                  //         d.select = checked;

                                  //         return d;
                                  //     })
                                  // );
                                  let checked = event.target.checked;
                                  exportAddress(event.row);
                                  handleToggle(checked);
                                }}
                                type="checkbox"
                                checked={toggle}
                                style={{ marginRight: "8px" }}
                              />
                              <a className="linkTable" href="/">
                                <Tooltip placement="top" title={row.address}>
                                  <span className="tabledata">
                                    {shorten(row.address)}{" "}
                                  </span>
                                </Tooltip>
                              </a>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className="tabledata">
                                {row.description}
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              {/* <a className="linkTable" href="/"> */}
                              <span className="tabledata">{row.balance}</span>
                              {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              {/* <a className="linkTable" href="/"> */}

                              <span className="tabledata">
                                {moment(row.addedOn).format(
                                  "hh:mm A, D MMMM YYYY "
                                )}
                              </span>
                              {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              {/* <a className="linkTable" href="/"> */}
                              <span className="tabledata">
                                {row.Notification}
                              </span>
                              {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <EditWatchList />
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="right"><span className="tabledata">0.00000000005 XDC</span></TableCell> */}
                          </TableRow>
                        );
                      })}
                      {/* })} */}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div className="griddiv">
              <Grid lg={13} className="tablegrid_address">
                <Grid
                  component={Paper}
                  style={{ boxShadow: "0px 0px 0px 0px" }}
                >
                  <Table
                    className="table"
                    aria-label="Latest Transactions"
                    style={{ boxShadow: "0px 0px 0px 0px" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ border: "none" }} align="left">
                          {/* <input
                                            onChange={(event) => {
                                                let checked = event.target.checked;
                                                exportAddress(event.row);
                                                handleToggle(checked);
                                            }}
                                            type="checkbox"
                                            checked={toggle}
                                            style={{ marginRight: "8px" }}
                                        /> */}
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              let checked = e.target.checked;
                              setAddress(
                                address.map((d) => {
                                  d.select = checked;

                                  return d;
                                })
                              );
                            }}
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          <span className={"tableheaders"}>
                            Transaction Hash
                          </span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none", paddingLeft: "1.8%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}>Note</span>
                        </TableCell>
                        {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Balance</span>
                            </TableCell> */}
                        <TableCell
                          style={{ border: "none", paddingLeft: "1%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}>AddedOn</span>
                          <span>
                            <ArrowUpwardIcon
                              style={{
                                color: "#3763dd",
                                height: "20px",
                                width: "15px",
                                marginLeft: "5px",
                              }}
                            />
                          </span>
                        </TableCell>
                        {/* <TableCell
                                style={{ border: "none", paddingLeft: "1%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Notification</span>
                            </TableCell> */}
                        <TableCell
                          style={{ border: "none", paddingLeft: "1%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}></span>
                        </TableCell>
                        {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {address.map((row, index) => {
                        // const currentTime = new Date();
                        // const previousTime = new Date(row.timestamp * 1000);
                        // const ti = timeDiff(currentTime, previousTime);
                        return (
                          <TableRow
                            style={
                              index % 2 !== 1
                                ? { background: "#f9f9f9" }
                                : { background: "white" }
                            }
                          >
                            <TableCell
                              style={{ border: "none" }}
                              margin-left="5px"
                            >
                              {/* <Tooltip placement="right" title={row.Adress}>
                      <VisibilityIcon
                        fontSize="small"
                        style={{ color: "#b9b9b9" }}
                      />
                    </Tooltip> */}

                              {/* <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setAddress(
                                            address.map((d) => {
                                                d.select = checked;

                                                return d;
                                            })
                                        );
                                    }}
                                    style={{
                                        marginRight: "10px",
                                    }}
                                /> */}
                              <input
                                onChange={(event) => {
                                  let checked = event.target.checked;
                                  exportAddress(row);
                                  handleToggle(checked);
                                }}
                                type="checkbox"
                                checked={toggle}
                                style={{ marginRight: "8px" }}
                              />
                              <a className="linkTable" href="/">
                                <Tooltip
                                  placement="top"
                                  title={row.transactionHash}
                                >
                                  <span className="tabledata">
                                    {shorten(row.transactionHash)}{" "}
                                    {/* {row.transactionHash} */}
                                  </span>
                                </Tooltip>
                              </a>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className="tabledata">{row.trxLable}</span>
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="left">
                                        
                                            <span className="tabledata">{row.Balance}</span>
                                        
                                    </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              {/* <a className="linkTable" href="/"> */}
                              <span className="tabledata">
                                {" "}
                                {moment(row.addedOn).format(
                                  "hh:mm A, D MMMM YYYY "
                                )}{" "}
                              </span>
                              {/* </a> */}
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="left">
                                        
                                            <span className="tabledata">{row.Notification}</span>
                                        
                                    </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <EditTxnLabel row={row} />
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="right"><span className="tabledata">0.00000000005 XDC</span></TableCell> */}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="griddiv">
              <Grid lg={13} className="tablegrid_address">
                <Grid
                  component={Paper}
                  style={{ boxShadow: "0px 0px 0px 0px" }}
                >
                  <Table
                    className="table"
                    aria-label="Latest Transactions"
                    style={{ boxShadow: "0px 0px 0px 0px" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ border: "none" }} align="left">
                          {/* <input
                                            onChange={(event) => {
                                                let checked = event.target.checked;
                                                exportAddress(event.row);
                                                handleToggle(checked);
                                            }}
                                            type="checkbox"
                                            checked={toggle}
                                            style={{ marginRight: "8px" }}
                                        /> */}
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              let checked = e.target.checked;
                              setPrivateAddress(
                                privateAddress.map((d) => {
                                  d.select = checked;

                                  return d;
                                })
                              );
                            }}
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          <span className={"tableheaders"}>Address</span>
                        </TableCell>
                        <TableCell
                          style={{ border: "none", paddingLeft: "-6.4%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}>Name Tag</span>
                          <span>
                            <ArrowUpwardIcon
                              style={{
                                color: "#3763dd",
                                height: "20px",
                                width: "15px",
                                marginLeft: "5px",
                              }}
                            />
                          </span>
                        </TableCell>
                        {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Balance</span>
                            </TableCell> */}
                        <TableCell
                          style={{ border: "none", paddingLeft: "1%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}>AddedOn</span>
                        </TableCell>
                        {/* <TableCell
                                style={{ border: "none", paddingLeft: "1%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Notification</span>
                            </TableCell> */}
                        <TableCell
                          style={{ border: "none", paddingLeft: "1%" }}
                          align="left"
                        >
                          <span className={"tableheaders"}></span>
                        </TableCell>
                        {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {privateAddress.map((row, index) => {
                        // const currentTime = new Date();
                        // const previousTime = new Date(row.timestamp * 1000);
                        // const ti = timeDiff(currentTime, previousTime);
                        return (
                          <TableRow
                            style={
                              index % 2 !== 1
                                ? { background: "#f9f9f9" }
                                : { background: "white" }
                            }
                          >
                            <TableCell
                              style={{ border: "none" }}
                              margin-left="5px"
                            >
                              {/* <Tooltip placement="right" title={row.Adress}>
                      <VisibilityIcon
                        fontSize="small"
                        style={{ color: "#b9b9b9" }}
                      />
                    </Tooltip> */}

                              {/* <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setAddress(
                                            address.map((d) => {
                                                d.select = checked;

                                                return d;
                                            })
                                        );
                                    }}
                                    style={{
                                        marginRight: "10px",
                                    }}
                                /> */}
                              <input
                                onChange={(event) => {
                                  let checked = event.target.checked;
                                  exportAddress(row);
                                  handleToggle(checked);
                                }}
                                type="checkbox"
                                checked={toggle}
                                style={{ marginRight: "8px" }}
                              />
                              <a className="linkTable" href="/">
                                <Tooltip placement="top" title={row.address}>
                                  <span className="tabledata">
                                    {shorten(row.address)}
                                  </span>
                                </Tooltip>
                              </a>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className="tabledata">{row.tagName}</span>
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="left">
                                        
                                            <span className="tabledata">{row.Balance}</span>
                                        
                                    </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              {/* <a className="linkTable" href="/"> */}
                              <span className="tabledata">
                                {moment(row.addedOn).format(
                                  "hh:mm A, D MMMM YYYY "
                                )}{" "}
                              </span>
                              {/* </a> */}
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="left">
                                        
                                            <span className="tabledata">{row.Notification}</span>
                                        
                                    </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <EditTagAddress />
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="right"><span className="tabledata">0.00000000005 XDC</span></TableCell> */}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
          </TabPanel>
        </div>

        <div>
          <h1></h1>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
