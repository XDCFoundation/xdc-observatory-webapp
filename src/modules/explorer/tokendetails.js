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
import Tokensearchbar from './tokensearchBar';
import '../../assets/styles/custom.css';
import FooterComponent from '../common/footerComponent';
import {useHistory} from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Utility, { dispatchAction } from "../../utility";
import TokenData from "../../services/token";

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
    return {S, src, Token, Type, Contract, Holder, Status};
}




const useStyles = makeStyles({
    rootui: {
        borderRadius: '17px',
        marginLeft: '18%',

        width: '65%',
        backgroundColor: 'white'
    },

    container: {

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
    const [from, setFrom] = React.useState(0);
    const [amount, setAmount] = React.useState(10);
    const [isLoading, setLoading] = React.useState(true);
    const [totalToken, setTotalToken] = React.useState(0);
    const [keywords, setKeywords] = React.useState('');
    const [rows, setRows] = React.useState([]);    
    const history = useHistory()

    const handleChangePage = (action) => {
        if(action == 'first'){
            setFrom(0)
            if(keywords){
                let data = {pageNum:0,perpage:amount,searchkey:keywords}
                SearchTokens(data)
            }else{
                let data = {pageNum:0,perpage:amount}
                getTokenList(data)
            }
            
        }
        if(action == 'prev'){
            if (from - amount >= 0) {
                let page = from - amount
                setFrom(page)
                if(keywords){
                let data = {pageNum:page,perpage:amount,searchkey:keywords}
                SearchTokens(data)
                }else{
                    let data = {pageNum:page,perpage:amount}
                    getTokenList(data)
                }
                
            }
        }
        if (action == 'next') {
            if (amount + from < totalToken) {
                let page = amount + from
                setFrom(page)
                if(keywords){
                let data = {pageNum:page,perpage:amount,searchkey:keywords}
                SearchTokens(data)
                }else{
                    let data = {pageNum:page,perpage:amount}
                    getTokenList(data)
                }
            }

        } 
        /*if (action == 'next') {
            if (Math.ceil(totalToken / amount) < from + 1){
                setFrom(Math.ceil(totalToken / amount))
                
                if(keywords){
                let data = {pageNum:Math.ceil(totalToken / amount),perpage:amount,searchkey:keywords}
                SearchTokens(data)
                }else{
                    let data = {pageNum:Math.ceil(totalToken / amount),perpage:amount}
                    getTokenList(data)
                }
            }
                
        }*/
        if (action == 'last') { 
            let page = totalToken - amount           
            setFrom(page)
            
            if(keywords){
                let data = {pageNum:page,perpage:amount,searchkey:keywords}
                SearchTokens(data)
            }else{
                let data = {pageNum:page,perpage:amount}
                getTokenList(data)
            }
            
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setAmount(event.target.value);
        setFrom(0);
        setAmount(event.target.value)
        if(keywords){
            let data = {pageNum:0,perpage:event.target.value,searchkey:keywords}
            SearchTokens(data)
        }else{
            let data = {pageNum:0,perpage:event.target.value}
            getTokenList(data)
        }
        
    };
    const handleKeyUp = (event) => {
        let searchkeyword = event.target.value

        if(searchkeyword.length > 2){
            setKeywords(searchkeyword)
            setLoading(false);
            let data = {pageNum:from,perpage:amount,searchkey:searchkeyword}
            SearchTokens(data)
        }
        if(searchkeyword.length == 0){
            setLoading(false);
            let data = {pageNum:from,perpage:amount}
            getTokenList(data)
        }
    }
    const getTokenList = async (data) => {
        try {
            const [error, responseData] = await Utility.parseResponse(
            TokenData.getTokenLists(data)
        );
           
        if(responseData) {
            setLoading(false);
            setRows(responseData)

        }else{
            setLoading(false);
        }
        }catch (error) {
          console.error(error);
        }
  }
  const getTotalTokenList = async () => {
        try {
            const [error, responseData] = await Utility.parseResponse(
            TokenData.getTotalToken()
        );
           
        if(responseData) {
            setTotalToken(responseData);
        }
        }catch (error) {
          console.error(error);
        }
  }
  const SearchTokens = async (data) => {
        try {
            const [error, responseData] = await Utility.parseResponse(
            TokenData.getTokenSearch(data)
        );
           
        if(responseData) {
            setTotalToken(responseData.length);
            setLoading(false);
            setRows(responseData.newResponse)
            //alert(responseData.length)
        }
        }catch (error) {
          console.error(error);
        }
  }


    React.useEffect(() => {
        let data = {pageNum:from,perpage:amount}
        getTokenList(data)
        getTotalTokenList()
    },[]);
    if(isLoading){
        return(<div class="loader"></div>)
    }

    return (
        <div style={{backgroundColor: '#fff'}}>
            <Tokensearchbar/>

        
            <div>


                <div>
                    <form method="post" onSubmit={e => { e.preventDefault(); }}>

                        <div className="searchelement-div">
                            <p className="searchelement-token">Tokens</p>
                            <div className="searchelement-input">
                                <img style={{width: 22, height: 22, marginRight: 5}}
                                     src={require('../../assets/images/Search.png')}/>
                                <input
                                onKeyUp={handleKeyUp}
                                    style={{
                                        fontSize: 11,
                                        letterSpacing: 0.62,
                                        color: '#9fa8b1',
                                        outlineColor: '#e3e7eb',
                                        borderWidth: 0
                                    }} type="text"
                                    placeholder="Search Tokens"/>
                                {/* name="NAME" */}
                            </div>

                        </div>


                    </form>


                </div>
            </div>

            <br/>
            <Paper className={classes.rootui}>
                <TableContainer className={classes.container} id="container-table"
                style={{borderRadius: '12px',border: 'solid 1px #e3e7eb',backgroundColor: '#ffffff',boxShadow: '0 2px 15px 0 rgba(0, 0, 0, 0.1)'}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell id="th"
                                               key={column.id}
                                               align={column.align}
                                               style={{backgroundColor: 'white'}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => {
                                return (
                               
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}
                                              onClick={() => history.push('/token-data')}>

                                        <TableCell style={{width: '1px'}} id="td">
                                            {index + 1}
                                        </TableCell>
                                        {row.src ?
                                        <TableCell style={{width: '1px'}} id="td"> <img
                                            style={{width: 25, height: 25, borderRadius: '15px'}}
                                            src= {row.src} /></TableCell>
                                            :
                                          <TableCell style={{width: '1px'}} id="td"> 
                                          {row.tokenName ? 
                                          <span style={{width: 25, height: 25, borderRadius: '15px',border:'1px solid',padding:'5px'}}
                                             >{row.tokenName ? row.tokenName.slice(0, 2).toUpperCase() : ''}</span>
                                             :
                                            ''
                                          }   
                                           </TableCell>  
                                       }
                                        <TableCell id="td" style={{width: '110px'}}>{row.tokenName}</TableCell>
                                        <TableCell id="td" style={{width: '130px'}}>{row.type}</TableCell>
                                        <TableCell>
                                            <a style={{fontSize: 12, color: '#2149b9'}}
                                               href={'/address-details/'+row.address}> {row.address}</a>
                                        </TableCell>
                                        <TableCell id="td" style={{width: '120px'}}>{row.tokenHolders}</TableCell>
                                        <TableCell id="td">{row.status}</TableCell>


                                    </TableRow>

                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

               {/* <Divider className={classes.divider}/>*/}
            </Paper>
            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '45px',marginLeft: '18%'}}>
                    Show
                    <select value={amount} className="selectbox" onChange={handleChangeRowsPerPage}> 
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={75}>75</option>
                        <option value={100}>100</option>
                    </select>
                    Records
                </div>

                <div style={{display: 'flex', flexDirection: 'row', marginRight: '17%'}}>
                    <div className="firstbox" onClick={() => handleChangePage("first")}>
                        <button style={{backgroundColor: 'white'}} className="first">First</button>
                    </div>
                    <div className="previousbox" onClick={() => handleChangePage("prev")}>
                        <p className="path"><ChevronLeftIcon/></p>
                    </div>
                    <div className="pagebox">
                        <p className="Page-1-of-5">Page {Math.round(totalToken / amount) + 1 - Math.round((totalToken - from) / amount)} of {Math.round(totalToken / amount)}</p>
                    </div>
                    <div className="nextbox">
                        <p className="path-2" onClick={() => handleChangePage("next")}><ChevronRightIcon/></p>
                    </div>
                    <div className="lastbox" onClick={() => handleChangePage("last")}>
                        <button style={{backgroundColor: 'white'}} className="last">Last</button>
                    </div>
                </div>


            </div>

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
            

            <FooterComponent/>

        </div>

    );
}

