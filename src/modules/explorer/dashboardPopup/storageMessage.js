import React, {useEffect} from 'react'
import {makeStyles} from "@material-ui/styles";
import {sessionManager} from "../../../managers/sessionManager";
import {width} from '@mui/system';
import ManageCookiesDialog from "./manageCookiesDialog"
import {cookiesConstants, userCookiesConstants} from "../../../constants";
import Auth0Service from "../../../services/userLogin";
import { history } from "../../../managers/history";
import NewFeature from '../newFeature';

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
        zIndex: 1,
    },
    containerContent: {
        width: "74.375rem",
        margin: "36px auto 48px auto",
    },
    container1: {
        display: 'flex',
    },
    ourCookiesText: {
        fontFamily: "Inter",
        fontSize: "30px",
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
        width: '100%',
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
            marginTop: '12px',
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
            padding: "0 10px",
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
            marginTop: '12px',
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
    const [isCookiesAccepted, setIsCookiesAccepted] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);


    useEffect(()=>{
        const isCookiesAccepted = sessionManager.getDataFromCookies("isCookiesAccepted");
        if(isCookiesAccepted)
            setIsCookiesAccepted(true)
    })

    const handleManage = () => {
        setOpenDialog(true);
    };
    const closeDialog = () => {
        setOpenDialog(false);
    }
    const openPrivacyPolicy = () => {
        history.push("/privacy-policy");
    }

    const saveMyPreferences = async () => {
        const userInfo = sessionManager.getDataFromCookies("userInfo");
        const cookiesData = []
        cookiesData.push(userCookiesConstants.FUNCTIONAL_COOKIES);
        cookiesData.push(userCookiesConstants.PERFORMANCE_COOKIES);
        cookiesData.push(userCookiesConstants.ANALYTICAL_COOKIES);
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
        setIsCookiesAccepted(true);
    }


    return (
        <>
            {!openDialog ? (!isCookiesAccepted ?
                (<div className="overlay-private-alert">
                    <div className={classes.container}>
                    <div className={classes.containerContent}>
                        <div className={classes.ourCookiesText}>Our Cookies Policy</div>
                        <div className={classes.container1}>
                            {/* <img className={classes.alertIcon} src="/images/XDC-Alert.svg"></img> */}
                            <div className={classes.text}>
                                We use cookies to give you the best possible experience with XDC Observatory. 
                                Some are essential for this site to function; others help us understand how you use the site, so we can improve it. 
                                We may also use targeted cookies for advertising purposes. 
                                Click “Accept all cookies” to proceed as specified, or click “Manage my preferences” to choose the types of cookies you will accept.
                                <br/><br/>
                                You can find out more in our <a className={classes.privacyText} style={{textDecoration: "underline"}} href="/privacy-policy">privacy policy</a> at any time by going to the bottom of any page. 
                            </div>
                            <div className={classes.buttonContainer}>
                            <div className={classes.buttons}>
                                <button className={classes.buttonAccept} onClick={saveMyPreferences}>Accept all cookies</button>    
                                <button className={classes.buttonReject} onClick={handleManage}>Manage my preferences</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                ) : 
                (<NewFeature setIsCookiesAccepted={setIsCookiesAccepted} />)
                ) :
                (<ManageCookiesDialog open={openDialog} close={closeDialog} setIsCookiesAccepted={setIsCookiesAccepted}/>)}
        </>
    )
}
