import utility from "../../utility";
import Utility from "../../utility";
import { sessionManager } from "../../managers/sessionManager";
import AuthService from "../../services/userLogin";
import AwsService from "../../services/awsService";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import React, { useMemo, useEffect, useState, useRef } from "react";
import AvatarUpload from "./AvatarUpload";
import { makeStyles } from "@material-ui/styles";
import { useDropzone } from "react-dropzone";
import { history } from "../../managers/history";
import styled from "styled-components";
import { cookiesConstants } from "../../constants";

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const useStyles = makeStyles((theme) => ({
  add: {
    // backgroundColor: "#2149b9",
  },
  error: {
    color: "red",
    marginLeft: "2px",
    marginBottom: "-10px",
  },
  btn: {},
  value: {
    width: "400px !important",
  },
  cross: {
    marginTop: "25px",
    marginLeft: "40px",
    fontWeight: "500",
    cursor: "pointer",
  },
  dialog: {
    marginLeft: "10%",
    marginTop: "2px",
    width: "80% !important",
    height: "80% !important",
    borderRadius: "50px !important",
  },
  paper: {
    width: "31.438rem",
    alignSelf: "flex-start",
    margin: "100px auto",
    borderRadius: "12px",
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
    width: "100%",
    height: "40px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    //backgroundColor: "red",
    margin: "0px 26px 35px 26px",
    color: "white",
  },
  subCategory: {
    marginTop: "4px",
    marginBottom: "4px",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "500",
    border: "none !important",
    outline: "none",
    color: "#2a2a2a",
  },
  forgotpass: {
    color: "#2149b9",
    marginLeft: "123px",
  },
  createaccount: {
    color: "#2149b9",
    marginLeft: "32px",
    fontfamily: "Inter",
    fontsize: "14px",
  },
  icon: {
    marginLeft: "-30px",
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
    fontweight: "600",
  },
}));
const activeStyle = {
  borderColor: "#2196f3",
};
const baseStyle = {
  borderRadius: 5,

  height: "104px",
  width: "400px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  color: "#ACACAC",
  // border: "0.3px dashed var(--unnamed-color-acacac)",
  border: "0.30000001192092896px dashed #ACACAC",
  // marginTop: 5,
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
`;
const Upload = styled.div`
  display: block;
  cursor: pointer;
  padding-left: 11.2rem;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  color: #2149b9;
`;
const Image = styled.img`
  width: 100%;
  height: 145px;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const Title = styled.div`
  font-family: Inter;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  color: #2a2a2a;
  margin-left: auto;
  margin-right: auto;
`;
const ProfilePicContainer = styled.div``;

const Cut = styled.div`
  position: absolute;
  right: 28px;
  margin-top: 4px;
`;
const Input = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export default function FormDialog(props) {
  const classes = useStyles();
  const [opens, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [userName, setUserName] = React.useState("");
  const [userNameError, setUserNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [isEditPicture, setIsEditPicture] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");
  const [email, setEmail] = React.useState("");
  const fileData = (event) => {
    setIsEditPicture(true);
    setUploadFile(event);
  };
  // const changeColor =async()=>{

  //   setColor({backgroundColor:"red"})

  // }
  var regExAlphaNum = /^[0-9a-zA-Z]+$/;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const updateUser = async (url) => {
    let userInfo = sessionManager.getDataFromCookies("userInfo");
    let userId = sessionManager.getDataFromCookies("userId");
    setLoading(true);

    const reqObj = {
      name: userName,
      userId: userId,
      email: email,
      profilePic: url ? url : profilePicture,
    };

    if (!userName.match(regExAlphaNum)) {
      setUserNameError("Enter valid Username");
      setLoading(false);
      return;
    } else if (!email.match(mailformat)) {
      setEmailError("Enter valid Email");
      setLoading(false);
    } else {
      const authObject = new AuthService();
      let [error, authResponse] = await Utility.parseResponse(
        authObject.updateUser(reqObj)
      );
      if (authResponse?.email.length > 2) {
        setLoading(false);
      }
      if (error || !authResponse) {
        utility.apiFailureToast("User Exists");
        setLoading(false);
      } else {
        utility.apiSuccessToast("Profile upadated successfully", {
          autoClose: 10000,
        });
        sessionManager.setDataInCookies(authResponse, "userInfo");
        sessionManager.setDataInCookies(true, "isLoggedIn");
        sessionManager.setDataInCookies(authResponse.userId, "userId");
        history.push("/loginprofile");
        handleClose();
        // window.location.href = "loginprofile";
        return authResponse;
      }
    }
  };
  const updateUserName = async (url) => {
    let userInfo = sessionManager.getDataFromCookies("userInfo");
    let userId = sessionManager.getDataFromCookies("userId");
    setLoading(true);

    const reqObj = {
      name: userName,
      userId: userId,
      // email: email,
      profilePic: url ? url : profilePicture,
    };

    if (!userName.match(regExAlphaNum)) {
      setUserNameError("Enter valid Username");
      setLoading(false);
      return;
    } else if (!email.match(mailformat)) {
      setEmailError("Enter valid Email");
      setLoading(false);
    } else {
      const authObject = new AuthService();
      let [error, authResponse] = await Utility.parseResponse(
        authObject.updateUser(reqObj)
      );
      if (authResponse?.email.length > 2) {
        setLoading(false);
      }
      if (error || !authResponse) {
        utility.apiFailureToast("User Exists");
        setLoading(false);
      } else {
        utility.apiSuccessToast("Profile upadated successfully", {
          autoClose: 10000,
        });
        sessionManager.setDataInCookies(authResponse, "userInfo");
        sessionManager.setDataInCookies(true, "isLoggedIn");
        sessionManager.setDataInCookies(authResponse.userId, "userId");
        history.push("/loginprofile");
        handleClose();
        // window.location.href = "loginprofile";
        return authResponse;
      }
    }
  };

  const uploadFileToS3 = async () => {
    setLoading(true);
    let userInfo = sessionManager.getDataFromCookies("userInfo");
    let formdata = new FormData();
    formdata.append("file", uploadFile);
    formdata.append("path", "profilePic");
    const awsObject = new AwsService();
    let [error, awsResponse] = await Utility.parseResponse(
      awsObject.updateUser(formdata)
    );
    if (awsResponse[0].url.length > 2) {
      setLoading(false);
    }
    if (error || !awsResponse) {
      utility.apiFailureToast(" Upload failed");
      return false;
    } else {
      if (userInfo.name === userName && userInfo.email === email) {
        utility.apiSuccessToast("Pic uploaded successfully");
        setLoading(false);
        history.go(0);
      }
      sessionManager.setDataInCookies(
        awsResponse[0].url,
        cookiesConstants.USER_PICTURE
      );
      setProfilePicture(awsResponse[0].url);
      return awsResponse;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserNameError("");
    setEmailError("");
    setTimeout(() => {
      setUsernameEnable(false);
      setEmailEnable(false);
      setUserName(getUserName);
      setEmail(getEmail);
    }, 500);
  };

  const handleLogin = () => {
    history.push("/loginprofile");
    // window.location("/loginprofile")
  };

  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleUpload = (event) => {
    setFiles(event.target.files[0]);
  };

  const ImageThumb = ({ image }) => {
    return <Image src={URL.createObjectURL(image)} alt={image.name} />;
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const thumbs = files.map((file) => <div style={thumb} key={file.name}></div>);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const filepath = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };
  const [usernameEnable, setUsernameEnable] = React.useState(false);
  const [emailEnable, setEmailEnable] = React.useState(false);

  const profileUrl = async () => {
    let userInfo = sessionManager.getDataFromCookies("userInfo");
    let response = {};
    if (isEditPicture) {
      response = await uploadFileToS3();
      if (!response) return;
      setProfilePicture(response[0].url);
    }
    if (userInfo.name !== userName || userInfo.email !== email) {
      
      if (userInfo.name !== userName && userInfo.email === email) {
        
        let upadteUser = await updateUserName(response[0]?.url);
        
      } else {
        
        let upadteUser = await updateUser(response[0]?.url);
        
      }
    
    }
   
    handleClose();

  };
  const getUserName = () => {
    let name = sessionManager.getDataFromCookies("userInfo");
    let userName = name.name;
    return userName;
  };

  const getEmail = () => {
    let name = sessionManager.getDataFromCookies("userInfo");
    let userName = name.email;
    return userName;
  };
  useEffect(() => {
    let userInfo = sessionManager.getDataFromCookies("userInfo");
    if (userInfo) {
      setUserName(userInfo.name);
      setEmail(userInfo.email);
      setProfilePicture(
        sessionManager.getDataFromCookies(cookiesConstants.USER_PICTURE)
      );
    }
  }, []);
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,

      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );
  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width } = windowDimensions;

  return (
    <div className={classes.add}>
      <div
        onClick={
          width >= 760
            ? handleClickOpen
            : () => {
                history.push("/edit-profile");
              }
        }
        className="edit"
      >
        Edit Profile
      </div>
      <ProfilePicContainer>
        <Dialog
          classes={{ paper: classes.paper }}
          className={classes.dialog}
          open={opens}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          
          <div className={isLoading == true ? "cover-spin-loginDialog" : ""}>
            <Wrapper>
              <Title>Edit Profile</Title>

              <Cut onClick={handleClose}>
                {" "}
                <img
                  className="cross-icon"
                  src={"/images/XDC-Cross.svg"}
                />{" "}
              </Cut>
            </Wrapper>
            <AvatarUpload
              filedata={fileData}
              uploadFileToS3={uploadFileToS3}
              profilePicture={profilePicture}
            />

            <DialogContent
              style={{
                padding: "8px 35px",
                marginBottom: "14px",
                overflow: "hidden",
              }}
            >
              <DialogContentText className={classes.subCategory}>
                Username
              </DialogContentText>
              {!usernameEnable ? (
                <span className="beforeInput">
                  <span className="beforeInputValue">{userName}</span>
                  <img
                    className="imgcss"
                    src={"/images/edit.svg"}
                    onClick={() => setUsernameEnable(true)}
                  />
                </span>
              ) : (
                <input
                  className="inputcss"
                  style={{ border: "solid 1px #9fa9ba", paddingLeft: "10px" }}
                  type="text"
                  id="username"
                  value={userName}
                  onChange={(e) => {
                    {
                      setUserName(e.target.value);
                      setUserNameError("");
                    }
                  }}
                />
              )}
              {userNameError && (
                <div className={classes.error}>{userNameError}</div>
              )}
            </DialogContent>

            <DialogContent
              style={{ padding: "8px 35px", marginBottom: "25px" }}
            >
              <DialogContentText className={classes.subCategory}>
                Email
              </DialogContentText>
              {!emailEnable ? (
                <span className="beforeInput">
                  <span className="beforeInputValue">{email}</span>
                  <img
                    className="imgcss"
                    src={"/images/edit.svg"}
                    onClick={() => setEmailEnable(true)}
                  />
                </span>
              ) : (
                <input
                  className="inputcss"
                  style={{ border: "solid 1px #9fa9ba", paddingLeft: "14px" }}
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    {
                      setEmail(e.target.value);
                      setEmailError("");
                    }
                  }}
                />
              )}
              {emailError ? (
                <div className={classes.error}>{emailError}</div>
              ) : (
                <></>
              )}
            </DialogContent>

            <DialogActions>
              <button
                className={classes.addbtn}
                onClick={() => {
                  profileUrl();
                }}
              >
                Update Profile{" "}
              </button>
            </DialogActions>

            <div className={classes.value}></div>
          </div>
        </Dialog>
      </ProfilePicContainer>
    </div>
  );
}
