import React from 'react';


export default function VerifyContract() {

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>

                <div className="paper-verify-contracts" elevation={3}>

                    <div className="verify-contracts-head">Verify and Publish Contract Source Code</div><br />
                    <textarea readOnly className="textarea-verify-contract" value="Enter Contract Source Code below." />
                    <br /><br />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="vc-contract-add">Contract Address
                            <div>
                                <input className="vc-input-contract-add" type="text" placeholder="Contract Address" />
                            </div>
                        </div>
                        <div className="vc-contract-name" >Contract Name
                            <div>
                                <input className="vc-input-contract-name" type="text" placeholder="Contract Name" />
                            </div>
                        </div>

                        <div className="vc-contract-compiler">Compiler
                            <div>
                                <select className="vc-contract-add-select">
                                    <option selected>Select compiler</option>
                                    <option>dummy</option>
                                    <option>dummy</option>
                                    <option>duumy</option>
                                </select>
                            </div>
                        </div>


                    </div>
                    <br />
                    <div className="verify-contracts-head">Contract Code</div>
                    <input readOnly className="textarea-contract-code" />

                    <br /><br />

                    <div className="constructor-arg">Constructor arguments ABI-encoded (OPTIONAL required for certain contracts only)</div>
                    <input readOnly className="textarea-constructor-arg" placeholder="Constructor Arguments" />
                    <br /><br />

                    <div>
                        <button style={{ backgroundColor: '#3763dd', borderRadius: '4px' }} className="validate-button">Validate Code</button>
                        <button style={{ backgroundColor: '#9fa9ba', borderRadius: '4px' }} className="reset-button">Reset</button>
                    </div>

                </div>
            </div>
        </>
    );
}