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
import {
  AccountService,
  CoinMarketService,
  TpsService,
  TransactionService,
  BlockService,
} from "../../services";
import Utils from "../../utility";

const MainContainer = styled.div`
  width: 950px;
  height: 200px;
  margin: 0 auto;
  margin-top: 50px;
  padding-top: 20px;
  padding-left: 15px;
  border-radius: 12px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  display: flex;
  @media (max-width: 1023px) {
    flex-direction: column;
    width: auto;
    margin-left: 5%;
    margin-right: 5%;
    height: 500px;
    padding-top: 0px;
  }
  @media (max-width :640px){
    flex-direction: column;
    width: auto;
    height: 500px;
    margin-right: 2%;
    margin-left: 2%;
  }
`;
const MobileScreen=styled.div`
margin-right: 3px;
@media (min-width:640px){
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
}
`;
const LeftFirst = styled.div`
  flex: 0.3;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 2px;
  align-items: center;
  @media (max-width:1023px){
    padding-left: 10px;
    padding-right: 10px;
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
  @media (max-width:1023px){
    margin-left: 0px
  }
`;

const LeftSec = styled.div`
  flex: 0.7;
  padding-left: 2px;
  margin-bottom: 2px;
  /* @media (max-width:1023px){
    padding-top: 20px;
  } */
`;
const ValueMain = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const Value = styled.div`
  display: flex;
  width: 140px;
  padding-bottom: 22px;
`;
const TitleIcon = styled.img`
  width: 22%;
  margin-right: 8px;
`;

const ValueName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-flex-start;
  // margin-left: 2px;
`;
const Title = styled.div`
  color: #a09e9e;
  font-size: 10px;
  font-family: "Inter";
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.65px;
  margin-bottom: 5px;
`;
const TitleValue = styled.div`
  font-size: 13.5px;
  font-family: Inter;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.58px;
  color: #252525;
`;
const LeftTop = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const IconLogo = styled.img`
  width: 52%;
  height: 52%;
  margin-right: 12px;
  
`;
const LeftTitle = styled.div`
  margin-top: 3px;
  font-size: 20px;
  font-weight: 600;
  font-family: Inter;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  color: #252525;
`;
const Line1 = styled.hr`
  background-color: #fff;
  width: 478px;
  position: absolute;
  top: 55%;
  left: 1%;
  @media (max-width:1023px){
    width:96%;
    top: 75%;
    }
`;
const LeftTopSec = styled.div`
  font-size: 18px;
  font-weight: 800;
  margin-right: 3px;
  font-family: Inter;
  letter-spacing: 0.55px;
  color: #252525;
`;
const LeftTopSecMain = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-right: 5px;
`;


class BlockChainDataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTransaction: [],
      totalAccount: [],
      someDayAccount: [],
      coinMarketPrice: [],
      tpsCounts: {
        totalTransactions: 0,
      },
      Maxtps: 0,
      blockdataNumber: [],
      transactionDataDetails: [],
      blockSocketConnected: false,
      transactionSocketConnected: false,
      animationBlock: {},
      animationTransaction: {},
      gasPrice: 0,
    };
  }
  componentWillUnmount() {
    this.props.socket.off("block-socket");
  }
  async componentDidMount() {
    await this.totalTransactionCount();
    await this.totalAccountsCount();
    await this.someDaysAccountCount();
    await this.coinMarketCapDetails();
    await this.blocksLatest();
    await this.transactionsLatest();
    await this.tpsCountDetail();
    await this.CountMaxtps();

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
          console.log("hello error");
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
          console.log("hello error");
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
    let [error, totalcoinMarketPrice] = await Utils.parseResponse(
      CoinMarketService.getCoinMarketData(this.props.currency, {})
    );
    if (error || !totalcoinMarketPrice) return;
    totalcoinMarketPrice = totalcoinMarketPrice.sort((a, b) => {
      return a.lastUpdated - b.lastUpdated;
    });

    this.setState({ coinMarketPrice: totalcoinMarketPrice[1] });
    const interval = setInterval(async () => {
      let [error, totalcoinMarketPrice] = await Utils.parseResponse(
        CoinMarketService.getCoinMarketData(this.props.currency, {})
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

    this.setState({ tpsCounts: tpsCount });
    const interval = setInterval(async () => {
      let [error, tpsCount] = await Utils.parseResponse(
        TpsService.getTpsCounter()
      );
      this.setState({ tpsCounts: tpsCount });
    }, 90000);
  }

  async CountMaxtps() {
    let [error, MaxtpsCount] = await Utils.parseResponse(
      TpsService.getMaxTpsCounter()
    );

    if (error || !MaxtpsCount) return;
    this.setState({ Maxtps: MaxtpsCount?.responseData });
    const interval = setInterval(async () => {
      let [error, MaxtpsCount] = await Utils.parseResponse(
        TpsService.getMaxTpsCounter()
      );
      this.setState({ Maxtps: MaxtpsCount?.responseData });
    }, 90000);
  }

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
    let currentTp = this.state.tpsCounts?.totalTransactions
      ? (this.state.tpsCounts?.totalTransactions / 60).toFixed(2)
      : 0;
    return (
      <MainContainer>
        <LeftContainer>
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
                        src="http://www.clipartbest.com/cliparts/RTG/6or/RTG6orRrc.gif"
                        style={{ width: "8px" }}
                      />
                    </div>
                  ) : (
                    <div className="arrow_down">
                      {/* <BsFillCaretDownFill size={10} /> */}
                      <img
                        src="https://toppng.com/uploads/preview/free-red-arrow-png-115644712356jqqcocouq.png"
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
                  <TitleValue className={animationClass ? animationClass : ""}>
                    {this.state.blockdataNumber[0]?.number.toLocaleString()}
                  </TitleValue>
                </ValueName>
              </Value>
              <Value>
                <TitleIcon src={priceLogo} />
                <ValueName>
                  <Title>Gas Price(Gwei)</Title>
                  <TitleValue
                    className={TxanimationClass ? TxanimationClass : ""}
                  >
                    {this.state.gasPrice}
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
              </MobileScreen>
              <MobileScreen>
              <Value>
                <TitleIcon src={difficultyLogo} />
                <ValueName>
                  <Title>Difficulty</Title>
                  <TitleValue className={animationClass ? animationClass : ""}>
                    {this.state.blockdataNumber[0]?.totalDifficulty}
                  </TitleValue>
                </ValueName>
              </Value>
              <Value>
                <TitleIcon src={maxLogo} />
                <ValueName>
                  <Title>Current/Max TPS</Title>
                  <TitleValue>
                    {currentTp ? currentTp : 0}/{maxTp ? maxTp : 0}
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
                              src="http://www.clipartbest.com/cliparts/RTG/6or/RTG6orRrc.gif"
                              style={{ width: "8px" }}
                            />
                          </div>
                        ) : (
                          <div className="arrow_down">
                            {/* <BsFillCaretDownFill size={10} /> */}
                            <img
                              src="https://toppng.com/uploads/preview/free-red-arrow-png-115644712356jqqcocouq.png"
                              style={{ width: "8px" }}
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

        <RightContainer>
          <Tab />
        </RightContainer>
      </MainContainer>
    );
  }
}
export default BlockChainDataComponent;
