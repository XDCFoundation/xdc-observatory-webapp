import { Paper } from 'material-ui';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import verified from '../../assets/images/verified.png';
import code from '../../assets/images/code.png';
import abi from '../../assets/images/abi.png';
import bytecod from '../../assets/images/bytecod.png';
import Tooltip from "@material-ui/core/Tooltip";
export default function TokenContracttab() {
    const [copiedText, setCopiedText] = useState("");
    return (

        <>
            <Paper style={{ borderRadius: '14px', boxShadow: ' 0 1px 10px 0 rgba(0, 0, 0, 0.1)' }} elevation={0}>
                <div className="container">
                    <div style={{ marginTop: '15px', alignItems: 'center' }} className="contract-source"><span style={{ color: '#03be46', marginRight: '5px', fontSize: '14', alignItems: "center" }}><img className="verified-logo" src={verified} ></img></span>Contract Source Code Verified</div>
                    <br /><br />
                    <div style={{ display: 'flex', flexDirection: 'row', }}>

                        <div style={{ flexGrow: 0.1 }} className="contract-name">Contract Name</div>
                        <div style={{ flexGrow: 0.4 }} className="Fiat-Token">Fiat Token V1</div>
                        <div style={{ flexGrow: 0.18 }} className="contract-name">Optimization-enabled </div>
                        <div className="Fiat-Token">False</div>

                    </div>
                    <hr className="myhr2" /> <hr className="myhr3" />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <div style={{ flexGrow: 0.09 }} className="contract-name">Compiler Version</div>
                        <div style={{ flexGrow: 0.31 }} className="Fiat-Token">v0.4.24+commit.e67f0147</div>
                        <div style={{ flexGrow: 0.21 }} className="contract-name">Share on Social Media</div>
                        <div className="Fiat-Token" ><span style={{ color: '#1da1f2', fontSize: 16 }}><i class="fa fa-twitter" aria-hidden="true"></i></span> <span style={{ marginLeft: '5px', color: '#1da1f2', fontSize: 16 }}> <i class="fa fa-linkedin" aria-hidden="true"></i> </span></div>
                    </div>
                    <hr className="myhr2" /> <hr className="myhr3" />

                    <br />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="contract-source-2"><img className="code-logo" src={code} /> Contract Source Code Verified </div>
                        <div>
                            <CopyToClipboard text="Contract-source Code Verified"
                                onCopy={() => setCopiedText("Contract-source Code Verified")}>
                                <Tooltip
                                    title={
                                        copiedText === "Contract-source Code Verified"
                                            ? "Copied"
                                            : "Copy To Clipboard"
                                    }
                                    placement="top"
                                >
                                    <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i class="fa fa-clone" aria-hidden="true"></i></button>
                                </Tooltip>

                            </CopyToClipboard>
                        </div>
                    </div>

                    <div>
                        <textarea style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9' }} readOnly className="input-area-3" value="Contract-source Code Verified" />
                    </div>

                    <br />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="contract-source-2"><img className="code-logo" src={abi} />Contract ABI</div>
                        <div>
                            <CopyToClipboard text="Contract-source Code Verified"
                                onCopy={() => setCopiedText("Contract-source Code Verified")}>
                                <Tooltip
                                    title={
                                        copiedText === "Contract-source Code Verified"
                                            ? "Copied"
                                            : "Copy To Clipboard"
                                    }
                                    placement="top"
                                >
                                    <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i class="fa fa-clone" aria-hidden="true"></i></button>
                                </Tooltip>

                            </CopyToClipboard>
                        </div>
                    </div>

                    <div>
                        <textarea style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9' }} readOnly className="input-area-3" />
                    </div>

                    <br />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="contract-source-2"><img className="code-logo" src={bytecod} />Contract Byte-Code</div>
                        <div>
                            <CopyToClipboard text="Contract-source Code Verified"
                                onCopy={() => setCopiedText("Contract-source Code Verified")}>
                                <Tooltip
                                    title={
                                        copiedText === "Contract-source Code Verified"
                                            ? "Copied"
                                            : "Copy To Clipboard"
                                    }
                                    placement="top"
                                >
                                    <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i class="fa fa-clone" aria-hidden="true"></i></button>
                                </Tooltip>

                            </CopyToClipboard>
                        </div>
                    </div>

                    <div>
                        <textarea style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9' }} readOnly className="input-area-4" />
                    </div>

                </div>
                <br />
            </Paper>
        </>

    )
}