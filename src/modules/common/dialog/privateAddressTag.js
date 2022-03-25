import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { UserService } from "../../../services";
import { history } from "../../../managers/history";
import utility from "../../../utility";
import { sessionManager } from "../../../managers/sessionManager";
import { genericConstants, cookiesConstants } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },
  value: {
    width: "400px !important",
  },
  cross: {
    marginTop: "25px",
    marginLeft: "40px",
    fontWeight: "500",
  },
  dialog: {
    marginLeft: "10%",
    marginTop: "2px",
    width: "80% !important",
    height: "70% !important",
    borderRadius: "50px !important",
  },
  buttons: {
    padding: "1px 35px 15px 0px",
  },
  input: {
    width: "503px",
    height: "15px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    padding: "20px",
    marginBottom: "21px",
    outline: "none"
  },
  inputDark: {
    width: "503px",
    height: "15px",
    border: "solid 1px #3552a5",
    backgroundColor: "#091b4e",
    borderRadius: "7px",
    padding: "20px",
    marginBottom: "21px",
    outline: "none",
    color: "#fff"
  },
  addbtn: {
    width: "110px",
    height: "34px",
    margin: "14px -8px 15px 2px",
    padding: "6px 19px 3px 20px",
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
    padding: "6px 19px 3px 20px",
  },
  cnlbtnDark: {
    width: "94px",
    height: "34px",
    borderRadius: "6px",
    backgroundColor: "#192a59",
    color: "white",
    margin: "14px 8px 15px 2px",
    padding: "6px 19px 3px 20px",
    border: "solid 1px #3552a5",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
    fontfamily: "Inter",
    fontsize: "14px",
    fontweight: "500",
    border: "none !important",
    color: "#2a2a2a"
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
    marginTop: "7px",
    marginBottom: "7px",
    fontfamily: "Inter",
    fontweight: "600",
    color: "#2a2a2a"
  },
  dialogBox: {
    width: "553px",
    position: "absolute",
    top: "111px",
    borderRadius: "12px",
  },
  error1: {
    color: "red",
    marginLeft: "2px",
  },
  error2: {
    color: "red",
    marginLeft: "24px",
    marginTop: "-14px",
  },
  lastContainer: {
    maxWidth: "534px",
    width: "100%",
    padding: "11px 12px 10px 13px",
    borderRadius: "6px",
    backgroundColor: "#fff3f3",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "25px",
  },
  lastContainerDark: {
    maxWidth: "534px",
    width: "100%",
    padding: "11px 12px 10px 13px",
    borderRadius: "6px",
    backgroundColor: "#C8C8C8",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "25px",
  },
  lastContainerText: {
    fontSize: "12px",
    fontFamily: "Inter !important",
    color: "#ff0202",

    lineHeight: "1.58",
  },
  
  "@media (max-width: 767px)": {
    heading: {
      fontSize: "16px",
    },
    dialogBox: {
      width: "100%",
      top: "40px",
      borderRadius: "0px !important",
      marginLeft: "auto",
      marginRight: "auto",
      height: "100%",
    },
    input: {
      maxWidth: "503px",
      width: "100%",
    },
  },
}));

export default function FormDialog(props) {
  const { open, onClose } = props
  const [privateAddress, setPrivateAddress] = React.useState();
  const [nameTag, setNameTag] = React.useState(false);
  const [errorEmptyField, setErrorEmptyField] = React.useState("");
  const [error, setError] = React.useState("");
  const [errorTag, setErrorTag] = React.useState("");
  // const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (props?.value === 1 && props?.fromAddr) {
      setPrivateAddress(props?.fromAddr);
    } else {
      setPrivateAddress(props?.toAddr)
    }
  }, [props])

  async function TaggedAddress() {
    setError("");
    setErrorTag("");
    setErrorEmptyField("");
    if (!privateAddress && !input && tags.length === 0) {
      setErrorEmptyField(genericConstants.ENTER_REQUIRED_FIELD);
      return;
    }
    if (!privateAddress) {
      setError(genericConstants.ENTER_REQUIRED_FIELD);
    } else if (!input) {
      setErrorTag(genericConstants.ENTER_REQUIRED_FIELD);
    } else if (
      !(privateAddress && privateAddress.length === 43) ||
      !(privateAddress.slice(0, 3) === "xdc")
    ) {
      setError("Address should start with xdc and consist of 43 characters");
      return;
    } else if (input.length > 15) {
      setErrorTag("Nametag cannot be longer than 15 characters");
    } else {
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: privateAddress,
      tagName: input,
      modifiedOn: Date.now()
    };
    // const [error, response] = await utility.parseResponse(
    //   UserService.addPrivateTagToAddress(data)
    // );

    // if (error) {
    //   utility.apiFailureToast("Address is already in use");
    //   return;
    // }

    let taggedAddress = localStorage.getItem(
      data.userId + cookiesConstants.USER_TAGGED_ADDRESS
    );
    if (taggedAddress) {
      taggedAddress = JSON.parse(taggedAddress);
      let existingTagsIndex=null;
      const existingTag = taggedAddress.find(
        (item,index) => {
          if(item.address == privateAddress && item.userId == data.userId){
            existingTagsIndex = index;
            return true;
        }
        }
      );
      if (existingTag) {
        // taggedAddress[existingTagsIndex].tagName = [...taggedAddress[existingTagsIndex].tagName,...tags]
        taggedAddress[existingTagsIndex].tagName = input;
        // utility.apiFailureToast("Address is already in use");
        // return;
      }else{
        taggedAddress.push(data);
      }
    } else {
      taggedAddress = [];
      taggedAddress.push(data);
    }
    // taggedAddress.push(data);
    localStorage.setItem(
      data.userId + cookiesConstants.USER_TAGGED_ADDRESS,
      JSON.stringify(taggedAddress)
    );
    utility.apiSuccessToast("Tag Added");
    onClose();
    }
  }
  let taggedAddressfetched = localStorage.getItem(
    cookiesConstants.USER_TAGGED_ADDRESS
  );

  const [input, setInput] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [isKeyReleased, setIsKeyReleased] = React.useState(false);
  // const [errorTag, setErrorTag] = React.useState("");

  const onChange = (e) => {
    setErrorTag("");
    const { value } = e.target;
    setInput(value);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      if (trimmedInput.length > 15) {
        setErrorTag("Nametag cannot be longer than 15 characters");
        return;
      }
      if (tags.length >= 5) {
        setErrorTag("Maximum 5 Name tags are allowed");
        return;
      }
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


  const classes = useStyles();

  return (
    <div>
      <Dialog
        // className={classes.dialog}
        classes={{ paperWidthSm: classes.dialogBox }}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <div className={props.theme === "dark" ? "table-bg-dark" : ""}>
        <Row>
          <DialogTitle className={props.theme === "dark" ? `${classes.heading} fc-white` : classes.heading} id="form-dialog-title">
            Add a new Address Tag
          </DialogTitle>
        </Row>
        {errorEmptyField ? (
            <div className={classes.error2}>{errorEmptyField}</div>
          ) : (
            <></>
          )}
        <DialogContent>
          <DialogContentText className={props.theme === "dark" ? `${classes.subCategory} fc-white` : classes.subCategory}>
            Address
          </DialogContentText>
          <input
            value={privateAddress}

            className={props.theme === "dark" ? classes.inputDark : classes.input}
            onChange={(e) => {
              setPrivateAddress(e.target.value)
              setError("");
            }}
            readOnly
          ></input>
          {error ? <div className={classes.error}>{error}</div> : <></>}
        </DialogContent>
        <DialogContent>
          <DialogContentText className={props.theme === "dark" ? `${classes.subCategory} fc-white` : classes.subCategory}>
            Name Tag
          </DialogContentText>
          <div className={props.theme === "dark" ? "containerTagDark" : "containerTag"}>
            {/*{tags.map((tag, index) => (*/}
            {/*    <div className="tag">*/}
            {/*      {tag}*/}
            {/*      <button onClick={() => deleteTag(index)}>x</button>*/}
            {/*    </div>*/}
            {/*))}*/}
            <input
                value={input}
                // onKeyDown={onKeyDown}
                // onKeyUp={onKeyUp}
                onChange={onChange}
                className={props.theme === "dark" ? "fc-white p-l-22" :""}
            />
          </div>
          {errorTag ? (
              <div className={classes.error1}>{errorTag}</div>
            ) : (
              <></>
            )}
          {/*<input*/}
          {/*  type="text"*/}
          {/*  className={classes.input}*/}
          {/*  onChange={(e) => setNameTag(e.target.value)}*/}
          {/*></input>*/}
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <span>
            <button className={props.theme === "dark" ? classes.cnlbtnDark : classes.cnlbtn} onClick={onClose}>
              Cancel
            </button>
          </span>
          <span>
            <button className={classes.addbtn} onClick={TaggedAddress}>
              Add
            </button>
          </span>
        </DialogActions>
        <div className="p-l-15 p-r-15">
          <div className={props.theme === "dark" ? classes.lastContainerDark : classes.lastContainer}>
            <div className={classes.lastContainerText}>
              Privacy is very important to us. To protect sensitive information,
              all custom tags and data related to the Watchlists are saved on
              your local device. Clearing the browsing history or cookies will
              remove the watchlist data saved in your profile.
            </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
