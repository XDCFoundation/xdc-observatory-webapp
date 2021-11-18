import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { sessionManager } from "../../../managers/sessionManager";
import { UserService } from "../../../services";
import utility from "../../../utility";

const useStyles = makeStyles((theme) => ({
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },
  btn: {
    textAlign: "start",
    padding: "0px",
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
    padding: "10px 35px 20px 0px",
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
    width: "503px",
    height: "10px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    outline: "none",
    padding: "20px",
    marginBottom: "21px",
  },
  input1: {
    width: "503px",
    height: "90px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    outline: "none",
  },

  addbtn: {
    width: "110px",
    height: "34px",
    margin: "14px -8px 15px 2px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
    fontfamily: "Inter",
    fontsize: "10px",
    fontweight: "200",
    color: "#2a2a2a",
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
    marginTop: "7px",
    marginBottom: "7px",
    fontfamily: "Inter",
    fontweight: "600",
  },
  dialogBox: {
    width: "553px",
    position: "absolute",
    top: "111px",
    borderRadius: "12px",
  },
  "@media (max-width: 768px)": {
    dialogBox: {
      maxWidth: "553px",
      width: "100%",
      position: "absolute",
      top: "157px",
    },
    input: {
      maxWidth: "503px",
      width: "100%",
    },
    input1: {
      maxWidth: "503px",
      width: "100%",
    },
  },
}));

export default function FormDialog(props) {
    const {open, onClose} = props
    const [TransactionsHash, setTransactionsHash] = React.useState("");
    const [privateNote, setPrivateNote] = React.useState("");

  async function transactionLable() {
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      trxLable: privateNote,
      transactionHash: TransactionsHash,
    };
    console.log("data", data);
    const [error, response] = await utility.parseResponse(
      UserService.postUserPrivateNote(data)
    );

    if (error) {
        utility.apiFailureToast("Transaction private note not added");
        return;
      }
      utility.apiSuccessToast("Transaction Private Note Added");
      window.location.href = "loginprofile";
      setTransactionsHash("");
      setPrivateNote("");
    }

  const classes = useStyles();

  return (
      <div>
        <Dialog
          className={classes.dialog}
          classes={{ paperWidthSm: classes.dialogBox }}
          open={open}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle className={classes.heading} id="form-dialog-title">
              Add Transaction Label
            </DialogTitle>
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Transaction Hash</b>
            </DialogContentText>
            <input
              type="text"
              className={classes.input}
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
              value={privateNote}
              onChange={(e) => setPrivateNote(e.target.value)}
            ></input>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <span style={{ color: "white" }}>
              <button className={classes.cnlbtn} onClick={onClose}>
                {" "}
                Cancel
              </button>
            </span>
            <span>
              <button className={classes.addbtn} onClick={transactionLable}>
                Add
              </button>
            </span>
          </DialogActions>
        </Dialog>
      </div>
    );
}
