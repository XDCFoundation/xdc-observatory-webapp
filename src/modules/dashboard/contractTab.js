import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import VerifyContract from "./verifyContract";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";

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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginLeft: '19%',
//     width: '62%',
//     flexGrow: 1,

//   },
// }));

export default function SimpleTabs() {
  // const [value, setValue] = React.useState(0);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <Tokensearchbar />
      <div className="vc-header">
        <div className='vc-header-child'>Verify Contract</div>
      </div>
      <div className="vc-tab-all">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "transparent",
            marginTop: "20px",
            borderBottom: "solid 1px #e3e7eb",
          }}
        >
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                className={
                  toggleState === 1 ? "tabs-vc active-tabs-contract" : "tabs-vc"
                }
                onClick={() => toggleTab(1)}
              >
                Source Code
              </button>
            </div>
          </div>
        </div>

        <div>
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <div style={{ marginTop: "10px" }}>
              <VerifyContract />
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
