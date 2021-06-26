import React from 'react';
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


// import "../../../src/assets/styles/blocksAndTransactionList.css";

import { Grid } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
    rootui: {
        minWidth: 650,
        borderRadius: '17px',
        backgroundColor: 'white'
    }
});




export default function BlockDetailsData() {
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
    return (
        <Grid lg={8} className="table-grid-block">
            <Paper className={classes.rootui}>
                <Table className="table-block" aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                <Tooltip align="right" title={hashid} >
                                    <img style={{ width: 13, height: 13 }}
                                        src={require("../../../src/assets/images/questionmark.png")} />
                                </Tooltip>
                            </TableCell>
                            <TableCell className="first-row-table">
                                Hash ID
                            </TableCell>
                            <TableCell className="second-row-table_hash">
                                0xd18baf30d24f0f43621bffbb03739bba1b7fefcb13bb1569700b6b67bce179fa
                            </TableCell>
                            <p style={{ marginTop: '17px' }}>
                                <CopyToClipboard text={'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'}>
                                    <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i
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
                            <TableCell className="second-row-table">
                                12345678
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
                                8
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
                                2021-06-09 10:59:23 +0530 (1 hour, 16 mins ago)
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
                                0xafb7746117fd05f4a572c98fe56a5d91441265000de5125861010f4b3b47111d

                                <CopyToClipboard text={' 0xafb7746117fd05f4a572c98fe56a5d91441265000de5125861010f4b3b47111d'}>
                                    <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i
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
                                x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347
                                <CopyToClipboard text={'x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'}>
                                    <button style={{ color: 'blue', backgroundColor: 'white', fontSize: 14 }}><i
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
                                4
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
                                73764215
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
                                0
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
                                420000000
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                <Tooltip align="right" title={nonc} >
                                    <img style={{ width: 13, height: 13 }}
                                        src={require("../../../src/assets/images/questionmark.png")} />
                                </Tooltip>
                            </TableCell>
                            <TableCell className="first-row-table">
                                Nonce
                            </TableCell>
                            <TableCell className="second-row-table">
                                0x00000000000000
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width: '0px', paddingRight: "1px" }} id="td">
                                <Tooltip align="right" title={extrad} >
                                    <img style={{ width: 13, height: 13 }}
                                        src={require("../../../src/assets/images/questionmark.png")} />
                                </Tooltip>
                            </TableCell>
                            <TableCell className="first-row-table">
                                Extra Data
                            </TableCell>
                            <TableCell className="second-row-table">
                                0xd7830100018358444388676f312e31362e35856c696e757800000000000000
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </Paper>
            <br />
            <br />
        </Grid >

    );
}
