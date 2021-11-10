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

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 115px;
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);

  const openChangePassword = () => {
    setOpenPasswordBox(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    Utility.apiSuccessToast("Logout Successfully");
    sessionManager.removeDataFromCookies("userId");
    sessionManager.removeDataFromCookies("userInfo");
    sessionManager.removeDataFromCookies("isLoggedIn");
    sessionManager.removeDataFromCookies(cookiesConstants.USER_ID);
    (window.location.href = "/dashboard")
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <ProfileContainer onClick={handleClick} Open Popover>
        <img
          className="Shape2-internal"
          src={require("../../../src/assets/images/Profile.svg")}
        />
        <p className="name-internal">CryptoAlex</p>
        <img
          className="down-arrow-internal"
          src={require("../../../src/assets/images/Dropdown.svg")}
        ></img>
      </ProfileContainer>
      <Popover
        style={{ top: "20px", left: "-40px", borderRadius: "30px" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Contents style={{ borderBottom: " solid 1px #f9f9f9" }}>
          <Text onClick={props.openChangePassword}>Change Password</Text>
        </Contents>
        <Contents>
          <Text onClick={() => logOut()}>LogOut</Text>
        </Contents>
      </Popover>
    </div>
  );
}
