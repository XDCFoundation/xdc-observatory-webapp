import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Row, Column } from "simple-flexbox";
import { history } from "../../managers/history";
import utility from "../../utility";
import Utility from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import AuthService from "../../services/userLogin";
import Loader from '../../assets/loader'
import { genericConstants } from "../../constants";
import { cookiesConstants } from "../../constants"

const useStyles = makeStyles((theme) => ({
    text: {
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        width: "330px",
        fontFamily: "Inter",
        fontSize: "22px",
        fontWeight: "600",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        textAlign: "center",
        color: "#2a2a2a",

    },
    backButtonMobile: {
        display: "none",
      },
    add: {
        backgroundColor: "#2149b9",
        marginLeft: "90px",
        display: "flex",
        justifyContent: "center",
    },
    dialogBox: {
        position: "absolute",
        top: "65px",
        width: "503px",
        borderRadius: "12px",
    },
    closeContainer: {
        top: "26px",
        fontWeight: "500",
        position: "absolute",
        right: "30px",
        cursor: "pointer",
        // "@media (min-width:0px) and (max-width:767px)": {
        //     display: "none !important",
        // }
    },

    icon: {
        marginLeft: "-48px",
        marginBottom: "4px",
        cursor: "pointer"
    },
    addbtn: {
        width: "433px",
        height: "44px",
        borderRadius: "4.4px",
        border: "solid 0.6px #00a1ed",
        backgroundColor: "#3763dd",
        // margin: "10px 0px 20px 0px",
        margin: "10px 5px 10px 12px",
        color: "white",
        '@media(max-width: 768px)': {
            width: "421px"
        }
    },
    subCategory: {
        margin: "10px 5px 10px 5px",
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",

        color: "#2a2a2a",
    },
    passwordText: {

        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",

        color: "#2a2a2a",
    },
    heading: {
        alignItems: "center",
        justifyContent: "center",
        height: "445px",
        "@media (min-width:500px) and (max-width:768px)": {
            width: "100% !important",
            flexFlow: "column nowrap ",
            display: "flex !important",
            maxWidth: "fit-content",
            margin: "0 auto",
            justifyContent: "flex-start !important",
        },
    },
    "@media only screen and (min-device-width : 320px) and (max-device-width : 480px)": {
        mobileDiv: {
            marginTop: "15px",
            marginLeft: "-5px",
            marginRight: "0px",
        }, text: {
            textAlign: "center",
        },
        mobileText: {
            fontWeight: "500",
        },
        mobileHeader: {
            fontSize: "16px",
        },
    },

    error: {
        color: "red",
        marginLeft: "2px",
    },
    pass: {
        fontWeight: "500px"
    },
    "@media (min-width:0px) and (max-width:767px)": {
        dialogBox: {
            width: "100% !important",
            height: "100% !important",
            borderRadius: "0px !important",
            maxWidth: "768px !important",
            top: "33px",
            marginLeft: "auto",
            marginRight: "auto",
        },
        backButtonMobile: {
            position: "absolute",
            cursor: "pointer",
            display: "block",
        }, 
        closeContainer: {
            display: "none !important",
        },
    }, 
}));

export default function ChangePassword(props) {
    const classes = useStyles();
    const [newInput, setNewInput] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [currentInput, setCurrentInput] = React.useState("");
    const [isError, setIsError] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [errorPassword, setErrorPassword] = React.useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = React.useState("");
    const [errorEmptyField, setErrorEmptyField] = React.useState("");
    const [passwordShown1, setPasswordShown1] = React.useState(false);
    const [openChangePassword, setOpenChangePassword] = React.useState(false);
    const togglePasswordVisiblity1 = () => {
        setPasswordShown1(passwordShown1 ? false : true);
    };
    const [passwordShown2, setPasswordShown2] = React.useState(false);
    const togglePasswordVisiblity2 = () => {
        setPasswordShown2(passwordShown2 ? false : true);
    };
    const [passwordShown3, setPasswordShown3] = React.useState(false);
    const togglePasswordVisiblity3 = () => {
        setPasswordShown3(passwordShown3 ? false : true);
    };

    var regExPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    const handleClose = () => {
        history.push("/loginprofile")
        setOpenChangePassword(props.openChangePassword);
    };

    const updatepassword = async () => {
        let userInfo = sessionManager.getDataFromCookies("userInfo");
        const reqObj = {
            email: userInfo.email,
            userId: userInfo.sub,
            oldPassword: currentInput,
            newPassword: newInput,
        };

        setLoading(true)
        setError("")
        setErrorPassword("");
        setErrorConfirmPassword("");
        setErrorEmptyField("");

        if (!currentInput && !newInput && !confirmPassword) {
            setLoading(false);
            setErrorEmptyField(genericConstants.ENTER_REQUIRED_FIELD);
        } else if (!currentInput) {
            setLoading(false);
            setError(genericConstants.ENTER_REQUIRED_FIELD);
        } else if (!newInput) {
            setLoading(false);
            setErrorPassword(genericConstants.ENTER_REQUIRED_FIELD);
        } else if (!confirmPassword) {
            setLoading(false);
            setErrorConfirmPassword(genericConstants.ENTER_REQUIRED_FIELD);
        } else if (!newInput.match(regExPass)) {
            setErrorPassword(
                "Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols."
            );
            setLoading(false);
        } else if (currentInput === newInput) {
            setErrorPassword("New password cannot be same as old password");
        } else if (newInput !== confirmPassword) {
            setErrorConfirmPassword("Password doesn't match");
            setLoading(false);
        } else {
            const authObject = new AuthService();
            let [error, authResponse] = await Utility.parseResponse(
                authObject.changePassword(reqObj)
            );
            if (error || !authResponse) {
                setLoading(false);
                // utility.apiFailureToast("failed");
                setErrorConfirmPassword("Failed to Change Password");
            } else {
                setLoading(false);
                const authObject = new AuthService();
                await Utility.parseResponse(authObject.logout(userInfo.sub));
                Utility.apiSuccessToast("Password changed successfully");
                sessionManager.removeDataFromCookies("userId");
                sessionManager.removeDataFromCookies("userInfo");
                sessionManager.removeDataFromCookies("isLoggedIn");
                sessionManager.removeDataFromCookies(cookiesConstants.USER_ID);
                sessionManager.removeDataFromCookies(cookiesConstants.USER_PICTURE);
                setInterval((window.location.href = "/dashboard"), 3000);
            }
        }
    };

    return (
        <Dialog
            // className={classes.dialog}
            classes={{ paperWidthSm: classes.dialogBox }}
            open
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent className={classes.heading}>
                <div onClick={handleClose} className={classes.backButtonMobile}>
                    <img src="/images/backButton.svg" alt="back"/>
                </div>
                <Row justifyContent="center" marginTop="8px">
                    <DialogContentText className={classes.text}>
                        <b className={classes.mobileHeader}>Change Password</b>
                    </DialogContentText>
                    <span
                        onClick={props.openChangePassword}
                        className={classes.closeContainer}
                    >
                        <img
                            className={classes.close}
                            src={"/images/XDC-Cross.svg"}
                        />
                    </span>
                </Row>
                <Column>
                {errorEmptyField ? <div className={classes.error}>{errorEmptyField}</div> : <></>}
                    <DialogContentText className={classes.subCategory}>
                        <span className={classes.pass}>Current Password</span>
                        <input
                            type={passwordShown1 ? "text" : "password"}
                            id="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            className="change-password-input"
                            onChange={(e) => {
                                {
                                    setCurrentInput(e.target.value);
                                    setError("");
                                }
                            }}
                        />
                        {passwordShown1 ? (
                            <img
                                src={"/images/show.svg"}
                                className={classes.icon}
                                onClick={togglePasswordVisiblity1}
                            />
                        ) : (
                            <img
                                src={"/images/hide.svg"}
                                className={classes.icon}
                                onClick={togglePasswordVisiblity1}
                            />
                        )}
                        <div className={classes.error}>{error}</div>
                    </DialogContentText>
                    <DialogContentText className={classes.subCategory}>
                        <span className={classes.pass}>New Password</span>
                        <input
                            type={passwordShown2 ? "text" : "password"}
                            id="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            className="change-password-input"
                            onChange={(e) => {
                                {
                                    setNewInput(e.target.value);
                                    setErrorPassword("");
                                }
                            }}
                        />
                        {passwordShown2 ? (
                            <img
                                src={"/images/show.svg"}
                                className={classes.icon}
                                onClick={togglePasswordVisiblity2}
                            />
                        ) : (
                            <img
                                src={"/images/hide.svg"}
                                className={classes.icon}
                                onClick={togglePasswordVisiblity2}
                            />
                        )}
                        <div className={classes.error}>{errorPassword}</div>
                    </DialogContentText>
                    <DialogContentText className={classes.subCategory}>
                        <span className={classes.pass}>Confirm Password</span>
                        <input
                            type={passwordShown3 ? "text" : "password"}
                            id="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            className="change-password-input"
                            onChange={(e) => {
                                {
                                    setConfirmPassword(e.target.value);
                                    setErrorConfirmPassword("");
                                }
                            }}
                        />
                        {passwordShown3 ? (
                            <img
                                src={"/images/show.svg"}
                                className={classes.icon}
                                onClick={togglePasswordVisiblity3}
                            />
                        ) : (
                            <img
                                src={"/images/hide.svg"}
                                className={classes.icon}
                                onClick={togglePasswordVisiblity3}
                            />
                        )}
                        <div className={classes.error}>{errorConfirmPassword}</div>
                    </DialogContentText>
                    {isLoading == true ? (
                        <div>

                            <Loader />
                        </div>

                    ) : (
                        <div></div>
                    )}

                    <DialogActions className={classes.mobileDiv}
                        style={{
                            padding: 0,
                            //  alignItems: "center",
                            justifyContent: "center",
                            marginTop: "15px",
                            // marginLeft: "-5px",
                            // paddingRight : "0"
                        }}
                    >
                        {/* <div style={{ color: "red" }}> {isError}</div> */}
                        <button
                            className={classes.addbtn
                            }
                            onClick={() => {
                                updatepassword();
                            }}
                            type="button"
                        >
                            Update Password{" "}
                        </button>
                    </DialogActions>

                </Column>
            </DialogContent>
        </Dialog>
    );
}
