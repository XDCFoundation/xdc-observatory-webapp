import React from "react";
import moment from "moment-timezone";
import "../../assets/styles/profile.css";
import Transaction from "./dashboardPopup/transactionLable";
import Watchlist from "./dashboardPopup/watchlist";
import Private from "./dashboardPopup/private";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
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
import { Tabs, Avatar } from "@material-ui/core";
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
import { cookiesConstants } from "../../constants";
import Utils from "../../utility";
import { Column, Row } from "simple-flexbox";
import TransactionPDF from "../../common/components/transactionPDF";
import AddressPDF from "../../common/components/tagAddressPDF";
import { PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";
import { messages } from "../../constants";
import PrivacyAlert from "../explorer/dashboardPopup/privacyAlert";
import Utility from "../../utility";
import { useSelector } from "react-redux";
import format from "format-number";

const PaginationDiv = styled.div`
  margin-left: auto;
  margin-right: 0;
  @media (max-width: 1240px) {
    margin-bottom: 77px;
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

const styles = StyleSheet.create({
  pdfDownloadLink: {
    fontSize: "0.938rem",
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "rgb(7 125 245)",
    borderRadius: "0.25rem",
    width: "5.875rem",
    height: "2.125rem",
    marginRight: "1.5rem",
    paddingTop: "0.125rem",
  },
});

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
        <Box style={{ padding: "20px 0" }} className="p-l-r-15">
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
    maxWidth: "1190px",
    margin: "auto",
    borderRadius: "none",
    padding: "10px 0px",
    justifyContent: "space-around",
    textTransform: "none",
  },
  "@media(max-width: 767px)": {
    root: {
      width: "21rem",
    },
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

    textAlign: "center",
    color: "#6b7482",
    textTransform: "none",
  },

  "@media (max-width: 1920px)": {
    appbar: {
      maxWidth: "1248px",
      width: "100%",
    },
  },
  "@media (min-width:0px) and (max-width: 714px)": {
    appbar: {
      Width: "300px",
      width: "100%",
      // padding: "0 7px",
    },
    tab1: {
      color: "#2149b9 !important",
      textTransform: "initial",
      fontSize: "0.722rem",
    },
    tab2: {
      color: "#6b7482",
      textTransform: "initial",
      fontSize: "0.722rem",
    },
  },
  // "@media (max-width: 828px)": {
  //   appbar: {
  // maxWidth: "710px",
  // width: "25rem",
  //   },
  // },
  "@media (max-width: 767)": {
    appbar: {
      // maxWidth: "710px",
      width: "100%",
      padding: "0 15px",
    },
  },

  "@media (max-width: 714px)": {
    mywatch: {
      /* width: 100px; */
      height: "19px",
      /* margin: 65px 56.5px 10.5px 200px; */
      paddingLeft: "6px",
      fontFamily: "Inter",
      fontSize: "13px",
      fontWeight: "500",

      textAlign: "center",
      // color: "#2149b9",
    },
    txnprivate: {
      height: "19px",
      /* margin: 65px 67.5px 10.5px 8.5px; */
      paddingLeft: "6px",
      fontFamily: "Inter",
      fontSize: "13px",

      textAlign: "center",
      // color: "#6b7482",
    },
    address: {
      height: "19px",
      /* margin: 65px 314px 10.5px 2px; */
      paddingLeft: "0px",
      fontFamily: "Inter",
      fontSize: "13px",

      textAlign: "center",
      color: "#6b7482",
    },
    profileName: {
      color: "#252525",
      fontSize: "14px",
    },
    editProfile: {
      color: "#252525",
      fontSize: "14px",
    },
  },
  btn: {
    textAlign: "start",
    padding: "0px",
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
  },
  rotatedBtn: {
    textAlign: "start",
    padding: "0px",
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
    transform: "rotate(180deg)",
  },
  tab1: {
    color: "#2149b9 !important",
    textTransform: "initial",
    "@media (max-width: 767px)": {
      padding: "0px 6px",
    },
  },
  tab2: {
    color: "#6b7482",
    textTransform: "initial",
    "@media (max-width: 714px)": {
      padding: "0px 6px",
    },
  },
  noData: {
    width: "auto",
    height: "19px",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",

    color: "#c6cbcf",
  },
  alert: {
    // margin: "110px 0 0 580px",
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

const NoDataFoundContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  gap: 10px;
`;

const ParentProfile = styled.div`
  display: flex;

  @media (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const UserNameContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 40px auto;
  gap: 15px;
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  max-width: 1190px;
  width: 100%;
  align-items: center;

  @media (max-width: 850px) {
    ${
      "" /* padding: 0 10px 0 10px !important;
    flex-wrap : nowrap;
    max-width: 710px; */
    }
  }
  @media (min-width: 400px) and (max-width: 767px) {
    ${"" /* gap: 12px; */}
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 0px 15px !important;
  }

  @media (min-width: 450px) and (max-width: 850px) {
    ${"" /* gap: ${(props) => (props.isWallet ? "10px" : "10px")}; */}
  }

  @media (max-width: 767px) {
    ${"" /* justify-content: space-around; */}
    ${"" /* gap: 12px; */}
    margin-left: auto !important;
    margin: 12px 0px;
    margin-right: auto;
    width: 100%;
    padding: 0 15px;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 401px) and (max-width: 449px) {
    // gap: 30px;
  }
`;

const SubParentContainer = styled.div`
  @media (min-width: 768px) and (max-width: 1240px) {
    max-width: 41.5rem;
    margin: auto;
  }
`;
export default function SimpleTabs(props) {
  const timezone = useSelector((state) => state.timezone);

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
  // const [exports, exportAddress] = React.useState({});
  // const [toggle, handleToggle] = React.useState(false);
  // const [isLoading, setLoading] = React.useState(false);
  const _limit = 5;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const { state } = props;
  const [addedOnToggle, setAddedOnToggle] = React.useState(0);
  const [balanceToggle, setBalanceToggle] = React.useState("");
  const [nameToggle, setNameToggle] = React.useState(0);
  const [tableValue, setTablevalue] = React.useState(1);
  const [downloadWatchlist, setDownloadWatchlist] = React.useState([]);
  const [downloadTxnPvtNote, setDownloadTxnPvtNote] = React.useState([]);
  const [downloadTagAddress, setDownloadTagAddress] = React.useState([]);
  const [isDownloadActive, setDownloadActive] = React.useState(0);

  React.useEffect(() => {
    getUserWatchlist();
    getUserTxnLabel();
    getPvtTagAddress();
  }, []);

  async function getUserWatchlist() {
    const data = sessionManager.getDataFromCookies("userId");
    const response = await UserService.getUserWatchlist(data);
    // setWatchlist(response);
    setTotalCount1(response.length);
    setTablevalue(1);
  }

  async function getUserTxnLabel() {
    // const userId = sessionManager.getDataFromCookies("userId");
    // let transactionLabels = localStorage.getItem(userId + cookiesConstants.USER_TRASACTION_LABELS);
    // transactionLabels = JSON.parse(transactionLabels);
    // if (!transactionLabels)
    //   transactionLabels = [];
    // setTotalCount2(transactionLabels.length);
    getListOfTxnLabel({ skip: 0, _limit });
  }

  async function getPvtTagAddress() {}

  const [watchlistPageCount, setWatchlistPageCount] = React.useState({});
  const [pvtNotePageCount, setPvtNotePageCount] = React.useState({});
  const [tagPageCount, setTagPageCount] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [dataNotFound, setDataNotFound] = React.useState(false);
  const [addressNotAdded, setAddressNotAdded] = React.useState(true);
  const [watchListNotAdded, setWatchListNotAdded] = React.useState(true);
  const [txnAddressNotAdded, setTxnAddressNotAdded] = React.useState(true);

  const isPrivacyAccepted =
    sessionManager.getDataFromCookies("isPrivacyAccepted");
  async function searchData(event) {
    if (value === 0) {
      const searchValue = event.target.value;
      setSearch(searchValue);
      setDataNotFound(false);
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
          setDataNotFound(true);
        } else {
          let watchlists = localStorage.getItem(
            data.userId + cookiesConstants.USER_ADDRESS_WATCHLIST
          );
          watchlists = JSON.parse(watchlists);
          response.watchlistContent = response.watchlistContent.map((obj) => {
            obj.description =
              watchlists && watchlists[obj.address]
                ? watchlists[obj.address]
                : "";
            return obj;
          });
          setWatchlist(response);
        }
      }
    }

    if (value === 1) {
      const searchValue = event.target.value;
      setSearch(searchValue);
      setDataNotFound(false);
      const data = {
        userId: sessionManager.getDataFromCookies("userId"),
        searchValue: searchValue,
        searchKeys: ["transactionHash", "trxLable"],
        search: value.toString(),
      };
      if (!searchValue) {
        onChangeTxnLabelPage(pvtNotePageCount);
      } else {
        const response = await getListOfTxnLabel({
          skip: 0,
          limit: 5,
          searchValue: searchValue,
        });
      }
    }

    if (value === 2) {
      const searchValue = event.target.value;
      setSearch(searchValue);
      setDataNotFound(false);
      const data = {
        userId: sessionManager.getDataFromCookies("userId"),
        searchValue: searchValue,
        searchKeys: ["address", "tagName"],
        search: value.toString(),
      };
      if (!searchValue) {
        onChangeTagAddressPage(tagPageCount);
      } else {
        await getListOfTagAddress({ skip: 0, limit: 5, searchValue });
      }
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const list = {};
  const [totalCount1, setTotalCount1] = React.useState(5);
  const [totalCount2, setTotalCount2] = React.useState(5);
  const [totalCount3, setTotalCount3] = React.useState(5);

  // Edit box Popup Handlers
  const [editBoxOpen, setEditBox] = React.useState(false);
  const [selectedEditAddress, setSelectedAddress] = React.useState(false);
  const handleClickOpen = (value) => {
    setEditBox(true);
    setSelectedAddress(value);
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
    let response = await UserService.getWatchlistList(request);
    let watchlists = localStorage.getItem(
      request.userId + cookiesConstants.USER_ADDRESS_WATCHLIST
    );
    watchlists = JSON.parse(watchlists);
    response.watchlistContent = response.watchlistContent.map((obj) => {
      obj.description =
        watchlists && watchlists[obj.address] ? watchlists[obj.address] : "";
      return obj;
    });
    if (response.totalCount > 0) {
      setAddressNotAdded(false);
    }
    setWatchlist(response.watchlistContent);
  };

  const getListOfTxnLabel = async (requestData) => {
    const request = {
      limit: requestData?.limit || "5",
      skip: isNaN(requestData?.skip) ? list : requestData?.skip,
      userId: sessionManager.getDataFromCookies("userId"),
      searchValue: requestData?.searchValue,
    };

    let transactionLabels = localStorage.getItem(
      sessionManager.getDataFromCookies("userId") +
        cookiesConstants.USER_TRASACTION_LABELS
    );
    transactionLabels = JSON.parse(transactionLabels);
    if (!transactionLabels) transactionLabels = [];
    if (transactionLabels.length > 0) {
      setWatchListNotAdded(false);
    }

    if (request.searchValue) {
      transactionLabels = transactionLabels.filter((obj) => {
        if (
          obj.transactionHash.includes(request.searchValue) ||
          obj.trxLable.includes(request.searchValue)
        ) {
          return obj;
        }
      });
    }
    setTotalCount2(transactionLabels.length);
    if (transactionLabels.length > requestData?.limit) {
      transactionLabels.splice(0, request.skip);
      transactionLabels.splice(request.limit, transactionLabels.length);
    }
    transactionLabels.length && setDataNotFound(false);
    transactionLabels.length && setAddressNotAdded(false);
    setAddress(transactionLabels);
  };

  const getListOfTagAddress = async (requestData) => {
    const request = {
      limit: requestData?.limit || "5",
      skip: requestData?.skip || list,
      userId: sessionManager.getDataFromCookies("userId"),
      isTaggedAddress: true,
      searchValue: requestData?.searchValue,
    };
    let taggedAddress = localStorage.getItem(
      request.userId + cookiesConstants.USER_TAGGED_ADDRESS
    );
    taggedAddress = JSON.parse(taggedAddress);
    if (!taggedAddress) taggedAddress = [];
    if (taggedAddress.length > 0) {
      setTxnAddressNotAdded(false);
    }

    if (request.searchValue) {
      taggedAddress = taggedAddress.filter((obj) => {
        if (
          obj.address.includes(request.searchValue) ||
          obj.tagName.includes(request.searchValue)
        ) {
          return obj;
        }
      });
    }

    setTotalCount3(taggedAddress.length);
    if (taggedAddress.length > requestData?.limit) {
      taggedAddress.splice(0, request.skip);
      taggedAddress.splice(request.limit, taggedAddress.length);
    }

    setPrivateAddress(taggedAddress);
  };

  const sortByAddedOn = () => {
    let oldData = address;
    let newData;
    if (addedOnToggle === 0) {
      newData = oldData.sort(
        (index1, index2) => index1.trxLable.localeCompare(index2.trxLable)
      );
      setAddedOnToggle(1);
    } else {
      newData = oldData.sort(
        (index1, index2) => index2.trxLable.localeCompare(index1.trxLable)
      );
      setAddedOnToggle(0);
    }
    setAddress(newData);
  };

  const sortByBalance = () => {
    let oldData = watchlist;
    let newData;
    if (balanceToggle === -1) {
      newData = oldData.sort(
        (index1, index2) => index1?.balance - index2?.balance
      );
      setBalanceToggle(1);
    } else {
      newData = oldData.sort(
        (index1, index2) => index2?.balance - index1?.balance
      );
      setBalanceToggle(-1);
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
    setSearch("");
    setBalanceToggle("")

  };
  const handlePrivateNote = () => {
    setTablevalue(2);
    setDownloadActive(0);
    setSearch("");
  };
  const handleTagAddress = () => {
    setTablevalue(3);
    setDownloadActive(0);
    setSearch("");
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
            AddedOn: `${
              (item?.addedOn &&
                moment(item.addedOn)
                  .tz(timezone)
                  .format("MMM DD, YYYY, hh:mm A")) ||
              ""
            } ${(timezone && Utility.getUtcOffset(timezone)) || ""}`,
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
            AddedOn: item.addedOn,
          };
        })
      );
    } else {
      let tempAddress = address.map((addr) =>
        addr.transactionHash === name ? { ...addr, isChecked2: checked } : addr
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
            AddedOn: item.addedOn,
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
            AddedOn: moment(item.addedOn),
          };
        })
      );
    } else {
      let tempAddress = privateAddress.map((addr) =>
        addr.address === name ? { ...addr, isChecked3: checked } : addr
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
            AddedOn: moment(item.addedOn),
          };
        })
      );
    }
  };
  // const getSortTitle = (sortKey) => {
  //   if (sortToggle[sortKey] === 1) return "Ascending";
  //   else return "Descending";
  // };
  return (
    <div>
      <Tokensearchbar />

      <SubParentContainer>
        {/* <div className="heading"> */}
        {/* <span> */}
        {/* <img
              className="icon"
              style={{ borderRadius: "50px" }}
              src={
                sessionManager.getDataFromCookies(
                  cookiesConstants.USER_PICTURE
                ) || "/images/Profile.png"
              }
            /> */}
        <UserNameContainer>
          <ParentProfile>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Avatar
                className="profile-icon"
                src={
                  sessionManager.getDataFromCookies(
                    cookiesConstants.USER_PICTURE
                  ) || "/images/Profile.png"
                }
              /> */}
              <Column style={{ margin: "0 15px" }}>
                <Row className={classes.profileName} style={{ gap: "15px" }}>
                  Welcome, {setUserName()}
                </Row>

                {/* <Editprofile /> */}
              </Column>
            </div>
            <div>
              <NotificationBar />
            </div>
          </ParentProfile>
        </UserNameContainer>
        {/* </span> */}
        {/* <span>
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
          </span> */}
        {/* </div> */}
        <UserNameContainer isWallet={true}>
          <Watchlist
            getWatchlistList={getListOfWatchlist}
            getTotalCountWatchlist={getUserWatchlist}
          />
          <Transaction
            getListOfTxnLabel={getListOfTxnLabel}
            getTotalCountTxnLabel={getUserTxnLabel}
          />
          <Private
            getListOfTagAddress={getListOfTagAddress}
            getTotalCountTagAddress={getPvtTagAddress}
          />
        </UserNameContainer>

        <div className={classes.root + " accProfile"}>
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
                style={{
                  borderBottom:
                    value === 0 ? "2px solid rgb(33, 73, 185)" : "none",
                }}
                {...a11yProps(0)}
                onClick={handleWatchlist}
              />
              <Tab
                label="Transaction Private Note"
                className={classes.txnprivate}
                className={value === 1 ? classes.tab1 : classes.tab2}
                style={{
                  borderBottom:
                    value === 1 ? "2px solid rgb(33, 73, 185)" : "none",
                }}
                {...a11yProps(1)}
                onClick={handlePrivateNote}
              />
              <Tab
                label="Tagged Address"
                className={classes.address}
                className={value === 2 ? classes.tab1 : classes.tab2}
                style={{
                  borderBottom:
                    value === 2 ? "2px solid rgb(33, 73, 185)" : "none",
                }}
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
                // <div
                //   onClick={downloadTxnPvtNotePDF}
                //   filename={"private_note.csv"}
                //   data={downloadTxnPvtNote}
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
                //   Export test
                // </div>
                <PDFDownloadLink
                  style={styles.pdfDownloadLink}
                  document={<TransactionPDF data={downloadTxnPvtNote} />}
                  fileName="transactionPvtNote.pdf"
                >
                  Export
                </PDFDownloadLink>
              ) : (
                <PDFDownloadLink
                  style={styles.pdfDownloadLink}
                  document={<AddressPDF data={downloadTagAddress} />}
                  fileName="tagAddresses.pdf"
                >
                  Export
                </PDFDownloadLink>
                // <CSVLink
                //   filename={"tag_address.csv"}
                //   data={downloadTagAddress}
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
              )
            ) : (
              <div
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

                  paddingTop: "0.4rem",
                }}
              >
                Export
              </div>
            )}
          </div>
          <TabPanel value={value} index={0}>
            <div className="griddiv add-root">
              {addressNotAdded || dataNotFound ? (
                <div style={{ height: "512px" }}>
                  <Grid
                    className="tablegrid_no_data"
                    style={{ borderBottom: "2px solid #f9f9f9" }}
                  >
                    <Grid
                      component={Paper}
                      style={{ boxShadow: "0px 0px 0px 0px", overflow: "auto" }}
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
                                <Tooltip
                                  placement="top"
                                  title={messages.WATCHLIST_ADDRESS}
                                >
                                  <img
                                    alt="question-mark"
                                    src="/images/info.svg"
                                    height={"14px"}
                                    className="tooltipInfoIcon"
                                  />
                                </Tooltip>
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Description
                                <Tooltip
                                  placement="top"
                                  title={messages.WATCHLIST_DESCRIPTION}
                                >
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
                              style={{
                                border: "none",
                                display: "flex",
                                lineHeight: "21px",
                              }}
                              align="left"
                            >
                              <span
                                className={"tableheaders-1"}
                                style={{ cursor: "pointer" }}
                                onClick={sortByBalance}
                              >
                                Balance
                                <Tooltip
                                  placement="top"
                                  title={messages.WATCHLIST_BALANCE}
                                >
                                  <img
                                    alt="question-mark"
                                    src="/images/info.svg"
                                    height={"14px"}
                                    className="tooltipInfoIcon"
                                  />
                                </Tooltip>
                              </span>
                              <button className={classes.btn}>
                                <Tooltip
                                  placement="top"
                                  title={
                                    balanceToggle == 1
                                      ? "Descending"
                                      : "Ascending"
                                  }
                                >
                                  {balanceToggle ==="" ? (
                                    <></>
                                  ) : (
                                    balanceToggle == 1 ? (
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
                                  )}
                                </Tooltip>
                              </button>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Added On
                                <Tooltip
                                  placement="top"
                                  title={messages.WATCHLIST_ADDED_ON}
                                >
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
                              style={{ border: "none", marginBottom: "160px" }}
                              align="left"
                            >
                              <span className={"tableheaders-1"}>
                                Notification
                                <Tooltip
                                  placement="top"
                                  title={messages.WATCHLIST_NOTIFICATION}
                                >
                                  <img
                                    alt="question-mark"
                                    src="/images/info.svg"
                                    height={"14px"}
                                    className="tooltipInfoIcon"
                                  />
                                </Tooltip>
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
                  {dataNotFound ? (
                    <NoDataFoundContainer>
                      <img
                        alt="alert"
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      ></img>
                      <div className={classes.noData}>Data Not Found</div>
                    </NoDataFoundContainer>
                  ) : (
                    <NoDataFoundContainer>
                      <img
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      ></img>

                      <div className={classes.noData}>No address added</div>
                    </NoDataFoundContainer>
                  )}
                </div>
              ) : (
                <Grid lg={13} className="tablegrid_address">
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
                              <Tooltip
                                placement="top"
                                title={messages.WATCHLIST_ADDRESS}
                              >
                                <img
                                  alt="question-mark"
                                  src="/images/info.svg"
                                  height={"14px"}
                                  className="tooltipInfoIcon"
                                />
                              </Tooltip>
                            </span>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <span className={"tableheaders-1"}>
                              Description
                              <Tooltip
                                placement="top"
                                title={messages.WATCHLIST_DESCRIPTION}
                              >
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
                            style={{
                              border: "none",
                              display: "flex",
                              lineHeight: "21px",
                            }}
                            align="left"
                          >
                            <span
                              className={"tableheaders-1"}
                              onClick={sortByBalance}
                              style={{ cursor: "pointer" }}
                            >
                              Balance
                              <Tooltip
                                placement="top"
                                title={messages.WATCHLIST_BALANCE}
                              >
                                <img
                                  alt="question-mark"
                                  src="/images/info.svg"
                                  height={"14px"}
                                  className="tooltipInfoIcon"
                                />
                              </Tooltip>
                            </span>
                            <button className={classes.btn}>
                              <Tooltip
                                placement="top"
                                title={
                                  balanceToggle == -1
                                    ? "Descending"
                                    : "Ascending"
                                }
                              >
                                {balanceToggle ==="" ? (
                                    <></>
                                  ) : (
                                    balanceToggle == 1 ? (
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
                                  )}
                              </Tooltip>
                            </button>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <span className={"tableheaders-1"}>
                              Added On
                              <Tooltip
                                placement="top"
                                title={messages.WATCHLIST_ADDED_ON}
                              >
                                <img
                                  alt="question-mark"
                                  src="/images/info.svg"
                                  height={"14px"}
                                  className="tooltipInfoIcon"
                                />
                              </Tooltip>
                            </span>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <span className={"tableheaders-1"}>
                              Notification
                              <Tooltip
                                placement="top"
                                title={messages.WATCHLIST_NOTIFICATION}
                              >
                                <img
                                  alt="question-mark"
                                  src="/images/info.svg"
                                  height={"14px"}
                                  className="tooltipInfoIcon"
                                />
                              </Tooltip>
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
                            let balanceToShow = Utility.decimalDivisonOnly(
                              row.balance,
                              8
                            );
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
                                    {format({})(balanceToShow)}&nbsp;XDC
                                  </span>
                                  {/* </a> */}
                                </TableCell>
                                <TableCell
                                  style={{ border: "none" }}
                                  align="left"
                                >
                                  <span className="tabledata-1">
                                    {`${
                                      (row?.modifiedOn &&
                                        moment(row?.modifiedOn)
                                          .tz(timezone)
                                          .format("MMM DD, YYYY, hh:mm A")) ||
                                      ""
                                    } ${
                                      (timezone &&
                                        Utility.getUtcOffset(timezone)) ||
                                      ""
                                    }`}
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
                                    getTotalCountWatchlist={getUserWatchlist}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Grid>
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
              {addressNotAdded || dataNotFound ? (
                <div style={{ height: "512px" }}>
                  <Grid
                    className="tablegrid_no_data"
                    style={{ borderBottom: "2px solid #f9f9f9" }}
                  >
                    <Grid
                      component={Paper}
                      style={{ boxShadow: "0px 0px 0px 0px", overflow: "auto" }}
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
                                  checkedNote === true
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
                              paddingBottom="0"
                            >
                              <span className={"tableheaders-1"}>
                                Transaction Hash
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
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Note
                                <Tooltip
                                  placement="top"
                                  title={messages.PRIVATE_NOTE}
                                >
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
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Added On
                                <Tooltip
                                  placement="top"
                                  title={messages.PRIVATE_NOTE_ADDED_ON}
                                >
                                  <img
                                    alt="question-mark"
                                    src="/images/info.svg"
                                    height={"14px"}
                                    className="tooltipInfoIcon"
                                  />
                                </Tooltip>
                                {/* <span> */}
                                <button className={classes.btn}>
                                { addedOnToggle == 0 ?
                                  <ArrowUpwardIcon
                                    onClick={sortByAddedOn}
                                    style={{
                                      color: "#3763dd",
                                      height: "20px",
                                      width: "15px",
                                      marginLeft: "5px",
                                    }}
                                  />:<ArrowDownwardIcon
                                  onClick={sortByAddedOn}
                                  style={{
                                    color: "#3763dd",
                                    height: "20px",
                                    width: "15px",
                                    marginLeft: "5px",
                                  }}
                                />}
                                </button>
                              </span>
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
                  {dataNotFound ? (
                    <NoDataFoundContainer>
                      <img
                        alt="alert"
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      ></img>
                      <div className={classes.noData}>Data Not Found</div>
                    </NoDataFoundContainer>
                  ) : (
                    <NoDataFoundContainer>
                      <img
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      ></img>

                      <div className={classes.noData}>
                        No transaction hash added
                      </div>
                    </NoDataFoundContainer>
                  )}
                </div>
              ) : (
                <Grid lg={13} className="tablegrid_address">
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
                            className="p-b-0"
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
                          <TableCell style={{ border: "none" }} align="left">
                            <span className={"tableheaders-1"}>
                              Transaction Hash
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
                          <TableCell style={{ border: "none" }} align="left">
                            <span className={"tableheaders-1"}>
                              Note
                              <Tooltip
                                placement="top"
                                title={messages.PRIVATE_NOTE}
                              >
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
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                          <TableCell style={{ border: "none" }} align="left">
                            <span className={"tableheaders-1"}>
                              Added On
                              <Tooltip
                                placement="top"
                                title={messages.PRIVATE_NOTE_ADDED_ON}
                              >
                                <img
                                  alt="question-mark"
                                  src="/images/info.svg"
                                  height={"14px"}
                                  className="tooltipInfoIcon"
                                />
                              </Tooltip>
                              {/* <span> */}
                              <button className={classes.btn}>
                              { addedOnToggle == 0 ?
                                  <ArrowUpwardIcon
                                    onClick={sortByAddedOn}
                                    style={{
                                      color: "#3763dd",
                                      height: "20px",
                                      width: "15px",
                                      marginLeft: "5px",
                                    }}
                                  />:<ArrowDownwardIcon
                                  onClick={sortByAddedOn}
                                  style={{
                                    color: "#3763dd",
                                    height: "20px",
                                    width: "15px",
                                    marginLeft: "5px",
                                  }}
                                />}
                              </button>
                            </span>
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
                          if (index >= _limit) return null;
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
                                  name={row.transactionHash}
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
                                  {`${
                                    (row?.modifiedOn &&
                                      moment(row?.modifiedOn)
                                        .tz(timezone)
                                        .format("MMM DD, YYYY, hh:mm A")) ||
                                    ""
                                  } ${
                                    (timezone &&
                                      Utility.getUtcOffset(timezone)) ||
                                    ""
                                  }`}
                                </span>
                              </TableCell>
                              <TableCell
                                style={{ border: "none" }}
                                align="left"
                              >
                                <EditTxnLabel
                                  row={row}
                                  index={index}
                                  getListOfTxnLabel={getListOfTxnLabel}
                                  getTotalCountTxnLabel={getUserTxnLabel}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Grid>
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
              {txnAddressNotAdded || dataNotFound ? (
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
                              <span className={"tableheaders-1"}>
                                Address
                                <Tooltip
                                  placement="top"
                                  title={messages.TAG_ADDRESS}
                                >
                                  <img
                                    alt="question-mark"
                                    src="/images/info.svg"
                                    height={"14px"}
                                    className="tooltipInfoIcon"
                                  />
                                </Tooltip>
                              </span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Name Tag
                                <Tooltip
                                  placement="top"
                                  title={messages.NAME_TAG}
                                >
                                  <img
                                    alt="question-mark"
                                    src="/images/info.svg"
                                    height={"14px"}
                                    className="tooltipInfoIcon"
                                  />
                                </Tooltip>
                                <button className={classes.btn}>
                                {nameToggle == 0 ?
                                <ArrowUpwardIcon
                                  onClick={sortByTagName}
                                  style={{
                                    color: "#3763dd",
                                    height: "20px",
                                    width: "15px",
                                    marginLeft: "5px",
                                  }}
                                />:
                                <ArrowDownwardIcon 
                                  onClick={sortByTagName}
                                  style={{
                                    color: "#3763dd",
                                    height: "20px",
                                    width: "15px",
                                    marginLeft: "5px",
                                  }}
                                />}
                                </button>
                              </span>
                            </TableCell>
                            {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                            <TableCell style={{ border: "none" }} align="left">
                              <span className={"tableheaders-1"}>
                                Added On
                                <Tooltip
                                  placement="top"
                                  title={messages.TAG_ADDED_ON}
                                >
                                  <img
                                    alt="question-mark"
                                    src="/images/info.svg"
                                    height={"14px"}
                                    className="tooltipInfoIcon"
                                  />
                                </Tooltip>
                              </span>
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
                  {dataNotFound ? (
                    <NoDataFoundContainer>
                      <img
                        alt="alert"
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      ></img>
                      <div className={classes.noData}>Data Not Found</div>
                    </NoDataFoundContainer>
                  ) : (
                    <NoDataFoundContainer>
                      <img
                        alt=""
                        className={classes.alert}
                        src={require("../../../src/assets/images/XDC-Alert.svg")}
                      />
                      <div className={classes.noData}>No address added</div>
                    </NoDataFoundContainer>
                  )}
                </div>
              ) : (
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
                              checked={
                                countTag === tagAddrLength || checkedTag == true
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
                            <span className={"tableheaders-1"}>
                              Address
                              <Tooltip
                                placement="top"
                                title={messages.TAG_ADDRESS}
                              >
                                <img
                                  alt="question-mark"
                                  src="/images/info.svg"
                                  height={"14px"}
                                  className="tooltipInfoIcon"
                                />
                              </Tooltip>
                            </span>
                          </TableCell>
                          <TableCell style={{ border: "none" }} align="left">
                            <span className={"tableheaders-1"}>
                              Name Tag
                              <Tooltip
                                placement="top"
                                title={messages.NAME_TAG}
                              >
                                <img
                                  alt="question-mark"
                                  src="/images/info.svg"
                                  height={"14px"}
                                  className="tooltipInfoIcon"
                                />
                              </Tooltip>
                              <button className={classes.btn}>
                                {nameToggle == 0 ?
                                <ArrowUpwardIcon
                                  onClick={sortByTagName}
                                  style={{
                                    color: "#3763dd",
                                    height: "20px",
                                    width: "15px",
                                    marginLeft: "5px",
                                  }}
                                />:
                                <ArrowDownwardIcon 
                                  onClick={sortByTagName}
                                  style={{
                                    color: "#3763dd",
                                    height: "20px",
                                    width: "15px",
                                    marginLeft: "5px",
                                  }}
                                />}
                              </button>
                            </span>
                          </TableCell>
                          {/* <TableCell
                                style={{ border: "none", paddingLeft: "2%" }}
                                align="left"
                            >
                                <span className={"tableheaders-1"}>Balance</span>
                            </TableCell> */}
                          <TableCell style={{ border: "none" }} align="left">
                            <span className={"tableheaders-1"}>
                              Added On
                              <Tooltip
                                placement="top"
                                title={messages.TAG_ADDED_ON}
                              >
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
                        {privateAddress.map((row, index) => {
                          if (index >= _limit) return null;
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
                                  name={row.address}
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
                                  <Tooltip placement="top" title={row.address}>
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
                                  <div className="nameLabel2">{tag}</div>
                                </span>
                              </TableCell>

                              <TableCell
                                style={{ border: "none" }}
                                align="left"
                              >
                                <span className="tabledata-1">
                                  {`${
                                    (row?.modifiedOn &&
                                      moment(row?.modifiedOn)
                                        .tz(timezone)
                                        .format("MMM DD, YYYY, hh:mm A")) ||
                                    ""
                                  } ${
                                    (timezone &&
                                      Utility.getUtcOffset(timezone)) ||
                                    ""
                                  }`}
                                </span>
                              </TableCell>

                              <TableCell
                                style={{ border: "none" }}
                                align="left"
                              >
                                <EditTagAddress
                                  row={row}
                                  index={index}
                                  getListOfTagAddress={getListOfTagAddress}
                                  getTotalCountTagAddress={getPvtTagAddress}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Grid>
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
      </SubParentContainer>
      <FooterComponent />
      <PrivacyAlert />
    </div>
  );
}
