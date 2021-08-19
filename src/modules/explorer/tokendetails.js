import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Divider } from '@material-ui/core';
import Tokensearchbar from './tokensearchBar';
import '../../assets/styles/custom.css';
import FooterComponent from '../common/footerComponent';
import { useHistory } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Utility, { dispatchAction } from "../../utility";
import TokenData from "../../services/token";
import { Grid } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const columns = [
    {
        id: 'S',
        label: '#',
        align: 'left',

        backgroundColor: 'white',
        format: (value) => value.toLocaleString('en-US'),

    },
    {
        id: 'src',
        label: '',
        align: 'left',
        backgroundColor: 'white',

    },
    {
        id: 'Token',
        label: 'Token',
        align: 'left',
        backgroundColor: 'white',
        format: (value) => value.toLocaleString('en-US'),

    },

    {
        id: 'Type',
        label: 'Type',
        align: 'left',
        backgroundColor: 'white',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Contract',
        label: 'Contract',
        align: 'left',
        backgroundColor: 'white',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Holder',
        label: 'Holder',
        minWidth: 10,
        align: 'left',
        minHeight: 10,
        backgroundColor: 'white',
        format: (value) => value.toFixed(2),
    },

    {
        id: 'Status',
        label: 'Status',
        align: 'left',
        backgroundColor: 'white',
        format: (value) => value.toFixed(2),
    },
];

function createData(S, src, Token, Type, Contract, Holder, Status) {
    return { S, src, Token, Type, Contract, Holder, Status };
}




const useStyles = makeStyles({
    rootui: {
        borderRadius: '14px',
        marginLeft: '18%',
        marginRight: '18%',


    },

    container: {

        borderRadius: '14px',
        boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1)',
        borderBottom: 'none',
        background: '#fff',
    },

    divider: {
        borderTop: '0px solid #bbb',
        width: "100%"
    },

});


export default function StickyHeadTable() {
    const classes = useStyles();
    const [from, setFrom] = React.useState(0);
    const [amount, setAmount] = React.useState(50);
    const [isLoading, setLoading] = React.useState(true);
    const [totalToken, setTotalToken] = React.useState(0);
    const [keywords, setKeywords] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const history = useHistory()
    const [noData, setNoData] = React.useState(0);
    const handleChangePage = (action) => {
        if (action == 'first') {
            setFrom(0)
            if (keywords) {
                let data = { pageNum: 0, perpage: amount, searchkey: keywords }
                SearchTokens(data)
            } else {
                setNoData(0)
                let data = { pageNum: 0, perpage: amount }
                getTokenList(data)
                getTotalTokenList()
            }

        }
        if (action == 'prev') {
            if (from - amount >= 0) {
                let page = from - amount
                setFrom(page)
                if (keywords) {
                    let data = { pageNum: page, perpage: amount, searchkey: keywords }
                    SearchTokens(data)
                } else {
                    setNoData(0)
                    let data = { pageNum: page, perpage: amount }
                    getTokenList(data)
                    getTotalTokenList()
                }

            }
        }
        if (action == 'next') {
            if (amount + from < totalToken) {
                let page = amount + from
                setFrom(page)
                if (keywords) {
                    let data = { pageNum: page, perpage: amount, searchkey: keywords }
                    SearchTokens(data)
                } else {
                    setNoData(0)
                    let data = { pageNum: page, perpage: amount }
                    getTokenList(data)
                    getTotalTokenList()
                }
            }

        }

        if (action == 'last') {
            let page = totalToken - amount
            setFrom(page)

            if (keywords) {
                let data = { pageNum: page, perpage: amount, searchkey: keywords }
                SearchTokens(data)
            } else {
                setNoData(0)
                let data = { pageNum: page, perpage: amount }
                getTokenList(data)
                getTotalTokenList()
            }

        }
    };

    const handleChangeRowsPerPage = (event) => {
        setAmount(event.target.value);
        setFrom(0);
        if (keywords) {
            let data = { pageNum: 0, perpage: event.target.value, searchkey: keywords }
            SearchTokens(data)
        } else {
            setNoData(0)
            let data = { pageNum: 0, perpage: event.target.value }
            getTokenList(data)
            getTotalTokenList()
        }

    };
    const handleSearchKeyUp = (event) => {
        let searchkeyword = event.target.value

        if (searchkeyword.length > 2) {
            setKeywords(searchkeyword)
            setLoading(false);
            let data = { pageNum: from, perpage: amount, searchkey: searchkeyword }
            SearchTokens(data)
        }
        if (searchkeyword.length == 0) {
            setKeywords('')
            setLoading(false);
            setNoData(0)
            let data = { pageNum: from, perpage: amount }
            getTokenList(data)
            getTotalTokenList()
        }
    }
    const getTokenList = async (data) => {
        try {
            const [error, responseData] = await Utility.parseResponse(
                TokenData.getTokenLists(data)
            );

            if (responseData) {
                setLoading(false);
                setRows(responseData)

            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getTotalTokenList = async () => {
        try {
            const [error, responseData] = await Utility.parseResponse(
                TokenData.getTotalToken()
            );

            if (responseData) {
                setTotalToken(responseData);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const SearchTokens = async (data) => {
        try {
            const [error, responseData] = await Utility.parseResponse(
                TokenData.getTokenSearch(data)
            );
            if (responseData.total == 0) {
                setNoData(1);
                setTotalToken(0);
                setRows([])
            }

            if (responseData.total > 0) {
                setNoData(0);
                setTotalToken(responseData.total);
                setLoading(false);
                setRows(responseData.newResponse)
                //alert(responseData.length)
            }
        } catch (error) {
            console.error(error);
        }
    }


    React.useEffect(() => {
        let data = { pageNum: from, perpage: amount }
        getTokenList(data)
        getTotalTokenList()
    }, []);

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <Tokensearchbar />


            <div>


                <div>
                    <form method="post" onSubmit={e => { e.preventDefault(); }}>

                        <div className="searchelement-div">
                            <p className="searchelement-token">Tokens</p>
                            <div className="searchelement-input">
                                <img style={{ width: 22, height: 22, marginRight: 5 }}
                                    src={require('../../assets/images/Search.png')} />
                                <input
                                    onChange={handleSearchKeyUp}
                                    style={{
                                        fontSize: 12,
                                        letterSpacing: 0.62,
                                        fontWeight: 600,

                                        color: '#2a2a2a',
                                        outlineColor: 'transparent',
                                        borderWidth: 0
                                    }} type="text"
                                    placeholder="Search Tokens" />
                                {/* name="NAME" */}
                            </div>

                        </div>


                    </form>


                </div>
            </div>

            <br />
            <Paper style={{
                borderRadius: "14px",
                marginLeft: "18%",
                marginRight: "18%",
            }} elevation={0}>
                <TableContainer className={classes.container} id="container-table"
                    style={{
                        borderRadius: '12px', border: 'solid 1px #e3e7eb', backgroundColor: '#ffffff', boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1)'
                    }}>
                    <Table stickyHeader aria-label="sticky table" style={{ borderBottom: "none" }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell id="th"
                                        key={column.id}
                                        align={column.align}
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {noData == false &&
                            <TableBody>
                                {rows.map((row, index) => {
                                    return (

                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}
                                            onClick={() => history.push('/token-data/' + row.address)}>

                                            <TableCell style={{ width: '1px' }} id="td">
                                                {index + 1}
                                            </TableCell>
                                            {row.src ?
                                                <TableCell style={{ width: '1px' }} id="td"> <img
                                                    style={{ width: 25, height: 25, borderRadius: '15px' }}
                                                    src={row.src} /></TableCell>
                                                :
                                                <TableCell style={{ width: '1px' }} id="td">
                                                    {row.tokenName ?
                                                        <span style={{ width: 25, height: 25, borderRadius: '15px', border: '1px solid', padding: '5px' }}
                                                        >{row.tokenName ? row.tokenName.slice(0, 2).toUpperCase() : ''}</span>
                                                        :
                                                        ''
                                                    }
                                                </TableCell>
                                            }
                                            <TableCell id="td" style={{ width: '110px' }}>{row.tokenName}</TableCell>
                                            <TableCell id="td" style={{ width: '130px' }}>{row.type}</TableCell>
                                            <TableCell>
                                                <a style={{ fontSize: 12, color: '#2149b9' }}
                                                    href={'/token-data/' + row.address}> {row.address}</a>
                                            </TableCell>
                                            <TableCell id="td" style={{ width: '120px' }}>{row.tokenHolders}</TableCell>
                                            <TableCell id="td">{row.status}</TableCell>


                                        </TableRow>

                                    );
                                })}
                            </TableBody>
                        }
                        {noData == true &&
                            <TableBody >
                                <TableCell id="td" style={{ borderBottom: "none" }} >
                                    <span style={{ textAlign: 'center', color: '#2a2a2a' }} className="tabledata">No data found.</span>
                                </TableCell>
                            </TableBody>
                        }
                    </Table>
                </TableContainer>

                {/* <Divider className={classes.divider}/>*/}
            </Paper>


            <Grid lg={8} className="tablegrid_address" style={{ marginLeft: '245px' }}>
                <Grid container>
                    <Grid item xs="3">
                        <span className="text">Show</span>
                        <Select value={amount} className="select-amount" onChange={handleChangeRowsPerPage} >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={500}>500</MenuItem>
                        </Select>
                        <span className="text">Records</span>
                    </Grid>
                    <Grid xs="5"></Grid>
                    <Grid item xs="4">
                        <button style={{ marginLeft: "0px" }} onClick={() => handleChangePage("first")} className={from === 0 ? "btn disabled" : "btn"}>First</button>
                        <button onClick={() => handleChangePage("prev")} className={from === 0 ? "btn disabled" : "btn"}>{"<"}</button>
                        <button className="btn">Page {Math.round(totalToken / amount) + 1 - Math.round((totalToken - from) / amount)} of {Math.round(totalToken / amount)}</button>
                        <button onClick={() => handleChangePage("next")} className={from + amount === totalToken ? "btn disabled" : "btn"}>{">"}</button>
                        <button onClick={() => handleChangePage("last")} className={from + amount === totalToken ? "btn disabled" : "btn"}>Last</button>

                    </Grid>
                </Grid>
            </Grid>


            {/* <TablePagination
                style={{ display: 'flex', justifyContent: 'space-between' }}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}

            /> */}


            <FooterComponent />

        </div>

    );
}

