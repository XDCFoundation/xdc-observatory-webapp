import * as React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ChangePassword from "./changePassword";
import { sessionManager } from "../../managers/sessionManager";
import Utility from "../../utility";
import { cookiesConstants } from "../../constants";
import Dialog from "@material-ui/core/Dialog";
import { NavLink } from "react-router-dom";
import { makeStyles, mergeClasses } from "@material-ui/styles";


const useStyles = makeStyles((theme) => ({
  paperWidthSm: {
    position: "absolute",
    top: "65px",
    width: "503px",
    padding: "0 11px",
    borderRadius: "12px",
  },
}));


const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
  cursor: pointer;
`;
const Contents = styled.div`
  padding: 10px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: left;
  flex-direction: column;
`;

const Text = styled.button`
  background: none;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: #2a2a2a;
`;


const Profile = styled.button`
  background: none;
`;

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openLoginBox, setOpenLoginBox] = React.useState(false)
  const userLoginOpen = ()=>{
    let userInfo = sessionManager.getDataFromCookies("userId");
    console.log(userInfo,"ideeee");
    return userInfo
  }
  const classes = useStyles();
 // console.log(userInfo,"ideeee");
 const userLogin=()=> {
   if(userLoginOpen()){
    setOpen(true);

   }

 }

  

  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);

  const openChangePassword = () => {
    setOpenPasswordBox(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenLoginBox(false)
  };

  const logOut = async () => {
    Utility.apiSuccessToast("Logout Successfully");
    sessionManager.removeDataFromCookies("userId");
    sessionManager.removeDataFromCookies("userInfo");
    sessionManager.removeDataFromCookies("isLoggedIn");
    sessionManager.removeDataFromCookies(cookiesConstants.USER_ID);
    sessionManager.removeDataFromCookies("USER_PICTURE")
    (window.location.href = "/dashboard")
  };
  //const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const setUserName = () => {
    let name = sessionManager.getDataFromCookies("userInfo")
    if (!name) {
      let userName = ""
      return userName
    } else {
      let userName = name.name
      return userName
    }
  }
  const setUserImage = () => {
    let name = sessionManager.getDataFromCookies("userInfo");

    let userName = name.profilePic;
    return userName;

  };

  return (
    <div>
      <ProfileContainer onClick={userLogin} Open Popover>
        <img
          className="Shape2-internal"
          style={{ borderRadius: "50px" }}
          src={sessionManager.getDataFromCookies(cookiesConstants.USER_PICTURE) || require("../../../src/assets/images/Profile.svg")}
        />
        <span className="profile-name-popover">{setUserName() === "" ? ("") : (Utility.shortenUserName(setUserName()))}</span>
        <img
          className="down-arrow-internal"
          src={require("../../../src/assets/images/Dropdown.svg")}
        />
        <Dialog
            classes={{ paperWidthSm: classes.paperWidthSm }}
            className={classes.dialog}
            open={openLoginBox}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          ></Dialog>
      </ProfileContainer>
      <Popover
        style={{ top: "20px", left: "-40px", borderRadius: "30px" }}
        id={id}
        open={open}
       // anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Contents style={{ borderBottom: " solid 1px #f9f9f9" }}>
          <Text style={{ marginRight: "35px" }} onClick={props.openChangePassword}>Change Password</Text>
        </Contents>
        <Contents >
          <Text style={{ marginRight: "100px" }} onClick={() => logOut()}>Log out</Text>
        </Contents>
      </Popover>
    </div>
  );
}
