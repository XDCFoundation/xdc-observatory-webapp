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
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { UserService } from "../../../services";
// import AccountProfile from "./accountProfile";
import { NavLink } from "react-router-dom";
import { history } from "../../../managers/history";
const useStyles = makeStyles((theme) => ({
  add: {
    // marginLeft: "80%",
    // backgroundColor: "#f5f8fa",
    // fontFamily: "Roboto",
    // fontStyle: "normal",
    backgroundColor: "#2149b9",
    marginLeft: "90px"
  },
  btn: {
    // border: "none !important",
    // color: "black",
    // textTransform: "unset",
    // backgroundColor: "#f5f8fa",
    // marginLeft: "-60px",
    // "&:hover":{backgroundColor: "#f5f8fa"}
    // marginLeft: "90px"
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
    borderRadius: "50px !important"
  },
  buttons: {
    padding: "1px 35px 15px 0px"
      },
  input: {
    width: "400px",
    height: "15px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
  },

  addbtn: {
    width: "110px",
  height: "34px",
  // margin: "33px 0 0 21px",
  // padding: "8px 30px 7px 32px",
  margin: "14px -8px 15px 2px",
    padding: "6px 19px 3px 20px",
  borderRadius: "4px",
  backgroundColor: "#3763dd",
  color: "white"
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

  
    
    margin: "14px 8px 15px 2px",
    padding: "6px 19px 3px 20px",

  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "-2px",
    // fontWeight: "50px",
    fontfamily: "Inter",
    fontsize: "14px",
    fontweight: "500",
    border: "none !important"
  },
  forgotpass: {
      color: "#2149b9",
      marginLeft: "123px"
  },
  createaccount: {
    color: "#2149b9",
    marginLeft: "32px",
    fontfamily: "Inter",
  fontsize: "14px",
  },
  icon: {
      marginLeft: "-30px"
  },
  xdc: {
    color: "#2a2a2a",
    marginLeft: "30px",
    fontfamily: "Inter",
  fontsize: "5px",
  },
  heading: {
      marginLeft: "10px",
      fontfamily: "Inter",
      fontweight: "600"
  }
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const [privateAddress, setPrivateAddress] = React.useState(false);
  const [nameTag, setNameTag] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}

  };

  async function postTaggedAddress() {
    setOpen(false);
    const data = {
      userId: "12345",
      address: privateAddress,
      tagName: nameTag,
    };
    const response = await UserService.addPrivateTagToAddress(data);
    
  }
  console.log("address",privateAddress)
  console.log("note",nameTag)

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleLogin =() => {
      history.push("/loginprofile")
      
  }

  return (
    <div >




<div className="div3" onClick={handleClickOpen}>
                <div >
                <img className="imagediv3" src={require("../../../assets/images/private.png")}></img>
                    </div>
                    <div className="headingdiv3">
                    Add private tag to an address
                    </div>
                    <div className="paradiv3">
                     Add a short memo or private tag to the address of interest
                    </div>
                    
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
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle className={classes.heading} id="form-dialog-title">Add a new Address Tag</DialogTitle>
            {/* <span onClick={handleClose} className={classes.cross}>
              {" "}
              X{" "}
            </span> */}
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Address</b>
            </DialogContentText>
            <input className={classes.input}
            onChange={(e) => setPrivateAddress(e.target.value)}></input>
          </DialogContent>
         <DialogContent>
          <DialogContentText className={classes.subCategory}>
              <b>Name Tag</b>
              {/* <span  className={classes.forgotpass}>
              Forgot Password?
            </span> */}
            </DialogContentText>
            
            <input type="password" type={passwordShown ? "text" : "password"}  className={classes.input} onChange={(e) => setNameTag(e.target.value)}></input>
            {/* <span>
                {passwordShown?<VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>:<VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>}
             {/* <RemoveRedEyeIcon className={classes.icon} onClick={togglePasswordVisiblity} 
            {...passwordShown==false?<VisibilityIcon/>:<VisibilityOff/>}

            {...passwordShown==="password"?<VisibilityIcon/>:<VisibilityOff/>} 
            fontSize="small" style={{ color: "#b9b9b9" }} /> */}
            {/* </span> */} 
          </DialogContent>
          <DialogActions className={classes.buttons}>
          <span><button className={classes.cnlbtn} onClick={handleClose} >Cancel</button></span>
            <span><button className={classes.addbtn} onClick={postTaggedAddress} >Add</button></span>
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
