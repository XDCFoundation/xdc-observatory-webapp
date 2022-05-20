import { Paper } from "material-ui";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import { IoIosWarning } from "react-icons/io";
import { FaShieldAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    fontSize: "13px",
  },
  customTooltipDarkMode: {
    background: "#051440",
    color: "#adc4e4",
    fontSize: "13px",
  },
}));

export default function TokenUnverifiedContract(props) {
  const classes = useStyles();
  let unverifiedData = props?.contractData;
  const [copiedText, setCopiedText] = useState("");
  const history = useHistory();
  return (
    <>
      <Paper
        style={{
          borderRadius: "14px",
          boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
        }}
        elevation={0}
        className={props.theme === "dark" ? "table-bg-dark" : ""}
      >
        <div
          className={
            props.theme === "dark" ? "container table-bg-dark" : "container"
          }
        >
          <div className="source-code-unverified">
            <div className="contract-source-code">
              <div
                className={
                  props.theme === "dark"
                    ? "contract-text fc-white"
                    : "contract-text"
                }
              >
                Contract Source Code
              </div>
              <div className="contract-unverified-text">
                <IoIosWarning className="danger-logo" />
                <div style={{ color: "rgb(222,105,165)" }}>Unverified</div>
              </div>
            </div>
            <hr
              className={props.theme === "dark" ? "hr-line hr-dark" : "hr-line"}
            ></hr>
            <div className="contract-source-code-verify">
              <div
                className={
                  props.theme === "dark"
                    ? "contract-text fc-white"
                    : "contract-text"
                }
              >
                Verify
              </div>
              <div className="btn-click-div">
                <button
                  className="click-here-btn"
                  onClick={() =>
                    history.push("/verify-contracts/" + unverifiedData?.address)
                  }
                >
                  <FaShieldAlt className="shield-logo" />
                  Click here
                </button>{" "}
                <div
                  className={
                    props.theme === "dark"
                      ? "to-verify-text fc-b1c3e1"
                      : "to-verify-text"
                  }
                >
                  to Verify and Publish Source Code
                </div>
              </div>
            </div>
          </div>

          <div className="contract-source-code-verify display-flex-i">
            <div
              className={
                props.theme === "dark"
                  ? "contract-source-2 fc-white"
                  : "contract-source-2"
              }
            >
              <img className="code-logo" src={"/images/bytecod.png"} />
              Contract Byte-Code
            </div>
            <div>
              <CopyToClipboard
                text={unverifiedData?.byteCode}
                onCopy={() => setCopiedText(unverifiedData?.byteCode)}
              >
                <Tooltip
                  title={
                    copiedText === unverifiedData?.byteCode
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
                  <button
                    style={
                      props.theme === "dark"
                        ? {
                            color: "blue",
                            backgroundColor: "transparent",
                            fontSize: 14,
                          }
                        : {
                            color: "blue",
                            backgroundColor: "white",
                            fontSize: 14,
                          }
                    }
                  >
                    <img src={"/images/copy-grey.svg"} alt="copy" />
                  </button>
                </Tooltip>
              </CopyToClipboard>
            </div>
          </div>

          <div>
            <textarea
              style={
                props.theme === "dark"
                  ? {
                      outline: "none",
                    }
                  : {
                      borderLeftWidth: "6px",
                      borderLeftColor: "#2149b9",
                      outline: "none",
                    }
              }
              readOnly
              value={unverifiedData?.byteCode}
              className={
                props.theme === "dark"
                  ? "input-area-bytecode-dark"
                  : "input-area-bytecode"
              }
              id="contract-code-textarea"
            />
          </div>
        </div>
        <br />
      </Paper>
    </>
  );
}
