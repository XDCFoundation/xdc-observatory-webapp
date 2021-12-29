import React, { useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import userSignUp from "../../services/createUser";
import { Row } from "simple-flexbox";
import AuthService from "../../services/userLogin";
import Utility from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import { genericConstants } from "../constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cookiesConstants } from "../../constants";
import { history } from "../../managers/history";
import Loader from "../../assets/loader";
import ReCAPTCHA from "react-google-recaptcha";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },

  value: {
    width: "400px !important",
  },
  closeContainer: {
    top: "26px",
    fontWeight: "500",
    position: "absolute",
    right: "30px",
    cursor: "pointer",
  },
  close: {
    // width: "15px",
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
    width: "434px",
    height: "44px",
    borderRadius: "4.4px",
    border: "solid 0.6px #00a1ed",
    backgroundColor: "#3763dd",
    margin: "15px 15.5px 30px 15px",
    color: "white",
  },

  userContainer: {
    marginTop: "12px",
  },

  passwordContainer: {
    marginTop: "15px",
  },
  error: {
    color: "red",
    marginLeft: "2px",
  },
  error1: {
    color: "red",
    marginLeft: "24px",
  },
  error2: {
    color: "red",
    // marginLeft: "auto",
    // marginRight: "auto",
    display: "flex",
    justifyContent: "center",
  },

  subCategory: {
    marginTop: "5px",
    marginBottom: "0px",
    fontfamily: "Inter",
    fontsize: "14px",
    fontweight: "500",
    border: "none !important",
    outline: "none",
    color: "#2A2A2A",
  },

  forgotPassword: {
    color: "#2149b9",
    position: "absolute",
    right: "35px",
    cursor: "pointer",
    lineHeight: "26px",
    fontSize: "14px",
  },
  createaccount: {
    color: "#2149b9",
    fontfamily: "Inter",
    fontsize: "14px",
    cursor: "pointer",
  },
  icon: {
    marginLeft: "-48px",
    marginBottom: "4px",
    marginTop: "5px",
  },
  xdc: {
    color: "#2a2a2a",
    textAlign: "center",
    marginBottom: "37px",
    fontFamily: "Inter",
    fontSize: "14px",
  },
  heading: {
    fontWeight: "600",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "22px",
    fontSize: "22px",
    color: "#2a2a2a",
  },
  paperWidthSm: {
    position: "absolute",
    top: "45px",
    width: "503px",
    padding: "0 11px",
    borderRadius: "12px",
  },
  paperWidthSm1: {
    position: "absolute",
    top: "65px",
    width: "503px",
    padding: "0 11px",
    borderRadius: "12px",
  },
  paperWidthSm2: {
    position: "absolute",
    top: "65px",
    width: "600px",
    // padding: "0 11px",
    borderRadius: "12px",
  },
  termsContainer: {
    flexFlow: "row nowrap",
    display: "flex",
    marginLeft: "24px",
    marginTop: "20px",
  },
  checkbox: {
    width: "17px",
    height: "17px",
    marginRight: "8px",
    marginTop: "5px",
  },
  robotContainer: {
    width: "299px",
    height: "69px",
    backgroundColor: "#F8F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "51px",
  },
  robotContainer1: {
    flexFlow: "row nowrap",
    display: "flex",
    justifyContent: "space-between",
  },
  robotContainer2: {
    flexFlow: "row nowrap",
    display: "flex",
    justifyContent: "space-between",
  },
  captchaCheckbox: {
    marginTop: "21px",
    width: "25px",
    height: "25px",
    marginLeft: "14px",
    marginRight: "14px",
  },
  robotText: {
    marginTop: "24px",
    fontWeight: "bold",
    marginLeft: "-50px",
    color: "#2a2a2a",
  },
  recaptcha: {
    marginTop: "12px",
    marginRight: "10px",
  },
  createAccountbtn: {
    width: "433px",
    height: "44px",
    borderRadius: "4.4px",
    border: "solid 0.6px #00a1ed",
    backgroundColor: "#3763dd",
    margin: "15px 15px 23px 24px",
    color: "white",
  },
  alreadyAccount: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2a2a2a",
  },
  signIn: {
    color: "#2149b9",
    cursor: "pointer",
  },
  fieldName: {
    fontSize: "14px",
    fontWeight: "500",
  },

  forgotText: {
    width: "404px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    letterSpacing: "0.58px",
    color: "#4c4c4c",
    marginTop: "20px",
    marginBottom: "39px",
    fontSize: "15px",
  },
  robotContainerForgotPass: {
    width: "299px",
    height: "69px",
    backgroundColor: "#F8F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "24px",
  },
  "@media (max-width: 1920px)": {
    forgotText: {
      maxWidth: "404px",
      width: "95%",
    },
    createAccountbtn: {
      maxWidth: "433px",
      width: "90%",
    },
    robotContainer: {
      maxWidth: "299px",
      width: "95%",
    },
    loading: {
      zIndex: -1,
    },
  },
  "@media (max-width: 767px)": {
    paperWidthSm: {
      position: "absolute",
      // top: "102px",
      height: "100%",
      width: "100%",
      maxWidth: "767px",
      borderRadius: "0px",
      backgroundImage: "none",
      opacity: "0px",
    },
    closeContainer: {
      display: "none",
    },
    heading: {
      fontWeight: "600",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "23px",
      fontSize: "16px",
      color: "#2a2a2a",
      marginBottom: "8px",
    },
    subCategory: {
      display: "flex",
      justifyContent: "space-between",
    },
    forgotPassword: {
      position: "relative",
      right: "0px",
      color: "#3763dd",
    },
    dialogButton: {
      padding: "0",
      justifyContent: "center",
    },
    createaccount: {
      color: "#3763dd",
    },
    forgotText: {
      paddingLeft: "18px",
      paddingRight: "18px",
      marginBottom: "28px",
    },
    createAccountbtn: {
      width: "100%",
      maxWidth: "343px",
      height: "38px",
      borderRadius: "4px",
      margin: "23px auto 21px auto",
      display: "block",
    },
    addbtn: {
      width: "100%",
      maxWidth: "343px",
      height: "38px",
      borderRadius: "4px",
      margin: "23px auto 21px auto",
    },
    termsContainer: {
      flexFlow: "row nowrap",
      display: "flex",
      margin: "20px auto 35px auto",
      maxWidth: "342px",
      width: "100%",
    },
    userContainer: {
      marginTop: "12px",
      padding: "0px",
      width: "100%",
      maxWidth: "343px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    userContainerSignup: {
      marginTop: "12px",
      padding: "0px",
      width: "100%",
      maxWidth: "343px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    passwordContainer: {
      marginTop: "20px",
      padding: "0px",
      width: "100%",
      maxWidth: "343px",
      marginLeft: "auto",
      marginRight: "auto",
    },

    paperWidthSm1: {
      position: "absolute",
      // top: "102px",
      height: "100%",
      width: "100%",
      maxWidth: "767px",
      borderRadius: "0px",
      backgroundImage: "none",
      opacity: "0px",
      paddingBottom: "30px",
    },

    input: {
      maxWidth: "433px",
      width: "100%",
      height: "38px",
    },
  },
}));

export default function FormDialog(props) {
  const { onOpen, onClose } = props;
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState(0);
  const [value, setValue] = React.useState(0);
  // const [openSignup, setOpenSignup] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorUserName, setErrorUserName] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  // const [viewPopup, setViewPopup] = React.useState(true);
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorEmailVerified, setErrorEmailVerified] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState("");
  const [errorTermsCondition, setErrorTermsCondition] = React.useState("");
  const [errorCaptcha, setErrorCaptcha] = React.useState("");
  const [timer, setTimer] = React.useState("00:00");

  const [emailError, setEmailError] = useState("");
  const [inputError, setInputError] = useState("");

  const classes = useStyles();
  const urlProfile = () => {
    const profilePic = sessionManager.getDataFromCookies(
      cookiesConstants.USER_PICTURE
    );
    return profilePic;
  };

  React.useEffect(() => {
    if (props.isNewFeatureComponent) {
      setOpen(true);
      handleClickOpenSignup();

      return;
    }

    if (open === true) {
      setOpen(false);
    } else {
      setOpen(props.open);
    }
  }, [props]);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClickOpen = () => {
    if (urlProfile()) {
      window.location.href = "loginprofile";
    } else {
      setOpen(true);
    }
  };
  sessionManager.setDataInCookies("", "alreadyVisited");
  // const popUp = ()=>{

  //     if(visited) {
  //       setViewPopup({ viewPopup: false })
  //       //do not view Popup
  //   } else
  //       //this is the first time
  //      sessionManager.setDataInCookies["alreadyVisited"]=true;
  //       setViewPopup({ viewPopup: true});
  // }

  const handleClose = () => {
    {
      props.verifiedEmail
        ? props.onClose(onClose)
        : !props.hash
          ? setOpen(false)
          : props.onClose(onClose);
    }
    setTimeout(() => {
      setValue(0);
    }, 1000);

    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setErrorUserName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setErrorTermsCondition("");
    setErrorCaptcha("");
    setErrorEmailVerified(false);
    setCaptchaError("");
  };

  var regExAlphaNum = /^[0-9a-zA-Z]+$/;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var regExPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;

  // <-----------------------------------------------------login functionality------------------------------------------------------>

  const handleClickOpenSignup = () => {
    setValue(1);
    setErrorEmailVerified(false);
    setEmail("")
    setUserName("")
  };
  const handleOpenForgotPassword = () => {
    setValue(3);
    setErrorEmailVerified(false);
    setEmail("")
  };

  const login = async () => {
    const reqObj = {
      name: email,
      password: password,
    };
    setLoading(true);
    setErrorEmail("");
    setErrorPassword("");

    if (!email) {
      setErrorEmail("Please enter required field");
      setLoading(false);
      return;
    } else if (!password) {
      setErrorPassword("Please enter required field");
      setLoading(false);
      return;
    } else if (!email.match(regExAlphaNum)) {
      setErrorEmail("Enter valid Username");
      setLoading(false);
      return;
    } else if (!password.match(regExPass)) {
      setErrorPassword(
        "Password must be atleast 5 character long with Uppercase, Lowercase and Number"
      );
      setLoading(false);
      return;
    }

    const authObject = new AuthService();
    let [error, authResponse] = await Utility.parseResponse(
      authObject.signin(reqObj)
    );

    if (authResponse?.userInfoRes?.email.length.name > 2) {
      setLoading(false);
    }

    if (authResponse?.userInfoRes?.email_verified === false) {
      setErrorEmailVerified(true);
      setLoading(false);
      return;
    } else {
      if (error || !authResponse) {
        setLoading(false);
        setErrorPassword("Wrong Username or password");
        // setislogged(true)
      } else {
        sessionManager.setDataInCookies(authResponse?.userInfoRes, "userInfo");
        sessionManager.setDataInCookies(true, "isLoggedIn");
        sessionManager.setDataInCookies(
          authResponse?.userInfoRes?.picture,
          cookiesConstants.USER_PICTURE
        );
        sessionManager.setDataInCookies(
          authResponse?.userInfoRes?.sub,
          "userId"
        );
        sessionManager.removeDataFromCookies("activateAccountEmail");
        setLoading(false);
        setUserName("");
        setEmail("");
        setPassword("");
        {
          !props.hash ? (window.location.href = "loginprofile") : history.go(0);
        }
      }
    }
  };

  // <-------------------------------------------------------SignUp functionality------------------------------------------------------>

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      name: userName,
      email: email,
      password: password,
    };
    setLoading(true);
    setErrorUserName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setErrorTermsCondition("");
    setErrorCaptcha("");
    if (!userName) {
      setErrorUserName(genericConstants.ENTER_REQUIRED_FIELD);
      setLoading(false);
      return;
    }
    if (!email) {
      setErrorEmail(genericConstants.ENTER_REQUIRED_FIELD);
      setLoading(false);
      return;
    }
    if (!password) {
      setErrorPassword(genericConstants.ENTER_REQUIRED_FIELD);
      setLoading(false);
      return;
    }
    if (!confirmPassword) {
      setErrorConfirmPassword(genericConstants.ENTER_REQUIRED_FIELD);
      setLoading(false);
      return;
    } else if (!userName.match(regExAlphaNum)) {
      setErrorUserName("Enter valid Username");
      setLoading(false);
    } else if (!email.match(mailformat)) {
      setErrorEmail("Enter valid Email");
      setLoading(false);
    } else if (!password.match(regExPass)) {
      setErrorPassword(
        "Password must be atleast 5 character long with Uppercase, Lowercase and Number"
      );
      setLoading(false);
    } else if (password !== confirmPassword) {
      setErrorConfirmPassword("Password doesn't match");
      setLoading(false);
    } else if (termsCheckbox === false) {
      setErrorTermsCondition("Please agree to the terms and conditions");
      setLoading(false);
    } else {
      if (reCaptcha === "") {
        setCaptchaError(genericConstants.RECAPTCHA_ERROR);
        setLoading(false);
        return;
      } else {
        setCaptchaError("");
      }
      const [error, response] = await Utility.parseResponse(
        userSignUp.postSignUp(data)
      );
      if (error || !response) {
        Utility.apiFailureToast("User already exists");
        setLoading(false);
      } else {
        window.location.href = "/activate-account";
        sessionManager.setDataInCookies(email, "activateAccountEmail");
        setLoading(false);
        setOpen(false);
        setTimeout(() => {
          setValue(0);
        }, 1000);

        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTermsCheckbox(false);
        setCaptchaCheckbox(false);
      }
    }
  };

  const handleClickOpenSignin = () => {
    setValue(0);

    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTermsCheckbox(false);
    setCaptchaCheckbox(false);

    setErrorUserName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setErrorTermsCondition("");
    setErrorCaptcha("");
  };

  // <-----------------------------------------------------Forgot password functionality---------------------------------------------->

  const forgotpassword = async () => {
    const reqObj = {
      email: email,
    };
    setValue(2);
    onClickReset();

    if (captchaCheckbox === false) {
      setErrorCaptcha("please verify captcha");
    } else {
      const authObject = new AuthService();
      let [error, authResponse] = await Utility.parseResponse(
        authObject.forgotPassword(email)
      );
      if (error || !authResponse) {
        setEmailError("Please enter a valid email address");
        Utility.apiFailureToast("Wrong email");
      } else {
        setEmail("");
        setCaptchaCheckbox(false);
        Utility.apiSuccessToast(
          "We have just sent you an email to reset your password."
        );
        window.location.href = "/";
      }
    }
  };

  //--------------------------------------------------checkbox functionality--------------------------------------------------->
  const [termsCheckbox, setTermsCheckbox] = React.useState(false);
  const handleTermsCheckbox = () => {
    if (termsCheckbox === true) {
      setTermsCheckbox(false);
    } else {
      setTermsCheckbox(true);
    }
  };

  const [captchaCheckbox, setCaptchaCheckbox] = React.useState(false);
  const handleCaptchaCheckbox = () => {
    if (captchaCheckbox === true) {
      setCaptchaCheckbox(false);
    } else {
      setCaptchaCheckbox(true);
    }
  };

  // Google Recaptcha Handlers
  const [reCaptcha, setReCaptcha] = React.useState("");
  const [captchaError, setCaptchaError] = React.useState("");

  function handleReCaptcha(value) {
    setReCaptcha(value);
  }

  const Ref = useRef(null);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("5:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 300);
    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  //------------------------------------------------------------------------------------------------------------------------------------->

  return (
    <div>
      {/* <div className={classes.add}> */}
      {!props.isNewFeatureComponent ? (
        props.verifiedEmail ? (
          ""
        ) : !props.hash ? (
          //   <button className="login-button">
          <Avatar
            className="profile"
            onClick={handleClickOpen}
            src={
              sessionManager.getDataFromCookies(
                cookiesConstants.USER_PICTURE
              ) || "/images/Profile.svg"
            }
            alt={"image"}
          />
        ) : (
          //   </button>
          ""
        )
      ) : (
        ""
      )}
      {/* <div className="dialogboxModal"> */}
      <Dialog
        classes={{
          paperWidthSm:
            value === 4
              ? classes.paperWidthSm1
              : value === 4
                ? classes.paperWidthSm2
                : classes.paperWidthSm,
        }}
        className={classes.dialog}
        open={open || onOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {value === 0 ? (
          <div>
            {/* <--------------------------------------------------Login Screen-------------------------------------------> */}
            <Row>
              <div className={classes.heading} id="form-dialog-title">
                Log in to your account
              </div>
              <span onClick={handleClose} className={classes.closeContainer}>
                <img className={classes.close} src={"/images/XDC-Cross.svg"} />
              </span>
            </Row>
            <DialogContent className={classes.userContainer}>
              <DialogContentText className={classes.subCategory}>
                <span className={classes.fieldName}>Username</span>
              </DialogContentText>
              <input
                className={classes.input}
                placeholder="5 to 30 characters in length, only alphanumeric allowed"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorEmail("");
                  setErrorPassword("");
                  setInputError(" ");
                }}
                type="text"
              />
              <div className={classes.error}>{errorEmail}</div>
            </DialogContent>
            <DialogContent className={classes.passwordContainer}>
              <DialogContentText className={classes.subCategory}>
                <span className={classes.fieldName}>Password</span>
                <span
                  className={classes.forgotPassword}
                  onClick={handleOpenForgotPassword}
                >
                  Forgot Password?
                </span>
              </DialogContentText>

              <input
                type="password"
                type={passwordShown ? "text" : "password"}
                id={passwordShown ? "text" : "password"}
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                className={classes.input}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorPassword("");
                }}
              />
              <span>
                {passwordShown ? (
                  <img alt="show"
                    src={"/images/show.svg"}
                    className={classes.icon}
                    onClick={togglePasswordVisiblity}
                  />
                ) : (
                  <img alt="hide"
                    src={"/images/hide.svg"}
                    className={classes.icon}
                    onClick={togglePasswordVisiblity}
                  />
                )}
              </span>
              <div className={classes.error}>{errorPassword}</div>
            </DialogContent>
            {errorEmailVerified ? (
              <div className="verifiedEmailError">
                <span className="verifiedEmailErrorTextIcon">
                  <img alt="alert"
                    style={{ paddingRight: "2px" }}
                    src={require("../../../src/assets/images/alert.svg")}
                  />
                  Email verification pending.
                </span>
                <span style={{ fontSize: "12px" }}>
                  Please check your email to verify this account.
                </span>
              </div>
            ) : (
              ""
            )}
            {isLoading === true ? (
              <div className={classes.loading}>
                <Loader />
              </div>
            ) : (
              <div></div>
            )}
            <DialogActions className={classes.dialogButton}>
              <button
                className={classes.addbtn}
                onClick={() => {
                  {
                    {
                      login();
                    }
                  }
                }}
              >
                Login{" "}
              </button>
            </DialogActions>

            <div className={classes.value}></div>
            <DialogContentText className={classes.xdc}>
              New to XDC Observatory?{" "}
              <span
                className={classes.createaccount}
                onClick={handleClickOpenSignup}
              >
                {" "}
                Create an account
              </span>
            </DialogContentText>
          </div>
        ) : value === 1 ? (
          <div>
            {/*<------------------------------------------------ Signup Screen---------------------------------------------> */}
            <Row>
              <div className={classes.heading} id="form-dialog-title">
                Setup a New Account
              </div>

              <span onClick={handleClose} className={classes.closeContainer}>
                <img className={classes.close} src={"/images/XDC-Cross.svg"} />
              </span>
            </Row>
            <DialogContent className={classes.userContainerSignup}>
              <DialogContentText className={classes.subCategory}>
                <span className={classes.fieldName}>Username</span>
              </DialogContentText>
              <input
                className={classes.input}
                placeholder="5 to 30 characters in length, only alphanumeric allowed"
                // name="userName"
                // value={signUp.userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrorUserName("");
                }}
              // onChange={inputEventSignUp}
              />
              <div className={classes.error}>{errorUserName}</div>
            </DialogContent>
            <DialogContent className={classes.userContainerSignup}>
              <DialogContentText className={classes.subCategory}>
                <span className={classes.fieldName}>Email</span>
              </DialogContentText>
              <input
                type="email"
                placeholder="A confirmation code will be sent to this email"
                className={classes.input}
                // name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorEmail("");
                }}
              // value={signUp.email}

              // onChange={inputEventSignUp}
              />
              <div className={classes.error}>{errorEmail}</div>
            </DialogContent>
            <DialogContent className={classes.userContainerSignup}>
              <DialogContentText className={classes.subCategory}>
                <span className={classes.fieldName}>Password</span>
              </DialogContentText>
              <input
                type="password"
                id="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                className={classes.input}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorPassword("");
                }}
              // name="password"
              // value={signUp.password}
              // onChange={inputEventSignUp}
              />
              <div className={classes.error}>{errorPassword}</div>
            </DialogContent>
            <DialogContent className={classes.userContainerSignup}>
              <DialogContentText className={classes.subCategory}>
                <span className={classes.fieldName}>Confirm Password</span>
              </DialogContentText>
              <input
                type="password"
                id="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                className={classes.input}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrorConfirmPassword("");
                }}
              // name="confirmPassword"
              // value={signUp.confirmPassword}
              // onChange={inputEventSignUp}
              />
              <div className={classes.error}>{errorConfirmPassword}</div>
            </DialogContent>
            <div className={classes.termsContainer}>
              <input
                className={classes.checkbox}
                onClick={handleTermsCheckbox}
                type="checkbox"
              />
              <span className="iAgree">
                I agree to the{" "}
                <a style={{ color: "#2b51bc" }} href="/term-conditions">
                  Terms of Use
                </a>{" "}
                &{" "}
                <a style={{ color: "#2b51bc" }} href="/privacy-policy">
                  Privacy Policy
                </a>
              </span>
            </div>
            <div className={classes.error1}>{errorTermsCondition}</div>
            {/* <div
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                marginTop: "4px",
                                flexDirection: "column",
                                paddingLeft: "28px",
                            }}
                        ></div> */}
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: "50px",
                marginBottom: "25px",
                flexDirection: "column",
              }}
            >
              <ReCAPTCHA
                // sitekey="6Le20JsdAAAAAI3li1g-YMo7gQI8pA11t_J62jGJ"
                sitekey="6LcrTaAdAAAAAOgAvMUxSVp8Dr7mzDduyV7bh1T5"
                onChange={handleReCaptcha}
              />
              <div className={classes.error2}>{captchaError}</div>
            </div>
            {/* <div className={classes.robotContainer}>
                  <div className={classes.robotContainer1}>
                   
                    <label class="container1">
                      <input type="checkbox"></input>
                      <span
                        class="checkmark1"
                        onClick={handleCaptchaCheckbox}
                      ></span>
                    </label>
                    <span className={classes.robotText}>I'm not a robot</span>
                    <img
                      className={classes.recaptcha}
                      src={'/images/recaptcha.svg}
                    ></img>
                  </div>
                </div> */}
            {/* <div className={classes.error2}>{errorCaptcha}</div> */}
            {isLoading == true ? (
              <div>
                <Loader />
              </div>
            ) : (
              <div></div>
            )}
            <button className={classes.createAccountbtn} onClick={handleSignUp}>
              Create an Account{" "}
            </button>

            <div className={classes.alreadyAccount}>
              <div>
                Already have an account?{" "}
                <span
                  className={classes.signIn}
                  onClick={handleClickOpenSignin}
                >
                  Sign In
                </span>
              </div>
            </div>
          </div>
        ) : value === 2 ? (
          //<------------------------------------Forgot success -------------------------------------------->
          <div className="forgot-success">
            <Row>
              {/* <div className={classes.heading} id="form-dialog-title"> */}
              <div className="forgot-success-title">
                You,ve successfully request a Forgot Password.
              </div>
              <span onClick={handleClose} className="forgot-success-close">
                <img
                  className={classes.close}
                  src={"/images/XDC-Cross.svg"}
                  alt={"image"}
                />
              </span>
            </Row>
            <div className="forgot-success-box">
              <div className="forgot-success-text">
                If the email address belongs to a known account, a recovery
                password will be sent to you within the next few minutes.
              </div>
              <div className="forgot-success-text margin-top-20-px">
                If you have not received the email, you can make another request
                after 5 minutes
              </div>
            </div>
            <div className="forgot-success-time-div">
              <span className="forgot-success-time">
                {/* {time.m} : {time.s} */}
                {/* time */}
                {/* {minute}:{sec} */}
                {timer}
              </span>
            </div>
            <div className={classes.alreadyAccount}>
              <div>
                Back to{" "}
                <span
                  className={classes.signIn}
                  onClick={handleClickOpenSignin}
                >
                  Sign In
                </span>
              </div>
            </div>
          </div>
        ) : (
          // <------------------------------------------Forgot Password------------------------------------------------->
          <div>
            <Row>
              <div className={classes.heading} id="form-dialog-title">
                Forgot Password
              </div>
              <span onClick={handleClose} className={classes.closeContainer}>
                <img
                  className={classes.close}
                  src={"/images/XDC-Cross.svg"}
                ></img>
              </span>
            </Row>
            <div className={classes.forgotText}>
              <p>
                Enter your registered email address and we will send you a
                password recovery link
              </p>
            </div>
            <DialogContent className={classes.userContainerSignup}>
              <DialogContentText className={classes.subCategory}>
                <span className={classes.fieldName}>Email Address</span>
              </DialogContentText>
              <input
                type="email"
                className={classes.input}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                  setInputError(" ");
                }}
              />
            </DialogContent>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: "28px",
                flexDirection: "column",
                paddingLeft: "28px",
              }}
            >
              <ReCAPTCHA
                sitekey="6Le20JsdAAAAAI3li1g-YMo7gQI8pA11t_J62jGJ"
                onChange={handleReCaptcha}
              />
              <div style={{ marginLeft: 0 }} className={classes.error1}>
                {captchaError}
              </div>
            </div>

            {/* <div className={classes.robotContainerForgotPass}>
                  <div className={classes.robotContainer1}>
                   
                    <label class="container1">
                      <input type="checkbox"></input>
                      <span
                        class="checkmark1"
                        onClick={handleCaptchaCheckbox}
                      ></span>
                    </label>
                    <span className={classes.robotText}>I'm not a robot</span>
                    <img
                      className={classes.recaptcha}
                      src={'/images/recaptcha.svg'}
                    ></img>
                  </div>
                </div> */}

            <button
              className={classes.createAccountbtn}
              onClick={() => {
                // validateEmail();
                forgotpassword();
              }}
              disabled={!email}
            >
              Reset Password
            </button>

            <div className={classes.alreadyAccount}>
              <div>
                Back to{" "}
                <span
                  className={classes.signIn}
                  onClick={handleClickOpenSignin}
                >
                  Sign In
                </span>
              </div>
            </div>
          </div>
        )}
      </Dialog>
      {/* </div> */}
      {/* </div> */}
      <ToastContainer />
    </div>
  );
}