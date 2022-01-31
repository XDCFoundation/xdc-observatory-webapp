import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../../assets/styles/custom.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tokensearchbar from './tokensearchBar';
import FooterComponent from '../common/footerComponent';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import moment from 'moment'
import Utils from '../../utility'
import {Grid} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import {useParams} from 'react-router';
import {BlockService} from '../../services';

const useStyles = makeStyles({
    rootui: {
        minWidth: 650,
        borderRadius: '10px',
        backgroundColor: 'white'
    }
});


export default function BlockDetailsData() {


    const [height, setHeight] = useState([])
    const [count, setcount] = useState(0)
    const [copiedText, setCopiedText] = useState("");
    const {blockNumber} = useParams();
    useEffect(() => {
        getLatestaccount(blockNumber)
        setcount(blockNumber)
        setInterval(() => {
            getLatestaccount(count)
        }, 90000)
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
    const diffi = `  The amount of effort required to mine a new block. The difficulty algorithm may adjust according to time`;
    const tdiffi = `Total difficulty of the chain until this block`
    const gasU = `The total gas used in the block and  its percentage of gas filled in the block`
    const gasL = `Total gas limit provided by all transactions in the block`
    const nonc = `Block nonce is a value used during mining to demonstrate proof of work for a block.`
    const extrad = `Any data that can be included by the miner in the block.`
    var isActive = false
    return (
        <div>
            <Tokensearchbar/>
            <Grid xs={12} sm={10} md={5} lg={8} className="table-grid-block">
                <div className="block_details_heading" style={{display: 'flex', flexDirection: 'row'}}>
                    <p className="block_details_heading_left">Block Details</p>
                    {/* {isActive === true ? (<p className="Success-rectangle-block" >Success</p>) :
                        (<p className="failure-rectangle">Failed</p>)} */}
                </div>
                <Paper className={classes.rootui} elevation={0} id="rootui">
                    <Table className="table-block" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{width: '0px', paddingRight: "1px", borderBottom: "none"}} id="td">
                                    <Tooltip align="right" title={hashid}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{borderBottom: "none"}} className="first-row-table">
                                    Hash ID
                                </TableCell>
                                <TableCell className="second-row-table_hash2" style={{borderBottom: "none"}}>
                                    {(window.innerWidth >= 768) ? (window.innerWidth < 1240 ? Utils.shortenHashTab(height.hash) : height.hash) : height.hash}
                                </TableCell>
                                <p style={{marginTop: '17px'}}>
                                    <CopyToClipboard text={height.hash} onCopy={() => setCopiedText(height.hash)}>
                                        <Tooltip
                                            title={
                                                copiedText === height.hash
                                                    ? "Copied"
                                                    : "Copy To Clipboard"
                                            }
                                            placement="top"
                                        >
                                            <button style={{color: 'blue', backgroundColor: 'white', fontSize: 14}}><i
                                                class="fa fa-clone" aria-hidden="true"></i></button>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </p>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
                <br/>
                <Paper className={classes.rootui} elevation={0} id="rootui">
                    <Table className="table-block" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={blockheight}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Block Height
                                </TableCell>
                                <TableCell className="second-row-table_height"
                                           style={{borderBottom: "1px solid #e3e7eb"}}>
                                    <ArrowBackIosIcon style={{marginRight: "10px"}}
                                                      onClick={decrement}/>{count}<ArrowForwardIosIcon
                                    style={{marginLeft: "10px"}} onClick={increment}/>
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}/>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={hashid}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Transactions
                                </TableCell>
                                <TableCell className="second-row-table">
                                    {height.transactions && height.transactions.length ? height.transactions.length : 0}
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}/>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={timestamp}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Time Stamp
                                </TableCell>
                                <TableCell className="second-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    {moment(height.timestamp * 1000).format('DD MMMM Do YYYY, h:mm:ss a')}
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}/>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={parenthash}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Parent Hash
                                </TableCell>
                                <TableCell className="second-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    <a className="parent_hash" onClick={decrement}
                                       style={{cursor: "pointer"}}> {height.parentHash}</a>

                                    <CopyToClipboard text={height.parentHash}
                                                     onCopy={() => setCopiedText(height.parentHash)}>
                                        <Tooltip
                                            title={
                                                copiedText === height.parentHash
                                                    ? "Copied"
                                                    : "Copy To Clipboard"
                                            }
                                            placement="top"
                                        >
                                            <button style={{
                                                color: 'blue',
                                                backgroundColor: 'white',
                                                fontSize: 14,
                                                marginLeft: "22px"
                                            }}><i
                                                class="fa fa-clone" aria-hidden="true"/></button>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}>

                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={sha3uncles}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Sha3Uncles
                                </TableCell>
                                <TableCell className="second-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    {height.sha3Uncles}
                                    <CopyToClipboard text={height.sha3Uncles}
                                                     onCopy={() => setCopiedText(height.sha3Uncles)}>
                                        <Tooltip
                                            title={
                                                copiedText === height.sha3Uncles
                                                    ? "Copied"
                                                    : "Copy To Clipboard"
                                            }
                                            placement="top"
                                        >
                                            <button style={{
                                                color: 'blue',
                                                backgroundColor: 'white',
                                                fontSize: 14,
                                                marginLeft: "50px"
                                            }}><i
                                                class="fa fa-clone" aria-hidden="true"></i></button>
                                        </Tooltip>
                                    </CopyToClipboard>
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={diffi}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Difficulty
                                </TableCell>
                                <TableCell className="second-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    {height.difficulty}
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}/>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={tdiffi}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Total Difficulty </TableCell>
                                <TableCell className="second-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    {height.totalDifficulty}
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}/>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={gasU}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Gas Used
                                </TableCell>
                                <TableCell className="second-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    {height.gasUsed}
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}/>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}
                                    id="td">
                                    <Tooltip align="right" title={gasL}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Gas Limit
                                </TableCell>
                                <TableCell className="second-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    {height.gasLimit}
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}/>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{width: '0px', paddingRight: "1px", borderBottom: "1px solid #e3e7eb"}}>
                                    <Tooltip align="right" title={nonc}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    Nonce
                                </TableCell>
                                <TableCell className="second-row-table" style={{borderBottom: "1px solid #e3e7eb"}}>
                                    {height.nonce}
                                </TableCell>
                                <TableCell style={{borderBottom: "1px solid #e3e7eb"}}/>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{
                                    width: '0px',
                                    paddingRight: "1px",
                                    borderBottom: "none",
                                    paddingBottom: "60px"
                                }}>
                                    <Tooltip align="right" title={extrad}>
                                        <img style={{width: 13, height: 13}}
                                             src={'/images/questionmark.png'}/>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="first-row-table"
                                           style={{paddingBottom: "60px", borderBottom: "none"}}>
                                    Extra Data
                                </TableCell>
                                <TableCell className="second-row-table-extra" style={{borderBottom: "none"}}>
                                    <textarea className="text-area" readOnly value={height.extraData}/>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
                <br/>
                <br/>
            </Grid>
            <FooterComponent/>
        </div>
    );

}
