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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PutWatchlist from "../../services/user";
import { useEffect } from "react";
import styled from "styled-components";

const DialogBox = styled.div`
  width: 553px;
  height: 492px;
  border-radius: 10%;
  justify-content: space-between;
`;

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
    // border: "none !important",
    // color: "black",
    // textTransform: "unset",
    // backgroundColor: "#f5f8fa",
    // marginLeft: "-60px",
    // "&:hover":{backgroundColor: "#f5f8fa"}
    // marginLeft: "90px"
  },
  value: {
    width: "400px !important",
  },
  main_div: {
    lineHeight: "-100px !important",
    backgoundColor: "red",
  },
  radio: {
    // backgroundColor: "blue",
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
    width: "506px",
    height: "3px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
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

  updatebtn: {
    width: "110px",
    height: "34px",
    margin: "14px -8px 15px 2px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },
  deletebtn: {
    width: "110px",
    height: "34px",
    margin: "14px 0px 15px 20px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "Red",
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
    justifyContent: "space-between",
    padding: "10px 35px 15px 0px",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "-2px",
    // fontWeight: "50px",
    fontfamily: "Inter",
    fontsize: "14px",
    fontweight: "500",
    padding: "10px 0px 2px 0px",

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
    fontfamily: "Inter",
    fontweight: "600",
  },
}));

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [_id, setId] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  useEffect(() => {
    if (props.row.address) setAddress(props.row.address);
    setDescription(props.row.description);
  }, []);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLogin = () => {
    //   history.push("/loginprofile")
  };

  const [edit, setEdit] = React.useState();

  const watchListService = async () => {
    const request = {
      _id: props.row._id,
      address: address,
      description: description,
    };

    const response = PutWatchlist.putWatchlist(request);
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
          <DialogBox>
            <Row>
              <DialogTitle className={classes.heading} id="form-dialog-title">
                Edit Watchlist
              </DialogTitle>
            </Row>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Address</b>
              </DialogContentText>
              <input
                value={address}
                className={classes.input}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </DialogContent>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Description</b>
              </DialogContentText>

              <input
                type="text"
                value={description}
                className={classes.input}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </DialogContent>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Notifications</b>
              </DialogContentText>
              <FormControl
                component="fieldset"
                style={{ backgoundColor: "red !important" }}
                className={classes.main_div}
              >
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  className={classes.radio}
                  style={{ margin: "-5px 28px -3px -10px" }}
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio style={{ color: "#2149b9" }} />}
                    style={{ margin: "5px 2px -5px -5px" }}
                    label="No Notifications"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio style={{ color: "#2149b9" }} />}
                    style={{ margin: "-5px 26px -5px -5px" }}
                    label="Notify on Incoming & Outgoing Txns"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio style={{ color: "#2149b9" }} />}
                    style={{ margin: "-5px 26px -5px -5px" }}
                    label="Notify on Incoming (Recieve) Txns Only"
                  />
                  {/* <FormControlLabel value="other" control={<Radio />} label="Notify on Outgoing (Sent) Txns Only" /> */}
                  <FormControlLabel
                    value="disabled"
                    control={<Radio style={{ color: "#2149b9" }} />}
                    style={{ margin: "-5px 26px -5px -5px" }}
                    label="Notify on Outgoing (Sent) Txns Only"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions className={classes.buttons} onClick={handleClose}>
              <div>
                <span>
                  <button className={classes.deletebtn} onClick={handleLogin}>
                    Delete
                  </button>
                </span>
              </div>
              <div>
                <span>
                  <button className={classes.cnlbtn} onClick={handleLogin}>
                    Cancel
                  </button>
                </span>
                <span>
                  <button
                    className={classes.updatebtn}
                    onClick={watchListService}
                  >
                    Update
                  </button>
                </span>
              </div>
            </DialogActions>
          </DialogBox>
        </Dialog>
      </div>
    </div>
  );
}
