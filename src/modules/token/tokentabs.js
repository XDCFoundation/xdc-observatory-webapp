import React from 'react';
import { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TokenTransfertab from './tokenTransfertab';
import TokenHoldertab from './tokenHoldersTab';
import TokenContracttab from './tokenContractTab';
import styled from "styled-components";
import { Grid } from "@material-ui/core";


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
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };


  return (
    <div>

      <Grid lg={10} className="table-grid-block3">
        <div className={classes.root}>
          <div style={{ width: '950px', display: 'flex', flexDirection: 'row', backgroundColor: 'transparent', height: '25px', borderBottom: 'solid 1px #e3e7eb' }}>
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
              <div style={{ marginTop: '10px', width: '950px' }}>
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
                <TokenContracttab />
              </div>

            </div>

          </div>

        </div>

      </Grid>
    </div>
  );
}