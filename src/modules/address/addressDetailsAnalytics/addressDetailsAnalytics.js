import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import TransactionAnalytics from "./transactions"
import TokenTransferAnalytics from "./tokenTransfer"
import XDCBalanceAnalytics from "./xdcBalance"
import XDCTransferAnalytics from "./xdcTransfer"

const AnalyticsTabButton = styled.button`
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

function AddressDetailsAnalytics() {
    let [activeTab, setActiveTab] = useState("xdcBalance");

    return (
        <div>
            <Paper
                style={{
                    padding: "14px",
                    borderRadius: "14px",
                    boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
                }}
                elevation={0}
            >
                <div>
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
                </div>
                {activeTab === "xdcBalance" && (
                   <XDCBalanceAnalytics/>
                )}
                {activeTab === "transactions" && (
                    <TransactionAnalytics/>
                )}
                {activeTab === "xdcTransfer" && (
                    <XDCTransferAnalytics/>
                )}
                {activeTab === "tokenTransfer" && (
                    <TokenTransferAnalytics/>
                )}
            </Paper>
        </div>
    );
}

export default AddressDetailsAnalytics;
