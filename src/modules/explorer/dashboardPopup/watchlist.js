import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { sessionManager } from "../../../managers/sessionManager";
import Test from "./Test";
import { history } from "../../../managers/history";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import AddWatchList from "../../../services/user";
import utility from "../../../utility";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Utils from "../../../utility";
import styled from "styled-components";
import { cookiesConstants } from "../../../constants";

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
    letterSpacing: "0.46px",
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
    letterSpacing: "0.46px",
  },
})(Tooltip);

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");

  const [notification, setNotification] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  const [value, setValue] = React.useState("female");
  const [isSize, setisSize] = React.useState(false);
  const screenSize = window.innerHeight;
  if (screenSize === "626") {
    setisSize(false);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLogin = () => {
    setError("");
  };

  const watchListService = async () => {
    if (!address) {
      setError("Please enter required field");
    }
    const request = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: address,
      description: description,
      type: value,
      isEnabled: true,
    };
    if (!address) {
      setError("Please enter required field");
    } else if (
      !(address && address.length === 43) ||
      !(address.slice(0, 3) === "xdc")
    ) {
      setError("Address should start with xdc & 43 characters");
    } else if (!description) {
      setDescriptionError("Description is required");
    } else {
      if (value === "NO") request["isEnabled"] = false;
      const [error, response] = await utility.parseResponse(
        AddWatchList.addWatchlist(request)
      );

      if (error || !response) {
        utility.apiFailureToast("Address already exists");
        return;
      }
      let watchlists = localStorage.getItem(
        cookiesConstants.USER_ADDRESS_WATCHLIST
      );
      if (watchlists) {
        watchlists = JSON.parse(watchlists);
        const existingWatchList = watchlists.find(
          (item) =>
            item.address == request.address && item.userId == request.userId
        );
        if (existingWatchList) {
          utility.apiFailureToast("Address already exists");
          return;
        }
      } else {
        watchlists = [];
      }
      watchlists.push(request);
      localStorage.setItem(
        cookiesConstants.USER_ADDRESS_WATCHLIST,
        JSON.stringify(watchlists)
      );
      utility.apiSuccessToast("Address added to watchlist");
      setAddress("");
      setDescription("");
      setOpen(false);
      await props.getWatchlistList();
      await props.getTotalCountWatchlist();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      <div className="div1 cursor-pointer">
        <div
          className="imageParentDiv"
          onClick={
            width >= 760
              ? handleClickOpen
              : () => {
                  history.push("/test");
                }
          }
        >
          <img className="imagediv1" src={"/images/watchlist.svg"}></img>
        </div>

        <div
          className="imageParentDiv"
          onClick={
            width >= 760
              ? handleClickOpen
              : () => {
                  history.push("/test");
                }
          }
        >
          <div className="headingdiv1">
            <div>Create watchlist</div>
          </div>
          <div className="paradiv1">
            An Email notification can be sent to you when an address on your
            watch list recieves an incoming transaction.
          </div>
        </div>

        <LearnMoreParent>
          <LightToolTip
            open={tooltipIsOpen}
            onClose={tooltipClose}
            title="An Email notification can be sent to you when an address on your watch list recieves an incoming transaction."
            arrow
            placement="top-start"
          >
            <div
              className="learnMoreText"
              onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
            >
              Learn More
            </div>
          </LightToolTip>
        </LearnMoreParent>
      </div>

      {/* <Button
        className={classes.btn}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
          <img className="Shape2" src={"/images/Profile.png"}></img>
      </Button> */}
      {isSize === false ? (
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
                <button className={classes.cnlbtn} onClick={handleLogin}>
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
                To protect your privacy, data related to the Watchlists, is
                added on your local device. Cleaning the browsing history or
                cookies will clean the watchlist data saved in your profile.
              </div>
            </div>
            {/* <div className={classes.value}></div>
          <DialogContentText className={classes.xdc}>
              New to XDC Xplorer? <span className={classes.createaccount}> Create an account</span>
            </DialogContentText> */}
          </Dialog>
        </div>
      ) : (
        <Test />
      )}
    </div>
  );
}

const LearnMoreParent = styled.div`
  position: relative;
  top: 30px;
  @media (min-width: 767px) {
    display: none;
  }
`;
