import React, {useState} from "react";
import "../../assets/styles/custom.css";
import Graphbar from './graphBar';
import Accountsgraphbar from './accountsGraphBar';
import Gasgraphbar from './gasGraphBar';

function Tab(props) {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className={props.theme === "dark" ? "container-graph-tab-dark" : "container-graph-tab"}>
            <div className="block" style={{marginTop:'10px'}}>
                <div className="bloc-tabs">
                    <button
                        className={toggleState === 1 ? props.theme === "dark" ? "tabs-dark active-tabs-dark" : "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}
                    >
                        Transactions
                    </button>
                    <button
                        className={toggleState === 2 ? props.theme === "dark" ? "tabs-dark active-tabs-dark" : "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}
                        style={{marginLeft: "13px"}}
                    >
                        Accounts
                    </button>
                    <button
                        className={toggleState === 3 ? props.theme === "dark" ? "tabs-dark active-tabs-dark" : "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(3)}
                    >
                        Txn Fee (Avg)
                    </button>
                </div>
                <div className={props.theme === "dark" ? "days-dark days-14" : "days , days-14"}>
                    <p>14 Days</p>
                </div>
            </div>

            <div className="content-tabs" >
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <Graphbar theme={props.theme}/>


                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <Accountsgraphbar theme={props.theme}/>
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <Gasgraphbar theme={props.theme} currency={props.currency}/>

                </div>
            </div>



        </div>
    );
}

export default Tab;
