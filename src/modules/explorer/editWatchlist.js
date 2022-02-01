import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PutWatchlist from "../../services/user";
import utility, { dispatchAction } from "../../utility";
import { WatchListService } from "../../services";
import {cookiesConstants, eventConstants, genericConstants} from "../../constants";
import { connect } from "react-redux";
import {sessionManager} from "../../managers/sessionManager";

const useStyles = makeStyles((theme) => ({
  add: {
    // marginLeft: "80%",
    // backgroundColor: "#f5f8fa",
    // fontFamily: "Roboto",
    // fontStyle: "normal",
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },
  dialogBox: {
    width: "553px",
    position: "absolute",
    top: "111px",
    borderRadius: "12px",
  },
  btn: {
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
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
    marginBottom: "21px",
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
    marginBottom: "2px",
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
    notifyLabel: {
      fontSize: "13px",
      width: "250px",
    },
    flexButton: {
      display: "flex",
    },
  },
}));

function EditWatchList(props) {
  const [open, setOpen] = React.useState(false);

  const [_id, setId] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  useEffect(() => {
    if (props.row.address) setAddress(props.row.address);
    setDescription(props.row.description);
    setId(props.row._id);
  }, [props]);

  const classes = useStyles();

  const handleClickOpen = () => {
    window.scrollTo(0, 0);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(props.row?.notification?.type);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLogin = () => {
    //   history.push("/loginprofile")
    setOpen(false);
  };

  const [edit, setEdit] = React.useState();
  const validateAddress = () => {
    if ((address && address.length === 43) || address.slice(0, 2) == "xdc") {
      return true;
      // watchListService();
    } else {
      setError("Please add address that is having 43 characters and initiates with xdc");
      return false;
    }
  };

  const watchListService = async () => {
    const request = {
      _id: props.row._id,
      address: address,
      // description: description,
      notification: {
        type: value,
        isEnabled: value === "NO" ? false : true
      }
    };
    if (validateAddress()) {
      // validateAddress();
      const [error, response] = await utility.parseResponse(
        PutWatchlist.putWatchlist(request)
      );
      if (error || !response) {
        utility.apiFailureToast("Error");
      } else {
        let watchlists = localStorage.getItem(
            sessionManager.getDataFromCookies("userId") + cookiesConstants.USER_ADDRESS_WATCHLIST
        );
        watchlists = JSON.parse(watchlists);
        if (!watchlists)
          watchlists = {}
        watchlists[request.address] = description;
        localStorage.setItem(
            sessionManager.getDataFromCookies("userId") + cookiesConstants.USER_ADDRESS_WATCHLIST,
            JSON.stringify(watchlists)
        );
        utility.apiSuccessToast("Address Updated");
        handleClose();
        await props.getWatchlistList();
        await props.getTotalCountWatchlist();
      }
    }
  };

  // const watchListService = async () => {
  //   const request = {
  //     _id: props.row._id,
  //     address: address,
  //     description: description,
  //   };
  //   validateAddress();
  //   const response = PutWatchlist.putWatchlist(request);
  //   utility.apiSuccessToast("Changes updated successfully")
  //   window.location.reload();
  // };
  const handleDelete = async (watchlist) => {
    if (props?.row?._id) {
      props.dispatchAction(eventConstants.SHOW_LOADER, true);
      const [error, response] = await utility.parseResponse(
        WatchListService.deleteWatchlist({ _id: props.row._id }, props.row)
      );
      props.dispatchAction(eventConstants.HIDE_LOADER, true);
      if (error || !response) {
        utility.apiFailureToast(
          error?.message || genericConstants.CANNOT_DELETE_WATCHLIST
        );
        return;
      }
      await utility.apiSuccessToast(genericConstants.WATCHLIST_DELETED);
      await handleClose();
      await props.getWatchlistList();
      await props.getTotalCountWatchlist();
    }
  };
  return (
    <div>
      <div onClick={handleClickOpen}>
        <button className={classes.btn}>
          <a className="linkTable1">
            <span className="tabledata1">Edit</span>
          </a>
        </button>
      </div>

      <div>
        <Dialog
          classes={{ paperWidthSm: classes.dialogBox }}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div>
          <Row>
            <div className={classes.heading} id="form-dialog-title">
              Edit Watchlist
            </div>
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Address
            </DialogContentText>
            <input
              value={address}
              readOnly
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
              Notifications
            </DialogContentText>
            <FormControl
              component="fieldset"
              style={{ backgoundColor: "red !important" }}
              className={classes.main_div}
            >
              <RadioGroup
                aria-label="gender"
                name="type"
                className={classes.radio}
                style={{ margin: "-5px 28px -3px -10px" }}
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  className="radio-inside-dot"
                  value="NO"
                  control={<Radio style={{ color: "#979797" }} />}
                  classes={{ label: classes.notifyLabel }}
                  style={{ margin: "5px 2px -5px -5px" }}
                  label="No Notifications"
                />
                <FormControlLabel
                  className="radio-inside-dot"
                  value="INOUT"
                  control={<Radio style={{ color: "#979797" }} />}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  classes={{ label: classes.notifyLabel }}
                  label="Notify on Incoming & Outgoing Transactions"
                />
                <FormControlLabel
                  className="radio-inside-dot"
                  value="IN"
                  control={<Radio style={{ color: "#979797" }} />}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  classes={{ label: classes.notifyLabel }}
                  label="Notify on Incoming (Recieve) Transactions Only"
                />
                {/* <FormControlLabel value="other" control={<Radio />} label="Notify on Outgoing (Sent) Transactions Only" /> */}
                <FormControlLabel
                  className="radio-inside-dot"
                  value="OUT"
                  control={<Radio style={{ color: "#979797" }} />}
                  classes={{ label: classes.notifyLabel }}
                  style={{ margin: "-5px 26px -5px -5px" }}
                  label="Notify on Outgoing (Sent) Transactions Only"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <div>
              <span>
                <button className={classes.deletebtn} onClick={handleDelete}>
                  Delete
                </button>
              </span>
            </div>
            <div className={classes.flexButton}>
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
          </div>
        </Dialog>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(EditWatchList);
