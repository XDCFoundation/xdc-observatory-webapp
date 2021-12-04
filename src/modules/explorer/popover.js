


import * as React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ChangePassword from "./changePassword";
import { sessionManager } from "../../managers/sessionManager";
import AuthService from "../../services/userLogin";
import Utility from "../../utility";
import { cookiesConstants } from "../../constants";
import { NavLink } from "react-router-dom";
import LoginDialog from "../explorer/loginDialog"

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
  cursor: pointer;
`;
const Contents = styled.div`
  padding: 10px 2px 10px 2px;
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
  display: inline
`;


const Profile = styled.button`
  background: none;
`;

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);
  const [openLoginBox, setOpenLoginBox] = React.useState(false)
    const [loginDialogIsOpen, setLoginDialogIsOpen] = React.useState(false)
    const closeLoginDialog = () => setLoginDialogIsOpen(false)

  const openChangePassword = () => {
    setOpenPasswordBox(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isloggedIn = sessionManager.getDataFromCookies("isLoggedIn");
  const logOut = async () => {
    Utility.apiSuccessToast("Logout Successfully");
    sessionManager.removeDataFromCookies("userId");
    sessionManager.removeDataFromCookies("userInfo");
    sessionManager.removeDataFromCookies("isLoggedIn");
    sessionManager.removeDataFromCookies(cookiesConstants.USER_ID);
    sessionManager.removeDataFromCookies(cookiesConstants.USER_PICTURE);
    (window.location.href = "/dashboard")
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const setUserName=()=>{
    let name=sessionManager.getDataFromCookies("userInfo")
    if(!name){
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
    {!isloggedIn ? 
    (<ProfileContainer>
    {<LoginDialog open={loginDialogIsOpen} onClose={closeLoginDialog}/>}
    </ProfileContainer>):(

      <ProfileContainer onClick={handleClick} Open Popover>
      
        <img
          className="Shape2-internal"
          style={{ borderRadius: "50px" }}
          src={sessionManager.getDataFromCookies(cookiesConstants.USER_PICTURE) || require("../../../src/assets/images/Profile.svg")}
        />
        <span className="userName-internal">{setUserName()==="" ? (""):(Utility.shortenUserName(setUserName()))}</span>
        <img
          className="down-arrow-internal"
          src={require("../../../src/assets/images/Dropdown.svg")}
        />
      </ProfileContainer>)}
      <Popover
        style={{ top: "55px", marginLeft: "-40px", borderRadius: "30px",width: "100%",height: "100%"}}
        id={id}
        open={open}
       anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
          
        }}
      >
        <Contents style={{ borderBottom: " solid 1px #f9f9f9" }}>
          <Text style={{ marginRight: "20px"}} onClick={props.openChangePassword} >Change Password</Text>
        </Contents>
        <Contents >
          <Text style={{ marginRight: "auto" }} onClick={() => logOut()}>Log out</Text>
        </Contents>
      </Popover>
    </div>
  );
}
