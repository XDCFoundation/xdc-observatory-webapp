import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { history } from "../../managers/history";
import CloseIcon from "@material-ui/icons/Close";

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

  console.log(props)
  const classes = useStyles();

  const handleLogin = () => {
    history.push("/changePassword");
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
            </DialogContentText>
            <input
              type="password"
              placeholder="&bull; &bull; &bull; &bull; &bull;"
              className={classes.input}
            ></input>
            <DialogContentText className={classes.subCategory}>
              <b>New Password</b>
            </DialogContentText>
            <input
              type="password"
              placeholder="&bull; &bull; &bull; &bull; &bull;"
              className={classes.input}
            ></input>
            <DialogContentText className={classes.subCategory}>
              <b>Config Password</b>
            </DialogContentText>
            <input
              type="password"
              placeholder="&bull; &bull; &bull; &bull; &bull;"
              className={classes.input}
            ></input>
            <DialogActions
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <button
                className={classes.addbtn}
                onClick={handleLogin}
                onClick={(event) => alert("Successfully changed password ")}
              >
                Update Password{" "}
              </button>
            </DialogActions>
          </DialogContent>
        </Dialog>
  );
}
