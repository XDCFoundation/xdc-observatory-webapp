import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import userSignUp from "../../services/createUser"
import { Row } from "simple-flexbox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AuthService from "../../services/userLogin";
import Utility from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import { genericConstants } from "../constants";
import { ToastContainer, toast } from "react-toastify";

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
    width: "15px",
  },
  input: {
    width: "433px",
    height: "40px",
    padding: "12px 19px 11px 19px",
    borderRadius: "6px",
    border: "solid 1px #9fa9ba",
    backgroundColor: "#fff",
  },

  addbtn: {
    width: "433px",
    height: "44px",
    borderRadius: "4.4px",
    border: "solid 0.6px #00a1ed",
    backgroundColor: "#3763dd",
    margin: "15px 15px 30px 15px",
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

  subCategory: {
    marginBottom: "3px",
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
  },
  createaccount: {
    color: "#2149b9",
    fontfamily: "Inter",
    fontsize: "14px",
    cursor: "pointer",
  },
  icon: {
    marginLeft: "-30px",
  },
  xdc: {
    color: "#2a2a2a",
    textAlign: "center",
    marginBottom: "37px",
    fontfamily: "Inter",
    fontsize: "5px",
  },
  heading: {
    fontfamily: "Inter",
    fontweight: "600",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "4px",
  },
  paperWidthSm: {
    position: "absolute",
    top: "65px",
    width: "503px",
    padding: "0 11px",
    borderRadius: "8px",
  },
  termsContainer: {
    flexFlow: "row nowrap",
    display: "flex",
    marginLeft: "24px",
    marginTop: "20px",
  },
  agreeTerms: {
    color: "#2A2A2A",
    textDecoration: "underline",
  },
  checkbox: {
    width: "17px",
    height: "17px",
    marginRight: "8px",
    marginTop: "1px",
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
  },
  signIn: {
    color: "#2149b9",
    cursor: "pointer",
  },

  forgotText: {
    width: "404px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    letterSpacing: "0.58px",
    color: "#4c4c4c",
    marginBottom: "39px",
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
  },
  "@media (max-width: 768px)": {
    paperWidthSm: {
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

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [openSignup, setOpenSignup] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage1, setErrorMessage1] = React.useState("");
  const [errorMessage2, setErrorMessage2] = React.useState("");
  const [errorMessage3, setErrorMessage3] = React.useState("");
  const [errorMessage4, setErrorMessage4] = React.useState("");
  
  
  const [emailError, setEmailError] = useState("");
  const [inputError, setInputError] = useState("");

  console.log("UserName", userName);
  console.log("Email", email);
  console.log("Password", password);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setValue(0);
    }, 1000);
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage1("");
    setErrorMessage2("");
    setErrorMessage3("");
    setErrorMessage4("");
  };

  // <-----------------------------------------------------login functionality------------------------------------------------------>
  

  const handleClickOpenSignup = () => {
    setValue(1);
  };
  const handleOpenForgotPassword = () => {
    setValue(2);
  };

  const login = async () => {
    const reqObj = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      Utility.apiFailureToast(genericConstants.INCORRECT_USERNAME_PASS);
      return;
    }
    const authObject = new AuthService();
    let [error, authResponse] = await Utility.parseResponse(
      authObject.signin(email, password)
    );
    if (error || !authResponse) {
      Utility.apiFailureToast("Wrong email or password");
      // setislogged(true)
    } else {
      sessionManager.setDataInCookies(reqObj);
      sessionManager.setDataInCookies(authResponse);
      sessionManager.setDataInCookies("isLoggedIn", true);
      sessionManager.setDataInLocalStorage("requestBody", reqObj);
      sessionManager.setDataInLocalStorage("userInfo", authResponse);
      sessionManager.setDataInLocalStorage("isLoggedIn", true);
      console.log("responseeee", authResponse);
      Utility.apiSuccessToast("Sign in successfull");
      (window.location.href = "loginprofile")
    }
  };

  // <-------------------------------------------------------SignUp functionality------------------------------------------------------>

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      userName: userName,
      email: email,
      password: password,
    };
    var regExAlphaNum = /^[0-9a-zA-Z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regExPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    // if (!userName || !email || !password) {
    //   toast.error("Enter required field", {
    //     position: "top-center",
    //   });
    // } else
    setErrorMessage1("");
    setErrorMessage2("");
    setErrorMessage3("");
    setErrorMessage4("");
    if (!userName.match(regExAlphaNum)) {
      setErrorMessage1("Enter valid Username");
    } else if (!email.match(mailformat)) {
      setErrorMessage2("Enter valid Email");
    } else if (!password.match(regExPass)) {
      setErrorMessage3(
        "Password must be atleast 5 character long with Uppercase, Lowercase and Number"
      );
    } else if (password !== confirmPassword) {
      setErrorMessage4("Password doesn't match");
    } else {
      toast.success("Sign-up success, check your email", {
        position: "top-center",
      });
      setOpen(false);
      setTimeout(() => {
        setValue(0);
      }, 1000);
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      const response = await userSignUp.postSignUp(data);
      console.log("response:", response);
    }
  };

  const handleClickOpenSignin = () => {
    setValue(0);
  };

  // <-----------------------------------------------------Forgot password functionality---------------------------------------------->

  const forgotpassword = async () => {
    const reqObj = {
      email: email,
    };

    const authObject = new AuthService();
    let [error, authResponse] = await Utility.parseResponse(
      authObject.forgotPassword(email)
    );
    if (error || !authResponse) {
      setEmailError("Please enter a valid email address");
      Utility.apiFailureToast("Wrong email");
    }else {
      Utility.apiSuccessToast("We haveve just sent you an email to reset your password.");
      (window.location.href = "/")
    }
  };

  //------------------------------------------------------------------------------------------------------------------------------------->
  return (
    <div>
      <div className={classes.add}>
        <button className="login-button" onClick={handleClickOpen}>
          <img
            className="Shape2"
            src={require("../../../src/assets/images/Profile.svg")}
          ></img>
        </button>
        <div>
          <Dialog
            classes={{ paperWidthSm: classes.paperWidthSm }}
            className={classes.dialog}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            {value === 0 ? (
              <div>
                {/* <--------------------------------------------------Login Screen-------------------------------------------> */}
                <Row>
                  <DialogTitle
                    className={classes.heading}
                    id="form-dialog-title"
                  >
                    Log in to your account
                  </DialogTitle>
                  <span
                    onClick={handleClose}
                    className={classes.closeContainer}
                  >
                    <img
                      className={classes.close}
                      src={require("../../../src/assets/images/Close.svg")}
                    ></img>
                  </span>
                </Row>
                <DialogContent className={classes.userContainer}>
                  <DialogContentText className={classes.subCategory}>
                    <b>Username</b>
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
                </DialogContent>
                <DialogContent className={classes.passwordContainer}>
                  <DialogContentText className={classes.subCategory}>
                    <b>Password</b>
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
                    className={classes.input}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <span>
                    {passwordShown ? (
                      <VisibilityIcon
                        className={classes.icon}
                        fontSize="small"
                        style={{ color: "#b9b9b9" }}
                        onClick={togglePasswordVisiblity}
                      />
                    ) : (
                      <VisibilityOff
                        className={classes.icon}
                        fontSize="small"
                        style={{ color: "#b9b9b9" }}
                        onClick={togglePasswordVisiblity}
                      />
                    )}
                  </span>
                </DialogContent>
                <DialogActions>
                  <button
                    className={classes.addbtn}
                    // onClick={handleLogin}
                    onClick={() => {
                      // setPasswordValid("");
                      // validateEmail();
                      {
                        !password || !email
                          ? setInputError("Please Enter Input Fields")
                          : login();
                      }
                    }}
                    // onClick={(event) => (window.location.href = "loginprofile")}
                  >
                    Log in{" "}
                  </button>
                  {/* <Link to="/loginprofile" className={classes.addbtn} className="btn btn-primary">Log in</Link> */}
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
              </div>
            ) : value === 1 ? (
              <div>
                {/*<------------------------------------------------ Signup Screen---------------------------------------------> */}
                <Row>
                  <DialogTitle
                    className={classes.heading}
                    id="form-dialog-title"
                  >
                    Sign up in to your account
                  </DialogTitle>
                  <span
                    onClick={handleClose}
                    className={classes.closeContainer}
                  >
                    <img
                      className={classes.close}
                      src={require("../../../src/assets/images/Close.svg")}
                    ></img>
                  </span>
                </Row>
                <DialogContent className={classes.userContainerSignup}>
                  <DialogContentText className={classes.subCategory}>
                    <b>Username</b>
                  </DialogContentText>
                  <input
                    className={classes.input}
                    placeholder="5 to 30 characters in length, only alphanumeric allowed"
                    // name="userName"
                    // value={signUp.userName}
                    onChange={(e) => setUserName(e.target.value)}
                    // onChange={inputEventSignUp}
                  ></input>
                  <div className={classes.error}>{errorMessage1}</div>
                </DialogContent>
                <DialogContent className={classes.userContainerSignup}>
                  <DialogContentText className={classes.subCategory}>
                    <b>Email</b>
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
                  <div className={classes.error}>{errorMessage2}</div>
                </DialogContent>
                <DialogContent className={classes.userContainerSignup}>
                  <DialogContentText className={classes.subCategory}>
                    <b>Password</b>
                  </DialogContentText>
                  <input
                    type="password"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    className={classes.input}
                    onChange={(e) => setPassword(e.target.value)}
                    // name="password"
                    // value={signUp.password}
                    // onChange={inputEventSignUp}
                  ></input>
                  <div className={classes.error}>{errorMessage3}</div>
                </DialogContent>
                <DialogContent className={classes.userContainerSignup}>
                  <DialogContentText className={classes.subCategory}>
                    <b>Confrim Password</b>
                  </DialogContentText>
                  <input
                    type="password"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    className={classes.input}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    // name="confirmPassword"
                    // value={signUp.confirmPassword}
                    // onChange={inputEventSignUp}
                  ></input>
                  <div className={classes.error}>{errorMessage4}</div>
                </DialogContent>
                <div className={classes.termsContainer}>
                  <input className={classes.checkbox} type="checkbox"></input>
                  <span>
                    I agree to the{" "}
                    <span href="#" className={classes.agreeTerms}>
                      Terms and Conditions
                    </span>
                  </span>
                </div>
                <div className={classes.robotContainer}>
                  <div className={classes.robotContainer1}>
                    <div className={classes.robotContainer2}>
                      <input
                        type="checkbox"
                        className={classes.captchaCheckbox}
                      ></input>
                      <span className={classes.robotText}>I'm not a robot</span>
                    </div>
                    <img
                      className={classes.recaptcha}
                      src={require("../../../src/assets/images/recaptcha.svg")}
                    ></img>
                  </div>
                </div>
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
                  <DialogTitle
                    className={classes.heading}
                    id="form-dialog-title"
                  >
                    Forgot Password
                  </DialogTitle>
                  <span
                    onClick={handleClose}
                    className={classes.closeContainer}
                  >
                    <img
                      className={classes.close}
                      src={require("../../../src/assets/images/Close.svg")}
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
                    <b>Email Address</b>
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

                <div className={classes.robotContainerForgotPass}>
                  <div className={classes.robotContainer1}>
                    <div className={classes.robotContainer2}>
                      <input
                        type="checkbox"
                        className={classes.captchaCheckbox}
                      ></input>
                      <span className={classes.robotText}>I'm not a robot</span>
                    </div>
                    <img
                      className={classes.recaptcha}
                      src={require("../../../src/assets/images/recaptcha.svg")}
                    ></img>
                  </div>
                </div>

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
