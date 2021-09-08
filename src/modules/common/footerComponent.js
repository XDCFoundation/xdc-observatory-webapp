import React, { useEffect, useState } from "react";
import "../../assets/styles/footer.css";
import "../../assets/styles/custom.css";
import INR from "../../assets/images/inr.png";
import EUR from "../../assets/images/euro.png";
import USD from "../../assets/images/usd.png";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import { MenuItem } from "material-ui";
import { useSelector, useDispatch } from "react-redux";
import { usdCurrency, eurCurrency, inrCurrency } from "../../actions/index";
import styled from "styled-components";
export default function FooterComponent(props) {
  const [activeCurrency, setActiveCurrency] = useState("USD");

  useEffect(() => {
    let CurrencyValue = window.localStorage.getItem("currency");
    if (!CurrencyValue) {
      window.localStorage.setItem("currency", "USD");
    } else {
      setActiveCurrency(window.localStorage.getItem("currency"));
    }
  }, []);
  const handleChange = (event) => {
    window.localStorage.setItem("currency", event.target.value);
    setActiveCurrency(event.target.value);
  };
  //const currencyState = useSelector((state)=>state.activeCurrency)
 
  const FirstCloumn = styled.div`
    
    @media (max-width:640px){
        display: flex;
        flex-direction: row;
        width: 100%;
    
    }
    @media (max-width: 1023px) {
      display: flex;
      flex-direction:column;
      width: 33%;
    }
    
  `;
  const SecondCloumn = styled.div`
    
    @media (max-width:640px){
        display: flex;
        flex-direction: row;
        width: 100%;
        
    }
    @media (max-width: 1023px) {
      display: flex;
      flex-direction: row;
      width: 66%;     
    }
    
  `;
  const ThirdCloumn = styled.div`
    
    @media (max-width:640px){
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    @media (max-width: 1023px) {
      display: flex;
      flex-direction:row;
      width: 100%;
    }
    
  `;

  let CurrencyNow = window.localStorage.getItem("currency");
  return (
    <div className={"footer_base"}>
      <Grid className="footer" container alignContent="center" justify="center">
        <FirstCloumn>
          <Grid alignContent="center" item xs={12} md={3} lg={2}>
            <div className="Top-Header">
              <img
                style={{ width: 24, height: 24 }}
                className="Shape-footer"
                src={require("../../../src/assets/images/XDC-Icon.png")}
              ></img>
              <p className="XDC-Header">XDC</p>
            </div>
            <p className="xdc-desc">
              XinFinScan is a Block Explorer and Analytics Platform for XDC, a
              decentralized smart contracts platform.
            </p>
            <div>
              <Select
                style={{
                  outline: "0",
                  backgroundColor: "#2149b9",
                }}
                id="currency"
                className={"filled select-xdc"}
                defaultValue="USD"
                onChange={(event) => props._handleChange(event)}
                value={CurrencyNow}
              >
                {/* disabled={props.showDropDown ? !props.showDropDown : false} */}
                <MenuItem
                  value="USD"
                  selected="selected"
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: 435, left: 600 }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  style={{
                    outline: "0",
                    backgroundColor: "#2149b9",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  <img className="select-icon" src={USD} />{" "}
                  <span className="USD" selected>
                    USD
                  </span>
                </MenuItem>
                <MenuItem
                  value="EUR"
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: 435, left: 600 }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  style={{
                    outline: "0",
                    backgroundColor: "#2149b9",
                  }}
                >
                  <img className="select-icon" src={EUR} />{" "}
                  <span className="USD">EUR</span>
                </MenuItem>
                <MenuItem
                  value="INR"
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: 435, left: 600 }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  style={{
                    outline: "0",
                    backgroundColor: "#2149b9",
                  }}
                >
                  <img className="select-icon" src={INR} />{" "}
                  <span className="USD">INR</span>
                </MenuItem>
              </Select>
              {/* <select className="select-form">
                            <option>usd</option>

                            <option>inr</option>
                        </select> */}
            </div>
          </Grid>
        </FirstCloumn>

        <SecondCloumn>
          <Grid alignContent="center" item xs={12} md={3} lg={2}>
            <div className="Table-Header">
              Community
              <hr style={{ marginRight: "20px" }}></hr>
            </div>
            <div>
              <ul>
                <li className="Table-Comp">
                  <a href="https://xinfin.org/about.php" target="_blank">
                    About Community
                  </a>
                </li>
                <li className="Table-Comp">
                  <a href="https://xinfin.network/#stats" target="_blank">
                    XinFin Network Status
                  </a>
                </li>
                <li className="Table-Comp">
                  <a href="https://xinfin.org/bounty.php" target="_blank">
                    Community Bounty Program
                  </a>
                </li>
                <li className="Table-Comp">
                  <a href="https://howto.xinfin.org/" target="_blank">
                    Developer Portal
                  </a>
                </li>
                <li className="Table-Comp">
                  <a
                    href="https://xinfin.org/setup-masternode.php"
                    target="_blank"
                  >
                    Setup MasterNode
                  </a>
                </li>
                <li className="Table-Comp">
                  <a href="https://xinfin.org/xdc-utility.php" target="_blank">
                    XDC/XDCe Utility
                  </a>
                </li>
                <li className="Table-Comp">
                  <a href="https://xinfin.org/compliance.php" target="_blank">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </Grid>

          <Grid justify="left" item xs={12} md={3} lg={2}>
            <div className="Table-Header">
              Other Links
              <hr style={{ marginRight: "20px" }}></hr>
            </div>
            <ul>
              <li className="Table-Comp">
                <a href="https://howto.xinfin.org/general/faq/" target="_blank">
                  Read FAQ
                </a>
              </li>
              <li className="Table-Comp">
                <a
                  href="https://xinfin.org/exchange-listing-resource.php"
                  target="_blank"
                >
                  Exchange Listing Resource
                </a>
              </li>
              <li className="Table-Comp">
                <a href="https://xinfin.io/" target="_blank">
                  XDC/XDCE Exchange List
                </a>
              </li>
              <li className="Table-Comp">
                <a
                  href="https://xinfin.org/xinfin-consensus.php"
                  target="_blank"
                >
                  Public DPoS Consensus
                </a>
              </li>
              <li className="Table-Comp">
                <a href="https://xinfin.org/privacy.php" target="_blank">
                  Privacy Policy
                </a>
              </li>
              <li className="Table-Comp">
                <a href="https://xinfin.org/disclaimer.php" target="_blank">
                  Disclaimer
                </a>
              </li>
              <li className="Table-Comp">
                <a href="https://xinfin.org/contactus.php" target="_blank">
                  Press Inquiry
                </a>
              </li>
            </ul>
          </Grid>
        </SecondCloumn>

        <ThirdCloumn>

        <Grid alignContent="center" item xs={12} md={3} lg={2}>
          <div className="Table-Header">
            Follow Us
            <hr style={{ marginRight: "20px" }}></hr>
          </div>
          <ul>
            <li className="Table-Comp">
              <a
                className="a-style"
                href="https://twitter.com/XinFin_Official"
                rel="nofollow"
                target="_blank"
              >
                <span style={{ paddingLeft: "3px", marginRight: "3px" }}></span>
                Twitter
              </a>
            </li>
            <li className="Table-Comp">
              <a
                className="a-style"
                href="https://www.facebook.com/XinFinHybridBlockchain/"
                rel="nofollow"
                target="_blank"
              >
                <span style={{ paddingLeft: "3px", marginRight: "3px" }}></span>
                Facebook
              </a>
            </li>
            <li className="Table-Comp">
              <a
                className="a-style"
                href="https://github.com/XinFinorg"
                rel="nofollow"
                target="_blank"
              >
                <span style={{ paddingLeft: "3px", marginRight: "3px" }}></span>
                Github
              </a>
            </li>
            <li className="Table-Comp">
              <a
                className="a-style"
                href="https://www.linkedin.com/company/xinfin/"
                rel="nofollow"
                target="_blank"
              >
                <span style={{ paddingLeft: "3px", marginRight: "3px" }}></span>
                LinkedIn
              </a>
            </li>
            <li className="Table-Comp">
              <a
                className="a-style"
                href="https://t.me/xinfintalk"
                rel="nofollow"
                target="_blank"
              >
                <span style={{ paddingLeft: "3px", marginRight: "3px" }}></span>
                Telegram
              </a>
            </li>
            <li className="Table-Comp">
              <a
                className="a-style"
                href="https://www.reddit.com/r/xinfin/"
                rel="nofollow"
                target="_blank"
              >
                <span style={{ paddingLeft: "3px", marginRight: "3px" }}></span>
                Reddit
              </a>
            </li>
          </ul>
        </Grid>
        <Grid alignContent="center" item xs={12} md={6} lg={2}>
          <div className="Table-Header">
            Twitter
            <hr style={{ marginRight: "2px" }}></hr>
          </div>
          <div className={"twitter"}>
            <a
              class="twitter-timeline"
              data-lang="en"
              data-height="220"
              data-theme="light"
              href="https://twitter.com/XinFin_Official?ref_src=twsrc%5Etfw"
            ></a>
          </div>
        </Grid>
        </ThirdCloumn>
      </Grid>

      <div className="footer-line">
        <hr></hr>
        <span className={"copyright"}>© 2021 XinFin. All Rights Reserved.</span>
      </div>
    </div>
  );
}
