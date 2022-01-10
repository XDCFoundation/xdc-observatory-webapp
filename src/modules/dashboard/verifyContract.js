import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Releases from "./list.json";
import contractverify from "../../services/contractverify";
export default function VerifyContract() {
    let address = useParams();

    if (address.address !== undefined) {
        if (address.address.length != undefined) {
            let str = address.address
            if (str.includes("xdc")) {
                let result = str.replace(/^.{3}/g, '0x');
                address = result
            }
        }
    }



    const [isLoading, setisLoading] = useState(false)
    const [msg, setMessage] = useState("")
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef();
    const validationSchema = Yup.object().shape({
        addr: Yup.string()
            .required('Contract address is required'),
        contractname: Yup.string()
            .required('Contract name is required'),
        version: Yup.string()
            .required('Version is required'),
        code: Yup.string()
            .required('Contract code is required')
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema)
    });
    function clearMessage() {
        setMessage("");
    }
    const handleChange = (event) => {
        let txtValue = event.target.value
        if (txtValue !== undefined) {
            if (txtValue.includes("xdc")) {
                setInputValue(txtValue.replace(/^.{3}/g, '0x'))
            } else {
                setInputValue(txtValue)
            }
        }
    }
    const onSubmitHandler = async (data) => {
        let contractAddress = data.addr?.replace(/^.{2}/g, 'xdc');
        try {
            setisLoading(true)
            const resp = await contractverify.getContractVerify(data)
            if (resp[0].Error == 0) {
                let url = "/address/" + contractAddress
                setisLoading(false)
                window.location.href = url;
            } else {
                setisLoading(false)
                setMessage(resp[0].message)
            }
        } catch (err) {
            setisLoading(false)
            //setMessage(err)
        }
    };


    return (
        <>

            <form onSubmit={handleSubmit(onSubmitHandler)} >
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} className={isLoading == true ? "cover-spin-5" : ""}>

                    <div className="paper-verify-contracts" elevation={3}>

                        <div className="verify-contracts-head">Verify and Publish Contract Source Code</div><br />
                        <div className="textarea-verify-contract">
                            <p className="verify-contract-first-div">Enter Contract Source Code below.</p>
                            <p className="verify-contract-first-div-text">If the compiled bytecode matches the Creation Address bytecode, the contract is then Verified and will be published online.</p>
                        </div>
                        <br />
                        {msg ? <p className="validation-error-message txt-center">{msg}</p> : ""}
                        <br />

                        <div className="flex-row">
                            <div className="vc-contract-add">Contract Address
                                {
                                    address.length ? <div>
                                        <input {...register("addr")} name="addr" className="vc-input-contract-add" type="text" placeholder="Contract Address" onChange={handleChange} value={address.length ? address : ""} />
                                    </div> : <div>
                                        <input {...register("addr")} name="addr" className="vc-input-contract-add" type="text" placeholder="Contract Address" onChange={handleChange} value={inputValue} />
                                    </div>
                                }
                                <p className="validation-error-message">{errors?.addr?.message}</p>
                            </div>
                            <div className="vc-contract-name" >Contract Name
                                <div>
                                    <input {...register("contractname")} name="contractname" className="vc-input-contract-name" type="text" placeholder="Contract Name" />
                                </div>
                                <p className="validation-error-message">{errors?.contractname?.message}</p>
                            </div>

                            <div className="vc-contract-compiler">Compiler
                                <div>

                                    <select {...register("version")} name="version" className="vc-contract-add-select"  >
                                        <option value="">Select compiler</option>
                                        <option value="latest">Latest</option>
                                        {Releases.builds.map((row, index) => {
                                            let finalVersion = row.split('-')
                                            let ver = ''
                                            if (finalVersion.length > 2) {
                                                let subversion = finalVersion[2].split('+')
                                                ver = finalVersion[1] + '+' + subversion[1]
                                            } else {
                                                ver = finalVersion[1]
                                            }

                                            return (
                                                <option value={ver}>{row}</option>
                                            )
                                        })
                                        }
                                    </select>
                                    <p className="validation-error-message">{errors?.version?.message}</p>
                                </div>
                            </div>


                        </div>
                        {/* <br /> */}
                        <div className="verify-contracts-head">Contract Code</div>
                        <textarea {...register("code")} name="code" className="textarea-contract-code" placeholder="Contract Code" ></textarea>
                        <p className="validation-error-message">{errors?.code?.message}</p>
                        <br />
                        <div className="verify-contracts-head">
                            <input type="checkbox" value="1" name="optimise" {...register("optimise")} />
                            &nbsp;Optimization Enabled</div>
                        <br />

                        <div className="constructor-arg">Constructor arguments ABI-encoded (OPTIONAL required for certain contracts only)</div>
                        <input {...register("argument")} name="argument" sreadOnly className="textarea-constructor-arg" placeholder="Constructor Arguments" />
                        <br /><br />

                        <div>
                            <button style={{ backgroundColor: '#3763dd', borderRadius: '4px' }} className="validate-button">Validate Code</button>
                            <button type="button" onClick={() => { reset(); clearMessage(); }} style={{ backgroundColor: '#9fa9ba', borderRadius: '4px' }} className="reset-button">Reset</button>
                        </div>

                    </div>

                </div>
            </form>
        </>
    );
}