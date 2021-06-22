import React, { useEffect, useState } from "react";
import "../../assets/styles/custom.css";
import axios from "axios";

import { BlockService, TransactionService } from '../../services'
import Utils from '../../utility'
const moment = require("moment");

function LatestBlocks() {

  /* FETCHING LATEST BLOCKS API*/
  const [postHeight, setPostHeight] = useState([]);

  useEffect(async () => {
    let [error, latestBlocks] = await Utils.parseResponse(BlockService.getLatestBlock())
    if (error || !latestBlocks)
      return
    setPostHeight(latestBlocks);
    const interval = setInterval(async () => {
      let [error, latestBlocks] = await Utils.parseResponse(BlockService.getLatestBlock())
      setPostHeight
        (latestBlocks);
    }, 30000)
  }, []);


  /* FETCHING LATEST TRANSACTIONS API*/
  const [postTransactions, setlatestTransactions] = useState([]);
  useEffect(async () => {
    let [error, latestTransactions] = await Utils.parseResponse(TransactionService.getLatestTransaction())
    if (error || !latestTransactions)
      return
    setlatestTransactions(latestTransactions);
    const interval = setInterval(async () => {
      let [error, latestTransactions] = await Utils.parseResponse(TransactionService.getLatestTransaction())
      setlatestTransactions
        (latestTransactions);
    }, 5000)
  }, []);

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }
  return (
    <div className="block_main">
      <div className="latestblock">
        <div className="latest">
          <h1>Latest Blocks</h1>
          <button>View all</button>
        </div>
        <div className="data">
          <div className="data_heading1">
            <p>Age</p>
            <p>Height</p>
            <p>Transactions</p>
          </div>
          <div className="data_value">
            {postHeight.map((z) => {
              const ti = moment.unix(z.timestamp).fromNow();

              return (
                <div className="value_main_main">
                  <div className="main_vaa">
                    <p>{ti}</p>
                    <p className="height">{z.number}</p>
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
          <button>View all</button>
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
            {postTransactions.map((e) => {
              const age = moment.unix(e.timestamp).fromNow();
              return (
                <div className="value_main_main">
                  <div className="value_main main_val">
                    <button className="bttn">{shorten(e.hash)}</button>
                    <p>{e.value} XDC</p>
                    <p>{age}</p>
                    <button className="details">Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestBlocks;
