import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { sessionManager } from "../../../managers/sessionManager";
import { UserService } from "../../../services";
import utility from "../../../utility";
import { cookiesConstants } from "../../../constants";

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
  textarea: {
    width: "503px",
    height: "90px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    outline: "none",
    resize: "none"
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
  dialogBox: {
    width: "553px",
    position: "absolute",
    top: "111px",
    borderRadius: "12px",
  },
  "@media (max-width: 714px)": {
    heading: {
      fontSize: "16px"
    },
    dialogBox: {
      width: "362px",
      top: "95px"
    },
    input: {
      maxWidth: "503px",
      width: "100%",
    },
    notifyLabel: {
      fontSize: "13px",
      width: "250px",
    },
    textarea: {
      maxWidth: "503px",
      width: "100%",
      padding: "15px",
    },
  },
}));

export default function FormDialog(props) {
  const { open, onClose } = props
  const [transactionsHash, setTransactionsHash] = React.useState("");
  const [privateNote, setPrivateNote] = React.useState("");

  React.useEffect(() => {
    setTransactionsHash(props.hash)
    setPrivateNote(props.pvtNote)
  }, [props])
  async function transactionLable() {
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      trxLable: privateNote,
      transactionHash: transactionsHash,
    };

    let transactionLabel = localStorage.getItem(
        data.userId+cookiesConstants.USER_TRASACTION_LABELS
    );
    if (transactionLabel) {
      transactionLabel = JSON.parse(transactionLabel);
      let existingIndex = null;
      const existingTransactionLabel = transactionLabel.find(
        (item, index) =>
        {if(item.transactionHash == transactionsHash && item.userId == data.userId){
          existingIndex = index;
          return item;
        }}
      );
      if (existingTransactionLabel) {
        transactionLabel[existingIndex] = data;
        // utility.apiFailureToast("Transaction private note is already in use");
        // return;
      }else
        transactionLabel.push(data);
    } else {
      transactionLabel = [];
      transactionLabel.push(data);
    }
    // transactionLabel.push(data);
    localStorage.setItem(
        data.userId+cookiesConstants.USER_TRASACTION_LABELS,
      JSON.stringify(transactionLabel)
    );
    utility.apiSuccessToast("Transaction Added");
    onClose();
    await props.getListOfTxnLabel();
    await props.getTotalCountTxnLabel();
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
          <div className={classes.heading} id="form-dialog-title">
            Add Transaction Label
          </div>
        </Row>
        <DialogContent>
          <DialogContentText className={classes.subCategory}>
            Transaction Hash
          </DialogContentText>
          <input
            type="text"
            value={transactionsHash}
            className={classes.input}
            onChange={(e) => setTransactionsHash(e.target.value)}
          ></input>
        </DialogContent>
        <DialogContent>
          <DialogContentText className={classes.subCategory}>
            Transaction Label/Note
          </DialogContentText>
          <textarea
            type="text"
            className={classes.textarea}
            value={privateNote}
            onChange={(e) => setPrivateNote(e.target.value)}
          ></textarea>
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
