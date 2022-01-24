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
  "@media (max-width: 714px)": {
    heading: {
      fontSize: "16px",
    },
    dialogBox: {
      width: "362px",
      top: "95px"
    },
    input: {
      maxWidth: "503px",
      width: "100%",
    },
  },
}));

export default function FormDialog(props) {
  // console.log(props, "<<<<props")
  const { open, onClose } = props
  const [privateAddress, setPrivateAddress] = React.useState();
  const [nameTag, setNameTag] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if(props?.value === 1 && props?.fromAddr){
    setPrivateAddress(props?.fromAddr);
    } else {
      setPrivateAddress(props?.toAddr)
    }
  }, [props])

  async function TaggedAddress() {
    const data = {
      userId: sessionManager.getDataFromCookies("userId"),
      address: privateAddress,
      tagName: nameTag,
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
        data.userId+cookiesConstants.USER_TAGGED_ADDRESS
    );
    console.log("taggedAddress ",taggedAddress)
    if (taggedAddress) {
      taggedAddress = JSON.parse(taggedAddress);
      const existingTag = taggedAddress.find(
        (item) => item.address == privateAddress && item.userId == data.userId
      );
      if (existingTag) {
        utility.apiFailureToast("Address1 is already in use");
        return;
      }
    } else {
      taggedAddress = [];
    }
    taggedAddress.push(data);
    localStorage.setItem(
        data.userId+cookiesConstants.USER_TAGGED_ADDRESS,
      JSON.stringify(taggedAddress)
    );
    utility.apiSuccessToast("Tag Added");
    onClose();
  }
  let taggedAddressfetched = localStorage.getItem(
    cookiesConstants.USER_TAGGED_ADDRESS
  );

  const classes = useStyles();

  return (
    <div>
      <Dialog
        className={classes.dialog}
        classes={{ paperWidthSm: classes.dialogBox }}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <Row>
          <DialogTitle className={classes.heading} id="form-dialog-title">
            Add a new Address Tag
          </DialogTitle>
        </Row>
        <DialogContent>
          <DialogContentText className={classes.subCategory}>
            Address
          </DialogContentText>
          <input
            value={privateAddress}

            className={classes.input}
            onChange={(e) => setPrivateAddress(e.target.value)}
            readOnly
          ></input>
        </DialogContent>
        <DialogContent>
          <DialogContentText className={classes.subCategory}>
            Name Tag
          </DialogContentText>
          <input
            type="text"
            className={classes.input}
            onChange={(e) => setNameTag(e.target.value)}
          ></input>
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <span>
            <button className={classes.cnlbtn} onClick={onClose}>
              Cancel
            </button>
          </span>
          <span>
            <button className={classes.addbtn} onClick={TaggedAddress}>
              Add
            </button>
          </span>
        </DialogActions>
      </Dialog>
    </div>
  );
}
