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
import { sessionManager } from "../../../managers/sessionManager";
// import Transaction from './accountProfile';
// import AccountProfile from "./accountProfile";
import { NavLink } from "react-router-dom";
// import { history } from "../../../managers/history";
import { UserService } from "../../../services";
import utility from "../../../utility";

const useStyles = makeStyles((theme) => ({
  add: {
    // marginLeft: "80%",
    // backgroundColor: "#f5f8fa",
    // fontFamily: "Roboto",
    // fontStyle: "normal",
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
    // margin: "33px 21px 0 87px",
    // padding: "8px 19px 7px 21px",
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
  // input: {
  //   width: "506px",
  // height: "38px",
  // margin: "3px 0 21px",
  // borderRadius: "8px",
  // border: "solid 1px #9fa9ba",
  // backgroundColor: "#ffffff",
  // },

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

  // input1: {
  //   width: "506px",
  // height: "113px",
  // margin: "3px 0 33px",
  // padding: "12px 96px 67px 93px",
  // borderRadius: "8px",
  // border: "solid 1px #9fa9ba",
  // backgroundColor: "#ffffff",

  // },
  addbtn: {
    width: "110px",
    height: "34px",
    // margin: "33px 0 0 21px",
    // padding: "8px 30px 7px 32px",
    margin: "14px -8px 15px 2px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
    // fontWeight: "50px",
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

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [TransactionsHash, setTransactionsHash] = React.useState("");
  const [PrivateNote, setPrivateNote] = React.useState("");
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  async function transactionLable() {
    setOpen(false);
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      trxLable: PrivateNote,
      transactionHash: TransactionsHash,
    };
    const [error, response] = await utility.parseResponse(
      UserService.postUserPrivateNote(data)
    );

    if (error) {
      
        utility.apiFailureToast("Transaction private note not added");
        return;
      }
      utility.apiSuccessToast("Transaction Added");
      window.location.href = "loginprofile";
      setTransactionsHash("");
      setPrivateNote("");
    
  }



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
  const validateTransaction = () => {
  
    if (
      (TransactionsHash && TransactionsHash.length === 66) ||
      TransactionsHash.slice(0, 1) == "0x"
    ) {
      transactionLable();
    } else {
      utility.apiFailureToast("Address should start with 0x & 66 characters");
    }
  };
  return (
    <div>
      <div className="div2" onClick={handleClickOpen}>
        <div>
          <img
            className="imagediv2"
            src={require("../../../assets/images/transaction.png")}
          ></img>
        </div>
        <button className={classes.btn}>
          <div className="headingdiv2">Add transaction label</div>
          <div className="paradiv2">
            Add a personal note to a transacton hash to track it in future.
          </div>
        </button>
      </div>

      {/* <Button
        className={classes.btn}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
          
          <img className="Shape2" src={require("../../../../src/assets/images/Profile.png")}></img>
      </Button> */}

      <div>
        <Dialog
          className={classes.dialog}
          classes={{ paperWidthSm: classes.dialogBox }}
          open={open}
          onClose={handleClose}
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
              {/* <span  className={classes.forgotpass}>
              Forgot Password?
            </span> */}
            </DialogContentText>

            <input
              type="text"
              className={classes.input1}
              onChange={(e) => setPrivateNote(e.target.value)}
            ></input>

            {/* <span>
                {passwordShown?<VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>:<VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>}
             {/* <RemoveRedEyeIcon className={classes.icon} onClick={togglePasswordVisiblity} 
            {...passwordShown==false?<VisibilityIcon/>:<VisibilityOff/>}

            {...passwordShown==="password"?<VisibilityIcon/>:<VisibilityOff/>} 
            fontSize="small" style={{ color: "#b9b9b9" }} /> */}
            {/* </span> */}
          </DialogContent>
          {/* <DialogActions>
            <button className={classes.addbtn} onClick={handleLogin} >Cancel </button>
          </DialogActions> */}
          <DialogActions className={classes.buttons}>
            <span style={{ color: "white" }}>
              <button className={classes.cnlbtn} onClick={handleClose}>
                {" "}
                Cancel
              </button>
            </span>
            <span>
              <button className={classes.addbtn} onClick={transactionLable,validateTransaction}>
                Add
              </button>
            </span>
          </DialogActions>
          {/* <div className={classes.value}></div>
          <DialogContentText className={classes.xdc}>
              New to XDC Xplorer? <span className={classes.createaccount}> Create an account</span> 
            </DialogContentText> */}
        </Dialog>
      </div>
    </div>
  );
}
