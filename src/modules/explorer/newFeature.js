import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Row } from "simple-flexbox";
import { sessionManager } from "../../managers/sessionManager";
import FormDialog from "./loginDialog";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";

export default function NewFeature(props) {
  function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

  const [closeForNow, setCloseForNow] = useState(
    getSessionStorageOrDefault("tempClose", false)
  );

  useEffect(() => {
    sessionStorage.setItem("tempClose", JSON.stringify(closeForNow));
  }, [closeForNow]);

  const [open, setOpen] = React.useState(true);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenSignUp(false);
    setCloseForNow(true);
  };
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setCloseForNow(true);
  };
  //   const { onClose, selectedValue, open } = props;

  //   const handleClose = () => {
  //     onClose(selectedValue);
  //   };

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      maxWidth: "795px",
      width: "100%",
      position: "absolute",
      top: "65px",
      borderRadius: "12px",
      "@media (min-width: 0px) and (max-width: 766px)": {
        height: "100vh",
        top: "40px",
        borderRadius: "0px",
      },
    },
    alertContainerMob: {
      width: "100%",
      background: "#4878ff",
      position: "fixed",
      bottom: "0",
      zIndex: 1,
    },
    contentContainerMob: {
      display: "flex",
      justifyContent: "space-between",
      flexFlow: "row nowrap",
      padding: "12px 16px 18px 16px",
    },
    theAllNewXdcObservatory: {
      fontSize: "15px",
      fontWeight: "bold",
      color: "#ffffff",
    },
    tapHereToSeeNewFeatures: {
      display: "flex",
      fontSize: "15px",
      color: "#ffffff",
    },
    tapHere: {
      textDecoration: "underline",
      cursor: "pointer",
    },
    closeMob: {
      width: "12px",
      height: "12px",
      margin: "auto 0",
    },
  }));
  const classes = useStyles();
  const [newFeatureOpenInMobile, setNewFeatureOpenInMobile] =
    React.useState(false);
  const [isOpenMobileAlert, setIsOpenMobileAlert] = React.useState(true);
  const [viewPopUp, setViewPopUp] = useState(true);
  const visited = () => {
    sessionManager.setDataInCookies(true, "Visited");
  };
  const notVisited = () => {
    sessionManager.setDataInCookies(false, "Visited");
  };
  // useEffect(() => {
  //   let isVisitedAccepted = sessionManager.getDataFromCookies("Visited");
  //   if(isVisitedAccepted) setViewPopUp(false)
  // },)
 function handleChange(e) {
    let isChecked = e.target.checked;
    if (isChecked){
      visited()
    }else{
      notVisited()
    }
  }

  
  const userInfo = sessionManager.getDataFromCookies("userInfo");
  const handleOpenNewFeatureMobile = () => {
    window.scrollTo(0, 0);
    setNewFeatureOpenInMobile(true);
    setOpen(true);
  };
  const handleCloseMobileAlert = () => {
    setIsOpenMobileAlert(false);
  };
  let isVisitedAccepted = sessionManager.getDataFromCookies("Visited");
  return (
    <>
      {props.setIsCookiesAccepted && (!isVisitedAccepted || isVisitedAccepted === "false") ? (
        window.innerWidth >= 768 || newFeatureOpenInMobile ? (
          !openSignUp ? (
            !userInfo && !closeForNow ? (
              <Dialog
                id="new-features"
                onClose={handleClose}
                open={open}
                classes={{ paperWidthSm: classes.dialogBox }}
              >
                <div className="main-box">
                  <Row className="main-row">
                    {window.innerWidth >= 768 ? (
                      <>
                        <div className="main-title">New Features</div>
                        <div className="main-close" onClick={handleClose}>
                          <img alt="Cross" src={"/images/XDC-Cross.svg"} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div onClick={handleClose}>
                          <img
                            className="back-newFeature"
                            alt="back"
                            src={"/images/backButton.svg"}
                          />
                        </div>
                        <div className="main-title">New Features</div>
                      </>
                    )}
                  </Row>
                  <div className="main-sub-title">
                    Create your account to get started
                  </div>
                  <Row className="card-box" style={{ flexFlow: "wrap" }}>
                    <div className="card margin-right-34px">
                      <img
                        alt="new-feature"
                        src={require("../../../src/assets/images/watch-list-new-feature.svg")}
                        className="crad-image"
                      />
                      <div className="card-title">Create watchlist</div>
                      <div className="card-text">
                        An email notification will be sent when an address in
                        your watch list receives an incoming/outgoing
                        transaction.
                      </div>
                    </div>
                    <div className="card margin-right-34px">
                      <img
                        alt="addLabel"
                        src={require("../../../src/assets/images/AddLabel_NewFeature.svg")}
                        className="crad-image"
                      />
                      <div className="card-title">Add transaction label</div>
                      <div className="card-text">
                        Add a personal note to the transaction hash to track it
                        in the future.
                      </div>
                    </div>
                    <div className="card">
                      <img
                        alt="addLabel"
                        src={require("../../../src/assets/images/AddTransactionLable_NewFeature.svg")}
                        className="crad-image"
                      />
                      <div className="card-title">
                        Add private tag to an address
                      </div>
                      <div className="card-text">
                        Add a short memo or private tag to the address of
                        interest.
                      </div>
                    </div>
                  </Row>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="sign-up-button" onClick={handleOpenSignUp}>
                      <div className="main-sing-up-text"> Sign Up</div>
                    </div>
                  </div>

                  <div className="main-end-box">
                    <input
                      type="checkbox"
                      onChange={e => handleChange(e)}
                      className="main-checkbox"
                    />
                    <div className="main-end-text">
                      Don't show this message again
                    </div>
                  </div>
                </div>
              </Dialog>
            ) : (
              ""
            )
          ) : (
            <FormDialog isNewFeatureComponent={true} />
          )
        ) : !userInfo && !closeForNow && isOpenMobileAlert ? (
          <>
            <div className={classes.alertContainerMob}>
              <div className={classes.contentContainerMob}>
                <div className={classes.textMobContainer}>
                  <div className={classes.theAllNewXdcObservatory}>
                    The all new XDC Observatory
                  </div>
                  <div className={classes.tapHereToSeeNewFeatures}>
                    <div
                      className={classes.tapHere}
                      onClick={handleOpenNewFeatureMobile}
                    >
                      Tap here
                    </div>
                    &nbsp;to see new features
                  </div>
                </div>
                <img
                  className={classes.closeMob}
                  onClick={handleCloseMobileAlert}
                  src="/images/xdc-cross-white.svg"
                  alt="close icon"
                ></img>
              </div>
            </div>
          </>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
}
