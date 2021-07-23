import React, { Component } from "react";
import "../../assets/styles/custom.css";
import { BlockService, TransactionService } from "../../services";
import Utils from "../../utility";
import Tooltip from "@material-ui/core/Tooltip";

function timeDiff(curr, prev) {
  var ms_Min = 60 * 1000; // milliseconds in Minute
  var ms_Hour = ms_Min * 60; // milliseconds in Hour
  var ms_Day = ms_Hour * 24; // milliseconds in day
  var ms_Mon = ms_Day * 30; // milliseconds in Month
  var ms_Yr = ms_Day * 365; // milliseconds in Year
  var diff = curr - prev; // difference between dates.
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

function increment(data) {
  console.log(data, "DATA FUNCTION");
}

class LatestBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestBlocksData: [],
      latestTransactionData: [],
    };
  }

  /* FETCHING LATEST BLOCKS API*/

  componentWillUnmount() {
    this.props.socket.off("block-socket");
  }
  async componentDidMount() {
    await this.blocksLatest();
    await this.transactionsLatest();
    this.socketData(this.props.socket);
  }
  socketData(socket) {
    let blocks = this.state.latestBlocksData;
    let transactions = this.state.latestTransactionData;
    socket.on("block-socket", (blockData, error) => {
      console.log(blockData.number);
      let blockDataExist = blocks.findIndex((item) => {
        return item.number == blockData.number;
      });
      // blockData["class"] = "first-block-age last-block-transaction height2";
      if (blockDataExist == -1) {
        // console.log(blockData.number, "NUMBER");
        console.log(blockData.timestamp, "hiiiiii");
        if (blocks.length >= 10) blocks.pop();
        blocks.unshift(blockData);
        // blocks.sort((a, b) => {
        //   return b.number - a.number;
        // });

        this.setState({ latestBlocksData: blocks });

        if (error) {
          console.log("hello error");
        }
      }
    });

    socket.on("transaction-socket", (transactionData, error) => {
      let transactionDataExist = transactions.findIndex((item) => {
        return item.hash == transactionData.hash;
      });
      if (transactionDataExist == -1) {
        if (transactions.length >= 10) transactions.pop();
        transactions.unshift(transactionData);
        this.setState({ latestTransactionData: transactions });

        if (error) {
          console.log("hello error");
        }
      }
    });
  }
  async blocksLatest() {
    let urlPath = "?skip=0&limit=10";
    let [error, latestBlocks] = await Utils.parseResponse(
      BlockService.getLatestBlock(urlPath, {})
    );
    if (error || !latestBlocks) return;
    this.setState({ latestBlocksData: latestBlocks });
    // blocks = latestBlocks;
    const interval = setInterval(async () => {
      let [error, latestBlocks] = await Utils.parseResponse(
        BlockService.getLatestBlock(urlPath, {})
      );
      this.setState({ latestBlocksData: latestBlocks });
      // blocks = latestBlocks;
    }, 45000);
  }

  /* FETCHING LATEST TRANSACTIONS API*/

  async transactionsLatest() {
    let urlPath = "?skip=0&limit=10";
    let [error, latestTransactions] = await Utils.parseResponse(
      TransactionService.getLatestTransaction(urlPath, {})
    );
    if (error || !latestTransactions) return;
    this.setState({ latestTransactionData: latestTransactions });
    const interval = setInterval(async () => {
      let [error, latestTransactions] = await Utils.parseResponse(
        TransactionService.getLatestTransaction(urlPath, {})
      );
      this.setState({ latestTransactionData: latestTransactions });
    }, 45000);
  }

  shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  // const [transactiondata, settransactiondata] = useState({});

  // let [blockSocket, setBlockSocket] = useState([]);
  // let data = new Array(1);
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     setblockdata(data[0]);
  //     console.log(data, "data with interval");
  //   }, 1000);
  // }, []);
  // let queue = [];
  // ...... //
  // try {
  //   console.log("soxket-connection-call");
  //   // socket.on("connect", () => {
  //   //   console.log(socket.id, "SOCKET.ID");
  //   // });
  //   // socket.on("error", (error) => {
  //   //   console.log(error, "Its an error");
  //   // });
  //   // // socket.emit('Connected', "hello")

  //   // socket.on("block-socket", (blockData, error) => {
  //   //   let blockDataExist = blocks.findIndex((item) => {
  //   //     return item.number == blockData.number;
  //   //   });
  //   //   if (blockDataExist == -1) {
  //   //     // socket.emit("received", true);
  //   //     console.log(blockData.number, "NUMBER");
  //   //     blocks.pop();
  //   //     blocks.unshift(blockData);
  //   //     blocks.sort((a, b) => {
  //   //       return b.number - a.number;
  //   //     });
  //   //     setPostHeight(blocks);
  //   //     if (error) {
  //   //       console.log("hello error");
  //   //     }
  //   //   }

  //   //   // console.log(blockData, "data while pushig");
  //   // });

  //   // // socket.onclose = function (e) {
  //   // //   console.log(
  //   // //     "Socket is closed. Reconnect will be attempted in 1 second.",
  //   // //     e.reason
  //   // //   );
  //   // //   setTimeout(function () {
  //   // //     socket.on("Connected", () => {
  //   // //       console.log("Hello from client");
  //   // //     });
  //   // //   }, 1000);
  //   // // };

  // } catch (error) {
  //   // socket.on("Connected", () => {
  //   //   console.log("Hello from client");
  //   // });
  //   // socket.emit('Connected', "hello")
  // }
  // .....  //
  //   function connect() {

  //     socket.onopen = function () {
  //       // subscribe to some channels
  //        socket.on("block-socket", (blockData, error) => {
  //       let blockDataExist = blocks.findIndex((item) => {
  //         return item.number == blockData.number;
  //       });
  //       if (blockDataExist == -1) {
  //         // socket.emit("received", true);
  //         console.log(blockData.number, "NUMBER");
  //         blocks.pop();
  //         blocks.unshift(blockData);
  //         blocks.sort((a, b) => {
  //           return b.number - a.number;
  //         });
  //         setPostHeight(blocks);
  //         if (error) {
  //           console.log("hello error");
  //         }
  //     };
  //     socket.onclose = function (e) {
  //       console.log(
  //         "Socket is closed. Reconnect will be attempted in 1 second.",
  //         e.reason
  //       );
  //       setTimeout(function () {
  //         connect();
  //       }, 1000);
  //     };
  //     socket.onerror = function (err) {
  //       console.error(
  //         "Socket encountered error: ",
  //         err.message,
  //         "Closing socket"
  //       );
  //       socket.close();
  //     };
  //   }
  // console.log(postHeight, "bloc-socket");
  // const currentTime = new Date();
  // const previousTime = new Date(blockdata?.timestamp * 1000);
  // const blockage = timeDiff(currentTime, previousTime);
  // const previousTime2 = new Date(transactiondata?.timestamp * 1000);
  // const transactionAge = timeDiff(currentTime, previousTime2);

  // console.log(blockdata, "BLOCK-DATA-SOCKET");
  render() {
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
                {/* {this.state.socketBlock &&
                Object.keys(this.state.socketBlock).length >= 1 ? (
                  <div className="value_main_main">
                    <div className="main_vaa">
                      <p className="first-block-age">hiii</p>
                      <a
                        className="height2"
                        href={"/block-details/" + this.state.socketBlock.number}
                      >
                        {this.state.socketBlock.number.toLocaleString()}
                      </a>
                      <p className="last-block-transaction">
                        {this.state.socketBlock.transactions}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
                {this.state.latestBlocksData &&
                  this.state.latestBlocksData.length >= 1 &&
                  this.state.latestBlocksData.map((z, index) => {
                    const currentTime = new Date();
                    const previousTime = new Date(z.timestamp * 1000);
                    const ti = timeDiff(currentTime, previousTime);
                    return (
                      <div
                        className={
                          !index && z.class
                            ? `${z.class} value_main_main`
                            : "value_main_main"
                        }
                      >
                        <div className="main_vaa">
                          <p className>{ti}</p>
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
                {/* {transactiondata && Object.keys(transactiondata).length >= 1 ? (
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
              )} */}

                {this.state.latestTransactionData &&
                  this.state.latestTransactionData.length >= 1 &&
                  this.state.latestTransactionData.map((e) => {
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
                              {this.shorten(e.hash)}
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
}

export default LatestBlocks;
