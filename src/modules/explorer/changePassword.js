import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row, Column } from "simple-flexbox";
import { history } from "../../managers/history";
import CloseIcon from "@material-ui/icons/Close";
import utility from "../../utility";
import Utils from "../../utility";
import Utility from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import AuthService from "../../services/userLogin";
import Loader from "../../assets/loader";

const useStyles = makeStyles((theme) => ({
  text: {
    width: "330px",
    fontFamily: "Inter",
    fontSize: "22px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.85px",
    textAlign: "end",
    color: "#2a2a2a",
  },
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
    display: "flex",
    justifyContent: "center",
  },
  dialogBox: {
    position: "absolute",
    top: "65px",
    width: "503px",
    borderRadius: "12px",
  },
  closeContainer: {
    top: "26px",
    fontWeight: "500",
    position: "absolute",
    right: "30px",
    cursor: "pointer",
  },
  input: {
    width: "433px",
    height: "40px",
    padding: "12px 19px 11px 19px",
    borderRadius: "6px",
    border: "solid 1px #9fa9ba",
    backgroundColor: "#fff",
    outline: "none",
  },
  addbtn: {
    width: "440px",
    height: "44px",
    borderRadius: "4.4px",
    border: "solid 0.6px #00a1ed",
    backgroundColor: "#3763dd",
    // margin: "10px 0px 20px 0px",
    margin: "none",
    color: "white",
  },
  subCategory: {
    margin: "10px 5px 10px 12px",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "0.54px",
    color: "#2a2a2a",
  },
  heading: {
    alignItems: "center",
    justifyContent: "center",
    height: "445px",
  },
  error: {
    color: "red",
    marginLeft: "2px",
  },
}));

export default function ChangePassword(props) {
  const classes = useStyles();
  const [newInput, setNewInput] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [currentInput, setCurrentInput] = React.useState("");
  const [isError, setIsError] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState("");

  var regExPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;

  const handleClose = () => {
    history.push("/loginprofile");
  };

  const updatepassword = async () => {
    let userInfo = sessionManager.getDataFromCookies("userInfo");
    const reqObj = {
      email: userInfo.email,
      userId: userInfo.sub,
      oldPassword: currentInput,
      newPassword: newInput,
    };
    
    setLoading(true)
    setErrorPassword("");
    setErrorConfirmPassword("");

    if (!newInput || !confirmPassword || !currentInput) {
      setLoading(false);
      utility.apiFailureToast("Please enter required field");
    } else if (!newInput.match(regExPass)) {
      setErrorPassword(
        
        "Password must be atleast 5 character long with Uppercase, Lowercase and Number"
      );
      setLoading(false);
    } else if (newInput !== confirmPassword) {
      setErrorConfirmPassword("Password doesn't match");
      setLoading(false);
    } else {
      const authObject = new AuthService();
      let [error, authResponse] = await Utility.parseResponse(
        authObject.changePassword(reqObj)
      );
      if (error || !authResponse) {
        setLoading(false);
        utility.apiFailureToast("failed");
      } else {
        history.push("/dashboard");
        utility.apiSuccessToast("Password  changed successfully");
        sessionManager.setDataInCookies(authResponse, "userInfo");
        sessionManager.setDataInCookies(true, "isLoggedIn");
        sessionManager.setDataInCookies(authResponse?.sub, "userId");
        setLoading(false);
      }
    }
  };

  return (
    <Dialog
      // className={classes.dialog}
      classes={{ paperWidthSm: classes.dialogBox }}
      open
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent className={classes.heading}>
        <Row justifyContent="space-between" marginTop="8px">
          <DialogContentText className={classes.text}>
            <b>Change Password</b>
          </DialogContentText>
          <span
                    onClick={props.openChangePassword}
                    className={classes.closeContainer}
                  >
                    <img
                      className={classes.close}
                      src={require("../../../src/assets/images/XDC-Cross.svg")}
                    ></img>
                  </span>
        </Row>
        <Column>
          <DialogContentText className={classes.subCategory}>
            <b>Current Password</b>
            <input
              type="password"
              id="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              className={classes.input}
              onChange={(e) => {
                {
                  setCurrentInput(e.target.value);
                }
              }}
            ></input>
          </DialogContentText>
          <DialogContentText className={classes.subCategory}>
            <b>New Password</b>
            <input
              type="password"
              id="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              className={classes.input}
              onChange={(e) => {
                {
                  setNewInput(e.target.value);
                }
              }}
            ></input>
            <div className={classes.error}>{errorPassword}</div>
          </DialogContentText>
          <DialogContentText className={classes.subCategory}>
            <b>Confirm Password</b>
            <input
              type="password"
              id="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              className={classes.input}
              onChange={(e) => {
                {
                  setConfirmPassword(e.target.value);
                }
              }}
            ></input>
            <div className={classes.error}>{errorConfirmPassword}</div>
          </DialogContentText>
          {isLoading == true ? (
                        <div >
                          
                          <Loader/>
                        </div>
                   
                ):(
                  <div></div>
                )}

          <DialogActions
            style={{
            //  alignItems: "center",
             // justifyContent: "start",
              marginTop: "15px",
              marginLeft:"-5px"
            }}
          >
            <div style={{ color: "red" }}> {isError}</div>
            <button
              className={classes.addbtn}
              onClick={() => {
                updatepassword();
              }}
              type="button"
            >
              Update Password{" "}
            </button>
          </DialogActions>
          
        </Column>
      </DialogContent>
    </Dialog>
  );
}
