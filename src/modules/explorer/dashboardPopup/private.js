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
import { UserService } from "../../../services";
// import AccountProfile from "./accountProfile";
import { NavLink } from "react-router-dom";
import { history } from "../../../managers/history";
import utility from "../../../utility";
import { sessionManager } from "../../../managers/sessionManager";

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
    marginTop: "2px",
    width: "80% !important",
    height: "70% !important",
    borderRadius: "50px !important",
  },
  buttons: {
    padding: "1px 35px 15px 0px",
  },
  input: {
    width: "503px",
    height: "15px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    marginBottom: "2px",
    outline: "none",
  },

  addbtn: {
    width: "110px",
    height: "34px",
    // margin: "33px 0 0 21px",
    // padding: "8px 30px 7px 32px",
    margin: "0px -8px 15px 2px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },
  // addbtn: {
  //   width: "110px",
  // height: "34px",
  // margin: "33px 0 0 21px",
  // padding: "8px 30px 7px 32px",
  // borderRadius: "4px",
  // backgroundColor: "#3763dd",
  // },
  // cnlbtn: {
  //   width: "94px",
  // height: "34px",
  // margin: "33px 21px 0 87px",
  // padding: "8px 19px 7px 21px",
  // borderRadius: "4px",
  // backgroundColor: "#9fa9ba",

  // },
  cnlbtn: {
    width: "94px",
    height: "34px",
    // margin: "33px 21px 0 87px",
    // padding: "8px 19px 7px 21px",
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    color: "white",
    margin: "0px 8px 15px 2px",
    padding: "6px 19px 3px 20px",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#2a2a2a",
    fontWeight: "500 !important",
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
  error: {
    color: "red",
    marginLeft: "2px",
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
    heading:{
      fontSize: "16px",
    },
    dialogBox: {
      width: "362px",
      top: "95px"
    },
    input: {
      maxWidth: "503px",
      width: "100%",
    },
    error: {
      color: "red",
      marginLeft: "2px",
    },
  },
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const [privateAddress, setPrivateAddress] = React.useState(false);
  const [nameTag, setNameTag] = React.useState(false);
  const [error, setError] = React.useState("");
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  async function TaggedAddress() {
    setOpen(false);
    
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: privateAddress,
      tagName: nameTag,
    };
    const [error, response] = await utility.parseResponse(
      UserService.addPrivateTagToAddress(data)
    );

    if (error) {
      utility.apiFailureToast("Address is already in use");
      return;
    }
    utility.apiSuccessToast("Tag Added");
    window.location.href = "loginprofile";
  }


  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("")
  };

  const handleLogin = () => {
    
  };
  const validateAddress = () => {
    if (nameTag && nameTag.length >= 20){
      utility.apiFailureToast("Name Tag Minimum length is should be 20");
      
    }else{
      validateTagName()
    }
  }
  
  const validateTagName = () => {
  
    if ((privateAddress && privateAddress.length === 43) || privateAddress.slice(0, 2) == "xdc") {
      TaggedAddress();
      
    } else {
      setError("Address should start with xdc & 43 characters");
    }

  };
  
  
  
  
  return (
    <div>
      <div className="div3" onClick={handleClickOpen}>
        <div>
          <img
            className="imagediv3"
            src={require("../../../assets/images/private.png")}
          ></img>
        </div>
        <button className={classes.btn}>
          <div className="headingdiv3">Add private tag to an Address</div>
          <div className="paradiv3">
            Add a short memo or private tag to the address of interest.
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
            <div className={classes.heading} id="form-dialog-title">
              Add a new Address Tag
            </div>
            {/* <span onClick={handleClose} className={classes.cross}>
              {" "}
              X{" "}
            </span> */}
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Address
            </DialogContentText>
            <input
              className={classes.input}
              onChange={(e) => {setPrivateAddress(e.target.value)
              setError("")
              }}
            ></input>
            <div className={classes.error}>{error}</div>
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Name Tag
              {/* <span  className={classes.forgotpass}>
              Forgot Password?
            </span> */}
            </DialogContentText>

            <input
              type="text"
              className={classes.input}
              onChange={(e) => setNameTag(e.target.value)}
            ></input>
            {/* <span>
                {passwordShown?<VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>:<VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>}
             {/* <RemoveRedEyeIcon className={classes.icon} onClick={togglePasswordVisiblity} 
            {...passwordShown==false?<VisibilityIcon/>:<VisibilityOff/>}

            {...passwordShown==="password"?<VisibilityIcon/>:<VisibilityOff/>} 
            fontSize="small" style={{ color: "#b9b9b9" }} /> */}
            {/* </span> */}
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <span>
              <button className={classes.cnlbtn} onClick={handleClose}>
                Cancel
              </button>
            </span>
            <span>
              <button className={classes.addbtn} onClick={TaggedAddress,validateAddress}>
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
