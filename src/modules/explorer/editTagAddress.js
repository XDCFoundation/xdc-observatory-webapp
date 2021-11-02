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
import PutTagAddress from "../../services/user";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },
  btn: {},
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
  },
  buttons: {
    padding: "1px 35px 15px 0px",
  },
  input: {
    width: "400px",
    height: "15px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    outline: "none",
    padding: "20px",
  },

  addbtn: {
    width: "110px",
    height: "34px",
    margin: "14px -8px 15px 2px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },
  cnlbtn: {
    width: "94px",
    height: "34px",
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    color: "white",
    margin: "14px 8px 15px 2px",
    padding: "6px 19px 3px 20px",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "-2px",
    fontfamily: "Inter",
    fontsize: "14px",
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
    marginLeft: "10px",
    fontfamily: "Inter",
    fontweight: "600",
  },
}));

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const [privateAddress, setPrivateAddress] = React.useState(false);
  const [nameTag, setNameTag] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  useEffect(() => {
    if (props.row.address) setPrivateAddress(props.row.privateAddress);
    setNameTag(props.row.nameTag);
  });

  async function editTaggedAddress() {
    setOpen(false);
    const data = {
      _id: props.row._id,
      address: privateAddress,
      tagName: nameTag,
    };
    const response = await PutTagAddress.putTaggedAddress(data);
  }

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    // history.push("/loginprofile")
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <div color="primary" style={{ margin: "-7px 0px 0px 0px" }}>
          <a className="linkTable">
            <span className="tabledata">Edit</span>
          </a>
        </div>
      </div>

      <div>
        <Dialog
          className={classes.dialog}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle className={classes.heading} id="form-dialog-title">
              Edit Address Tag
            </DialogTitle>
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Address</b>
            </DialogContentText>
            <input
              value={privateAddress}
              className={classes.input}
              onChange={(e) => setPrivateAddress(e.target.value)}
            ></input>
          </DialogContent>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Name Tag</b>
            </DialogContentText>

            <input
              value={nameTag}
              type="password"
              type={passwordShown ? "text" : "password"}
              className={classes.input}
              onChange={(e) => setNameTag(e.target.value)}
            ></input>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <span>
              <button className={classes.cnlbtn} onClick={handleClose}>
                Cancel
              </button>
            </span>
            <span>
              <button className={classes.addbtn} onClick={editTaggedAddress}>
                Edit
              </button>
            </span>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
