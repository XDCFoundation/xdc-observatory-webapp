import React from "react";
import "../../assets/styles/footer.css";
import "../../assets/styles/custom.css";
import INR from "../../assets/images/inr.png";
import EUR from "../../assets/images/euro.png";
import DOLLAR from "../../assets/images/dollar.png";
import Grid from '@material-ui/core/Grid'
import Select from "@material-ui/core/Select"
import { MenuItem } from "material-ui";



export default function FooterComponent() {
    return (
        <div className={"footer_base"}>
            <Grid className="footer" container alignContent="center" justify="center">
                <Grid alignContent="center" item xs={12} md={3} lg={2}>
                    <div className="Top-Header">
                        <img style={{ width: 24, height: 24 }} className="Shape-footer" src={require("../../../src/assets/images/XDC-Icon.png")}></img>
                        <p className="XDC-Header">XDC</p>
                    </div>
                    <p className="xdc-desc">
                        XinFinScan is a Block Explorer and Analytics Platform for XDC, a decentralized smart contracts platform.
                    </p>
                    <div>
                        <Select id="currency" className={"filled select-xdc"} defaultValue="USD">
                            <MenuItem value="USD" selected="selected">
                                <img className="select-icon" src={DOLLAR} /> <span className="USD" selected>USD</span>
                            </MenuItem>
                            <MenuItem value="EUR" >
                                <img className="select-icon" src={EUR} /> <span className="USD">EUR</span>
                            </MenuItem>
                            <MenuItem value="INR" >
                                <img className="select-icon" src={INR} /> <span className="USD" >INR</span>
                            </MenuItem>
                        </Select>
                        {/* <select className="select-form">
                            <option>usd</option>

                            <option>inr</option>
                        </select> */}
                    </div>
                </Grid>

                <Grid alignContent="center" item xs={12} md={3} lg={2}>
                    <div className="Table-Header">Community
                        <hr style={{ marginRight: '20px' }}></hr>
                    </div>
                    <div >
                        <ul >
                            <li className="Table-Comp"><a href="https://xinfin.org/about.php" target="_blank">About Community</a></li>
                            <li className="Table-Comp"><a href="https://xinfin.network/#stats" target="_blank">XinFin Network Status</a></li>
                            <li className="Table-Comp"><a href="https://xinfin.org/bounty.php" target="_blank">Community Bounty Program</a></li>
                            <li className="Table-Comp"><a href="https://howto.xinfin.org/" target="_blank">Developer Portal</a></li>
                            <li className="Table-Comp"><a href="https://xinfin.org/setup-masternode.php" target="_blank">Setup MasterNode</a></li>
                            <li className="Table-Comp"><a href="https://xinfin.org/xdc-utility.php" target="_blank">XDC/XDCe Utility</a></li>
                            <li className="Table-Comp"><a href="https://xinfin.org/compliance.php" target="_blank">Compliance</a></li>
                        </ul>
                    </div>

                </Grid>

                <Grid justify="left" item xs={12} md={3} lg={2}>
                    <div className="Table-Header">Other Links
                        <hr style={{ marginRight: '20px' }}></hr>
                    </div>
                    <ul>
                        <li className="Table-Comp"><a href="https://howto.xinfin.org/general/faq/" target="_blank">Read FAQ</a></li>
                        <li className="Table-Comp"><a href="https://xinfin.org/exchange-listing-resource.php" target="_blank">Exchange Listing Resource</a></li>
                        <li className="Table-Comp"><a href="https://xinfin.io/" target="_blank">XDC/XDCE Exchange List</a></li>
                        <li className="Table-Comp"><a href="https://xinfin.org/xinfin-consensus.php" target="_blank">Public DPoS Consensus</a></li>
                        <li className="Table-Comp"><a href="https://xinfin.org/privacy.php" target="_blank">Privacy Policy</a></li>
                        <li className="Table-Comp"><a href="https://xinfin.org/disclaimer.php" target="_blank">Disclaimer</a></li>
                        <li className="Table-Comp"><a href="https://xinfin.org/contactus.php" target="_blank">Press Inquiry</a></li>
                    </ul>
                </Grid>

                <Grid alignContent="center" item xs={12} md={3} lg={2}>
                    <div className="Table-Header">Follow Us
                        <hr style={{ marginRight: '20px' }}></hr>
                    </div>
                    <ul>
                        <li className="Table-Comp"><a className="a-style" href="https://twitter.com/XinFin_Official" rel="nofollow" target="_blank"><span style={{ paddingLeft: '5px', marginRight: '5px' }}><i class="fa fa-twitter" aria-hidden="true"></i></span>Twitter</a></li>
                        <li className="Table-Comp"><a className="a-style" href="https://www.facebook.com/XinFinHybridBlockchain/" rel="nofollow" target="_blank"><span style={{ paddingLeft: '5px', marginRight: '5px' }}><i class="fa fa-facebook" aria-hidden="true"></i></span>Facebook</a></li>
                        <li className="Table-Comp"><a className="a-style" href="https://github.com/XinFinorg" rel="nofollow" target="_blank"><span style={{ paddingLeft: '5px', marginRight: '5px' }}><i class="fa fa-github" aria-hidden="true"></i></span>Github</a></li>
                        <li className="Table-Comp"><a className="a-style" href="https://www.linkedin.com/company/xinfin/" rel="nofollow" target="_blank"><span style={{ paddingLeft: '5px', marginRight: '5px' }}><i class="fa fa-linkedin" aria-hidden="true"></i></span>LinkedIn</a></li>
                        <li className="Table-Comp"><a className="a-style" href="https://t.me/xinfintalk" rel="nofollow" target="_blank"><span style={{ paddingLeft: '5px', marginRight: '5px' }} ><i class="fa fa-telegram" aria-hidden="true"></i></span>Telegram</a></li>
                        <li className="Table-Comp"><a className="a-style" href="https://www.reddit.com/r/xinfin/" rel="nofollow" target="_blank"><span style={{ paddingLeft: '5px', marginRight: '5px' }}><i class="fa fa-reddit-alien" aria-hidden="true" /></span>Reddit</a></li>
                    </ul>
                </Grid>
                <Grid alignContent="center" item xs={12} md={6} lg={2}>
                    <div className="Table-Header">Twitter
                        <hr style={{ marginRight: '2px' }}></hr>

                    </div>
                    <div className={"twitter"}>
                        <a class="twitter-timeline" data-lang="en" data-height="220" data-theme="light" href="https://twitter.com/XinFin_Official?ref_src=twsrc%5Etfw"></a>
                    </div>


                </Grid>

            </Grid>

            <div className="footer-line">
                <hr></hr>
                <span className={"copyright"}>© 2021 XinFin. All Rights Reserved.</span>
            </div>

        </div>

    )

}
