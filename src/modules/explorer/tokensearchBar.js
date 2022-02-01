import React, { useState } from "react";
import clsx from "clsx";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { NavLink, useHistory } from "react-router-dom";
import "../../assets/styles/custom.css";
import SearchData from "../../services/search";
import Utility from "../../utility";
import Popover from "./popover";
import ChangePassword from "./changePassword";
import { sessionManager } from "../../managers/sessionManager";
import { Row } from "simple-flexbox";
import { eventConstants, recentSearchTypeConstants } from "../../constants";
import { useDispatch } from "react-redux";

const drawerWidth = 240;
const Cut = styled.div`
  padding-right: 5px;
  padding-top: 15px;

  display: flex;
  align-content: flex-end;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  firstContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "19px",
  },
  appBar: {
    position: "unset !important",
    backgroundColor: "#2149b9",
    height: "4.875rem",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  "@media (min-width: 0px) and (max-width:767px)": {
    appBar: {
      height: "10.8rem !important",
      padding: "16px 15px 15px 16px",
    },
    drawerHeader: {
      padding: "0 !important",
    },
  },
  "@media (min-width: 767px) and (max-width:1250px)": {
    appBar: {
      backgroundColor: "#2149b9",
      height: "134px !important",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    overflow: "hidden",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#102e84",
    overflow: "hidden",
  },
  drawerHeader: {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    marginTop: "-12px",
  },
  searchIcon: {
    marginTop: "2px",
    width: 18,
    height: 18,
    marginRight: 3,
  },
  "@media (min-width: 0px) and (max-width: 767px)": {
    searchIcon: {
      width: 15,
      height: 15,
    },
    popover: {
      marginRight: "-15px",
    },
    firstContainer: {
      marginTop: "10px",
    },
    drawerHeader: {
      marginTop: "-10px",
    },
  },

  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  "@media (min-width: 640px) ": {
    list: {
      width: "21.25rem",
      backgroundColor: "#102e84",
      height: "100%",
    },
  },

  "@media (min-width: 0px) and (max-width: 767px)": {
    list: {
      width: "153px",
      backgroundColor: "#102e84",
      height: "100%",
    },
  },
  fullList: {
    width: "auto",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [opencontracts, setOpencontracts] = useState(false);
  const ref = React.useRef(null);
  const SelectOptRef = React.useRef(null);
  const SearchDataRef = React.useRef(null);

  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);

  const openChangePassword = () => {
    setOpenPasswordBox(!openPasswordBox);
  };
  const isloggedIn = sessionManager.getDataFromCookies("isLoggedIn");

  const [errorMessage, setErrorMessage] = useState("");
  const handleSearch = (event) => {
    if (event.target.value.length == 0) setErrorMessage("");
    if (event.key === "Enter") {
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (format.test(event.target.value)) {
        window.location.href=`/data-not-found?searchString=${event.target.value}`;
      } else {
        var selectOptType = SelectOptRef.current?.value;

        let requestdata = {
          filter: selectOptType,
          data: event.target.value,
        };
        BlockChainSearch(requestdata);
      }
    }
  };
  const handleSearchOption = (event) => {
    var selectOptType = SelectOptRef.current?.value;
    var SearchDataInput = SearchDataRef.current?.value;
    let requestdata = {
      filter: selectOptType,
      data: SearchDataInput,
    };
    if (SearchDataInput === "") {
      return;
    } else {
      BlockChainSearch(requestdata);
    }
  };
  const BlockChainSearch = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        SearchData.searchData(data)
      );

      if (!responseData || responseData[0]?.token?.length == 0) {
        window.location.href=`/data-not-found?searchString=${data?.data}`;
      }

      if (responseData) {
        if (responseData[0].redirect === "block") {
          let blockurl = "/block-details/" + responseData[0].block.number;
          dispatch({
            type: eventConstants.ADD_TO_SEARCH_LIST, payload: {
              type: recentSearchTypeConstants.BLOCK,
              searchValue: data?.data || '',
              result: responseData[0]?.block?.transactions?.length > 0 && responseData[0]?.block?.transactions.reduce((accumulator, trx) => accumulator + parseInt(trx.value), [0]) || 0,
              redirectUrl: blockurl
            }
          })
          window.location.href = blockurl;
        } else if (responseData[0].redirect === "account") {
          let accounturl =
            "/address-details/" + responseData[0].account.address;
          dispatch({
            type: eventConstants.ADD_TO_SEARCH_LIST, payload: {
              type: recentSearchTypeConstants.ACCOUNT,
              searchValue: responseData[0]?.account?.address || '',
              result: responseData[0]?.account?.balance || 0,
              redirectUrl: accounturl
            }
          })
          window.location.href = accounturl;
        } else if (responseData[0].redirect === "transaction") {
          let transactionurl =
            "/transaction-details/" + responseData[0].transaction.hash;
          dispatch({
            type: eventConstants.ADD_TO_SEARCH_LIST, payload: {
              type: recentSearchTypeConstants.TRANSACTION,
              searchValue: data?.data || '',
              result: responseData[0]?.transaction?.value || 0,
              redirectUrl: transactionurl
            }
          })
          window.location.href = transactionurl;
        } else if (responseData[0].redirect === "token") {
          if (responseData[0]?.token.length == 1) {
            let tokenDataUrl =
              "/token-data/" +
              responseData[0]?.token[0]?.address +
              "/" +
              responseData[0]?.token[0]?.symbol;
            dispatch({
              type: eventConstants.ADD_TO_SEARCH_LIST, payload: {
                type: recentSearchTypeConstants.TOKEN,
                searchValue: responseData[0]?.token[0]?.address || '',
                result: responseData[0]?.token[0]?.totalSupply || 0,
                redirectUrl: tokenDataUrl
              }
            })
            window.location.href = tokenDataUrl;
          } else if (responseData[0]?.token.length > 1) {
            let tokenListUrl =
              "/tokens/" + responseData[0]?.token[0]?.tokenName;
            dispatch({
              type: eventConstants.ADD_TO_SEARCH_LIST, payload: {
                type: recentSearchTypeConstants.TOKEN,
                searchValue: responseData[0]?.token?.address || '',
                result: responseData[0]?.token?.totalSupply || 0,
                redirectUrl: tokenListUrl
              }
            })
            window.location.href = tokenListUrl;
          } else {
          }
        } else {
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const lists = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.firstContainer}>
        <p className="inside-side-box-browse">Browse</p>
        <div className={classes.drawerHeader}>
          <IconButton
            style={{ color: "white" }}
            onClick={toggleDrawer(anchor, false)}
          >
            {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </div>

      <List className="side-box">
        <ul className="inside-side-box">
          <a className="account_details_button" href="/account-details">
            <div className="xinfin_account_button">Accounts</div>
          </a>
          <hr className="myhr" />
        </ul>

        <ul className="inside-side-box">
          <p
            className="xinfin_api_button"
            onClick={() => setOpencontracts(true)}
            style={{ cursor: "pointer" }}
          >
            {" "}
            Contracts{" "}
            <span className="side-arrow-contract-tab">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </p>
          <hr className="myhr" />
        </ul>
        <ul className="Network-list-nav">
          <a
            className="sidebar-links"
            href="https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo?hl=en-US" target="_blank"
          >
            <div className="xinfin_account_button">XDCPay</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Network-list-nav">
          <a
            className="sidebar-links"
            href="https://github.com/xdcfoundation" target="_blank"
          >
            <div className="xinfin_account_button">XDC Github</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Network-list-nav">
          <a
            className="sidebar-links"
            href="https://xdcroadmap.org/" target="_blank"
          >
            <div className="xinfin_account_button">XDC Roadmap</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Network-list-nav">
          <a
            className="sidebar-links"
            href="https://medium.com/xdc-foundation-communications" target="_blank"
          >
            <div className="xinfin_account_button">About XDC</div>
          </a>
          <hr className="myhr" />
        </ul>

        {/* <ul className="inside-side-box">
          <p
            className="xinfin_api_button"
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Tools{" "}
            <span className="right-arrow-side-bar">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </p>
          <hr className="myhr" />
        </ul>
        <ul className="inside-side-box">
          <p className="xinfin_api_button" style={{ cursor: "pointer" }}>
            XDC APIs
          </p>
          <hr className="myhr" />
        </ul>
        <ul className="inside-side-box">
          <p className="xinfin_api_button" style={{ cursor: "pointer" }}>
            Nodes
          </p>
          <hr className="myhr" />
        </ul> */}
      </List>
    </div>
  );
  const handleClose = () => {
    setOpen(false);
  };

  const list = ["Accounts", "Contract", "Tools", "XDC Apis", "Nodes", "Tokens"];
  const [filter, setFilter] = useState("");
  const childToggle = (subanchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpencontracts(false);

    setState({ ...state, [subanchor]: open });
  };
  const contracts = (subanchor) => (
    <div
      style={{ overflow: "revert" }}
      className={clsx(classes.list, {
        [classes.fullList]: subanchor === "top" || subanchor === "bottom",
      })}
      role="presentation"
      onKeyDown={() => setOpencontracts(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "40px 10px 15px 20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Row style={{ gap: "5px", alignItems: "center" }}>
          <i
            class="fa fa-angle-left"
            aria-hidden="true"
            onClick={() => setOpencontracts(false)}
            style={{ color: "white", fontSize: 14, cursor: "pointer" }}
          ></i>
          <div
            style={{
              color: "white",
              fontSize: 13,
              cursor: "pointer",
            }}
            onClick={() => setOpencontracts(false)}
          >
            Contract
          </div>
        </Row>
        <div>
          <IconButton
            style={{ color: "white" }}
            onClick={childToggle(subanchor, false)}
          >
            {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </div>

      <List className="side-box">
        <ul className="Live-Network-list">
          <a
            style={{
              fontSize: 13,
              color: "white",
              listStyle: "none",
              textDecoration: "none",
            }}
            href="/contracts"
          >
            <div className="xinfin_api_button">Contracts</div>
          </a>
          <hr className="myhr4" />
        </ul>
        <ul className="Live-Network-list">
          <a
            style={{
              fontSize: 13,
              color: "white",
              listStyle: "none",
              textDecoration: "none",
            }}
            href={"/verify-contracts"}
          >
            <div className="xinfin_api_button">Verify Contracts</div>
          </a>
          <hr className="myhr4" />
        </ul>
      </List>
    </div>
  );
  const childToolsToggle = (subanchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
    setState({ ...state, [subanchor]: open });
  };
  const items = (subanchor) => (
    <div
      className="scrollbar"
      style={{ overflow: "revert" }}
      className={clsx(classes.list, {
        [classes.fullList]: subanchor === "top" || subanchor === "bottom",
      })}
      role="presentation"
      onKeyDown={() => setOpen(false)}
    >
      <Row
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: "0 20px 0 20px", marginTop: "20px" }}
      >
        <Row alignItems="center">
          <i
            class="fa fa-angle-left"
            aria-hidden="true"
            onClick={() => setOpen(false)}
            style={{ color: "white", fontSize: 15, cursor: "pointer" }}
          ></i>
          <div
            style={{
              color: "white",
              fontSize: 13,
              marginLeft: "8px",
              cursor: "pointer",
            }}
          >
            Tools
          </div>
        </Row>
        <div>
          <IconButton
            style={{ color: "white" }}
            onClick={childToolsToggle(subanchor, false)}
          >
            {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </Row>

      {/* onClick={() => setOpen(false)} */}
      <List className="side-box">
        <ul className="Live-Network">
          <p>Live Network</p>
        </ul>
        <ul className="Live-Network-list">
          <a className="sidebar-links" href="https://wallet.xinfin.network/#/">
            <div className="xinfin_account_button">Web Wallet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://play.google.com/store/apps/details?id=com.xdcwallet"
          >
            <div className="xinfin_account_button">Android wallet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a className="sidebar-links" href="https://xinfin.network/#explorer">
            <div className="xinfin_account_button">Block Observatory</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://apidocs.xinfin.network/docs/#xinfin-apis"
          >
            <div className="xinfin_account_button">XDC APIs</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul style={{ whiteSpace: "nowrap" }} className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://xinfin.network/#masternode"
          >
            <div className="xinfin_account_button">
              Become a MasterNode/Validator
            </div>
          </a>
          <hr className="myhr" />
        </ul>
      </List>
      <br />
      <List className="side-box">
        <ul className="Live-Network">
          <p>Sand Box/Testnet</p>
        </ul>
        <ul className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://apothem.network/#getTestXDC"
          >
            <div className="xinfin_account_button">Faucet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a className="sidebar-links" href="https://wallet.apothem.network/#/">
            <div className="xinfin_account_button">Web wallet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://explorer.apothem.network/home"
          >
            <div className="xinfin_account_button">Block Observatory</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://apidocs.xinfin.network/docs/#xinfin-apis"
          >
            <div className="xinfin_account_button">XDC APIs</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul style={{ whiteSpace: "nowrap" }} className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://apothem.network/#masternode"
          >
            <div className="xinfin_account_button">
              Become a MasterNode/Validator
            </div>
          </a>
          <hr className="myhr" />
        </ul>
      </List>
      <br />
      <List className="side-box">
        <ul className="Live-Network">
          <p>Supported Wallet</p>
        </ul>
        <ul className="Live-Network-list">
          <a className="sidebar-links" href="https://guarda.com/">
            <div className="xinfin_account_button">Guarda Wallet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a className="sidebar-links" href="https://dcentwallet.com/MobileApp">
            <div className="xinfin_account_button">D'CENT Wallet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://dcentwallet.com/products/BiometricWallet"
          >
            <div className="xinfin_account_button">D'CENT Hardware Wallet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a className="sidebar-links" href="https://freewallet.org/#wallets">
            <div className="xinfin_account_button">Freewallet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul style={{ whiteSpace: "nowrap" }} className="Live-Network-list">
          <a className="sidebar-links" href="https://xcelpay.io/">
            <div className="xinfin_account_button">XcelPay Wallet</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul style={{ whiteSpace: "nowrap" }} className="Live-Network-list">
          <a className="sidebar-links" href="https://bitfi.com/">
            <div className="xinfin_account_button">Bitfi Hardware Wallet</div>
          </a>
          <hr className="myhr" />
        </ul>
      </List>
      <br />
      <List className="side-box">
        <ul className="Live-Network">
          <p>More</p>
        </ul>

        <ul className="Live-Network-list">
          <a className="sidebar-links" href="https://remix.xinfin.network/">
            <div className="xinfin_account_button">XDC Remix</div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://xinfin.org/setup-masternode"
          >
            <div className="xinfin_account_button">
              One-Click Node Installer
            </div>
          </a>
          <hr className="myhr" />
        </ul>
        <ul className="Live-Network-list">
          <a
            className="sidebar-links"
            href="https://explorer.xinfin.network/home"
          >
            <div className="xinfin_account_button">Explore dApps</div>
          </a>
          <hr className="myhr" />
        </ul>
      </List>
    </div>
  );

  // ..................
  const NavigationButton = styled.a`
  text-decoration :  none;
  padding: 5px 20px;
  border-bottom: ${(props) =>
      props.active ? "0.15rem solid #ffffff !important" : ""};
    padding-bottom: 3px;
    font-size: 0.938rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    
    color: #ffffff;
    list-style: none;
  @media (min-width: 0px) and (max-width: 767px){
    font-size: 0.875rem;
  `;

  const MobileNavigationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-flow: row;
    margin: 15px 0 0 0;
    @media (min-width: 768px) {
      display: none;
    }
  `;

  const DeskTopView = styled.div`
    @media (min-width: 0px) and (max-width: 767px) {
      display: none;
    }
    @media (min-width: 768px) {
      display: visible;
    }
  `;
  const MobileView = styled.div`
    @media (min-width: 0px) and (max-width: 766px) {
      display: visible;
    }
    @media (min-width: 767px) {
      display: none;
    }
  `;

  const SearchContainer = styled.div`
    width: 100%;
    height: 35px;
    padding: 6px;
    border-radius: 6px;
    border: solid 1px #e3e7eb;
    margin: auto;
    background: white;
    margin: 21.8px auto auto auto;
  `;

  const MobileToolBar = styled.div`
    margin: 0 10px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px 0 0 10px;
    justify-content: space-between;

    @media screen and (max-width: 767px) {
      padding: 0 !important;
      margin: 0 !important;
    }
  `;

  const TabSearchBox = styled.div`
    height: 2.375rem;
    padding: 8px;
    margin-right: 0.625rem;
    margin-top: 10px;
    border-radius: 0.25rem;
    background-color: #ffffff;
  `;

  const TabSearchBoxParent = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: row;
    @media (min-width: 0px) and (max-width: 767px) {
      display: none;
    }
    @media (min-width: 1250px) {
      display: none;
    }
  `;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <DeskTopView> */}

      <AppBar
        // className="mob-height"
        elevation={0}
        className={clsx(classes.appBar)}
      >
        <MobileToolBar className={clsx(classes.toolBar)}>
          <div className="tab-search">
            {/* <Typography className="Header"> */}
            <Row className="Header">
              <Row alignItems="center">
                <a className="logo_tokensearch" href={"/"}>
                  <img
                    className="Shape"
                    src={"/images/XDC-Icon-Logo.svg"}
                  ></img>
                </a>
                <a className="XDC" href="/">
                  {" "}
                  XDC{" "}
                </a>
              </Row>

              <DeskTopView>
                <div>
                  <NavLink
                    exact
                    activeClassName="active-t"
                    to={"/"}
                    className="Network-explorer"
                  >
                    XDC Observatory
                  </NavLink>

                  {/* <p className="Network-explorer" active id="Network-explorer">Network</p> */}
                </div>
                <div>
                  <NavLink
                    exact
                    activeClassName="active-t"
                    to={"/tokens"}
                    className="Token"
                  >
                    Tokens
                  </NavLink>

                  <a href="/">
                    <p className="Network-explorer" id="Network-explorer">
                      XDC Observatory
                    </p>
                  </a>
                </div>
                <div>
                  <a href="/tokens">
                    <div className="Token" id="Token">
                      Tokens
                    </div>
                  </a>
                </div>
              </DeskTopView>

              {/* </div> */}
            </Row>
            <DeskTopView>
              <div className="parentCenterbox">
                <div className="centerbox-td">
                  {SearchBox({
                    classes,
                    filter,
                    handleSearch,
                    SearchDataRef,
                    SelectOptRef,
                    handleSearchOption,
                    list,
                  })}
                  <div className="token-error-message-div">
                    <span className="token-error-message">{errorMessage}</span>
                  </div>
                </div>
              </div>
            </DeskTopView>
            {/* <div className="display-none-desktop"> */}

            {/* </div> */}
          </div>

          {LoginComponent({
            toggleDrawer,
            isloggedIn,
            openChangePassword,
            classes,
            childToggle,
            opencontracts,
            state,
            lists,
            items,
            contracts,
            openPasswordBox,
            open,
          })}

          {/* <div className="display-none-mobile">
            {LoginComponent({
              toggleDrawer,
              isloggedIn,
              openChangePassword,
              classes,
              opencontracts,
              state,
              lists,
              items,
              contracts,
              openPasswordBox,
              open,
            })}
          </div> */}
        </MobileToolBar>
        <MobileView>
          <MobileNavigationContainer>
            <NavigationButton active={window.location.pathname == "/"} href="/">
              XDC Observatory
            </NavigationButton>
            <NavigationButton
              active={window.location.pathname.includes("token")}
              href="/tokens"
            >
              Tokens
            </NavigationButton>
          </MobileNavigationContainer>
          <SearchContainer>
            {SearchBox({
              classes,
              filter,
              handleSearch,
              SearchDataRef,
              SelectOptRef,
              handleSearchOption,
              list,
            })}
            <div className="token-error-message-div">
              <span className="token-error-message">{errorMessage}</span>
            </div>
          </SearchContainer>
        </MobileView>
        <TabSearchBoxParent>
          <TabSearchBox>
            {SearchBox({
              classes,
              filter,
              handleSearch,
              SearchDataRef,
              SelectOptRef,
              handleSearchOption,
              list,
            })}
            <div className="token-error-message-div">
              <span className="token-error-message">{errorMessage}</span>
            </div>
          </TabSearchBox>
        </TabSearchBoxParent>
      </AppBar>
      {/* </DeskTopView> */}
    </div>
  );
}

const SearchBox = ({
  classes,
  filter,
  handleSearch,
  SearchDataRef,
  SelectOptRef,
  handleSearchOption,
  list,
}) => {
  return (
    <div>
      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Row alignItems="center">
          <img className={classes.searchIcon} src={"/images/Search.svg"} />
          <div className="search-responsive">
            <input
              defaultValue={filter}
              type="text"
              onKeyUp={(event) => handleSearch(event)}
              ref={SearchDataRef}
              /* onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event);
                }
              }} */
              className="main-input-td "
              src={"/images/Search.png"}
              placeholder="Search by Address / Txn Hash / Block"
            />
            {/* name="NAME" */}
            <div className="mobFilter">
              <select
                className="select-td"
                onChange={(event) => handleSearchOption(event)}
                ref={SelectOptRef}
              >
                <option value="All filters" selected>
                  All Filters
                </option>
                <option value="Address">Addresses</option>
                <option value="Blocks">Blocks</option>
                <option value="Tokens">Tokens</option>
                <option value="Transaction">Transaction</option>
                {/* <option value="Nametags">Nametags</option>
                      <option value="Labels">Labels</option>
                      <option value="Websites">Websites</option> */}
              </select>
            </div>
          </div>
        </Row>
        <ul style={{ color: "black" }}>
          {/* if needed above marginTop: '20px', marginLeft: '-45px' */}
          <li>
            {list.map((name) => {
              if (filter.length !== 0) {
                if (name.toLowerCase().startsWith(filter.toLowerCase()))
                  return <li>{name}</li>;
              } else {
                return null;
              }
            })}
          </li>
        </ul>
      </form>
    </div>
  );
};

const LoginComponent = ({
  toggleDrawer,
  childToggle,
  isloggedIn,
  openChangePassword,
  classes,
  opencontracts,
  state,
  lists,
  items,
  contracts,
  openPasswordBox,
  open,
}) => {
  return (
    <Row className={classes.popover} alignItems="center">
      {openPasswordBox && (
        <ChangePassword openChangePassword={openChangePassword} />
      )}
      <Popover openChangePassword={openChangePassword} />

      <React.Fragment className="rigt-line" key={"right"}>
        <IconButton
          className="hamburger-icon"
          color="inherit"
          aria-label="open drawer"
          // edge="end"
          onClick={toggleDrawer("right", true)}
        >
          <img
            className={isloggedIn ? "Shape2-internal1" : "menu-sidebar"}
            src={"/images/Menu.svg"}
          ></img>
          {/* <MenuIcon /> */}
        </IconButton>

        <Drawer
          className={classes.drawer}
          anchor={"right"}
          open={state["right"]}
          onEscapeKeyDown={toggleDrawer("right", false)}
          onBackdropClick={toggleDrawer("right", false)}
        >
          {lists("right")}
        </Drawer>
        <Drawer className={classes.drawer} anchor={"right"} onEscapeKeyDown={toggleDrawer("right", false)}
          onBackdropClick={toggleDrawer("right", false)} open={open}>
          {items("right")}
        </Drawer>
        <Drawer
          className={classes.drawer}
          anchor={"right"}
          open={opencontracts}
          onEscapeKeyDown={childToggle("right", false)}
          onBackdropClick={childToggle("right", false)}
        >
          {contracts("right")}
        </Drawer>
      </React.Fragment>
    </Row>
  );
};
