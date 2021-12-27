import React from "react";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import Popover from "@material-ui/core/Popover";

function TransactionDetailTooltip(props) {
  console.log(props, "ppppp");
  return (
    <Popover
      open={props.isOpen}
      anchorEl={props.anchorEl}
      onClose={props.handleOnClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
    >
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
        <div className="success-text">Success</div>
        <hr className="line-detail-tooltip"></hr>
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
          <div className="detail-heading">Value</div>
        </div>
        <div className="detail-heading-text">20 XDC ($1.615)</div>
        <hr className="line-detail-tooltip"></hr>
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
          <div className="detail-heading">Txn Free</div>
        </div>
        <div className="detail-heading-text">0.00000525 XDC ($0.2411)</div>
        <hr className="line-detail-tooltip"></hr>
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
          <div className="detail-heading">Gas Provided</div>
        </div>
        <div className="detail-heading-text">300,000</div>
        <hr className="line-detail-tooltip"></hr>
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
          <div className="detail-heading">Gas Price</div>
        </div>
        <div className="detail-heading-text">0.00000000025</div>
        <hr className="line-detail-tooltip"></hr>
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
          <div className="detail-heading">Nonce</div>
        </div>
        <div className="detail-heading-text">1605290</div>
        <hr className="line-detail-tooltip"></hr>
      </div>
    </Popover>
  );
}

export default TransactionDetailTooltip;
