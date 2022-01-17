import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import TransactionAnalytics from "./transactions";
import TokenTransferAnalytics from "./tokenTransfer";
import XDCBalanceAnalytics from "./xdcBalance";
import XDCTransferAnalytics from "./xdcTransfer";

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

function AddressDetailsAnalytics() {
  let [activeTab, setActiveTab] = useState("xdcBalance");

  return (
    <Paper style={PaperStyles} elevation={0}>
      <Buttonscontainer>
        <AnalyticsTabButton
          active={activeTab === "xdcBalance"}
          onClick={() => setActiveTab("xdcBalance")}
        >
          XDC Balance
        </AnalyticsTabButton>
        <AnalyticsTabButton
          active={activeTab === "transactions"}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </AnalyticsTabButton>
        <AnalyticsTabButton
          active={activeTab === "xdcTransfer"}
          onClick={() => setActiveTab("xdcTransfer")}
        >
          XDC Transfer
        </AnalyticsTabButton>
        <AnalyticsTabButton
          active={activeTab === "tokenTransfer"}
          onClick={() => setActiveTab("tokenTransfer")}
        >
          Token Transfer
        </AnalyticsTabButton>
      </Buttonscontainer>
      {activeTab === "xdcBalance" && <XDCBalanceAnalytics />}
      {activeTab === "transactions" && <TransactionAnalytics />}
      {activeTab === "xdcTransfer" && <XDCTransferAnalytics />}
      {activeTab === "tokenTransfer" && <TokenTransferAnalytics />}
    </Paper>
  );
}

export default AddressDetailsAnalytics;
