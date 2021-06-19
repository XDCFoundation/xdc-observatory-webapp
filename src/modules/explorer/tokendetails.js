import React from 'react';
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
import FooterComponent from './footerComponent';
import { borderColor } from '@material-ui/system';
import Button from '@material-ui/core/Button';


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

const rows = [

    { S: 1, src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7", Token: 'EURG', Type: 'XRC 20', Contract: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Holder: '5,75,203', Status: 'Verified' },
    { S: 2, src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7", Token: 'USDC', Type: 'XRC 20', Contract: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Holder: '5,75,203', Status: 'Verified' },
    { S: 3, src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7", Token: 'DAI', Type: 'XRC 20', Contract: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Holder: '5,75,203', Status: 'Verified' },
    { S: 4, src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7", Token: 'Tether', Type: 'XRC 20', Contract: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Holder: '5,75,203', Status: 'Verified' },
    { S: 5, src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7", Token: 'PAXOS', Type: 'XRC 20', Contract: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Holder: '5,75,203', Status: 'Verified' },

];

const useStyles = makeStyles({
    rootui: {
        borderRadius: '17px',
        marginLeft: '18%',
        height: 1000,
        width: '65%',
        backgroundColor: 'white'
    },

    container: {
        height: 1001,
        borderTopColor: 'white',
        backgroundColor: 'white',
        borderBottomColor: 'white',
        background: '#fff',  
        padding: '0 20px',
    },

    divider: {
        borderTop: '0px solid #bbb',
        width: "100%"
    },

});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (
        <div>
            <Tokensearchbar />

            <div >

                
                <div >
                    <form method="post">
                   
                        <div className="searchelement-div">
                        <p className="searchelement-token">Tokens</p>
                            <input
                                style={{ fontSize: 11, letterSpacing: 0.62, color: '#9fa8b1' }} type="text"
                                className="searchelement-input" src={require("../../images/Search.png")} placeholder="Search Tokens" />
                            {/* name="NAME" */}

                          
                        </div>


                    </form>


                </div>
            </div>

            <br />
            <Paper className={classes.rootui} >
                <TableContainer className={classes.container} id="container-table">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow >
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
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  >

                                        <TableCell style={{ width: '1px' }} id="td" >{row.S}</TableCell>
                                        <TableCell style={{ width: '1px' }} id="td"> <img style={{ width: 25, height: 25, borderRadius: '10px' }} src={row.src} /></TableCell>
                                        <TableCell id="td" style={{ width: '110px' }} >{row.Token}</TableCell>
                                        <TableCell id="td" style={{ width: '130px' }} >{row.Type}</TableCell>
                                        <TableCell id="td"> <a style={{ fontSize: 12, color: '#2149b9' }} href="#text-as" > {row.Contract}</a>   </TableCell>
                                        <TableCell id="td" style={{ width: '120px' }} >{row.Holder}</TableCell>
                                        <TableCell id="td">{row.Status}</TableCell>


                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider className={classes.divider} />

            </Paper>

            <TablePagination
                style={{ display: 'flex', justifyContent: 'center'}}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}


            />

        <FooterComponent/>

        </div>

    );
}

