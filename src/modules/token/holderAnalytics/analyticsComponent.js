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
import { useHistory, useParams } from "react-router-dom";
import Utils from "../../../utility";
import TokenData from "../../../services/token";

const AnalyticsTabButton = styled.button`
  border-radius: 5px;
  border: 1px solid #d5dae2;
  background: #fff;
  color: #77838f;
  font-weight: 600;
  height: 35px;
  ${({ active }) =>
    active &&
    `
    background: #2149b9;
    color: #fff;
    border: none;
  `}
`;

const Buttonscontainer = styled.div`
  padding: 15px 0 0 15px;
  display: flex;
  flex-flow: row;
  gap: 15px;
  @media (min-width: 0px) and (max-width: 767px) {
    flex-flow: column;
    align-items: flex-start;
    padding: 0 0 0 15px;
  }
`;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row;
  margin: 20px;
`;

function TokenAnalytics(props) {
  const [graphData, setGraphData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [contractAdd, setContractAdd] = React.useState("");

  React.useEffect(async () => {
    await getTokenBalance();
  }, []);

  const getTokenBalance = async () => {
    let values = { addr: props.walletAddress, pageNum: 0, perpage: 1 };
    let [err, tns] = await Utils.parseResponse(
      TokenData.getHolderDetailsUsingAddressforToken(values)
    );
    if (err || !tns) return;
    setContractAdd(tns[0]?.Contract_address);
    setLoading(true);
    let request = {
      walletAddress: props.walletAddress,
      tokenAddress: tns[0]?.Contract_address,
      from: moment().subtract(3, "month").valueOf(),
      to: moment().valueOf(),
      type: "",
    };
    let [error, response] = await Utility.parseResponse(
      AccountService.getTokenBalance(request)
    );
    setLoading(false);
    if (error || !response) {
      return [];
    }
    setGraphData(response.data);
  };

  let [activeTab, setActiveTab] = useState("tokenBalance");

  return (
    <Paper
      style={{
        padding: "15px 10px 0 0",
        borderRadius: "14px",
        boxShadow: " 0 1px 10px 0 rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexFlow: "column",
        gap: "10px",
      }}
      elevation={0}
    >
      <Buttonscontainer>
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
      </Buttonscontainer>
      {activeTab === "tokenBalance" && (
        <TokenBalanceGraph
          graphData={graphData}
          loading={loading}
          ProgressBarContainer={ProgressBarContainer}
        />
      )}
      {activeTab === "tokenTransferAmounts" && (
        <TokenTransferAmount
          graphData={graphData}
          loading={loading}
          ProgressBarContainer={ProgressBarContainer}
        />
      )}
      {activeTab === "tokenTransferCounts" && (
        <TokenTransferCount
          contractAddress={contractAdd}
          loading={loading}
          ProgressBarContainer={ProgressBarContainer}
        />
      )}
      {activeTab === "historicalPrice" && (
        <TokeHistoryAnalytics contractAddress={contractAdd} loading={loading} />
      )}
    </Paper>
  );
}

export default TokenAnalytics;
