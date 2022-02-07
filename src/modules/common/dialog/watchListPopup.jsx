import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { UserService } from "../../../services";
import { history } from "../../../managers/history";
import utility from "../../../utility";
import { sessionManager } from "../../../managers/sessionManager";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import AddWatchList from "../../../services/user";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { AlertContainer, alert } from "react-custom-alert";
import "../../../../node_modules/react-custom-alert/dist/index.css";
import { cookiesConstants } from "../../../constants";
import toast, { Toaster } from "react-hot-toast";

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
    padding: "15px 35px 0px 0px",
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
  error1: {
    color: "red",
    marginLeft: "24px",
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
  lastContainer: {
    width: "504px",
    padding: "11px 12px 10px 13px",
    borderRadius: "6px",
    backgroundColor: "#fff3f3",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "25px",
  },
  lastContainerText: {
    fontSize: "12px",
    fontFamily: "Inter !important",
    color: "#ff0202",
    lineHeight: "1.58",
  },

  "@media (max-width: 714px)": {
    heading: {
      fontSize: "16px",
    },
    dialogBox: {
      width: "362px",
      top: "95px",
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
  "@media (max-width: 900px)": {},
}));

const LightToolTip = withStyles({
  arrow: {
    "&:before": {
      backgroundColor: "white",
    },
  },
  tooltip: {
    color: "#2a2a2a",
    backgroundColor: "white",
    padding: "9px",
    fontSize: "12px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.42",
  },
})(Tooltip);

export default function FormDialog(props) {
  const { open, onClose } = props;
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [errorEmptyField, setErrorEmptyField] = React.useState("");
  const [notification, setNotification] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  const [value, setValue] = React.useState("female");
  const [isSize, setisSize] = React.useState(false);
  const alertSuccess = () => alert({ message: "success", type: "success" });
  const screenSize = window.innerHeight;
  const notify = () =>
    toast.success("You have started watching this address", {
      duration: 4000,
      position: "top-center",
      className: "toast-div-address",
    });
  if (screenSize === "626") {
    setisSize(false);
  }
  React.useEffect(() => {
    setAddress(props?.hash);
  }, [props]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const watchListService = async () => {
    setError("");
    setDescriptionError("");
    setErrorEmptyField("");
    if (!address && !description) {
      setErrorEmptyField("Please enter required fields");
      return;
    }
    const request = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: address,
      // description: description,
      type: value,
      isEnabled: true,
    };
    if (!address) {
      setError("Please enter required field");
    } else if (!description) {
      setDescriptionError("Please enter description");
    } else if (
      !(address && address.length === 43) ||
      !(address.slice(0, 3) === "xdc")
    ) {
      setError("Address should start with xdc and consist of 43 characters");
    } else {
      if (value === "NO") request["isEnabled"] = false;
      const [error, response] = await utility.parseResponse(
        AddWatchList.addWatchlist(request)
      );

      if (error || !response) {
        setDescriptionError("Address already exist in table");
        return;
      }
      let watchlists = localStorage.getItem(
        request.userId + cookiesConstants.USER_ADDRESS_WATCHLIST
      );
      watchlists = JSON.parse(watchlists);
      if (!watchlists) watchlists = {};
      watchlists[request.address] = description;
      localStorage.setItem(
        request.userId + cookiesConstants.USER_ADDRESS_WATCHLIST,
        JSON.stringify(watchlists)
      );
      utility.apiSuccessToast("Address added to watchlist");
      setAddress("");
      setDescription("");
      await onClose();
      await notify();
      props.setExistingWatchList(true);
    }
  };

  const handleClose = () => {
    onClose();
    setAddress("");
    setDescription("");
    setError("");
    setDescriptionError("");
  };

  const tooltipClose = () => {
    setTooltipIsOpen(!tooltipIsOpen);
  };

  const classes = useStyles();

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { width } = windowDimensions;

  return (
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
            Add a New Address to your Watchlist
          </div>
        </Row>
        {errorEmptyField ? (
          <div className={classes.error1}>{errorEmptyField}</div>
        ) : (
          <></>
        )}
        <DialogContent>
          <DialogContentText className={classes.subCategory}>
            Address
          </DialogContentText>
          <input
            value={address}
            className={classes.input}
            onChange={(e) => {
              setAddress(e.target.value);
              setError("");
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
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError("");
            }}
          ></input>
          {descriptionError ? (
            <div className={classes.error}>{descriptionError}</div>
          ) : (
            <></>
          )}
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
                style={{ margin: "5px 2px -5px -5px" }}
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
            <button className={classes.cnlbtn} onClick={onClose}>
              Cancel
            </button>
          </span>
          <span>
            <button className={classes.addbtn} onClick={watchListService}>
              Add
            </button>
          </span>
        </DialogActions>
        <div className={classes.lastContainer}>
          <div className={classes.lastContainerText}>
            Privacy is very important to us. To protect sensitive information,
            all custom tags and data related to the Watchlists are saved on your
            local device. Clearing the browsing history or cookies will remove
            the watchlist data saved in your profile.
          </div>
        </div>
      </Dialog>
    </div>
  );
}
