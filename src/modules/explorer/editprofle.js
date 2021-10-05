import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import AccountProfile from "./accountProfile";
import { NavLink } from "react-router-dom";
import { history } from "../../managers/history";
import { Link } from "@material-ui/core";
import styled from 'styled-components';


const useStyles = makeStyles((theme) => ({
  add: {
    // marginLeft: "80%",
    // backgroundColor: "#f5f8fa",
    // fontFamily: "Roboto",
    // fontStyle: "normal",
    backgroundColor: "#2149b9",
    marginLeft: "90px"
  },
  btn: {
    // border: "none !important",
    // color: "black",
    // textTransform: "unset",
    // backgroundColor: "#f5f8fa",
    // marginLeft: "-60px",
    // "&:hover":{backgroundColor: "#f5f8fa"}
    // marginLeft: "90px"
  },
  value: {
    width: "400px !important",
  },
  cross: {
    marginTop: "25px",
    marginLeft: "40px",
    fontWeight: "500",
    cursor: "pointer"
  },
  dialog: {
    marginLeft: "10%",
    marginTop: "2px",
    width: "80% !important",
    height: "80% !important",
    borderRadius: "50px !important"
  },
  input: {
    width: "340px",
    height: "40px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
  },
  addbtn: {
    width: "340px",
    height: "35px",
    borderRadius: "4.4px",
    border: "solid 0.6px #00a1ed",
    backgroundColor: "#3763dd",
    margin: "10px 30px 20px 20.5px",
    color: "white",
  },
  subCategory: {
    marginTop: "4px",
    marginBottom: "4px",
    // fontWeight: "50px",
    fontfamily: "Inter",
    fontsize: "14px",
    fontweight: "500",
    border: "none !important",
    outline: "none"
  },
  forgotpass: {
    color: "#2149b9",
    marginLeft: "123px"
  },
  createaccount: {
    color: "#2149b9",
    marginLeft: "32px",
    fontfamily: "Inter",
    fontsize: "14px",
  },
  icon: {
    marginLeft: "-30px"
  },
  xdc: {
    color: "#2a2a2a",
    marginLeft: "30px",
    fontfamily: "Inter",
    fontsize: "5px",
  },
  heading: {
    marginLeft: "60px",
    fontfamily: "Inter",
    fontweight: "600"
  }
}));
const Wrapper=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
padding-top:20px;`;

const Title=styled.div`
font-family: Inter;
font-size: 22px;
font-weight: 600;
text-align: center;
  color: #2a2a2a;
  
 
  
 
`;
const UserImg=styled.div`
height:50px;
width:50px;
border-radius:50%;
  
 
  
 
`;

const Cut =styled.div`

padding-right: 25px;
    padding-top: 7px;
    
    display:flex;
    align-content: flex-end;
}`;

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}

  };

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleLogin = () => {
    history.push("/loginprofile")
    // window.location("/loginprofile")

  }

  return (
    <div>

      <div className={classes.add}>
        <button
          className="login-button"

          onClick={handleClickOpen}
        >
          <img className="Shape2" src={require("../../../src/assets/images/Profile.svg")}></img>
        </button>

        <div>
          <Dialog
            className={classes.dialog}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
           <Wrapper>
              <div></div>
              <Title>Edit Profile</Title>
              
              <Cut onClick={handleClose} >
                {" "}
                X{" "}
              </Cut>
              </Wrapper>
              <UserImg src="images/user.svg"/>
           
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Username</b>
              </DialogContentText>
              <input className={classes.input}></input>
            </DialogContent>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Email</b>
               
              </DialogContentText>

              <input type="password" type={passwordShown ? "text" : "password"} className={classes.input}></input>
              <span>
                {passwordShown ? <VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity} /> : <VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity} />}
               
              </span>
            </DialogContent>
            <DialogActions>
              <button className={classes.addbtn} onClick={handleLogin}
                onClick={event => window.location.href = 'loginprofile'}

              >Update Profile </button>
              {/* <Link to="/loginprofile" className={classes.addbtn} className="btn btn-primary">Log in</Link> */}
            </DialogActions>
            <div className={classes.value}></div>
           
          </Dialog>
        </div>
      </div>

    </div>
  );
}
