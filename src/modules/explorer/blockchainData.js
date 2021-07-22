import React, { useEffect, useState } from "react";
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
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { AccountService, CoinMarketService, TpsService, TransactionService } from '../../services'
import Utils from '../../utility'
import socketClient from "socket.io-client";
// const SERVER = "ws://localhost:3001";
// let socket = socketClient(SERVER);
// setInterval(() => {
//     socket = socketClient(SERVER);
// }, 5000);


const MainContainer = styled.div`
  width: 950px;
  height: 200px;
  margin: 0 auto;
  margin-top: 50px;
  padding-top:20px;
  padding-left:15px
  border-radius: 12px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: #ffffff;
  display: flex;
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
const LeftFirst = styled.div`
  flex: 0.3;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 2px;
  align-item: center;
`;
const LeftSec = styled.div`
  flex: 0.7;
  padding-left: 2px;
  margin-bottom: 2px;
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
  align-item: flex-end;
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
  align-item: center;
  text-align: center;
  justify-content: center;
`;
const IconLogo = styled.img`
  width:52%;
  height:52%
  margin-right: 12px;
  margin-left:5px;
`;
const LeftTitle = styled.div`
  margin-top:3px;
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
  backgroundcolor: #fff;
  width: 478px;
  position: absolute;
  top: 55%;
  left: 1%;
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
`;

export default function BlockChainDataComponent() {

    const [totalTransaction, setTotalTransaction] = useState([]);
    const [totalAccount, setTotalAccount] = useState([]);
    const [someDayAccount, setSomeDaysAccounts] = useState([]);
    const [coinMarketPrice, setcoinMarketPrice] = useState([]);
    const [tpsCounts, setTpsCount] = useState({});

    /* FETCHING GET TOTAL TRANSACTIONS API*/

    useEffect(async () => {
        let [error, totalTransactions] = await Utils.parseResponse(TransactionService.getTotalTransaction())
        if (error || !totalTransactions)
            return;
        setTotalTransaction(totalTransactions);
        const interval = setInterval(async () => {
            let [error, totalTransactions] = await Utils.parseResponse(TransactionService.getTotalTransaction())
            setTotalTransaction(totalTransactions);
        }, 45000)
    }, []);

    /* FETCHING GET TOTAL ACCOUNTS API*/

    useEffect(async () => {
        let [error, totalAccounts] = await Utils.parseResponse(AccountService.getTotalAccount())
        if (error || !totalAccounts)
            return
        setTotalAccount(totalAccounts);
        const interval = setInterval(async () => {
            let [error, totalAccounts] = await Utils.parseResponse(AccountService.getTotalAccount())
            setTotalAccount(totalAccounts);
        }, 45000)
    }, []);

    // /* FETCHING GET SOME DAYS ACCOUNTS API*/

    useEffect(async () => {
        let [error, someDaysAccount] = await Utils.parseResponse(AccountService.getSomeDaysAccount())
        if (error || !someDaysAccount)
            return
        setSomeDaysAccounts(someDaysAccount.length);
        const interval = setInterval(async () => {
            let [error, someDaysAccount] = await Utils.parseResponse(AccountService.getSomeDaysAccount())
            setSomeDaysAccounts(someDaysAccount.length);
        }, 45000)
    }, []);

    // /* FETCHING GET COIN MARKET CAP API*/

    useEffect(async () => {
        let [error, totalcoinMarketPrice] = await Utils.parseResponse(CoinMarketService.getCoinMarketData())
        if (error || !totalcoinMarketPrice)
            return
        totalcoinMarketPrice = totalcoinMarketPrice.sort((a, b) => {
            return a.lastUpdated - b.lastUpdated;
        });
        setcoinMarketPrice(totalcoinMarketPrice[1]);
        const interval = setInterval(async () => {
            let [error, totalcoinMarketPrice] = await Utils.parseResponse(CoinMarketService.getCoinMarketData())
            setcoinMarketPrice(totalcoinMarketPrice[1]);
        }, 45000)
    }, []);

    // /* FETCHING TPS COUNTER API*/

    useEffect(async () => {
        let [error, tpsCount] = await Utils.parseResponse(TpsService.getTpsCounter())
        if (error || !tpsCount)
            return

        setTpsCount(tpsCount);
        const interval = setInterval(async () => {
            let [error, tpsCount] = await Utils.parseResponse(TpsService.getTpsCounter())
            setTpsCount(tpsCount);
        }, 45000)
    }, []);

    const [blockdata, setblockdata] = useState([]);
    // let blocks = [...blockdata];
    // let socket = socketClient(SERVER);
    // try {
    //     socket.on("Connected", () => {
    //         console.log("Hello from client");
    //     });
    //     // socket.emit('Connected', "hello")

    //     socket.on("block-socket", (blockData) => {
    //         let blockDataExist = blocks.findIndex((item) => {
    //             return item.number == blockData.number;
    //         });
    //         if (blockDataExist == -1) {
    //             blocks.pop();
    //             blocks.unshift(blockData);
    //             setblockdata(blocks);
    //         }

    //         // setblockdata(blockData);
    //         // console.log(blocks, " BLOCK HOONMM")
    //         // console.log(blockData, "data while pushing");
    //     });

    // } catch (error) {
    //     socket.on("Connected", () => {
    //         console.log("Hello from client");
    //     });
    //     // socket.emit('Connected', "hello")
    // }
    // console.log(blockdata, "dgbdkjhgdkjgdkusagdlkui")
    let changePrice
    if (coinMarketPrice && coinMarketPrice.quote && coinMarketPrice.quote.length >= 1 && coinMarketPrice.quote[0].USD && coinMarketPrice.quote[0].USD.percent_change_24h) {
        changePrice = coinMarketPrice.quote[0].USD.percent_change_24h;
    }

    var changeDecimal = parseFloat(changePrice).toFixed(2);
    var changeXdc = coinMarketPrice.price;
    var changeDecimals = parseFloat(changeXdc).toFixed(6);
    let changeAccounts = someDayAccount;

    return (
        <MainContainer>
            <LeftContainer>
                <LeftFirst>
                    <LeftTop>
                        <IconLogo src={logo} />
                        <LeftTitle>XDC</LeftTitle>
                    </LeftTop>
                    <LeftTopSecMain>
                        <LeftTopSec>${changeDecimals}</LeftTopSec>
                        <div
                            className={
                                changePrice > 0
                                    ? "data_value_green last_value_main"
                                    : "data_value_red"
                            }
                        >
                            <div className="value_changePrice">
                                {changePrice > 0 ? (
                                    <div className="arrow_up">
                                        <BsFillCaretUpFill size={10} />
                                    </div>
                                ) : (
                                    <div className="arrow_down">
                                        <BsFillCaretDownFill size={10} />
                                    </div>
                                )}
                                &nbsp;{changeDecimal}%
                            </div>
                        </div>
                    </LeftTopSecMain>
                    <Line1></Line1>
                </LeftFirst>
                <LeftSec>
                    <ValueMain>
                        <Value>
                            <TitleIcon src={blockHeightImg} />
                            <ValueName>
                                <Title>Block Height</Title>
                                <TitleValue>{blockdata[0]?.number?.toLocaleString()}</TitleValue>
                            </ValueName>
                        </Value>
                        <Value>
                            <TitleIcon src={priceLogo} />
                            <ValueName>
                                <Title>Gas Price</Title>
                                <TitleValue>0.0000034</TitleValue>
                            </ValueName>
                        </Value>
                        <Value>
                            <TitleIcon src={transactionLogo} />
                            <ValueName>
                                <Title>Transactions</Title>
                                <TitleValue> {totalTransaction}</TitleValue>
                            </ValueName>
                        </Value>
                        <Value>
                            <TitleIcon src={difficultyLogo} />
                            <ValueName>
                                <Title>Difficulty</Title>
                                <TitleValue>{blockdata[0]?.totalDifficulty}</TitleValue>
                            </ValueName>
                        </Value>
                        <Value>
                            <TitleIcon src={maxLogo} />
                            <ValueName>
                                <Title>Current/Max TPS</Title>
                                <TitleValue>{tpsCounts?.totalTransactions}/2000</TitleValue>
                            </ValueName>
                        </Value>
                        <Value>
                            <TitleIcon src={accountLogo} />
                            <ValueName>
                                <Title>Accounts</Title>
                                <div className="last_value">
                                    <TitleValue>{totalAccount}</TitleValue>
                                    <div
                                        className={
                                            changeAccounts > 0
                                                ? "data_value_green last_value_main"
                                                : "data_value_red"
                                        }
                                    >
                                        <div className="value_p">
                                            {changeAccounts > 0 ? (
                                                <div className="arrow_up">
                                                    <BsFillCaretUpFill size={10} />
                                                </div>
                                            ) : (
                                                <div className="arrow_down">
                                                    <BsFillCaretDownFill size={10} />
                                                </div>
                                            )}
                                            {changeAccounts}
                                        </div>
                                    </div>
                                </div>
                            </ValueName>
                        </Value>
                    </ValueMain>
                </LeftSec>
            </LeftContainer>

            <RightContainer>
                <Tab />
            </RightContainer>
        </MainContainer>
    );
}
