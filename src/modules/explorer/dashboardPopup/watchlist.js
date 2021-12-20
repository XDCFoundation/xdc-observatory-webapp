import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {makeStyles} from "@material-ui/styles";
import {Row, typeOf} from "simple-flexbox";
import {sessionManager} from "../../../managers/sessionManager";
import Test from './Test'
import { history } from "../../../managers/history";
import { Redirect } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
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
    // backgroundColor: "#979797",
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
    marginBottom: "20px",
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
  error: {
    color: "red",
    marginLeft: "2px",
    marginTop: "-20px",
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
  notifyLabel: {
    fontSize: "14px",
    color: "#2a2a2a",
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
    
  },
  "@media (max-width: 900px)": {
   
  },
}));


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");

  const [notification, setNotification] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };
 
  const [value, setValue] = React.useState("female");
  const [isSize, setisSize] = React.useState(false)
const screenSize = window.innerHeight 
  if (screenSize=== "626") {
    setisSize(false);
 }


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLogin = () => {
    setError("");

  };




  const watchListService = async () => {
    const request = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: address,
      description: description,
      type: value,
      isEnabled: true,
    };
    if(!(address && address.length === 43) || !(address.slice(0,3) === "xdc")) {
      setError("Address should start with xdc & 43 characters");
    } else if(!description){
      setDescriptionError("Description is required")
    } else{
    if (value === "NO") request["isEnabled"] = false;
    const [error, response] = await utility.parseResponse(
      AddWatchList.addWatchlist(request)
    );

    if (error || !response) {
      utility.apiFailureToast("Address already exists");
      return;
    }
    utility.apiSuccessToast("Address added to watchlist");
    setAddress("");
    setDescription("");
    setOpen(false);
  };
}

  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAddress("");
    setDescription("");
    setError("");
    setDescriptionError("")
  };
  const classes = useStyles();

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { width } = windowDimensions
  return (
    <div>

      <div style={{marginLeft:"10px"}} className="div1" onClick={width >= 760 ? handleClickOpen:()=>{history.push("/test")}}>
        <div>
          <img
            className="imagediv1"
            src={"/images/createWatchlist.svg"}
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
          <img className="Shape2" src={"/images/Profile.png"}></img>
      </Button> */}
    {isSize===false
        ?(
      <div className={classes.createWatchlist}>
        <Dialog
          className={classes.dialog}
          classes={{ paperWidthSm: classes.dialogBox }}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <div className={classes.heading} id="form-dialog-title">
              Add a New Address to your Watchlist
            </div>
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Address
            </DialogContentText>
            <input
              className={classes.input}
              onChange={(e) => {setAddress(e.target.value)
                setError("")
              }}
              
            ></input>
            {error ? <div className={classes.error}>{error}</div> : <></>}
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Description
              {/* <span  className={classes.forgotpass}>
              Forgot ?
            </span> */}
            </DialogContentText>

            <input
              type="text"
              className={classes.input}
              onChange={(e) => {setDescription(e.target.value)
              setDescriptionError("")
            }}
            ></input>
            {descriptionError ? <div className={classes.error}>{descriptionError}</div> : <></>}
            {/* <span>
                {passwordShown?<VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>:<VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>}
            </span> */}
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Notifications
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
                  className="radio-inside-dot"
                  value="NO"
                  control={<Radio style={{ color: "#979797" }} />}
                  style={{ margin: "5px 2px -5px -5px",}}
                  classes={{ label: classes.notifyLabel }}
                  label="No Notifications"
                  onClick={(e) => setNotification(e.target.value)}
                />
                <FormControlLabel
                  className="radio-inside-dot"
                  value="INOUT"
                  control={<Radio style={{ color: "#979797" }} />}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  classes={{ label: classes.notifyLabel }}
                  label="Notify on Incoming & Outgoing Txns"
                  onClick={(e) => setNotification(e.target.value)}
                />
                <FormControlLabel
                  className="radio-inside-dot"
                  value="IN"
                  control={<Radio style={{ color: "#979797" }} />}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  classes={{ label: classes.notifyLabel }}
                  label="Notify on Incoming (Recieve) Txns Only"
                  onClick={(e) => setNotification(e.target.value)}
                />
                {/* <FormControlLabel value="other" control={<Radio />} label="Notify on Outgoing (Sent) Txns Only" /> */}
                <FormControlLabel
                  className="radio-inside-dot"
                  value="OUT"
                  control={<Radio style={{ color: "#979797" }} />}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  classes={{ label: classes.notifyLabel }}
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
            <span >
              <button className={classes.addbtn} onClick={watchListService}>
                Add
              </button>
            </span>
          </DialogActions>
          {/* <div className={classes.value}></div>
          <DialogContentText className={classes.xdc}>
              New to XDC Xplorer? <span className={classes.createaccount}> Create an account</span> 
            </DialogContentText> */}
        </Dialog>
      </div>)
        : <Test />
      }
    </div>
  );
}
