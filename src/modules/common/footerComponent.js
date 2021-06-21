import React from "react";
import "../../assets/styles/footer.css";
import styled from "styled-components";
import logo from "../../assets/images/XDC-Icon@3x.png";
import INR from "../../assets/images/inr.png";
import EUR from "../../assets/images/euro.png";
import DOLLAR  from "../../assets/images/dollar.png";
import NightModeLogo from "../../images/nightmode.svg"
import Grid from '@material-ui/core/Grid'
import Select from "@material-ui/core/Select"
import { MenuItem } from "material-ui";
import Iframe from 'react-iframe'



export default function FooterComponent() {
    return (
        <div className={"footer_base"}>
            <Grid className="footer" container alignContent="center"  justify="center">

                <Grid className="footer-items" alignContent="right" item xs={12} md={3} lg={2}>
                    <div>
                    <img className={"xdc-logo inline"} src={logo} />
                    <p className={"xdc-icon inline"}>XDC</p>
                    </div>
                    <p className={"xdc-desc"}>
                    XinFinScan is a Block Explorer and Analytics Platform for XDC, a decentralized smart contracts platform.
                    </p>
                    <div>
                    <Select  id="currency" className={"inline select-xdc"} defaultValue="INR">
                        <MenuItem value="USD"   selected="selected">
                            <img className="select-icon" src={DOLLAR}/> <span className="USD">USD</span>
                        </MenuItem>
                        <MenuItem value="EUR" >
                        <img className="select-icon" src={EUR}/> <span className="USD">EUR</span>
                        </MenuItem>
                        <MenuItem  value="INR" >
                        <img className="select-icon" src={INR}/> <span className="USD" selected>INR</span>
                        </MenuItem>
                    </Select>
                    <img className={"inline Nmode"} src={NightModeLogo}></img>
                    </div>
                </Grid>
                <Grid alignContent="center" item xs={12} md={3} lg={2}>
                <div className={"Tabletop"}>Community
                    <hr></hr>
                    </div>
                    <ul>
                        <li><a href="https://xinfin.org/about.php" target="_blank">About Community</a></li>
                        <li><a href="https://xinfin.network/#stats" target="_blank">XinFin Network Status</a></li>
                        <li><a href="https://xinfin.org/bounty.php" target="_blank">Community Bounty Program</a></li>
                        <li><a href="https://howto.xinfin.org/" target="_blank">Developer Portal</a></li>
                        <li><a href="https://xinfin.org/setup-masternode.php" target="_blank">Setup MasterNode</a></li>
                        <li><a href="https://xinfin.org/xdc-utility.php" target="_blank">XDC/XDCe Utility</a></li>
                        <li><a href="https://xinfin.org/compliance.php" target="_blank">Compliance</a></li>
                    </ul>
                </Grid>

                <Grid justify="left" item xs={12} md={3} lg={2}>
                    <div className={"Tabletop"}>Other Links
                    <hr></hr>
                    </div>
                    <ul>
                        <li><a href="https://howto.xinfin.org/general/faq/" target="_blank">Read FAQ</a></li>
                        <li><a href="https://xinfin.org/exchange-listing-resource.php" target="_blank">Exchange Listing Resource</a></li>
                        <li><a href="https://xinfin.io/" target="_blank">XDC/XDCE Exchange List</a></li>
                        <li><a href="https://xinfin.org/xinfin-consensus.php" target="_blank">Public DPoS Consensus</a></li>
                        <li><a href="https://xinfin.org/privacy.php" target="_blank">Privacy Policy</a></li>
                        <li><a href="https://xinfin.org/disclaimer.php" target="_blank">Disclaimer</a></li>
                        <li><a href="https://xinfin.org/contactus.php" target="_blank">Press Inquiry</a></li>
                    </ul>
                </Grid>

                <Grid alignContent="center" item xs={12} md={3} lg={2}>
                <div className={"Tabletop"}>Follow Us
                    <hr></hr>
                    </div>
                    <ul>
                        <li><a href="https://twitter.com/XinFin_Official" rel="nofollow" target="_blank"><i className="fab fa-twitter mr-2" />Twitter</a></li>
                        <li><a href="https://www.facebook.com/XinFinHybridBlockchain/" rel="nofollow" target="_blank"><i className="fab fa-facebook mr-2" />Facebook</a></li>
                        <li><a href="https://github.com/XinFinorg" rel="nofollow" target="_blank"><i className="fab fa-github mr-2" />Github</a></li>
                        <li><a href="https://www.linkedin.com/company/xinfin/" rel="nofollow" target="_blank"><i className="fab fa-linkedin mr-2" />LinkedIn</a></li>
                        <li><a href="https://t.me/xinfintalk" rel="nofollow" target="_blank"><i className="fa fa-paper-plane mr-2" />Telegram</a></li>
                        <li><a href="https://www.reddit.com/r/xinfin/" rel="nofollow" target="_blank"><i className="fab fa-reddit mr-2" />Reddit</a></li>
                    </ul>
                </Grid>
                <Grid alignContent="center" item xs={12} md={12} lg={3}>
                <div className={"Tabletop"}>Tweets
                    <hr></hr>
                    </div>
                    <div className={"twitter"}>
                    <a class="twitter-timeline" data-lang="en"  data-height="256" data-theme="light" href="https://twitter.com/XinFin_Official?ref_src=twsrc%5Etfw">Tweets by XinFin_Official</a>
                </div>
                </Grid>
            </Grid>
            <div className="footer">
            <hr></hr>
            <span className={"copyright"}>© 2021 XinFin. All Rights Reserved.</span>
            </div>
            
        </div>





    )
}