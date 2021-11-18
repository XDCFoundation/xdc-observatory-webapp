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
// import AccountProfile from "./accountProfile";
import { NavLink } from "react-router-dom";
// import { history } from "../../../managers/history";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AddWatchList from "../../../services/user";
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
  value: {
    width: "400px !important",
  },
  main_div: {
    // lineHeight: "-100px !important",
    // backgoundColor: "red",
    marginTop: "4px",
  },
  radio: {
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
    padding: "15px",
  },
  input: {
    width: "503px",
    height: "3px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    marginBottom: "21px",
    outline: "none",
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
    color: "white",
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
    padding: "15px 35px 20px 0px",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
    // fontWeight: "50px",
    fontfamily: "Inter",
    fontsize: "14px",
    color: "#2a2a2a",
    fontweight: "500",
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
  },
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [address, setAddress] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const [notification, setNotification] = React.useState(false);

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
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLogin = () => {
    // history.push("/loginprofile")
  };

  const watchListService = async () => {
    const request = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: address,
      description: description,
      type: value,
      isEnabled: true,
    };
    if (value === "NO") request["isEnabled"] = false;

    const [error, response] = await utility.parseResponse(
      AddWatchList.addWatchlist(request)
    );

    if (error) {
      utility.apiFailureToast("Address already exists");
      return;
    }
    utility.apiSuccessToast("Address added to watchlist");
    window.location.href = "loginprofile";
    setAddress("");
    setDescription("");
  };
  const validateAddress = () => {
  
    if (
      (address && address.length === 43) ||
      address.slice(0, 2) == "xdc"
    ) {
      watchListService();
    } else {
      utility.apiFailureToast("Address should start with xdc & 43 characters");
    }
  };

  return (
    <div>

      <div className="div1" onClick={handleClickOpen}>
        <div>
          <img
            className="imagediv1"
            src={require("../../../assets/images/watchlist.png")}
          ></img>
        </div>
        <button className={classes.btn}>
          <div className="headingdiv1">Create watchlist</div>
          <div className="paradiv1">
            An Email notification can be sent to you when an address on your
            watch list recieves an incoming transaction.
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
              Add a New Address to your Watchlist
            </DialogTitle>
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Address</b>
            </DialogContentText>
            <input
              className={classes.input}
              onChange={(e) => {setAddress(e.target.value)
                setError("")
              }}
              
            ></input>
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Description</b>
              {/* <span  className={classes.forgotpass}>
              Forgot ?
            </span> */}
            </DialogContentText>

            <input
              type="text"
              className={classes.input}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
            {/* <span>
                {passwordShown?<VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>:<VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>}
            </span> */}
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Notifications</b>
            </DialogContentText>

            <FormControl
              component="fieldset"
              style={{ backgoundColor: "red !important" }}
              className={classes.main_div}
            >
              {/* <FormLabel component="legend" className={classes.radio}>Gender</FormLabel> */}
              <RadioGroup
                className={classes.radio}
                style={{ margin: "-5px 28px -3px -10px" }}
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="NO"
                  control={<Radio style={{ color: "#2149b9" }} />}
                  style={{ margin: "5px 2px -5px -5px" }}
                  label="No Notifications"
                  onClick={(e) => setNotification(e.target.value)}
                />
                <FormControlLabel
                  value="INOUT"
                  control={<Radio style={{ color: "#2149b9" }} />}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  label="Notify on Incoming & Outgoing Txns"
                  onClick={(e) => setNotification(e.target.value)}
                />
                <FormControlLabel
                  value="IN"
                  control={<Radio style={{ color: "#2149b9" }} />}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  label="Notify on Incoming (Recieve) Txns Only"
                  onClick={(e) => setNotification(e.target.value)}
                />
                {/* <FormControlLabel value="other" control={<Radio />} label="Notify on Outgoing (Sent) Txns Only" /> */}
                <FormControlLabel
                  value="OUT"
                  control={<Radio style={{ color: "#2149b9" }} />}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  label="Notify on Outgoing (Sent) Txns Only"
                  onClick={(e) => setNotification(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <span onClick={handleClose}>
              <button className={classes.cnlbtn} onClick={handleLogin}>
                Cancel
              </button>
            </span>
            <span onClick={handleClose}>
              <button className={classes.addbtn} onClick={watchListService, validateAddress}>
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
