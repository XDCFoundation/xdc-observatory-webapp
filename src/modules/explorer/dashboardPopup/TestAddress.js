import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import { Row } from "simple-flexbox";
import { UserService } from "../../../services";
import utility from "../../../utility";
import { history } from "../../../managers/history";
import { sessionManager } from "../../../managers/sessionManager";
import Tokensearchbar from "../tokensearchBar";
import FooterComponent from "../../common/footerComponent";
import { cookiesConstants } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  add: {
    backgroundColor: "#2149b9",
    marginLeft: "90px",
  },
  btn: {
    textAlign: "start",
    padding: "0px",
    border: "none !important",
    background: "none",
    "&:hover": { background: "none" },
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
    padding: "21px 0px 15px 0px",
    maxWidth: "343px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    height: "38px",
    border: "solid 1px #9fa9ba",
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    marginBottom: "21px",
    outline: "none",
    width: "100%",
  },

  addbtn: {
    width: "78px",
    height: "34px",
    // margin: "33px 0 0 21px",
    // padding: "8px 30px 7px 32px",
    margin: "0px 0px 15px 2px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
  },
  // addbtn: {
  //   width: "110px",
  // height: "34px",
  // margin: "33px 0 0 21px",
  // padding: "8px 30px 7px 32px",
  // borderRadius: "4px",
  // backgroundColor: "#3763dd",
  // },
  // cnlbtn: {
  //   width: "94px",
  // height: "34px",
  // margin: "33px 21px 0 87px",
  // padding: "8px 19px 7px 21px",
  // borderRadius: "4px",
  // backgroundColor: "#9fa9ba",

  // },
  cnlbtn: {
    width: "78px",
    height: "34px",
    // margin: "33px 21px 0 87px",
    // padding: "8px 19px 7px 21px",
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    color: "white",
    margin: "0px 8px 15px 2px",
  },
  subCategory: {
    marginTop: "-12px",
    marginBottom: "2px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#2a2a2a",
    fontWeight: "500 !important",
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
  userContainer: {
    marginTop: "12px",
    padding: "0px",
    width: "100%",
    maxWidth: "343px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  xdc: {
    color: "#2a2a2a",
    marginLeft: "30px",
    fontfamily: "Inter",
    fontsize: "5px",
  },
  error: {
    color: "red",
    marginLeft: "2px",
    marginTop: "-20px",
  },
  error1: {
    color: "red",
    marginLeft: "2px",
  },
  error2: {
    color: "red",
    marginLeft: "15px",
    marginTop: "-14px"
  },

  heading: {
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "18px",
    color: "#2a2a2a",
    maxWidth: "343px",
    width: "100%",
  },
  dialogBox: {
    width: "553px",
    position: "absolute",
    top: "111px",
    borderRadius: "12px",
  },
  createWatchlistMobile: {
    marginTop: "14px",
  },
  lastContainer: {
    maxWidth: "343px",
    width: "100%",
    padding: "11px 12px 10px 13px",
    borderRadius: "6px",
    backgroundColor: "#fff3f3",
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
      width: "362px",
      top: "95px",
    },
    error: {
      color: "red",
      marginLeft: "2px",
    },
  },
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const [privateAddress, setPrivateAddress] = React.useState(false);
  const [errorEmptyField, setErrorEmptyField] = React.useState("");
  const [nameTag, setNameTag] = React.useState(false);
  const [error, setError] = React.useState("");
  const [errorTag, setErrorTag] = React.useState("");
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  async function TaggedAddress() {
    setError("");
    setErrorTag("");
    setErrorEmptyField("");
    if (!privateAddress && !input && tags.length === 0) {
        setErrorEmptyField("Please enter required fields");
        return
    }
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: privateAddress,
      tagName: tags,
    };
    if (!privateAddress) {
      setError("Please enter required field");
    } else if (!input && tags.length === 0) {
      setErrorTag("Please enter required field");
    } else if (
      !(privateAddress && privateAddress.length === 43) ||
      !(privateAddress.slice(0, 3) === "xdc")
    ) {
      setError("Address should start with xdc and consist of 43 characters");
      return;
    } else if (tags.length === 0) {
      setErrorTag("Use comma(,) to add multiple tag");
      return;
    } else if (tags && tags.length > 5) {
      setErrorTag("You can not add Name tag more than 5");
      return;
    } else {
      const [error, response] = await utility.parseResponse(
        UserService.addPrivateTagToAddress(data)
      );

      if (error) {
        setErrorTag("Address already exist in table");
        return;
      }
      let taggedAddress = localStorage.getItem(
        cookiesConstants.USER_TAGGED_ADDRESS
      );
      if (taggedAddress) {
        taggedAddress = JSON.parse(taggedAddress);
        const existingTag = taggedAddress.find(
          (item) => item.address == privateAddress && item.userId == data.userId
        );
        if (existingTag) {
          setErrorTag("Address already exist in table");
          return;
        }
      } else {
        taggedAddress = [];
      }
      taggedAddress.push(data);
      localStorage.setItem(
        cookiesConstants.USER_TAGGED_ADDRESS,
        JSON.stringify(taggedAddress)
      );
      utility.apiSuccessToast("Tag Added");
      window.location.href = "loginprofile";
      setOpen(false);
    }
  }

  const classes = useStyles();
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
  if (width >= 760) {
    history.push("/loginprofile");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setErrorTag("");
    setPrivateAddress("");
    setTags([]);
    history.push("/loginprofile");
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

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <div>
      <Tokensearchbar />
      <div className={classes.createWatchlistMobile}>
        <Row>
          <div className={classes.heading} id="form-dialog-title">
            Add a new Address Tag
          </div>
          {/* <span onClick={handleClose} className={classes.cross}>
              {" "}
              X{" "}
            </span> */}
        </Row>
        {errorEmptyField ? <div className={classes.error2}>{errorEmptyField}</div> : <></>}
        <div className={classes.userContainer}>
          <p className={classes.subCategory}>Address</p>
          <input
            className={classes.input}
            onChange={(e) => {
              setPrivateAddress(e.target.value);
              setError("");
            }}
          ></input>
          {error ? <div className={classes.error}>{error}</div> : <></>}
        </div>
        <div className={classes.userContainer}>
          <p className={classes.subCategory}>
            Name Tag
            {/* <span  className={classes.forgotpass}>
              Forgot Password?
            </span> */}
          </p>

          <div className="containerTagMobile">
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
          {errorTag ? <div className={classes.error1}>{errorTag}</div> : <></>}
          {/* <input
              type="text"
              className={classes.input}
              onChange={(e) => setNameTag(e.target.value)}
            ></input> */}
          {/* {errorTag ? <div className={classes.error}>{errorTag}</div> : <></>} */}
          {/* <span>
                {passwordShown?<VisibilityIcon className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>:<VisibilityOff className={classes.icon} fontSize="small" style={{ color: "#b9b9b9" }} onClick={togglePasswordVisiblity}/>}
             {/* <RemoveRedEyeIcon className={classes.icon} onClick={togglePasswordVisiblity} 
            {...passwordShown==false?<VisibilityIcon/>:<VisibilityOff/>}

            {...passwordShown==="password"?<VisibilityIcon/>:<VisibilityOff/>} 
            fontSize="small" style={{ color: "#b9b9b9" }} /> */}
          {/* </span> */}
        </div>
        <DialogActions className={classes.buttons}>
          <span>
            <button className={classes.cnlbtn} onClick={handleClose}>
              Cancel
            </button>
          </span>
          <span>
            <button className={classes.addbtn} onClick={TaggedAddress}>
              Add
            </button>
          </span>
        </DialogActions>
        <div className={classes.lastContainer}>
          <div className={classes.lastContainerText}>
          Privacy is very important to us. To protect sensitive information,
              all custom tags and data related to the Watchlists are saved on
              your local device. Clearing the browsing history or cookies will
              remove the watchlist data saved in your profile.
          </div>
        </div>
        {/* <div className={classes.value}></div>
          <p className={classes.xdc}>
              New to XDC Xplorer? <span className={classes.createaccount}> Create an account</span> 
            </p> */}
      </div>
      <FooterComponent />
    </div>
  );
}
