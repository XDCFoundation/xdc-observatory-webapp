import React from "react";
import "../../assets/styles/custom.css";
import BLOCK_DATA from "./blockData";

function latestBlocks() {
  return (
    <div className="block_main">
      <div className="latestblock">
        <div className="latest">
          <h1>Latest Block</h1>
          <button>View all</button>
        </div>
        <div className="data">
          <div className="data_heading">
            <p>Age</p>
            <p>Height</p>
            <p>Transactions</p>
            <p>Reward</p>
          </div>

          <div className="data_value"></div>
        </div>
      </div>
      <div className="latestTranscation"></div>
    </div>
  );
}

export default latestBlocks;
