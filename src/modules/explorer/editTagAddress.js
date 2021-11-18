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
import utility , {dispatchAction} from "../../utility";
import { TagAddressService } from "../../services";
import { eventConstants, genericConstants } from "../../constants";
import { connect } from "react-redux";

const DialogBox = styled.div`
  width: 553px;
  height: 316px;
  border-radius: 10%;
  justify-content: space-between;
`;

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
    justifyContent: "space-between",
    padding: "10px 35px 15px 0px",
  },
  input: {
    width: "506px",
    height: "15px",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    outline: "none",
    padding: "20px",
  },
  deletebtn: {
    width: "110px",
    height: "34px",
    margin: "14px 0px 15px 20px",
    padding: "6px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "Red",
    color: "white",
  },
  updatebtn: {
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
    marginBottom: "-2px",
    fontfamily: "Inter",
    fontsize: "14px",
    fontweight: "500",
    border: "none !important",
    padding: "10px 0px 2px 0px",
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
    marginLeft: "10px",
    fontfamily: "Inter",
    fontweight: "600",
  },
}));

 function EditTaggedAddress(props) {
  const [open, setOpen] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState("");
  const [privateAddress, setPrivateAddress] = React.useState("");
  const [nameTag, setNameTag] = React.useState(false);
  const [id, setId] = React.useState("");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}
  };

  useEffect(() => {
    if (props.row.address) setPrivateAddress(props.row.address);
    setNameTag(props.row.tagName);
    setId(props.row._id)
  }, []);

  async function editTaggedAddress() {
    setOpen(false);
    const data = {
      _id: props.row._id,
      address: privateAddress,
      tagName: nameTag,
    };
    const response = await PutTagAddress.putTaggedAddress(data);
    utility.apiSuccessToast("Changes updated successfully")
    window.location.reload();
  }

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    // history.push("/loginprofile")
  };
  const validateAddress = () => {
    if (nameTag && nameTag.length >= 20){
      utility.apiFailureToast("Name Tag Minimum length is should be 20");
      
    }else{
      validateTagName()
    }
  }
  const validateTagName = () => {
  
    if ((privateAddress && privateAddress.length === 43) || privateAddress.slice(0, 2) == "xdc") {
      editTaggedAddress()
      
    } else {
      utility.apiFailureToast("Address should start with xdc & 43 characters");
    }

  };
  const handleDelete = async () =>{
    if(props?.row?._id){
      props.dispatchAction(eventConstants.SHOW_LOADER , true)
      const [ error , response] =await utility.parseResponse(TagAddressService.deleteTagAddress({_id:props.row._id}))
      props.dispatchAction(eventConstants.HIDE_LOADER , true)
      if(error || !response){
       utility.apiFailureToast(error?.message || genericConstants.CANNOT_DELETE_TAGGED_ADDRESS);
       return;
      }
      await utility.apiSuccessToast(genericConstants.TAGGED_ADDRESS_DELETED);
      await handleClose();
      await props.getListOfTagAddress();
    }
   }

  return (
    <div>
      <div onClick={handleClickOpen}>
        <button className={classes.btn}>
          <a className="linkTable">
            <span className="tabledata">Edit</span>
          </a>
        </button>
      </div>

      <div>
        <Dialog
          className={classes.dialog}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogBox>
            <Row>
              <DialogTitle className={classes.heading} id="form-dialog-title">
                Edit Address Tag
              </DialogTitle>
            </Row>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Address</b>
              </DialogContentText>
              <input
                value={privateAddress}
                className={classes.input}
                onChange={(e) => setPrivateAddress(e.target.value)}
              ></input>
            </DialogContent>
            <DialogContent>
              <DialogContentText className={classes.subCategory}>
                <b>Name Tag</b>
              </DialogContentText>

              <input
                value={nameTag}
               // type="text"
                className={classes.input}
                onChange={(e) => setNameTag(e.target.value)}
              ></input>
            </DialogContent>
            <DialogActions className={classes.buttons}>
              <div>
                <span>
                  <button className={classes.deletebtn} onClick={handleDelete}>Delete</button>
                </span>
              </div>
              <div>
                <span>
                  <button className={classes.cnlbtn} onClick={handleClose}>
                    Cancel
                  </button>
                </span>
                <span>
                  <button
                    className={classes.updatebtn}
                    onClick={editTaggedAddress,validateAddress}
                  >
                    Update
                  </button>
                </span>
              </div>
            </DialogActions>
          </DialogBox>
        </Dialog>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(EditTaggedAddress);