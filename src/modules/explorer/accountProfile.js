import React from "react";
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
import { CSVLink } from "react-csv";
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
import { sessionManager } from "../../managers/sessionManager";
import { cookiesConstants } from "../constants";
import Utils from "../../utility";
import { red } from "@material-ui/core/colors";

const PaginationDiv = styled.div`
  margin-left: auto;
  margin-right: 0;
}
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
  error: {
    color: "red",
    paddingLeft: "24px",
  },
  error1: {
    color: "red",
    paddingLeft: "12px",
  },
  PrivateTabIndicatorColorSecondary57: {
    backgroundColor: "#2149b9",
  },
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
    //color: "#6b7482",
    textTransform: "none",
    //color: "#2149b9",
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
  "@media (min-width:0px) and (max-width: 714px)": {
    appbar: {
      Width: "300px",
      width: "100%",
      padding: "0 7px",
    },
    tab1: {
      color: "#2149b9 !important",
      textTransform: "initial",
      fontSize: "0.722rem",
    },
    tab2: {
      color: "#6b7482",
      textTransform: "initial",
      fontSize: "0.722rem"
    },
  },
  "@media (max-width: 828px)": {
    appbar: {
      maxWidth: "710px",
      width: "100%",
      padding: "0 10px",
    },
  },

  "@media (max-width: 714px)": {
    // appbar: {
    //   maxWidth: "375px",
    //   width: "100%",
    //   padding: "0 7px",
    // },

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
      // color: "#6b7482",
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
  tab1: {
    color: "#2149b9 !important",
    textTransform: "initial",
  },
  tab2: {
    color: "#6b7482",
    textTransform: "initial",
  },
  noData: {
    width: "auto",
    height: "19px",
    margin: "25px 15px 0 480px",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",

    color: "#c6cbcf",
  },
  alert: {
    margin: "110px 0 0 580px",
  },

  // Rectangle: {
  //   width: "14px",
  //   height: "14px",
  //   margin: "1px 15px 17px 21px",
  //   borderRadius: "2px",
  //   border: "solid 1px #e3e7eb",
  //   backgroundColor: "var(--white-two)"
  // }
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
  // const [userName, setUserName] = React.useState([]);
  const [privateAddress, setPrivateAddress] = React.useState([]);
  const [exports, exportAddress] = React.useState({});
  const [toggle, handleToggle] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

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
      // setWatchlist(response);
      setTotalCount1(response.length);
      setTablevalue(1);
    }
    getuserdata();
    async function getuserdata() {
      const data = sessionManager.getDataFromCookies("userId");
      const response = await UserService.getUserPrivateNote(data);
      // setAddress(response);
      setTotalCount2(response.length);
    }
    getPvtTagAddress();
    async function getPvtTagAddress() {
      const data = sessionManager.getDataFromCookies("userId");
      const response = await UserService.getPrivateTagToAddress(data);
      // setPrivateAddress(response);
      setTotalCount3(response.length);
    }
  }, []);

  const [watchlistPageCount, setWatchlistPageCount] = React.useState({});
  const [pvtNotePageCount, setPvtNotePageCount] = React.useState({});
  const [tagPageCount, setTagPageCount] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [dataNotFound, setDataNotFound] = React.useState("");
  const [addressNotAdded, setAddressNotAdded] = React.useState(true);
  const [watchListNotAdded, setWatchListNotAdded] = React.useState(true);
  const [txnAddressNotAdded, setTxnAddressNotAdded] = React.useState(true);

  async function searchData(event) {
    if (value === 0) {
      const searchValue = event.target.value;
      setSearch(searchValue);
      setDataNotFound("");
      const data = {
        userId: sessionManager.getDataFromCookies("userId"),
        searchValue: searchValue,
        searchKeys: ["description", "address"],
        search: value.toString(),
      };
      if (!searchValue) {
        onChangeWatchlistPage(watchlistPageCount);
      } else {
        const [error, response] = await Utils.parseResponse(
          UserService.Search(data)
        );
        if (error || !response) {
          setDataNotFound("Data not found");
        } else {
          setWatchlist(response);
        }
      }
    }

    if (value === 1) {
      const searchValue = event.target.value;
      setSearch(searchValue);
      setDataNotFound("");
      const data = {
        userId: sessionManager.getDataFromCookies("userId"),
        searchValue: searchValue,
        searchKeys: ["transactionHash", "trxLable"],
        search: value.toString(),
      };
      if (!searchValue) {
        onChangeTxnLabelPage(pvtNotePageCount);
      } else {
        const [error, response] = await Utils.parseResponse(
          UserService.Search(data)
        );

        if (error || !response) {
          setDataNotFound("Data Not Found");
        } else {
          setAddress(response);
        }
      }
    }

    if (value === 2) {
      const searchValue = event.target.value;
      setSearch(searchValue);
      setDataNotFound("");
      const data = {
        userId: sessionManager.getDataFromCookies("userId"),
        searchValue: searchValue,
        searchKeys: ["address", "tagName"],
        search: value.toString(),
      };
      if (!searchValue) {
        onChangeTagAddressPage(tagPageCount);
      } else {
        const [error, response] = await Utils.parseResponse(
          UserService.Search(data)
        );
        if (error || !response) {
          setDataNotFound("Data not found");
        } else {
          setPrivateAddress(response);
        }
      }
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleMultipleTag(tag) {
    let tagWords = [];
    tagWords = tag.split(",");
    return tagWords;
  }

  const list = {};
  const [totalCount1, setTotalCount1] = React.useState(5);
  const [totalCount2, setTotalCount2] = React.useState(5);
  const [totalCount3, setTotalCount3] = React.useState(5);

  // Edit box Popup Handlers
  const [editBoxOpen, setEditBox] = React.useState(false);
  const [selectedEditAddress, setSelectedAddress] = React.useState(false);
  const handleClickOpen = (value) => {
    setEditBox(true);
    setSelectedAddress(value)
  };
  const handleClose = async () => {

    setEditBox(false);
  };

  // Edit Handlers Done
  const onChangeWatchlistPage = async (value) => {
    setWatchlistPageCount(value);
    const list = Math.ceil(value.selected * 5);
    await getListOfWatchlist({ skip: list, limit: "5" });
  };

  const onChangeTxnLabelPage = async (value) => {
    setPvtNotePageCount(value);
    const list = Math.ceil(value.selected * 5);
    await getListOfTxnLabel({ skip: list, limit: "5" });
  };

  const onChangeTagAddressPage = async (value) => {
    setTagPageCount(value);
    const list = Math.ceil(value.selected * 5);
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

    if (response.totalCount > 0) {
      setAddressNotAdded(false);
    }
    setWatchlist(response.watchlistContent);
  };

  const getListOfTxnLabel = async (requestData) => {
    const request = {
      limit: requestData?.limit || "5",
      skip: requestData?.skip || list,
      userId: sessionManager.getDataFromCookies("userId"),
    };
    const response = await UserService.getTxnLabelList(request);
    if (response.totalCount > 0) {
      setWatchListNotAdded(false);
    }
    setAddress(response.txnLabelContent);
  };

  const getListOfTagAddress = async (requestData) => {
    const request = {
      limit: requestData?.limit || "5",
      skip: requestData?.skip || list,
      userId: sessionManager.getDataFromCookies("userId"),
      isTaggedAddress: true,
    };
    const response = await UserService.getTagAddresstList(request);
    if (response.totalCount > 0) {
      setTxnAddressNotAdded(false);
    }
    setPrivateAddress(response.tagAddressContent);
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

  const [countWatchlist, setCountWatchlist] = React.useState(-1);
  const [checkedWatchlist, setCheckedWatchlist] = React.useState(false);
  let watchlistLength = watchlist.length;

  const handleWatchlistCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allselect" || countWatchlist === watchlistLength) {
      if (checkedWatchlist === false) {
        setCheckedWatchlist(false);
      } else {
        setCheckedWatchlist(false);
      }
      if (countWatchlist === watchlistLength) {
        setCheckedWatchlist(false);
      }
      setCountWatchlist(-1);

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
            Notification: item.notification.type === "NO" ? "Off" : "Email",
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
      setCountWatchlist(tempAddr.length);
      setCheckedWatchlist(false);

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
            Notification: item.notification.type === "NO" ? "Off" : "Email",
          };
        })
      );
    }
  };

  const [countNote, setCountNote] = React.useState(-1);
  const [checkedNote, setCheckedNote] = React.useState(false);
  let pvtNoteLength = address.length;

  const handlePvtNoteCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allselect" || countNote === pvtNoteLength) {
      if (checkedNote === false) {
        setCheckedNote(true);
      } else {
        setCheckedNote(false);
      }
      if (countNote === pvtNoteLength) {
        setCheckedNote(false);
      }
      setCountNote(0);
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
      setCountNote(tempAddr.length);
      setCheckedNote(false);

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

  const [countTag, setCountTag] = React.useState(-1);
  const [checkedTag, setCheckedTag] = React.useState(false);
  let tagAddrLength = privateAddress.length;

  const handleTagAddressCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "allselect" || countTag === tagAddrLength) {
      if (checkedTag === false) {
        setCheckedTag(true);
      } else {
        setCheckedTag(false);
      }
      if (countTag === tagAddrLength) {
        setCheckedTag(false);
      }
      setCountTag(0);
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
      setCountTag(tempAddr.length);
      setCheckedTag(false);
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
              style={{ borderRadius: "50px" }}
              src={
                sessionManager.getDataFromCookies(
                  cookiesConstants.USER_PICTURE
                ) || "/images/Profile.png"
              }
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
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#2149b9",
                },
              }}
            >
              <Tab
                label="My Watchlist"
                // className={classes.mywatch}
                className={value === 0 ? classes.tab1 : classes.tab2}
                {...a11yProps(0)}
                onClick={handleWatchlist}
              />
              <Tab
                label="Txn Private Note"
                className={classes.txnprivate}
                className={value === 1 ? classes.tab1 : classes.tab2}
                {...a11yProps(1)}
                onClick={handlePrivateNote}
              />
              <Tab
                label="Tagged Adresses"
                className={classes.address}
                className={value === 2 ? classes.tab1 : classes.tab2}
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
                onChange={searchData}
                // onChange={(e) => {
                //   setSearch(e.target.value.toLowerCase());
                // }}
                value={search}
              />
            </div>
            {!isDownloadActive && tableValue === 1 ? (
              ""
            ) : isDownloadActive ? (
              tableValue === 1 ? (
                ""
              ) : // <CSVLink
                //   filename={"watchlist.csv"}
                //   data={downloadWatchlist}
                //   style={{
                //     fontSize: "0.938rem",
                //     textAlign: "center",
                //     color: "#ffffff",
                //     backgroundColor: "rgb(7 125 245)",
                //     borderRadius: "0.25rem",
                //     width: "5.875rem",
                //     height: "2.125rem",
                //     marginRight: "1.5rem",
                //     paddingTop: "0.125rem",
                //   }}
                // >
                //   Export
                // </CSVLink>
                tableValue === 2 ? (
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
            <div className="griddiv add-root">
              {addressNotAdded ? (
                <div style={{ height: "512px" }}>
                  <Grid
                    className="tablegrid_no_data"
                    style={{ borderBottom: "2px solid #f9f9f9" }}
                  >
                    <Grid
                      component={Paper}
                      style={{ boxShadow: "0px 0px 0px 0px" }}
                    >
                      <Table
                        className="table w-700-a w-1500-a"
                        aria-label="Latest Transactions"
                        style={{ boxShadow: "0px 0px 0px 0px" }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheadersWatchlist"}>
                                Address
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Description
                              </span>
                            </TableCell>
                            <TableCell
                              style={{
                                border: "none",
                                display: "flex",
                                lineHeight: "21px",
                              }}
                              align="left"
                            >
                              <span className={"tableheaders-1"}>Balance</span>
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
                              <span className={"tableheaders-1"}>Added On</span>
                            </TableCell>
                            <TableCell
                              style={{ border: "none", marginBottom: "160px" }}
                              align="left"
                            >
                              <span className={"tableheaders-1"}>
                                Notification
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"} />
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </Grid>
                  </Grid>
                  <img
                    className={classes.alert}
                    src={require("../../../src/assets/images/XDC-Alert.svg")}
                  ></img>

                  <div className={classes.noData}>
                    No address added to watchlist
                  </div>
                </div>
              ) : (
                <Grid lg={13} className="tablegrid_address">
                  {dataNotFound ? (
                    <div style={{ height: "512px" }}>
                      <Grid
                        className="tablegrid_no_data"
                        style={{ borderBottom: "2px solid #f9f9f9" }}
                      >
                        <Grid
                          component={Paper}
                          style={{ boxShadow: "0px 0px 0px 0px" }}
                        >
                          <Table
                            className="table w-700-a w-1500-a"
                            aria-label="Latest Transactions"
                            style={{ boxShadow: "0px 0px 0px 0px" }}
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheadersWatchlist"}>
                                    Address
                                  </span>
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Description
                                  </span>
                                </TableCell>
                                <TableCell
                                  style={{
                                    border: "none",
                                    display: "flex",
                                    lineHeight: "21px",
                                  }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Balance
                                  </span>
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
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Added On
                                  </span>
                                </TableCell>
                                <TableCell
                                  style={{
                                    border: "none",
                                    marginBottom: "160px",
                                  }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Notification
                                  </span>
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"} />
                                </TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </Grid>
                      </Grid>
                      <img
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      ></img>

                      <div
                        className={classes.noData}
                        style={{ marginLeft: "538px" }}
                      >
                        Data Not Found
                      </div>
                    </div>
                  ) : (
                    <Grid
                      component={Paper}
                      style={{ boxShadow: "0px 0px 0px 0px" }}
                    >
                      <Table
                        className="table w-700-a w-1500-a"
                        aria-label="Latest Transactions"
                        style={{ boxShadow: "0px 0px 0px 0px" }}
                      >
                        <TableHead>
                          <TableRow>
                            {/* <TableCell style={{ border: "none" }} align="left">
                          <input
                            onChange={handleWatchlistCheckbox}
                            type="checkbox"
                            name="allselect"
                            checked={countWatchlist === watchlistLength || checkedWatchlist == true}
                            style={{
                              marginRight: "10px",
                              border: "solid 1px #e3e7eb"
                            }}
                          />
                          </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheadersWatchlist"}>
                                Address
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Description
                              </span>
                            </TableCell>
                            <TableCell
                              style={{
                                border: "none",
                                display: "flex",
                                lineHeight: "21px",
                              }}
                              align="left"
                            >
                              <span className={"tableheaders-1"}>Balance</span>
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
                              <span className={"tableheaders-1"}>Added On</span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Notification
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"} />
                            </TableCell>
                            {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders-1"}>Txn Fee</span></TableCell> */}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {watchlist &&
                            watchlist.length > 0 &&
                            watchlist.map((row, index) => {
                              return (
                                <TableRow
                                  style={
                                    index % 2 !== 1
                                      ? { background: "#f9f9f9" }
                                      : { background: "white" }
                                  }
                                >
                                  {/* <TableCell
                              style={{ border: "none" }}
                              margin-left="5px"
                            >
                              <input
                                key={row._id}
                                name={row._id}
                                onChange={handleWatchlistCheckbox}
                                type="checkbox"
                                checked={row?.isChecked1 || false}
                                style={{ marginTop: "4px" ,border: "solid 1px #e3e7eb"}}
                              />
                              </TableCell> */}
                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <a
                                      className="linkTable1"
                                      href={"/address-details/" + row.address}
                                    >
                                      <Tooltip
                                        placement="top"
                                        title={row.address}
                                      >
                                        <span className="tabledataWatchlist">
                                          {shorten(row.address)}{" "}
                                        </span>
                                      </Tooltip>
                                    </a>
                                  </TableCell>
                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <span className="tabledata-1">
                                      {row.description}
                                    </span>
                                  </TableCell>
                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <span className="tabledata-1">
                                      {row.balance}
                                    </span>
                                    {/* </a> */}
                                  </TableCell>
                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <span className="tabledata-1">
                                      {moment(row.addedOn).format(
                                        "hh:mm A, D MMMM YYYY "
                                      )}
                                    </span>
                                    {/* </a> */}
                                  </TableCell>
                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <span className="tabledata-1">
                                      {row.notification.type === "NO"
                                        ? "Off"
                                        : "Email"}
                                    </span>
                                  </TableCell>
                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <EditWatchList
                                      row={row}
                                      getWatchlistList={getListOfWatchlist}
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </Grid>
                  )}
                </Grid>
              )}
            </div>
            <PaginationDiv>
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={totalCount1 / 5}
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
              {watchListNotAdded ? (
                <div style={{ height: "512px" }}>
                  <Grid
                    className="tablegrid_no_data"
                    style={{ borderBottom: "2px solid #f9f9f9" }}
                  >
                    <Grid
                      component={Paper}
                      style={{ boxShadow: "0px 0px 0px 0px" }}
                    >
                      <Table
                        className="table w-700-a w-1500-a"
                        aria-label="Latest Transactions"
                        style={{ boxShadow: "0px 0px 0px 0px" }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ border: "none" }} align="left">
                              <input
                                // className={classes.Rectangle}
                                onChange={handlePvtNoteCheckbox}
                                type="checkbox"
                                name="allselect"
                                checked={
                                  countNote === pvtNoteLength ||
                                  checkedNote == true
                                }
                                style={{
                                  marginRight: "10px",
                                  border: "solid 1px #e3e7eb",
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Transaction Hash
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Note</span>
                            </TableCell>
                            {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Added On</span>
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

                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}></span>
                            </TableCell>
                            {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders-1"}>Txn Fee</span></TableCell> */}
                          </TableRow>
                        </TableHead>
                      </Table>
                    </Grid>
                  </Grid>
                  <img
                    className={classes.alert}
                    src={require("../../../src/assets/images/XDC-Alert.svg")}
                  ></img>

                  <div className={classes.noData}>
                    No Hash added to Priavte Note
                  </div>
                </div>
              ) : (
                <Grid
                  className="tablegrid_no_data"
                  style={{ borderBottom: "2px solid #f9f9f9" }}
                >
                  {dataNotFound ? (
                    <div style={{ height: "512px" }}>
                      <Grid
                        className="tablegrid_no_data"
                        style={{ borderBottom: "2px solid #f9f9f9" }}
                      >
                        <Grid
                          component={Paper}
                          style={{ boxShadow: "0px 0px 0px 0px" }}
                        >
                          <Table
                            className="table w-700-a w-1500-a"
                            aria-label="Latest Transactions"
                            style={{ boxShadow: "0px 0px 0px 0px" }}
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <input
                                    // className={classes.Rectangle}
                                    onChange={handlePvtNoteCheckbox}
                                    type="checkbox"
                                    name="allselect"
                                    checked={
                                      countNote === pvtNoteLength ||
                                      checkedNote == true
                                    }
                                    style={{
                                      marginRight: "10px",
                                      border: "solid 1px #e3e7eb",
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Transaction Hash
                                  </span>
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>Note</span>
                                </TableCell>
                                {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Added On
                                  </span>
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

                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}></span>
                                </TableCell>
                                {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders-1"}>Txn Fee</span></TableCell> */}
                              </TableRow>
                            </TableHead>
                          </Table>
                        </Grid>
                      </Grid>
                      <img
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      ></img>

                      <div className={classes.noData}>
                        style={{ marginLeft: "538px" }}
                        Data Not Found
                      </div>
                    </div>
                  ) : (
                    <Grid
                      component={Paper}
                      style={{ boxShadow: "0px 0px 0px 0px" }}
                    >
                      <Table
                        className="table w-700-a w-1500-a"
                        aria-label="Latest Transactions"
                        style={{ boxShadow: "0px 0px 0px 0px" }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ border: "none" }} align="left">
                              <input
                                // className={classes.Rectangle}
                                onChange={handlePvtNoteCheckbox}
                                type="checkbox"
                                name="allselect"
                                checked={
                                  countNote === pvtNoteLength ||
                                  checkedNote == true
                                }
                                style={{
                                  marginRight: "10px",
                                  border: "solid 1px #e3e7eb",
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Transaction Hash
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Note</span>
                            </TableCell>
                            {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Added On</span>
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
                                <span className={"tableheaders-1"}>Notification</span>
                            </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}></span>
                            </TableCell>
                            {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders-1"}>Txn Fee</span></TableCell> */}
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
                                    style={{ marginTop: "4px" }}
                                  // className={classes.Rectangle}
                                  />
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <a
                                    className="linkTable1"
                                    href={
                                      "/transaction-details/" +
                                      row.transactionHash
                                    }
                                  >
                                    <Tooltip
                                      placement="top"
                                      title={row.transactionHash}
                                    >
                                      <span className="tabledata1">
                                        {Utils.shortenHash(row.transactionHash)}{" "}
                                      </span>
                                    </Tooltip>
                                  </a>
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className="tabledata-1">
                                    {row.trxLable}
                                  </span>
                                </TableCell>
                                {/* <TableCell style={{ border: "none" }} align="left">
                                        
                                            <span className="tabledata-1">{row.Balance}</span>
                                        
                                    </TableCell> */}
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className="tabledata-1">
                                    {" "}
                                    {moment(row.addedOn).format(
                                      "hh:mm A, D MMMM YYYY "
                                    )}{" "}
                                  </span>
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <EditTxnLabel
                                    row={row}
                                    getListOfTxnLabel={getListOfTxnLabel}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Grid>
                  )}
                </Grid>
              )}
            </div>
            <PaginationDiv>
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={totalCount2 / 5}
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
              {txnAddressNotAdded ? (
                <div style={{ height: "512px" }}>
                  <Grid
                    className="tablegrid_no_data"
                    style={{ borderBottom: "2px solid #f9f9f9" }}
                  >
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
                                checked={
                                  countTag === tagAddrLength ||
                                  checkedTag == true
                                }
                                className={classes.Rectangle}
                                style={{
                                  marginRight: "10px",
                                  border: "solid 1px #e3e7eb",
                                  backgroundColor: "red",
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Address</span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Name Tag</span>
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
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Added On</span>
                            </TableCell>

                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}></span>
                            </TableCell>
                            {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders-1"}>Txn Fee</span></TableCell> */}
                          </TableRow>
                        </TableHead>
                      </Table>
                    </Grid>
                  </Grid>{" "}
                  <img
                    className={classes.alert}
                    src={require("../../../src/assets/images/XDC-Alert.svg")}
                  ></img>
                  <div className={classes.noData}>

                    No Address added to Tagged Address
                  </div>
                </div>
              ) : (
                <Grid lg={13} className="tablegrid_address">
                  {dataNotFound ? (
                    <div style={{ height: "512px" }}>
                      <Grid
                        className="tablegrid_no_data"
                        style={{ borderBottom: "2px solid #f9f9f9" }}
                      >
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
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <input
                                    onChange={handleTagAddressCheckbox}
                                    type="checkbox"
                                    name="allselect"
                                    checked={
                                      countTag === tagAddrLength ||
                                      checkedTag == true
                                    }
                                    className={classes.Rectangle}
                                    style={{
                                      marginRight: "10px",
                                      border: "solid 1px #e3e7eb",
                                      backgroundColor: "red",
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Address
                                  </span>
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Name Tag
                                  </span>
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
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}>
                                    Added On
                                  </span>
                                </TableCell>

                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className={"tableheaders-1"}></span>
                                </TableCell>
                                {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders-1"}>Txn Fee</span></TableCell> */}
                              </TableRow>
                            </TableHead>
                          </Table>
                        </Grid>
                      </Grid>{" "}
                      <img
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      ></img>
                      <div className={classes.noData} style={{ marginLeft: "538px" }}>

                        Data Not Found
                      </div>
                    </div>
                  ) : (
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
                                checked={
                                  countTag === tagAddrLength ||
                                  checkedTag == true
                                }
                                className={classes.Rectangle}
                                style={{
                                  marginRight: "10px",
                                  border: "solid 1px #e3e7eb",
                                  backgroundColor: "red",
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Address</span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Name Tag</span>
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
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>Added On</span>
                            </TableCell>
                            {/* <TableCell
                                style={{ border: "none", paddingLeft: "1%" }}
                                align="left"
                            >
                                <span className={"tableheaders-1"}>Notification</span>
                            </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}></span>
                            </TableCell>
                            {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders-1"}>Txn Fee</span></TableCell> */}
                          </TableRow>
                        </TableHead>
                        {dataNotFound ? (
                          <TableRow>
                            <TableCell style={{ border: "none" }} />
                            <div className={classes.error}>{dataNotFound}</div>
                          </TableRow>
                        ) : (
                          <TableBody>
                            {privateAddress.map((row, index) => {
                              let tag = row.tagName;
                              // const multipleTag = handleMultipleTag(tag);

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
                                      // className={classes.Rectangle}
                                      type="checkbox"
                                      checked={row?.isChecked3 || false}
                                      style={{ marginTop: "4px" }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <a
                                      className="linkTable1"
                                      href={"/address-details/" + row.address}
                                    >
                                      <Tooltip
                                        placement="top"
                                        title={row.address}
                                      >
                                        <span className="tabledata1">
                                          {shorten(row.address)}
                                        </span>
                                      </Tooltip>
                                    </a>
                                  </TableCell>
                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <span className="tabledata-2">
                                      {tag.map((item, index) => {
                                        return (
                                          <div
                                            className="nameLabel2"
                                            key={index}
                                          >
                                            {item}
                                          </div>
                                        );
                                      })}
                                    </span>
                                  </TableCell>

                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <span className="tabledata-1">
                                      {moment(row.addedOn).format(
                                        "hh:mm A, D MMMM YYYY "
                                      )}
                                    </span>
                                    {/* </a> */}
                                  </TableCell>

                                  <TableCell
                                    style={{ border: "none" }}
                                    align="left"
                                  >
                                    <EditTagAddress
                                      row={row}
                                      getListOfTagAddress={getListOfTagAddress}
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        )}
                      </Table>
                    </Grid>
                  )}
                </Grid>
              )}
            </div>
            <PaginationDiv>
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={totalCount3 / 5}
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
