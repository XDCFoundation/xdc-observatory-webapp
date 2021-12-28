import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { TransactionService } from "../../services";
import Utils from "../../utility";
import format from "format-number";
import { toolTipMessages } from "../../constants";

function TransactionDetailTooltip(props) {
  console.log(props, "<<=====props");
  const [open, setOpen] = useState({});
  const [transactionHash, setTransactionHash] = useState(0);
  const [transactions, setTransactionDetail] = useState(0);
  console.log(transactions, "ppp");

  const openTootltip = (idx) => {
    let ele = (document.getElementById(
      idx.currentTarget.getAttribute("id")
    ).style.backgroundColor = "#4878ff");
    setOpen(true);
    if (props.transactionAddress.Txn_Hash !== undefined) {
      setTransactionHash(props.transactionAddress.Txn_Hash);
    }
  };
  useEffect(() => {
    if (transactionHash !== 0) {
      transactionDetail();
    }
  }, [transactionHash]);

  const transactionDetail = async () => {
    let urlPath = `${transactionHash}`;
    let [error, transactiondetailusinghash] = await Utils.parseResponse(
      TransactionService.getTransactionDetailsUsingHash(urlPath, {})
    );
    // if (
    //   !transactiondetailusinghash ||
    //   transactiondetailusinghash.length === 0 ||
    //   transactiondetailusinghash === undefined ||
    //   transactiondetailusinghash === "" ||
    //   transactiondetailusinghash === null
    // ) {
    //   setLoading(false);
    // }
    if (error || !transactiondetailusinghash) return;
    setTransactionDetail(transactiondetailusinghash);
  };

  return (
    <div>
      <Tippy
        trigger="click"
        theme={"light"}
        interactive={true}
        placement="right"
        offset={[0, 0]}
        content={
          <div className={"transaction-detail-tooltip"}>
            <p className="fs-14 additional-details">Additional Details</p>
            <div className="display-flex">
              <Tippy
                align="left"
                content={"hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"}
              >
                <img
                  className="w-14-px h-14 m-r-10"
                  src="/images/question_mark_tooltip.svg"
                ></img>
              </Tippy>{" "}
              <div className="detail-heading">Status</div>
            </div>
            {transactions.status == true ? (
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
            <div className="detail-heading-text">20 XDC ($1.615)</div>
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
            <div className="detail-heading-text">0.00000525 XDC ($0.2411)</div>
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
              <div className="detail-heading">Gas Price</div>
            </div>
            <div className="detail-heading-text">0.00000000025</div>
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
            <hr className="line-detail-tooltip"></hr>
          </div>
        }
      >
        <img
          className={"show-tooltip"}
          src={"/images/show-icon.svg"}
          onClick={openTootltip}
          id={props.transactionAddress.id}
        />
      </Tippy>
    </div>
  );
}

export default TransactionDetailTooltip;
