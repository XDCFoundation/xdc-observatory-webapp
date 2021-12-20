import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TokenTransfertab from './tokenTransfertab';
import TokenHoldertab from './tokenHoldersTab';
import TokenContracttab from './tokenContractTab';
import TokenUnverifiedContract from './tokenUnverifiedContract'
import { Grid } from "@material-ui/core";
import ContractData from "../../services/contract";
import Utils from "../../utility";
import { useParams } from "react-router";

let li = 0;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 650,
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    "@media (min-width:0px) and (max-width:767px)": {
      minWidth: 280,
      width: "22.563rem",
      margin: "auto",
    },
    "@media (min-width:767px) and (max-width:1240px)": {
      minWidth: 280,
      width: "41.5rem",
      margin: "auto",
    },
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [toggleState, setToggleState] = useState(1);
  const [contractStatus, setContractStatus] = useState("")
  const [statusData, setStatus] = useState("")
  useEffect(() => {
    verifiedStatus();
  }, []);
  const { address } = useParams();

  const verifiedStatus = async () => {

    let urlPath = `${address}`;
    let [error, contractStatusData] = await Utils.parseResponse(
      ContractData.getContractDetailsUsingAddress(urlPath, {})
    );
    if (error || !contractStatusData) return;
    setContractStatus(contractStatusData.contractResponse);
    setStatus(contractStatusData.contractStatus)
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };


  return (
    <div>

      {/* <Grid lg={10} className="table-grid-block3"> */}
      <Grid className="table-grid-block3">
        <div className={classes.root}>
          <div style={{ width: 'auto', display: 'flex', flexDirection: 'row', backgroundColor: 'transparent', height: '25px', borderBottom: 'solid 1px #e3e7eb' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }} >
                <button
                  className={toggleState === 1 ? "tabs-data active-tabs-token" : "tabs-data"}
                  onClick={() => toggleTab(1)}
                >
                  Transfers
                </button>
                <button
                  className={toggleState === 2 ? "tabs-data active-tabs-token-holder" : "tabs-data"}
                  onClick={() => toggleTab(2)}
                >
                  Holders
                </button>
                <button
                  className={toggleState === 3 ? "tabs-data active-tabs-token" : "tabs-data"}
                  onClick={() => toggleTab(3)}

                >
                  Contracts
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className={toggleState === 1 ? "content  active-content" : "content"}>
              <div style={{ marginTop: '10px', width: 'auto' }}>
                <TokenTransfertab />
              </div>
            </div>

            <div className={toggleState === 2 ? "content  active-content" : "content"}>
              <div style={{ marginTop: '10px' }}>
                <TokenHoldertab />
              </div>
            </div>



            <div className={toggleState === 3 ? "content  active-content" : "content"}>
              <div style={{ marginTop: '10px' }}>
                {!contractStatus ? "" : statusData === "Unverified" ? <TokenUnverifiedContract contractData={contractStatus} /> : <TokenContracttab contractData={contractStatus} />}
                {/* <TokenContracttab /> */}
                {/* <TokenUnverifiedContract contractData={contractStatus} /> */}
              </div>

            </div>

          </div>

        </div>

      </Grid>
    </div>
  );
}