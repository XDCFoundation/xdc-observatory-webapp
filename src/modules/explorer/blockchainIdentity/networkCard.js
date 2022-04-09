import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((themes) => ({
  contentContainer: {
    width: "581px",
    padding: "23px 10px 23px 40px",
    borderRadius: "12px",
    boxShadow: "0 2px 15px 0 rgba(0, 0, 0, 0.1)",
    border: "solid 1px #e3e7eb",
    backgroundColor: "var(--white)",
    marginBottom: "32px",
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      width: "350px",
    },
  },
  darkContentContainer: {
    width: "581px",
    padding: "23px 10px 23px 40px",
    borderRadius: "12px",
    // boxShadow: "0 2px 15px 0 rgba(0, 0, 0, 0.1)",
    // border: "solid 1px #e3e7eb",
    backgroundColor: "#283966",
    marginBottom: "32px",
  },
  contentHeading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2149b9",
    marginBottom: "20px",
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      fontSize: "15px",
    },
  },
  darkContentHeading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "20px",
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      fontSize: "15px",
    },
  },
  subContentRow: {
    display: "flex",
    padding: " 3px 0",
  },
  subcontentHeading: {
    width: "134px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#252525",
    marginRight: "14px",
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      fontSize: "12px",
    },
  },
  darkSubcontentHeading: {
    width: "134px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#ffffff",
    marginRight: "14px",
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      fontSize: "12px",
    },
  },
  dataContainer: {
    display: "flex",
  },
  subContentData: {
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "normal",
    color: "#3a3a3a",
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      fontSize: "12px",
    },
  },
  darkSubContentData: {
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "normal",
    color: "#adc4e4",
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      fontSize: "12px",
    },
  },
  copyicon: {
    width: "16px",
    height: "16px",
    margin: "4px 0 0 8px",
    cursor: "pointer",
  },
  customTooltip: {
    fontSize: "13px",
  },
  customTooltipDarkMode: {
    background: "#051440",
    color: "#adc4e4",
    fontSize: "13px",
  },
}));

export default function NetworkCard(props) {
  console.log("props", props);
  const classes = useStyles();
  const [copiedText, setCopiedText] = useState("");
  return (
    <div>
      <div
        className={
          props.theme === "dark"
            ? classes.darkContentContainer
            : classes.contentContainer
        }
      >
        <div
          className={
            props.theme === "dark"
              ? classes.darkContentHeading
              : classes.contentHeading
          }
        >
          {props.cardHeading}
        </div>
        <div className={classes.subContentRow}>
          <div
            className={
              props.theme === "dark"
                ? classes.darkSubcontentHeading
                : classes.subcontentHeading
            }
          >
            Network name
          </div>
          <div
            className={
              props.theme === "dark"
                ? classes.darkSubContentData
                : classes.subContentData
            }
          >
            {props.networkName}
          </div>
        </div>
        <div className={classes.subContentRow}>
          <div
            className={
              props.theme === "dark"
                ? classes.darkSubcontentHeading
                : classes.subcontentHeading
            }
          >
            New RPC URL
          </div>
          <div className={classes.dataContainer}>
            <div
              className={
                props.theme === "dark"
                  ? classes.darkSubContentData
                  : classes.subContentData
              }
            >
              {props.RPC_URL}
            </div>
            <CopyToClipboard
              text={props.RPC_URL}
              onCopy={() => setCopiedText(props.RPC_URL)}
            >
              <Tooltip
                title={
                  copiedText === props.RPC_URL ? "Copied" : "Copy To Clipboard"
                }
                placement="top"
                classes={{
                  tooltip:
                    props.theme === "dark"
                      ? classes.customTooltipDarkMode
                      : classes.customTooltip,
                }}
              >
                <img className={classes.copyicon} src="/images/copy-grey.svg" />
              </Tooltip>
            </CopyToClipboard>
          </div>
        </div>
        <div className={classes.subContentRow}>
          <div
            className={
              props.theme === "dark"
                ? classes.darkSubcontentHeading
                : classes.subcontentHeading
            }
          >
            Chain ID
          </div>
          <div
            className={
              props.theme === "dark"
                ? classes.darkSubContentData
                : classes.subContentData
            }
          >
            {props.chainID}
          </div>
        </div>
        <div className={classes.subContentRow}>
          <div
            className={
              props.theme === "dark"
                ? classes.darkSubcontentHeading
                : classes.subcontentHeading
            }
          >
            Currency Symbol
          </div>
          <div
            className={
              props.theme === "dark"
                ? classes.darkSubContentData
                : classes.subContentData
            }
          >
            {props.currencySymbol}
          </div>
        </div>
        <div className={classes.subContentRow}>
          <div
            className={
              props.theme === "dark"
                ? classes.darkSubcontentHeading
                : classes.subcontentHeading
            }
          >
            Block Explorer
          </div>
          <div className={classes.dataContainer}>
            <div
              className={
                props.theme === "dark"
                  ? classes.darkSubContentData
                  : classes.subContentData
              }
            >
              {props.blockExplorer}
            </div>
            <CopyToClipboard
              text={props.blockExplorer}
              onCopy={() => setCopiedText(props.blockExplorer)}
            >
              <Tooltip
                title={
                  copiedText === props.blockExplorer
                    ? "Copied"
                    : "Copy To Clipboard"
                }
                placement="top"
                classes={{
                  tooltip:
                    props.theme === "dark"
                      ? classes.customTooltipDarkMode
                      : classes.customTooltip,
                }}
              >
                <img className={classes.copyicon} src="/images/copy-grey.svg" />
              </Tooltip>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}
