import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Row } from "simple-flexbox";
import { sessionManager } from "../../managers/sessionManager";
import SignUp from "./loginDialog"

export default function NewFeature(props) {
    console.log(props,"propseeeeee")
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };


const visited = ()=>{
    console.log("clickedddd")
    sessionManager.setDataInCookies(true,"Visited");
    
}
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="main-box">
        <Row className="main-row">
          <div className="main-title">New Features</div>
          <div className="main-close" onClick={handleClose}>
            <img src={require("../../../src/assets/images/XDC-Cross.svg")} />
          </div>
        </Row>
        <div className="main-sub-title">
          Create your account and get started
        </div>
        <Row className="card-box">
          <div className="card margin-right-20px">
            <img
              src={require("../../../src/assets/images/watchlist2.svg")}
              className="crad-image"
            />
            <div className="card-title">Create watchlist</div>
            <div className="card-text">
              An Email notification can be sent to you when an address on your
              watch list receives an incoming transaction.
            </div>
          </div>
          <div className="card margin-right-20px">
            <img
              src={require("../../../src/assets/images/transaction2.svg")}
              className="crad-image"
            />
            <div className="card-title">Add transaction label</div>
            <div className="card-text">
              Add a personal note to a transaction hash to track it in future.
            </div>
          </div>
          <div className="card">
            <img
              src={require("../../../src/assets/images/private2.svg")}
              className="crad-image"
            />
            <div className="card-title">Add transaction label</div>
            <div className="card-text">
              Add a personal note to a transaction hash to track it in future.
            </div>
          </div>
        </Row>
        <div className="main-sing-up" onClick={props.handleClickOpenSignup}>
        
          <div className="main-sing-up-text"> Sign up</div>
        </div>
        <div className="main-end-box">
          <input type="checkbox" 
          onChange={visited} 
          className="main-checkbox" />
          <div className="main-end-text">Don't show this message again</div>
        </div>
      </div>
    </Dialog>
  );
}
