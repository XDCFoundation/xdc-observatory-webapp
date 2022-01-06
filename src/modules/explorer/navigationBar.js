import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { sessionManager } from "../../managers/sessionManager";
import { NavLink } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import NewFeature from "./newFeature";
import Login from "../login";

import Utility from "../../utility";
import SearchData from "../../services/search";
import { Row } from "simple-flexbox";

const drawerWidth = 240;
const DeskTopView = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    display: visible;
  }
`;
const MobileView = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
    display: visible;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#2149b9",
    // height: "60px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }, "@media (max-width: 1240px) ": {
    appBar: {
      position: "absolute",
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
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#102e84",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    overflow: "auto",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&::-webkit-scrollbar-track": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
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

  "@media (min-width: 768px) ": {
    list: {
      width: "21.25rem",
      backgroundColor: "#102e84",
      height: "100%",
    },
  },

  "@media (min-width: 0px) and (max-width: 767px)": {
    list: {
      width: "17.313rem",
      backgroundColor: "#102e84",
      height: "100%",
    },
    drawerHeader: {
      padding: "0 !important",
    },
  },
  fullList: {
    width: "auto",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const ref = React.useRef(null);
  const history = useHistory();
  const SelectOptRef = React.useRef(null);
  const SearchDataRef = React.useRef(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = useState(false);
  const [viewPopUp, setViewPopUp] = useState(true);
  const [opencontracts, setOpencontracts] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSearch = (event) => {
    if (event.target.value.length == 0) setErrorMessage("");
    if (event.key === "Enter") {
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if (format.test(event.target.value)) {
        setErrorMessage("Special characters are not allowed.");
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

  let visited = sessionManager.getDataFromCookies("Visited");
  if (visited && viewPopUp === true) {
    setViewPopUp(false);
  }
  // useEffect(() => {
  //   sessionManager.setDataInCookies("NotVisited");
  // }, []);

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
        Utility.apiFailureToast("No details found.");
      }

      if (responseData) {
        console.log(responseData, "pppp")
        if (responseData[0].redirect === "block") {
          let blockurl = "/block-details/" + responseData[0].block.number;
          window.location.href = blockurl;
        } else if (responseData[0].redirect === "account") {
          let accounturl =
            "/address-details/" + responseData[0].account.address;
          window.location.href = accounturl;
        } else if (responseData[0].redirect === "transaction") {
          let transactionurl =
            "/transaction-details/" + responseData[0].transaction.hash;
          window.location.href = transactionurl;
        } else if (responseData[0].redirect === "token" && responseData[0]?.token.length > 0) {
          let tokenDataUrl =
            "/token-data/" +
            responseData[0]?.token[0]?.address +
            "/" +
            responseData[0]?.token[0]?.symbol;
          let tokenListUrl = '/tokens/' + responseData[0]?.token[0]?.tokenName;
          window.location.href = responseData[0]?.token?.length > 1 ? tokenListUrl : tokenDataUrl;
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
      <div className="menu-sidebar-top">
        <div className="browse-text-sidebar">Browse</div>
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

        <ul className="inside-side-box">
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
        </ul>
      </List>
    </div>
  );

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
      // style={{ overflow: "revert" }}
      className={clsx(classes.list, {
        [classes.fullList]: subanchor === "top" || subanchor === "bottom",
      })}
      role="presentation"
      onKeyDown={() => setOpencontracts(false)}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={classes.drawerHeader}>
          <div className="menubar-contract" style={{ marginTop: "40px" }}>
            <div>
              <span
                onClick={() => setOpencontracts(false)}
                style={{ color: "white", fontSize: 17, cursor: "pointer" }}
              >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </span>
            </div>
            <div
              onClick={() => setOpencontracts(false)}
              style={{
                color: "white",
                fontSize: 13,
                marginLeft: "8px",
                cursor: "pointer",
              }}
            >
              Contract
            </div>
            <div>
              <IconButton
                style={{ color: "white", marginLeft: "12.630rem" }}
                onClick={childToggle(subanchor, false)}
              >
                {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
              </IconButton>
            </div>
          </div>
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
            href="/verify-contracts"
          >
            <div className="xinfin_api_button">Verify Contracts</div>
          </a>
          <hr className="myhr4" />
        </ul>
      </List>
    </div>
  );

  // ..................
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
      style={{ overflow: "revert" }}
      className={clsx(classes.list, {
        [classes.fullList]: subanchor === "top" || subanchor === "bottom",
      })}
      role="presentation"
      onKeyDown={() => setOpen(false)}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={classes.drawerHeader}>
          <div className="menubar-contract">
            <div style={{ marginTop: 10 }}>
              <span
                onClick={() => setOpen(false)}
                style={{ color: "white", fontSize: 17, cursor: "pointer" }}
              >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </span>
            </div>

            <div
              style={{
                color: "white",
                marginTop: "14px",
                fontSize: 13,
                marginLeft: "8px",
                cursor: "pointer",
              }}
            >
              Tools
            </div>
            <div>
              <IconButton
                style={{ color: "white", marginLeft: "14rem" }}
                onClick={childToolsToggle(subanchor, false)}
              >
                {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
              </IconButton>
            </div>
          </div>
        </div>
      </div>

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
            <div className="xinfin_account_button">Block Explorer</div>
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
              Become a Master Node/Validator
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
            <div className="xinfin_account_button">Block Explorer</div>
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
              Become a Master Node/Validator
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
    letter-spacing: 0.041rem;
    color: #ffffff;
    list-style: none;
  @media (min-width: 0px) and (max-width: 767px){
    font-size: 0.875rem;
  }
  `;

  const MobileNavigationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-flow: row;
    margin: 15px 0 0 0;
  `;

  const MobileToolBar = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px 10px 0 20px;
  `;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {viewPopUp == true ? <NewFeature></NewFeature> : <div />}
      <DeskTopView>
        <AppBar elevation={0} className={clsx(classes.appBar)}>
          <MobileToolBar>
            <Row className="Header">
              <a className="logo_tokensearch" href={"/"}>
                <img className="Shape" src={"/images/XDC-Icon-Logo.svg"}></img>
              </a>
              <a className="XDC" href="/">
                {" "}
                XDC{" "}
              </a>

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
                <a
                  exact
                  activeClassName="active-t"
                  href={"/tokens"}
                  className="Token"
                >
                  Tokens
                </a>


              </div>
            </Row>
            <Row alignItems="center">
              <Login />

              <React.Fragment key={"right"}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  className="hamburger-icon"
                  edge="end"
                  onClick={toggleDrawer("right", true)}
                >
                  <img className="menu-sidebar" src={"/images/Menu.svg"}></img>
                </IconButton>

                <Drawer
                  className={classes.drawer}
                  anchor={"right"}
                  open={state["right"]}
                >
                  {lists("right")}
                </Drawer>
                <Drawer className={classes.drawer} anchor={"right"} open={open}>
                  {items("right")}
                </Drawer>
                <Drawer
                  className={classes.drawer}
                  anchor={"right"}
                  open={opencontracts}
                >
                  {contracts("right")}
                </Drawer>
              </React.Fragment>
            </Row>
          </MobileToolBar>
        </AppBar>
      </DeskTopView>

      <MobileView>
        <AppBar elevation={0} className={clsx(classes.appBar)}>
          <MobileToolBar>
            <Typography className="Header">
              <div style={{ display: "flex", alignItems: "center" }}>
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
              </div>
            </Typography>
            <Row alignItems="center">
              <Login />

              <React.Fragment key={"right"}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={toggleDrawer("right", true)}
                >
                  {/* <MenuIcon class="menu-sidebar" /> */}
                  <img className="menu-sidebar" src={"/images/Menu.svg"}></img>
                </IconButton>

                <Drawer
                  className={classes.drawer}
                  anchor={"right"}
                  open={state["right"]}
                >
                  {lists("right")}
                </Drawer>
                <Drawer className={classes.drawer} anchor={"right"} open={open}>
                  {items("right")}
                </Drawer>
                <Drawer
                  className={classes.drawer}
                  anchor={"right"}
                  open={opencontracts}
                >
                  {contracts("right")}
                </Drawer>
              </React.Fragment>
            </Row>
          </MobileToolBar>
          <MobileNavigationContainer>
            <NavigationButton active={window.location.pathname == "/"} href="/">
              XDC Observatory
            </NavigationButton>
            <NavigationButton href="/tokens">Tokens</NavigationButton>
          </MobileNavigationContainer>
        </AppBar>
      </MobileView>
      <main className={clsx(classes.content)}>
        <div className="exp-parent">
          <img className="Shape3" src={"/images/Networkexplorer.svg"}></img>
          <div className="exp">XDC Observatory</div>
        </div>
        {/* ------------ Search bar ----------------- */}

        <div className="centerbox-parent">
          <div className="centerbox">
            <div className="main-form-container">
              <form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="search-dashboard">
                  <div className="search-dashboard-input">
                    <img
                      className="search-dashboard-icon"
                      src={"/images/Search.svg"}
                    ></img>
                    <input
                      defaultValue={filter}
                      onKeyUp={(event) => handleSearch(event)}
                      type="text"
                      ref={SearchDataRef}
                      className="main-input"
                      // onKeyPress={(event) => {
                      //   if (event.key === "Enter") {
                      //     handleSearch(event);
                      //   }
                      // }}
                      placeholder="Search"
                    />
                  </div>

                  <div className="search-dashboard-select">
                    <select
                      onChange={(event) => handleSearchOption(event)}
                      className="select"
                      id="SearchOption"
                      ref={SelectOptRef}
                    >
                      <option value="All filters" selected>
                        All Filters
                      </option>
                      <option value="Addresses">Addresses</option>
                      <option value="Blocks">Blocks</option>
                      <option value="Tokens">Tokens</option>
                      <option value="Transaction">Transaction</option>
                      {/* <option value="Nametags">Nametags</option>
                                    <option value="Labels">Labels</option>
                                    <option value="Websites">Websites</option> */}
                    </select>
                  </div>
                </div>
              </form>

              <ul style={{ color: "black" }}>
                {list.map((name) => {
                  if (filter.length !== 0) {
                    if (name.toLowerCase().startsWith(filter.toLowerCase()))
                      return <li>{name}</li>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
            <div className="error-message-div">
              <span className="error-message">{errorMessage}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
