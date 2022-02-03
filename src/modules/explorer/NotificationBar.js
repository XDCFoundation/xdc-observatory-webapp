import * as React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import {NotificationService} from "../../services";
import utility, {dispatchAction} from "../../utility";
import {sessionManager} from "../../managers/sessionManager";
import {eventConstants, genericConstants} from "../../constants";
import moment from "moment";
import {connect} from "react-redux";
import Badge from "@mui/material/Badge";

const NoticationClear = styled.div`
  display: flex;
`;


const ListItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
  @media (min-width: 0px) and (max-width: 767px) {

    // margin-top: 4rem;


  }


`;


const drawerWidth = 340;
const useStyles = makeStyles((theme) => ({
    paper: {
        top: "4.938rem",
        width: drawerWidth,
        backgroundColor: "#102e84",
    },
    drawerHeader: {
        marginTop: "8px"
    },
    "@media (max-width: 1240px)": {
        paper: {
            top: "8.375rem",
        },
        drawerHeader: {
            marginTop: "6px"
        }
    },
    "@media (min-width: 0px) and (max-width: 767px)": {
        paper: {
            top: "0",
            height: "50.75",
            width: "13.313rem",
        },
    },
    "@media (max-width: 449px)": {
        paper: {

            width: "13.313rem",
        },
    },
}));

function TemporaryDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [state, setState] = React.useState({
        right: false,
    });
    const [notifications, setNotifications] = React.useState([]);
    const [isNotifications , setIsNotification] = React.useState(true);
    const toggleDrawer = (anchor, open) => async (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({...state, [anchor]: open});
        if (open) {
            await getNotificationList();
        }
    };

    React.useEffect(() => {
        getNotificationList();
      }, []);

    const getNotificationList = async (type) => {
        const request = {
            "queryObj": {
                "isCleared": false,
                "userID": sessionManager.getDataFromCookies("userId"),
                // "userID": "auth0|618df53538dad1006f2c6163",
                "type": "push"
            },
            "selectionString": ["description", "payload"]
        }
        props.dispatchAction(eventConstants.SHOW_LOADER, true)
        const [error, response] = await utility.parseResponse(NotificationService.getNotificationList(request));
        props.dispatchAction(eventConstants.HIDE_LOADER, true)

        if (error || !response) {
            // utility.apiFailureToast(error?.message && typeof (error.message) === "string" ? error.message : genericConstants.CANNOT_GET_NOTIFICATIONS);
            return;
        }
        const parseRes = response.map((notification) => {
            return {
                timestamp: notification?.payload?.timestamp,
                description: notification.description,
                _id: notification?._id
            }
        })
        if(parseRes.length>0)
            setIsNotification(false);
        setNotifications(parseRes)
    }
    const clearNotification = async () => {
        let notificationIdArray = [];
        notifications.map(notification => {
            notificationIdArray.push(notification._id)
        })
        props.dispatchAction(eventConstants.SHOW_LOADER, true)
        const [error] = await utility.parseResponse(NotificationService.markNotificationCleared({notificationIDArray: notificationIdArray}));
        props.dispatchAction(eventConstants.HIDE_LOADER, true)
        if (error) {
            utility.apiFailureToast(error?.message ? error.message : genericConstants.CANNOT_CLEAR_NOTIFICATIONS);
            return;
        }
        await getNotificationList();
    }

    const list = (anchor) => (
        <div
            style={{paddingBottom: "100px"}}
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <ListItems>
                <NoticationClear>
                    <div className="Notification-header-color">Notifications</div>
                    <div className="Notification-header-text-color-fade cursor-pointer" onClick={clearNotification}>Clear</div>
                </NoticationClear>
                <div className={classes.drawerHeader}>
                    {/* <CloseIcon  onClick={toggleDrawer(anchor, false)} /> */}
                    <IconButton
                        style={{color: "White", margin: "2px 5px -10px 0"}}
                        onClick={toggleDrawer(anchor, false)}
                    >
                        {theme.direction === "rtl" ? <CloseIcon/> : <CloseIcon/>}
                    </IconButton>
                </div>
            </ListItems>
            {notifications && notifications.length !==0 ?
                <>
                {
                    notifications &&  notifications.map((notification) => (
                <List className="side-box">
                    <ul className="inside-side-box">
                        <a className="Notification_details_button ">
                            <div className="Notificationtext">
                                {notification.description}
                            </div>
                        </a>
                        <div className="Notification-text-color-fade">
                            {notification && notification.timestamp && moment.unix(notification.timestamp).format("HH:mm A, DD MMM YYYY")}

                        </div>
                        <hr className="notification-hr"/>
                    </ul>
                </List>
            ))
                }
            </>
            : <p className="sidebar_notification">No Notification</p>
          }
        </div>
    );

    return (
        <div>
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div
                        style={{padding: "0px", background: "none"}}
                    >
                    <div className="noticonDiv"> 
                    
                    <Badge color="error" overlap="circular" badgeContent="" variant="dot" invisible={isNotifications}>
                        <img
                            className="noticon"
                            src={'/images/notifications.svg'}
                            onClick={toggleDrawer(anchor, true)}

                        />
                    </Badge> 
                    </div>
                        <Drawer
                            classes={{paper: classes.paper}}
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {user: state.user};
};
export default connect(mapStateToProps, {dispatchAction})(TemporaryDrawer);

