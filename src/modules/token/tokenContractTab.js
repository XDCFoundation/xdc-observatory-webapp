import { Paper } from "material-ui";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import ReadMethods from "../contractMethods/read";
import WriteMethods from "../contractMethods/write";
import styled from "styled-components";
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

const TabButton = styled.button`
  border-radius: 5px;
  border: 1px solid #d5dae2;
  background: #fff;
  color: #77838f;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  margin-right: 8px;
  ${({ active }) =>
    active &&
    `
    background: linear-gradient(to bottom, #2149b9, #3e71ff);
    color: #fff;
    border: none;
  `}
`;

const TabButtonContainer = styled.div`
  padding: 1.875rem 0 0 1.875rem;
  @media (min-width: 0px) and (max-width: 767px) {
    padding: 1.875rem 0 0 0.75rem;
  }
`;

export default function TokenContracttab(props) {
  const classes = useStyles();
  // const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Paper
        style={
          props.theme === "dark"
            ? {
                borderRadius: "14px",
                boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
                backgroundColor: "#192a59",
              }
            : {
                borderRadius: "14px",
                boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
              }
        }
        elevation={0}
      >
        <ContractDetails {...props} />
        {/* <TabButtonContainer>
          <TabButton
            active={activeTab === 0 ? true : false}
            onClick={() => setActiveTab(0)}
          >
            Code
          </TabButton>
          <TabButton
            active={activeTab === 1 ? true : false}
            onClick={() => setActiveTab(1)}
          >
            Read
          </TabButton>

          <TabButton
            active={activeTab === 2 ? true : false}
            onClick={() => setActiveTab(2)}
          >
            Write
          </TabButton>
        </TabButtonContainer>

        {activeTab == 0 ? <ContractDetails {...props} /> : ""}
        {activeTab == 1 ? (
          <ReadMethods
            contractData={props.contractData ? { ...props.contractData } : {}}
          />
        ) : (
          ""
        )}
        {activeTab == 2 ? (
          <WriteMethods
            contractData={props.contractData ? { ...props.contractData } : {}}
          />
        ) : (
          ""
        )} */}
        <br />
      </Paper>
    </>
  );
}

const ContractDetails = (props) => {
  const classes = useStyles();
  let verifiedData = props?.contractData;
  const [copiedText, setCopiedText] = useState("");

  return (
    <div className={props.theme === "dark" ? "container-dark" : "container"}>
      <div
        className={
          props.theme === "dark" ? "contract-source-dark" : "contract-source"
        }
      >
        <span
          style={{ color: "#03be46", fontSize: "14", alignItems: "center" }}
        >
          {" "}
          <img
            className="verified-logo"
            src={"/images/verified.svg"}
          ></img>{" "}
        </span>
        Contract Source Code Verified
      </div>
      <br />
      <br />
      <div className="source-code-verified-container">
        <div className="source-code-first-container">
          <div className="source-code-content">
            <div
              className={
                props.theme === "dark"
                  ? "source-code-content-heading fc-white"
                  : "source-code-content-heading"
              }
            >
              Contract Name
            </div>
            <div
              className={
                props.theme === "dark"
                  ? "source-code-content-value-name fc-b1c3e1"
                  : "source-code-content-value-name"
              }
            >
              {verifiedData?.contractName}
            </div>
          </div>
          <hr
            className={
              props.theme === "dark"
                ? "source-code-line hr-dark"
                : "source-code-line"
            }
          ></hr>
          <div className="source-code-content">
            <div
              className={
                props.theme === "dark"
                  ? "source-code-content-heading fc-white"
                  : "source-code-content-heading"
              }
            >
              Compiler Version
            </div>
            <div
              className={
                props.theme === "dark"
                  ? "source-code-content-value fc-b1c3e1"
                  : "source-code-content-value"
              }
            >
              {verifiedData?.compilerVersion}
            </div>
          </div>
          <hr
            className={
              props.theme === "dark"
                ? "source-code-line hr-dark"
                : "source-code-line"
            }
          ></hr>
          <br />
        </div>
        <div className="source-code-first-container">
          <div className="source-code-content">
            <div
              className={
                props.theme === "dark"
                  ? "source-code-content-heading fc-white"
                  : "source-code-content-heading"
              }
            >
              Optimization Enabled
            </div>
            <div
              className={
                props.theme === "dark"
                  ? "source-code-content-value-optimization fc-b1c3e1"
                  : "source-code-content-value-optimization"
              }
            >
              {props?.contractData?.optimization?.toString() === "false"
                ? "No"
                : "Yes"}
            </div>
          </div>
          <hr
            className={
              props.theme === "dark"
                ? "source-code-line hr-dark"
                : "source-code-line"
            }
          ></hr>
          <div className="source-code-content">
            <div
              className={
                props.theme === "dark"
                  ? "source-code-content-heading fc-white"
                  : "source-code-content-heading"
              }
            >
              Share On Socialmedia
            </div>
            <div
              className={
                props.theme === "dark"
                  ? "source-code-content-value fc-b1c3e1"
                  : "source-code-content-value"
              }
            >
              Not available
            </div>
          </div>
          <hr
            className={
              props.theme === "dark"
                ? "source-code-line hr-dark"
                : "source-code-line"
            }
          ></hr>
        </div>
      </div>

      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className={
            props.theme === "dark"
              ? "contract-source-2 fc-white"
              : "contract-source-2"
          }
        >
          <img className="code-logo" src={"/images/code.svg"} /> Contract Source
          Code Verified{" "}
        </div>
        <div>
          <CopyToClipboard
            text={verifiedData?.sourceCode}
            onCopy={() => setCopiedText(verifiedData?.sourceCode)}
          >
            <Tooltip
              title={
                copiedText === verifiedData?.sourceCode
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
                        backgroundColor: "#192a59",
                        fontSize: 14,
                      }
                    : {
                        color: "blue",
                        backgroundColor: "white",
                        fontSize: 14,
                      }
                }
              >
                <img className="copy-icon-svg" src={"/images/copy-grey.svg"} />
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
                  border: "none",
                  paddingLeft: "18px",
                  backgroundColor: "#3f4966",
                  color: "#fff",
                }
              : {
                  borderLeftWidth: "6px",
                  borderLeftColor: "#2149b9",
                  outline: "none",
                  paddingLeft: "18px",
                }
          }
          readOnly
          className="input-area-3"
          value={verifiedData?.sourceCode}
          id={props.theme === "dark" ? "contract-code-textarea" : ""}
        />
      </div>

      <br />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className={
            props.theme === "dark"
              ? "contract-source-2 fc-white"
              : "contract-source-2"
          }
        >
          <img className="code-logo" src={"/images/abi.svg"} />
          Contract ABI
        </div>
        <div>
          <CopyToClipboard
            text={verifiedData?.abi}
            onCopy={() => setCopiedText(verifiedData?.abi)}
          >
            <Tooltip
              title={
                copiedText === verifiedData?.abi
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
                        backgroundColor: "#192a59",
                        fontSize: 14,
                      }
                    : {
                        color: "blue",
                        backgroundColor: "white",
                        fontSize: 14,
                      }
                }
              >
                <img className="copy-icon-svg" src={"/images/copy-grey.svg"} />
              </button>
            </Tooltip>
          </CopyToClipboard>
        </div>
      </div>

      <div>
        <textarea
          value={verifiedData?.abi}
          style={
            props.theme === "dark"
              ? {
                  outline: "none",
                  border: "none",
                  paddingLeft: "18px",
                  backgroundColor: "#3f4966",
                  color: "#fff",
                }
              : {
                  borderLeftWidth: "6px",
                  borderLeftColor: "#2149b9",
                  outline: "none",
                  paddingLeft: "18px",
                }
          }
          readOnly
          className="input-area-3"
          id={props.theme === "dark" ? "contract-code-textarea" : ""}
        />
      </div>

      <br />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className={
            props.theme === "dark"
              ? "contract-source-2 fc-white"
              : "contract-source-2"
          }
        >
          <img className="code-logo" src={"/images/bytecode.svg"} />
          Contract Byte-Code
        </div>
        <div>
          <CopyToClipboard
            text={verifiedData?.byteCode}
            onCopy={() => setCopiedText(verifiedData?.byteCode)}
          >
            <Tooltip
              title={
                copiedText === verifiedData?.byteCode
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
                        backgroundColor: "#192a59",
                        fontSize: 14,
                      }
                    : {
                        color: "blue",
                        backgroundColor: "white",
                        fontSize: 14,
                      }
                }
              >
                <img className="copy-icon-svg" src={"/images/copy-grey.svg"} />
              </button>
            </Tooltip>
          </CopyToClipboard>
        </div>
      </div>

      <div>
        <textarea
          value={verifiedData?.byteCode}
          style={
            props.theme === "dark"
              ? {
                  outline: "none",
                  border: "none",
                  backgroundColor: "#3f4966",
                  color: "#fff",
                }
              : {
                  borderLeftWidth: "6px",
                  borderLeftColor: "#2149b9",
                  outline: "none",
                }
          }
          readOnly
          className="input-area-4"
          id={props.theme === "dark" ? "contract-code-textarea" : ""}
        />
      </div>
    </div>
  );
};
