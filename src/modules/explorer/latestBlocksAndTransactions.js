import React, { Component } from "react";
import "../../assets/styles/custom.css";
import { TransactionService, BlockService } from "../../services";
import Utils from "../../utility";
import Tooltip from "@material-ui/core/Tooltip";
import Loader from "../../assets/loader";
import utility from "../../utility";
import CommonTransactionsTable from "../common/table";
import Utility from '../../utility'
import LatestBlockView from "./latestBlockView";
import LatestTransactionView from "./LatestTransactionView";
// function timeDiff(curr, prev) {
//   if (curr < prev) return "0 secs ago";
//   var ms_Min = 60 * 1000; // milliseconds in Minute
//   var ms_Hour = ms_Min * 60; // milliseconds in Hour
//   var ms_Day = ms_Hour * 24; // milliseconds in day
//   var ms_Mon = ms_Day * 30; // milliseconds in Month
//   var ms_Yr = ms_Day * 365; // milliseconds in Year
//   var diff = curr - prev; // difference between dates.
//   // If the diff is less then milliseconds in a minute
//   if (diff < ms_Min) {
//     return Math.abs(Math.round(diff / 1000)) + " secs ago";

//     // If the diff is less then milliseconds in a Hour
//   } else if (diff < ms_Hour) {
//     return Math.abs(Math.round(diff / ms_Min)) + " mins ago";

//     // If the diff is less then milliseconds in a day
//   } else if (diff < ms_Day) {
//     return Math.abs(Math.round(diff / ms_Hour)) + " hrs ago";

//     // If the diff is less then milliseconds in a Month
//   } else if (diff < ms_Mon) {
//     return Math.abs(Math.round(diff / ms_Day)) + " days ago";

//     // If the diff is less then milliseconds in a year
//   } else if (diff < ms_Yr) {
//     return Math.abs(Math.round(diff / ms_Mon)) + " months ago";
//   } else {
//     return Math.abs(Math.round(diff / ms_Yr)) + " years ago";
//   }
// }
// function shortenBalance(b, amountL = 4, amountR = 3, stars = 0) {
//   return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(b.length)}`;
// }
const hideBlock = true;
class LatestBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestBlocksData: [],
      latestTransactionData: [],
      blockSocketConnected: false,
      transactionSocketConnected: false,
      blockAnimation: {},
      ageAnimation: {},
      transactionsAnimation: {},
      hashAnimation: {},
      ageeAnimation: {},
      amountAnimation: {},
      detailAnimation: {},
      isLoading: true,
      isLoadingTransaction: true,
    };
  }

  componentWillUnmount() {
    this.props.socket.off("block-socket");
  }
  async componentDidMount() {
    this.transactionsLatest();
    await this.blocksLatest();
    this.socketData(this.props.socket);
  }
  socketData(socket) {
    let blocks = this.state.latestBlocksData;

    socket.on("block-socket", (blockData, error) => {
      this.setState({ blockSocketConnected: true });
      let blockDataExist = blocks.findIndex((item) => {
        return item.number === blockData.number;
      });

      if (blockDataExist === -1) {
        if (blocks.length >= 10) blocks.pop();
        blocks.unshift(blockData);
        let blockAnimationClass = { [blockData.number]: "first-block-age" };
        this.setState({ blockAnimation: blockAnimationClass });
        let ageAnimationClass = { [blockData.number]: "first-block-timestamp" };
        this.setState({ ageAnimation: ageAnimationClass });
        let transactionAnimationClass = {
          [blockData.number]: "third-block-age",
        };
        this.setState({ transactionsAnimation: transactionAnimationClass });
        setTimeout(() => {
          this.setState({
            transactionsAnimation: {},
            ageAnimation: {},
            blockAnimation: {},
          });
        }, 800);
        // blocks.sort((a, b) => {
        //   return b.number - a.number;
        // });

        this.setState({ latestBlocksData: blocks });

        if (error) {
        }
      }
    });

    socket.on("transaction-socket", (transactionData, error) => {
      let transactions = this.state.latestTransactionData;
      this.setState({ transactionSocketConnected: true });
      let transactionDataExist = transactions.findIndex((item) => {
        return item.hash === transactionData.hash;
      });

      if (transactionDataExist === -1) {
        if (transactions.length >= 10) transactions.pop();
        transactions.unshift(transactionData);
        // if(Number(transactionData.value)>0)
        // transactions.unshift(transactionData);
        let hashAnimationClass = {
          [transactionData.hash]: "first-transaction-hash",
        };
        this.setState({ hashAnimation: hashAnimationClass });
        let amountAnimationClass = {
          [transactionData.hash]: "second-transaction-amount margin-left-38",
        };
        this.setState({ amountAnimation: amountAnimationClass });
        let ageAnimationClass = {
          [transactionData.hash]: "third-transaction-age",
        };
        this.setState({ ageeAnimation: ageAnimationClass });
        let detailAnimationClass = {
          [transactionData.hash]: "fourth-transaction-detail",
        };
        this.setState({ detailAnimation: detailAnimationClass });
        setTimeout(() => {
          this.setState({
            hashAnimation: {},
            amountAnimation: {},
            ageeAnimation: {},
            detailAnimation: {},
          });
        }, 500);
        this.setState({ latestTransactionData: transactions });

        if (error) {
        }
      }
    });
  }

  /* FETCHING LATEST BLOCKS API*/

  async blocksLatest() {
    let urlPath = "?skip=0&limit=10";
    let [error, latestBlocks] = await Utils.parseResponse(
      BlockService.getLatestBlock(urlPath, {})
    );
    if (error || !latestBlocks) return;

    this.setState({ latestBlocksData: latestBlocks });
    this.setState({ isLoading: false });
    // blocks = latestBlocks;

    const interval = setInterval(async () => {
      if (!this.state.blockSocketConnected) {
        let [error, latestBlocks] = await Utils.parseResponse(
          BlockService.getLatestBlock(urlPath, {})
        );
        this.setState({ latestBlocksData: latestBlocks });
        this.setState({ isLoading: false });
      }

      // blocks = latestBlocks;
    }, 90000);
  }

  /* FETCHING LATEST TRANSACTIONS API*/

  async transactionsLatest() {
    let urlPath = "?skip=0&limit=10";

    let [error, latestTransactions] = await Utils.parseResponse(
      TransactionService.getLatestTransaction(urlPath, {})
    );
    if (error) return;
    if (!latestTransactions || latestTransactions.length === 0 || latestTransactions === undefined || latestTransactions === "" || latestTransactions === null) {
      this.setState({ isLoading: false });
    }

    this.setState({ isLoading: false });
    this.setState({ latestTransactionData: latestTransactions });

    setInterval(async () => {
      if (!this.state.transactionSocketConnected) {
        let [error, latestTransactions] = await Utils.parseResponse(
          TransactionService.getLatestTransaction(urlPath, {})
        );
        if (!latestTransactions || latestTransactions.length === 0 || latestTransactions === undefined || latestTransactions === "" || latestTransactions === null) {
          this.setState({ isLoading: false });
        }
        if (error || !latestTransactions) return;
        this.setState({ isLoading: false });
        this.setState({ latestTransactionData: latestTransactions });

      }
    }, 90000);

  }
  shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  render() {
    return (
      <>
        <div>
          <div className="block_main gap-3">
            <LatestBlockView
              state={this.state}
              transactionList={this.state.latestTransactionData}
              showDetail={false}
              showBlock={true}
              isHomePage={true}
            />
            <LatestTransactionView
              state={this.state}
              transactionList={this.state.latestTransactionData}
              showHash={true}
              showDetails={false}
              showDate={true}
              isHomePage={true}
            />
            {/*{!hideBlock ? (*/}
            {/*  <div className="block_main">*/}
            {/*    <div className="latestblock">*/}
            {/*      <div className="latest2">*/}
            {/*        <h1>Latest Blocks</h1>*/}
            {/*        <a className="nav_button" href="/view-all-blocks">*/}
            {/*          View All*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*      <div className="data">*/}
            {/*        <div className="data_heading1">*/}
            {/*          <div className="block_child">*/}
            {/*            <p>Age</p>*/}
            {/*          </div>*/}
            {/*          <div className="block_child pad-lef-height">*/}
            {/*            <p>Height</p>*/}
            {/*          </div>*/}
            {/*          <div className="block_child">*/}
            {/*            <p>Transactions</p>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="data_value">*/}
            {/*          {this.state.isLoading === true ? (*/}
            {/*            <div className="loader-circular">*/}
            {/*              <Loader />*/}
            {/*            </div>*/}
            {/*          ) : (*/}
            {/*            this.state.latestBlocksData &&*/}
            {/*            this.state.latestBlocksData.length >= 1 &&*/}
            {/*            this.state.latestBlocksData.map((z, index) => {*/}
            {/*              const currentTime = Date.now();*/}
            {/*              const currentTimeFormat = new Date(currentTime);*/}
            {/*              const previousTime = new Date(z.timestamp * 1000);*/}
            {/*              const ti = utility.timeDiff(*/}
            {/*                currentTimeFormat,*/}
            {/*                previousTime*/}
            {/*              );*/}
            {/*              let blockNumber = z.number;*/}

            {/*              // let transactionLength = z.trans*/}
            {/*              let animationClass =*/}
            {/*                this.state.blockAnimation?.[blockNumber];*/}
            {/*              let ageAnimationClass =*/}
            {/*                this.state.ageAnimation?.[blockNumber];*/}
            {/*              let transAnimationClass =*/}
            {/*                this.state.transactionsAnimation?.[blockNumber];*/}

            {/*              return (*/}
            {/*                <div className="value_main_main" key={index}>*/}
            {/*                  <div className="main_vaa">*/}
            {/*                    <div className="latest_child">*/}
            {/*                      {" "}*/}
            {/*                      <p*/}
            {/*                        className={*/}
            {/*                          ageAnimationClass*/}
            {/*                            ? ageAnimationClass*/}
            {/*                            : "main_vaa"*/}
            {/*                        }*/}
            {/*                      >*/}
            {/*                        {" "}*/}
            {/*                        {ti}*/}
            {/*                      </p>*/}
            {/*                    </div>*/}
            {/*                    /!* <a className={animationClass}> *!/*/}
            {/*                    <div className="latest_child latest_margin">*/}
            {/*                      {" "}*/}
            {/*                      <a*/}
            {/*                        a*/}
            {/*                        className={*/}
            {/*                          animationClass*/}
            {/*                            ? animationClass*/}
            {/*                            : "height pad-lef-18"*/}
            {/*                        }*/}
            {/*                        href={"/block-details/" + z.number}*/}
            {/*                      >*/}
            {/*                        {z.number.toLocaleString()}*/}
            {/*                      </a>*/}
            {/*                    </div>*/}
            {/*                    <div className="latest_child">*/}
            {/*                      {" "}*/}
            {/*                      <p*/}
            {/*                        className={*/}
            {/*                          transAnimationClass*/}
            {/*                            ? transAnimationClass*/}
            {/*                            : "main_vaa  pad-left-5"*/}
            {/*                        }*/}
            {/*                      >*/}
            {/*                        {z.transactions.length}*/}
            {/*                      </p>*/}
            {/*                    </div>*/}
            {/*                  </div>*/}
            {/*                </div>*/}
            {/*              );*/}
            {/*            })*/}
            {/*          )}*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}

            {/*    <div className="latestTranscation">*/}
            {/*      <div className="latest2">*/}
            {/*        <h1>Latest Transations</h1>*/}
            {/*        <a className="nav_button" href="/view-all-transaction">*/}
            {/*          View All*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*      <div className="data overflow" style={{ overflow: "auto" }}>*/}
            {/*        <div className="data_heading">*/}
            {/*          <div className="main_head main-head">*/}
            {/*            <div className="mainhead_child1 wid-42">Hash</div>*/}
            {/*            /!* <div className="mainhead_child2 wid-40 pad-lef-28 pad-left-27">Amount</div> *!/*/}
            {/*            <div className="mainhead_child2 wid-40 pad-lef-28 amount-left-40 pad-left-27">*/}
            {/*              Amount*/}
            {/*            </div>*/}
            {/*            <div className="mainhead_child3 wid-24 pad-left-30 ">*/}
            {/*              Age*/}
            {/*            </div>*/}
            {/*            <div className="mainhead_child3 wid-24 pad-left-30 ">*/}
            {/*              Block*/}
            {/*            </div>*/}
            {/*            <div className="mainhead_child3 wid-24 pad-left-30 ">*/}
            {/*              From*/}
            {/*            </div>*/}
            {/*            <div className="mainhead_child3 wid-24 pad-left-30 ">*/}
            {/*              To*/}
            {/*            </div>*/}
            {/*            <div> </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="data_value data_margin mar-top-20 mar-top-15 w-118">*/}
            {/*          /!* {transactiondata && Object.keys(transactiondata).length >= 1 ? (*/}
            {/*    <div className="value_main_main">*/}
            {/*      <div className="value_main main_val">*/}
            {/*        <Tooltip placement="top" title={transactiondata.hash}>*/}
            {/*          <a*/}
            {/*            className="bttn2"*/}
            {/*            href={"/transaction-details/" + transactiondata.hash}*/}
            {/*          >*/}
            {/*            {shorten(transactiondata.hash)}*/}
            {/*          </a>*/}
            {/*        </Tooltip>*/}
            {/*        <p className="amount-table">*/}
            {/*          {shortenBalance(transactiondata.value)} XDC*/}
            {/*        </p>*/}
            {/*        <p className="age-table">{transactionAge}</p>*/}
            {/*        <a*/}
            {/*          className="details2"*/}
            {/*          href={"/transaction-details/" + transactiondata.hash}*/}
            {/*        >*/}
            {/*          Details*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  ) : (*/}
            {/*    ""*/}
            {/*  )} *!/*/}

            {/*          {this.state.isLoadingTransaction === true ? (*/}
            {/*            <div className="loader-circular">*/}
            {/*              <Loader />*/}
            {/*            </div>*/}
            {/*          ) : (*/}
            {/*            this.state.latestTransactionData &&*/}
            {/*            this.state.latestTransactionData.length >= 1 &&*/}
            {/*            this.state.latestTransactionData.map((e, index) => {*/}
            {/*              const currentTime = new Date();*/}
            {/*              const previousTime = new Date(e.timestamp * 1000);*/}
            {/*              const age = utility.timeDiff(*/}
            {/*                currentTime,*/}
            {/*                previousTime*/}
            {/*              );*/}
            {/*              let hash = e.hash;*/}
            {/*              let hashanimationClass =*/}
            {/*                this.state.hashAnimation?.[hash];*/}
            {/*              let amountanimationclass =*/}
            {/*                this.state.amountAnimation?.[hash];*/}
            {/*              let ageanimationclass =*/}
            {/*                this.state.ageeAnimation?.[hash];*/}
            {/*              let detailanimationclass =*/}
            {/*                this.state.detailAnimation?.[hash];*/}
            {/*              return (*/}
            {/*                <div className="value_main_main w-118" key={index}>*/}
            {/*                  <div className="main_vaa">*/}
            {/*                    <div className="latest_child w-34 width-25   mar_child wid-40 mar-left-15">*/}
            {/*                      <Tooltip placement="top" title={e.hash}>*/}
            {/*                        <a*/}
            {/*                          className={*/}
            {/*                            hashanimationClass*/}
            {/*                              ? hashanimationClass*/}
            {/*                              : "bttn pad-lef-5"*/}
            {/*                          }*/}
            {/*                          href={"/transaction-details/" + e.hash}*/}
            {/*                        >*/}
            {/*                          {this.shorten(e.hash)}*/}
            {/*                        </a>*/}
            {/*                      </Tooltip>*/}
            {/*                    </div>*/}
            {/*                    <div className="latest_child w-25 amount-pad wid-32 ">*/}
            {/*                      <p*/}
            {/*                        className={*/}
            {/*                          amountanimationclass*/}
            {/*                            ? amountanimationclass*/}
            {/*                            : "value_main margin-left-38"*/}
            {/*                        }*/}
            {/*                      >*/}
            {/*                        {e.value === 0*/}
            {/*                          ? 0*/}
            {/*                          : Utility.decimalDivison(e.value)}{" "}*/}
            {/*                        XDC*/}
            {/*                      </p>*/}
            {/*                    </div>*/}
            {/*                    <div className="latest_child w-34 w-25-per wid-29 age-pad ">*/}
            {/*                      <p*/}
            {/*                        className={*/}
            {/*                          ageanimationclass*/}
            {/*                            ? ageanimationclass*/}
            {/*                            : "value_main"*/}
            {/*                        }*/}
            {/*                      >*/}
            {/*                        {age}*/}
            {/*                      </p>*/}
            {/*                    </div>*/}
            {/*                    <div className="latest_child w-34 w-25-per wid-29 age-pad ">*/}
            {/*                      <p*/}
            {/*                        className={*/}
            {/*                          ageanimationclass*/}
            {/*                            ? ageanimationclass*/}
            {/*                            : "value_main"*/}
            {/*                        }*/}
            {/*                      >*/}
            {/*                        {e.blockNumber}*/}
            {/*                      </p>*/}
            {/*                    </div>*/}
            {/*                    <div className="latest_child w-34 width-25   mar_child wid-40 mar-left-15">*/}
            {/*                      <Tooltip placement="top" title={e.from}>*/}
            {/*                        <a*/}
            {/*                          className={*/}
            {/*                            hashanimationClass*/}
            {/*                              ? hashanimationClass*/}
            {/*                              : "bttn pad-lef-5"*/}
            {/*                          }*/}
            {/*                          href={"/address-details/" + e.from}*/}
            {/*                        >*/}
            {/*                          {this.shorten(e.from)}*/}
            {/*                        </a>*/}
            {/*                      </Tooltip>*/}
            {/*                    </div>*/}
            {/*                    <div className="latest_child w-34 width-25   mar_child wid-40 mar-left-15">*/}
            {/*                      <Tooltip placement="top" title={e.to}>*/}
            {/*                        <a*/}
            {/*                          className={*/}
            {/*                            hashanimationClass*/}
            {/*                              ? hashanimationClass*/}
            {/*                              : "bttn pad-lef-5"*/}
            {/*                          }*/}
            {/*                          href={"/address-details/" + e.to}*/}
            {/*                        >*/}
            {/*                          {this.shorten(e.to)}*/}
            {/*                        </a>*/}
            {/*                      </Tooltip>*/}
            {/*                    </div>*/}
            {/*                    <div className="latest_child w-18 mar_child wid-17 details-pad ">*/}
            {/*                      <a*/}
            {/*                        className={*/}
            {/*                          detailanimationclass*/}
            {/*                            ? detailanimationclass*/}
            {/*                            : "details "*/}
            {/*                        }*/}
            {/*                        href={"/transaction-details/" + e.hash}*/}
            {/*                      >*/}
            {/*                        Details*/}
            {/*                      </a>*/}
            {/*                    </div>*/}
            {/*                  </div>*/}
            {/*                </div>*/}
            {/*              );*/}
            {/*            })*/}
            {/*          )}*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*  <CommonTransactionsTable*/}
            {/*    state={this.state}*/}
            {/*    transactionList={this.state.latestTransactionData}*/}
            {/*    showDetail={false}*/}
            {/*    showBlock={true}*/}
            {/*    isHomePage={true}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
        </div>
      </>
    );
  }
}

export default LatestBlocks;
