import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from 'react';
import { sessionManager } from "../../../managers/sessionManager";


const useStyles = makeStyles((theme) => ({
  dialogBox: {
    top: "79px",
    width: "503px",
    padding: "0 11px",
    position: "absolute",
    borderRadius: "12px",
  },
  globalTextContainer: {
    width: "433px",
    borderRadius: "6px",
    backgroundColor: "#fff3f3",
    margin: "30px auto 20px auto",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  dialogButton: {
    flexDirection: "column",
  },
  doNotShow: {
    marginBottom: "20px",
    marginTop: "-10px",
  },
  addbtn: {
    color: "white",
    width: "434px",
    border: "solid 0.6px #00a1ed",
    height: "44px",
    margin: "10px",
    borderRadius: "4.4px",
    backgroundColor: "#3763dd",
  },

  "@media (max-width: 767px)": {
    dialogBox: {
      top: "30px",
      width: "100%",
      height: "100%",
      opacity: "0px",
      padding: "0px 15px",
      position: "absolute",
      maxWidth: "767px",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "0px",
    },
    globalTextContainer: {
        padding: "10px",
        width: "100%",
      },
    dialogButton: {
      padding: "0",
      justifyContent: "center",
      flexDirection: "column",
    },
    
    addbtn: {
      width: "100",
      height: "38px",
      margin: "23px auto 21px auto !important",
      maxWidth: "343px",
      borderRadius: "4px",
    },
  },
  
  "@media (max-width: 900px)": {},
}));


export default function AlertDialog(props) {
  const classes = useStyles();

  const [closeDialog, setCloseDialog] = useState("");
  const [ permanentClose, setPermanentClose ] = useState(false);
  const handleClose = () => {
    setCloseDialog(props.closeAlert);
    setCloseForNowAlert(true);
  }
  //------------------------> temporary close alert dialog <-----------------------//
  function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

  const [closeForNowAlert, setCloseForNowAlert] = useState(
    getSessionStorageOrDefault('tempCloseAlert', false)
  );
  
  useEffect(() => {
    sessionStorage.setItem('tempCloseAlert', JSON.stringify(closeForNowAlert));
  }, [closeForNowAlert]);

  //------------------------> permanent close alert dialog <-----------------------//
  const alertChecked = sessionManager.getDataFromCookies("alertChecked");
  const handleAlertChecked = () => {
    if (permanentClose === true) {
      setPermanentClose(false);
    } else {
      setPermanentClose(true);
    }
  }
  sessionManager.setDataInCookies(permanentClose, "alertChecked");

  return (
    <div>
      { !closeForNowAlert || !alertChecked ?
      <Dialog
        classes={{ paperWidthSm: classes.dialogBox }}
        open={props.openAlert}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
          <div>
            <DialogContent className={classes.globalTextContainer}>
              <div className="privacy-is-very-important">
                Privacy is very important to us
              </div>
              <div className="text-global-id">
                To protect sensitive information, all custom tags and data
                related to the Watchlists are saved on your local device.
                Clearing the browsing history or cookies will remove the
                watchlist data saved in your profile.
              </div>
            </DialogContent>

            <DialogActions className={classes.dialogButton}>
              <button
                className={classes.addbtn}
                onClick={handleClose}
              >
                I Understand
              </button>
            </DialogActions>
            <div className={classes.doNotShow}>
            <div className="main-end-box">
              <input type="checkbox"
                onClick={handleAlertChecked}
                className="main-checkbox" />
              <div className="main-end-text">Don't show this message again</div>
            </div>
            </div>
          </div> 
      </Dialog>:<></>}
    </div>
  );
}
