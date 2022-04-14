import * as React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "../../assets/styles/custom.css";
import styled from "styled-components";
import { NotificationService } from "../../services";
import utility, { dispatchAction } from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import { eventConstants, genericConstants } from "../../constants";
import moment from "moment";
import { connect } from "react-redux";
import Badge from "@mui/material/Badge";
import Loader from "../../assets/loader";

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
    top: "78px",
    width: drawerWidth,
    backgroundColor: "#102e84",
  },
  drawerHeader: {
    marginTop: "8px",
  },
  dateClearContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "280px",
    width: "100%",
  },
  textDone: {
    color: "White", 
    margin: "23px 20px 0 0",
    cursor: "pointer",
  },
  selectAllCheckbox: {
    margin: "26px -12px 0px 23px",
  },
  singleCheckbox: {
    margin: "7px -2px 0 15px"
  },
  "@media (max-width: 1240px)": {
    paper: {
      top: "8.375rem",
    },
    drawerHeader: {
      marginTop: "6px",
    },
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
  const [deletableNotification, setDeletableNotification] = React.useState([]);
  const [totalNotification, setTotalNotification] = React.useState(0);
  const [watchedNotification, setWatchedNotification] = React.useState(0);
  const [isEditOpen, setEditOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const toggleDrawer = (anchor, open) => async (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    if (open) {
      if (totalNotification != 0) {
        sessionManager.setDataInCookies(totalNotification, "notificationCount");
      }
      await getNotificationList();
    } else {
      setDeletableNotification([]);
      handleDone()
    }
  };

  React.useEffect(() => {
    getNotificationList();
  }, []);
  const getNotificationList = async (type) => {
    const request = {
      queryObj: {
        isCleared: false,
        userID: sessionManager.getDataFromCookies("userId"),
        // "userID": "auth0|618df53538dad1006f2c6163",
        type: "push",
      },
      selectionString: ["description", "payload"],
    };
    setLoading(true);
    props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error, response] = await utility.parseResponse(
      NotificationService.getNotificationList(request)
    );
    props.dispatchAction(eventConstants.HIDE_LOADER, true);
    setLoading(false);

    if (error || !response) {
      // utility.apiFailureToast(error?.message && typeof (error.message) === "string" ? error.message : genericConstants.CANNOT_GET_NOTIFICATIONS);
      return;
    }
    const parseRes = response.map((notification) => {
      return {
        timestamp: notification?.payload?.timestamp,
        description: { splitted: notification.description.split(" ") },
        _id: notification?._id,
      };
    });

    setTotalNotification(parseRes.length);
    setWatchedNotification(
      sessionManager.getDataFromCookies("notificationCount")
    );
    setNotifications(parseRes);
  };

  const handleEdit = () => {
    setEditOpen(true);
  }
  const handleDone = () => {
    setEditOpen(false);
    
  }
  const clearNotification = async () => {
    setLoading(true);
    let notificationIdArray = [];
    deletableNotification.map((notification) => {
      notificationIdArray.push(notification.id);
    });
    props.dispatchAction(eventConstants.SHOW_LOADER, true);
    const [error] = await utility.parseResponse(
      NotificationService.markNotificationCleared({
        notificationIDArray: notificationIdArray,
      })
    );
    props.dispatchAction(eventConstants.HIDE_LOADER, true);
    if (error) {
      utility.apiFailureToast(
        error?.message
          ? error.message
          : genericConstants.CANNOT_CLEAR_NOTIFICATIONS
      );
      return;
    }
    await getNotificationList();
  };

  const handleChanged = (event) => {
    const { name, checked } = event.target;
    if (name === "allselect") {
      let tempNotification = notifications.map((item) => {
        return { ...item, isChecked: checked };
      });
      setNotifications(tempNotification);
      let tempNotify = tempNotification.filter((item) => {
        if (item.isChecked === true) {
          return item;
        }
      });

      setDeletableNotification(
        tempNotify.map((item) => {
          return {
            description: item.description,
            id: item._id
          };
        })
      );
    } else {
      let tempNotification = notifications.map((item) =>
        item._id === name ? { ...item, isChecked: checked } : item
      );
      setNotifications(tempNotification);
      let tempNotify = tempNotification.filter((item) => {
        if (item.isChecked === true) {
          return item;
        }
      });
      setDeletableNotification(
        tempNotify.map((item) => {
          return {
            description: item.description,
            id: item._id
          };
        })
      );
    }
  };

  const list = (anchor) => (
    <div
      style={{ paddingBottom: "100px" }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!isEditOpen ? 
      <ListItems>
        <NoticationClear>
          <div className="Notification-header-color">Notifications</div>
          {/* <div
            className="Notification-header-text-color-fade cursor-pointer"
            onClick={clearNotification}
          >
            Clear all
          </div> */}
          {/* <div
            className="Notification-header-text-color-fade cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </div> */}
        </NoticationClear>
        <div className={classes.drawerHeader}>
          <IconButton
            style={{ color: "White", margin: "2px 5px -10px 0" }}
            onClick={toggleDrawer(anchor, false)}
          >
            {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </ListItems> : <ListItems>
      <NoticationClear>
        <input className={classes.selectAllCheckbox} 
          onChange={handleChanged}
          type="checkbox"
          name="allselect"
          checked={
            notifications.filter((item) => item?.isChecked == true)
              .length == notifications.length
            } />
          <div className="Notification-header-color">Select All</div>
          <div
            className={deletableNotification.length > 0 ? "Notification-header-text-color-fade cursor-pointer" : "Notification-header-text-color-fade"}
            onClick={clearNotification}
            disabled={deletableNotification.length > 0 ? false : true}
          >
            Delete
          </div>
        </NoticationClear>
          <div className={classes.textDone}
            onClick={handleDone}
          >
            Done</div>
        </ListItems>}
        {isLoading && <Loader />}
      {!isLoading && notifications && notifications.length !== 0 ? (
        <>
          {notifications &&
            notifications.map((notification) => (
              <div>
              <List className="side-box display-flex flex-direction-row-imp">
                {isEditOpen ? <input className={classes.singleCheckbox}
                  key={notification._id}
                  name={notification._id}
                  onChange={handleChanged}
                  type="checkbox"
                  checked={notification?.isChecked || false}
                  />: <></>}
                <ul className="inside-side-box">
                  <a className="Notification_details_button ">
                    <div className="Notificationtext">
                      <span>{notification.description.splitted[0]}&nbsp;</span>
                      <span>{notification.description.splitted[1]}&nbsp;</span>
                      <span>{notification.description.splitted[2]}&nbsp;</span>
                      <span>{notification.description.splitted[3]}&nbsp;</span>
                      <span>{notification.description.splitted[4]}&nbsp;</span>
                      <span>
                        {window.innerWidth > 767
                          ? utility.shortenAddress(
                              notification.description.splitted[5],
                              20,
                              4,
                              3
                            )
                          : utility.shortenAddress(
                              notification.description.splitted[5],
                              10,
                              4,
                              3
                            )}
                      </span>
                    </div>
                  </a>
                  <div className={classes.dateClearContainer}>
                    <div className="Notification-text-color-fade">
                      {notification &&
                        notification.timestamp &&
                        moment
                          .unix(notification.timestamp)
                          .format("HH:mm A, DD MMM YYYY")}
                    </div>
                  </div>
                </ul>
              </List>
              <hr className="notification-hr" />
              </div>
            ))}
        </>
      ) : (
        !isLoading && <p className="sidebar_notification">No Notification</p>
      )}
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div style={{ padding: "0px", background: "none" }}>
            <div className="noticonDiv">
              <Badge
                color="error"
                overlap="circular"
                badgeContent=""
                variant="dot"
                invisible={
                  totalNotification <= watchedNotification ? true : false
                }
              >
                <img
                  className="noticon"
                  src={"/images/notifications.svg"}
                  onClick={toggleDrawer(anchor, true)}
                />
              </Badge>
            </div>
            <Drawer
              classes={{ paper: classes.paper }}
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
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(TemporaryDrawer);
