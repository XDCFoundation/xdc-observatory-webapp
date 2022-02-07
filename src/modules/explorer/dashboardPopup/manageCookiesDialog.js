import React, {useEffect} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {makeStyles} from "@material-ui/styles";
import {SettingsPowerRounded} from '@material-ui/icons';
import {flexbox} from '@mui/system';
import {sessionManager} from "../../../managers/sessionManager";
import {cookiesConstants, userCookies, userCookiesConstants} from "../../../constants";
import Auth0Service from "../../../services/userLogin";

const useStyles = makeStyles((theme) => ({
    dialogBox: {
        maxWidth: "680px",
        width: "100%",
        borderRadius: "12px",
        zIndex: "100000"
    },
    headingContainer: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "21px",
        paddingBottom: "20px",
        borderBottom: "solid 1px #e3e7eb",

    },
    heading: {
        fontFamily: "Inter",
        fontSize: "22px",
        fontWeight: "600",
        textAlign: "center",
        color: "#2a2a2a",
    },
    close: {
        position: "absolute",
        right: "21px",
        marginTop: "7px",
        cursor: "pointer",
    },
    back: {
        display: "none",
    },
    contentContainer: {
        padding: "0px 21px 26px 21px",
    },
    alwaysActive: {
        fontFamily: "Inter",
        fontsize: "14px",
        fontWeight: "500",
        color: "#4878ff",
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "32px",
    },
    subHeading: {
        fontSize: "18px",
        fontWeight: "600",
        fontFamily: "Inter",
    },
    para: {
        marginTop: "14px",
        fontFamily: "Inter",
        lineHeight: "1.33",
        color: "#585858",
    },
    buttons: {
        display: "flex",
        justifyContent: 'space-between',
        paddingTop: "23px",
        borderTop: "solid 1px #e3e7eb",
    },
    acceptAll: {
        width: "211px",
        height: "38px",
        borderRadius: "4px",
        border: "solid 1px #4878ff",
        backgroundcolor: "#ffffff",
        textAlign: "center",
        color: "#4878ff",
        display:'flex',
        flexDirection:"column",
        justifyContent:"center"
    },
    savePref: {
        width: "211px",
        borderRadius: "4px",
        height: "38px",
        border: "solid 1px #4878ff",
        backgroundColor: "#4878ff",
        textAlign: "center",
        color: "#ffffff",
        display:'flex',
        flexDirection:"column",
        justifyContent:"center"
    },
    "@media (min-width:0px) and (max-width: 767px)": {
        acceptAll: {
            marginRight: "15px",
        },
        dialogBox: {
            maxWidth: "676px",
            width: "100%",
            borderRadius: "0px",
            margin: "0 auto",
            position: "absolute",
            height: "100%",
            top: "69px",
        },
        close: {
            display: "none",
        },
        back: {
            display: "block",
            position: "absolute",
            left: "15px",
            marginTop: "3px",
            cursor: "pointer",
        },
        heading: {
            fontSize: "20px",
        },
    }


}));

export default function ManageCookiesDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [functionalCookies, setFunctionalCookies] = React.useState(false);
    const [performanceCookies, setPerformanceCookies] = React.useState(false);
    const [analyticalCookies, setAnalyticalCookies] = React.useState(false);
    const classes = useStyles();

    useEffect(() => {
        fetchCookies()
    }, [])

    const fetchCookies = async () => {
        const userInfo = sessionManager.getDataFromCookies("userInfo");
        if (!userInfo) {
            //If user is not logged in
            const userCookies = sessionManager.getDataFromCookies(cookiesConstants.USER_COOKIES);
            if(!userCookies)
                sessionManager.removeDataFromCookies("isCookiesAccepted");
            if (userCookies && userCookies.includes(userCookiesConstants.FUNCTIONAL_COOKIES))
                setFunctionalCookies(true);
            if (userCookies && userCookies.includes(userCookiesConstants.PERFORMANCE_COOKIES))
                setPerformanceCookies(true);
            if (userCookies && userCookies.includes(userCookiesConstants.ANALYTICAL_COOKIES))
                setAnalyticalCookies(true);
        } else {
            //If user is logged in
            const userCookiesDetails = await new Auth0Service().getUserCookies({userId: userInfo.sub});
            if (userCookiesDetails &&  userCookiesDetails.cookiesAllowed && userCookiesDetails.cookiesAllowed.length) {
                if (userCookiesDetails.cookiesAllowed.includes(userCookiesConstants.FUNCTIONAL_COOKIES))
                    setFunctionalCookies(true);
                if (userCookiesDetails.cookiesAllowed.includes(userCookiesConstants.PERFORMANCE_COOKIES))
                    setPerformanceCookies(true);
                if (userCookiesDetails.cookiesAllowed.includes(userCookiesConstants.ANALYTICAL_COOKIES))
                    setAnalyticalCookies(true);
            }else{
                sessionManager.removeDataFromCookies("isCookiesAccepted");
            }
        }
    }

    const handleClose = () => {
        setOpen(props.close)
    }
    const handleSwitchOn1 = () => {
        setFunctionalCookies(true);
    }
    const handleSwitchOff1 = () => {
        setFunctionalCookies(false);
    }
    const handleSwitchOn2 = () => {
        setPerformanceCookies(true);
    }
    const handleSwitchOff2 = () => {
        setPerformanceCookies(false);
    }
    const handleSwitchOn3 = () => {
        setAnalyticalCookies(true);
    }
    const handleSwitchOff3 = () => {
        setAnalyticalCookies(false);
    }

    const saveMyPreferences = async (isForAll) => {
        const userInfo = sessionManager.getDataFromCookies("userInfo");
        const cookiesData = []
        if (!isForAll) {
            functionalCookies && cookiesData.push(userCookiesConstants.FUNCTIONAL_COOKIES);
            performanceCookies && cookiesData.push(userCookiesConstants.PERFORMANCE_COOKIES);
            analyticalCookies && cookiesData.push(userCookiesConstants.ANALYTICAL_COOKIES);
        }
        else{
            cookiesData.push(userCookiesConstants.FUNCTIONAL_COOKIES);
            cookiesData.push(userCookiesConstants.PERFORMANCE_COOKIES);
            cookiesData.push(userCookiesConstants.ANALYTICAL_COOKIES);

            setFunctionalCookies(true);
            setPerformanceCookies(true);
            setAnalyticalCookies(true);
        }
        //if user is not logged in
        if (!userInfo) {
            sessionManager.setDataInCookies(cookiesData, cookiesConstants.USER_COOKIES);
        } else {
            //if user is logged in
            const userCookiesDetails = await new Auth0Service().updateUserCookies({
                userId: userInfo.sub,
                cookiesAllowed: cookiesData
            });
        }
        sessionManager.setDataInCookies(true, "isCookiesAccepted");
        props.setIsCookiesAccepted(true)
        handleClose();
    }

    return <div>
        <Dialog
            classes={{paperWidthSm: classes.dialogBox}}
            open={props.open}
            close={handleClose}
        >
            <div className={classes.headingContainer}>
                <span className={classes.back} onClick={handleClose}>
                    <img src={"/images/backButton.svg"} alt="back"/>
                </span>
                <span className={classes.heading}>Manage Consent Preferences</span>
                <span className={classes.close} onClick={handleClose}>
                <img src={"/images/XDC-Cross.svg"}/>
              </span>
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.container}>
                    <div className={classes.subHeading}>Strictly necessary Cookies</div>
                    <span className={classes.alwaysActive}>Always active</span>
                </div>
                <div className={classes.para}>
                    These cookies are necessary to allow you to browse the Website and use Website functions.
                    Without these cookies the Website would not function properly.
                    These cookies do not collect your Personal Data.
                </div>
                <div className={classes.container}>
                    <div className={classes.subHeading}>Functional Cookies</div>
                    {functionalCookies ?
                        <img className={classes.activSwitch} onClick={handleSwitchOff1}
                             src="/images/active-switch.svg"/> :
                        <img className={classes.inactivSwitch} onClick={handleSwitchOn1}
                             src="/images/inactive-switch.svg"/>}
                </div>
                <div className={classes.para}>
                    These cookies allow websites to remember your chosen preferences (such as your language settings).
                    They allow us to provide you with improved functions.
                    It is not possible for us to personally identify you using the information collected by these
                    cookies
                </div>
                <div className={classes.container}>
                    <div className={classes.subHeading}>Performance cookies</div>
                    {performanceCookies ?
                        <img className={classes.activSwitch} onClick={handleSwitchOff2}
                             src="/images/active-switch.svg"/> :
                        <img className={classes.inactivSwitch} onClick={handleSwitchOn2}
                             src="/images/inactive-switch.svg"/>}
                </div>
                <div className={classes.para}>
                    These cookies assist us in understanding how visitors interact with the Website by providing
                    information about the visited pages, the time spent on the Website, and error messages in case of
                    technical problems.
                    This helps us to improve the performance of our websites. We use these cookies only if you have
                    consented via the cookie banner.
                </div>
                <div className={classes.container}>
                    <div className={classes.subHeading}>Analytical cookies</div>
                    {analyticalCookies ?
                        <img className={classes.activSwitch} onClick={handleSwitchOff3}
                             src="/images/active-switch.svg"/> :
                        <img className={classes.inactivSwitch} onClick={handleSwitchOn3}
                             src="/images/inactive-switch.svg"/>}
                </div>
                <div className={classes.para}>
                    We use analytical cookies to see, for example, which content on the Website is highly frequented and
                    to analyse if content should be updated or improved.
                    These cookies are also used to provide you with personalized content based on the pages you have
                    shown interest in.
                    We use these cookies only if you have consented via the cookie banner.
                </div>
                <div className={classes.buttons}>
                    <div className={classes.acceptAll+" cursor-pointer"} onClick={()=>saveMyPreferences(true)}>Accept all cookies</div>
                    <div className={classes.savePref + " cursor-pointer"} onClick={()=>saveMyPreferences(false)}>Save my preferences</div>
                </div>
            </div>
        </Dialog>
    </div>;
}
