import * as React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import { NotificationService } from "../../services";
import utility, { dispatchAction } from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import { cookiesConstants, eventConstants } from "../../constants";
import moment from "moment";
import { connect } from "react-redux";

const NoticationClear = styled.div`
  display: flex;
`;

const ListItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
`;

const drawerWidth = 340;
const useStyles = makeStyles((theme) => ({
  paper: {
    top: "4.938rem",
    width: drawerWidth,
    backgroundColor: "#102e84",
  },
}));
function TemporaryDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    right: false,
  });
  const [notifications, setNotifications] = React.useState([]);

  const toggleDrawer = (anchor, open) => async (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log("asxdcvbn", anchor, open);
    setState({ ...state, [anchor]: open });
    if (open) {
      await getNotificationList();
    }
  };
  const getNotificationList = async () => {
    const request = {
      "queryObj": {
        "isCleared": "false",
        "userID": sessionManager.getDataFromCookies(cookiesConstants.USER_ID)
      },
      "selectionString": ["description", "payload"]

    }
    props.dispatchAction(eventConstants.SHOW_LOADER, true)
    const [error, response] = await utility.parseResponse(NotificationService.getNotificationList(request));
    props.dispatchAction(eventConstants.HIDE_LOADER, true)

    if (error) {
      utility.apiFailureToast("Can't get notifications");
      return;
    }
    const parseRes = response.map((notification) => {
      return {
        timestamp: notification?.payload?.timestamp,
        description: notification.description,
        _id: notification?._id
      }
    })
    setNotifications(parseRes)
  }
  const clearNotification = async () => {
    let notificationIdArray = [];
    notifications.map(notification => {
      notificationIdArray.push(notification._id)
    })
    props.dispatchAction(eventConstants.SHOW_LOADER, true)
    const [error, response] = await utility.parseResponse(NotificationService.markNotificationCleared({ notificationIDArray: notificationIdArray }));
    props.dispatchAction(eventConstants.HIDE_LOADER, true)
    if (error) {
      utility.apiFailureToast("Can't clear notifications");
      return;
    }
    console.log("clearNotification", response);
    await getNotificationList();
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItems>
        <NoticationClear>
          <div className="Notification-header-color">Notifications</div>
          <div className="Notification-header-text-color-fade" onClick={clearNotification}>Clear</div>
        </NoticationClear>
        <div className={classes.drawerHeader}>
          {/* <CloseIcon  onClick={toggleDrawer(anchor, false)} /> */}
          <IconButton
            style={{ color: "White" }}
            onClick={toggleDrawer(anchor, false)}
          >
            {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </ListItems>
      {notifications && notifications.length && notifications.map((notification) => (
        <List className="side-box">
          <ul className="inside-side-box">
            <a className="Notification_details_button ">
              <div className="Notificationtext">
                {notification.description}
              </div>
            </a>
            <div className="Notification-text-color-fade">
              {notification && notification.timestamp && moment.unix(notification.timestamp).format("HH:mm A DD MMM YYYY")}

            </div>
            <hr className="notification-hr" />
          </ul>
        </List>
      ))}
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            style={{ padding: "0px", background: "none" }}
          >
            <img
              className="noticon"
              src={require("../../assets/images/notification.png")}
              onClick={toggleDrawer(anchor, true)}

            ></img>
            <Drawer
              classes={{ paper: classes.paper }}
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(TemporaryDrawer);

