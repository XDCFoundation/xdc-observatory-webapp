import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  menuItemDark: {
    color: "#adc4e4 !important",
  },
})

const PageSelect = styled(Select)`
  width: 100%;
  height: ${({ height }) => height}px;
  margin: 0 10px;
  ${({ theme }) => theme === "dark" && `
    background-color: #283966;
    border: solid 1px #3552a5;
  `}

  legend {
    float: left;
  }
`;
const PageSelector = ({ value, handler, height = 35, theme = "light" }) => {
  const classes = useStyles();
  return (
    <PageSelect
      value={value}
      onChange={(event) => handler(event)}
      displayEmpty
      height={height}
      theme={theme}
      className={theme === "dark" ? classes.menuItemDark : ""}
    >
      <MenuItem disabled value="">
        <em>Select</em>
      </MenuItem>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={25}>25</MenuItem>
      <MenuItem value={50}>50</MenuItem>
      <MenuItem value={75}>75</MenuItem>
      <MenuItem value={100}>100</MenuItem>
    </PageSelect>
  );
};
export default PageSelector;
