import { mergeClasses, withTheme } from "@material-ui/styles";
import React, { Component } from "react";
import moment from "moment";
import "../../assets/styles/profile.css";
import Transaction from "./dashboardPopup/transactionLable";
import Watchlist from "./dashboardPopup/watchlist";
import Private from "./dashboardPopup/private";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Tooltip } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { CSVLink, CSVDownload } from "react-csv";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tokensearchbar from "./tokensearchBar";
import FooterComponent from "../common/footerComponent";
import Editprofile from "./editprofle";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { UserService } from "../../services";
import NotificationBar from "./NotificationBar";
import EditWatchList from "./editWatchlist";
import EditTagAddress from "./editTagAddress";
import EditTxnLabel from "./editTxnLabel";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import Utils from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import {cookiesConstants} from "../constants"

const PaginationDiv = styled.div`
  margin-left: auto;
  margin-right: 0;
  & .paginationBttns {
    list-style: none;
    display: flex;
    max-width: 1450px;
    min-width: 100%;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
  & .paginationBttns a {
    padding: 7px;
    font-size: 10px;
    margin: 6px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    color: skyblue;
    cursor: pointer;
  }
  & .paginationActive a {
    color: white !important;
    background: #009fe0;
  }
  & .next a {
    border: none;
  }
  & .previous a {
    border: none;
  }
`;

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
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "0px",
    width: "1202px",
    alignItems: "flex-start",
    // paddingLeft: "26px",
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
    textTransform: "none",
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
    textTransform: "none",
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
    textTransform: "none",
  },
  "@media (max-width: 1920px)": {
    appbar: {
      maxWidth: "1248px",
      width: "100%",
      padding: "0 24px",
    },
  },
  "@media (max-width: 828px)": {
    appbar: {
      maxWidth: "710px",
      width: "100%",
      padding: "0 24px",
    },
  },
  "@media (max-width: 714px)": {
    appbar: {
      maxWidth: "375px",
      width: "100%",
      padding: "0 7px",
    },
    mywatch: {
      /* width: 100px; */
      height: "19px",
      /* margin: 65px 56.5px 10.5px 200px; */
      paddingLeft: "6px",
      fontFamily: "Inter",
      fontSize: "13px",
      fontWeight: "500",
      letterSpacing: "-0.5px",
      textAlign: "center",
      // color: "#2149b9",
    },
    txnprivate: {
      height: "19px",
      /* margin: 65px 67.5px 10.5px 8.5px; */
      paddingLeft: "6px",
      fontFamily: "Inter",
      fontSize: "13px",
      letterSpacing: "-0.5px",
      textAlign: "center",
      color: "#6b7482",
    },
    address: {
      height: "19px",
      /* margin: 65px 314px 10.5px 2px; */
      paddingLeft: "0px",
      fontFamily: "Inter",
      fontSize: "13px",
      letterSpacing: "-0.5px",
      textAlign: "center",
      color: "#6b7482",
    },
  },
  btn: {
    textAlign: "start",
    padding: "0px",
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
  },
}));

export default function SimpleTabs(props) {
  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  // function shortenUserName(b, amountL = 12, amountR = 0, stars = 3) {
  //   return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
  //     b.length - 0,
  //     b.length
  //   )}`;
  // }

  const [address, setAddress] = React.useState([]);
  const [watchlist, setWatchlist] = React.useState([]);
  // const [userName, setUserName] = React.useState([]);
  const [privateAddress, setPrivateAddress] = React.useState([]);
  const [exports, exportAddress] = React.useState({});
  const [toggle, handleToggle] = React.useState(false);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { state } = props;
  const [addedOnToggle, setAddedOnToggle] = React.useState(0);
  const [balanceToggle, setBalanceToggle] = React.useState(0);
  const [nameToggle, setNameToggle] = React.useState(0);
  const [tableValue, setTablevalue] = React.useState(1);
  const [downloadWatchlist, setDownloadWatchlist] = React.useState([]);
  const [downloadTxnPvtNote, setDownloadTxnPvtNote] = React.useState([]);
  const [downloadTagAddress, setDownloadTagAddress] = React.useState([]);
  const [isDownloadActive, setDownloadActive] = React.useState(0);

  React.useEffect(() => {
    getUserWatchlist();
    async function getUserWatchlist() {
      const data = sessionManager.getDataFromCookies("userId");
      const response = await UserService.getUserWatchlist(data);
      setWatchlist(response);
      setTablevalue(1);
    }
    getuserdata();
    async function getuserdata() {
      const data = sessionManager.getDataFromCookies("userId");
      const response = await UserService.getUserPrivateNote(data);
      setAddress(response);
    }
    getPvtTagAddress();
    async function getPvtTagAddress() {
      const data = sessionManager.getDataFromCookies("userId");
      const response = await UserService.getPrivateTagToAddress(data);
      setPrivateAddress(response);
    }
  }, []);

  const [search, setSearch] = React.useState("");
  async function searchData() {
    if (value === 0) {
      const data = {
        userId: sessionManager.getDataFromCookies("userId"),
        searchValue: search,
        searchKeys: ["description", "address"],
        search: value.toString(),
      };
      const response = await UserService.Search(data);
      setWatchlist(response);
    }
    if (value === 1) {
      const data = {
        userId: sessionManager.getDataFromCookies("userId"),
        searchValue: search,
        searchKeys: ["transactionHash", "trxLable"],
        search: value.toString(),
      };
      const response = await UserService.Search(data);
      setAddress(response);
    }
    if (value === 2) {
      const data = {
        userId: sessionManager.getDataFromCookies("userId"),
        searchValue: search,
        searchKeys: ["address", "tagName"],
        search: value.toString(),
      };
      const response = await UserService.Search(data);
      setPrivateAddress(response);
    }
  }

  // const filteredProducts = address.filter((product) => {
  //   if (
  //     product.tags.toLowerCase().includes(search) ||
  //     product.title.toLowerCase().includes(search) ||
  //     product.category.toLowerCase().includes(search)
  //   ) {
  //     return product;
  //   }
  // });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [list, setList] = React.useState({});
  const [totalCount, setTotalCount] = React.useState(5);

  const onChangeWatchlistPage = async (value) => {
    await setList(Math.ceil(value.selected * 5));
    await getListOfWatchlist({ skip: list, limit: "5" });
  };

  const onChangeTxnLabelPage = async (value) => {
    setList(Math.ceil(value.selected * 5));
    getListOfTxnLabel({ skip: list, limit: "5" });
  };

  const onChangeTagAddressPage = async (value) => {
    await setList(Math.ceil(value.selected * 5));
    await getListOfTagAddress({ skip: list, limit: "5" });
  };

  const getListOfWatchlist = async (requestData) => {
    const request = {
      limit: requestData?.limit || "5",
      skip: requestData?.skip || list,
      userId: sessionManager.getDataFromCookies("userId"),
      isWatchlistAddress: true,
    };
    const response = await UserService.getWatchlistList(request);
    setWatchlist(response.watchlistContent);
    setTotalCount(response.totalCount);
  };

  const getListOfTxnLabel = async (requestData) => {
    const request = {
      limit: requestData?.limit || "5",
      skip: requestData?.skip || list,
      userId: sessionManager.getDataFromCookies("userId")
    };
    const response = await UserService.getTxnLabelList(request);
    setAddress(response.txnLabelContent);
    setTotalCount(response.totalCount);
  };

  const getListOfTagAddress = async (requestData) => {
    const request = {
      limit: requestData?.limit || "5",
      skip: requestData?.skip || list,
      userId: sessionManager.getDataFromCookies("userId"),
      isTaggedAddress: true,
    };
    const response = await UserService.getTagAddresstList(request);
    setPrivateAddress(response.tagAddressContent);
    setTotalCount(response.totalCount);
  };

  const sortByAddedOn = () => {
    let oldData = address;
    let newData;
    if (addedOnToggle === 0) {
      newData = oldData.sort(
        (index1, index2) => index2?.addedOn - index1?.addedOn
      );
      setAddedOnToggle(1);
    } else {
      newData = oldData.sort(
        (index1, index2) => index1?.addedOn - index2?.addedOn
      );
      setAddedOnToggle(0);
    }
    setAddress(newData);
  };

  const sortByBalance = () => {
    let oldData = watchlist;
    let newData;
    if (balanceToggle === 0) {
      newData = oldData.sort(
        (index1, index2) => index1?.balance - index2?.balance
      );
      setBalanceToggle(1);
    } else {
      newData = oldData.sort(
        (index1, index2) => index2?.balance - index1?.balance
      );
      setBalanceToggle(0);
    }
    setWatchlist(newData);
  };

  const sortByTagName = () => {
    let oldData = privateAddress;
    let newData;
    if (nameToggle === 0) {
      newData = oldData.sort((index1, index2) =>
        index1.tagName.localeCompare(index2.tagName)
      );
      setNameToggle(1);
    } else {
      newData = oldData.sort((index1, index2) =>
        index2.tagName.localeCompare(index1.tagName)
      );
      setNameToggle(0);
    }
    setPrivateAddress(newData);
  };
  const setUserName = () => {
    let name = sessionManager.getDataFromCookies("userInfo");
    if (!name) {
      window.location.href = "/";
    } else {
      console.log("name", name);
      let userName = name.name;
      return userName;
    }
  };
  const handleWatchlist = () => {
    setTablevalue(1);
    setDownloadActive(0);
  };
  const handlePrivateNote = () => {
    setTablevalue(2);
    setDownloadActive(0);
  };
  const handleTagAddress = () => {
    setTablevalue(3);
    setDownloadActive(0);
  };

  const handleWatchlistCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allselect") {
      let tempAddress = watchlist.map((addr) => {
        return { ...addr, isChecked1: checked };
      });

      setWatchlist(tempAddress);
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked1 === true) {
          return addr;
        }
      });
      if (tempAddr.length > 0) {
        setDownloadActive(1);
      } else {
        setDownloadActive(0);
      }

      setDownloadWatchlist(
        tempAddress.map((item) => {
          return {
            Address: item.address,
            Description: item.description,
            Balance: item.balance,
            AddedOn: moment(item.addedOn).format("h:mm a, Do MMMM YYYY "),
            Notification: item.notification.type==="NO" ? "Off": "Email",
          };
        })
      );
    } else {
      let tempAddress = watchlist.map((addr) =>
        addr._id === name ? { ...addr, isChecked1: checked } : addr
      );
      setWatchlist(tempAddress);
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked1 === true) {
          return addr;
        }
      });
      if (tempAddr.length > 0) {
        setDownloadActive(1);
      } else {
        setDownloadActive(0);
      }
      setDownloadWatchlist(
        tempAddr.map((item) => {
          return {
            Address: item.address,
            Description: item.description,
            Balance: item.balance,
            AddedOn: moment(item.addedOn).format("h:mm a, Do MMMM YYYY "),
            Notification: item.notification.type==="NO" ? "Off": "Email",
          };
        })
      );
    }
  };

  const handlePvtNoteCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allselect") {
      let tempAddress = address.map((addr) => {
        return { ...addr, isChecked2: checked };
      });

      setAddress(tempAddress);
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked2 === true) {
          return addr;
        }
      });
      if (tempAddr.length > 0) {
        setDownloadActive(1);
      } else {
        setDownloadActive(0);
      }

      setDownloadTxnPvtNote(
        tempAddress.map((item) => {
          return {
            TransactionHash: item.transactionHash,
            Note: item.trxLable,
            AddedOn: moment(item.addedOn).format("h:mm a, Do MMMM YYYY "),
          };
        })
      );
    } else {
      let tempAddress = address.map((addr) =>
        addr._id === name ? { ...addr, isChecked2: checked } : addr
      );
      setAddress(tempAddress);
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked2 === true) {
          return addr;
        }
      });
      if (tempAddr.length > 0) {
        setDownloadActive(1);
      } else {
        setDownloadActive(0);
      }
      setDownloadTxnPvtNote(
        tempAddr.map((item) => {
          return {
            TransactionHash: item.transactionHash,
            Note: item.trxLable,
            AddedOn: moment(item.addedOn).format("h:mm a, Do MMMM YYYY "),
          };
        })
      );
    }
  };

  const handleTagAddressCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allselect") {
      let tempAddress = privateAddress.map((addr) => {
        return { ...addr, isChecked3: checked };
      });

      setPrivateAddress(tempAddress);
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked3 === true) {
          return addr;
        }
      });
      if (tempAddr.length > 0) {
        setDownloadActive(1);
      } else {
        setDownloadActive(0);
      }

      setDownloadTagAddress(
        tempAddress.map((item) => {
          return {
            Address: item.address,
            NameTag: item.tagName,
            AddedOn: moment(item.addedOn).format("h:mm a, Do MMMM YYYY "),
          };
        })
      );
    } else {
      let tempAddress = privateAddress.map((addr) =>
        addr._id === name ? { ...addr, isChecked3: checked } : addr
      );
      setPrivateAddress(tempAddress);
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked3 === true) {
          return addr;
        }
      });
      if (tempAddr.length > 0) {
        setDownloadActive(1);
      } else {
        setDownloadActive(0);
      }
      setDownloadTagAddress(
        tempAddr.map((item) => {
          return {
            Address: item.address,
            NameTag: item.tagName,
            AddedOn: moment(item.addedOn).format("h:mm a, Do MMMM YYYY "),
          };
        })
      );
    }
  };

  return (
    <div>
      <Tokensearchbar />

      <div className="maindiv">
        <div className="heading">
          <span>
            <img
              className="icon"
              src={
                sessionManager.getDataFromCookies(cookiesConstants.USER_PICTURE) || require("../../assets/images/Profile.png")}
            />
          </span>
          <span>
            <div className="nameicon">
              <span className="welcome">
                Welcome, {Utils.shortenUserName(setUserName())}
              </span>
            </div>
            <div className="edit">
              <Editprofile />
            </div>
          </span>
          <span className="notificationBell">
            <NotificationBar />
          </span>
        </div>
        <div className="divbox">
          <Watchlist />

          <Transaction />
          <Private />
        </div>

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
                onClick={handleWatchlist}
              />
              <Tab
                label="Txn Private Note"
                className={classes.txnprivate}
                {...a11yProps(1)}
                onClick={handlePrivateNote}
              />
              <Tab
                label="Tagged Adresses"
                className={classes.address}
                {...a11yProps(2)}
                onClick={handleTagAddress}
              />
            </Tabs>
          </AppBar>
          <div className="line"></div>
          <div className="searchdiv">
            <div className="searchBar">
              <SearchIcon
                style={{
                  color: "#9fa9ba",
                  marginLeft: "6px",
                }}
              />

              <input
                type="text"
                placeholder="Search"
                className="searchinput"
                onClick={searchData}
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
              />
            </div>
            {isDownloadActive ? (
              tableValue === 1 ? (
                <CSVLink
                  filename={"watchlist.csv"}
                  data={downloadWatchlist}
                  style={{
                    fontSize: "0.938rem",
                    textAlign: "center",
                    color: "#ffffff",
                    backgroundColor: "rgb(7 125 245)",
                    borderRadius: "0.25rem",
                    width: "5.875rem",
                    height: "2.125rem",
                    marginRight: "1.5rem",
                    paddingTop: "0.125rem",
                  }}
                >
                  Export
                </CSVLink>
              ) : tableValue === 2 ? (
                <CSVLink
                  filename={"private_note.csv"}
                  data={downloadTxnPvtNote}
                  style={{
                    fontSize: "0.938rem",
                    textAlign: "center",
                    color: "#ffffff",
                    backgroundColor: "rgb(7 125 245)",
                    borderRadius: "0.25rem",
                    width: "5.875rem",
                    height: "2.125rem",
                    marginRight: "1.5rem",
                    paddingTop: "0.125rem",
                  }}
                >
                  Export
                </CSVLink>
              ) : (
                <CSVLink
                  filename={"tag_address.csv"}
                  data={downloadTagAddress}
                  style={{
                    fontSize: "0.938rem",
                    textAlign: "center",
                    color: "#ffffff",
                    backgroundColor: "rgb(7 125 245)",
                    borderRadius: "0.25rem",
                    width: "5.875rem",
                    height: "2.125rem",
                    marginRight: "1.5rem",
                    paddingTop: "0.125rem",
                  }}
                >
                  Export
                </CSVLink>
              )
            ) : (
              <CSVLink
                filename={"tag_address.csv"}
                data={downloadTagAddress}
                style={{
                  pointerEvents: "none",
                  fontSize: "0.938rem",
                  textAlign: "center",
                  color: "#ffffff",
                  backgroundColor: "#9fa9ba",
                  borderRadius: "0.25rem",
                  width: "5.875rem",
                  height: "2.125rem",
                  marginRight: "1.5rem",
                  paddingTop: "0.125rem",
                }}
              >
                Export
              </CSVLink>
            )}
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
                          <input
                            onChange={handleWatchlistCheckbox}
                            type="checkbox"
                            name="allselect"
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          <span className={"tableheaders"}>Address</span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}>Description</span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}>Balance</span>
                          <button className={classes.btn}>
                            <ArrowUpwardIcon
                              onClick={sortByBalance}
                              style={{
                                color: "#3763dd",
                                height: "20px",
                                width: "15px",
                                marginLeft: "5px",
                              }}
                            />
                          </button>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}>Added On</span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}>Notification</span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"} />
                        </TableCell>
                        {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {watchlist && watchlist.length>0  && watchlist.map((row, index) => {
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
                              <input
                                key={row._id}
                                name={row._id}
                                onChange={handleWatchlistCheckbox}
                                type="checkbox"
                                checked={row?.isChecked1 || false}
                                style={{ marginRight: "8px" }}
                              />
                              <a
                                className="linkTable"
                                href={"/address-details/" + row.address}
                              >
                                <Tooltip placement="top" title={row.address}>
                                  <span className="tabledata1">
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
                              <span className="tabledata">{row.balance}</span>
                              {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className="tabledata">
                                {moment(row.addedOn).format(
                                  "hh:mm A, D MMMM YYYY "
                                )}
                              </span>
                              {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className="tabledata">
                                {row.notification.type==="NO" ? "Off": "Email"}
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <EditWatchList row={row}  getWatchlistList ={getListOfWatchlist}/>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
            <PaginationDiv>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={totalCount / 5}
                breakLabel={"..."}
                initialPage={0}
                onPageChange={onChangeWatchlistPage}
                containerClassName={"paginationBttns"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </PaginationDiv>
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
                          <input
                            onChange={handlePvtNoteCheckbox}
                            type="checkbox"
                            name="allselect"
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          <span className={"tableheaders"}>
                            Transaction Hash
                          </span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}>Note</span>
                        </TableCell>
                        {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Balance</span>
                            </TableCell> */}
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}>Added On</span>
                          {/* <span> */}
                          <button className={classes.btn}>
                            <ArrowUpwardIcon
                              onClick={sortByAddedOn}
                              style={{
                                color: "#3763dd",
                                height: "20px",
                                width: "15px",
                                marginLeft: "5px",
                              }}
                            />
                          </button>
                          {/* </span> */}
                        </TableCell>
                        {/* <TableCell
                                style={{ border: "none", paddingLeft: "1%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Notification</span>
                            </TableCell> */}
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}></span>
                        </TableCell>
                        {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {address.map((row, index) => {
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
                              <input
                                key={row._id}
                                name={row._id}
                                onChange={handlePvtNoteCheckbox}
                                type="checkbox"
                                checked={row?.isChecked2 || false}
                                style={{ marginRight: "8px" }}
                              />
                              <a
                                className="linkTable"
                                href={
                                  "/transaction-details/" + row.transactionHash
                                }
                              >
                                <Tooltip
                                  placement="top"
                                  title={row.transactionHash}
                                >
                                  <span className="tabledata1">
                                    {shorten(row.transactionHash)}{" "}
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
                              <span className="tabledata">
                                {" "}
                                {moment(row.addedOn).format(
                                  "hh:mm A, D MMMM YYYY "
                                )}{" "}
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <EditTxnLabel row={row} getListOfTxnLabel={getListOfTxnLabel} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
            <PaginationDiv>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={totalCount / 5}
                breakLabel={"..."}
                initialPage={0}
                onPageChange={onChangeTxnLabelPage}
                containerClassName={"paginationBttns"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </PaginationDiv>
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
                          <input
                            onChange={handleTagAddressCheckbox}
                            type="checkbox"
                            name="allselect"
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          <span className={"tableheaders"}>Address</span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}>Name Tag</span>
                          <button className={classes.btn}>
                            <ArrowUpwardIcon
                              onClick={sortByTagName}
                              style={{
                                color: "#3763dd",
                                height: "20px",
                                width: "15px",
                                marginLeft: "5px",
                              }}
                            />
                          </button>
                        </TableCell>
                        {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Balance</span>
                            </TableCell> */}
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}>Added On</span>
                        </TableCell>
                        {/* <TableCell
                                style={{ border: "none", paddingLeft: "1%" }}
                                align="left"
                            >
                                <span className={"tableheaders"}>Notification</span>
                            </TableCell> */}
                        <TableCell style={{ border: "none" }} align="left">
                          <span className={"tableheaders"}></span>
                        </TableCell>
                        {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {privateAddress.map((row, index) => {
                        let tag = row.tagName;
                        let name = tag?.charAt(0).toUpperCase() + tag.slice(1);

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
                              <input
                                key={row._id}
                                name={row._id}
                                onChange={handleTagAddressCheckbox}
                                type="checkbox"
                                checked={row?.isChecked3 || false}
                                style={{ marginRight: "8px" }}
                              />
                              <a
                                className="linkTable"
                                href={"/address-details/" + row.address}
                              >
                                <Tooltip placement="top" title={row.address}>
                                  <span className="tabledata1">
                                    {shorten(row.address)}
                                  </span>
                                </Tooltip>
                              </a>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className="tabledata">{name}</span>
                            </TableCell>

                            <TableCell style={{ border: "none" }} align="left">
                              <span className="tabledata">
                                {moment(row.addedOn).format(
                                  "hh:mm A, D MMMM YYYY "
                                )}{" "}
                              </span>
                              {/* </a> */}
                            </TableCell>

                            <TableCell style={{ border: "none" }} align="left">
                              <EditTagAddress row={row} getListOfTagAddress={getListOfTagAddress} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
            <PaginationDiv>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={totalCount / 5}
                breakLabel={"..."}
                initialPage={0}
                onPageChange={onChangeTagAddressPage}
                containerClassName={"paginationBttns"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </PaginationDiv>
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
