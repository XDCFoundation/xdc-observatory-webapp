import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import format from "format-number";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { connect } from "react-redux";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import { messages } from "../../constants";
import TableBody from "@material-ui/core/TableBody";
import Loader from "../../assets/loader";
import utility from "../../utility";
import Paper from "@material-ui/core/Paper";
import Utility from "../../utility";
import TransactionDetailTooltip from "../common/transactionDetailTooltip";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import "../../assets/styles/custom.css";
const useStyles = makeStyles((theme) => ({
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },
  btn: {
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
  },
  error: {
    color: "red",
    marginLeft: "2px",
    marginTop: "-20px",
  },
  error1: {
    color: "red",
    marginLeft: "2px",
  },
  value: {
    width: "400px !important",
  },
  cross: {
    marginTop: "25px",
    marginLeft: "40px",
    fontWeight: "500",
  },
  dialogBox: {
    width: "553px",
    position: "absolute",
    borderRadius: "12px",
  },
  buttons: {
    justifyContent: "flex-end",
    padding: "10px 35px 15px 0px",
  },
  input: {
    width: "506px",
    height: "10px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    outline: "none",
    marginBottom: "21px",
  },
  deletebtn: {
    width: "110px",
    height: "34px",
    margin: "14px 0px 15px 20px",
    borderRadius: "4px",
    backgroundColor: "Red",
    color: "white",
  },
  updatebtn: {
    width: "110px",
    height: "34px",
    margin: "14px -8px 15px 2px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },
  cnlbtn: {
    width: "94px",
    height: "34px",
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    color: "white",
    margin: "14px 8px 15px 2px",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#2a2a2a",
    fontWeight: "500",
    border: "none !important",
  },
  forgotpass: {
    color: "#2149b9",
    marginLeft: "123px",
  },
  createaccount: {
    color: "#2149b9",
    marginLeft: "32px",
    fontfamily: "Inter",
    fontsize: "14px",
  },
  icon: {
    marginLeft: "-30px",
  },
  xdc: {
    color: "#2a2a2a",
    marginLeft: "30px",
    fontfamily: "Inter",
    fontsize: "5px",
  },
  heading: {
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "24px",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "18px",
    color: "#2a2a2a",
  },
  "@media (max-width: 767px)": {
    heading: {
      fontSize: "16px",
    },
    dialogBox: {
      width: "100%",
      top: "95px",
      borderRadius: "0px !important",
      marginLeft: "auto",
      marginRight: "auto",
    },
    input: {
      maxWidth: "503px",
      width: "100%",
    },
    flexButton: {
      display: "flex",
    },
  },
  container: {
    borderRadius: "0.875rem",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: "none",
    overflowX: "auto",
    background: "#fff",
  },
}));

const Container = styled.div`
  margin-right: 10px;
  @media (max-width: 767px) {
    min-width: 100%;
    margin-left: 0;
    margin-top: 4px;
    margin-bottom: 4px;
  }
`;
const SelectedValueContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  cursor: pointer;
  background: white;
  padding: 7px 10px;
  background-color: #2149b9;
  border-radius: 0.25rem;
  width: 5.875rem;
  height: 2.125rem;
  justify-content: center;

  img {
    width: 11px;
    margin-left: 8px;
  }
`;

const FilterName = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  gap: 25px;

  span {
    font-weight: 500;
    color: #fff;
  }
`;
const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  overflow-y: scroll;
  background-color: white;
  max-height: 250px;
  margin-top: 3px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #d4d4d4;
  min-width: ${(props) => props.containerWidth}px;

  span {
    padding: 8px;
    cursor: pointer;

    :hover {
      background-color: #f9f9f9;
    }
  }
`;
const OptionDiv = styled.div`
  padding: 6px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :hover {
    background-color: #f9f9f9;
  }
`;
const TransactionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 22px 15px 25px;
`;

const TransactionTitle = styled.div`
  width: auto;
  height: 1.125rem;
  text-align: left;

  color: #2a2a2a;
  opacity: 1;
  font-family: Inter;
  font-size: 1.125rem;
  font-weight: 600;
`;
const TransactionSubTitle = styled.div`
  width: auto;
  height: 1.125rem;
  text-align: left;

  color: #2a2a2a;
  font-family: Inter;
  font-size: 0.75rem;
  margin-left: 25px;
`;
const TableSubContainer = styled.div`
  @media (min-width: 0px) and (max-width: 767px) {
    max-width: 767px;
    width: 100%;
    overflow-x: auto;
  }
`;

const CustomDropDownAddress = (props) => {
  const { sampleRender } = props;
  const classes = useStyles();
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const mainDiv = useRef(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const [importAddress, setImportAddress] = React.useState(false);
  console.log(importAddress, "opop");
  const [importValue, setImportValue] = React.useState(0);
  const { transactionList } = props;
  const timezone = useSelector((state) => state.timezone);
  const [hashTT, setHashTT] = useState(false);
  const [amountTT, setAmountTT] = useState(false);
  const [timeStampTT, setTimeStampTT] = useState(false);

  const closeDialogImport = () => {
    setImportAddress(false);
  };
  const openDialogImport = () => {
    setImportAddress(true);
  };

  useEffect(() => {
    if (data.length >= 1) sampleRender(data);
  }, [data]);

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
    if (list.length >= 1) openDialogImport();
  };

  const onFilterClicked = () => {
    toggleDropdown(true);
  };

  const handleClickOutside = (event) => {
    if (mainDiv.current && !mainDiv.current.contains(event.target)) {
      toggleDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <Container ref={mainDiv}>
        <SelectedValueContainer onClick={onFilterClicked}>
          <FilterName>
            <span>Import</span>
          </FilterName>
        </SelectedValueContainer>
        {isDropdownOpen && (
          <DropdownContainer containerWidth={mainDiv.current.clientWidth}>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
            <OptionDiv>Import from XDCPay</OptionDiv>
            <OptionDiv onClick={handleClick}>Import from CSV file</OptionDiv>
          </DropdownContainer>
        )}
      </Container>

      <Dialog
        classes={{ paperWidthSm: classes.dialogBox }}
        open={importAddress}
        onClose={closeDialogImport}
        aria-labelledby="form-dialog-title"
      >
        <Row style={{ justifyContent: "center" }}>
          <div className={classes.heading} id="form-dialog-title">
            Select Addresses to import
          </div>
        </Row>
        <DialogContent>
          <Paper
            className={"table-list"}
            style={{
              borderRadius: "0.875rem",
              minWidth: "48%",
              // marginLeft: "18%",
              // marginRight: "18%",
            }}
            elevation={0}
          >
            <TableContainer
              className={classes.container}
              id="container-table-token"
              style={{
                borderRadius: "0",
                boxShadow: "none",
                backgroundColor: "#ffffff",
                minHeight: "100%",
              }}
            >
              <TableSubContainer>
                <Table style={{ borderBottom: "none" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ border: "none", paddingLeft: "25px" }}
                        align="left"
                      >
                        <span className={"tablehead-token-details"}>
                          Name Tag
                        </span>
                      </TableCell>
                      <TableCell style={{ border: "none" }} align="left">
                        <span className={"tablehead-token-details"}>
                          Address
                        </span>
                      </TableCell>

                      <TableCell
                        style={{ border: "none", whiteSpace: "nowrap" }}
                        align="left"
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data.length >= 1 &&
                      data.map((row, index) => {
                        return (
                          <TableRow>
                            <TableCell
                              id="td"
                              className="w-150 bord-none"
                              style={{ paddingLeft: "25px" }}
                            >
                              <div className="display-flex">
                                <span className={"tabledata p-l-0"}>{row.Block}</span>
                              </div>
                            </TableCell>
                            <TableCell
                              className=" bord-none"
                              style={{ paddingRight: "25px" }}
                            >
                              <div className="display-flex">
                                <span className="tabledata p-l-0">{row.Block}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableSubContainer>
            </TableContainer>
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomDropDownAddress;
