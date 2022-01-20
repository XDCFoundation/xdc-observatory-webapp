import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/styles";
import { SettingsPowerRounded } from '@material-ui/icons';
import { flexbox } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    dialogBox: {
        maxWidth: "680px",
        width: "100%",
        borderRadius: "12px",
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
        paddingTop: "5px",
    },
    savePref: {
        width: "211px",
        height: "38px",
        borderRadius: "4px",
        border: "solid 1px #4878ff",
        backgroundColor: "#4878ff",
        textAlign: "center",
        color: "#ffffff",
        paddingTop: "5px",
    }

}));

export default function ManageCookiesDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [active1, setActive1] = React.useState(false);
    const [active2, setActive2] = React.useState(false);
    const [active3, setActive3] = React.useState(false);
    const classes = useStyles();
    const handleClose = () => {
        setOpen(props.close)
    }
    const handleSwitchOn1 = () => {
        setActive1(true);
    }
    const handleSwitchOff1 = () => {
        setActive1(false);
    }
    const handleSwitchOn2 = () => {
        setActive2(true);
    }
    const handleSwitchOff2 = () => {
        setActive2(false);
    }
    const handleSwitchOn3 = () => {
        setActive3(true);
    }
    const handleSwitchOff3 = () => {
        setActive3(false);
    }

  return <div>
      <Dialog
      classes={{ paperWidthSm: classes.dialogBox }}
      open={props.open}
      close={handleClose}
      >
        <div  className={classes.headingContainer}>
              <span className={classes.heading}>Manage Consent Preferences</span>
              <span  className={classes.close} onClick={handleClose}>
                <img src={"/images/XDC-Cross.svg"} />
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
                {active1 ?
                    <img className={classes.activSwitch} onClick={handleSwitchOff1} src="/images/active-switch.svg" /> :
                    <img className={classes.inactivSwitch} onClick={handleSwitchOn1} src="/images/inactive-switch.svg" /> }
            </div>
            <div className={classes.para}>
                These cookies allow websites to remember your chosen preferences (such as your language settings). 
                They allow us to provide you with improved functions. 
                It is not possible for us to personally identify you using the information collected by these cookies
            </div>
            <div className={classes.container}>
                <div className={classes.subHeading}>Performance cookies</div>
                {active2 ?
                    <img className={classes.activSwitch} onClick={handleSwitchOff2} src="/images/active-switch.svg" /> :
                    <img className={classes.inactivSwitch} onClick={handleSwitchOn2} src="/images/inactive-switch.svg" /> }
            </div>
            <div className={classes.para}>
                These cookies assist us in understanding how visitors interact with the Website by providing information about the visited pages, the time spent on the Website, and error messages in case of technical problems. 
                This helps us to improve the performance of our websites. We use these cookies only if you have consented via the cookie banner.
            </div>
            <div className={classes.container}>
                <div className={classes.subHeading}>Analytical cookies</div>
                {active3 ?
                    <img className={classes.activSwitch} onClick={handleSwitchOff3} src="/images/active-switch.svg" /> :
                    <img className={classes.inactivSwitch} onClick={handleSwitchOn3} src="/images/inactive-switch.svg" /> }
            </div>
            <div className={classes.para}>
            We use analytical cookies to see, for example, which content on the Website is highly frequented and to analyse if content should be updated or improved. 
            These cookies are also used to provide you with personalized content based on the pages you have shown interest in. 
            We use these cookies only if you have consented via the cookie banner.
            </div>
            <div className={classes.buttons}>
                <div className={classes.acceptAll}>Accept all cookies</div>
                <div className={classes.savePref}>Save my prefrences</div>
            </div>
        </div>
      </Dialog>
  </div>;
}
