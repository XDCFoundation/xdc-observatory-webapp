import * as React from "react";
import Popover from "@material-ui/core/Popover";
import styled from "styled-components";
import { sessionManager } from "../../managers/sessionManager";
import Utility from "../../utility";
import { cookiesConstants } from "../../constants";
import LoginDialog from "../explorer/loginDialog";
import AuthService from "../../services/userLogin";
import { Avatar } from "@material-ui/core";
import { history } from "../../managers/history";
import ManageCookiesDialog from "./dashboardPopup/manageCookiesDialog";
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
  display: inline;
`;

export default function BasicPopover(props) {
  const [openPopOver, setOpenPopOver] = React.useState(false);

  const handleClick = () => {
    !manageCookiesPopup && setOpenPopOver(true)
  };

  // const [openPasswordBox, setOpenPasswordBox] = React.useState(false);
  // const [openLoginBox, setOpenLoginBox] = React.useState(false)
  const [loginDialogIsOpen, setLoginDialogIsOpen] = React.useState(false);
  const [manageCookiesPopup, setManageCookiesPopup] = React.useState(false);
  const [openCP, setOpen] = React.useState(false);
  const closeLoginDialog = () => setLoginDialogIsOpen(false);

  const openMyProfile = () => {
    history.push("/loginprofile");
  };
  const openChangePassword = () => {
    setOpen(props.openChangePassword);
    handleClose()
  };

  const handleClose = () => {
    setOpenPopOver(false)
  };

  const openCookiesDialog = () => {
    setManageCookiesPopup(true);
    handleClose()
  };

  const closeCookiesDialog = () => {
    setManageCookiesPopup(false);
    handleClose()
  };

  const isloggedIn = sessionManager.getDataFromCookies("isLoggedIn");
  const userId = sessionManager.getDataFromCookies("userId");
  const logOut = async () => {
    const authObject = new AuthService();
    // let [error, authResponse] =
    if (
      sessionManager.getDataFromCookies(
        cookiesConstants.AUTHENTICATION_PROVIDER
      ) === "AUTH0"
    ) {
      await Utility.parseResponse(authObject.logout(userId));
    }
    Utility.apiSuccessToast("Logout Successfully");
    sessionManager.removeDataFromCookies("userId");
    sessionManager.removeDataFromCookies("userInfo");
    sessionManager.removeDataFromCookies("isLoggedIn");
    sessionManager.removeDataFromCookies(cookiesConstants.USER_ID);
    sessionManager.removeDataFromCookies(cookiesConstants.USER_PICTURE);
    sessionManager.removeDataFromCookies(cookiesConstants.ACCESS_TOKEN);
    sessionManager.removeDataFromCookies(
      cookiesConstants.AUTHENTICATION_PROVIDER
    );
    sessionManager.removeDataFromCookies(cookiesConstants.ID_TOKEN);
    window.location.href = "/dashboard";
  };

  const setUserName = () => {
    let name = sessionManager.getDataFromCookies("userInfo");
    if (!name) {
      let userName = "";
      return userName;
    } else {
      let userName = name.name;
      return userName;
    }
  };
  // const setUserImage = () => {
  //   let name = sessionManager.getDataFromCookies("userInfo");

  //   let userName = name.profilePic;
  //   return userName;
  // };
let p =sessionManager.getDataFromCookies(
  cookiesConstants.USER_PICTURE
)
  return (
    <div>
      {!isloggedIn ? (
        <ProfileContainer>
          {<LoginDialog theme={props.theme} open={loginDialogIsOpen} onClose={closeLoginDialog} />}
        </ProfileContainer>
      ) : (
        <ProfileContainer onClick={() => handleClick()} Open Popover>
          {/* <img
            className="Shape2-internal"
            style={{ borderRadius: "50px" }}
            src={
              sessionManager.getDataFromCookies(
                cookiesConstants.USER_PICTURE
              ) || '/images/Profile.svg'
            }
          /> */}
          <ManageCookiesDialog
            open={manageCookiesPopup}
            close={closeCookiesDialog}
            setIsCookiesAccepted={() => {}}
            theme={props.theme}
          />
          <Avatar
            className="profile"
            src={
              sessionManager.getDataFromCookies(
                cookiesConstants.USER_PICTURE
              ) || "/images/Profile.svg"
            }
          />
          <span className="userName-internal">
            {setUserName() === "" ? "" : Utility.shortenUserName(setUserName())}
          </span>
          <img className="down-arrow-internal" src={"/images/Dropdown.svg"} />
        </ProfileContainer>
      )}
      <Popover
        style={{
          top: "50px",
          marginLeft: "-40px",
          borderRadius: "30px",
          width: "100%",
          height: "100%",
        }}
        open={openPopOver}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={props.theme === "dark" ? "table-btn-bg-dark" : ""}>
        <Contents style={props.theme === "dark" ? { borderBottom: "none" } : { borderBottom: " solid 1px #f9f9f9" }}>
          <Text style={{ marginRight: "auto" }}>
            <a href="/loginprofile" className={props.theme === "dark" ? "profile-links fc-white" : "profile-links"}>
              {" "}
              My Profile
            </a>
          </Text>
        </Contents>
        {sessionManager.getDataFromCookies(
          cookiesConstants.AUTHENTICATION_PROVIDER
        ) &&
        sessionManager.getDataFromCookies(
          cookiesConstants.AUTHENTICATION_PROVIDER
        ) === "AUTH0" ? (
          <Contents style={props.theme === "dark" ? { borderBottom: "none" } : { borderBottom: " solid 1px #f9f9f9" }}>
            <Text className={props.theme === "dark" ? "fc-white" : ""} style={{ marginRight: "20px", whiteSpace: "nowrap" }} onClick={openChangePassword}>
              Change Password 
            </Text>
          </Contents>
        ) : (
          "" 
        )}
        <Contents>
          <Text
            style={{ marginRight: "auto" }}
            onClick={() => openCookiesDialog()}
            className={props.theme === "dark" ? "fc-white" : ""}
          >
            Manage Cookies
          </Text>
        </Contents>
        <Contents>
          <Text className={props.theme === "dark" ? "fc-white" : ""} style={{ marginRight: "auto" }} onClick={() => logOut()}>
            Log out
          </Text>
        </Contents>
        </div>
      </Popover>
    </div>
  );
}
