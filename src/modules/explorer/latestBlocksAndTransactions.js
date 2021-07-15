import React, { useEffect, useState } from "react";
import "../../assets/styles/custom.css";
import { BlockService, TransactionService } from "../../services";
import Utils from "../../utility";
import { useHistory } from "react-router-dom";
import socketClient from "socket.io-client";
import Tooltip from "@material-ui/core/Tooltip";
const SERVER = "http://localhost:3001";

function timeDiff(curr, prev) {
  var ms_Min = 60 * 1000; // milliseconds in Minute
  var ms_Hour = ms_Min * 60; // milliseconds in Hour
  var ms_Day = ms_Hour * 24; // milliseconds in day
  var ms_Mon = ms_Day * 30; // milliseconds in Month
  var ms_Yr = ms_Day * 365; // milliseconds in Year
  var diff = curr - prev; //difference between dates.
  // If the diff is less then milliseconds in a minute
  if (diff < ms_Min) {
    return Math.abs(Math.round(diff / 1000)) + " secs ago";

    // If the diff is less then milliseconds in a Hour
  } else if (diff < ms_Hour) {
    return Math.abs(Math.round(diff / ms_Min)) + " mins ago";

    // If the diff is less then milliseconds in a day
  } else if (diff < ms_Day) {
    return Math.abs(Math.round(diff / ms_Hour)) + " hrs ago";

    // If the diff is less then milliseconds in a Month
  } else if (diff < ms_Mon) {
    return Math.abs(Math.round(diff / ms_Day)) + " days ago";

    // If the diff is less then milliseconds in a year
  } else if (diff < ms_Yr) {
    return Math.abs(Math.round(diff / ms_Mon)) + " months ago";
  } else {
    return Math.abs(Math.round(diff / ms_Yr)) + " years ago";
  }
}
function shortenBalance(b, amountL = 4, amountR = 3, stars = 0) {
  return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(b.length)}`;
}

function LatestBlocks() {
  const history = useHistory();

  /* FETCHING LATEST BLOCKS API*/
  const [postHeight, setPostHeight] = useState([]);

  useEffect(async () => {
    let urlPath = "?skip=0&limit=10";
    let [error, latestBlocks] = await Utils.parseResponse(
      BlockService.getLatestBlock(urlPath, {})
    );
    if (error || !latestBlocks) return;
    setPostHeight(latestBlocks);
    const interval = setInterval(async () => {
      let [error, latestBlocks] = await Utils.parseResponse(
        BlockService.getLatestBlock(urlPath, {})
      );
      setPostHeight(latestBlocks);
    }, 45000);
  }, []);

  /* FETCHING LATEST TRANSACTIONS API*/
  const [postTransactions, setlatestTransactions] = useState([]);

  useEffect(async () => {
    let urlPath = "?skip=0&limit=10";
    let [error, latestTransactions] = await Utils.parseResponse(
      TransactionService.getLatestTransaction(urlPath, {})
    );
    if (error || !latestTransactions) return;
    setlatestTransactions(latestTransactions);
    const interval = setInterval(async () => {
      let [error, latestTransactions] = await Utils.parseResponse(
        TransactionService.getLatestTransaction(urlPath, {})
      );
      setlatestTransactions(latestTransactions);
    }, 45000);
  }, []);

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const [blockdata, setblockdata] = useState({});
  const [transactiondata, settransactiondata] = useState({});
  let socket = socketClient(SERVER);
  try {
    socket.on("Connected", () => {
      console.log("Hello from client");
    });
    // socket.emit('Connected', "hello")

    socket.on("block-socket", (blockData) => {
      setblockdata(blockData);
    });

    socket.on("transaction-socket", (transactionData) => {
      settransactiondata(transactionData);
    });
  } catch (error) {
    socket.on("Connected", () => {
      console.log("Hello from client");
    });
  }
  const currentTime = new Date();
  const previousTime = new Date(blockdata?.timestamp * 1000);
  const blockage = timeDiff(currentTime, previousTime);
  const previousTime2 = new Date(transactiondata?.timestamp * 1000);
  const transactionAge = timeDiff(currentTime, previousTime2);
  return (
    <>
      <div className="block_main">
        <div className="latestblock">
          <div className="latest">
            <h1>Latest Blocks</h1>
            <a className="nav_button" href="/view-all-blocks">
              View All
            </a>
          </div>
          <div className="data">
            <div className="data_heading1">
              <p>Age</p>
              <p>Height</p>
              <p>Transactions</p>
            </div>
            <div className="data_value">
              {blockdata && Object.keys(blockdata).length >= 1 ? (
                <div className="value_main_main">
                  <div className="main_vaa">
                    <p className="first-block-age">{blockage}</p>
                    <a
                      className="height2"
                      href={"/block-details/" + blockdata.number}
                    >
                      {blockdata.number.toLocaleString()}
                    </a>
                    <p className="last-block-transaction">
                      {blockdata.transactions.length}
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {console.log(blockdata, "BLOCKDATA")}
              {blockdata === null || blockdata === "" || blockdata === undefined
                ? postHeight &&
                  postHeight.length >= 1 &&
                  postHeight.map((z) => {
                    const currentTime = new Date();
                    const previousTime = new Date(z.timestamp * 1000);
                    const ti = timeDiff(currentTime, previousTime);
                    return (
                      <div className="value_main_main">
                        <div className="main_vaa">
                          <p>{ti}</p>
                          <a
                            className="height"
                            href={"/block-details/" + z.number}
                          >
                            {z.number.toLocaleString()}
                          </a>
                          <p>{z.transactions.length}</p>
                        </div>
                      </div>
                    );
                  })
                : postHeight.slice(0, postHeight.length - 1).map((z) => {
                    const currentTime = new Date();
                    const previousTime = new Date(z.timestamp * 1000);
                    const ti = timeDiff(currentTime, previousTime);
                    return (
                      <div className="value_main_main">
                        <div className="main_vaa">
                          <p>{ti}</p>
                          <a
                            className="height"
                            href={"/block-details/" + z.number}
                          >
                            {z.number.toLocaleString()}
                          </a>
                          <p>{z.transactions.length}</p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
        <div className="latestTranscation">
          <div className="latest2">
            <h1>Latest Transactions</h1>
            <a className="nav_button" href="/view-all-transaction">
              View All
            </a>
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
              {transactiondata && Object.keys(transactiondata).length >= 1 ? (
                <div className="value_main_main">
                  <div className="value_main main_val">
                    <Tooltip placement="top" title={transactiondata.hash}>
                      <a
                        className="bttn2"
                        href={"/transaction-details/" + transactiondata.hash}
                      >
                        {shorten(transactiondata.hash)}
                      </a>
                    </Tooltip>
                    <p className="amount-table">
                      {shortenBalance(transactiondata.value)} XDC
                    </p>
                    <p className="age-table">{transactionAge}</p>
                    <a
                      className="details2"
                      href={"/transaction-details/" + transactiondata.hash}
                    >
                      Details
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}

              {transactiondata === null ||
              transactiondata === "" ||
              transactiondata === undefined
                ? postTransactions &&
                  postTransactions.length >= 1 &&
                  postTransactions.map((e) => {
                    const currentTime = new Date();
                    const previousTime = new Date(e.timestamp * 1000);
                    const age = timeDiff(currentTime, previousTime);
                    return (
                      <div className="value_main_main">
                        <div className="value_main main_val">
                          <Tooltip placement="top" title={e.hash}>
                            <a
                              className="bttn"
                              href={"/transaction-details/" + e.hash}
                            >
                              {shorten(e.hash)}
                            </a>
                          </Tooltip>
                          <p>{shortenBalance(e.value)} XDC</p>
                          <p>{age}</p>
                          <a
                            className="details"
                            href={"/transaction-details/" + e.hash}
                          >
                            Details
                          </a>
                        </div>
                      </div>
                    );
                  })
                : postTransactions &&
                  postTransactions.length >= 1 &&
                  postTransactions
                    .slice(0, postTransactions.length - 1)
                    .map((e) => {
                      const currentTime = new Date();
                      const previousTime = new Date(e.timestamp * 1000);
                      const age = timeDiff(currentTime, previousTime);
                      return (
                        <div className="value_main_main">
                          <div className="value_main main_val">
                            <Tooltip placement="top" title={e.hash}>
                              <a
                                className="bttn"
                                href={"/transaction-details/" + e.hash}
                              >
                                {shorten(e.hash)}
                              </a>
                            </Tooltip>
                            <p>{shortenBalance(e.value)} XDC</p>
                            <p>{age}</p>
                            <a
                              className="details"
                              href={"/transaction-details/" + e.hash}
                            >
                              Details
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
