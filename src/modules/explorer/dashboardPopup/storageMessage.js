import React from 'react'
import { makeStyles } from "@material-ui/styles";
import { sessionManager } from "../../../managers/sessionManager";

const useStyles = makeStyles((theme) => ({

    container: {
        width: "100%",
        background: "#102e84",
        position: "fixed",
        bottom: "0",
        zIndex: 1,
    },
    containerContent: {
        display: "flex",
        width: "74.375rem",
        margin: "22px auto 22px auto",
        justifyContent: "space-between",
    },
    container1: {
        display: "flex",
        width: "950px"
    },
    alertIcon: {
        width: "30px",
        height: "30px",
        margin: "auto",
    },
    text :{
        paddingLeft: "24px",
        color: "#ffffff",
        fontFamily: "Inter !important",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "1.36",
        letterSpacing: "0px",
    },
    button: {
        width: "163px",
        height: "38px",
        borderRadius: "4px",
        backgroundColor: "#4878ff",
        fontFamily: "Inter",
        fontSize: "15px",
        fontWeight: "600",
        color: "#ffffff"
    },

    "@media (min-width:768px) and (max-width: 1240px)": {
        containerContent: {
            maxWidth: "664px",
            width: "100%",
            flexDirection: "column"
        },
        container1: {
            maxWidth: "664px",
            width: "100%"
        },
        button: {
            margin: "5px auto 0 auto",
        },
    },
    "@media (min-width:0px) and (max-width: 767px)": {
        containerContent: {
            maxWidth: "360px",
            width: "100%",
            flexDirection: "column"
        },
        container1: {
            maxWidth: "360px",
            width: "100%"
        },
        text :{
            fontSize: "12px",
            paddingLeft: "12px",
        },
        button: {
            margin: "5px auto 0 auto",
        },
    },

}));


export default function StorageMessage() {
    const classes = useStyles();

    const [storageMessage, setStorageMessage] = React.useState(false);
    const handleStorageMessage = () => {
        setStorageMessage(true);
        sessionManager.setDataInCookies(true, "isStorageMessage");
    };
  
    return (
        <>
        {!storageMessage ?
        (<div className={classes.container}>
            <div className={classes.containerContent}>
                <div className={classes.container1}>
                    <img className={classes.alertIcon} src="/images/XDC-Alert.svg"></img>
                    <div className={classes.text}>
                        To protect your privacy, data related to the Watchlists, Transaction Labels and Address Tags, is added on your local device. Cleaning the browsing history or cookies will clean the data saved in your profile.
                    </div>
                </div>
                <div>
                    <button className={classes.button} onClick={handleStorageMessage}>I Understand</button>
                </div>
            </div>
        </div>):("")}
        </>
    )
}
