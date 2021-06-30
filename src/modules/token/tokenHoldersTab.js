import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Divider} from '@material-ui/core';
import '../../assets/styles/custom.css';
import {useHistory} from 'react-router-dom';


const rows = [

    {
        Rank: '12',
        Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
        Quantity: '267333',
        Percentage: '9.76%',
        Value: '0 XDC'
    },
    {
        Rank: '12',
        Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
        Quantity: '267333',
        Percentage: '9.76%',
        Value: '0 XDC'
    },
    {
        Rank: '12',
        Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
        Quantity: '267333',
        Percentage: '9.76%',
        Value: '0 XDC'
    },
    {
        Rank: '12',
        Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
        Quantity: '267333',
        Percentage: '9.76%',
        Value: '0 XDC'
    },
    {
        Rank: '12',
        Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
        Quantity: '267333',
        Percentage: '9.76%',
        Value: '0 XDC'
    },
    {
        Rank: '12',
        Address: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60',
        Quantity: '267333',
        Percentage: '9.76%',
        Value: '0 XDC'
    },

];

const useStyles = makeStyles({
    rootui: {
        backgroundColor: 'white'
    },

    container: {
        borderTopColor: 'white',
        backgroundColor: 'transparent',
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


    function shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }

    return (
        <div>


            <Paper className={classes.rootui} elevation={3}>
                <TableContainer className={classes.container} id="container-table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{border: "none"}} align="left"><span
                                    className={"tableheaders"}>Rank</span></TableCell>
                                <TableCell style={{border: "none"}} align="left"><span
                                    className={"tableheaders"}>Address</span></TableCell>
                                <TableCell style={{border: "none"}} align="left"><span
                                    className={"tableheaders"}>Quantity</span></TableCell>
                                <TableCell style={{border: "none"}} align="left"><span
                                    className={"tableheaders"}>Percentage</span></TableCell>
                                <TableCell style={{border: "none"}} align="left"><span
                                    className={"tableheaders"}>Value</span></TableCell>

                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (

                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                                        <TableCell id="td"><span className="tabledata">{row.Rank}</span></TableCell>
                                        <TableCell id="td">
                                            <a style={{color: 'blue', fontSize: 11}} href="#text"><span
                                                className="tabledata"> {shorten(row.Address)} </span> </a>
                                        </TableCell>
                                        <TableCell id="td"><span className="tabledata">{row.Quantity}</span></TableCell>
                                        <TableCell id="td"> <span className="tabledata"> {row.Percentage}</span>
                                        </TableCell>
                                        <TableCell id="td"> <span className="tabledata"> {row.Value}</span> </TableCell>


                                    </TableRow>

                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider className={classes.divider}/>

            </Paper>


        </div>

    );
}
