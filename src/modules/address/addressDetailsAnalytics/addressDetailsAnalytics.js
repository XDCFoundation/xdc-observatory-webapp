import React, { useState } from "react";
import { Paper, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import TransactionAnalytics from "./transactions";
import TokenTransferAnalytics from "./tokenTransfer";
import XDCBalanceAnalytics from "./xdcBalance";
import XDCTransferAnalytics from "./xdcTransfer";
import { messages } from "../../../constants";

const AnalyticsTabButton = styled.button`
  border-radius: 5px;
  border: 1px solid #d5dae2;
  background: #fff;
  color: #77838f;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  height: 35px;
  ${({ active }) =>
    active &&
    `
    background: linear-gradient(to bottom, #2149b9, #3e71ff);
    color: #fff;
    border: none;
  `}

  ${({ theme, active }) => theme === "dark" && !active && `
    background: transparent;
    border: solid 1px #3552a5;
    color: #b1c3e1;
  `}

  ${({ theme, active }) => theme === "dark" && active && `
    background: #2149b9;
    color: #fff;
  `}
`;

const Buttonscontainer = styled.div`
  display: flex;
  flex-flow: row;
  gap: 15px;
  @media (min-width: 0px) and (max-width: 767px) {
    flex-flow: column;
    align-items: flex-start;
  }
`;
const rowContainer = {
  display: "flex",
  justifyContent: "space-between"
}
const PaperStyles = {
  padding: "15px",
  borderRadius: "14px",
  boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
  margin: "35px 0",
  display: "flex",
  gap: "10px",
  flexFlow: "column",
  width: "100%",
};
const PaperStylesDark = {
  padding: "15px",
  borderRadius: "14px",
  boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
  margin: "35px 0",
  display: "flex",
  gap: "10px",
  flexFlow: "column",
  width: "100%",
  backgroundColor: "#192a59",
  marginBottom: "60px",
};
const infoIcon = {
  width: "22px"
}

function AddressDetailsAnalytics(props) {
  let [activeTab, setActiveTab] = useState("xdcBalance");

  return (
    <Paper style={props.theme === "dark" ? PaperStylesDark : PaperStyles} elevation={0}>
      <div style={rowContainer}>
      <Buttonscontainer>
        <AnalyticsTabButton
          active={activeTab === "xdcBalance"}
          onClick={() => setActiveTab("xdcBalance")}
          theme={props.theme}
        >
          XDC Balance
        </AnalyticsTabButton>
        <AnalyticsTabButton
          active={activeTab === "transactions"}
          onClick={() => setActiveTab("transactions")}
          theme={props.theme}
        >
          Transactions
        </AnalyticsTabButton>
        <AnalyticsTabButton
          active={activeTab === "xdcTransfer"}
          onClick={() => setActiveTab("xdcTransfer")}
          theme={props.theme}
        >
          XDC Transfer
        </AnalyticsTabButton>
        <AnalyticsTabButton
          active={activeTab === "tokenTransfer"}
          onClick={() => setActiveTab("tokenTransfer")}
          theme={props.theme}
        >
          Token Transfer
        </AnalyticsTabButton>
      </Buttonscontainer>
      <Tooltip
          placement="top"
          title={messages.RANGE_SELECT}
        >
          <img style={infoIcon} src="/images/info.svg"/>
        </Tooltip>
      </div>
      {activeTab === "xdcBalance" && <XDCBalanceAnalytics theme={props.theme}/>}
      {activeTab === "transactions" && <TransactionAnalytics theme={props.theme}/>}
      {activeTab === "xdcTransfer" && <XDCTransferAnalytics theme={props.theme}/>}
      {activeTab === "tokenTransfer" && <TokenTransferAnalytics theme={props.theme}/>}
    </Paper>
  );
}

export default AddressDetailsAnalytics;
