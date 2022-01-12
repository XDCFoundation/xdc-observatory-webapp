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
import { TransactionService, CoinMarketService } from "../../services";
import { sessionManager } from "../../managers/sessionManager";
import Utils from "../../utility";
import { Row } from "simple-flexbox";
import format from "format-number";
import moment from "moment";
import AddressStatsData from "./addressStatsData";
import PrivateAddressTag from "../../modules/common/dialog/privateAddressTag";
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
  height: 231px;
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  padding: 18px;
  margin-bottom: 35px;
  @media (max-width: 767px) {
    height: 385px;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    height: 249px;
  }
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
const AddressDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.6;
`;
const AddressHashDiv = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    margin-top:10px
    word-break:break-all
  }
`;
const AddressHash = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0px
  color: #3a3a3a;
  @media (max-width: 767px) {
    font-size: 13px;
    text-align: center;
  }
  @media (min-width: 768px) and (max-width:1240px) {
    font-size:14px;
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
  letter-spacing: 0px
  color: #2149b9;
  margin-top: 7px;
  @media (max-width: 767px) {
    font-size: 18px;
    margin: 10px auto;
  }
   @media (min-width: 768px) and (max-width:1240px) {
   font-size:24px;
  }
`;
const BalanceUsdDiv = styled.div`
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0px
  color: #585858;
  margin-top: 5px;
  @media (max-width: 767px) {
    font-size: 14px;
    margin: 2px auto;
  }
   @media (min-width: 768px) and (max-width:1240px) {
    font-size:16px;
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
  letter-spacing: 0px
  color: #252525;
  @media (max-width: 767px) {
    font-size: 13px;
  }
   @media (min-width: 768px) and (max-width:1240px) {
    font-size:14px
  }
`;
const AddressAgeValue = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  letter-spacing: 0px
  color: #3a3a3a;
  margin-left: 70px;
  @media (max-width: 767px) {
    font-size: 13px;
    margin-left: 45px;
  }
   @media (min-width: 768px) and (max-width:1240px) {
    font-size:14px
    margin-left:48px;
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
  letter-spacing: 0px
  color: #252525;
  @media (max-width: 767px) {
    font-size: 13px;
    white-space: nowrap;
  }
   @media (min-width: 768px) and (max-width:1240px) {
    font-size:14px;
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
  letter-spacing: 0px
  color: #3a3a3a;
  margin-left: 73px;
  @media (max-width: 767px) {
    font-size: 13px;
    margin-left: 46px;
  }
   @media (min-width: 768px) and (max-width:1240px) {
    font-size:14px
    margin-left:52px
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
  letter-spacing: 0px
  color: #252525;
  @media (max-width: 767px) {
    font-size: 13px;
  }
   @media (min-width: 768px) and (max-width:1240px) {
    font-size:14px
  }
`;
const RankValue = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  letter-spacing: 0px
  color: #3a3a3a;
  margin-left: 126px;
  @media (max-width: 767px) {
    font-size: 13px;
    margin-left: 93px;
  }
   @media (min-width: 768px) and (max-width:1240px) {
    font-size:14px
    margin-left:101px;
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
`;
const Heading = styled.div`
  font-family: Inter;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0px
  color: #2a2a2a;
  @media (max-width: 767px) {
    font-size: 14px;
    letter-spacing: 0px
  }
  @media (min-width: 768px) and (max-width:1240px) {
    font-size:18px;
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
  @media (min-width: 768px) and (max-width: 1240px) {
    display: none;
  }
`;
const TagImage = styled.div`
  @media (min-width: 768px) and (max-width: 1240px) {
    display: none;
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
export default function AddressDetails(props) {
  const [toggleState, setToggleState] = useState(1);
  const [addressData, setAddressData] = useState(0);
  const [txtAddress, setTxtAddress] = useState("");
  const [balance, setBalance] = useState(0);
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
  const [price, setPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [addressStats, setAddressStats] = useState(0);
  const [dialogPvtTagIsOpen, setDialogPvtTagIsOpen] = React.useState(false);
  const [dialogValue, setDailogValue] = React.useState(0);
  const closeDialogPvtTag = () => {
    setDialogPvtTagIsOpen(false);
    setDailogValue(0);
  };
  const openDialogPvtTag = () => {
    setDialogPvtTagIsOpen(true);
    setDailogValue(1);
  };
  let { addr } = useParams();
  let px = currentPrice * price;
  let priceChanged = Utility.decimalDivison(px, 8);
  let priceChanged1 = priceChanged.toString().split(".")[0];
  let priceChanged2 = priceChanged.toString().split(".")[1];

  let balanceChanged1 = balance.toString().split(".")[0];
  let balanceChanged2 = balance.toString().split(".")[1];
  let activeCurrency = window.localStorage.getItem("currency");
  const currencySymbol =
    activeCurrency === "INR" ? "₹" : activeCurrency === "USD" ? "$" : "€";
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

    let [error, tagUsingAddressHashResponse] = await Utils.parseResponse(
      TransactionService.getUserAddressTagUsingAddressHash(data)
    );
    if (error || !tagUsingAddressHashResponse) return;
    setAddressTag(tagUsingAddressHashResponse[0]?.tagName);
    setIsTag(true);
  };

  useEffect(() => {
    getAddressDetails();
    coinMarketCapDetails();
    tagUsingAddressHash();
    getAddressStats();
  }, [amount]);

  const CloseIcon = styled.img`
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    @media (min-width: 0) and (max-width: 768px) {
      margin-left: auto;
      margin-right: 20px;
      display: ${(props) => (props.isDesktop ? "none" : "block")};
    }
    @media (min-width: 768px) {
      display: ${(props) => (props.isDesktop ? "block" : "none")};
    }
  `;
  const currentTime = new Date();
  const previousTime = new Date(addressData?.timestamp * 1000);
  const ti = Utility.timeDiff(currentTime, previousTime);

  const lastActivityTime = new Date(
    addressStats?.lastTransactionTimestamp * 1000
  );
  const lastAct = Utility.timeDiff(currentTime, lastActivityTime);
  const [balanceTT, setBalanceTT] = React.useState(false);
  const [xdcValueTT, setXDCTT] = React.useState(false);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Tokensearchbar />
      <Grid className="table-grid-block grid-block-table">
        <HeadingDiv>
          <Heading>Address Details</Heading>
          <IconForMobile>
            <TagImage>
              <img className="copyIconAddress" src={"/images/tag.svg"} />
            </TagImage>
            <TagImageTab>
              <img className="tagIconAddress" src={"/images/tag-white.svg"} />
            </TagImageTab>
            <WatchListImage>
              <img
                className="copyIconAddress"
                src={"/images/preview-blue.svg"}
              />
            </WatchListImage>
            <WactListImageTab>
              <img
                className="tagIconAddress"
                src={"/images/preview-white.svg"}
              />
            </WactListImageTab>
          </IconForMobile>
        </HeadingDiv>
        <MainContanier>
          <MainDiv>
            <QrDiv>
              <QRCode
                className="qrcode-address-details"
                value={process.env.REACT_APP_QR_CODE_LINK + addr}
              />
            </QrDiv>
            <DetailDiv>
              <AddressDetailDiv>
                <AddressHashDiv>
                  <AddressHash>{addr}</AddressHash>
                  <CopyButton>
                    <CopyToClipboard
                      text={addr}
                      onCopy={() => setCopiedText(addr)}
                    >
                      <Tooltip
                        title={
                          copiedText === addr ? "Copied" : "Copy To Clipboard"
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
                      <span style={{ color: "#9FA9BA" }}>{priceChanged2}</span>
                    </span>
                  )}
                </BalanceUsdDiv>
                <AddressAgeDiv>
                  <AddressAge>Address Age</AddressAge>
                  <AddressAgeValue>{ti ? ti : 0}</AddressAgeValue>
                </AddressAgeDiv>
                <LastActivityDiv>
                  <LastActivity>Last Activity</LastActivity>
                  <LastActivityValue>
                    {lastAct} (
                    {addressStats?.lastTransactionTimestamp &&
                    !isNaN(Number(addressStats?.lastTransactionTimestamp))
                      ? moment(
                          Number(addressStats?.lastTransactionTimestamp) * 1000
                        )
                          .utc()
                          .format("MMM-DD-YYYY h:mm:ss A") + "  UTC"
                      : ""}
                    )
                  </LastActivityValue>
                </LastActivityDiv>
                <RankDiv>
                  <Rank>Rank</Rank>
                  <RankValue>158</RankValue>
                </RankDiv>
              </AddressDetailDiv>
              <ButtonDiv>
                {sessionManager.getDataFromCookies("isLoggedIn") ? (
                  <>
                    {
                      <PrivateAddressTag
                        open={dialogPvtTagIsOpen}
                        onClose={closeDialogPvtTag}
                        fromAddr={transactions.from}
                        value={dialogValue}
                        hash={addr}
                      />
                    }
                    {isTag ? (
                      <div className="nameLabel">{addressTag[0]?.tagName}</div>
                    ) : (
                      <>
                        <AddTagButton onClick={openDialogPvtTag}>
                          <img
                            className="tag-white-icon"
                            src={"/images/tag-white.svg"}
                          />
                          Add Tag
                        </AddTagButton>
                        <AddToWatchList>
                          <img
                            className="tag-white-icon"
                            src={"/images/preview-white.svg"}
                          />
                          Add to Watchlist
                        </AddToWatchList>
                      </>
                    )}
                  </>
                ) : (
                  ""
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
            <div className="bloc-tabs_sec">
              <button
                className={
                  toggleState === 1 ? "tabs_sec active-tabs_sec" : "tabs_sec"
                }
                onClick={() => toggleTab(1)}
                id="transaction-btn"
              >
                Transactions
              </button>
            </div>
          </div>

          <div
            className={
              toggleState === 1
                ? "content_sec  active-content_sec sec-active"
                : "content_sec"
            }
          >
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
      </Grid>
      <FooterComponent _handleChange={_handleChange} currency={amount} />
    </div>
  );
}
