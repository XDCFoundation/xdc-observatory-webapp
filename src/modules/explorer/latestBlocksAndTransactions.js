import React, {useEffect, useState} from "react";
import "../../assets/styles/custom.css";
import {BlockService, TransactionService} from '../../services'
import Utils from '../../utility'
import {useHistory} from 'react-router-dom'


function timeDiff(curr, prev) {
    var ms_Min = 60 * 1000; // milliseconds in Minute
    var ms_Hour = ms_Min * 60; // milliseconds in Hour
    var ms_Day = ms_Hour * 24; // milliseconds in day
    var ms_Mon = ms_Day * 30; // milliseconds in Month
    var ms_Yr = ms_Day * 365; // milliseconds in Year
    var diff = curr - prev; //difference between dates.
    // If the diff is less then milliseconds in a minute
    if (diff < ms_Min) {
        return Math.abs(Math.round(diff / 1000)) + ' secs ago';

        // If the diff is less then milliseconds in a Hour
    } else if (diff < ms_Hour) {
        return Math.abs(Math.round(diff / ms_Min)) + ' mins ago';

        // If the diff is less then milliseconds in a day
    } else if (diff < ms_Day) {
        return Math.abs(Math.round(diff / ms_Hour)) + ' hrs ago';

        // If the diff is less then milliseconds in a Month
    } else if (diff < ms_Mon) {
        return Math.abs(Math.round(diff / ms_Day)) + ' days ago';

        // If the diff is less then milliseconds in a year
    } else if (diff < ms_Yr) {
        return Math.abs(Math.round(diff / ms_Mon)) + ' months ago';
    } else {
        return Math.abs(Math.round(diff / ms_Yr)) + ' years ago';
    }
}

function LatestBlocks() {

    const history = useHistory();


    /* FETCHING LATEST BLOCKS API*/
    const [postHeight, setPostHeight] = useState([]);

    useEffect(async () => {
        let urlPath = "?skip=0&limit=10"
        let [error, latestBlocks] = await Utils.parseResponse(BlockService.getLatestBlock(urlPath, {}))
        if (error || !latestBlocks)
            return
        setPostHeight(latestBlocks);
        const interval = setInterval(async () => {
            let [error, latestBlocks] = await Utils.parseResponse(BlockService.getLatestBlock(urlPath, {}))
            setPostHeight
            (latestBlocks);
        }, 45000)
    }, []);


    /* FETCHING LATEST TRANSACTIONS API*/
    const [postTransactions, setlatestTransactions] = useState([]);

    useEffect(async () => {
        let urlPath = "?skip=0&limit=10"
        let [error, latestTransactions] = await Utils.parseResponse(TransactionService.getLatestTransaction(urlPath, {}));
        if (error || !latestTransactions)
            return;
        setlatestTransactions(latestTransactions);
        const interval = setInterval(async () => {
            let [error, latestTransactions] = await Utils.parseResponse(TransactionService.getLatestTransaction(urlPath, {}))
            setlatestTransactions
            (latestTransactions);
        }, 45000)
    }, []);

    function shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }

    return (
        <>
            <div className="block_main">
                <div className="latestblock">
                    <div className="latest">
                        <h1>Latest Blocks</h1>
                        <a className="nav_button" href="/view-all-blocks">View All</a>
                    </div>
                    <div className="data">
                        <div className="data_heading1">
                            <p>Age</p>
                            <p>Height</p>
                            <p>Transactions</p>
                        </div>
                        <div className="data_value">

                            {postHeight.map((z) => {
                                const currentTime = new Date();
                                const previousTime = new Date(z.timestamp * 1000);
                                const ti = timeDiff(currentTime, previousTime);
                                return (
                                    <div className="value_main_main">
                                        <div className="main_vaa">
                                            <p>{ti}</p>
                                            <a className="height" href={"/block-details/" + z.number}>{z.number}</a>
                                            <p>{z.transactions.length}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="latestTranscation">
                    <div className="latest">
                        <h1>Latest Transactions</h1>
                        <a className="nav_button" href="/view-all-transaction">View All</a>
                    </div>
                    <div className="data">
                        <div className="data_heading">
                            <div className="main_head">
                                <p>Hash</p>
                                <p>Amount</p>
                            </div>
                            <div className="age">
                                <p>Age</p>
                            </div>
                        </div>
                        <div className="data_value">
                            {postTransactions && postTransactions.length && postTransactions.map((e) => {
                                const currentTime = new Date();
                                const previousTime = new Date(e.timestamp * 1000);
                                const age = timeDiff(currentTime, previousTime);
                                return (
                                    <div className="value_main_main">
                                        <div className="value_main main_val">
                                            <a href={"/transaction-details/" + e.hash}>
                                                <button className="bttn">{shorten(e.hash)}</button>
                                            </a>
                                            <p>{e.value} XDC</p>
                                            <p>{age}</p>
                                            <a href={"/transaction-details/" + e.hash}>
                                                <button className="details">Details</button>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LatestBlocks;
