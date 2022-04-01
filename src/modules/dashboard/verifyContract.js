import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Releases from "./list.json";
import {genericConstants} from "../../constants";
import contractverify from "../../services/contractverify";
export default function VerifyContract(props) {
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
        const urlParams = new URLSearchParams(window.location.search);
        const reference = urlParams.get('reference');
        if(reference && reference === genericConstants.SCM_REFERENCE)
            data["reference"] = genericConstants.SCM_REFERENCE;
        try {
            setisLoading(true)
            const resp = await contractverify.getContractVerify(data)
            setisLoading(false)

            if (resp[0].Error == 0 && !ifSCM) {
                let url = "/address/" + contractAddress
                window.location.href = url;
            }
            else if(resp[0].Error == 0 && ifSCM){
                window.location.href = process.env.REACT_APP_SCM_WEBAPP + "?contractAddress=" + contractAddress;
            }
             else {
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

                    <div className={props.theme === "dark" ? "paper-verify-contracts table-bg-dark border-none-dark mb-60" : "paper-verify-contracts"} elevation={3}>

                        <div className={props.theme === "dark" ? "verify-contracts-head fc-white" : "verify-contracts-head"}>Verify and Publish Contract Source Code</div><br />
                        <div className="textarea-verify-contract">
                            <p className={props.theme === "dark" ? "verify-contract-first-div fc-black" : "verify-contract-first-div"}>Enter Contract Source Code below.</p>
                            <p className={props.theme === "dark" ? "verify-contract-first-div-text fc-black" : "verify-contract-first-div-text"}>If the compiled bytecode matches the Creation Address bytecode, the contract is then Verified and will be published online.</p>
                        </div>
                        <br />
                        {msg ? <p className="validation-error-message txt-center">{msg}</p> : ""}
                        <br />

                        <div className="flex-row">
                            <div className={props.theme === "dark" ? "vc-contract-add fc-white" : "vc-contract-add"}>Contract Address
                                {
                                    address.length ? <div>
                                        <input {...register("addr")} name="addr" className={props.theme === "dark" ? "vc-input-contract-add-dark" : "vc-input-contract-add"} type="text" placeholder="Contract Address" onChange={handleChange} value={address.length ? address : ""} />
                                    </div> : <div>
                                        <input {...register("addr")} name="addr" className={props.theme === "dark" ? "vc-input-contract-add-dark" : "vc-input-contract-add"} type="text" placeholder="Contract Address" onChange={handleChange} value={inputValue} />
                                    </div>
                                }
                                <p className="validation-error-message">{errors?.addr?.message}</p>
                            </div>
                            <div className={props.theme === "dark" ? "vc-contract-name fc-white" : "vc-contract-name"} >Contract Name
                                <div>
                                    <input {...register("contractname")} name="contractname" className={props.theme === "dark" ? "vc-input-contract-name-dark" : "vc-input-contract-name"} type="text" placeholder="Contract Name" />
                                </div>
                                <p className="validation-error-message">{errors?.contractname?.message}</p>
                            </div>

                            <div className={props.theme === "dark" ? "vc-contract-compiler fc-white" : "vc-contract-compiler"}>Compiler
                                <div>

                                    <select {...register("version")} name="version" className={props.theme === "dark" ? "vc-contract-add-select-dark" : "vc-contract-add-select"}  >
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
                        <div className={props.theme === "dark" ? "verify-contracts-head fc-white" : "verify-contracts-head"}>Contract Code</div>
                        <textarea {...register("code")} name="code" className={props.theme === "dark" ? "textarea-contract-code-dark" : "textarea-contract-code"} placeholder="Contract Code" ></textarea>
                        <p className="validation-error-message">{errors?.code?.message}</p>
                        <br />
                        <div className={props.theme === "dark" ? "verify-contracts-head fc-b1c3e1" : "verify-contracts-head"}>
                            <input type="checkbox" value="1" name="optimise" {...register("optimise")} />
                            &nbsp;Optimization Enabled</div>
                        <br />

                        <div className={props.theme === "dark" ? "constructor-arg fc-white" : "constructor-arg"}>Constructor arguments ABI-encoded (OPTIONAL required for certain contracts only)</div>
                        <input {...register("argument")} name="argument" sreadOnly className={props.theme === "dark" ? "textarea-constructor-arg-dark" : "textarea-constructor-arg"} placeholder="Constructor Arguments" />
                        <br /><br />

                        <div>
                            <button style={{ backgroundColor: '#3763dd', borderRadius: '4px' }} className="validate-button">Validate Code</button>
                            <button type="button" onClick={() => { reset(); clearMessage(); }} style={props.theme === "dark" ? { backgroundColor: 'transparent', borderRadius: '4px' } : { backgroundColor: '#9fa9ba', borderRadius: '4px' }} className={props.theme === "dark" ? "reset-button pagination-btn-dark-border" : "reset-button"}>Reset</button>
                        </div>

                    </div>

                </div>
            </form>
        </>
    );
}