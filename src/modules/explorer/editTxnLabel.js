import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { NavLink } from "react-router-dom";
// import { history } from "../../../managers/history";
// import { UserService } from "../../../services";


const useStyles = makeStyles((theme) => ({
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },
  btn: {
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
    padding: "1px 35px 15px 0px",
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
    width: "380px",
    height: "10px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
  },
  input1: {
    width: "380px",
    height: "90px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
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
    marginBottom: "-2px",
    fontfamily: "Inter",
    fontsize: "10px",
    fontweight: "200",
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
    marginLeft: "8px",
    fontfamily: "Inter",
    fontweight: "600",
  },
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [TransactionsHash, setTransactionsHash] = React.useState("");
  const [PrivateNote, setPrivateNote] = React.useState("");
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  async function edituserdata() {
    setOpen(false);
    const data = {
      userId: "12345",
      trxLable: PrivateNote,
      transactionHash: TransactionsHash,
    };
    // const response = await UserService.postUserPrivateNote(data);
  }

  console.log("hash", TransactionsHash);
  console.log("NOTE", PrivateNote);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    // history.push("/loginprofile")
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
      <Button
    color="primary"
    style={{margin: "-7px 0px 0px 0px"}}
     >
      <a className="linkTable" >
        <span className="tabledata">Edit</span>
      </a>
      </Button>
      </div>

      <div>
        <Dialog
          className={classes.dialog}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
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
              onChange={(e) => setTransactionsHash(e.target.value)}
            ></input>
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Transaction Label/Note</b>
            </DialogContentText>

            <input
              type="password"
              type={passwordShown ? "text" : "password"}
              className={classes.input1}
              onChange={(e) => setPrivateNote(e.target.value)}
            ></input>

          </DialogContent>
       
          <DialogActions className={classes.buttons}>
            <span style={{ color: "white" }}>
              <button className={classes.cnlbtn} onClick={handleClose}>
                {" "}
                Cancel
              </button>
            </span>
            <span>
              <button className={classes.addbtn} onClick={edituserdata}>
                Edit
              </button>
            </span>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
