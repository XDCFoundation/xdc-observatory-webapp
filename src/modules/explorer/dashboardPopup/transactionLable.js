import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { history } from "../../../managers/history";
import { sessionManager } from "../../../managers/sessionManager";
import { UserService } from "../../../services";
import utility from "../../../utility";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";
import { cookiesConstants } from "../../../constants";
import AlertDialog from "../../common/dialog/alertDialog";

const useStyles = makeStyles((theme) => ({
  overflowNone: {
    overflow: "initial",
  },
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

    margin: "14px 8px 23px 2px",
    padding: "0 19px 0 20px",
  },
  buttons: {
    padding: "0px 20px 0px 0px",
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
  textarea: {
    width: "503px",
    height: "90px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    outline: "none",
    resize: "none",
  },
  addbtn: {
    width: "94px",
    height: "34px",
    // margin: "33px 0 0 21px",
    // padding: "8px 30px 7px 32px",
    margin: "14px 8px 23px 2px",
    padding: "0 19px 0 20px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
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
  error: {
    color: "red",
    marginLeft: "2px",
    marginTop: "-20px",
  },
  error1: {
    color: "red",
    marginLeft: "24px",
    marginTop: "-14px",
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
    textarea: {
      maxWidth: "503px",
      width: "100%",
      padding: "15px",
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
  const [TransactionsHash, setTransactionsHash] = React.useState("");
  const [error, setError] = React.useState("");
  const [privateNoteError, setPrivateNoteError] = React.useState("");
  const [errorEmptyField, setErrorEmptyField] = React.useState("");
  const [PrivateNote, setPrivateNote] = React.useState("");
  const [addressAdded, setAddressAdded] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);

  async function transactionLable() {
    setError("");
    setPrivateNoteError("");
    setErrorEmptyField("");
    if (!TransactionsHash && !PrivateNote) {
        setErrorEmptyField("Please enter required fields");
        return
    }
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      trxLable: PrivateNote,
      transactionHash: TransactionsHash,
      modifiedOn: Date.now()
    };
    if (!TransactionsHash) {
      setError("Please enter required field");
    } else if (!PrivateNote) {
      setPrivateNoteError("Please enter transaction label/note");
    } else if (
      !(TransactionsHash && TransactionsHash.length === 66) ||
      !(TransactionsHash.slice(0, 2) == "0x")
    ) {
      setError("Invalid transaction hash");
    } else if (!PrivateNote) {
      setPrivateNoteError("Please enter transaction label/note");
    } else {
      // const [error, response] = await utility.parseResponse(
      //   UserService.postUserPrivateNote(data)
      // );
      //
      // if (error || !response) {
      //   utility.apiFailureToast("Transaction private note is already in use");
      //   return;
      // }
      let transactionLabel = localStorage.getItem(
          sessionManager.getDataFromCookies("userId")+cookiesConstants.USER_TRASACTION_LABELS
      );
      if (transactionLabel) {
        transactionLabel = JSON.parse(transactionLabel);
        const existingTransactionLabel = transactionLabel.find(
          (item) =>
            item.transactionHash == TransactionsHash && item.userId == data.userId
        );
        if (existingTransactionLabel) {
          setPrivateNoteError("Transaction hash already exist in table");
          return;
        }
      } else {
        transactionLabel = [];
      }
      transactionLabel.push(data);
      localStorage.setItem(
          sessionManager.getDataFromCookies("userId")+cookiesConstants.USER_TRASACTION_LABELS,
        JSON.stringify(transactionLabel)
      );
      setOpen(false);
      setAddressAdded(true);
      setOpenAlert(true);
      utility.apiSuccessToast("Transaction Added");
      setTransactionsHash("");
      setPrivateNote("");
      await props.getListOfTxnLabel();
      await props.getTotalCountTxnLabel();
    }
  }
  const closeAlert = () => {
    setOpenAlert(false);
  }
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTransactionsHash("");
    setPrivateNote("");
    setError("");
    setPrivateNoteError("");
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
            className="imageParentDiv"
            onClick={
              // width >= 760
              //   ? 
                handleClickOpen
                // : () => {
                //   history.push("/testTrancation");
                // }
            }
          >
            <img className="imagediv1" src={"/images/transaction.svg"}></img>
          </div>
          <div
            className="imageParentDiv"
            onClick={
              // width >= 760
              //   ? 
                handleClickOpen
                // : () => {
                //   history.push("/testTrancation");
                // }
            }
          >
            <div className="headingdiv1"><div>Add transaction label</div></div>
            <div className="paradiv1">
              Add a personal note to the transacton hash to track it in future.
            </div>
          </div>

          <LearnMoreParent>
            <LightToolTip
              open={tooltipIsOpen}
              onClose={tooltipClose}
              title="Add a personal note to the transacton hash to track it in future."
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
              Add Transaction Label
            </div>
          </Row>
          {errorEmptyField ? <div className={classes.error1}>{errorEmptyField}</div> : <></>}
          <DialogContent className={classes.overflowNone}>
            <DialogContentText className={classes.subCategory}>
              Transaction Hash
            </DialogContentText>
            <input
              type="text"
              className={classes.input}
              onChange={(e) => {
                setTransactionsHash(e.target.value);
                setError("");
              }}
            ></input>
            {error ? <div className={classes.error}>{error}</div> : <></>}
          </DialogContent>
          <DialogContent className={classes.overflowNone}>
            <DialogContentText className={classes.subCategory}>
              Transaction Label/Note
              {/* <span  className={classes.forgotpass}>
              Forgot Password?
            </span> */}
            </DialogContentText>

            <textarea
              type="text"
              className={classes.textarea}
              onChange={(e) => {
                setPrivateNote(e.target.value);
                setPrivateNoteError("");
              }}
            ></textarea>
            {/* <span>
                {passwordShown?<VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>:<VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>}
             {/* <RemoveRedEyeIcon className={classes.icon} onClick={togglePasswordVisiblity}
            {...passwordShown==false?<VisibilityIcon/>:<VisibilityOff/>}

            {...passwordShown==="password"?<VisibilityIcon/>:<VisibilityOff/>}
            fontSize="small" style={{ color: "#b9b9b9" }} /> */}
            {/* </span> */}
          </DialogContent>
          {privateNoteError ? (
            <div className={classes.error1}>{privateNoteError}</div>
          ) : (
            <></>
          )}
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
              <button className={classes.addbtn} onClick={transactionLable}>
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
