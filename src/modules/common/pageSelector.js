import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import React from "react";

const PageSelect = styled(Select)`
  width: 100%;
  height: ${({ height }) => height}px;
  margin: 0 10px;

  legend {
    float: left;
  }
`;
const PageSelector = ({ value, handler, height = 35 }) => {
  return (
    // <PageSelect
    //   value={value}
    //   onChange={(event) => handler(event)}
    //   displayEmpty
    //   height={height}
    // >
    //   <MenuItem disabled value="">
    //     <em>Select</em>
    //   </MenuItem>
    //   <MenuItem value={10}>10</MenuItem>
    //   <MenuItem value={25}>25</MenuItem>
    //   <MenuItem value={50}>50</MenuItem>
    //   <MenuItem value={75}>75</MenuItem>
    //   <MenuItem value={100}>100</MenuItem>
    // </PageSelect>
    <select
    value={value}
    className="select-amount"
    onChange={(event) => handler(event)}
  >
    <option value={10}>10</option>
    <option value={25}>25</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
  </select>
  );
};
export default PageSelector;
