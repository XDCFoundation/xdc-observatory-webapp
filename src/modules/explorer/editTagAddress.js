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
import PutTagAddress from "../../services/user";
import { useEffect } from "react";
import styled from "styled-components";
import utility, { dispatchAction } from "../../utility";
import { TagAddressService } from "../../services";
import { eventConstants, genericConstants } from "../../constants";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },
  btn: {
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
  },
  error: {
    color: "red",
    marginLeft: "2px",
    marginTop: "-20px",
  },
  value: {
    width: "400px !important",
  },
  cross: {
    marginTop: "25px",
    marginLeft: "40px",
    fontWeight: "500",
  },
  dialogBox: {
    width: "553px",
    position: "absolute",
    top: "111px",
    borderRadius: "12px",
  },
  buttons: {
    justifyContent: "space-between",
    padding: "10px 35px 15px 0px",
  },
  input: {
    width: "506px",
    height: "10px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    outline: "none",
    marginBottom: "21px",
  },
  deletebtn: {
    width: "110px",
    height: "34px",
    margin: "14px 0px 15px 20px",
    borderRadius: "4px",
    backgroundColor: "Red",
    color: "white",
  },
  updatebtn: {
    width: "110px",
    height: "34px",
    margin: "14px -8px 15px 2px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },
  cnlbtn: {
    width: "94px",
    height: "34px",
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    color: "white",
    margin: "14px 8px 15px 2px",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#2a2a2a",
    fontWeight: "500",
    border: "none !important",
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
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "24px",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "18px",
    color: "#2a2a2a",
  },
  "@media (max-width: 714px)": {
    heading: {
      fontSize: "16px",
    },
    dialogBox: {
      width: "362px",
      top: "95px",
    },
    input: {
      maxWidth: "503px",
      width: "100%",
    },
    flexButton: {
      display: "flex",
    },
  },
}));

function EditTaggedAddress(props) {
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState("");
  const [privateAddress, setPrivateAddress] = React.useState("");
  const [nameTag, setNameTag] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState("");
  const [errorTag, setErrorTag] = React.useState("");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  const multipleTag = props.row.tagName;
  useEffect(() => {
    if (props.row.address) setPrivateAddress(props.row.address);
    setNameTag(props.row.tagName);
    setId(props.row._id);
    setTags(multipleTag);
  }, [props]);

  async function editTaggedAddress() {
    setError("");
    setErrorTag("");
    const data = {
      _id: props.row._id,
      address: privateAddress,
      tagName: tags,
    };
    if (
      !(privateAddress && privateAddress.length === 43) ||
      !privateAddress.slice(0, 2) === "xdc"
    ) {
      setError("Address should start with xdc & 43 characters");
      return;
    } else if (tags.length === 0) {
      setErrorTag("Use comma(,) to add multiple tag");
      return;
    } else if (tags && tags.length > 5) {
      setErrorTag("You can not add Name tag more than 5");
      return;
    } else {
      const [error, response] = await utility.parseResponse(
        PutTagAddress.putTaggedAddress(data)
      );
      if (error || !response) {
        utility.apiFailureToast("Address already exists");
      } else {
        utility.apiSuccessToast("Address tag Updated");
        window.location.href = "loginprofile";
        setOpen(false);
        setErrorTag("")
      }
    }
  }

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setErrorTag("");
  };

  const handleDelete = async () => {
    if (props?.row?._id) {
      props.dispatchAction(eventConstants.SHOW_LOADER, true);
      const [error, response] = await utility.parseResponse(
        TagAddressService.deleteTagAddress({ _id: props.row._id })
      );
      props.dispatchAction(eventConstants.HIDE_LOADER, true);
      if (error || !response) {
        utility.apiFailureToast(
          error?.message || genericConstants.CANNOT_DELETE_TAGGED_ADDRESS
        );
        return;
      }
      await utility.apiSuccessToast(genericConstants.TAGGED_ADDRESS_DELETED);
      await handleClose();
      await props.getListOfTagAddress();
    }
  };

  const [input, setInput] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [isKeyReleased, setIsKeyReleased] = React.useState(false);

  const onChange = (e) => {
    setErrorTag("");
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
      setErrorTag("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <button className={classes.btn}>
          <a className="linkTable">
            <span className="tabledata1">Edit</span>
          </a>
        </button>
      </div>

      <div>
        <Dialog
          classes={{ paperWidthSm: classes.dialogBox }}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <div className={classes.heading} id="form-dialog-title">
              Edit Address Tag
            </div>
          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Address
            </DialogContentText>
            <input
              value={privateAddress}
              className={classes.input}
              onChange={(e) => {
                setPrivateAddress(e.target.value);
                setError("");
                setErrorTag("")
              }}
            ></input>
            {error ? <div className={classes.error}>{error}</div> : <></>}
          </DialogContent>
          {/* <DialogContent>
              <DialogContentText className={classes.subCategory}>
                Name Tag
              </DialogContentText>

              <input
                value={nameTag}
               // type="text"
                className={classes.input}
                onChange={(e) => setNameTag(e.target.value)}
              ></input>
              {errorTag ? <div className={classes.error}>{errorTag}</div> : <></>}
            </DialogContent> */}

          {/* <------------------------------------------------------------------------------------------------------------------> */}
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Name Tag
            </DialogContentText>

            <div className="containerTag">
              {tags.map((tag, index) => (
                <div className="tag">
                  {tag}
                  <button onClick={() => deleteTag(index)}>x</button>
                </div>
              ))}
              <input
                value={input}
                placeholder="Enter a tag"
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
              />
            </div>
            {errorTag ? <div className={classes.error}>{errorTag}</div> : <></>}
          </DialogContent>
          {/* <------------------------------------------------------------------------------------------------------------------> */}

          <DialogActions className={classes.buttons}>
            <div>
              <span>
                <button className={classes.deletebtn} onClick={handleDelete}>
                  Delete
                </button>
              </span>
            </div>
            <div className={classes.flexButton}>
              <span>
                <button className={classes.cnlbtn} onClick={handleClose}>
                  Cancel
                </button>
              </span>
              <span>
                <button
                  className={classes.updatebtn}
                  onClick={editTaggedAddress}
                >
                  Update
                </button>
              </span>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(EditTaggedAddress);
