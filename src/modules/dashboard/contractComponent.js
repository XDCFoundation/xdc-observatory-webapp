import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Divider } from '@material-ui/core';
import Tokensearchbar from '../explorer/tokensearchBar';
import '../../assets/styles/custom.css';
import FooterComponent from '../common/footerComponent';
import { useHistory } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Tooltip from '@material-ui/core/Tooltip';
import Utility, { dispatchAction } from "../../utility";
import ContractData from "../../services/contract";
import loader from '../../assets/images/loader.gif';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const useStyles = makeStyles({
    rootui: {
        borderRadius: '17px',
        marginLeft: '18%',
        width: '65%',
        backgroundColor: 'white'
    },

    container: {

        borderRadius: '14px',
        boxShadow: '0 2px 15px 0 rgba(0, 0, 0, 0.1)',
        border: 'solid 1px #e3e7eb',
        borderTopColor: 'white',
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderBottom: 'none',
        background: '#fff',
        padding: '0 20px',
    },

    divider: {
        borderTop: '0px solid #bbb',
        width: "100%"
    }

});


class Contractlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            from: 0,
            amount: 10,
            isLoading: 1,
            rows: [],
            totalRecord: 0,
            keywords: '',
            noData: false
        }


    }
    componentDidMount = async () => {
        let data = { pageNum: this.state.from, perpage: this.state.amount }
        await this.getContractList(data);
        await this.getTotalContractList()
    };

    componentDidUpdate() {
        //console.log(this.state)
    }

    handleKeyUp = async (event) => {
        let searchkeyword = event.target.value
        this.setState({ from: 0 })
        if (searchkeyword.length > 2) {
            this.setState({ keywords: searchkeyword })
            this.setState({ isLoading: 0 })
            let data = { pageNum: this.state.from, perpage: this.state.amount, keywords: searchkeyword }
            await this.getContractSearch(data)
        }
        if (searchkeyword.length == 0) {
            this.setState({ from: 0 })
            let data = { pageNum: 0, perpage: this.state.amount }
            await this.getContractList(data);
            await this.getTotalContractList()
        }
    }

    handleChangePage = async (action) => {
        if (action == 'first') {
            this.setState({ from: 0 })
            if (this.state.keywords) {
                let data = { pageNum: 0, perpage: this.state.amount, keywords: this.state.keywords }
                await this.getContractSearch(data)
            } else {
                await this.getContractList(0, this.state.amount);
                await this.getTotalContractList()
            }
        }
        if (action === 'last') {
            let page = this.state.totalRecord - this.state.amount
            this.setState({ from: page })
            if (this.state.keywords) {
                let data = { pageNum: page, perpage: this.state.amount, keywords: this.state.keywords }
                await this.getContractSearch(data)
            } else {
                let data = { pageNum: page, perpage: this.state.amount }
                await this.getContractList(data)
                await this.getTotalContractList()
            }
        }

        if (action === 'next') {
            if (this.state.amount + this.state.from < this.state.totalRecord) {
                let page = this.state.amount + this.state.from
                this.setState({ from: page })
                if (this.state.keywords) {
                    let data = { pageNum: page, perpage: this.state.amount, keywords: this.state.keywords }
                    await this.getContractSearch(data)
                } else {
                    let data = { pageNum: page, perpage: this.state.amount }
                    await this.getContractList(data)
                    await this.getTotalContractList()
                }
            }
        }
        if (action === 'prev') {
            if (this.state.from - this.state.amount >= 0) {
                let page = this.state.from - this.state.amount
                this.setState({ from: page })
                if (this.state.keywords) {
                    let data = { pageNum: page, perpage: this.state.amount, keywords: this.state.keywords }
                    await this.getContractSearch(data)
                } else {
                    let data = { pageNum: page, perpage: this.state.amount }
                    await this.getContractList(data)
                    await this.getTotalContractList()
                }

            }
        }

    }

    handleChangeRowsPerPage = async (event) => {
        this.setState({ amount: event.target.value })
        if (this.state.keywords) {
            let data = { pageNum: this.state.from, perpage: this.state.amount, keywords: this.state.keywords }
            await this.getContractSearch(data)
        } else {
            let data = { pageNum: this.state.from, perpage: event.target.value }
            this.getContractList(data)
        }

        //this.getTotalContractList()


    }
    shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }

    getContractList = async (data) => {

        const [error, responseData] = await Utility.parseResponse(
            ContractData.getContractLists(data)
        );

        if (responseData) {
            this.setState({ isLoading: 0 })
            this.setState({ rows: responseData })
            this.setState({ noData: false })
        } else {
            //setLoading(false);
        }

    }

    getContractSearch = async (data) => {
        const [error, responseData] = await Utility.parseResponse(
            ContractData.getContractSearch(data)
        );

        if (responseData.totalRecord == 0) {
            this.setState({ noData: true })
            this.setState({ totalRecord: 0 })
            this.setState({ rows: responseData.response })
        }
        if (responseData.totalRecord > 0) {
            this.setState({ totalRecord: responseData.totalRecord })
            this.setState({ rows: responseData.response })
            this.setState({ noData: false })
        } else {
            //setLoading(false);
        }



    }

    getTotalContractList = async () => {

        const [error, responseData] = await Utility.parseResponse(
            ContractData.getTotalContractList()
        );
        if (responseData == 0) {
            this.setState({ noData: true })
        }
        if (responseData) {
            this.setState({ isLoading: 0 })
            this.setState({ totalRecord: responseData })
            this.setState({ noData: false })
        } else {
            //setLoading(false);
        }

    }


    render(props) {
        const { classes } = this.props;
        let contentStatus = '';
        let msgStatus = '';
        if (this.state.noData) {
            contentStatus = "hideContent"
            msgStatus = 'showContent'
        } else {
            contentStatus = "showContent"
            msgStatus = 'hideContent'
        }

        // if(this.state.isLoading){
        //     return(<div class="loader"></div>)
        // }

        return (
            <div style={{ backgroundColor: '#fff' }}>
                <Tokensearchbar />
                <div>
                    <div>
                        <form method="post" onSubmit={e => { e.preventDefault(); }}>
                            <div className="searchelement-div">
                                <p className="searchelement-token">Contracts</p>
                                <div className="searchelement-input">
                                    <img style={{ width: 22, height: 22, marginRight: 5 }}
                                        src={require('../../assets/images/Search.png')} />
                                    <input
                                        onKeyUp={this.handleKeyUp}
                                        style={{
                                            fontSize: 11,
                                            letterSpacing: 0.62,
                                            color: '#9fa8b1',
                                            outlineColor: '#e3e7eb',
                                            borderWidth: 0
                                        }} type="text"
                                        placeholder="Search Contracts" />
                                    {/* name="NAME" */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
                <Paper style={{ borderRadius: '14px', marginLeft: '18%', marginRight: '18%' }} className={classes.rootui}>
                    <TableContainer className={classes.container} id="container-table">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ border: "none", paddingLeft: '5%' }} align="left"><span
                                        className={"tableheaders"}>Address</span></TableCell>
                                    <TableCell style={{ border: "none" }} align="left"><span className={"tableheaders"}>Token Name</span></TableCell>
                                    <TableCell style={{ border: "none" }} align="left"><span className={"tableheaders"}>Contract Name</span></TableCell>
                                    <TableCell style={{ border: "none" }} align="left"><span className={"tableheaders"}>Is Token</span></TableCell>

                                </TableRow>

                            </TableHead>
                            <TableBody >


                                {this.state.rows.map((row) => {
                                    let isToken = ''
                                    if (row.ERC == 0) {
                                        isToken = 'No'
                                    } else {
                                        isToken = 'Yes'
                                    }
                                    return (
                                        <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                            <TableCell id="td">
                                                <a style={{ color: 'blue', fontSize: 11, marginLeft: '10px' }}
                                                    href={`/address-details/${row.address}`}>
                                                    <Tooltip placement="top" title={row.address}>
                                                        <span className="tabledata">{this.shorten(row.address)} </span>
                                                    </Tooltip>
                                                </a>
                                            </TableCell>
                                            <TableCell id="td"><span className="tabledata"
                                                style={{ marginLeft: '6px' }}>{row.tokenName}</span></TableCell>
                                            <TableCell id="td"><span className="tabledata"
                                                style={{ marginLeft: '5px' }}>{row.contractName}</span></TableCell>
                                            <TableCell id="td"><span className="tabledata"
                                                style={{ marginLeft: '5px' }}>{isToken}</span></TableCell>


                                        </StyledTableRow>

                                    );
                                })}


                            </TableBody>
                            <TableBody className={msgStatus}>
                                <TableCell id="td" >
                                    <span style={{ textAlign: 'center', color: 'red' }} className="tabledata">No data found.</span>
                                </TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Paper>


                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '270px', marginTop: '50px' }}>
                        Show
                        <select value={this.state.amount} className="selectbox" onChange={(event) => this.handleChangeRowsPerPage(event)}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={75}>75</option>
                            <option value={100}>100</option>
                        </select>
                        Records
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginRight: '17%' }}>

                        <div className={this.state.from == 0 ? "firstbox disabled" : "firstbox"} onClick={() => this.handleChangePage("first")}>
                            <button style={{ backgroundColor: 'white' }} className="first">First</button>
                        </div>
                        <div className="previousbox" onClick={() => this.handleChangePage("prev")}>
                            <p className="path"><ChevronLeftIcon /></p>
                        </div>
                        <div className="pagebox">
                            <p className="Page-1-of-5">Page {Math.round(this.state.totalRecord / this.state.amount) + 1 - Math.round((this.state.totalRecord - this.state.from) / this.state.amount)} of {Math.ceil(this.state.totalRecord / this.state.amount)}</p>
                        </div>
                        <div className="nextbox">
                            <p className="path-2" onClick={() => this.handleChangePage("next")}><ChevronRightIcon /></p>
                        </div>
                        <div className="lastbox" onClick={() => this.handleChangePage("last")}>
                            <button style={{ backgroundColor: 'white' }} className="last">Last</button>
                        </div>
                    </div>


                </div>

                <FooterComponent />

            </div>

        );
    }
}
export default withStyles(useStyles)(Contractlist);