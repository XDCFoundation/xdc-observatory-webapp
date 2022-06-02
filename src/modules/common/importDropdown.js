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
import TableBody from "@material-ui/core/TableBody";
import Loader from "../../assets/loader";
import Paper from "@material-ui/core/Paper";
import Utility from "../../utility";
import TransactionDetailTooltip from "../common/transactionDetailTooltip";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import "../../assets/styles/custom.css";
import toast, { Toaster } from "react-hot-toast";
import CustomLoader from "../../assets/customLoader"
import Web3 from "web3";
import { genericConstants, cookiesConstants, messages } from "../../constants";
import { sessionManager } from "../../managers/sessionManager";
import Papa from "papaparse";

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
  error2: {
    color: "red",
    marginLeft: "16px",
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
    maxHeight: "476px",
  },
  buttons: {
    justifyContent: "flex-end",
    padding: "10px 35px 15px 0px",
  },
  input: {
    width: "506px",
    height: "10px",
    border: "solid 1px #9fa9ba",
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
  sibtn: {
    height: "34px",
    borderRadius: "4px",
    border: "solid 1px #3763dd",
    margin: "14px 8px 15px 2px",
    fontSize: "15px",
    fontWeight: 600,

    textAlign: "center",
    color: "#3763dd",
  },
  sabtn: {
    height: "34px",
    width: "94px",
    borderRadius: "4px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 600,
    margin: "14px 8px 15px 2px",
  },
  disabled: {
    height: "34px",
    borderRadius: "4px",
    margin: "14px 8px 15px 2px",
    border: "1px solid #999999",
    backgroundColor: "#cccccc",
    color: "#666666",
    pointerEvents: "none",
    fontSize: "15px",
    fontWeight: 600,

    textAlign: "center",
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
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "18px",
    color: "#2a2a2a",
  },
  connectXdcDialogBox: {
    width: "500px",
    position: "absolute",
    borderRadius: "12px",
  },
  importXdcHeading: {
    margin: "28px auto 10px auto",
    fontFamily: "Inter",
    fontSize: "22px",
    fontWeight: "600",
    textAlign: "center",
    color: "#2a2a2a",
  },
  importXdcText: {
    maxWidth: "353px",
    width: "100%",
    margin: "0px auto 68px auto",
    fontFamily: "Inter",
    fontSize: "15px",
    textAlign: "center",
    color: "#585858"
  },
  importXdcLogo: {
    width: "100px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  connectWalletButton: {
    maxWidth: "178px",
    width: "100%",
    height: "34px",
    margin: "86px auto 49px auto",
    paddingTop: "7px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "600",
    color: "#ffffff",
    cursor: "pointer",
  },
  dialogContentTable: {
    padding: "8px",
  },
  "@media (max-width: 767px)": {
    heading: {
      fontSize: "22px",
      fontWeight: "600",
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
    // margin-top: 4px;
    margin-bottom: 4px;
  }
`;
const SelectedValueContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  cursor: pointer;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 0.25rem;
  width: 5.875rem;
  height: 2.125rem;
  border-radius: 4px;
  border: solid 1px #3763dd;
  justify-content: center;
  img {
    width: 11px;
    margin-left: 8px;
  }
  @media (min-width:0px) and (max-width:767px) {
    width: 4rem;
  }
`;

const FilterName = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  font-weight: 500;
  color: #4878ff;
  gap: 25px;

  span {
    font-weight: 500;
    color: #4878ff;  }
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
  padding: 9px 11px;
  border-radius: 8px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
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
const OptionsContainer = styled.div`
  display: flex;
`;
const Image = styled.img`
  margin-right: 2px;
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
  const { sampleRender, updateListTags, getListOfTagAddress } = props;
  const classes = useStyles();
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const mainDiv = useRef(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const allChecked = React.useRef(null);
  const [importAddress, setImportAddress] = React.useState(false);
  const [connectXDCPay, setConnectXDCPay] = React.useState(false);
  const [importValue, setImportValue] = React.useState(0);
  const timezone = useSelector((state) => state.timezone);

  const [masterChecked, setMasterChecked] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [tagError, setTagError] = useState("");
  // console.log(masterChecked, selectedList, "<<<");
  const closeDialogImport = () => {
    setImportAddress(false);
    setTagError("")
  };
  const openDialogImport = () => {
    setImportAddress(true);
  };

  // useEffect(() => {
  //   if (data.length >= 1) sampleRender(data);
  // }, [data]);
  const notify = () =>
    toast.success("Address Tags imported.", {
      duration: 4000,
      position: "top-center",
      className: "toast-div-address",
    });
  const onMasterCheck = (e) => {
    let tempList = data;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    setMasterChecked(e.target.checked);
    setData(tempList);
    setSelectedList(data.filter((e) => e.selected));
    sampleRender(data.filter((e) => e.selected));
  };

  const onItemCheck = (e, item) => {
    let tempList = data;
    tempList.map((user) => {
      if (user.address === item.address) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = data.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    setMasterChecked(totalItems === totalCheckedItems);
    setData(tempList);
    setSelectedList(data.filter((e) => e.selected));
    sampleRender(data.filter((e) => e.selected));
  };
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

    const newArrayOfObj = list.map(({
      Address: address,
      NameTag: tagName,
      AddedOn: modifiedOn
    }) => ({
      address,
      tagName, modifiedOn
    }));
    setData(newArrayOfObj);
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    let parsedData = [], result = {}, resultArray = [];
    parsedData = await parseCSVToJSON(file)
    if(!parsedData || !parsedData.length) return;
    let keys = ["address", "tagName", "modifiedOn"]
    for (let index = 1; index < parsedData.length; index++) {
      let result = {};
      for (let rindex = 0; rindex < parsedData[index].length; rindex++) {
        result[keys[rindex]] = parsedData[index][rindex]
      }
      resultArray.push(result);

    }
    setData(resultArray);
    // setColumns(columns);
    if (resultArray.length >= 1) openDialogImport();

    // const reader = new FileReader();
    // reader.onload = (evt) => {
    //   /* Parse data */
    //   const bstr = evt.target.result;
    //   const wb = XLSX.read(bstr, { type: "binary" });
    //   console.log("wb",wb);
    //   /* Get first worksheet */
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   /* Convert array of arrays */
    //   const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    //   console.log("data",data,wsname,ws);

    //   processData(data);
    // };
    // reader.readAsBinaryString(file);
  };

  const parseCSVToJSON = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: function (results) {
          resolve(results?.data || []) 

        }
      }
      )
    })
  }
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const selectAll = async () => {
    let tagLength = 0;
    data.map((item) => {
      if (item.tagName.length > 15) {
        tagLength = item.tagName.length;
      }

       item["selected"] = item.selected;
       delete item.selected;
      return item;
    });
    if (tagLength != 0) {
      setTagError(genericConstants.IMPORTED_TAG_LENGTH_ERROR)
      return
    }
    await updateListTags(data);
    await closeDialogImport();
    setSelectedList([]);
    setData([]);
    await notify();
    getListOfTagAddress()
  };

  const selectedOnly = async () => {
    let tagLength = 0;
    selectedList.map((item) => {
      if (item.tagName.length > 15) {
        tagLength = item.tagName.length;
      }
      // item["tagName"] = item.name;
      // delete item.name;
      return item;
    });
    if (tagLength != 0) {
      setTagError(genericConstants.IMPORTED_TAG_LENGTH_ERROR)
      return
    }
    await updateListTags(selectedList);
    await closeDialogImport();
    setSelectedList([]);
    setData([]);
    await notify();
    getListOfTagAddress()
  };

  const handleOpenXDCPay = () => {
    setConnectXDCPay(true);
  }
  const handleConnectWallet = () => {
    closeConnectXDCPay()
    openDialogImport()
  }
  const closeConnectXDCPay = () => {
    setConnectXDCPay(false);
  }
  const getCurrentTaggedAddresses = () => {
    const userId = sessionManager.getDataFromCookies("userId");

    let taggedAddress = localStorage.getItem(
      userId + cookiesConstants.USER_TAGGED_ADDRESS
    );
    taggedAddress = JSON.parse(taggedAddress);
    if (!taggedAddress) return [];
    return taggedAddress;
  }
  const searchMyAddress = async () => {

    let web3;
    web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
    const chainId = await web3.eth.net.getId();
    if (chainId == 50 || chainId == 51) {
      // Utils.apixFailureToast("Please login to XDCPay extension");
      await web3.eth.getAccounts().then((accounts) => {

        if (!accounts || !accounts.length) {
          Utility.apiFailureToast("Please login to XDCPay extension");
          return;
        }
        let xdc = window?.xdc;
        let contacts = xdc?.publicConfigStore?._state.addressBook
        if (!contacts || !contacts.length)
          Utility.apiFailureToast("No Address found");
        else {
          contacts = parseContacts(contacts);
          let currentlyAddedAddresses = getCurrentTaggedAddresses();
          if (currentlyAddedAddresses && currentlyAddedAddresses.length) {
            currentlyAddedAddresses = currentlyAddedAddresses.map(({ address }) => address);
            contacts = contacts.filter((contact) => {
              if (!currentlyAddedAddresses.includes(contact.address))
                return contact;
            })
          }
          if (contacts.length > 0) {
            setData(contacts)
            setImportAddress(true);
          }
          else
            Utility.apiFailureToast("No New Addresses found");

        }
        // let acc = accounts[0];
        // acc = acc.replace("0x", "xdc");
        // acc = acc.toLowerCase();
        setConnectXDCPay(false);
        // window.location.href = "/address-details/" + acc;
      });
    } else {
      return;
    }

  };
  const parseContacts = (contacts) => {
    let parsedTaggedAddresses = contacts.map(contact => {
      contact["tagName"] = contact.name;
      delete contact.name;
      return contact;
    })
    return parsedTaggedAddresses
  }



  return (
    <div>
      <div>
        <Toaster />
      </div>
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
            <OptionsContainer onClick={handleOpenXDCPay}>
              <Image src="/images/xdc.svg" />
              <OptionDiv>Import from XDCPay</OptionDiv>
            </OptionsContainer>
            <OptionsContainer onClick={handleClick}>
              <Image src="/images/csv.svg" />
              <OptionDiv>Import from CSV File</OptionDiv>
            </OptionsContainer>
          </DropdownContainer>
        )}
      </Container>

      {/* -----------------------------------------------------connect XDC Pay--------------------------------------------- */}
      {connectXDCPay && <div className="overlay-private-alert">
        <Dialog classes={{ paperWidthSm: classes.connectXdcDialogBox }}
          open={connectXDCPay}
          onClose={closeConnectXDCPay}
          aria-labelledby="form-dialog-title"
          style={{ position: "absolute", zIndex: 10000 }}
        >
          <div className={classes.importXdcHeading}>Import from XDC Pay</div>
          <div className={classes.importXdcText}>You can import the contact saved in XDCPay into you Observer Account.</div>
          <CustomLoader classes={{ root: classes.root }} />
          {/* <img className={classes.importXdcLogo} src="/images/xdc-icon-blue-color.svg"></img> */}
          <div className={classes.connectWalletButton} onClick={searchMyAddress}>Connect Wallet</div>
        </Dialog>
      </div>}
      {/* ------------------------------------------------------------------------------------------------------------------*/}
      {importAddress && <div className="overlay-private-alert">
        <Dialog
          classes={{ paperWidthSm: classes.dialogBox }}
          open={importAddress}
          onClose={closeDialogImport}
          aria-labelledby="form-dialog-title"
          style={{ position: "absolute", zIndex: 10000 }}
        >
          <Row style={{ justifyContent: "center" }}>
            <div className={classes.heading} id="form-dialog-title">
              Select Addresses to import
            </div>
          </Row>
          <DialogContent classes={{ root: classes.dialogContentTable }}>
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
              {tagError && <div className={classes.error2}>{tagError}</div>}
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
                      <TableRow >
                        <TableCell
                          style={{
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: 11,
                            padding: "2.5px 3px",
                          }}
                          align="left"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={masterChecked}
                            id="mastercheck"
                            ref={allChecked}
                            onChange={(e) => onMasterCheck(e)}
                          />
                          <span
                            className={"tablehead-token-details"}
                            style={{ opacity: 1 }}
                          >
                            Name Tag
                          </span>
                        </TableCell>
                        <TableCell style={{ border: "none" }} align="left">
                          <span
                            className={"tablehead-token-details"}
                            style={{ opacity: 1 }}
                          >
                            Address
                          </span>
                        </TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data &&
                        data.length >= 1 &&
                        data.map((row, index) => {
                          return (
                            <TableRow
                              style={
                                index % 2 !== 1
                                  ? { background: "#f9f9f9" }
                                  : { background: "white" }
                              }>
                              <TableCell
                                id="td"
                                className="w-150 bord-none"
                                style={{
                                  margin: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "10.5px 3px 8.5px",
                                }}
                              >
                                <div className="display-flex m-l-11">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={row.selected}
                                    onChange={(e) => onItemCheck(e, row)}
                                  />
                                  <span className={"tabledata p-l-0"}>
                                    {row.tagName}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell
                                className=" bord-none"
                                style={{ paddingRight: "25px" }}
                              >
                                <div className="display-flex">
                                  <span className="tabledata p-l-0">
                                    {Utility.shortenAddressImport(row?.address)}
                                  </span>
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
            <div className="display-flex justify-content-md-between">
              <button className={classes.cnlbtn} onClick={closeDialogImport}>
                Cancel
              </button>

              <div className="display-flex">
                <div>
                  <button
                    onClick={selectedOnly}
                    className={
                      selectedList.length > 0 ? classes.sibtn : classes.disabled
                    }
                  >
                    Import Selected
                  </button>
                </div>
                <div>
                  <button className={classes.sabtn} onClick={selectAll}>
                    Import All
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>}
    </div>
  );
};

export default CustomDropDownAddress;
