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
import Tokensearchbar from '../explorer/tokensearchbar';
import '../../assets/styles/custom.css';
import FooterComponent from '../common/footerComponent';
import { borderColor, height } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import { NavLink, useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChevronLeft, Directions, ShortText } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';


function createData(TxnHash, Age, Block, From, To) {
    return { TxnHash, Age, Block, From, To};
}

const rows = [

    { TxnHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Age: '5 min Ago', Block: '267333', From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'},
    { TxnHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Age: '5 min Ago', Block: '267333', From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'},
    { TxnHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Age: '5 min Ago', Block: '267333', From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'},
    { TxnHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Age: '5 min Ago', Block: '267333', From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'},
    { TxnHash: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', Age: '5 min Ago', Block: '267333', From: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60', To: 'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'},
  
  
];

const useStyles = makeStyles({
    rootui: {
     
        backgroundColor: 'white'
    },

    container: {
    
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

 

  
    function shorten(b, amountL = 10, amountR = 3, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }

    return (
        <div>
          

           
            <Paper className={classes.rootui} elevation={3} >
                <TableContainer className={classes.container} id="container-table">
                    <Table >
                        <TableHead>
                        <TableRow >
                            <TableCell style={{ border: "none"}} align="left" ><span  className={"tableheaders"}>TxnHash</span></TableCell>
                            <TableCell style={{ border: "none"}} align="left"><span className={"tableheaders"}>Age</span></TableCell>
                            <TableCell style={{ border: "none"}} align="left"><span className={"tableheaders"}>Block</span></TableCell>
                            <TableCell style={{ border: "none"}} align="left"><span className={"tableheaders"}>From</span></TableCell>
                            <TableCell style={{ border: "none"}} align="left"><span className={"tableheaders"}>To</span></TableCell>
                           
                        </TableRow>
                           
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                   
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  >
                                      
                                        <TableCell id="td" >
                                      <a style={{color: 'blue', fontSize: 11}} href="#text"><span className="tabledata" > {shorten(row.TxnHash)} </span> </a>
                                        </TableCell>
                                        <TableCell id="td"  ><span className="tabledata" >{row.Age}</span></TableCell>
                                        <TableCell id="td" > <a style={{color: 'blue', fontSize: 11}} href="#text"><span className="tabledata" > {row.Block}</span> </a></TableCell>
                                        <TableCell id="td"  > <a style={{color: 'blue', fontSize: 11}} href="#text"><span className="tabledata" > {shorten(row.From)} </span> </a></TableCell>
                                        <TableCell id="td"  > <a style={{color: 'blue', fontSize: 11}} href="#text"><span className="tabledata" > {shorten(row.To)} </span> </a></TableCell>
                                      
                                 

                                    </TableRow>
                                   
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider className={classes.divider} />

            </Paper>

          
           

        </div >

    );
}
