import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Tokensearchbar from './tokensearchbar';
import '../../assets/styles/custom.css';
import FooterComponent from '../common/footerComponent';
import { borderColor, height } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import { NavLink, useParams } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { transparent } from 'material-ui/styles/colors';
import axios from 'axios';
import moment from 'moment';
import { TransactionService } from '../../services';
import Utils from '../../utility';


const useStyles = makeStyles((theme) => ({
    rootui: {
        borderRadius: '14px',
        border: 0,
        width: '66.5%',
        backgroundColor: 'white',
        borderCollapse: 'collapse',
    },

    button: {
        margin: theme.spacing(1),
    },
    customWidth: {
        maxWidth: 500,
    },
    noMaxWidth: {
        maxWidth: 'none',
    }
}));

export default function StickyHeadTable() {
    const classes = useStyles();
    const { hash } = useParams();
    // alert(hash)


    const [transactions, setTransactions] = useState(false)
   
    
    useEffect(async () => {
        let urlPath = `/${hash}`
        let [error, transactiondetailusinghash] = await Utils.parseResponse(TransactionService.getTransactionDetailsUsingHash(urlPath, {}))
        if (error || !transactiondetailusinghash)
            return
        setTransactions(transactiondetailusinghash);
        const interval = setInterval(async () => {
            let [error, transactiondetailusinghash] = await Utils.parseResponse(TransactionService.getTransactionDetailsUsingHash(urlPath, {}))
            setTransactions(transactiondetailusinghash);
        }, 45000)
    }, []);

    const hashid = `A transaction hash is a unique character identifier that is generated whenever the transaction is executed. `;
    const blocknumber = ` The number of block in which transaction was recorded. Block confirmation indicate how many blocks since the transaction is mined.  `;
    const timestamp = ` The date and time at which a transaction is mined. `;
    const from = ` The sending party of the transaction(could be from a contact address)  `;
    const to = ` The receiving party of the transaction(could be from a contact address) `;
    const value = ` The value being transacted in XDC and fiat value. Note: You can click the fiat value(if available) to see historical value at the time of Transaction `;
    const txnfee = ` The value being transacted in XDC and fiat value. Note: You can click the fiat value(if available) to see historical value at the time of Transaction `;
    const gasprovided = `Maximum amount of gas provided for the transaction. For normal XDC transfers the value is 21,000. For contract this value is higher an bound by block gas limit. `;
    const gasprice = ` Cost per unit of gas specified for the transaction, in XDC and Gwei. The higher the gas price the higher hance of getting included in a block `;
    const gasused = ` The exact unit of gas that was used for the transactions. `;
    const nounced = ` Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be 11th transaction sent from the sender's address. `;
    const input = `Additional information that is required for the transaction `;
    const privatenote = ` Private notes `;


    return (
        <div>
            <Tokensearchbar />

            <div className="Transaction-display" style={{ display: 'flex', flexDirection: 'row' }}>
                <p className="Transaction-Details">Transaction Details</p>

                {transactions ? transactions.status ? <p className="Success-rectangle">Success</p> : <p className="Failed-rectangle">Failed</p> : null}

            </div>

            {/* ........ */}
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Paper className={classes.rootui}>
                    <Table className="transaction-box-below" id="transactionbox-table">


                        <TableBody>

                            <TableRow>

                                <TableCell style={{ width: '1px',borderBottom: 'none' }} id="td">

                                    <Tooltip title={hashid} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>

                                <TableCell style={{
                                    width: '15%',    
                                    whiteSpace: 'nowrap',
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    Hash ID
                                </TableCell>

                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 13,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a',

                                }} id="td">{hash}</TableCell>


                                <p style={{ marginTop: '17px' }}>
                                    <CopyToClipboard text={hash}>
                                        <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i
                                            class="fa fa-clone" aria-hidden="true"></i></button>
                                    </CopyToClipboard>
                                </p>
                            </TableRow>

                        </TableBody>



                    </Table>


                </Paper>
            </div>

            {/* ........ */}
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paper className={classes.rootui}>
                    <Table className="transaction-box-below" id="transactionbox-table">


                        <TableBody>

                            <TableRow>

                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={blocknumber}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>

                                <TableCell style={{
                                    width: '15%',
                                    whiteSpace: 'nowrap',
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525',

                                }} id="td">
                                    Block Number
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a',

                                }} id="td">
                                    <a style={{ color: 'blue', fontSize: 13 }} href="#text-as"> {transactions.blockNumber} </a>
                                    -2165 Block Confirmation
                                </TableCell>

                            </TableRow>

                            <TableRow>

                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={timestamp}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    TimeStamp
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    {moment(transactions.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a')}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={from}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal', 
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    From
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    <a style={{
                                        color: 'blue',
                                        fontSize: 12
                                    }}>{transactions.from} </a>
                                    <CopyToClipboard text={transactions.from}>
                                        <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i
                                            class="fa fa-clone" aria-hidden="true"></i></button>
                                    </CopyToClipboard>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={to}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    To
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    <a style={{
                                        color: 'blue',
                                        fontSize: 12
                                    }}>{transactions.to}</a>
                                    <CopyToClipboard text={transactions.to}>
                                        <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i
                                            class="fa fa-clone" aria-hidden="true"></i></button>
                                    </CopyToClipboard>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={value}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    Value
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    {transactions.value} XDC
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={txnfee}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    TxnFee
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    {transactions.transactionIndex} XDC
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={gasprovided}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    Gas Provided
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    {transactions.gas}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={gasprice}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    Gas Price
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    {transactions.gasPrice}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={gasused}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    Gas Used
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    {transactions.gasUsed}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={nounced}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    Nounced
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#3a3a3a'
                                }} id="td">
                                    {transactions.nonce}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={input}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    Input
                                </TableCell>
                                <TableCell id="td">
                                    <textarea className="input-area" readOnly value={transactions.input} ></textarea>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ width: '1px' }} id="td">

                                    <Tooltip title={privatenote}>
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 'normal',
                                    letterSpacing: '0.58px',
                                    color: '#252525'
                                }} id="td">
                                    Private Note
                                </TableCell>
                                <TableCell id="td">
                                    <input className="input-area-2" type="text" />

                                </TableCell>

                            </TableRow>

                        </TableBody>

                    </Table>


                </Paper>
            </div>
            <br />
            <br />
            <FooterComponent />
        </div>
  
    );
}


