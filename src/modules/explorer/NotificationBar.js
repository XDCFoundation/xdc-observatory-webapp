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

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
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
          <IconButton
            style={{ color: "White" }}
            onClick={toggleDrawer(anchor, false)}
          >
            {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </ListItems>
      <List className="side-box">
        <ul className="inside-side-box">
          <a className="Notification_details_button ">
            <div className="Notificationtext">
              10,000 XDC received in My Wallet
            </div>
          </a>
          <div className="Notification-text-color-fade">
            10:30 AM, 9 Jun 2021
          </div>
          <hr className="notification-hr" />
        </ul>
      </List>

      <List className="side-box">
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
      </List>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{ padding: "0px", background: "none" }}
          >
            <img
              className="noticon"
              src={require("../../assets/images/notification.png")}
            ></img>
            <Drawer
              classes={{ paper: classes.paper }}
              anchor={anchor}
              open={state[anchor]}
              // onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
}
