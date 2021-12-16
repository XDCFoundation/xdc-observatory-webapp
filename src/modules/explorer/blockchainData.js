import React, { Component } from "react";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import logo from "../../images/XDC-Icon.svg";
import blockHeightImg from "../../images/Block Height.svg";
import priceLogo from "../../images/Gas Price.svg";
import transactionLogo from "../../images/Transaction.svg";
import maxLogo from "../../images/Current Max_TPS.svg";
import difficultyLogo from "../../images/Difficulty.svg";
import accountLogo from "../../images/Accounts.svg";
import Tab from "./tab";
import Loader from "../../assets/loader"
import {
  AccountService,
  CoinMarketService,
  TpsService,
  TransactionService,
  BlockService,
} from "../../services";
import Utils from "../../utility";

const MainContainer = styled.div`
  width: 75.125rem;
  height: 18.563rem;
  margin: 0 auto;
  margin-top: 30px;
  padding: 1.9rem 1.375rem 0;
  border-radius: 12px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  display: flex;
  @media (min-width: 767px) and (max-width: 1240px) {
    flex-direction: column;
    /* width: auto; */
    width: 41.5rem;
    margin-left: auto;
    margin-right: auto;
    height: 38.625rem;
    padding-top: 0px;
  }
  @media (min-width: 0px) and (max-width: 767px) {
    flex-direction: column;
    /* width: auto; */
    width: 22.563rem;
    height: 32.063rem;
    margin-right: auto;
    margin-left: auto;
    padding-top: 0px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 15px;
  }
`;
const MobileScreen = styled.div`
  margin-right: 3px;
  @media (max-width: 767px) {
    margin-top: 3px;
    margin-right: -35px;
  }
  @media (min-width: 767px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-right: 0px;
  }
`;
const LeftFirst = styled.div`
  flex: 0.3;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (min-width: 0px) and (max-width: 767px) {
    padding: 10px 14px 0;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    padding: 20px 10px 0 0;
  }
`;
const LeftContainer = styled.div`
  flex: 0.53;
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div`
  flex: 0.47;
  display: flex;
  margin-left: 12px;
`;

const LeftSec = styled.div`
  flex: 0.7;
  margin-top: 10px;
  @media (min-width: 335px) and (max-width: 767px) {
    padding: 0 3%;
  }
`;
const ValueMain = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px 4px;
  /* margin-top: 12px; */
`;

const Value = styled.div`
  display: flex;
  width: 10.625rem;
  padding-bottom: 15px;
  @media (min-width: 0px) and (max-width: 767px) {
    padding: 10px 0px 0 0;
    width: 9.75rem;
  }
`;
const TitleIcon = styled.img`
  width: 22%;
  margin-right: 8px;
  margin-bottom: 36px;
  @media (max-width: 767px) {
    width: 18%;
    margin-right: 9px;
    margin-left: -8px;
    margin-top: 8px;
    margin-bottom: 28px;
  }
`;

const ValueName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // margin-left: 2px;
`;
const Title = styled.div`
  color: #686868;
  font-size: 0.875rem;
  font-family: "Inter";
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.65px;
  margin-bottom: 5px;
`;
const TitleValue = styled.div`
  font-size: 1rem;
  font-family: Inter;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.58px;
  color: #2a2a2a;
  @media (max-width: 767px) {
    font-size: 0.875rem;
  }
`;
const TitleData = styled.div`
  font-size: 1rem;
  font-family: Inter;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.58px;
  color: #2a2a2a;
  @media (max-width: 767px) {
    white-space: nowrap;
    width: 110px;
    overflow: hidden;
    /* text-overflow: ellipsis; */
  }
`;
const LeftTop = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const IconLogo = styled.img`
  width: 2.625rem;
  height: 2.625rem;
  margin-right: 12px;
  @media (max-width: 0px) and (max-width: 767px) {
    width: 3.125rem;
    height: 3.125rem;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    width: 2.625rem;
    height: 2.625rem;
  }
`;
const LeftTitle = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  font-family: Inter;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  color: #2a2a2a;
  @media (max-width: 767px) {
    font-size: 1.375rem;
  }
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;
const Line1 = styled.hr`
  background-color: #fff;
  width: 100%;
  position: absolute;
  top: 65%;
  @media (min-width: 0px) and (max-width: 767px) {
    width: 90%;
    top: 87%;
  }
  @media (min-width: 767px) and (max-width: 1240px) {
    width: 97%;
    top: 60%;
  }
`;
const LeftTopSec = styled.div`
  font-size: 1.375rem;
  font-weight: 800;
  font-family: Inter;
  letter-spacing: 0.55px;
  color: #2a2a2a;
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 1rem;
  }
`;
const LeftTopSecMain = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-right: 5px;
  margin-top: 7px;
`;

class BlockChainDataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTransaction: [],
      totalAccount: [],
      someDayAccount: [],
      coinMarketPrice: [],
      tpsCounts: 0,
      Maxtps: 0,
      blockdataNumber: [],
      transactionDataDetails: [],
      blockSocketConnected: false,
      transactionSocketConnected: false,
      animationBlock: {},
      animationTransaction: {},
      gasPrice: 0,
      loading: true,
    };
  }
  componentWillUnmount() {
    this.props.socket.off("block-socket");
  }
  async componentDidMount() {
    this.totalTransactionCount();
    this.totalAccountsCount();
    this.someDaysAccountCount();
    this.coinMarketCapDetails();
    this.blocksLatest();
    this.transactionsLatest();
    await this.tpsCountDetail();
    // await this.CountMaxtps();

    this.socketData(this.props.socket);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.coinMarketCapDetails();
    }
  }

  socketData(socket) {
    let blocks = this.state.blockdataNumber;
    let transactions = this.state.transactionDataDetails;
    socket.on("block-socket", (blockData, error) => {
      this.setState({ blockSocketConnected: true });
      let blockDataExist = blocks.findIndex((item) => {
        return item.number == blockData.number;
      });
      // blockData["class"] = "first-block-age last-block-transaction height2";
      if (blockDataExist == -1) {
        blocks.pop();
        blocks.unshift(blockData);
        let blockAnimationClass = {
          [blockData.number]: "block-height-animation",
        };
        this.setState({ animationBlock: blockAnimationClass });
        setTimeout(() => {
          this.setState({ animationBlock: {} });
        }, 500);

        this.setState({ blockdataNumber: blocks });

        if (error) {
        }
      }
    });
    socket.on("transaction-socket", (transactionData, error) => {
      this.setState({ transactionSocketConnected: true });
      let transactionDataExist = transactions.findIndex((item) => {
        return item.hash == transactionData.hash;
      });
      if (transactionDataExist == -1) {
        if (transactions.length >= 10) transactions.pop();
        transactions.unshift(transactionData);
        let blockAnimationClass = {
          [transactionData.hash]: "block-height-animation",
        };
        this.setState({ animationTransaction: blockAnimationClass });
        setTimeout(() => {
          this.setState({ animationTransaction: {} });
        }, 500);
        this.setState({ transactionDataDetails: transactions });
        let gp = this.state.transactionDataDetails[0]?.gasPrice
          ? (
            this.state.transactionDataDetails[0]?.gasPrice /
            1000000000000000000
          ).toFixed(9)
          : 0;
        if (gp >= 0.000000001) {
          this.setState({ gasPrice: gp });
        }

        if (error) {
        }
      }
    });
  }

  /* FETCHING GET TOTAL TRANSACTIONS API*/

  async totalTransactionCount() {
    let [error, totalTransactions] = await Utils.parseResponse(
      TransactionService.getTotalTransaction()
    );
    if (error || !totalTransactions) return;
    this.setState({ totalTransaction: totalTransactions });
    const interval = setInterval(async () => {
      let [error, totalTransactions] = await Utils.parseResponse(
        TransactionService.getTotalTransaction()
      );
      this.setState({ totalTransaction: totalTransactions });
    }, 90000);
  }

  /* FETCHING GET TOTAL ACCOUNTS API*/

  async totalAccountsCount() {
    let [error, totalAccounts] = await Utils.parseResponse(
      AccountService.getTotalAccount()
    );
    if (error || !totalAccounts) return;
    this.setState({ totalAccount: totalAccounts });
    const interval = setInterval(async () => {
      let [error, totalAccounts] = await Utils.parseResponse(
        AccountService.getTotalAccount()
      );
      this.setState({ totalAccount: totalAccounts });
    }, 90000);
  }

  /* FETCHING GET SOME DAYS ACCOUNTS API*/

  async someDaysAccountCount() {
    let [error, someDaysAccount] = await Utils.parseResponse(
      AccountService.getSomeDaysAccount()
    );
    if (error || !someDaysAccount) return;
    this.setState({ someDayAccount: someDaysAccount[0]?.accountCount });
    const interval = setInterval(async () => {
      let [error, someDaysAccount] = await Utils.parseResponse(
        AccountService.getSomeDaysAccount()
      );
      this.setState({ someDayAccount: someDaysAccount[0]?.accountCount });
    }, 90000);
  }

  /* FETCHING GET COIN MARKET CAP API*/

  async coinMarketCapDetails() {
    let [error, totalcoinMarketPrice] = await Utils?.parseResponse(
      CoinMarketService?.getCoinMarketData(this.props.currency, {})
    );
    if (error || !totalcoinMarketPrice) return;
    totalcoinMarketPrice = totalcoinMarketPrice.sort((a, b) => {
      return a.lastUpdated - b.lastUpdated;
    });

    this.setState({ coinMarketPrice: totalcoinMarketPrice[1] });
    const interval = setInterval(async () => {
      let [error, totalcoinMarketPrice] = await Utils?.parseResponse(
        CoinMarketService?.getCoinMarketData(this.props.currency, {})
      );
      this.setState({ coinMarketPrice: totalcoinMarketPrice[1] });
    }, 90000);
  }

  /* FETCHING TPS COUNTER API */

  async tpsCountDetail() {
    let [error, tpsCount] = await Utils.parseResponse(
      TpsService.getTpsCounter()
    );
    if (error || !tpsCount) return;

    this.setState({ tpsCounts: tpsCount?.currenttps });
    this.setState({ loading: false });
    const interval = setInterval(async () => {
      let [error, tpsCount] = await Utils.parseResponse(
        TpsService.getTpsCounter()
      );
      this.setState({ tpsCounts: tpsCount?.currenttps });
    }, 90000);
  }

  // async CountMaxtps() {
  //   let [error, MaxtpsCount] = await Utils.parseResponse(
  //     TpsService.getMaxTpsCounter()
  //   );

  //   if (error || !MaxtpsCount) return;
  //   this.setState({ Maxtps: MaxtpsCount });
  //   this.setState({ loading: false });
  //   const interval = setInterval(async () => {
  //     let [error, MaxtpsCount] = await Utils.parseResponse(
  //       TpsService.getMaxTpsCounter()
  //     );
  //     this.setState({ Maxtps: MaxtpsCount });
  //   }, 90000);
  // }

  /* FETCHING LATEST BLOCKS API */

  async blocksLatest() {
    let urlPath = "?skip=0&limit=1";
    let [error, latestBlocks] = await Utils.parseResponse(
      BlockService.getLatestBlock(urlPath, {})
    );
    if (error || !latestBlocks) return;

    this.setState({ blockdataNumber: latestBlocks });
    // blocks = latestBlocks;
    const interval = setInterval(async () => {
      if (!this.state.blockSocketConnected) {
        let [error, latestBlocks] = await Utils.parseResponse(
          BlockService.getLatestBlock(urlPath, {})
        );
        this.setState({ blockdataNumber: latestBlocks });
      }

      // blocks = latestBlocks;
    }, 90000);
  }

  /* FETCHING LATEST TRANSACTIONS API*/

  async transactionsLatest() {
    let urlPath = "?skip=0&limit=1";
    let [error, latestTransactions] = await Utils.parseResponse(
      TransactionService.getLatestTransaction(urlPath, {})
    );
    if (error || !latestTransactions) return;
    this.setState({ transactionDataDetails: latestTransactions });
    const interval = setInterval(async () => {
      if (!this.state.transactionSocketConnected) {
        let [error, latestTransactions] = await Utils.parseResponse(
          TransactionService.getLatestTransaction(urlPath, {})
        );
        this.setState({ transactionDataDetails: latestTransactions });
      }
    }, 90000);
  }

  render() {
    let changePrice;
    if (
      this.state.coinMarketPrice &&
      this.state.coinMarketPrice.quote &&
      this.state.coinMarketPrice.quote.length >= 1 &&
      this.state.coinMarketPrice.quote[0][this.props.currency] &&
      this.state.coinMarketPrice.quote[0][this.props.currency]
        .percent_change_24h
    ) {
      changePrice =
        this.state.coinMarketPrice.quote[0][this.props.currency]
          .percent_change_24h;
    }
    const currencySymbol =
      this.props.currency === "INR"
        ? "₹"
        : this.props.currency === "USD"
          ? "$"
          : "€";
    let changeDecimal = changePrice ? parseFloat(changePrice).toFixed(2) : 0;
    let changeXdc = this.state.coinMarketPrice.price;
    let changeDecimals = changeXdc ? parseFloat(changeXdc).toFixed(6) : 0;
    let changeAccounts = this.state.someDayAccount
      ? this.state.someDayAccount
      : 0;
    let blockNumber = this.state.blockdataNumber[0]?.number;
    let animationClass = this.state.animationBlock?.[blockNumber];
    let txhash = this.state.transactionDataDetails[0]?.hash;
    let TxanimationClass = this.state.animationTransaction?.[txhash];
    let maxTp = this.state.Maxtps ? this.state.Maxtps?.toFixed(2) : 0;
    let currentTp = this.state.tpsCounts;

    return (
      <MainContainer
        className={this.state.loading == true ? "cover-spin-3" : ""}
      >
        <LeftContainer
        >
          <LeftFirst>
            <LeftTop>
              <IconLogo src={logo} />
              <LeftTitle>XDC</LeftTitle>
            </LeftTop>
            <LeftTopSecMain>
              <LeftTopSec>
                {currencySymbol}
                {changeDecimals}
              </LeftTopSec>
              <div
                className={
                  changeDecimal >= 0
                    ? "data_value_green last_value_main"
                    : "data_value_red"
                }
              >
                <div className="value_changePrice">
                  {changeDecimal == 0 ? (
                    ""
                  ) : changeDecimal > 0 ? (
                    <div className="arrow_up">
                      {/* <BsFillCaretUpFill size={10} /> */}
                      <img
                        src={require("../../../src/assets/images/Up.svg")}
                        style={{ width: "8px" }}
                      />
                    </div>
                  ) : (
                    <div className="arrow_down">
                      {/* <BsFillCaretDownFill size={10} /> */}
                      <img
                        src={require("../../../src/assets/images/Down.svg")}
                        style={{ width: "8px" }}
                      />
                    </div>
                  )}
                  &nbsp;{changeDecimal ? changeDecimal : 0}%
                </div>
              </div>
            </LeftTopSecMain>
            <Line1></Line1>
          </LeftFirst>
          <LeftSec>
            <ValueMain>
              <MobileScreen>
                <Value>
                  <TitleIcon src={blockHeightImg} />
                  <ValueName>
                    <Title>Block Height</Title>
                    <TitleValue
                      className={animationClass ? animationClass : ""}
                    >
                      {this.state.blockdataNumber[0]?.number.toLocaleString()}
                    </TitleValue>
                  </ValueName>
                </Value>
                <Value>
                  <TitleIcon src={transactionLogo} />
                  <ValueName>
                    <Title>Transactions</Title>
                    <TitleValue>{this.state.totalTransaction}</TitleValue>
                  </ValueName>
                </Value>
                <Value>
                  <TitleIcon src={maxLogo} />
                  <ValueName>
                    <Title>Current/Max TPS</Title>
                    <TitleValue>{currentTp ? currentTp : 0}/2000</TitleValue>
                  </ValueName>
                </Value>
              </MobileScreen>
              <MobileScreen>
                <Value>
                  <TitleIcon src={priceLogo} />
                  <ValueName>
                    <Title>Gas Price</Title>
                    <TitleData
                      className={TxanimationClass ? TxanimationClass : ""}
                    >
                      {this.state.gasPrice}
                    </TitleData>
                  </ValueName>
                </Value>
                <Value>
                  <TitleIcon src={difficultyLogo} />
                  <ValueName>
                    <Title>Difficulty</Title>
                    <TitleValue
                      className={animationClass ? animationClass : ""}
                    >
                      {this.state.blockdataNumber[0]?.totalDifficulty}
                    </TitleValue>
                  </ValueName>
                </Value>

                <Value>
                  <TitleIcon src={accountLogo} />
                  <ValueName>
                    <Title>Accounts</Title>
                    <div className="last_value">
                      <TitleValue>{this.state.totalAccount}</TitleValue>
                      <div
                        className={
                          changeAccounts >= 0
                            ? "data_value_green last_value_main"
                            : "data_value_red"
                        }
                      >
                        <div className="value_p">
                          {changeAccounts == 0 ? (
                            ""
                          ) : changeAccounts > 0 ? (
                            <div className="arrow_up">
                              {/* <BsFillCaretUpFill size={10} /> */}
                              <img
                                src={require("../../../src/assets/images/Up.svg")}
                                style={{
                                  width: "0.5rem",
                                  marginRight: "5px",
                                  marginBottom: "5px",
                                }}
                              />
                            </div>
                          ) : (
                            <div className="arrow_down">
                              {/* <BsFillCaretDownFill size={10} /> */}
                              <img
                                src={require("../../../src/assets/images/Down.svg")}
                                style={{
                                  width: "0.5rem",
                                  marginRight: "5px",
                                  marginBottom: "5px",
                                }}
                              />
                            </div>
                          )}
                          {changeAccounts}
                        </div>
                      </div>
                    </div>
                  </ValueName>
                </Value>
              </MobileScreen>
            </ValueMain>
          </LeftSec>
        </LeftContainer>

        <RightContainer
        >
          <Tab />
        </RightContainer>
      </MainContainer>
    );
  }
}
export default BlockChainDataComponent;
