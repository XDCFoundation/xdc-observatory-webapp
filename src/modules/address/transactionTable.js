import React, { useEffect, useState } from 'react'
import '../../../src/assets/styles/blocksAndTransactionList.css'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import { Grid, TableContainer } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { CSVLink, CSVDownload } from 'react-csv'
import moment from 'moment'
import Utility, { dispatchAction } from '../../utility'
import { useParams } from 'react-router-dom'
import AddressData from '../../services/address'
import { makeStyles } from '@material-ui/core/styles'
import Loader from '../../assets/loader'

function timeDiff(curr, prev) {
  var ms_Min = 60 * 1000 // milliseconds in Minute
  var ms_Hour = ms_Min * 60 // milliseconds in Hour
  var ms_Day = ms_Hour * 24 // milliseconds in day
  var ms_Mon = ms_Day * 30 // milliseconds in Month
  var ms_Yr = ms_Day * 365 // milliseconds in Year
  var diff = curr - prev //difference between dates.
  // If the diff is less then milliseconds in a minute
  if (diff < ms_Min) {
    return Math.abs(Math.round(diff / 1000)) + ' secs ago'

    // If the diff is less then milliseconds in a Hour
  } else if (diff < ms_Hour) {
    return Math.abs(Math.round(diff / ms_Min)) + ' mins ago'

    // If the diff is less then milliseconds in a day
  } else if (diff < ms_Day) {
    return Math.abs(Math.round(diff / ms_Hour)) + ' hrs ago'

    // If the diff is less then milliseconds in a Month
  } else if (diff < ms_Mon) {
    return Math.abs(Math.round(diff / ms_Day)) + ' days ago'

    // If the diff is less then milliseconds in a year
  } else if (diff < ms_Yr) {
    return Math.abs(Math.round(diff / ms_Mon)) + ' months ago'
  } else {
    return Math.abs(Math.round(diff / ms_Yr)) + ' years ago'
  }
}
export default function TransactionTableComponent(props) {
  const { state } = props

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b?.slice(0, amountL)}${'.'.repeat(stars)}${b?.slice(
      b.length - 3,
      b.length,
    )}`
  }
  let { addr } = useParams()
  let { addressNumber } = useParams()
  const [from, setFrom] = React.useState(0)
  const [amount, setAmount] = React.useState(50)
  const [address, setAddress] = useState([])
  const [ContractAddress, setContractAddress] = useState(addressNumber)
  const [keywords, setKeywords] = useState('')
  const [reportaddress, setReportaddress] = useState([])
  const [downloadaddress, setDownloadaddress] = useState([])
  const [isDownloadActive, setDownloadActive] = useState(0)
  const [noData, setNoData] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)
  const [isLoading, setLoading] = useState(true)
  let datas = {}
  const useStyles = makeStyles({
    container: {
      borderRadius: '14px',
      boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1)',
      borderBottom: 'none',
      background: '#fff',
    },
  })
  const getContractDetails = async (values) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getAddressDetailWithlimit(values),
      )
      if (responseData && responseData.length > 0) {
        setAddress(responseData)
        setLoading(false)
      } else {
        setNoData(true)
        setTotalRecord(0)
        setAddress([])
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const getTransactionsCountForAddress = async (data) => {
    try {
      const [error, responseData] = await Utility.parseResponse(
        AddressData.getTransactionsCountForAddress(data),
      )
      console.log(responseData, "<< ====")
      setTotalRecord(responseData)
    } catch (error) {
      console.error(error)
    }
  }
  const handleKeyUp = (event) => {
    let searchkeyword = event.target.value
    setFrom(0)
    if (searchkeyword.length > 2) {
      setKeywords(searchkeyword)
      datas = {
        pageNum: 0,
        perpage: amount,
        keywords: searchkeyword,
        addrr: ContractAddress,
      }
      getContractDetails(datas)
    }
    if (searchkeyword.length == 0) {
      setNoData(false)
      setKeywords('')
      setFrom(0)
      datas = {
        pageNum: 0,
        perpage: amount,
        addrr: ContractAddress,
        keywords: '',
      }
      getContractDetails(datas)
    }
  }
  const handleChangePage = (action) => {
    if (action == 'first') {
      setFrom(0);
      if (keywords) {
        datas = {
          pageNum: 0,
          perpage: amount,
          addrr: ContractAddress,
          keywords: keywords,
        }
        getContractDetails(datas)
      } else {
        datas = {
          pageNum: 0,
          perpage: amount,
          addrr: ContractAddress,
          keywords: '',
        }
        getContractDetails(datas)
      }
    }
    if (action === 'last') {
      let pagecount = +totalRecord - +amount
      setFrom(pagecount)
      if (keywords) {
        datas = {
          pageNum: pagecount,
          perpage: amount,
          addrr: ContractAddress,
          keywords: keywords,
        }
        getContractDetails(datas)
      } else {
        datas = {
          pageNum: pagecount,
          perpage: amount,
          addrr: ContractAddress,
          keywords: keywords,
        }
        getContractDetails(datas)
      }
    }

    if (action === 'next') {
      if (+amount + +from < totalRecord) {
        let pagecount = +amount + +from
        setFrom(pagecount)
        if (keywords) {
          datas = {
            pageNum: pagecount,
            perpage: amount,
            addrr: ContractAddress,
            keywords: keywords,
          }
          getContractDetails(datas)
        } else {
          let datas = {
            pageNum: pagecount,
            perpage: amount,
            addrr: ContractAddress,
            keywords: keywords,
          }

          getContractDetails(datas)
        }
      }
    }

    if (action === 'prev') {
      if (+from - +amount >= 0) {
        let pagecount = +from - +amount
        console.log(pagecount, "<><>")
        setFrom(pagecount)
        if (keywords) {
          datas = {
            pageNum: pagecount,
            perpage: amount,
            addrr: ContractAddress,
            keywords: keywords,
          }
          getContractDetails(datas)
        } else {
          datas = {
            pageNum: pagecount,
            perpage: amount,
            addrr: ContractAddress,
            keywords: keywords,
          }
          getContractDetails(datas)
        }
      }
    }
  }
  const handleChangeRowsPerPage = (event) => {
    setAmount(event.target.value)
    setFrom(0)
    datas = {
      pageNum: 0,
      perpage: event.target.value,
      addrr: ContractAddress,
      keywords: keywords,
    }
    getContractDetails(datas)
  }

  const handleChanged = (event) => {
    const { name, checked } = event.target
    if (name === 'allselect') {
      let tempAddress = address.map((addr) => {
        return { ...addr, isChecked: checked }
      })
      setAddress(tempAddress)
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked === true) {
          return addr
        }
      })
      if (tempAddr.length > 0) {
        setDownloadActive(1)
      } else {
        setDownloadActive(0)
      }

      setDownloadaddress(
        tempAddress.map((d) => {
          return {
            Txn_Hash: d.hash,
            Date: moment(d.timestamp * 1000).format('DD/MM/YYYY hh:mm:ss'),
            Block: d.blockNumber,
            From: d.from,
            To: d.to,
            Value: d.value / 1000000000000000000,
          }
        }),
      )
    } else {
      let tempAddress = address.map((addr) =>
        addr._id === name ? { ...addr, isChecked: checked } : addr,
      )
      setAddress(tempAddress)
      let tempAddr = tempAddress.filter((addr) => {
        if (addr.isChecked === true) {
          return addr
        }
      })
      if (tempAddr.length > 0) {
        setDownloadActive(1)
      } else {
        setDownloadActive(0)
      }
      setDownloadaddress(
        tempAddr.map((d) => {
          return {
            Txn_Hash: d.hash,
            Date: moment(d.timestamp * 1000).format('DD/MM/YYYY hh:mm:ss'),
            Block: d.blockNumber,
            From: d.from,
            To: d.to,
            Value: d.value / 1000000000000000000,
          }
        }),
      )
    }
  }
  React.useEffect(() => {
    setContractAddress(addressNumber)
    let values = {
      addrr: ContractAddress,
      pageNum: from,
      perpage: amount,
      keywords: keywords,
    }
    getContractDetails(values)
    let data = {
      addrr: ContractAddress,
    }
    getTransactionsCountForAddress(data)
  }, [])
  const classes = useStyles()
  const history = useHistory()
  return (
    <div>
      <div className="content_input_all cont-tab-contract">
        <div className="searchelement-input3 search-btn">
          <img
            style={{ width: 18, height: 18, marginRight: 5, marginTop: 3 }}
            src={require('../../assets/images/Search.svg')}
          />
          <input
            onKeyUp={(event) => props._handleSearch(event)}
            className="account-searchbar"
            type="text"
            placeholder="Search"
            onKeyUp={handleKeyUp}
          />
        </div>
        <div className="csvDownloadParent">
          {isDownloadActive ? (
            <div className="csv">
              <img
                src={require('../../../src/assets/images/rectangle-copy.svg')}
              />{' '}
              <CSVLink
                className="ActiveDownload"
                filename={'transactions.csv'}
                data={downloadaddress}
              >
                Download CSV
              </CSVLink>
            </div>
          ) : (
            <div className="csv-inactive">
              <img
                src={require('../../../src/assets/images/rectangle-copy.svg')}
              />{' '}
              <CSVLink
                className="InactiveDownload"
                filename={'transactions.csv'}
                data={downloadaddress}
              >
                Download CSV
              </CSVLink>
            </div>
          )}
        </div>
      </div>

      <Grid lg={13} className="tablegrid_address">
        <Paper
          style={{ borderRadius: '14px' }}
          elevation={0}
          className="table-paper-contract"
        >
          <TableContainer
            className={classes.container}
            id="container-table table-cont"
          >
            <Table className="table-trans-contract">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="w-31 w-850"
                    style={{ border: 'none' }}
                    align="left"
                  >
                    <input
                      onChange={handleChanged}
                      type="checkbox"
                      name="allselect"
                      // checked={
                      //   address.filter((addr) => addr?.isChecked !== true)
                      //     .length <=
                      //   address.length + 1
                      // }
                      style={{ marginRight: '8px' }}
                    />
                    <span className={'tableheaders table-hash'}>Txn Hash</span>
                  </TableCell>
                  <TableCell
                    className="w-16 w-19"
                    style={{ border: 'none', paddingLeft: '1.8%' }}
                    align="left"
                  >
                    <span className={'tableheaders table-age'}>Age</span>
                  </TableCell>
                  <TableCell
                    className="w-450 w-19"
                    style={{ border: 'none', paddingLeft: '2%' }}
                    align="left"
                  >
                    <span className={'tableheaders table-block'}>Block</span>
                  </TableCell>
                  <TableCell
                    className="w-450 w-19"
                    style={{ border: 'none', paddingLeft: '1%' }}
                    align="left"
                  >
                    <span className={'tableheaders table-from'}>From</span>
                  </TableCell>
                  <TableCell
                    className="w-450 w-18"
                    style={{ border: 'none', paddingLeft: '1%' }}
                    align="left"
                  >
                    <span className={'tableheaders table-to'}>To</span>
                  </TableCell>
                  <TableCell
                    className="w-450 "
                    style={{ border: 'none', paddingLeft: '1%' }}
                    align="left"
                  >
                    <span className={'tableheaders table-value'}>Value</span>
                  </TableCell>
                  {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
                </TableRow>
              </TableHead>
              {isLoading == true ? (
                <TableBody>
                  <TableRow>
                    <TableCell style={{ border: 'none' }} colspan="6">
                      <div className="loader-address-details-list">
                        <Loader />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                noData == false && (
                  <TableBody>
                    {address.map((row, index) => {
                      const currentTime = new Date()
                      const previousTime = new Date(row.timestamp * 1000)
                      const TimeAge = timeDiff(currentTime, previousTime)
                      return (
                        <TableRow
                          style={
                            index % 2 !== 1
                              ? { background: '#f9f9f9' }
                              : { background: 'white' }
                          }
                        >
                          <TableCell
                            style={{ border: 'none' }}
                            margin-left="5px"
                          >
                            <input
                              key={row._id}
                              name={row._id}
                              onChange={handleChanged}
                              type="checkbox"
                              checked={row?.isChecked || false}
                              //checked={checkAll}
                              style={{ marginRight: '8px' }}
                            />

                            <a
                              className="linkTable"
                              href={'/transaction-details/' + row.hash}
                            >
                              <Tooltip placement="top" title={row.hash}>
                                <span className="tabledata">
                                  {shorten(row.hash)}{' '}
                                </span>
                              </Tooltip>
                            </a>
                          </TableCell>
                          <TableCell style={{ border: 'none' }} align="left">
                            <span className="tabledata">{TimeAge}</span>
                          </TableCell>
                          <TableCell style={{ border: 'none' }} align="left">
                            <a
                              className="linkTable"
                              href={'/block-details/' + row.blockNumber + "?hash=" + row.blockHash}
                            >
                              <span className="tabledata">{row.blockNumber}</span>
                            </a>
                          </TableCell>
                          <TableCell style={{ border: 'none' }} align="left">
                            {row.from != addr ? (
                              <a
                                className="linkTable"
                                href={'/address-details/' + row.from}
                              >
                                <Tooltip placement="top" title={row.from}>
                                  <span className="tabledata">
                                    {' '}
                                    {shorten(row.from)}
                                  </span>
                                </Tooltip>
                              </a>
                            ) : (
                              <Tooltip placement="top" title={row.from}>
                                <span className="tabledata">
                                  {' '}
                                  {shorten(row.from)}
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ border: 'none' }} align="left">
                            {row.to != addr ? (
                              <a
                                className="linkTable"
                                href={'/address-details/' + row.to}
                              >
                                <Tooltip placement="top" title={row.to}>
                                  <span className="tabledata">
                                    {shorten(row.to)}
                                  </span>
                                </Tooltip>
                              </a>
                            ) : (
                              <Tooltip placement="top" title={row.to}>
                                <span className="tabledata">
                                  {shorten(row.to)}
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ border: 'none' }} align="left">
                            <span className="tabledata">{row.value}</span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                )
              )}
              {noData == true && (
                <TableBody>
                  <TableRow>
                    <TableCell
                      id="td"
                      colspan="6"
                      style={{ borderBottom: 'none' }}
                    >
                      <span className="tabledata" style={{ color: 'black' }}>
                        No transaction found.
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>
        <Grid
          container
          style={{
            marginTop: '2.25rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          className="page-container"
        >
          <Grid item xs="4" className="pagination-tab">
            <span className="text">Show</span>
            {
              <select
                value={amount}
                className="select-amount"
                onChange={handleChangeRowsPerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
            }
            <span className="text">Records</span>
          </Grid>
          <Grid xs="2"></Grid>
          <Grid
            item
            xs="7"
            // style={{
            //   flexBasis: "auto",
            //   display: "flex",
            //   alignItems: "baseline",
            // }}
            className="page-tab"
          >
            <button
              style={{ marginLeft: '0px' }}
              onClick={() => handleChangePage('first')}
              className={from === 0 ? 'btn-contract disabled' : 'btn-contract'}
            >
              First
            </button>
            <button
              onClick={() => handleChangePage('prev')}
              className={from === 0 ? 'btn-contract disabled' : 'btn-contract'}
            >
              <img src={require('../../../src/assets/images/back.svg')} />
            </button>
            <button className="btn-contract">
              Page{' '}
              {Math.ceil(totalRecord / amount) -
                Math.ceil((totalRecord - from) / amount) + 1}{' '}
              of {Math.ceil(totalRecord / amount)}
            </button >
            <button
              onClick={() => handleChangePage('next')}
              className={+from + +amount === totalRecord ? 'btn-contract disabled' : 'btn-contract'}
            >
              <img src={require('../../../src/assets/images/next.svg')} />
            </button>
            <button
              onClick={() => handleChangePage('last')}
              className={+from + +amount === totalRecord ? 'btn-contract disabled' : 'btn-contract'}
            >
              Last
            </button>
          </Grid >
        </Grid >
      </Grid >
    </div >
  )
}
