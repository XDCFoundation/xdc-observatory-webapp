import { Paper } from 'material-ui';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function TokenContracttab() {

    return (

        <>
            <Paper style={{ borderRadius: '14px',boxShadow: '0 2px 15px 0 rgba(0, 0, 0, 0.1)',border: 'solid 1px #e3e7eb' }} elevation={3}>
                <div className="container">
                    <div style={{ marginTop: '15px' }} className="contract-source"><span style={{color: '#03be46', marginRight: '5px', fontSize: '14'}}><i class="fa fa-check-circle-o" aria-hidden="true"></i></span>Contract Source Code verified</div>
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
                        <div className="contract-source-2"> Contract Source-Code Verified </div>
                        <div>
                            <CopyToClipboard text="Contract-source Code Verified">
                                <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i class="fa fa-clone" aria-hidden="true"></i></button>
                            </CopyToClipboard>
                        </div>
                    </div>

                    <div>
                        <textarea style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9' }} readOnly className="input-area-3" value="Contract-source Code Verified" />
                    </div>

                    <br />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div  className="contract-source-2">Contract ABI</div>
                        <div>
                            <CopyToClipboard text="abcd">
                                <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i class="fa fa-clone" aria-hidden="true"></i></button>
                            </CopyToClipboard>
                        </div>
                    </div>

                    <div>
                        <textarea style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9' }} readOnly className="input-area-3" />
                    </div>

                    <br />

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div  className="contract-source-2">Contract Byte-Code</div>
                        <div>
                            <CopyToClipboard text="abcd">
                                <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i class="fa fa-clone" aria-hidden="true"></i></button>
                            </CopyToClipboard>
                        </div>
                    </div>

                    <div>
                        <textarea style={{ borderLeftWidth: '6px', borderLeftColor: '#2149b9' }} readOnly className="input-area-4" />
                    </div>
                
                </div>
                <br/>
            </Paper>
        </>

    )
}