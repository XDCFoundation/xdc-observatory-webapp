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
import FooterComponent from './footerComponent';
import { borderColor, height } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { a } from '@react-spring/web';
import { blue } from '@material-ui/core/colors';



const columns = [

    {
        id: 'src',
        label: '',
        align: 'left',
        backgroundColor: 'white',

    },

];

function createData(src) {
    return { src };
}

const rows = [

    { src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7" },
    { src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7" },
    { src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7" },
    { src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7" },
    { src: "https://th.bing.com/th/id/OIP.x2szykLFcwq3fzNBzpdkpwHaHa?w=173&h=180&c=7&o=5&dpr=1.25&pid=1.7" },

];

const useStyles = makeStyles((theme) => ({
    rootui: {
        borderRadius: '17px',
        marginLeft: '18%',
        height: 660,
        width: '65%',
        backgroundColor: 'white'
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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

   

    const longText = `
    Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
    Praesent non nunc mollis, fermentum neque at, semper arcu.
    Nullam eget est sed sem iaculis gravida eget vitae jus  `;

    return (
        <div>
            <Tokensearchbar/>

         <div className="Transaction-display" style={{display: 'flex', flexDirection: 'row'}} > 
            <p className="Transaction-Details" >Transaction Details</p>
            <p className="Success-rectangle">Success</p>
        </div>

            <div  className="transaction-box">
          
                <div className="transaction-box-inside">
                    <Tooltip title={longText}>
                    <img className="transaction-box-image" src={require("../../../src/assets/images/questionmark.png")} />
                    </Tooltip>
                    <p className="transaction-box-text"> Hash ID </p>
                    <p className="transaction-box-text-1">xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60</p>
                   <p style={{marginTop: '17px'}}>
                       <CopyToClipboard text={'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'}>
                       <button> <i class="fa fa-clone" aria-hidden="true"></i>  </button>
                       </CopyToClipboard>
                         </p>
                </div>

            </div>


            <br />
            <Paper className={classes.rootui} >
                <TableContainer className="transaction-box-below" id="transactionbox-table">
                    <Table stickyHeader aria-label="sticky table">

                        <TableBody >
                     
                        <TableRow >
                      
                                <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                
                                     <TableCell style={{whiteSpace: 'nowrap' ,fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                        Block Number 
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                        3097482-2165 Block Confirmation
                                     </TableCell>
                             </TableRow>

                            <TableRow >
                                
                                 <TableCell style={{ width: '1px', paddingTop: '12px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                         TimeStamp
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                        2021-12-21 10:59:23 +05:30(1hr 16min ago)
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                        From
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                     <a style={{color: 'blue', fontSize: 12}}> xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60 </a>
                                        <CopyToClipboard text={'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'} >
                                            <button><i class="fa fa-clone" aria-hidden="true"></i></button>
                                        </CopyToClipboard>
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                        To
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                     <a style={{color: 'blue', fontSize: 12}} > xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60 </a>
                                        <CopyToClipboard text={'xe60sgbk5238hscabxe60sgbk5238hsc2432383xe60'} >
                                            <button><i class="fa fa-clone" aria-hidden="true"></i></button>
                                        </CopyToClipboard>
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                         Value
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                        572818397.33 XDC(300$)
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                         TxnFee
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                        0.000000000007 XDC(0.00000000025$)
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                        Gas Provided
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                        21000
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}} id="td" >
                                         Gas Price
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                         0.00000000000525
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                         Gas Used
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                         210000
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                         Nounced
                                     </TableCell>
                                     <TableCell style={{fontFamily: 'Inter', fontStyle: 'normal', fontSize: 12, fontWeight: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#3a3a3a'}} id="td" >
                                        7
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                         Input
                                     </TableCell>
                                     <TableCell  id="td" >
                                        <input className="input-area" type="text"/>
                                     </TableCell>
                             </TableRow>

                             <TableRow >
                                 <TableCell style={{ width: '1px'}} id="td"  >
                                    
                                     <Tooltip title={longText}>
                                     <img style={{ width: 13, height: 13 }} src={require("../../../src/assets/images/questionmark.png")} />
                                     </Tooltip>
                                      </TableCell>
                                     <TableCell style={{ fontFamily: 'Inter',fontSize: '11px',fontWeight: 600,fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: '0.58px', color: '#252525'}}  id="td" >
                                       Private Note
                                     </TableCell>
                                     <TableCell  id="td" >
                                        <input className="input-area-2" type="text"/>
                                        
                                     </TableCell>
                                    
                             </TableRow>
                      
                        </TableBody>
                     
                    </Table>
                </TableContainer>
            

            </Paper>

            {/* <TablePagination
                style={{ display: 'flex', justifyContent: 'center'}}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}


            /> */}

        </div >








    );
}

