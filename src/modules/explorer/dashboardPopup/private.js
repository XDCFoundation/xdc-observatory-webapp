import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { history } from "../../../managers/history";
import { UserService } from "../../../services";
import utility from "../../../utility";
import { sessionManager } from "../../../managers/sessionManager";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";
import { genericConstants, cookiesConstants } from "../../../constants";
import AlertDialog from "../../common/dialog/alertDialog";

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
    "@media (min-width:0px) and (max-width:375px)": {
      width: "100% !important",
      height: "100% !important",
      borderRadius: "1px !important",
    },
    "@media (min-width:375px) and (max-width:768px)": {
      width: "100% !important",
      height: "100% !important",
      borderRadius: "1px !important",
      maxWidth: "768px !important",
    },
  },
  buttons: {
    padding: "0 20px 0px 0px",
  },
  input: {
    width: "503px",
    height: "15px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    marginBottom: "21px",
    outline: "none",
  },

  addbtn: {
    width: "94px",
    height: "34px",
    // margin: "33px 0 0 21px",
    // padding: "8px 30px 7px 32px",
    margin: "16px 8px 23px 2px",
    padding: "0 19px 0 20px",
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
    margin: "16px 8px 23px 2px",
    padding: "0 19px 0 20px",
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
    marginTop: "-20px",
  },
  error1: {
    color: "red",
    marginLeft: "2px",
  },
  error2: {
    color: "red",
    marginLeft: "24px",
    marginTop: "-14px",
  },
  heading: {
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "24px",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "18px",
    color: "#2a2a2a",
    "@media (min-width:500px) and (max-width:768px)": {
      width: "100% !important",
      flexFlow: "column nowrap ",
      display: "flex !important",
      maxWidth: "fit-content",
      margin: "0 auto",
      justifyContent: "flex-start !important",
    },
  },
  dialogBox: {
    width: "553px",
    position: "absolute",
    top: "111px",
    borderRadius: "12px",
  },
  lastContainer: {
    maxWidth: "534px",
    width: "100%",
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
  "@media (max-width: 767px)": {
    heading: {
      fontSize: "16px",
    },
    dialogBox: {
      width: "100%",
      top: "40px",
      borderRadius: "0px !important",
      marginLeft: "auto",
      marginRight: "auto",
      height: "100%",
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
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const [privateAddress, setPrivateAddress] = React.useState(false);
  const [errorEmptyField, setErrorEmptyField] = React.useState("");
  // const [nameTag, setNameTag] = React.useState(false);
  const [error, setError] = React.useState("");
  const [errorTag, setErrorTag] = React.useState("");
  // const togglePasswordVisiblity = () => {
  //   setPasswordShown(passwordShown ? false : true);
  //   // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  // };

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);
  const [addressAdded, setAddressAdded] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  async function TaggedAddress() {
    setError("");
    setErrorTag("");
    setErrorEmptyField("");
    if (!privateAddress && !input && tags.length === 0) {
      setErrorEmptyField("Please enter required fields");
      return;
    }
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: privateAddress,
      tagName: input,
      modifiedOn: Date.now(),
    };
    if (!privateAddress) {
      setError(genericConstants.ENTER_REQUIRED_FIELD);
    } else if (!input) {
      setErrorTag(genericConstants.ENTER_REQUIRED_FIELD);
    } else if (
      !(privateAddress && privateAddress.length === 43) ||
      !(privateAddress.slice(0, 3) === "xdc")
    ) {
      setError("Address should start with xdc and consist of 43 characters");
      return;
    } else {
      // const [error] = await utility.parseResponse(
      //   UserService.addPrivateTagToAddress(data)
      // );
      //
      // if (error) {
      //   utility.apiFailureToast("Address is already in use");
      //   return;
      // }
      let taggedAddress = localStorage.getItem(
        data.userId + cookiesConstants.USER_TAGGED_ADDRESS
      );
      if (taggedAddress) {
        taggedAddress = JSON.parse(taggedAddress);
        const existingTag = taggedAddress.find(
          (item) => item.address == privateAddress && item.userId == data.userId
        );
        if (existingTag) {
          setErrorTag("Address already exist in table");
          return;
        }
      } else {
        taggedAddress = [];
      }
      taggedAddress.push(data);
      localStorage.setItem(
        data.userId + cookiesConstants.USER_TAGGED_ADDRESS,
        JSON.stringify(taggedAddress)
      );
      setOpen(false);
      setAddressAdded(true);
      setOpenAlert(true);
      utility.apiSuccessToast("Tag Added");
      await props.getListOfTagAddress();
      await props.getTotalCountTagAddress();
    }
  }

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const closeAlert = () => {
    setOpenAlert(false);
  }

  const handleClose = () => {
    setOpen(false);
    setError("");
    setErrorTag("");
    setPrivateAddress("");
    setTags([]);
  };

  const [input, setInput] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [isKeyReleased, setIsKeyReleased] = React.useState(false);

  const onChange = (e) => {
    setErrorTag("");
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      if (trimmedInput.length > 15) {
        setErrorTag("Nametag cannot be longer than 15 characters");
        return;
      }
      if (tags.length >= 5) {
        setErrorTag("Maximum 5 Name tags are allowed");
        return;
      }
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
      setErrorTag("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const tooltipClose = () => {
    setTooltipIsOpen(!tooltipIsOpen);
  };

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
    <>
      <div className="w-33p">
        <div className="div1 cursor-pointer">
          <div
            onClick={
              // width >= 760
              //   ? 
                handleClickOpen
                // : () => {
                //     history.push("/test-address");
                //   }
            }
          >
            <img className="imagediv1" src={"/images/private.svg"}></img>
          </div>
          <div
            className="imageParentDiv"
            onClick={
              // width >= 760
              //   ? 
                handleClickOpen
                // : () => {
                //     history.push("/test-address");
                //   }
            }
          >
            <div className="headingdiv1">
              <div>Add private tag to an Address</div>
            </div>
            <div className="paradiv1">
              Add a short memo or private tag to the address of interest.
            </div>
          </div>

          <LearnMoreParent>
            <LightToolTip
              open={tooltipIsOpen}
              onClose={tooltipClose}
              title="Add a short memo or private tag to the address of interest."
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

        {/* <div> */}
        <Dialog
          // className={classes.dialog}
          classes={{ paperWidthSm: classes.dialogBox }}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div>
          <Row>
            <div className={classes.heading} id="form-dialog-title">
              Add a new Address Tag
            </div>
          </Row>
          {errorEmptyField ? (
            <div className={classes.error2}>{errorEmptyField}</div>
          ) : (
            <></>
          )}
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Address
            </DialogContentText>
            <input
              className={classes.input}
              onChange={(e) => {
                setPrivateAddress(e.target.value);
                setError("");
              }}
            ></input>
            {error ? <div className={classes.error}>{error}</div> : <></>}
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Name Tag
            </DialogContentText>

            <div className="containerTag">
              {/*<div className="tag">*/}
              {/*  /!*{input}*!/*/}
              {/*  /!*<button onClick={() => deleteTag(index)}>x</button>*!/*/}
              {/*</div>*/}
              <input
                value={input}
                // onKeyDown={onKeyDown}
                // onKeyUp={onKeyUp}
                onChange={onChange}
              />
            </div>
            {errorTag ? (
              <div className={classes.error1}>{errorTag}</div>
            ) : (
              <></>
            )}
            {/* <input
              type="text"
              className={classes.input}
              onChange={(e) => setNameTag(e.target.value)}
            ></input> */}
            {/* {errorTag ? <div className={classes.error}>{errorTag}</div> : <></>} */}
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
              <button className={classes.addbtn} onClick={TaggedAddress}>
                Add
              </button>
            </span>
          </DialogActions>
          <div className="p-l-15 p-r-15">
          <div className={classes.lastContainer}>
            <div className={classes.lastContainerText}>
              Privacy is very important to us. To protect sensitive information,
              all custom tags and data related to the Watchlists are saved on
              your local device. Clearing the browsing history or cookies will
              remove the watchlist data saved in your profile.
            </div>
            </div>
          </div>
          {/* <div className={classes.value}></div>
          <DialogContentText className={classes.xdc}>
              New to XDC Xplorer? <span className={classes.createaccount}> Create an account</span>
            </DialogContentText> */}
            </div>
        </Dialog>
        {/* </div> */}
        {addressAdded ? <AlertDialog openAlert={openAlert} closeAlert={closeAlert}/>:("")}
      </div>
    </>
  );
}

const LearnMoreParent = styled.div`
  position: relative;
  top: 30px;
  @media (min-width: 767px) {
    display: none;
  }
  @media (max-width: 767px) {
    position: static;
  }
`;
