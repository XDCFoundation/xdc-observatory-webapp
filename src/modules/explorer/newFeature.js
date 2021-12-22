import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Row } from "simple-flexbox";
import { sessionManager } from "../../managers/sessionManager";
import FormDialog from "./loginDialog"
import { makeStyles } from "@material-ui/styles";

export default function NewFeature(props) {
  const [open, setOpen] = React.useState(true);
  const [signUp, setSignUp] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    maxWidth: "795px",
    width: "100%",
    height: "469px",
    position: "absolute",
    top: "65px",
    borderRadius: "12px",
  }
}))
const classes = useStyles();

const visited = ()=>{
    sessionManager.setDataInCookies(true,"Visited");
    
}
  return (
      
   !signUp ?   <Dialog onClose={handleClose} open={open} classes={{paperWidthSm: classes.dialogBox}}>
      <div className="main-box" >
        <Row className="main-row">
          <div className="main-title">New Features</div>
          <div className="main-close" onClick={handleClose}>
            <img  alt="Cross" src={"/images/XDC-Cross.svg"} />
          </div>
        </Row>
        <div className="main-sub-title">
          Create your account and get started
        </div>
        <Row className="card-box" style={{flexFlow: "wrap"}}>
          <div className="card margin-right-34px">
            <img  alt="new-feature"
              src={require("../../../src/assets/images/watch-list-new-feature.svg")}
              className="crad-image"
            />
            <div className="card-title">Create watchlist</div>
            <div className="card-text">
              An Email notification can be sent to you when an address on your
              watch list receives an incoming transaction.
            </div>
          </div>
          <div className="card margin-right-34px">
            <img  alt="addLabel"
              src={require("../../../src/assets/images/AddLabel_NewFeature.svg")}
              className="crad-image"
            />
            <div className="card-title">Add transaction label</div>
            <div className="card-text">
              Add a personal note to a transaction hash to track it in future.
            </div>
          </div>
          <div className="card">
            <img  alt="addLabel"
              src={require("../../../src/assets/images/AddTransactionLable_NewFeature.svg")}
              className="crad-image"
            />
            <div className="card-title">Add private tag to an Address</div>
            <div className="card-text">
              Add a short memo or private tag to the address of interest.
            </div>
          </div>
        </Row>

        <div style={{display: "flex", justifyContent: "center"}}>
          <div className="sign-up-button" onClick={()=>{
            setSignUp(true);
          }}>

            <div className="main-sing-up-text"> Sign up</div>
          </div>
        </div>

        <div className="main-end-box">
          <input type="checkbox" 
          onChange={visited} 
          className="main-checkbox" />
          <div className="main-end-text">Don't show this message again</div>
        </div>
      </div>
    </Dialog>:
    <FormDialog isNewFeatureComponent={true}/>
   
  );
}
