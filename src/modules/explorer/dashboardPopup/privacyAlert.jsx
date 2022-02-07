import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { sessionManager } from "../../../managers/sessionManager";
import PrivacyConsent from "../../../services/user"
import utility from "../../../utility";
import { width } from "@mui/system";
import ManageCookiesDialog from "./manageCookiesDialog";
import { cookiesConstants, userCookiesConstants } from "../../../constants";
import Auth0Service from "../../../services/userLogin";
import { history } from "../../../managers/history";

const useStyles = makeStyles((theme) => ({
  // cookiesBackground: {
  //     background: "#2a2a2a",
  //     opacity: "0.3",
  //     position: "absolute",
  //     top: 0,
  //     bottom: 0,
  //     left: 0,
  //     right: 0,
  // },
  container: {
    width: "100%",
    background: "#102e84",
    position: "fixed",
    bottom: "0",
    zIndex: 100,
  },
  containerContent: {
    width: "74.375rem",
    margin: "36px auto 48px auto",
  },
  container1: {
    display: "flex",
  },
  ourCookiesText: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "20px",
  },
  // alertIcon: {
  //     width: "30px",
  //     height: "30px",
  //     margin: "auto",
  // },
  text: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "1.43",
    color: "#ffffff",
    maxWidth: "792px",
    width: "100%",
  },
  line: {
    borderRight: "1px solid #2346ab",
    marginLeft: "55px",
    marginRight: "55px",
  },
  // button: {
  //     width: "163px",
  //     height: "38px",
  //     borderRadius: "4px",
  //     backgroundColor: "#4878ff",
  //     fontFamily: "Inter",
  //     fontSize: "15px",
  //     fontWeight: "600",
  //     color: "#ffffff"
  // },
  buttonContainer: {
    margin: "auto",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonAccept: {
    width: "243px",
    height: "38px",
    borderRadius: "4px",
    backgroundColor: "#4878ff",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "500",
    textAlign: "center",
    color: "#ffffff",
  },
  buttonReject: {
    width: "243px",
    height: "38px",
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: "500",
    textAlign: "center",
    color: "#ffffff",
    marginTop: "25px",
  },
  privacyText: {
    color: "#ffffff",
  },

  "@media (min-width:768px) and (max-width: 1240px)": {
    containerContent: {
      maxWidth: "664px",
      width: "100%",
      display: "block",
      margin: "20px auto 25px auto",
    },
    container1: {
      maxWidth: "664px",
      width: "100%",
      display: "block",
    },
    ourCookiesText: {
      textAlign: "center",
    },
    manageText: {
      marginTop: "20px",
      marginBottom: "10px",
    },
    buttons: {
      marginTop: "12px",
      flexDirection: "row",
      justifyContent: "none",
    },
    buttonReject: {
      marginTop: "0px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    buttonAccept: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  "@media (min-width:0px) and (max-width: 767px)": {
    containerContent: {
      maxWidth: "360px",
      width: "100%",
      display: "block",
      margin: "16px auto 18px auto",
    },
    ourCookiesText: {
      fontSize: "18px",
      textAlign: "center",
      marginBottom: "10px",
    },
    container1: {
      maxWidth: "360px",
      width: "100%",
      display: "block",
    },
    text: {
      fontSize: "12px",
    },
    manageText: {
      marginTop: "5px",
      marginBottom: "5px",
    },
    buttons: {
      marginTop: "12px",
    },
    buttonReject: {
      marginTop: "12px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    buttonAccept: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export default function StorageMessage() {
  const classes = useStyles();

  const [isPrivacyAccepted, setIsPrivacyAccepted] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    const isPrivacyAccepted =
      sessionManager.getDataFromCookies("isPrivacyAccepted");
    if (isPrivacyAccepted) setIsPrivacyAccepted(true);
  });

  //   const handleManage = () => {
  //     setOpenDialog(true);
  //   };
  //   const closeDialog = () => {
  //     setOpenDialog(false);
  //   };
  //   const openPrivacyPolicy = () => {
  //     history.push("/privacy-policy");
  //   };

  const saveMyPreferences = async () => {
      
    // const userInfo = sessionManager.getDataFromCookies("userInfo");
    // const cookiesData = [];
    // //if user is not logged in
    // if (!userInfo) {
    //   sessionManager.setDataInCookies(
    //     cookiesData,
    //     cookiesConstants.USER_COOKIES
    //   );
    // } else {
    //   //if user is logged in
    //   const userCookiesDetails = await new Auth0Service().updateUserCookies({
    //     userId: userInfo.sub,
    //     cookiesAllowed: cookiesData,
    //   });
    // }
    sessionManager.setDataInCookies(true, "isPrivacyAccepted");
    setIsPrivacyAccepted(true);

    const request = {
      userId: sessionManager.getDataFromCookies("userId"),
      privacyConsent: true
    };
    const [error, response] = await utility.parseResponse(
      PrivacyConsent.privacyConsent(request)
    );
  };

  return (
    <>
      {!isPrivacyAccepted ? (
        <div className="overlay-private-alert">
        <div className={classes.container}>
          <div className={classes.containerContent}>
            <div className={classes.ourCookiesText}>
              Please acknowledge that you understand the following:
            </div>
            <div className={classes.container1}>
              {/* <img className={classes.alertIcon} src="/images/XDC-Alert.svg"></img> */}
              <div className={classes.text}>
                Privacy is very important to us. To protect sensitive
                information, all custom tags and data related to the Watchlists
                are saved on your local device. Clearing the browsing history or
                cookies will remove the watchlist data saved in your profile.
              </div>
              <div className={classes.buttonContainer}>
                <div className={classes.buttons}>
                  <button
                    className={classes.buttonAccept}
                    onClick={saveMyPreferences}
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
