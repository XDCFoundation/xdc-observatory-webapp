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
  textarea: {
    width: "503px",
    height: "90px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    outline: "none",
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
    letterSpacing: "0.46px",
  },
})(Tooltip);

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [TransactionsHash, setTransactionsHash] = React.useState("");
  const [error, setError] = React.useState("");
  const [privateNoteError, setPrivateNoteError] = React.useState("");
  const [PrivateNote, setPrivateNote] = React.useState("");
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);

  async function transactionLable() {
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      trxLable: PrivateNote,
      transactionHash: TransactionsHash,
    };
    if (
      !(TransactionsHash && TransactionsHash.length === 66) ||
      !(TransactionsHash.slice(0, 2) == "0x")
    ) {
      setError("Address should start with 0x & 66 characters");
    } else if (!PrivateNote) {
      setPrivateNoteError("Private Note is required");
    } else {
      // const [error, response] = await utility.parseResponse(
      //   UserService.postUserPrivateNote(data)
      // );

      // if (error || !response) {
      //   utility.apiFailureToast("Transaction private note is already in use");
      //   return;
      // }
      let transactionLabel = localStorage.getItem(
        cookiesConstants.USER_TRASACTION_LABELS
      );
      if (transactionLabel) {
        transactionLabel = JSON.parse(transactionLabel);
        const existingTransactionLabel = transactionLabel.find(
          (item) =>
            item.address == TransactionsHash && item.userId == data.userId
        );
        if (existingTransactionLabel) {
          utility.apiFailureToast("Transaction private note is already in use");
          return;
        }
      } else {
        transactionLabel = [];
      }
      transactionLabel.push(data);
      localStorage.setItem(
        cookiesConstants.USER_TRASACTION_LABELS,
        JSON.stringify(transactionLabel)
      );
      utility.apiSuccessToast("Transaction Added");
      window.location.reload();
      setTransactionsHash("");
      setPrivateNote("");
      setOpen(false);
    }
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
  // console.log({ width } = windowDimensions)
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
                  history.push("/testTrancation");
                }
          }
        >
          <img className="imagediv1" src={"/images/transaction.svg"}></img>
        </div>
        <div
          className="imageParentDiv"
          onClick={
            width >= 760
              ? handleClickOpen
              : () => {
                  history.push("/testTrancation");
                }
          }
        >
          <div className="headingdiv1">Add transaction label</div>
          <div className="paradiv1">
            Add a personal note to a transacton hash to track it in future.
          </div>
        </div>

        <LearnMoreParent>
          <LightToolTip
            open={tooltipIsOpen}
            title="Add a personal note to a transacton hash to track it in future."
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
              Add Transaction Label
            </div>
          </Row>
          <DialogContent>
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
          <DialogContent>
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
          {/* <div className={classes.value}></div>
          <DialogContentText className={classes.xdc}>
              New to XDC Xplorer? <span className={classes.createaccount}> Create an account</span>
            </DialogContentText> */}
        </Dialog>
      </div>
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
