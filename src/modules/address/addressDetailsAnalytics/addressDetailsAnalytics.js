import React, { useState } from "react";
import { Paper, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import TransactionAnalytics from "./transactions";
import TokenTransferAnalytics from "./tokenTransfer";
import XDCBalanceAnalytics from "./xdcBalance";
import XDCTransferAnalytics from "./xdcTransfer";
import { messages } from "../../../constants";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    fontSize: "13px"
  },
  customTooltipDarkMode: {
    background: "#051440",
    color: "#adc4e4",
    fontSize: "13px"
  }
}))

const AnalyticsTabButton = styled.button`
  border-radius: 5px;
  border: 1px solid #d5dae2;
  background: #fff;
  color: #77838f;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  height: 35px;
  white-space: nowrap;
  margin-bottom: 6%;
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
  @media (min-width: 0px) and (max-width: 767px) {
    width: 140px;
  }
`;

const Buttonscontainer = styled.div`
  @media (min-width: 768px) {
  display: flex;
  flex-flow: row;
  gap: 15px; }
  @media (min-width: 0px) and (max-width: 767px) {
    display: none;
  }
`;

const ButtonscontainerMob = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
  display: flex;
  justify-content: space-between;
  }
  @media (min-width: 768px) {
    display: none;
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

const MobDiv = styled.div`
@media (min-width: 0px) and (max-width: 767px) {

}
`;

function AddressDetailsAnalytics(props) {
  const classes = useStyles();
  let [activeTab, setActiveTab] = useState("xdcBalance");
  const [rangeSelectTT, setRangeSelectTT] = useState(false);

  return (
    <Paper style={props.theme === "dark" ? PaperStylesDark : PaperStyles} elevation={0}>
      <div style={rowContainer}>
      <Buttonscontainer>
        {/* <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}> */}
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
        {/* </div>
        <div> */}
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
        {/* </div> */}
      </Buttonscontainer>
      <ButtonscontainerMob>
        <div>
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
        </div>
        <div style={{paddingLeft: "28px"}}>
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
        </div>
      </ButtonscontainerMob>
      {window.innerWidth > 1024 ?
                      <Tooltip
                        placement="top"
                        title={messages.RANGE_SELECT}
                        classes={{
                          tooltip: props.theme === "dark" ? classes.customTooltipDarkMode : classes.customTooltip,
                        }}
                      >
                        <img
                          alt="question-mark"
                          src="/images/info.svg"
                        />
                      </Tooltip>:
      <Tooltip
          placement="top"
          title={messages.RANGE_SELECT}
          open={rangeSelectTT}
          onOpen={() => setRangeSelectTT(true)}
          onClose={() => setRangeSelectTT(false)}
          classes={{
            tooltip: props.theme === "dark" ? classes.customTooltipDarkMode : classes.customTooltip,
          }}
        >
          <img style={infoIcon} src="/images/info.svg"
          onClick={() => setRangeSelectTT(!rangeSelectTT)}
          />
        </Tooltip>}
      </div>
      {activeTab === "xdcBalance" && <XDCBalanceAnalytics theme={props.theme}/>}
      {activeTab === "transactions" && <TransactionAnalytics theme={props.theme}/>}
      {activeTab === "xdcTransfer" && <XDCTransferAnalytics theme={props.theme}/>}
      {activeTab === "tokenTransfer" && <TokenTransferAnalytics theme={props.theme}/>}
    </Paper>
  );
}

export default AddressDetailsAnalytics;
