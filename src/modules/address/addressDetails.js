import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import "../../assets/styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import AddressTableComponent from "./addressTable";
import { ImQrcode } from "react-icons/im";
import Popup from "reactjs-popup";
import { Grid } from "@material-ui/core";
import Utility, { dispatchAction } from "../../utility";
import AddressData from "../../services/address";
import Tooltip from "@material-ui/core/Tooltip";
import {
  TransactionService,
  CoinMarketService,
  UserService, WatchListService,
} from "../../services";
import { sessionManager } from "../../managers/sessionManager";
import Utils from "../../utility";
import { Row } from "simple-flexbox";
import format from "format-number";
import moment from "moment";
import AddressStatsData from "./addressStatsData";
import PrivateAddressTag from "../../modules/common/dialog/privateAddressTag";
import AddToWatchListPopup from "../../modules/common/dialog/watchListPopup";
import AddressDetailsAnalytics from "./addressDetailsAnalytics/addressDetailsAnalytics";
import LoginDialog from "../explorer/loginDialog";
import { genericConstants, cookiesConstants } from "../../constants";
import EditTagAddress from "../../modules/common/dialog/editTagPopup";
import toast, { Toaster } from "react-hot-toast";
import utility from "../../utility";
var QRCode = require("qrcode.react");

const useStyles = makeStyles({
  container: {
    borderRadius: "0.875rem",
    boxShadow: "0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    background: "#fff",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "187.5rem",
    // marginTop: "6.25rem",
    marginBottom: "0.938rem",
    width: "100%",
    "@media (min-width: 300px) and (max-width: 567px)": {
      marginTop: "8.125rem",
      maxWidth: "31.25rem",
      padding: "0 0.5rem 0 0.5rem",
    },
    "@media (min-width: 567px) and (max-width: 767px)": {
      marginTop: "8.75rem",
      maxWidth: "46.25rem",
    },
    "@media (min-width: 767px) and (max-width: 1040px)": {
      maxWidth: "63.75rem",
    },
  },
  rowDiv: {
    width: "100%",
    alignItems: "center",
    height: "3.313rem",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "0.438rem",

    justifyContent: "space-between",
  },
  line: {
    width: "100%",
    marginTop: "0rem",
    marginBottom: "0rem",
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "@media (min-width: 300px) and (max-width: 767px)": {
      maxWidth: "31.25rem",
      padding: "0 0.5rem 0 0.5rem",
    },
  },
});
const MainContanier = styled.div`
  // height: 231px;
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  padding: 18px;
  // margin-bottom: 35px;
  // @media (max-width: 767px) {
  //   height: 427px;
  // }
  // @media (min-width: 768px) and (max-width: 1240px) {
  //   height: 249px;
  // }
`;
const MainDiv = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;
const QrDiv = styled.div`
  width: 195px;
  height: 195px;
  padding: 20px;
  border-radius: 6px;
  border: solid 1px #f5f5f5;
  background-color: var(--white-two);
  @media (max-width: 767px) {
    width: 121px;
    height: 121px;
    padding: 7px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 170px;
    height: 170px;
    margin-top: 20px;
  }
`;
const DetailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 24px;
  @media (max-width: 767px) {
    margin-left: 0px;
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    margin-left: 16px;
  }
`;
const ButtonDiv = styled.div`
  flex: 0.3;
  @media (max-width: 1240px) {
    display: none;
  }
`;
const Login = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  @media (max-width: 1240px) {
    display: none;
  }
`;
const AddressDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.6;
`;
const AddressLine = styled.div`
  display: flex;
  align-items: center;
`;
const AddressHashDiv = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    margin-top: 10px;
    word-break: break-all;
    display: block;
    align-items: center;
    text-align: -webkit-center;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
const AddressHash = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  color: #3a3a3a;
  @media (max-width: 767px) {
    font-size: 13px;
    text-align: center;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
  }
`;
const CopyButton = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;
const BalanceDiv = styled.div`
  font-family: Inter;
  font-size: 30px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  color: #2149b9;
  margin-top: 7px;
  @media (max-width: 767px) {
    font-size: 18px;
    margin: 10px auto;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 24px;
  }
`;
const BalanceUsdDiv = styled.div`
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  color: #585858;
  margin-top: 5px;
  @media (max-width: 767px) {
    font-size: 14px;
    margin: 2px auto;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 16px;
  }
`;
const AddressAgeDiv = styled.div`
  display: flex;
  margin-top: 15px;
  @media (max-width: 767px) {
    margin-top: 10px;
  }
`;
const AddressAge = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  
  color: #252525;
  @media (max-width: 767px) {
    font-size: 13px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
  }
`;
const AddressAgeValue = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  
  color: #3a3a3a;
  margin-left: 70px;
  @media (max-width: 767px) {
    font-size: 13px;
    margin-left: 45px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
    margin-left: 48px;
  }
`;
const LastActivityDiv = styled.div`
  display: flex;
`;
const LastActivity = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  
  color: #252525;
  @media (max-width: 767px) {
    font-size: 13px;
    white-space: nowrap;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
    white-space: nowrap;
  }
`;
const LastActivityValue = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  
  color: #3a3a3a;
  margin-left: 73px;
  @media (max-width: 767px) {
    font-size: 13px;
    margin-left: 46px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
    margin-left: 52px;
  }
`;

const RankDiv = styled.div`
  display: flex;
`;
const Rank = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  
  color: #252525;
  @media (max-width: 767px) {
    font-size: 13px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
  }
`;
const RankValue = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  
  color: #3a3a3a;
  margin-left: 126px;
  @media (max-width: 767px) {
    font-size: 13px;
    margin-left: 93px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 14px;
    margin-left: 101px;
  }
`;
const AddTagButton = styled.button`
  width: 95px;
  height: 28px;
  border-radius: 4px;
  background-color: #4878ff;
  color: #fff;
`;
const AddToWatchList = styled.button`
  width: 166px;
  height: 28px;
  border-radius: 4px;
  background-color: #4878ff;
  color: #fff;
  margin-left: 15px;
`;
const HeadingDiv = styled.div`
  margin-top: 25px;
  display: flex;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    align-items: flex-start;
  }
`;
const Heading = styled.div`
  font-family: Inter;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  color: #2a2a2a;
  @media (max-width: 767px) {
    font-size: 14px;
    
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 18px;
  }
`;
const IconForMobile = styled.div`
  display: none;
  @media (max-width: 1240px) {
    display: flex;
    justify-content: space-between;
    flex: 0.25;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    flex: 0.13;
  }
`;
const WatchListImage = styled.div`
  @media (max-width: 767px) {
    width: 26px;
    height: 26px;
    padding: 3px;
    border-radius: 4px;
    background-color: #4878ff;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    display: none;
  }
`;
const TagImage = styled.div`
  @media (min-width: 768px) and (max-width: 1240px) {
    display: none;
  }
  @media (max-width: 767px) {
    width: 26px;
    height: 26px;
    padding: 3px;
    border-radius: 4px;
    background-color: #4878ff;
  }
`;
const TagImageTab = styled.div`
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background-color: #2149b9;
    padding: 3px;
  }
`;
const WactListImageTab = styled.div`
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background-color: #2149b9;
    padding: 3px;
  }
`;
const LoginText = styled.span`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: right;
  color: #3a3a3a;
`;
const LoginTextMobile = styled.span`
  width: 150px;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #3a3a3a;
  @media (min-width: 768px) and (max-width: 1240px) {
    font-size: 12px;
    width: 305px;
  }
`;
const LoginMobile = styled.div`
  display: none;
  @media (max-width: 1240px) {
    display: flex;
    flex: 0.25;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    flex: 0.13;
  }
`;
const Tag = styled.div`
  min-width: 95px;
  height: 28px;
  border-radius: 4px;
  border: solid 1px #d2deff;
  background-color: #eaf0ff;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-align: center;
  padding: 4px;
  color: #4878ff;
  margin-left: 10px;
  @media (max-width: 767px) {
    margin-top: 10px;
    min-width: 95px;
    width: fit-content;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    margin-left: 0px;
  }
`;
export default function AddressDetails(props) {
  const [toggleState, setToggleState] = useState(1);
  const [addressData, setAddressData] = useState(0);
  const [txtAddress, setTxtAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [convertCurrency, setConvertCurrency] = useState("");
  const [coinValue, setCoinValue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [copiedText, setCopiedText] = useState("");
  let nowCurrency = window.localStorage.getItem("currency");
  const [addressTag, setAddressTag] = useState([]);
  const [isTag, setIsTag] = useState(false);
  const [amount, setAmount] = useState("");
  const [coinMarketPrice, setCoinMarketPrice] = useState(0);
  const [price, setPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [addressStats, setAddressStats] = useState("");
  const [dialogPvtTagIsOpen, setDialogPvtTagIsOpen] = React.useState(false);
  const [dialogWatchListIsOpen, setDialogWatchListIsOpen] =
    React.useState(false);
  const [editTagAddressIsOpen, setDialogEditTagAddressIsOpen] =
    React.useState(false);
  const [dialogValue, setDailogValue] = React.useState(0);
  const [loginDialogIsOpen, setLoginDialogIsOpen] = React.useState(false);
  const [stop, setStop] = React.useState(false);
  const [watchlistDetails, setWatchListDetails] = React.useState(null);
  const [existingWatchList, setExistingWatchList] = React.useState(null);
  const closeDialogPvtTag = () => {
    setDialogPvtTagIsOpen(false);
    setDailogValue(0);
  };
  const openDialogPvtTag = () => {
    setDialogPvtTagIsOpen(true);
    setDailogValue(1);
  };
  const closeDialogWatchList = () => {
    setDialogWatchListIsOpen(false);
    setDailogValue(0);
  };
  const openDialogWatchList = () => {
    setDialogWatchListIsOpen(true);
    setDailogValue(1);
  };
  const closeDialogEditTagAddress = () => {
    setDialogEditTagAddressIsOpen(false);
    setDailogValue(0);
  };
  const openDialogEditTagAddress = () => {
    setDialogEditTagAddressIsOpen(true);
    setDailogValue(1);
  };
  let { addr } = useParams();
  let px = currentPrice * price;
  let priceChanged = !price ? "" : Utility.decimalDivison(px, 8);
  let priceChanged1 = priceChanged.toString().split(".")[0];
  let priceChanged2 = priceChanged.toString().split(".")[1];

  let balanceChanged1 = balance.toString().split(".")[0];
  let balanceChanged2 = balance.toString().split(".")[1];
  let activeCurrency = window.localStorage.getItem("currency");
  const openLoginDialog = () => setLoginDialogIsOpen(true);
  const closeLoginDialog = () => setLoginDialogIsOpen(false);

  const currencySymbol = !price ? "" :
    activeCurrency === "USD" ? "$" : "€";
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const { width } = windowDimensions;

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const classes = useStyles();

  function _handleChange(event) {
    setAmount(event?.target?.value);
    window.localStorage.setItem("currency", event?.target?.value);
  }

  const getAddressDetails = async () => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getAddressDetail(addr)
      );
      if (
        !responseData ||
        responseData.length === 0 ||
        responseData === "" ||
        responseData === null
      ) {
        setBalance(parseFloat(0).toFixed(8));
        setLoading(false);
      }
      if (responseData) {
        setBalance(Utility.decimalDivisonOnly(responseData.balance, 8));
        setCurrentPrice(responseData.balance);
        setAddressData(responseData);
        setLoading(false);
      } else {
        setBalance(parseFloat(0).toFixed(8));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAddressStats = async () => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getAddressStats(addr)
      );
      if (
        !responseData ||
        responseData.length === 0 ||
        responseData === "" ||
        responseData === null
      ) {
        setLoading(false);
      }
      if (responseData) {
        setAddressStats(responseData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const coinMarketCapDetails = async () => {
    let [error, totalcoinMarketPrice] = await Utils?.parseResponse(
      CoinMarketService?.getCoinMarketData(activeCurrency, {})
    );
    if (error || !totalcoinMarketPrice) return;
    totalcoinMarketPrice = totalcoinMarketPrice.sort((a, b) => {
      return a.lastUpdated - b.lastUpdated;
    });
    setPrice(totalcoinMarketPrice[1]?.price);
  };
  const getListOfTagAddress = async (requestData) => {
    const request = {
      limit: "5",
      skip: "0",
      userId: sessionManager.getDataFromCookies("userId"),
      isTaggedAddress: true,
    };
    const response = await UserService.getTagAddresstList(request);
    if (response.totalCount > 0) {
      // setTxnAddressNotAdded(false);
    }
    // setPrivateAddress(response.tagAddressContent);
  };
  const options = {
    htmlparser2: {
      lowerCaseTags: false,
    },
  };

  const tagUsingAddressHash = async () => {
    const data = {
      address: addr,
      userId: sessionManager.getDataFromCookies("userId"),
    };
    let taggedAddress = localStorage.getItem(
        data.userId + cookiesConstants.USER_TAGGED_ADDRESS
    );

    // let existingTagsIndex=null;
    // const existingTag = taggedAddress.find(
    //     (item,index) => {
    //       if(item.address == addr && item.userId == data.userId){
    //         existingTagsIndex = index;
    //         return true;
    //       }
    //     }
    // );
    // if (existingTag) {
    //   setAddressTag(existingTag.tagName);
    //   setIsTag(true);
    // }
    // let [error, tagUsingAddressHashResponse] = await Utils.parseResponse(
    //   TransactionService.getUserAddressTagUsingAddressHash(data)
    // );
    // if (error || !tagUsingAddressHashResponse) return;
  };

  useEffect(() => {
    getAddressDetails();
    coinMarketCapDetails();
    tagUsingAddressHash();
    // getListOfTagAddress();
    getAddressStats();
    getWatchList();
  }, [amount]);

  const getWatchList = async ()=>{
    const request = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: addr,
      skip:0,
      limit:10
    }

const res = await UserService.getWatchlistList(request)
    if(res && res.watchlistContent && res.watchlistContent.length){
      setWatchListDetails(res.watchlistContent[0]);
        setExistingWatchList(true);
    }
  }

  const currentTime = new Date();
  const previousTime = new Date(addressData?.timestamp * 1000);
  const ti = !addressData?.timestamp
    ? ""
    :
    moment(addressData?.timestamp * 1000).format(
      "MMM DD, YYYY h:mm A"
    )

  const lastActivityTime = new Date(
    addressStats?.lastTransactionTimestamp * 1000
  );
  const lastAct = !addressStats?.lastTransactionTimestamp
    ? ""
    : Utility.timeDiff(currentTime, lastActivityTime);
  let lastActConverted = !addressStats?.lastTransactionTimestamp ? "" : ((moment(
    Number(addressStats?.lastTransactionTimestamp) *
    1000
  )
    .utc()
    .format("MMM-DD-YYYY h:mm:ss A") + "  UTC"))
  let userId = sessionManager.getDataFromCookies("userId");
  let taggedAddressfetched = localStorage.getItem(
      userId+cookiesConstants.USER_TAGGED_ADDRESS
  );
  let tags =
    taggedAddressfetched && taggedAddressfetched.length > 0
      ? JSON.parse(taggedAddressfetched)
      : "";

  var tagValue = tags && tags.length > 0 ? tags?.filter((obj) => obj.address === addr && obj.userId == userId) : "";
  let watchlists = localStorage.getItem(
      userId+cookiesConstants.USER_ADDRESS_WATCHLIST
  );
  let watchList =
    watchlists ? JSON.parse(watchlists) : "";
    // watchList &&
    // watchList?.filter((item) => item.address == addr && item.userId == userId);
  async function remove() {
    delete watchList[addr];
    // var i = watchList.findIndex((obj) => obj.address === addr);
    // if (i !== -1) {
    //   watchList.splice(i, 1);
    const [error, response] = await utility.parseResponse(
        WatchListService.deleteWatchlist({ _id: watchlistDetails._id }, watchlistDetails)
    );
      localStorage.setItem(
        userId+cookiesConstants.USER_ADDRESS_WATCHLIST,
        JSON.stringify(watchList)
      );
    // }
    setExistingWatchList(null);
    setStop("");
    setStop(true);
  }

  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <Tokensearchbar />

        <Grid className="table-grid-block grid-block-table">
          <div>
            <Toaster />
          </div>
          <HeadingDiv>
            <Heading>Address Details</Heading>
            {sessionManager.getDataFromCookies("isLoggedIn") ? (
              <>
                {
                  <>
                    <EditTagAddress
                      open={editTagAddressIsOpen}
                      onClose={closeDialogEditTagAddress}
                      address={addr}
                      tag={tagValue[tagValue?.length - 1]?.tagName}
                      id={tagValue[tagValue?.length - 1]?.userId}
                      value={dialogValue}
                    />
                    <PrivateAddressTag
                      open={dialogPvtTagIsOpen}
                      onClose={closeDialogPvtTag}
                      fromAddr={addr}
                      value={dialogValue}
                      hash={addr}
                    />
                    <AddToWatchListPopup
                      open={dialogWatchListIsOpen}
                      onClose={closeDialogWatchList}
                      value={dialogValue}
                      setExistingWatchList={setExistingWatchList}
                      hash={addr}
                    />
                  </>
                }

                <>
                  <IconForMobile>
                    {tagValue && tagValue?.length > 0 ? (
                      <>
                        <TagImage onClick={openDialogEditTagAddress}>
                          <img
                            className="copyIconAddress"
                            src={"/images/edit-tag.svg"}
                          />
                        </TagImage>
                        <TagImageTab onClick={openDialogEditTagAddress}>
                          <img
                            className="tagIconAddress"
                            src={"/images/edit-tag.svg"}
                          />
                        </TagImageTab>
                      </>
                    ) : (
                      <>
                        <TagImage onClick={openDialogPvtTag}>
                          <img
                            className="copyIconAddress"
                            src={"/images/tag-white.svg"}
                          />
                        </TagImage>
                        <TagImageTab onClick={openDialogPvtTag}>
                          <img
                            className="tagIconAddress"
                            src={"/images/tag-white.svg"}
                          />
                        </TagImageTab>
                      </>
                    )}
                    {existingWatchList ? (
                      <>
                        <WatchListImage onClick={remove}>
                          <img
                            className="copyIconAddress"
                            src={"/images/stop-watching.svg"}
                          />
                        </WatchListImage>
                        <WactListImageTab onClick={remove}>
                          <img
                            className="tagIconAddress"
                            src={"/images/stop-watching.svg"}
                          />
                        </WactListImageTab>
                      </>
                    ) : (
                      <>
                        <WatchListImage onClick={openDialogWatchList}>
                          <img
                            className="copyIconAddress"
                            src={"/images/preview-white.svg"}
                          />
                        </WatchListImage>
                        <WactListImageTab onClick={openDialogWatchList}>
                          <img
                            className="tagIconAddress"
                            src={"/images/preview-white.svg"}
                          />
                        </WactListImageTab>
                      </>
                    )}
                  </IconForMobile>
                </>
              </>
            ) : (
              <LoginMobile>
                {
                  <LoginDialog
                    open={loginDialogIsOpen}
                    onClose={closeLoginDialog}
                    dataHashOrAddress={addr}
                  />
                }
                <LoginTextMobile>
                  Want to tag and add this address to watchlist?
                  <a
                    className="linkTableDetails-address"
                    onClick={openLoginDialog}
                  >
                    &nbsp;Login
                  </a>
                </LoginTextMobile>
              </LoginMobile>
            )}
          </HeadingDiv>
          <MainContanier>
            <MainDiv>
              <QrDiv>
                <QRCode
                  className="qrcode-address-details"
                  value={addr}
                />
              </QrDiv>
              <DetailDiv>
                <AddressDetailDiv>
                  <AddressHashDiv>
                    <AddressLine>
                      <AddressHash>{addr}</AddressHash>
                      <CopyButton>
                        <CopyToClipboard
                          text={addr}
                          onCopy={() => setCopiedText(addr)}
                        >
                          <Tooltip
                            title={
                              copiedText === addr
                                ? "Copied"
                                : "Copy To Clipboard"
                            }
                            placement="top"
                          >
                            <button className="copyToClipboardAddress">
                              <img
                                className="copyIconAddress"
                                src={"/images/copy-grey.svg"}
                              />
                            </button>
                          </Tooltip>
                        </CopyToClipboard>
                      </CopyButton>
                    </AddressLine>
                    {sessionManager.getDataFromCookies("isLoggedIn") &&
                      tagValue &&
                      tagValue?.length > 0 ? (
                      <Tag>{tagValue[tagValue?.length - 1]?.tagName}</Tag>
                    ) : (
                      ""
                    )}
                  </AddressHashDiv>

                  <BalanceDiv>
                    {balanceChanged2 == null ? (
                      <span>{format({})(balanceChanged1)}</span>
                    ) : (
                      <span>
                        {format({})(balanceChanged1)}
                        {"."}
                        <span style={{ color: "#95acef" }}>
                          {balanceChanged2}
                        </span>
                      </span>
                    )}
                    &nbsp;XDC
                  </BalanceDiv>
                  <BalanceUsdDiv>
                    {" "}
                    {currencySymbol}
                    {priceChanged2 == null ? (
                      <span>{priceChanged1}</span>
                    ) : (
                      <span>
                        {priceChanged1}
                        {"."}
                        <span style={{ color: "#9FA9BA" }}>
                          {priceChanged2}
                        </span>
                      </span>
                    )}
                  </BalanceUsdDiv>
                  {/*
                  <AddressAgeDiv>
                    <AddressAge>Address Age</AddressAge>
                    <AddressAgeValue>{ti}</AddressAgeValue>
                  </AddressAgeDiv>


*/}
                  <AddressAgeDiv> {/* TODO: REVERT THE CSS TAG BACK TO LASTACTIVITY ONCE ADDRESS AGE IS FIXED*/}
                    <LastActivity>Last Activity</LastActivity>
                    <LastActivityValue>
                      {lastAct}&nbsp;
                      {!lastActConverted ? "" : "(" + (lastActConverted) + ")"}

                    </LastActivityValue>
                  </AddressAgeDiv>
                  <RankDiv>
                    <Rank>Rank</Rank>
                    <RankValue>Not available</RankValue>
                  </RankDiv>
                </AddressDetailDiv>
                <ButtonDiv>
                  {sessionManager.getDataFromCookies("isLoggedIn") ? (
                    <>
                      {
                        <>
                          <EditTagAddress
                            open={editTagAddressIsOpen}
                            onClose={closeDialogEditTagAddress}
                            address={addr}
                            tag={tagValue[tagValue?.length - 1]?.tagName}
                            id={tagValue[tagValue?.length - 1]?.userId}
                            value={dialogValue}
                          />
                          <PrivateAddressTag
                            open={dialogPvtTagIsOpen}
                            onClose={closeDialogPvtTag}
                            fromAddr={addr}
                            value={dialogValue}
                          />
                          <AddToWatchListPopup
                            open={dialogWatchListIsOpen}
                            setExistingWatchList={setExistingWatchList}
                            onClose={closeDialogWatchList}
                            fromAddr={transactions.from}
                            value={dialogValue}
                            hash={addr}
                          />
                        </>
                      }

                      <>
                        {tagValue && tagValue?.length > 0 ? (
                          <AddTagButton onClick={openDialogEditTagAddress}>
                            <img
                              className="tag-white-icon"
                              src={"/images/edit-tag.svg"}
                            />
                            Edit Tag
                          </AddTagButton>
                        ) : (
                          <AddTagButton onClick={openDialogPvtTag}>
                            <img
                              className="tag-white-icon"
                              src={"/images/tag-white.svg"}
                            />
                            Add Tag
                          </AddTagButton>
                        )}
                        {existingWatchList ? (
                          <AddToWatchList onClick={remove}>
                            <img
                              className="tag-white-icon"
                              src={"/images/stop-watching.svg"}
                            />
                            Stop watching
                          </AddToWatchList>
                        ) : (
                          <AddToWatchList onClick={openDialogWatchList}>
                            <img
                              className="tag-white-icon"
                              src={"/images/preview-white.svg"}
                            />
                            Add to Watchlist
                          </AddToWatchList>
                        )}
                      </>
                    </>
                  ) : (
                    <Login>
                      {
                        <LoginDialog
                          open={loginDialogIsOpen}
                          onClose={closeLoginDialog}
                          dataHashOrAddress={addr}
                        />
                      }
                      <LoginText>
                        Want to tag and add this address to watchlist?
                      </LoginText>
                      <a
                        className="linkTableDetails-address"
                        onClick={openLoginDialog}
                      >
                        &nbsp;Login
                      </a>
                    </Login>
                  )}
                </ButtonDiv>
              </DetailDiv>
            </MainDiv>
          </MainContanier>
          <AddressStatsData
            statData={addressStats}
            price={price}
            currency={amount}
          />
          <div className="container_sec sec-contain">
            <div className="block_sec sec-block sec-block-mb">
              <div className="bloc-tabs_sec_addressDetail">
                <button
                  className={
                    toggleState === 1 ? "tabs_sec_address_details active-tabs_sec" : "tabs_sec_address_details"
                  }
                  onClick={() => toggleTab(1)}
                  id="transaction-btn"
                >
                  Transactions
                </button>
                <button
                  className={
                    toggleState === 2
                      ? "tabs_sec active-tabs_sec_analytics"
                      : "tabs_sec"
                  }
                  onClick={() => toggleTab(2)}
                  id="transaction-btn"
                >
                  Analytics
                </button>
              </div>
            </div>
            {toggleState === 1 && (
              <div
                className={
                  toggleState === 1
                    ? "content_sec  active-content_sec sec-active"
                    : "content_sec"
                }
              >
                <div>
                  {isTag ? (
                    <AddressTableComponent
                      trans={transactions}
                      coinadd={addr}
                      tag={addressTag}
                    />
                  ) : (
                    <AddressTableComponent
                      trans={transactions}
                      coinadd={addr}
                      currency={amount}
                    />
                  )}
                </div>
              </div>
            )}
            {toggleState === 2 && <AddressDetailsAnalytics />}
          </div>
        </Grid>
        <FooterComponent _handleChange={_handleChange} currency={amount} />
      </div>
    </>
  );
}
