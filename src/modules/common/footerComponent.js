import React, { useEffect, useState } from "react";
import "../../assets/styles/footer.css";
import "../../assets/styles/custom.css";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import DownArrow from "@material-ui/icons/KeyboardArrowDown";
import { MenuItem } from "material-ui";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";
import TimeZoneSelector from "./timeZoneSlector";
import { useDispatch, useSelector } from "react-redux";
import timezone from "../../reducers/timezone";

const useStyles = makeStyles((theme) => ({
    currencyPopup: {
        marginLeft: "10px",
    }
}));


const BlankSpaceDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 1241px) {
    width: 40%;
    display: contents;
  }
`;

const FirstCloumn = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 20%;

  @media (min-width: 0px) and (max-width: 767px) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    display: flex;
    flex-direction: column;
    width: 33%;
  }
`;
const SecondCloumn = styled.div`
  /* width: 100%; */
  //display: flex;
  /* flex-direction: column; */
  width: auto;
  @media (min-width: 0px) and (max-width: 767px) {
    //display: flex;
    flex-direction: row;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    //display: flex;
    flex-direction: row;
    width: 66%;
    padding-top: 40px;
  }
`;

const SecondColumnWithFlex = styled.div`
  /* width: 100%; */
  display: flex;
  /* flex-direction: column; */
  width: auto;
  @media (min-width: 0px) and (max-width: 767px) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    display: flex;
    flex-direction: row;
    width: 66%;
    padding-top: 32px;
    padding-left: 20px;
  }
`;

const ThirdCloumn = styled.div`
  display: flex;
  width: 40%;

  /* width: 100%; */
  @media (min-width: 0px) and (max-width: 767px) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    display: flex;
    flex-direction: row;
    width: 66%;
    padding-left: 20px;
  }
`;

const ThirdCloumnWithoutFlex = styled.div`
  width: 40%;

  /* width: 100%; */
  @media (min-width: 0px) and (max-width: 767px) {
    //display: flex;
    flex-direction: row;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1240px) {
    //display: flex;
    flex-direction: row;
    width: 66%;
  }
`;
export default function FooterComponent(props) {
    const classes = useStyles();
    const [activeCurrency, setActiveCurrency] = useState("USD");
    const [timeZone, setActiveTimeZone] = useState("");

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
    const zone = useSelector((state) => state.timezone)
    useEffect(() => setActiveTimeZone(zone), [])
    const dispatch = useDispatch();
    function timeZoneHandler(tz) {
        setActiveTimeZone(tz.target.value)
        dispatch({ type: 'TIME_ZONE', payload: tz.target.value })
    }

    let CurrencyNow = window.localStorage.getItem("currency");
    return (
        <div className={"footer_base"}>
            <Grid className="footer" container alignContent="center" justify="center">
                <FirstCloumn>
                    <Grid
                        alignContent="center"
                        item
                        xs={12}
                        className="XDC-Block-Width-tablet"
                    >
                        <div className="for-button">
                            <div>
                                <div className="Top-Header">
                                    <img
                                        className="Shape-footer"
                                        src={"/images/XDC-Icon-Logo.svg"}
                                        alt={'logo'} />
                                    <p className="XDC-Header">XDC</p>
                                </div>
                                <p className="xdc-desc">
                                    The XDC Observatory is a feature-rich block explorer and analytics platform for the
                                    XDC Network.
                                </p>
                            </div>
                        </div>
                        <div className="button-Padding-Mobile display-flex flex-direction-column">
                            <Select classes={{ paper: classes.currencyPopup }}
                                /* <Select  SelectProps={{ MenuProps: { PaperProps: {background: "red !important"} } }}  */
                                style={{
                                    outline: "0",
                                    backgroundColor: "#2149b9",
                                }}
                                id="currency"
                                className={"filled select-xdc"}
                                defaultValue="USD"
                                onChange={(event) => props._handleChange(event)}
                                value={CurrencyNow}
                                IconComponent={DownArrow}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "center",
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "center",
                                    }, PaperProps: {
                                        style: {
                                            backgroundColor: "#2149b9",
                                            fontSize: '0.8rem'
                                        },
                                    },
                                    getContentAnchorEl: null,
                                }}
                            >
                                {/* disabled={props.showDropDown ? !props.showDropDown : false} */}
                                <MenuItem
                                    id="cureency"
                                    value="USD"

                                    selected="selected"
                                    style={{
                                        outline: "0",
                                        backgroundColor: "#2149b9",
                                        paddingTop: "0px !important",
                                        paddingBottom: "0px !important",
                                    }}
                                >
                                    <img className="select-icon" src={"/images/dollar.svg"} />{" "}
                                    <span className="USD" selected>
                                        USD
                                    </span>
                                </MenuItem>
                                <MenuItem
                                    value="EUR"
                                    style={{
                                        outline: "0",
                                        backgroundColor: "#2149b9",
                                    }}
                                >
                                    <img className="select-icon" src={"/images/Euro.svg"} />{" "}
                                    <span className="USD">EUR</span>
                                </MenuItem>
                                {/* <MenuItem
                  value="INR"
                  style={{
                    outline: "0",
                    backgroundColor: "#2149b9",
                  }}
                >
                  <img className="select-icon" src={"/images/INR.svg"} />{" "}
                  <span className="USD">INR</span>
                </MenuItem> */}
                            </Select>
                            <TimeZoneSelector value={timeZone} height={33} handler={timeZoneHandler} />
                            {/* <select className="select-form">
                            <option>usd</option>

                            <option>inr</option>
                        </select> */}
                        </div>
                    </Grid>
                </FirstCloumn>

                <SecondColumnWithFlex>
                    <Grid
                        alignContent="center"
                        item
                        xs={12}
                        className="communityContainer"
                    // style={{margin: " 0px 0px 10px 0px"}}
                    >
                        <div className="Table-Header text-align-left">
                            Community
                            <div style={{ width: "100%" }}>
                                <hr></hr>
                            </div>
                        </div>

                        {/* <div className="Table-Comp">
                            <a href="https://xinfin.org/about.php" target="_blank">
                                About Community
                            </a>
                        </div> */}
                        <div className="Table-Comp">
                            <a href="https://medium.com/xdc-foundation-communications" target="_blank">
                                XDC Foundation Medium
                            </a>
                        </div>

                        <div className="Table-Comp">
                            <a href="https://stats.xdc.org/" target="_blank">
                                XDC Network Stats
                            </a>
                        </div>

                        {/* <div className="Table-Comp">
                            <a href="https://xinfin.org/bounty.php" target="_blank">
                                Community Bounty Program
                            </a>
                        </div> */}

                        {/* <div className="Table-Comp">
                            <a href="https://howto.xinfin.org/" target="_blank">
                                Developer Portal
                            </a>
                        </div> */}

                        <div className="Table-Comp">
                            <a href="https://xinfin.org/setup-masternode.php" target="_blank">
                                Setup MasterNode
                            </a>
                        </div>

                        <div className="Table-Comp">
                            <a href="https://xdcroadmap.org/" target="_blank">
                                XDC Roadmap
                            </a>
                        </div>

                        {/* <div className="Table-Comp">
                            <a href="https://xinfin.org/xdc-utility.php" target="_blank">
                                XDC Utility
                            </a>
                        </div> */}
                        <div className="Table-Comp">
                            <a href="https://docs.xdc.org/" target="_blank">
                                XDC Docs
                            </a>
                        </div>



                        {/* <div className="Table-Comp">
                            <a href="https://xinfin.org/compliance.php" target="_blank">
                                Compliance
                            </a>
                        </div> */}
                    </Grid>

                    <Grid
                        justify="left"
                        item
                        xs={12}
                        style={{ margin: " 0 10px 10px 10px" }}
                        className="desktop-column-display"
                    >
                        <div className="Table-Header">
                            Other Links
                            <hr></hr>
                        </div>
                        <ul>

                            <li className="Table-Comp">
                                <a
                                    href="https://xinfin.org/exchange-listing-resource.php"
                                    target="_blank"
                                >
                                    Exchange Listing Resource
                                </a>
                            </li>
                            {/* <li className="Table-Comp">
                                <a href="https://xinfin.io/" target="_blank">
                                    XDC Exchange List
                                </a>
                            </li>
                            <li className="Table-Comp">
                                <a
                                    href="https://xinfin.org/xinfin-consensus.php"
                                    target="_blank"
                                >
                                    Public DPoS Consensus
                                </a>
                            </li> */}
                            <li className="Table-Comp">
                                <a href="https://observer.xdc.org/privacy-policy" target="_blank">
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="Table-Comp">
                                <a href="https://observer.xdc.org/term-conditions" target="_blank">
                                    Terms of Use
                                </a>
                            </li>
                            <li className="Table-Comp">
                                <a href="https://docs.xdc.org/sdks-and-examples" target="_blank">
                                    XDC SDKs
                                </a>
                            </li>
                            <li className="Table-Comp">
                                <a href="https://docs.xdc.org/resources/faqs" target="_blank">
                                    Read FAQ
                                </a>
                            </li>
                            {/* <li className="Table-Comp">
                                <a href="https://xinfin.org/contactus.php" target="_blank">
                                    Press Inquiry
                                </a>
                            </li> */}
                        </ul>
                    </Grid>
                </SecondColumnWithFlex>

                <SecondCloumn className="mobile-column-display">
                    <Grid
                        justify="left"
                        item
                        xs={12}
                        style={{ margin: " 20px 0px 10px 0px" }}
                    >
                        <div className="Table-Header">
                            Other Links
                            <hr></hr>
                        </div>
                        <ul>

                            <li className="Table-Comp">
                                <a
                                    href="https://xinfin.org/exchange-listing-resource.php"
                                    target="_blank"
                                >
                                    Exchange Listing Resource
                                </a>
                            </li>
                            {/* <li className="Table-Comp">
                                <a href="https://xinfin.io/" target="_blank">
                                    XDC Exchange List
                                </a>
                            </li> */}
                            {/* <li className="Table-Comp">
                                <a
                                    href="https://xinfin.org/xinfin-consensus.php"
                                    target="_blank"
                                >
                                    Public DPoS Consensus
                                </a>
                            </li> */}
                            <li className="Table-Comp">
                                <a href="https://observer.xdc.org/privacy-policy" target="_blank">
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="Table-Comp">
                                <a href="https://observer.xdc.org/term-conditions" target="_blank">
                                    Terms of Use
                                </a>
                            </li>
                            <li className="Table-Comp">
                                <a href="https://docs.xdc.org/sdks-and-examples" target="_blank">
                                    XDC SDKs
                                </a>
                            </li>
                            <li className="Table-Comp">
                                <a href="https://medium.com/xdc-foundation-communications" target="_blank">
                                    Read FAQ
                                </a>
                            </li>
                            {/* <li className="Table-Comp">
                                <a href="https://xinfin.org/contactus.php" target="_blank">
                                    Press Inquiry
                                </a>
                            </li> */}
                        </ul>
                    </Grid>
                </SecondCloumn>

                <BlankSpaceDiv>
                    <div></div>
                    <ThirdCloumn>
                        <Grid
                            alignContent="center"
                            item
                            xs={12}
                            className="follow-us-margin"
                        >
                            <div className="Table-Header">
                                Follow Us
                                <hr style={{ marginRight: "20px" }}></hr>
                            </div>
                            <ul>
                                <li className="Table-Comp">
                                    <a
                                        className="a-style"
                                        href="https://github.com/XDCFoundation/"
                                        rel="nofollow"
                                        target="_blank"
                                    >
                                        <span
                                            // style={{ paddingLeft: "3px", marginRight: "3px" }}
                                        ></span>
                                        XDC Foundation Github
                                    </a>
                                </li>
                                <li className="Table-Comp">
                                    <a
                                        className="a-style"
                                        href="https://github.com/XinFinorg"
                                        rel="nofollow"
                                        target="_blank"
                                    >
                                        <span
                                            // style={{ paddingLeft: "3px", marginRight: "3px" }}
                                        ></span>
                                        XinFin Fintech Github
                                    </a>
                                </li>
                                <li className="Table-Comp">
                                    <a
                                        className="a-style"
                                        href="https://www.facebook.com/XDCFoundation"
                                        rel="nofollow"
                                        target="_blank"
                                    >
                                        <span
                                            // style={{ paddingLeft: "3px", marginRight: "3px" }}
                                        ></span>
                                        Facebook
                                    </a>
                                </li>
                                <li className="Table-Comp">
                                    <a
                                        className="a-style"
                                        href="https://www.youtube.com/channel/UCXAAtlD-CRraNJKzDTF4pfg"
                                        rel="nofollow"
                                        target="_blank"
                                    >
                                        <span
                                            // style={{ paddingLeft: "3px", marginRight: "3px" }}
                                        ></span>
                                        Youtube
                                    </a>
                                </li>
                                <li className="Table-Comp">
                                    <a
                                        className="a-style"
                                        href="https://twitter.com/XDCFoundation"
                                        rel="nofollow"
                                        target="_blank"
                                    >
                                        <span
                                            // style={{ paddingLeft: "3px", marginRight: "3px" }}
                                        ></span>
                                        Twitter
                                    </a>
                                </li>



                                {/* <li className="Table-Comp">
                                    <a
                                        className="a-style"
                                        href="https://www.linkedin.com/company/xinfin/"
                                        rel="nofollow"
                                        target="_blank"
                                    >
                    <span
                        // style={{paddingLeft: "3px", marginRight: "3px"}}
                    ></span>
                                        LinkedIn
                                    </a>
                                </li> */}

                                {/* <li className="Table-Comp">
                                    <a
                                        className="a-style"
                                        href="https://t.me/xinfintalk"
                                        rel="nofollow"
                                        target="_blank"
                                    >
                    <span
                        // style={{paddingLeft: "3px", marginRight: "3px"}}
                    ></span>
                                        Telegram
                                    </a>
                                </li> */}
                                <li className="Table-Comp">
                                    <a
                                        className="a-style"
                                        href="https://www.reddit.com/user/XDC_Foundation"
                                        rel="nofollow"
                                        target="_blank"
                                    >
                                        <span
                                            // style={{ paddingLeft: "3px", marginRight: "3px" }}
                                        ></span>
                                        Reddit
                                    </a>
                                </li>
                            </ul>
                        </Grid>

                        <Grid
                            alignContent="center"
                            item
                            xs={12}
                            style={{ margin: " 0 10px 10px 10px" }}
                            className="desktop-column-display"
                        >
                            <div className="Table-Header">
                                Tweet
                                <hr style={{ marginRight: "2px" }}></hr>
                            </div>
                            <div className={"twitter"}>
                                <a
                                    class="twitter-timeline"
                                    data-lang="en"
                                    data-height="220"
                                    data-theme="light"
                                    href="https://twitter.com/XDCFoundation"
                                // href="https://twitter.com/XinFin_Official?ref_src=twsrc%5Etfw" //---->old link
                                ></a>
                            </div>
                        </Grid>
                    </ThirdCloumn>


                </BlankSpaceDiv>

                <ThirdCloumnWithoutFlex className="mobile-column-display">
                    <Grid
                        alignContent="center"
                        item
                        xs={12}
                        style={{ margin: " 20px 0px 10px 0px" }}
                    >
                        <div className="Table-Header">
                            Tweet
                            <hr style={{ marginRight: "2px" }}></hr>
                        </div>
                        <div className={"twitter"}>
                            <a
                                class="twitter-timeline"
                                data-lang="en"
                                data-height="220"
                                data-theme="light"
                                href="https://twitter.com/XDCFoundation"
                            // href="https://twitter.com/XinFin_Official?ref_src=twsrc%5Etfw" //---->old link
                            ></a>
                        </div>
                    </Grid>
                </ThirdCloumnWithoutFlex>
            </Grid>
            <div className="footer-line">
                <hr></hr>
                <span className={"copyright"}>© 2022 XDC Foundation. All Rights Reserved. Version v1.2</span>
            </div>
        </div>
    );
}
