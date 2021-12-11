import React, { useState } from "react";
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
import Loader from '../../assets/loader'
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
    justifyContent: "center"
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
    marginTop:"5px",
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
    top: "65px",
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
    margin: "41px 15px 23px 24px",
    color: "white",
  },
  alreadyAccount: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2a2a2a"
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
      zIndex: -1
    }
  },
  "@media (max-width: 767px)": {
    paperWidthSm: {
      position: "absolute",
      top: "102px",
      height:"100%",
      width: "100%",
      borderRadius: "0px",
      marginTop: "0px",
      backgroundImage:"none",
      opacity:"0px",
    },
    closeContainer: {
      display: "none",


    },
    

    paperWidthSm1: {
      position: "absolute",
      top: "125px",
      maxWidth: "503px",
      width: "95%",
    },

    input: {
      maxWidth: "433px",
      width: "100%",
    },
  },
  "@media (max-height: 900px)": {
    paperWidthSm1: {
      maxHeight: "500px",
      height: "72%"
    },
  },

  "@media (max-width: 376px)": {
    createAccountbtn: {
      maxWidth: "433px",
      width: "86%",
    },
    robotContainer: {
      maxWidth: "299px",
      width: "86%",
    },
    robotContainerForgotPass: {
      maxWidth: "299px",
      width: "86%",
    },
  },
}));

export default function FormDialog(props) {
  const { onOpen, onClose } = props
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [openSignup, setOpenSignup] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  console.log("props dialog", props)

  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorUserName, setErrorUserName] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState("");
  const [errorTermsCondition, setErrorTermsCondition] = React.useState("");
  const [errorCaptcha, setErrorCaptcha] = React.useState("");

  const [emailError, setEmailError] = useState("");
  const [inputError, setInputError] = useState("");

  const classes = useStyles();
  const urlProfile = () => {
    const profilePic = sessionManager.getDataFromCookies(cookiesConstants.USER_PICTURE)
    return profilePic;
  }

  React.useEffect(() => {
    if (open === true) {
      setOpen(false)
    } else {
      setOpen(props.open)
    }
  }, [props])
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClickOpen = () => {
    if (urlProfile()) {
      window.location.href = "loginprofile";

    } else {
      setOpen(true);
    }
  }

  const handleClose = () => {
    { props.verifiedEmail ? (props.onClose(onClose)) : (!props.hash ? setOpen(false) : props.onClose(onClose)) }
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
  };

  var regExAlphaNum = /^[0-9a-zA-Z]+$/;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var regExPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;

  // <-----------------------------------------------------login functionality------------------------------------------------------>

  const handleClickOpenSignup = () => {
    setValue(1);
  };
  const handleOpenForgotPassword = () => {
    setValue(2);
  };

  const login = async () => {
    const reqObj = {
      name: email,
      password: password,
    };
    setLoading(true)
    setErrorEmail("");
    setErrorPassword("");

    if (!email || !password) {
      Utility.apiFailureToast(genericConstants.ENTER_REQUIRED_FIELD);
      setLoading(false)
      return;
    } else if (!email.match(regExAlphaNum)) {
      setErrorEmail("Enter valid Username");
      setLoading(false)
      return;
    } else if (!password.match(regExPass)) {
      setErrorPassword(

        "Password must be atleast 5 character long with Uppercase, Lowercase and Number"
      );
      setLoading(false)
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
      Utility.apiFailureToast(
        "You have got an email from XDC explorer. Please verify your email."
      );
      setLoading(false);
    } else {
      if (error || !authResponse) {
        setLoading(false);
        Utility.apiFailureToast("Wrong Username or password");
        // setislogged(true)
      } else {
        sessionManager.setDataInCookies(authResponse?.userInfoRes, "userInfo");
        sessionManager.setDataInCookies(true, "isLoggedIn");
        sessionManager.setDataInCookies(authResponse?.userInfoRes?.picture, cookiesConstants.USER_PICTURE);
        sessionManager.setDataInCookies(
          authResponse?.userInfoRes?.sub,
          "userId"
        );
        setLoading(false);
        setUserName("");
        setEmail("");
        setPassword("");
        Utility.apiSuccessToast("Sign in successfull");
        { !props.hash ? window.location.href = "loginprofile" : history.go(0) }
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
    setLoading(true)
    setErrorUserName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setErrorTermsCondition("");
    setErrorCaptcha("");
    if (!userName || !email || !password || !confirmPassword) {
      Utility.apiFailureToast(genericConstants.ENTER_REQUIRED_FIELD);
      setLoading(false);
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
      setErrorTermsCondition("Please agree to the terms and conditions")
      setLoading(false);
    } else if (captchaCheckbox === false) {
      setErrorCaptcha("Please verify captcha")
      setLoading(false);
    } else {
      const [error, response] = await Utility.parseResponse(
        userSignUp.postSignUp(data)
      );
      if (error || !response) {
        Utility.apiFailureToast("User already exists");
        setLoading(false);
      } else {
        Utility.apiSuccessToast("Sign-up success, check your email");
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
    if (captchaCheckbox === false) {
      setErrorCaptcha("please verify captcha")
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



  //------------------------------------------------------------------------------------------------------------------------------------->
  return (
    <div>
      <div className={classes.add}>
        {props.verifiedEmail ? ("") : (!props.hash ?
          <button className="login-button" onClick={handleClickOpen}>
            <img
              className="Shape2"
              style={{ borderRadius: "50px" }}
              src={sessionManager.getDataFromCookies(cookiesConstants.USER_PICTURE) || require("../../../src/assets/images/Profile.svg")}
            ></img>
          </button> : "")
        }
        <div className="dialogboxModal">
          <Dialog
            classes={{ paperWidthSm: value === 1 ? classes.paperWidthSm1 : classes.paperWidthSm }}
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
                  <span
                    onClick={handleClose}
                    className={classes.closeContainer}
                  >
                    <img
                      className={classes.close}
                      src={require("../../../src/assets/images/XDC-Cross.svg")}
                    ></img>
                  </span>
                </Row>
                
                <DialogContent className={classes.userContainer}>
                  <DialogContentText className={classes.subCategory}>
                    <span className={classes.fieldName}>Username</span>
                  </DialogContentText>
                  <input
                    className={classes.input}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setInputError(" ");
                    }}
                    type="text"
                  ></input>
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
                  <div className="inputIconCntr">

                  <input
                    type="password"
                    type={passwordShown ? "text" : "password"}
                    className={classes.input}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <span>
                    {passwordShown ? (
                      <img
                        src={require("../../../src/assets/images/show .svg")}
                        className={classes.icon}
                        onClick={togglePasswordVisiblity}
                      />
                    ) : (
                      <img
                        src={require("../../../src/assets/images/hide.svg")}
                        className={classes.icon}
                        onClick={togglePasswordVisiblity}
                      />
                    )}
                  </span>
                  </div>
                  <div className={classes.error}>{errorPassword}</div>
                </DialogContent>
                {isLoading == true ? (
                  <div className={classes.loading} >

                    <Loader />
                  </div>

                ) : (
                  <div>

                  </div>
                )}
                <DialogActions>
                  <button
                    className={classes.addbtn}
                    onClick={() => {
                      {
                        { login() };
                      }
                    }}
                  >
                    Log in{" "}
                  </button>
                </DialogActions>

                <div className={classes.value}></div>
                <DialogContentText className={classes.xdc}>
                  New to XDC Explorer?{" "}
                  <span
                    className={classes.createaccount}
                    onClick={handleClickOpenSignup}
                  >
                    {" "}
                    Create an account
                  </span>
                </DialogContentText>
                <div className="loginMoView">

                </div>
              </div>
            ) : value === 1 ? (
              <div>
                {/*<------------------------------------------------ Signup Screen---------------------------------------------> */}
                <Row>
                  <div className={classes.heading} id="form-dialog-title">
                    Setup a New Account
                  </div>

                  <span
                    onClick={handleClose}
                    className={classes.closeContainer}
                  >
                    <img
                      className={classes.close}
                      src={require("../../../src/assets/images/XDC-Cross.svg")}
                    ></img>
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
                    onChange={(e) => setUserName(e.target.value)}
                  // onChange={inputEventSignUp}
                  ></input>
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
                    onChange={(e) => setEmail(e.target.value)}
                  // value={signUp.email}

                  // onChange={inputEventSignUp}
                  ></input>
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
                    onChange={(e) => setPassword(e.target.value)}
                  // name="password"
                  // value={signUp.password}
                  // onChange={inputEventSignUp}
                  ></input>
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  // name="confirmPassword"
                  // value={signUp.confirmPassword}
                  // onChange={inputEventSignUp}
                  ></input>
                  <div className={classes.error}>{errorConfirmPassword}</div>
                </DialogContent>
                <div className={classes.termsContainer}>
                  <input
                    className={classes.checkbox}
                    onClick={handleTermsCheckbox}
                    type="checkbox"
                  ></input>
                  <span className="iAgree">
                    I agree to the{" "}
                    <a style={{ color: "#2b51bc" }} href="/term-conditions" >
                      Terms of Use
                    </a>
                    {" "}&{" "}
                    <a style={{ color: "#2b51bc" }} href="/privacy-policy"  >
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className={classes.error1}>{errorTermsCondition}</div>
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
                      src={require("../../../src/assets/images/recaptcha.svg")}
                    ></img>
                  </div>
                </div> */}
                <div className={classes.error2}>{errorCaptcha}</div>
                {isLoading == true ? (
                  <div >

                    <Loader />
                  </div>

                ) : (
                  <div></div>
                )}
                <button
                  className={classes.createAccountbtn}
                  onClick={handleSignUp}
                >
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
            ) : (
              // <------------------------------------------Forgot Password------------------------------------------------->
              <div>
                <Row>
                  <div className={classes.heading} id="form-dialog-title">
                    Forgot Password
                  </div>
                  <span
                    onClick={handleClose}
                    className={classes.closeContainer}
                  >
                    <img
                      className={classes.close}
                      src={require("../../../src/assets/images/XDC-Cross.svg")}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setInputError(" ");
                    }}
                  ></input>
                </DialogContent>

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
                      src={require("../../../src/assets/images/recaptcha.svg")}
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
