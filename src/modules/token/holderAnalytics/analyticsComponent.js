import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import TokenBalanceGraph from "./tokenBalanceGraph";
import TokenTransferAmount from "./tokenTransferAmountGraph";
import TokenTransferCount from "./tokenTransferCount";
import TokeHistoryAnalytics from "../tokenHistoryAnalytics";
import Utility from "../../../utility";
import AccountService from "../../../services/accounts";
import moment from "moment";
import { useHistory, useParams } from 'react-router-dom'

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

function TokenAnalytics(props) {
  const [graphData, setGraphData] = React.useState([]);
  const { address } = useParams()

  React.useEffect(async () => {
    await getTokenBalance();
  }, []);

  const getTokenBalance = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userAddress = urlParams.get('userAddress');
    let request = {
      walletAddress: userAddress,
      tokenAddress: address,
      from: moment().subtract(2, "month").valueOf(),
      to: moment().valueOf(),
      type: "",
    };
    let [error, response] = await Utility.parseResponse(
      AccountService.getTokenBalance(request)
    );
    if (error || !response) {
      return [];
    }
    setGraphData(response.data);
  };

  let [activeTab, setActiveTab] = useState("tokenBalance");

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
            active={activeTab === "tokenBalance" ? true : false}
            onClick={() => setActiveTab("tokenBalance")}
          >
            Token Balance
          </AnalyticsTabButton>
          <AnalyticsTabButton
            active={activeTab === "tokenTransferAmounts" ? true : false}
            onClick={() => setActiveTab("tokenTransferAmounts")}
          >
            Token Transfer Amounts
          </AnalyticsTabButton>
          <AnalyticsTabButton
            active={activeTab === "tokenTransferCounts" ? true : false}
            onClick={() => setActiveTab("tokenTransferCounts")}
          >
            Token Transfer Counts
          </AnalyticsTabButton>
          <AnalyticsTabButton
            active={activeTab === "historicalPrice" ? true : false}
            onClick={() => setActiveTab("historicalPrice")}
          >
            Historical Price
          </AnalyticsTabButton>
        </div>
        {activeTab === "tokenBalance" && (
          <TokenBalanceGraph graphData={graphData} />
        )}
        {activeTab === "tokenTransferAmounts" && (
          <TokenTransferAmount graphData={graphData} />
        )}
        {activeTab === "tokenTransferCounts" && (
            <TokenTransferCount />
        )}
        {activeTab === "historicalPrice" && (
            <TokeHistoryAnalytics/>
        )}
      </Paper>
    </div>
  );
}

export default TokenAnalytics;