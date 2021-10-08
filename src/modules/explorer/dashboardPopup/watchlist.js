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
// import AccountProfile from "./accountProfile";
import { NavLink } from "react-router-dom";
// import { history } from "../../managers/history";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
  main_div: {
    // lineHeight: "-100px !important",
    // backgoundColor: "red",
    marginTop: "4px",
},
  radio :{
    // backgroundColor: "blue",
  },
  cross: {
    marginTop: "25px",
    marginLeft: "40px",
    fontWeight: "500",
  },
  dialog: {
    marginLeft: "10%",
    marginTop: "-30px",
    width: "80% !important",
    height: "90% !important",
    borderRadius: "50px !important",
    padding: "15px"
  },
  input: {
    width: "503px",
    height: "3px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    marginBottom: "21px",
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
    padding: "15px 35px 20px 0px"
      },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
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
      marginTop: "7px",
      marginBottom: "7px",
      fontfamily: "Inter",
      fontweight: "600"
  },
  dialogBox: {
    width: "553px",
    position: "absolute",
    top: "111px",
    borderRadius: "12px",
  },
  "@media (max-width: 768px)":{
    dialogBox: {
      maxWidth: "553px",
      width: "100%",
      position: "absolute",
      top: "157px",
      
    },
    input: {
      maxWidth: "503px",
      width: "100%",
    }
  }
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}

  };

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLogin =() => {
    //   history.push("/loginprofile")
      
  }

  return (
    <div >


{/* <div className="div2" onClick={handleClickOpen}>
                <div >
                <img className="imagediv2" src={require("../../../assets/images/transaction.png")}></img>
                    </div>
                    <div className="headingdiv2">
                    Add Transaction label
                    </div>
                    <div className="paradiv2">
                     Add a personal note to transacton hash to track it in future
                    </div>
                    
                </div> */}






                <div className="div1" onClick={handleClickOpen}>
                    
                    <div >
                    <img className="imagediv1" src={require("../../../assets/images/watchlist.png")}></img>
                    </div>
                    <div className="headingdiv1">
                     Create Watchlist
                    </div>
                    <div className="paradiv1">
                     An Email notification can be sent to you when an address on your watch list recieves an incoming notifications
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
          classes={{paperWidthSm:classes.dialogBox}}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle className={classes.heading} id="form-dialog-title">Add a new address to your watchlist</DialogTitle>
            
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Address</b>
            </DialogContentText>
            <input className={classes.input}></input>
          </DialogContent>
         <DialogContent>
          <DialogContentText className={classes.subCategory}>
              <b>Description</b>
              {/* <span  className={classes.forgotpass}>
              Forgot Password?
            </span> */}
            </DialogContentText>
            
            <input type="password" type={passwordShown ? "text" : "password"}  className={classes.input}></input>
            {/* <span>
                {passwordShown?<VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>:<VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>}
            </span> */}
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Notifications</b>
            </DialogContentText>
            {/* <input className={classes.input}></input> */}
{/* 
            import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'; */}

{/* export default function RadioButtonsGroup() { */}
{/* //   const [value, setValue] = React.useState('female');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   }; */}

  
    <FormControl component="fieldset"  style={{backgoundColor:"red !important"}} className={classes.main_div}>
      {/* <FormLabel component="legend" className={classes.radio}>Gender</FormLabel> */}
      <RadioGroup aria-label="gender" name="gender1"  className={classes.radio} style={{margin:"-5px 28px -3px -10px"}} value={value} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio style={{color:"#2149b9"}}/>} style={{margin:"5px 2px -5px -5px"}} label="No Notifications" />
        <FormControlLabel value="male" control={<Radio style={{color:"#2149b9"}}/>} style={{margin:"-5px 26px -5px -5px"}}label="Notify on Incoming & Outgoing Txns" />
        <FormControlLabel value="other" control={<Radio style={{color:"#2149b9"}}/>} style={{margin:"-5px 26px -5px -5px"}}label="Notify on Incoming (Recieve) Txns Only" />
        {/* <FormControlLabel value="other" control={<Radio />} label="Notify on Outgoing (Sent) Txns Only" /> */}
        <FormControlLabel value="disabled" control={<Radio style={{color:"#2149b9"}}/>} style={{margin:"-5px 26px -5px -5px"}}label="Notify on Outgoing (Sent) Txns Only" />
      </RadioGroup>
    </FormControl>





          </DialogContent>
          <DialogActions className={classes.buttons}>
          <span><button className={classes.cnlbtn} onClick={handleClose} >Cancel</button></span>
            <span><button className={classes.addbtn}>Add</button></span>
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
