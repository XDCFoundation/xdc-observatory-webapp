import * as React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ChangePassword from "./changePassword";


const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
`;
const Contents = styled.div`
  padding: 10px 40px 10px 20px ;
  display: flex;
  justify-content: space-between;
  align-items: left;
  flex-direction: column;
`;

export default function BasicPopover(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);
 
  const openChangePassword = () => {
    setOpenPasswordBox(true)

  }
  const handleClose = () => {
    setAnchorEl(null);
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
        <Typography style={{marginTop:"13px"}}>CryptoAlex</Typography>
        <img style={{marginTop:"13px"}} src={require("../../../src/assets/images/Dropdown.svg")}></img>
      </ProfileContainer>
      <Popover
        style={{top:"20px", left:"-40px", borderRadius:"30px"}}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}      
      >
        <Contents style={{borderBottom:" solid 1px #f9f9f9"}}>
          <Typography onClick={props.openChangePassword}>Change Password</Typography>
          </Contents>
          <Contents>
          <Typography onClick={(event) => (window.location.href ="logout")}>Log Out</Typography>
        </Contents>
      </Popover>
    </div>
  );
}
