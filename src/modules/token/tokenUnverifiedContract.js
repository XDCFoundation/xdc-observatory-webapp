import {Paper} from 'material-ui';
import React, {useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tooltip from "@material-ui/core/Tooltip";
import {IoIosWarning} from "react-icons/io"
import {FaShieldAlt} from "react-icons/fa"
import {useHistory,Link } from 'react-router-dom';

export default function TokenUnverifiedContract(props) {

    let unverifiedData = props?.contractData
    const [copiedText, setCopiedText] = useState("");
    const history = useHistory()
    return (

        <>
            <Paper style={{ borderRadius: '14px', boxShadow: ' 0 1px 10px 0 rgba(0, 0, 0, 0.1)' }} elevation={0}>
                <div className="container">

                    <div className="source-code-unverified">
                        <div className="contract-source-code">
                            <div className="contract-text">Contract Source Code</div>
                            <div className="contract-unverified-text"><IoIosWarning className="danger-logo" /><p style={{ color: "rgb(222,105,165)" }}>Unverified</p></div>
                        </div>
                        <hr className="hr-line"></hr>
                        <div className="contract-source-code-verify">
                            <div className="contract-text">Verify</div>
                            <div className="btn-click-div">
                                <a href={"/verify-contracts/" + unverifiedData.address}><button className="click-here-btn" ><FaShieldAlt className="shield-logo" />Click here</button></a>
                                <p className="to-verify-text">to Verify and Publish Source Code</p></div>
                        </div>

                    </div>

                    <br />



                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="contract-source-2"><img className="code-logo" src={require("../../../src/assets/images/bytecode.svg")} /> Contract Byte-Code</div>
                        <div>
                            <CopyToClipboard text={unverifiedData.byteCode}
                                onCopy={() => setCopiedText(unverifiedData.byteCode)}>
                                <Tooltip
                                    title={
                                        copiedText === unverifiedData.byteCode
                                            ? "Copied"
                                            : "Copy To Clipboard"
                                    }
                                    placement="top"
                                >
                                    <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><img className="copy-icon-svg" src={require("../../../src/assets/images/copy.svg")} /></button>
                                </Tooltip>

                            </CopyToClipboard>
                        </div>
                    </div>

                    <div>
                        <textarea style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9', outline: "none" }} readOnly value={unverifiedData.byteCode} className="input-area-bytecode" />
                    </div>

                </div>
                <br />
            </Paper>
        </>

    )
}