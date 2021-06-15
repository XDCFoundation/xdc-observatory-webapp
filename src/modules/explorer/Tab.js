import { useState } from "react";
import React from "react";
import "../../assets/styles/custom.css";
import gphPic from "../../images/graph.png";

function Tab() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="block">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Transactions
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Accounts
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Gas Price
          </button>
        </div>
        <div className="days">
          <p>14 Days</p>
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <img src={gphPic} alt="graph of last 14 days transactions" />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <img src={gphPic} alt="graph of last 14 days accounts" />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <img src={gphPic} alt="graph of last 14 days gas price" />
        </div>
      </div>
      <div className="dates">
        <p>1 May</p>
        <p>14 May</p>
      </div>
    </div>
  );
}

export default Tab;
