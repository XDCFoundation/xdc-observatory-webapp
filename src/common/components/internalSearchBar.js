import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "../../assets/styles/custom.css";
import SearchData from "../../services/search";
import Utility from "../../utility";
import { Row } from "simple-flexbox";
import { eventConstants, recentSearchTypeConstants } from "../../constants";
import { useDispatch } from "react-redux";


const drawerWidth = 240;
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
  appBarDark: {
    position: "unset !important",
    backgroundColor: "#132a69",
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
    listDark: {
      width: "21.25rem",
      backgroundColor: "#283966",
      height: "100%",
    },
  },

  "@media (min-width: 0px) and (max-width: 767px)": {
    list: {
      width: "153px",
      backgroundColor: "#102e84",
      height: "100%",
    },
    listDark: {
      width: "21.25rem",
      backgroundColor: "#283966",
      height: "100%",
    },
  },
  fullList: {
    width: "auto",
  },
}));

const SearchBox = (props) => {
  const classes = props.classes;
  const dispatch = useDispatch();
  const SelectOptRef = React.useRef(null);
  const SearchDataRef = React.useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const BlockChainSearch = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        SearchData.searchData(data)
      );

      if (!responseData || responseData[0]?.token?.length == 0) {
        window.location.href = `/data-not-found?searchString=${data?.data}`;
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

  const handleSearch = (event) => {
    if (event.target.value.length == 0) {
      setErrorMessage("")
      return
    }
    if (event.key === "Enter") {
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (format.test(event.target.value)) {
        window.location.href = `/data-not-found?searchString=${event.target.value}`;
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
  const handleSearchByButton = () => {
    let searchData = SearchDataRef.current.value
    if (searchData.length == 0) {
      setErrorMessage("")
      return
    }
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (format.test(searchData)) {
      window.location.href = `/data-not-found?searchString=${searchData}`;
    } else {
      let selectOptType = SelectOptRef.current?.value;
      let requestdata = {
        filter: selectOptType,
        data: searchData,
      };
      BlockChainSearch(requestdata);
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
              type="text"
              onKeyUp={(event) => handleSearch(event)}
              ref={SearchDataRef}
              className={"main-input-td "}
              src={"/images/Search.png"}
              placeholder="Search by Address / Txn Hash / Block"
            />
            <div
              className={"white-space-no-wrap border-d2deff bg-eaf0ff br-4 p-wallet-search m-r-10 cursor-pointer m-r-40-tab"
              }
              onClick={handleSearchByButton}
            >
              <span className="color-4878ff fs-14 fw-500">
                Search
              </span>
            </div>
            <div className="mobFilter">
              <select
                className={"select-td"}
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
              </select>
            </div>
          </div>
        </Row>

      </form>
    </div>
  );
};
export default SearchBox