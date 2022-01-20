import React from 'react'
import { makeStyles } from "@material-ui/styles";
import { sessionManager } from "../../../managers/sessionManager";
import { width } from '@mui/system';
import ManageCookiesDialog from "./manageCookiesDialog"

const useStyles = makeStyles((theme) => ({

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
        justifyContent: "space-between",
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
    manageText: {
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "1.36",
        textAlign: "center",
        color: "#81b4ff",
        marginBottom: "21px",
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
    },
    buttonAccept: {
        width: "120px",
        height: "38px",
        borderRadius: "4px",
        backgroundColor: "#4878ff",
        marginRight: "23px",
        fontFamily: "Inter",
        fontSize: "15px",
        fontWeight: "500",
        textAlign: "center",
        color: "#ffffff",
    },
    buttonReject: {
        width: "120px",
        height: "38px",
        borderRadius: "4px",
        backgroundColor: "#9fa9ba",
        fontFamily: "Inter",
        fontSize: "15px",
        fontWeight: "500",
        textAlign: "center",
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
        manageText: {
            marginTop: "20px",
            marginBottom: "10px",
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
    },

}));


export default function StorageMessage() {
    const classes = useStyles();

    const [storageMessage, setStorageMessage] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleStorageMessage = () => {
        setStorageMessage(true);
        sessionManager.setDataInCookies(true, "isStorageMessage");
    };
    const handleManage = () => {
        setOpenDialog(true);
    };
    const closeDialog = () => {
        setOpenDialog(false);
    }


    return (
        <>
        {!storageMessage ?
        (<div className={classes.container}>
            <div className={classes.containerContent}>
                <div className={classes.ourCookiesText}>Our Cookies Policy</div>
                <div className={classes.container1}>
                    {/* <img className={classes.alertIcon} src="/images/XDC-Alert.svg"></img> */}
                    <div className={classes.text}>
                        We use only essential cookies for storing and/on access profile information on a device.
                        This includes features to create Watchlists, Transaction Labels and Address Tags.
                        Even if you reject the cookies, you can still use this website but you will not be able to access features linked with your profile.
                        <br /><br />
                        You can find out more in our privacy policy at any time by going to the bottom of any page. 
                    </div>
                    <div className={classes.line}></div>
                    <div>
                        <div className={classes.manageText}>
                            Manage cookies preferences
                        </div>
                        <div className={classes.buttons}>
                            <button className={classes.buttonAccept} onClick={handleStorageMessage}>Accept all</button>
                            <ManageCookiesDialog open={openDialog} close={closeDialog} />
                            <button className={classes.buttonReject} onClick={handleManage}>Manage</button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>):("")}
        </>
    )
}
