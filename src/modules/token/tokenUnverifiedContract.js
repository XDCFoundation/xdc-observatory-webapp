import { Paper } from "material-ui";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import { IoIosWarning } from "react-icons/io";
import { FaShieldAlt } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";

export default function TokenUnverifiedContract(props) {
  let unverifiedData = props?.contractData;
  const [copiedText, setCopiedText] = useState("");
  const history = useHistory();
  return (
    <>
      <Paper
        style={props.theme === "dark" ? { 
          borderRadius: "14px",
          boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
          backgroundColor: "#192a59"
        } : {
          borderRadius: "14px",
          boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
        }}
        elevation={0}
      >
        <div className={props.theme === "dark" ? "container-dark" : "container"}>
          <div className="source-code-unverified">
            <div className="contract-source-code">
              <div className={props.theme === "dark" ? "contract-text fc-white" : "contract-text"}>Contract Source Code</div>
              <div className="contract-unverified-text">
                <IoIosWarning className="danger-logo" />
                <div style={{ color: "rgb(222,105,165)" }}>Unverified</div>
              </div>
            </div>
            <hr className={props.theme === "dark" ? "hr-dark hr-line" : "hr-line"}></hr>
            <div className="contract-source-code-verify">
              <div className={props.theme === "dark" ? "contract-text fc-white" : "contract-text"}>Verify</div>
              <div className="btn-click-div">
                <a href={"/verify-contracts/" + unverifiedData.address}>
                  <button className="click-here-btn">
                    <FaShieldAlt className="shield-logo" />
                    Click here
                  </button>
                </a>
                <div className={props.theme === "dark" ? "to-verify-text fc-white" : "to-verify-text"}>
                  to Verify and Publish Source Code
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
            <div className={props.theme === "dark" ? "contract-source-2 fc-white" : "contract-source-2"}>
              <img className="code-logo" src={"/images/bytecode.svg"} />{" "}
              Contract Byte-Code
            </div>
            <div>
              <CopyToClipboard
                text={unverifiedData.byteCode}
                onCopy={() => setCopiedText(unverifiedData.byteCode)}
              >
                <Tooltip
                  title={
                    copiedText === unverifiedData.byteCode
                      ? "Copied"
                      : "Copy To Clipboard"
                  }
                  placement="top"
                >
                  <button
                    style={props.theme === "dark" ? {
                      color: "blue",
                      backgroundColor: "#192a59",
                      fontSize: 14,
                    } : {
                      color: "blue",
                      backgroundColor: "white",
                      fontSize: 14,
                    }}
                  >
                    <img className="copy-icon-svg" src={"/images/copy.svg"} />
                  </button>
                </Tooltip>
              </CopyToClipboard>
            </div>
          </div>

          <div>
            <textarea
              style={props.theme === "dark" ? {
                outline: "none",
                border: "none",
                backgroundColor: "#3f4966",
                color: "#fff",
              } : {
                borderLeftWidth: "6px",
                borderLeftColor: "#2149b9",
                outline: "none",
              }}
              readOnly
              value={unverifiedData.byteCode}
              className="input-area-bytecode"
              id={props.theme === "dark" ? "contract-code-textarea" : ""}
            />
          </div>
        </div>
        <br />
      </Paper>
    </>
  );
}
