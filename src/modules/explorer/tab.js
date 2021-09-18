import { useState, useEffect } from "react";
import React from "react";
import "../../assets/styles/custom.css";
import Graphbar from './graphBar';
import Accountsgraphbar from './accountsGraphBar';
import Gasgraphbar from './gasGraphBar';
import { TransactionService, AccountService } from '../../services'
import Utils from '../../utility'

function Tab() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="container-graph-tab">
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
                <div className="days , days-14">
                    <p>14 Days</p>
                </div>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <Graphbar />


                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <Accountsgraphbar />
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <Gasgraphbar />

                </div>
            </div>



        </div>
    );
}

export default Tab;
