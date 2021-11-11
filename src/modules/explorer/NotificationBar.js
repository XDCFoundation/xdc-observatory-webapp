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
import utility from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import { cookiesConstants } from "../../constants";
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
export default function TemporaryDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    right: false,
  });
  const [notifications , setNotifications] = React.useState([]);

  const toggleDrawer = (anchor, open) => async(event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log("asxdcvbn", anchor , open);
    setState({ ...state, [anchor]: open });
    if(open){
    const request = {
      "queryObj": {
          "isRead": "false",
          "userID": sessionManager.getDataFromCookies(cookiesConstants.USER_ID)
      },
      "selectionString": ["description" , "payload"]
      
  }
  const [error ,response] = await utility.parseResponse(NotificationService.getNotificationList(request));
  console.log("test", response);
  setNotifications(response)
}
   

  };

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
          <div className="Notification-header-text-color-fade">Clear</div>
        </NoticationClear>
        <div className={classes.drawerHeader}>
        {/* <CloseIcon  onClick={toggleDrawer(anchor, false)} /> */}
          <IconButton
            style={{ color: "White" }}
            onClick={toggleDrawer(anchor, false)}
          >
            {theme.direction === "rtl" ? <CloseIcon  /> : <CloseIcon />}
          </IconButton>
        </div>
      </ListItems>
      {notifications && notifications.length && notifications.map((notification)=>(
         <List className="side-box">
         <ul className="inside-side-box">
           <a className="Notification_details_button ">
             <div className="Notificationtext">
               {notification.description}
             </div>
           </a>
           <div className="Notification-text-color-fade">
           {notification?.payload?.timestamp}
           </div>
           <hr className="notification-hr" />
         </ul>
       </List>
      ))}
     

      {/* <List className="side-box">
        <ul className="inside-side-box">
          <a className="Notification_details_button ">
            <div className="Notificationtext">500 XDC sent from JohnB</div>
          </a>
          <div className="Notification-text-color-fade">
            8:12 AM, 6 Jun 2021
          </div>
          <hr className="notification-hr" />
        </ul>
      </List>

      <List className="side-box">
        <ul className="inside-side-box">
          <a className="Notification_details_button ">
            <div className="Notificationtext">
              3,141 XDC received in My Wallet
            </div>
          </a>
          <div className="Notification-text-color-fade">
            10:30 AM, 29 May 2021
          </div>
          <hr className="notification-hr" />
        </ul>
      </List> */}
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
