import React, { useEffect, useState } from "react";
import "../../assets/styles/custom.css";
import axios from "axios";
const moment = require("moment");

function LatestBlocks() {
  const [postHeight, setPostHeight] = useState([]);
  const [postTransactions, setpostTransactions] = useState([]);

  /* FETCHING LATEST BLOCKS API*/
  useEffect(() => {
    async function fetchLatestBlocks() {
      axios
        .get(
          "https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/getLatestBlocks"
        )
        .then((res) => {
          setPostHeight(res.data.responseData);
          console.log(res.data.responseData);
        });
    }
    const intervalId = setInterval(() => {
      fetchLatestBlocks();
    }, 1000 * 0.5); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  /* FETCHING LATEST TRANSACTIONS API*/
  useEffect(() => {
    async function fetchLatestTransactions() {
      axios
        .get(
          "https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/getLatestTransactions"
        )
        .then((res2) => {
          setpostTransactions(res2.data.responseData);
          console.log(res2.data.responseData);
        });
    }
    const intervalId = setInterval(() => {
      fetchLatestTransactions();
    }, 1000 * 0.5); // in milliseconds
    return () => clearInterval(intervalId);
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
