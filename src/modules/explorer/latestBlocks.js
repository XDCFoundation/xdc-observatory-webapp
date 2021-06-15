import React from "react";
import "../../assets/styles/custom.css";
import BLOCK_DATA from "./blockData";
import TRANSACTION_DATA from "./transactionsData";

function latestBlocks() {
  function shorten(b, amountL = 12, amountR = 3, stars = 3) {
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
          <div className="data_heading">
            <p>Age</p>
            <p>Height</p>
            <p>Transactions</p>
            <p className="end">Reward</p>
          </div>

          <div className="data_value">
            {BLOCK_DATA.map((e) => {
              return (
                <div className="value_main_main">
                  <div className="value_main">
                    <p>{e.age}</p>
                    <p>{e.height}</p>
                    <p>{e.trans}</p>
                    <p>{e.reward}</p>
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
          <div className="data_heading data_heading_sec">
            <p>Hash</p>
            <p>Amount</p>
            <p>Age</p>
          </div>

          <div className="data_value">
            {TRANSACTION_DATA.map((e) => {
              return (
                <div className="value_main_main">
                  <div className="value_main main_val">
                    <button className="bttn">{shorten(e.hash)}</button>
                    <p>{e.amount}</p>
                    <p>{e.age}</p>
                    <button className="btn">Details</button>
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

export default latestBlocks;
