import { mergeClasses } from '@material-ui/styles';
import React, { Component } from 'react';
import "../../assets/styles/profile.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
class AccountProfile extends Component {
    render() {
        return (
            <div className="maindiv" >
                <div className="heading">
                <span ><img className="icon" src={require("../../assets/images/Profile.png")}></img>
                </span>
                <span >
                <div className="nameicon">
                <span className="welcome">welcome, CrytoAlex</span><span ><img className="noticon" src={require("../../assets/images/notification.png")} ></img></span>
                </div>
                <div className="edit">
                Edit Profile
                </div>

                </span>
                
                </div>
                <div className="divbox">
                <div className="div1">
                    <div >
                    <img className="imagediv1" src={require("../../assets/images/watchlist.png")}></img>
                    </div>
                    <div className="headingdiv1">
                     Create Watchlist
                    </div>
                    <div className="paradiv1">
                     An Email notification can be sent to you when an address on your watchlist recieves an incoming notifications
                    </div>
                    
                </div>
                <div className="div2">
                <div >
                <img className="imagediv2" src={require("../../assets/images/transaction.png")}></img>
                    </div>
                    <div className="headingdiv2">
                    Add Transaction label
                    </div>
                    <div className="paradiv2">
                     Add a personal note to transacton hash to track it in future
                    </div>
                    
                </div>
                <div className="div3">
                <div >
                <img className="imagediv3" src={require("../../assets/images/private.png")}></img>
                    </div>
                    <div className="headingdiv3">
                    Add private tag to an address
                    </div>
                    <div className="paradiv3">
                     Add a short memo or private tag to the address of interest
                    </div>
                    
                </div>
                </div>
            </div>
        );
    }
}

export default AccountProfile;