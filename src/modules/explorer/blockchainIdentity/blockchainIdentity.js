import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Tokensearchbar from "../tokensearchBar";
import FooterComponent from "../../common/footerComponent";
import NetworkCard from "./networkCard";
import { NetworkService } from "../../../services";
import { dispatchAction } from "../../../utility";
import { connect } from "react-redux";

const useStyles = makeStyles((themes) => ({
  mainContainer: {
    maxWidth: "1202px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading: {
    marginTop: "46px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2a2a2a",
    "@media screen and (min-width: 768px) and (max-width: 819px)": {
      paddingLeft: "12.5%",
    },
    "@media screen and (min-width: 820px) and (max-width: 1240px)": {
      paddingLeft: "14.5%",
    },
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      fontSize: "17px",
    },
    "@media screen and (min-width: 0px) and (max-width: 360px)": {
      paddingLeft: "2%",
    },
    "@media screen and (min-width: 361px) and (max-width: 376px)": {
      paddingLeft: "3.5%",
    },
    "@media screen and (min-width: 377px) and (max-width: 394px)": {
      paddingLeft: "5.5%",
    },
    "@media screen and (min-width: 395px) and (max-width: 767px)": {
      paddingLeft: "8%",
    },
  },
  darkheading: {
    marginTop: "46px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
    "@media screen and (min-width: 768px) and (max-width: 819px)": {
      paddingLeft: "12.5%",
    },
    "@media screen and (min-width: 820px) and (max-width: 1240px)": {
      paddingLeft: "14.5%",
    },
    "@media screen and (min-width: 0px) and (max-width: 767px)": {
      fontSize: "17px",
    },
  },
  contentRow: {
    marginTop: "12px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "wrap",
    "@media screen and (min-width: 0px) and (max-width: 1240px)": {
      justifyContent: "center",
    },
  },
}));

function BlockchainIdentity(props) {
    const classes = useStyles();
    const [blockchainIdentityResponse, setBlockchainIdentityResponse] = useState([])

  useEffect(() => {
    networkDetails();
  }, []);

  async function networkDetails() {
    const response = await NetworkService.getNetworkDetails();
    setBlockchainIdentityResponse(response);
  }
  return (
    <div
      style={
        props?.theme.currentTheme === "dark"
          ? { backgroundColor: "#091b4e" }
          : { backgroundColor: "#fff" }
      }
      className={props?.theme.currentTheme === "dark" ? "dark-theme-bg" : ""}
    >
      <Tokensearchbar
        theme={props.theme.currentTheme === "dark" ? "dark" : ""}
      />
      <div className={classes.mainContainer}>
        <div
          className={
            props?.theme.currentTheme === "dark"
              ? classes.darkheading
              : classes.heading
          }
        >
          Blockchain Identity
        </div>
        <div className={classes.contentRow}>
          {blockchainIdentityResponse &&
            blockchainIdentityResponse.map((row, index) => {
              return (
                <NetworkCard
                  cardHeading={row.networkName}
                  networkName={row.networkName}
                  RPC_URL={row.RPC_URL}
                  chainID={row.chainID}
                  currencySymbol={row.currencySymbol}
                  blockExplorer={row.blockExplorer}
                  theme={props?.theme.currentTheme}
                />
              );
            })}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user, theme: state.theme };
};
export default connect(mapStateToProps, { dispatchAction })(BlockchainIdentity);
