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
    marginLeft: "-6px",
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
    width: '31.438rem',
    height:"35.063rem",
    alignSelf: "flex-start",
    margin: "100px auto",
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
    height: "35px",
    borderRadius: "4.4px",
    border: "solid 0.6px #00a1ed",
    backgroundColor: "#3763dd",
    margin: "10px 10px 20px 10px",
    color: "white",
  },
  subCategory: {
    marginTop: "4px",
    marginBottom: "4px",
    fontfamily: "Inter",
    fontsize: "14px",
    fontweight: "500",
    border: "none !important",
    outline: "none",
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
  border: "0.3px dashed var(--unnamed-color-acacac)",
  border: "0.30000001192092896px dashed #ACACAC",
  // marginTop: 5,
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
`;
const Upload = styled.div`
  display: block;
  cursor: pointer;
  padding-left: 11.2rem;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
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
  padding-left: 32px;
`;
const ProfilePicContainer = styled.div`
  width: 503px;
`;

const Cut = styled.div`
  padding-right: 25px;
  padding-top: 7px;

  display: flex;
  align-content: flex-end;
`;
const Input = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export default function FormDialog() {
  const classes = useStyles();
  const [opens, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      console.log("file", files);
      console.log("accept", acceptedFiles);
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
  const [usernameDisable, setUsernameUnable] = React.useState(true);
  const [emailDisable, setEmailUnable] = React.useState(true);

  return (
    <div>
      <div className={classes.add}>
        <button className="login-button" onClick={handleClickOpen}>
          <div className="edit">Edit Profile</div>
        </button>

        <ProfilePicContainer>
          <Dialog 
            classes={{ paper: classes.paper }}
            className={classes.dialog}
            open={opens}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <Wrapper>
              <div></div>
              <Title>Edit Profile</Title>

              <Cut onClick={handleClose}>
                {" "}
                <img
                  className="cross-icon"
                  src={require("../../../src/assets/images/XDC-Cross.svg")}
                />{" "}
              </Cut>
            </Wrapper>
            <AvatarUpload />

            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Username</b>
              </DialogContentText>
              <Input className="inputcss">
                <input
                  style={{ backgroundColor: "#f5f5f5" }}
                  className="hide-border w-100 inputOutlineNone"
                  type="text"
                  id="username"
                  disabled={usernameDisable}
                />
                <img
                  className="imgcss"
                  src={require("../../../src/assets/images/edit.svg")}
                  onClick={() => setUsernameUnable(false)}
                />
              </Input>
            </DialogContent>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Email</b>
              </DialogContentText>

              <Input className="inputcss">
                <input
                  style={{ backgroundColor: "#f5f5f5" }}
                  className="hide-border w-100 inputOutlineNone "
                  type="text"
                  id="email"
                  disabled={emailDisable}
                />
                <img
                  className="imgcss"
                  src={require("../../../src/assets/images/edit.svg")}
                  onClick={() => setEmailUnable(false)}
                />
              </Input>
            </DialogContent>
            <DialogActions>
              <button
                className={classes.addbtn}
                onClick={handleLogin}
                onClick={(event) => (window.location.href = "loginprofile")}
              >
                Update Profile{" "}
              </button>
              {/* <Link to="/loginprofile" className={classes.addbtn} className="btn btn-primary">Log in</Link> */}
            </DialogActions>
            <div className={classes.value}></div>
          </Dialog>
        </ProfilePicContainer>
      </div>
    </div>
  );
}
