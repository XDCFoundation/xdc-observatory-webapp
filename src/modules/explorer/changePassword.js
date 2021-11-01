import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { history } from "../../managers/history";
import CloseIcon from "@material-ui/icons/Close";
import utility from "../../utility";
import Utils from "../../utility";
import Utility from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import AuthService from "../../services/userLogin";

const useStyles = makeStyles((theme) => ({
  text: {
    width: "406px",
    fontFamily: "Inter",
    fontSize: "22px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.85px",
    textAlign: "center",
    color: "#2a2a2a",
  },
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
    display: "flex",
    justifyContent: "center",
  },
  dialog: {
    marginLeft: "25%",
    marginTop: "20px",
    width: "603px",
    alignItems: "center",
    justifyContent: "center",
    height: "545px",
    borderRadius: "50px !important",
  },
  input: {
    width: "433px",
    height: "40px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
  },
  addbtn: {
    width: "432px",
    height: "44px",
    borderRadius: "4.4px",
    border: "solid 0.6px #00a1ed",
    backgroundColor: "#3763dd",
    margin: "10px 0px 20px 0px",
    color: "white",
  },
  subCategory: {
    marginTop: "5px",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.54px",
    color: "#2a2a2a",
  },
  heading: {
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ChangePassword(props) {
  const classes = useStyles();
  const [newInput, setNewInput] = React.useState("");
  const [proposal, setProposal] = React.useState("");
  const [currentInput, setCurrentInput] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isError, setIsError] = React.useState("");

  const handleLogin = () => {
    history.push("/changePassword");
  };

  const updatepassword = async () => {
    let userInfo = sessionManager.getDataFromLocalStorage("userInfo");
    userInfo = JSON.parse(userInfo);
    console.log(userInfo, "localdata");
    const reqObj = {
      email: userInfo.email,
      userId: userInfo.sub,
      oldPassword: currentInput,
      newPassword: newInput,
    };

    const authObject = new AuthService();
    let [error, authResponse] = await Utility.parseResponse(
      authObject.changePassword(reqObj)
    );
    if (error || !authResponse) {
      utility.apiFailureToast("failed");
    }
    
   
    else {
      history.push("/dashboard");
      utility.apiSuccessToast("password changed successfully");
      let pass = sessionManager.setDataInLocalStorage("requestBody");
      sessionManager.setDataInLocalStorage("requestBody", reqObj);
      sessionManager.setDataInLocalStorage("userInfo", authResponse);

    }

    
  };

  return (
    <Dialog
      className={classes.dialog}
      open
      onClose={() => props.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent className={classes.heading}>
        <Row>
          <DialogContentText className={classes.text}>
            <b>Change Password</b>
          </DialogContentText>
          <CloseIcon onClick={props.openChangePassword} />
        </Row>
        <DialogContentText className={classes.subCategory}>
          <b>Current Password</b>
          <input
            type="password"
            placeholder="&bull; &bull; &bull; &bull; &bull;"
            className={classes.input}
            required="true"
            placeholder="Enter Password"
            value={currentInput}
            onChange={(e) => {
              {
                setCurrentInput(e.target.value);
                setIsError("");
              }
            }}
          ></input>
        </DialogContentText>
        <DialogContentText className={classes.subCategory}>
          <b>New Password</b>
          <input
            type="password"
            placeholder="&bull; &bull; &bull; &bull; &bull;"
            className={classes.input}
            required="true"
            value={newInput}
            onChange={(e) => {
              {
                setNewInput(e.target.value);
                setIsError("");
              }
            }}
          ></input>
        </DialogContentText>
        <DialogContentText className={classes.subCategory}>
          <b>Config Password</b>
          <input
            type="password"
            placeholder="&bull; &bull; &bull; &bull; &bull;"
            className={classes.input}
            value={proposal}
            required="true"
            onChange={(e) => {
              {
                setProposal(e.target.value);
                setIsError("");
              }
            }}
          ></input>
        </DialogContentText>
        <DialogActions
          style={{ alignItems: "center", justifyContent: "center" }}
        >
        <div style={{ marginLeft: "17px", color: "red" }}> {isError}</div>
          <button
            className={classes.addbtn}
            onClick={handleLogin}
            onClick={(event) => alert("Successfully changed password ")}
            onClick={() => {
              setNewInput("");
              setCurrentInput("");
              setProposal("");
              // checkValidationPassword();
              updatepassword();
            }}
            disabled={!newInput || !proposal || !currentInput}
            type="button"
          >
            Update Password{" "}
          </button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
