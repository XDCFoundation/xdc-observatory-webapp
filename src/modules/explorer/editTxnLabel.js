import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { UserService } from "../../services";
import utility from "../../utility";
import { useEffect } from "react";
import styled from "styled-components";

const DialogBox = styled.div`
  width: 553px;
  height: 394px;
  border-radius: 10%;
  justify-content: space-between;
`;

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
  cnlbtn: {
    width: "94px",
    height: "34px",
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    color: "white",

    margin: "14px 8px 15px 2px",
    padding: "6px 19px 3px 20px",
  },
  buttons: {
    justifyContent: "space-between",
    padding: "10px 35px 15px 0px",
  },
  value: {
    width: "400px !important",
  },
  cross: {
    marginTop: "25px",
    marginLeft: "40px",
    fontWeight: "500",
  },
  dialog: {
    marginLeft: "10%",
    marginTop: "6px",
    width: "80% !important",
    height: "67% !important",
    borderRadius: "50px !important",
  },
  input: {
    width: "506px",
    height: "10px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    outline: "none",
  },
  input1: {
    width: "506px",
    height: "113px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    outline: "none",
  },

  updatebtn: {
    width: "110px",
    height: "34px",
    margin: "14px -8px 15px 2px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },

  deletebtn: {
    width: "110px",
    height: "34px",
    margin: "14px 0px 15px 20px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "Red",
    color: "white",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "-2px",
    fontfamily: "Inter",
    fontsize: "10px",
    fontweight: "200",
    border: "none !important",
    padding: "10px 0px 2px 0px",
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
    marginLeft: "8px",
    fontfamily: "Inter",
    fontweight: "600",
  },
}));

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [TransactionsHash, setTransactionsHash] = React.useState("");
  const [PrivateNote, setPrivateNote] = React.useState("");
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  useEffect(() => {
    if (props.row.transactionHash)
      setTransactionsHash(props.row.transactionHash);
    setPrivateNote(props.row.trxLable);
  }, []);

  async function editTransactionLable() {
    setOpen(false);
    const data = {
      _id: props.row._id,
      trxLable: PrivateNote,
      transactionHash: TransactionsHash,
    };
    const [error, response] = await utility.parseResponse(
      UserService.editUserPrivateNote(data)
    );
    if (error) {
      utility.apiSuccessToast("Error");
      return;
    }
    utility.apiSuccessToast("Transaction Edited");
  }
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTransactionsHash(props.row.transactionHash);
    setOpen(false);
  };
  const validateTransaction = () => {
  
    if (
      (TransactionsHash && TransactionsHash.length === 66) ||
      TransactionsHash.slice(0, 1) == "0x"
    ) {
      editTransactionLable();
    } else {
      utility.apiFailureToast("Address should start with 0x & 66 characters");
    }
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <button className={classes.btn}>
          <a className="linkTable">
            <span className="tabledata">Edit</span>
          </a>
        </button>
      </div>

      <div>
        <Dialog
          className={classes.dialog}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogBox>
            <Row>
              <DialogTitle className={classes.heading} id="form-dialog-title">
                Edit Transaction label
              </DialogTitle>
            </Row>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Transaction Hash</b>
              </DialogContentText>
              <input
                type="text"
                className={classes.input}
                value={TransactionsHash}
                onChange={(e) => setTransactionsHash(e.target.value)}
              ></input>
            </DialogContent>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Transaction Label/Note</b>
              </DialogContentText>

              <input
                type="text"
                className={classes.input1}
                value={PrivateNote}
                onChange={(e) => setPrivateNote(e.target.value)}
              ></input>
            </DialogContent>

            <DialogActions className={classes.buttons}>
              <div>
                <span>
                  <button className={classes.deletebtn}>Delete</button>
                </span>
              </div>
              <div>
                <span style={{ color: "white" }}>
                  <button className={classes.cnlbtn} onClick={handleClose}>
                    Cancel
                  </button>
                </span>
                <span>
                  <button
                    className={classes.updatebtn}
                    onClick={editTransactionLable,validateTransaction}
                  >
                    Update
                  </button>
                </span>
              </div>
            </DialogActions>
          </DialogBox>
        </Dialog>
      </div>
    </div>
  );
}
