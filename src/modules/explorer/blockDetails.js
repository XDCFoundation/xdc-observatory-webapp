import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../../assets/styles/custom.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tokensearchbar from './tokensearchbar';
import FooterComponent from '../common/footerComponent';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import moment from 'moment'
import Utils from '../../utility'
// import { AccountService, CoinMarketService, BlockService, TransactionService } from '../../services'
// import "../../../src/assets/styles/blocksAndTransactionList.css";

import { Grid } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useParams } from 'react-router';
import { BlockService } from '../../services';
import history from '../../managers/history';
const useStyles = makeStyles({
    rootui: {
        minWidth: 650,
        borderRadius: '17px',
        backgroundColor: 'white'
    }
});




export default function BlockDetailsData() {


    // const param = blockNumber
    // alert(JSON.stringify(blockNumber))
    const [height, setHeight] = useState([])
    const [count, setcount] = useState(0)
    // useEffect(() => {
    //     fetchHeight();
    // }, []);
    // const fetchHeight = () => {
    //     axios
    //         .get('https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/getBlockDetail/' + blockNumber)
    //         .then((res) => {
    //             // alert(JSON.stringify(res));
    //             setHeight(res.data.responseData);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    const { blockNumber } = useParams();
    useEffect(() => {
        getLatestaccount(blockNumber)
        setcount(blockNumber)
        setInterval(() => {
            getLatestaccount(count)
        }, 45000)
    }, []);

    const getLatestaccount = async (blockNumber) => {
        let urlPath = `/${blockNumber}`
        let [error, blockDetailsUsingHeight] = await Utils.parseResponse(BlockService.getDetailsOfBlock(urlPath, {}))
        if (error || !blockDetailsUsingHeight)
            return
        setHeight(blockDetailsUsingHeight);
    }


    function increment() {
        let updatedCount = Number(count) + 1
        setcount(updatedCount);
        window.history.pushState("", "", `/block-details/${updatedCount}`)
        getLatestaccount(updatedCount)


    }
    function decrement() {
        let updatedCount = Number(count) - 1
        setcount(updatedCount);
        window.history.pushState("", "", `/block-details/${updatedCount}`)
        getLatestaccount(updatedCount)

    }
    // function increment() {
    //     setHeight(blockNumber + 1);
    // }
    const classes = useStyles();
    const hashid = `Hash of the block header from the previous block`;
    const blockheight = `Also known as Block Number. The block height, which indicates the length the length of the blockchain, increases after the addition of the new block.`;
    const timestamp = `The date and time at which a transaction is mined.`;
    const parenthash = `The hash of the block from which this block was generated, also known as its parent block`;
    const sha3uncles = `The mechanism which Ethereum Javascript RLP encodes an empty string`;
    const diffi = `  The amount of effort required to mine a new block. The difficulty algorithmmay adjust according to time`;
    const tdiffi = `Total difficulty of the chain until this block`
    const gasU = `The total gas used in the block and  its percentage of gas filled in the block`
    const gasL = `Total gas limit provided by all transactions in the block`
    const nonc = `Block nonce is a value used during mining to demonstrate proof of work for a block.`
    const extrad = `Any data that can be included by the miner in the block.`
    var isActive = false
    return (
        <div>
            <Tokensearchbar />
            <Grid lg={8} className="table-grid-block">
                <div className="block_details_heading" style={{ display: 'flex', flexDirection: 'row' }}>
                    <p className="block_details_heading_left">Block Details</p>
                    {/* {isActive === true ? (<p className="Success-rectangle-block" >Success</p>) :
                        (<p className="failure-rectangle">Failed</p>)} */}
                </div>
                <Paper className={classes.rootui}>
                    <Table className="table-block" aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell style={{ width: '0px', paddingRight: "1px", borderBottom: "none" }} id="td">
                                    <Tooltip align="right" title={hashid} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{ borderBottom: "none" }} className="first-row-table">
                                    Hash ID
                                </TableCell>
                                <TableCell className="second-row-table_hash">
                                    {height.hash}
                                </TableCell>
                                <p style={{ marginTop: '17px' }}>
                                    <CopyToClipboard text={height.hash}>
                                        <button style={{ color: '#2149b9', backgroundColor: 'white', fontSize: 14 }}><i
                                            class="fa fa-clone" aria-hidden="true"></i></button>
                                    </CopyToClipboard>
                                </p>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
                <br />
                <Paper className={classes.rootui}>
                    <Table className="table-block" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={blockheight} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Block Height
                                </TableCell>
                                <TableCell className="second-row-table_height" >
                                    <ArrowBackIosIcon style={{ marginRight: "10px" }} onClick={decrement} />{count}<ArrowForwardIosIcon style={{ marginLeft: "10px" }} onClick={increment} />
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={hashid} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Transactions
                                </TableCell>
                                <TableCell className="second-row-table">
                                    {height.transactions && height.transactions.length ? height.transactions.length : 0}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={timestamp} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Time Stamp
                                </TableCell>
                                <TableCell className="second-row-table">
                                    {moment(height.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a')}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={parenthash} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Parent Hash
                                </TableCell>
                                <TableCell className="second-row-table">
                                    <a className="parent_hash"> {height.parentHash}</a>

                                    <CopyToClipboard text={height.parentHash}>
                                        <button style={{ color: '#2149b9', backgroundColor: 'white', fontSize: 14, marginLeft: '10px' }}><i
                                            class="fa fa-clone" aria-hidden="true"></i></button>
                                    </CopyToClipboard>
                                </TableCell>
                                <TableCell>

                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={sha3uncles} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Sha3Uncles
                                </TableCell>
                                <TableCell className="second-row-table">
                                    {height.sha3Uncles}
                                    <CopyToClipboard text={height.sha3Uncles}>
                                        <button style={{ color: '#2149b9', backgroundColor: 'white', fontSize: 14, marginLeft: '10px' }}><i
                                            class="fa fa-clone" aria-hidden="true"></i></button>
                                    </CopyToClipboard>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={diffi} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Difficulty
                                </TableCell>
                                <TableCell className="second-row-table">
                                    {height.difficulty}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={tdiffi} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Total Difficulty                            </TableCell>
                                <TableCell className="second-row-table">
                                    {height.totalDifficulty}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={gasU} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Gas Used
                                </TableCell>
                                <TableCell className="second-row-table">
                                    {height.gasUsed}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                    <Tooltip align="right" title={gasL} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Gas Limit
                                </TableCell>
                                <TableCell className="second-row-table">
                                    {height.gasLimit}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px" }}>
                                    <Tooltip align="right" title={nonc} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Nonce
                                </TableCell>
                                <TableCell className="second-row-table">
                                    {height.nonce}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '0px', paddingRight: "1px", borderBottom: "none" }}>
                                    <Tooltip align="right" title={extrad} >
                                        <img style={{ width: 13, height: 13 }}
                                            src={require("../../../src/assets/images/questionmark.png")} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table">
                                    Extra Data
                                </TableCell>
                                <TableCell className="second-row-table">
                                    <textarea className="text-area" readOnly value={height.extraData} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper >
                <br />
                <br />
            </Grid >
            <FooterComponent />
        </div>
    );

}
