import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
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
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const rows = [

    { Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Tokenname: 'EURG', Contractname: 'Coin', IsToken: 'Yes' },
    { Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Tokenname: 'EURG', Contractname: 'Coin', IsToken: 'Yes' },
    { Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe80', Tokenname: 'EURG', Contractname: 'Coin', IsToken: 'Yes' },
    { Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe90', Tokenname: 'EURG', Contractname: 'Coin', IsToken: 'Yes' },
    { Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Tokenname: 'EURG', Contractname: 'Coin', IsToken: 'Yes' },
    { Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Tokenname: 'EURG', Contractname: 'Coin', IsToken: 'Yes' },
    { Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Tokenname: 'EURG', Contractname: 'Coin', IsToken: 'Yes' },


];

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
    },

});


export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const history = useHistory()

    const handleChangePage = (action) => {

        if (action === 'next') {
            if (Math.ceil(rows.length / rowsPerPage) !== page + 1) {
                setPage(page + 1)

            }

        } else {
            if (0 !== page) {
                setPage(page - 1)
            }
        }
        if (action === 'next') {
            if (Math.ceil(rows.length / rowsPerPage) < page + 1)
                setPage(Math.ceil(rows.length / rowsPerPage))
        }


    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }

    return (
        <div style={{backgroundColor:'#fff'}}>
            <Tokensearchbar />

            <div>


                <div>
                    <form method="post">

                        <div className="searchelement-div">
                            <p className="searchelement-token">Contracts</p>
                            <div className="searchelement-input">
                                <img style={{ width: 22, height: 22, marginRight: 5 }}
                                    src={require('../../assets/images/Search.png')} />

                                <input
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
            <Paper style={{ borderRadius: '14px' }} className={classes.rootui}>
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
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (

                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                                        <TableCell id="td">
                                            <a style={{ color: 'blue', fontSize: 11, marginLeft: '10px' }}
                                                href={`/address/${row.Address}`}>
                                                <Tooltip placement="top" title={row.Address}>
                                                <span className="tabledata"> {shorten(row.Address)} </span>
                                                </Tooltip>
                                            </a>
                                        </TableCell>
                                        <TableCell id="td"><span className="tabledata"
                                            style={{ marginLeft: '6px' }}>{row.Tokenname}</span></TableCell>
                                        <TableCell id="td"><span className="tabledata"
                                            style={{ marginLeft: '5px' }}>{row.Contractname}</span></TableCell>
                                        <TableCell id="td"><span className="tabledata"
                                            style={{ marginLeft: '5px' }}>{row.IsToken}</span></TableCell>


                                    </StyledTableRow>

                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider className={classes.divider} />

            </Paper>


            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>

                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '270px', marginTop: '50px' }}>
                    Show
                    <select className="selectbox" onChange={handleChangeRowsPerPage}>
                        <option selected>50</option>
                        <option>75</option>
                        <option>100</option>
                    </select>
                    Records
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', marginRight: '17%' }}>

                    <div className="firstbox" onClick={() => setPage(0)}>
                        <button style={{ backgroundColor: 'white' }} className="first">First</button>
                    </div>
                    <div className="previousbox" onClick={() => handleChangePage("prev")}>
                        <p className="path"><ChevronLeftIcon /></p>
                    </div>
                    <div className="pagebox">
                        <p className="Page-1-of-5">Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}</p>
                    </div>
                    <div className="nextbox">
                        <p className="path-2" onClick={() => handleChangePage("next")}><ChevronRightIcon /></p>
                    </div>
                    <div className="lastbox" onClick={() => setPage(Math.ceil(rows.length / rowsPerPage) - 1)}>
                        <button style={{ backgroundColor: 'white' }} className="last">Last</button>
                    </div>
                </div>


            </div>

            <FooterComponent />

        </div>

    );
}
