import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import TokenHistory from "../tokenHistoryAnalytics";
import TokenContractOverviewGraph from "./tokenContractOverview";

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
    background: #2149b9;
    color: #fff;
    border: none;
  `}
  ${({ theme, active }) =>
    theme === "dark" && !active &&
    `
    background: transparent;
    border: solid 1px #3552a5;
    color: #b1c3e1;
  `}
`;

const PaperStyle = {
  borderRadius: "14px",
  boxShadow: "rgb(0 0 0 / 10%) 0px 1px 10px 0px",
  display: "flex",
  flexFlow: "column",
  gap: "15px",
  padding: "0 15px 0 0",
};
const PaperStyleDark = {
  borderRadius: "14px",
  boxShadow: "rgb(0 0 0 / 10%) 0px 1px 10px 0px",
  display: "flex",
  flexFlow: "column",
  gap: "15px",
  padding: "0 15px 0 0",
  backgroundColor: "#192a59"
};

const Buttonscontainer = styled.div`
  padding: 15px 0 0 15px;
  display: flex;
  flex-flow: row;
  gap: 15px;
  @media (min-width: 0px) and (max-width: 767px) {
    flex-flow: column;
    align-items: flex-start;
  }
`;

function TokenAnalytics(props) {
  let [activeTab, setActiveTab] = useState("tokenContractOverview");

  return (
    <div>
      <Paper style={props.theme === "dark" ? PaperStyleDark : PaperStyle} elevation={0}>
        <Buttonscontainer>
          <AnalyticsTabButton
            active={activeTab === "tokenContractOverview" ? true : false}
            onClick={() => setActiveTab("tokenContractOverview")}
            theme={props.theme}
          >
            Token Contract Overview
          </AnalyticsTabButton>
          <AnalyticsTabButton
            active={activeTab === "historicalPrice" ? true : false}
            onClick={() => setActiveTab("historicalPrice")}
            theme={props.theme}
          >
            Historical Price
          </AnalyticsTabButton>
        </Buttonscontainer>
        {activeTab === "tokenContractOverview" && (
          <TokenContractOverviewGraph theme={props.theme}/>
        )}
        {activeTab === "historicalPrice" && (
          <TokenHistory contractAddress={props.contractAddress} theme={props.theme}/>
        )}
      </Paper>
    </div>
  );
}

export default TokenAnalytics;
