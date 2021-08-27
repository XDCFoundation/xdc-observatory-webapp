import { Paper } from 'material-ui';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import verified from '../../assets/images/verified.png';
import code from '../../assets/images/code.png';
import abi from '../../assets/images/abi.png';
import bytecod from '../../assets/images/bytecod.png';
import Tooltip from "@material-ui/core/Tooltip";
export default function TokenContracttab(props) {
    let verifiedData = props?.contractData
    console.log(verifiedData, "::::")
    const [copiedText, setCopiedText] = useState("");
    return (

        <>
            <Paper style={{ borderRadius: '14px', boxShadow: ' 0 1px 10px 0 rgba(0, 0, 0, 0.1)' }} elevation={0}>
                <div className="container">
                    <div style={{ marginTop: '15px', alignItems: 'center' }} className="contract-source"><span style={{ color: '#03be46', marginRight: '5px', fontSize: '14', alignItems: "center" }}><img className="verified-logo" src={verified} ></img></span>Contract Source Code Verified</div>
                    <br /><br />
                    {/* <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
                        <div style={{ display: "flex", flexDirection: "column", flex: 0.5 }}>
                            <div style={{
                                display: "flex", flex: 0.5
                            }}>
                                <div>Helloo
                                </div>
                                <div style={{ marginLeft: "10px" }}>Helloo
                                </div>
                            </div>
                            <div style={{
                                display: "flex"
                            }}>
                                <div >Helloo
                                </div>
                                <div>Helloo
                                </div>
                            </div>



                        </div>
                        <div style={{ display: "flex", flexDirection: "column", flex: 0.5 }}>
                            <div style={{
                                display: "flex", flex: 0.5
                            }}>
                                <div>Helloo
                                </div>
                                <div>Helloo
                                </div>
                            </div>
                            <div style={{
                                display: "flex", flex: 0.5
                            }}>
                                <div>Helloo
                                </div>
                                <div>Helloo
                                </div>
                            </div>


                        </div>
                    </div> */}
                    <div style={{ display: 'flex', flexDirection: 'row', }}>

                        <div style={{ flexGrow: 0 }} className="contract-name">Contract Name</div>
                        <div style={{ flexGrow: 0.56 }} className="Fiat-Token">{verifiedData.contractName}</div>
                        <div style={{ flexGrow: 0.09 }} className="contract-name">Optimization-enabled </div>
                        <div className="Fiat-Token">{(props?.contractData?.optimization)?.toString() === "false" ? "No" : "Yes"}</div>

                    </div>
                    <hr className="myhr2" /> <hr className="myhr3" />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <div className="contract-name">Compiler Version</div>
                        <div style={{ flexGrow: 0.69 }} className="Fiat-Token">{verifiedData.compilerVersion}</div>
                        <div className="contract-name">Share on Social Media</div>
                        <div className="Fiat-Token" ><p className="not-available-token">Not available</p></div>
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
                        <textarea style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9', outline: "none" }} readOnly className="input-area-3" value="Contract-source Code Verified" />
                    </div>

                    <br />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="contract-source-2"><img className="code-logo" src={abi} />Contract ABI</div>
                        <div>
                            <CopyToClipboard text={verifiedData.abi}
                                onCopy={() => setCopiedText(verifiedData.abi)}>
                                <Tooltip
                                    title={
                                        copiedText === verifiedData.abi
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
                        <textarea value={verifiedData.abi} style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9', outline: "none" }} readOnly className="input-area-3" />
                    </div>

                    <br />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="contract-source-2"><img className="code-logo" src={bytecod} />Contract Byte-Code</div>
                        <div>
                            <CopyToClipboard text={verifiedData.byteCode}
                                onCopy={() => setCopiedText(verifiedData.byteCode)}>
                                <Tooltip
                                    title={
                                        copiedText === verifiedData.byteCode
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
                        <textarea value={verifiedData.byteCode} style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9', outline: "none" }} readOnly className="input-area-4" />
                    </div>

                </div>
                <br />
            </Paper>
        </>

    )
}