import React, { useState, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { TransactionService } from "../../services";
import Utils from "../../utility";
import format from "format-number";
import { toolTipMessages } from "../../constants";
import Loader from "../../assets/loader";

function TransactionDetailTooltip(props) {
  const [open, setOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState(0);
  const [transactions, setTransactionDetail] = useState(0);
  const [price, setPrice] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  let CurrencyValue = window.localStorage.getItem("currency");
  let menuRef = useRef();

  const openTootltip = () => {
    if (props.transactionAddress !== undefined) {
      setTransactionHash(0);
      setTransactionHash(props.transactionAddress);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef?.current?.contains(event.target)) {
        setOpen(false);
      }
    });
    if (transactionHash !== 0) {
      transactionDetail();
    }
    if (timeStamp !== 0) {
      getCoinMarketDetailForTransaction();
    }
  }, [transactionHash, timeStamp, CurrencyValue]);

  const transactionDetail = async () => {
    let urlPath = `${transactionHash}`;
    let [error, transactiondetailusinghash] = await Utils.parseResponse(
      TransactionService.getTransactionDetailsUsingHash(urlPath, {})
    );
    if (error || !transactiondetailusinghash) return;
    setTransactionDetail(transactiondetailusinghash);
    setTimeStamp(transactiondetailusinghash?.timestamp);
    setIsLoading(false);
  };

  const getCoinMarketDetailForTransaction = async () => {
    let urlPath =
      "?transactionTime=" + timeStamp + "&fiatValue=" + CurrencyValue;
    let [error, transactiondetailusinghash] = await Utils.parseResponse(
      TransactionService.getCoinMarketDetailForTransaction(urlPath, {})
    );
    if (error || !transactiondetailusinghash) return;
    setPrice(transactiondetailusinghash[0]?.price);
  };

  const currencySymbol =
    CurrencyValue === "INR" ? "₹" : CurrencyValue === "USD" ? "$" : "€";
  const valueFetch =
    CurrencyValue === "INR" ? price : CurrencyValue === "USD" ? price : price;
  const valueDiv = !valueFetch
    ? 0
    : Utils.decimalDivison(valueFetch * transactions.value, 8);
  const ValueMain = !transactions?.value
    ? 0
    : Utils.decimalDivison(transactions?.value, 8);
  const txfee = !transactions
    ? 0
    : Utils.decimalDivison(transactions?.gasPrice * transactions?.gasUsed, 8);

  const transactionFetch =
    CurrencyValue === "INR"
      ? txfee * price
      : CurrencyValue === "USD"
      ? txfee * price
      : txfee * price;
  const fetchtxn = !transactionFetch
    ? 0
    : parseFloat(transactionFetch)?.toFixed(8);

  const gasP = !transactions.gasPrice
    ? 0
    : Utils.decimalDivison(transactions.gasPrice, 12);

  return (
    <div>
      <Tippy
        trigger="click"
        theme={"light"}
        interactive={true}
        placement={window.innerWidth > 768 ? "right" : "bottom"}
        offset={[0, 0]}
        content={
          <div ref={menuRef} className={"transaction-detail-tooltip"}>
            {isLoading == true ? (
              <div className="tooltip-loader-div">
                <Loader />
              </div>
            ) : (
              <div>
                <p className="fs-14 additional-details">Additional Details</p>
                <div className="display-flex">
                  <Tippy align="right" content={"Status of the transaction."}>
                    <img
                      className="w-14-px h-14 m-r-10"
                      src="/images/question_mark_tooltip.svg"
                    ></img>
                  </Tippy>
                  <div className="detail-heading">Status</div>
                </div>
                {transactions && transactions.status == true ? (
                  <div className="success-text">Success</div>
                ) : (
                  <div className="failed-text">Failed</div>
                )}
                <hr className="line-detail-tooltip"></hr>
                <div className="display-flex">
                  <Tippy align="left" content={toolTipMessages.value}>
                    <img
                      className="w-14-px h-14 m-r-10"
                      src="/images/question_mark_tooltip.svg"
                    ></img>
                  </Tippy>{" "}
                  <div className="detail-heading">Value</div>
                </div>
                <div className="detail-heading-text">
                  {ValueMain}&nbsp; XDC ({currencySymbol}
                  {valueDiv})
                </div>
                <hr className="line-detail-tooltip"></hr>
                <div className="display-flex">
                  <Tippy align="left" content={toolTipMessages.txnfee}>
                    <img
                      className="w-14-px h-14 m-r-10"
                      src="/images/question_mark_tooltip.svg"
                    ></img>
                  </Tippy>{" "}
                  <div className="detail-heading">Txn Free</div>
                </div>
                <div className="detail-heading-text">
                  {txfee == 0
                    ? 0
                    : parseFloat(txfee)?.toFixed(8).replace(/0+$/, "")}{" "}
                  XDC ({currencySymbol}
                  {fetchtxn})
                </div>
                <hr className="line-detail-tooltip"></hr>
                <div className="display-flex">
                  <Tippy align="left" content={toolTipMessages.gasprovided}>
                    <img
                      className="w-14-px h-14 m-r-10"
                      src="/images/question_mark_tooltip.svg"
                    ></img>
                  </Tippy>{" "}
                  <div className="detail-heading">Gas Provided</div>
                </div>
                <div className="detail-heading-text">
                  {format({})(transactions.gas)}
                </div>
                <hr className="line-detail-tooltip"></hr>
                <div className="display-flex">
                  <Tippy align="left" content={toolTipMessages.gasprice}>
                    <img
                      className="w-14-px h-14 m-r-10"
                      src="/images/question_mark_tooltip.svg"
                    ></img>
                  </Tippy>{" "}
                  <div className="detail-heading">Avg Transaction Fee</div>
                </div>
                <div className="detail-heading-text">
                  {gasP == 0
                    ? 0
                    : parseFloat(gasP)?.toFixed(12).replace(/0+$/, "")}
                </div>
                <hr className="line-detail-tooltip"></hr>
                <div className="display-flex">
                  <Tippy align="left" content={toolTipMessages.nounced}>
                    <img
                      className="w-14-px h-14 m-r-10"
                      src="/images/question_mark_tooltip.svg"
                    ></img>
                  </Tippy>{" "}
                  <div className="detail-heading">Nonce</div>
                </div>
                <div className="detail-heading-text">{transactions?.nonce}</div>
                <div className="tooltip-link-div">
                  <div>
                    <a
                      href={"/transaction-details/" + transactionHash}
                      className="tooltip-link"
                    >
                      Transaction Details
                    </a>
                  </div>
                  <div>
                    <a
                      href={"/transaction-details/" + transactionHash}
                      className="tooltip-link"
                    >
                      <img className={"show-arrow"} src={"/images/arrow.svg"} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
      >
        <button
          onClick={() => setOpen(true)}
          className={open ? "eye-button" : "eye-button-inactive"}
        >
          <img
            className={"show-tooltip"}
            src={open ? "/images/show-icon-white.svg" : "/images/show-icon.svg"}
            onClick={openTootltip}
          />
        </button>
      </Tippy>
    </div>
  );
}

export default TransactionDetailTooltip;
