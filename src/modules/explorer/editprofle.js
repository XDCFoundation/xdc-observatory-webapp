import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import React, { useMemo, useEffect, useState, useRef } from "react";

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
    // marginLeft: "80%",
    // backgroundColor: "#f5f8fa",
    // fontFamily: "Roboto",
    // fontStyle: "normal",
    backgroundColor: "#2149b9",
    marginLeft: "90px",
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
    cursor: "pointer",
  },
  dialog: {
    marginLeft: "10%",
    marginTop: "2px",
    width: "80% !important",
    height: "80% !important",
    borderRadius: "50px !important",
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
margin-left: auto;
margin-right: auto;
font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #2149b9;
}
HTML
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

const Cut = styled.div`

padding-right: 25px;
    padding-top: 7px;
    
    display:flex;
    align-content: flex-end;
}`;
const Input = styled.div`
display:flex;
flex-flow: row nowrap;


}`;

export default function FormDialog() {
  const classes = useStyles();
  const [opens, setOpen] = useState(true);

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
      console.log("file",files);
      console.log("accept",acceptedFiles);
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

  return (
    <div>
      <div className={classes.add}>
        <button className="login-button" onClick={handleClickOpen}>
          <div className="edit">Edit Profile</div>
        </button>

        <div>
          <Dialog
            className={classes.dialog}
            open={opens}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <Wrapper>
              <div></div>
              <Title>Edit Profile</Title>

              <Cut onClick={handleClose}> X </Cut>
            </Wrapper>
           
            <div className="">
              {filepath.length === 0 ? (
                <div className="upload-box">
                   <img
              className="dialogeUser center"
              src={require("../../../src/assets/images/Profile.svg")}
            />
                  <input {...getInputProps()} />

                  
                  
                   
                    <span
                      style={{
                        color: "#7D84C0",
                        cursor: "pointer",
                      }}
                      onClick={open}
                    >
                      browse
                    </span>
                 
                </div>
              ) : (
                
                 
                  <div>
                   
                  <img src={files} alt="image is not showing" />
                   <p className="dragcont" style={{ textAlign: "center" }}>{filepath}</p> 
                   </div>
              
              )}
            </div>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Username</b>
              </DialogContentText>
              <Input className="inputcss">
                <input
                  style={{ backgroundColor: "#f5f5f5" }}
                  className="hide-border"
                  type="text"
                />
                <img
                  className="imgcss"
                  src={require("../../../src/assets/images/edit.svg")}
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
                  className="hide-border"
                  type="text"
                />
                <img
                  className="imgcss"
                  src={require("../../../src/assets/images/edit.svg")}
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
        </div>
      </div>
    </div>
  );
}
